# Update to your response/recipe.py file
from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class IngredientResponse(BaseModel):
    id: int
    name: str
    measure: str
    
    model_config = ConfigDict(from_attributes=True)

class RecipeLikesResponse(BaseModel):
    user_id: int
    
    model_config = ConfigDict(from_attributes=True)

class RecipeResponse(BaseModel):
    id: int
    meal_id: str
    name: str
    category: str
    area: str
    instructions: str
    image_url: str
    tags: Optional[str] = None
    youtube_url: Optional[str] = None
    source: Optional[str] = None
    ingredients: List[IngredientResponse]
    likes: List[RecipeLikesResponse]
    
    model_config = ConfigDict(from_attributes=True)

class RecipeListResponse(BaseModel):
    recipes: List[RecipeResponse]
    
    model_config = ConfigDict(from_attributes=True)

class RecipeLikeResponse(BaseModel):
    id: int
    user_id: int
    recipe_id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class UserLikedRecipesResponse(BaseModel):
    user_id: int
    user_name: str
    recipes: List[RecipeResponse]
    
    model_config = ConfigDict(from_attributes=True)

class AllUserLikesResponse(BaseModel):
    users: List[UserLikedRecipesResponse]
    
    model_config = ConfigDict(from_attributes=True)