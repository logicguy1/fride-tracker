from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from core.dependencies.get_db import get_db
from .services.recipe_service import RecipeService
from .request.recipe import RecipeSearchRequest, RecipeCreateRequest, RecipeUpdateRequest
from .response.recipe import RecipeResponse, RecipeListResponse

recipe_router = APIRouter()
recipe_service = RecipeService()

# API endpoints
@recipe_router.get("/daily", response_model=RecipeListResponse)
async def get_daily_recipes(db: Session = Depends(get_db)):
    """Get the current 10 daily recipes"""
    recipes = recipe_service.get_daily_recipes(db)
    
    # If no daily recipes exist yet, create them
    if not recipes:
        recipes = await recipe_service.refresh_daily_recipes(db)
    
    return {"recipes": recipes}

@recipe_router.post("/daily/refresh", response_model=RecipeListResponse)
async def refresh_daily_recipes(db: Session = Depends(get_db)):
    """Refresh the daily recipes with 10 new random recipes"""
    recipes = await recipe_service.refresh_daily_recipes(db)
    return {"recipes": recipes}

@recipe_router.post("/search", response_model=RecipeListResponse)
def search_recipes_post(
    search_params: RecipeSearchRequest,
    db: Session = Depends(get_db)
):
    """Search for recipes using POST with request body"""
    recipes = recipe_service.search_recipes(
        db=db, 
        query=search_params.query, 
        category=search_params.category, 
        area=search_params.area, 
        skip=search_params.skip, 
        limit=search_params.limit
    )
    return {"recipes": recipes}

@recipe_router.get("/search", response_model=RecipeListResponse)
def search_recipes(
    query: Optional[str] = None,
    category: Optional[str] = None,
    area: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Search for recipes by name, category, or area"""
    recipes = recipe_service.search_recipes(
        db=db, query=query, category=category, area=area, skip=skip, limit=limit
    )
    return {"recipes": recipes}

@recipe_router.get("/{recipe_id}", response_model=RecipeResponse)
def get_recipe(recipe_id: int, db: Session = Depends(get_db)):
    """Get a specific recipe by ID"""
    recipe = recipe_service.get_recipe_by_id(db, recipe_id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@recipe_router.get("/meal/{meal_id}", response_model=RecipeResponse)
def get_recipe_by_meal_id(meal_id: str, db: Session = Depends(get_db)):
    """Get a specific recipe by its meal ID from TheMealDB"""
    recipe = recipe_service.get_recipe_by_meal_id(db, meal_id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe


__all__ = ["recipe_router"]