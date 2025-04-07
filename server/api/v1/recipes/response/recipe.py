from pydantic import BaseModel
from typing import Optional, List
import datetime

class IngredientResponse(BaseModel):
    id: int
    name: str
    measure: str
    
    class Config:
        orm_mode = True

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
    
    class Config:
        orm_mode = True

class RecipeListResponse(BaseModel):
    recipes: List[RecipeResponse]
    
    class Config:
        orm_mode = True