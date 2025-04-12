from sqlalchemy import Column, Integer, ForeignKey, DateTime, func, UniqueConstraint
from sqlalchemy.orm import relationship
from ..session import Base

class RecipeLike(Base):
    __tablename__ = "recipe_likes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    recipe_id = Column(Integer, ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="liked_recipes")
    recipe = relationship("Recipe", back_populates="likes")
    
    # Ensure a user can only like a recipe once
    __table_args__ = (
        UniqueConstraint('user_id', 'recipe_id', name='uq_user_recipe_like'),
    )