import httpx
import json
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List, Dict, Any, Optional
from core.db.models import Recipe, Ingredient, DailyRecipes

class RecipeService:
    def __init__(self):
        self.api_base_url = "https://www.themealdb.com/api/json/v1/1"
        
    async def fetch_random_meal(self) -> Dict[str, Any]:
        """Fetch a random meal from TheMealDB API"""
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.api_base_url}/random.php")
            response.raise_for_status()
            return response.json()["meals"][0]
    
    async def fetch_multiple_random_meals(self, count: int = 10) -> List[Dict[str, Any]]:
        """Fetch multiple random meals from TheMealDB API"""
        meals = []
        meal_ids = set()
        
        # We might need to fetch more than 'count' meals to get 'count' unique meals
        while len(meals) < count:
            meal = await self.fetch_random_meal()
            if meal["idMeal"] not in meal_ids:
                meal_ids.add(meal["idMeal"])
                meals.append(meal)
                
        return meals
    
    def _parse_meal_data(self, meal_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract relevant data from the meal response"""
        ingredients = []
        
        # Extract ingredients and measurements
        for i in range(1, 21):
            ingredient = meal_data.get(f"strIngredient{i}")
            measure = meal_data.get(f"strMeasure{i}")
            
            if ingredient and ingredient.strip():
                ingredients.append({
                    "name": ingredient,
                    "measure": measure if measure and measure.strip() else ""
                })
        
        # Create recipe object
        recipe_data = {
            "meal_id": meal_data["idMeal"],
            "name": meal_data["strMeal"],
            "category": meal_data.get("strCategory", ""),
            "area": meal_data.get("strArea", ""),
            "instructions": meal_data.get("strInstructions", ""),
            "image_url": meal_data.get("strMealThumb", ""),
            "tags": meal_data.get("strTags", ""),
            "youtube_url": meal_data.get("strYoutube", ""),
            "source": meal_data.get("strSource", ""),
            "ingredients": ingredients
        }
        
        return recipe_data
    
    async def refresh_daily_recipes(self, db: Session) -> List[Recipe]:
        """Refresh the daily recipes"""
        # Fetch new random meals
        random_meals = await self.fetch_multiple_random_meals(10)
        
        # Mark existing daily recipes as inactive
        active_daily = db.query(DailyRecipes).filter(DailyRecipes.is_active == 1).first()
        if active_daily:
            active_daily.is_active = 0
        
        # Create new daily recipes entry
        new_daily = DailyRecipes(
            date=datetime.now(),
            last_refreshed=datetime.now(),
            is_active=1
        )
        db.add(new_daily)
        db.flush()
        
        # Process and save the new recipes
        recipes = []
        for meal_data in random_meals:
            recipe_data = self._parse_meal_data(meal_data)
            
            # Check if recipe already exists in DB
            existing_recipe = db.query(Recipe).filter(Recipe.meal_id == recipe_data["meal_id"]).first()
            
            if existing_recipe:
                # Use existing recipe
                recipes.append(existing_recipe)
            else:
                # Create new recipe
                new_recipe = Recipe(
                    meal_id=recipe_data["meal_id"],
                    name=recipe_data["name"],
                    category=recipe_data["category"],
                    area=recipe_data["area"],
                    instructions=recipe_data["instructions"],
                    image_url=recipe_data["image_url"],
                    tags=recipe_data["tags"],
                    youtube_url=recipe_data["youtube_url"],
                    source=recipe_data["source"],
                )
                
                # Add ingredients
                for ing_data in recipe_data["ingredients"]:
                    ingredient = Ingredient(
                        name=ing_data["name"],
                        measure=ing_data["measure"]
                    )
                    new_recipe.ingredients.append(ingredient)
                
                db.add(new_recipe)
                recipes.append(new_recipe)
        
        db.commit()
        return recipes
    
    def get_daily_recipes(self, db: Session) -> List[Recipe]:
        """Get the current daily recipes"""
        # Check if we have active daily recipes
        active_daily = db.query(DailyRecipes).filter(DailyRecipes.is_active == 1).first()
        
        if not active_daily:
            # No active daily recipes, return empty list
            return []
        
        # Get the 10 most recently created recipes
        recipes = db.query(Recipe).order_by(desc(Recipe.created_at)).limit(10).all()
        return recipes
    
    def search_recipes(self, db: Session, query: str, category: Optional[str] = None, area: Optional[str] = None, 
                      skip: int = 0, limit: int = 20) -> List[Recipe]:
        """Search for recipes by name, category, or area"""
        base_query = db.query(Recipe)
        
        if query:
            base_query = base_query.filter(Recipe.name.ilike(f"%{query}%"))
        
        if category:
            base_query = base_query.filter(Recipe.category.ilike(f"%{category}%"))
            
        if area:
            base_query = base_query.filter(Recipe.area.ilike(f"%{area}%"))
            
        return base_query.offset(skip).limit(limit).all()
    
    def get_recipe_by_id(self, db: Session, recipe_id: int) -> Optional[Recipe]:
        """Get a recipe by its ID"""
        return db.query(Recipe).filter(Recipe.id == recipe_id).first()
    
    def get_recipe_by_meal_id(self, db: Session, meal_id: str) -> Optional[Recipe]:
        """Get a recipe by its meal ID"""
        return db.query(Recipe).filter(Recipe.meal_id == meal_id).first()