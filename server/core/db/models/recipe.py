from sqlalchemy import Column, Integer, String, Text, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
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
    likes = relationship("RecipeLike", back_populates="recipe", cascade="all, delete-orphan")

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
