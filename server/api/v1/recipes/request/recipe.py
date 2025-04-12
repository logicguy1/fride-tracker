from pydantic import BaseModel, Field
from typing import List, Optional, Union
from datetime import datetime

class IngredientCreateRequest(BaseModel):
    name: str
    measure: str = ""

class RecipeSearchRequest(BaseModel):
    query: Optional[str] = None
    category: Optional[str] = None
    area: Optional[str] = None
    skip: int = Field(0, ge=0)
    limit: int = Field(20, ge=1, le=100)