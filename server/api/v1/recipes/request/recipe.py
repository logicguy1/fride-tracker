from pydantic import BaseModel, Field
from typing import List, Optional, Union
from datetime import datetime

class IngredientCreateRequest(BaseModel):
    name: str
    measure: str = ""

class RecipeCreateRequest(BaseModel):
    meal_id: str
    name: str
    category: str
    area: str
    instructions: str
    image_url: str
    tags: Optional[str] = None
    youtube_url: Optional[str] = None
    source: Optional[str] = None
    ingredients: List[IngredientCreateRequest]

class RecipeUpdateRequest(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    area: Optional[str] = None
    instructions: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[str] = None
    youtube_url: Optional[str] = None
    source: Optional[str] = None
    ingredients: Optional[List[IngredientCreateRequest]] = None

class RecipeSearchRequest(BaseModel):
    query: Optional[str] = None
    category: Optional[str] = None
    area: Optional[str] = None
    skip: int = Field(0, ge=0)
    limit: int = Field(20, ge=1, le=100)