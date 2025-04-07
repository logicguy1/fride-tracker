from sqlalchemy import Column, Integer, String, Text, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from ..session import Base

class Recipe(Base):
    __tablename__ = "recipes"
    
    id = Column(Integer, primary_key=True, index=True)
    meal_id = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    area = Column(String, index=True)
    instructions = Column(Text)
    image_url = Column(String)
    tags = Column(String, nullable=True)
    youtube_url = Column(String, nullable=True)
    source = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    ingredients = relationship("Ingredient", back_populates="recipe", cascade="all, delete-orphan")

class Ingredient(Base):
    __tablename__ = "ingredients"
    
    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id", ondelete="CASCADE"))
    name = Column(String)
    measure = Column(String)
    
    recipe = relationship("Recipe", back_populates="ingredients")

class DailyRecipes(Base):
    __tablename__ = "daily_recipes"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=func.now(), index=True)
    last_refreshed = Column(DateTime, default=func.now())
    is_active = Column(Integer, default=1)  # Use 1 for active, 0 for inactive

# Pydantic models for request/response
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