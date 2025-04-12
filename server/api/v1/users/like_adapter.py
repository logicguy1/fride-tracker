from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from core.dependencies.get_db import get_db
from core.db.models.user import User
from ..recipes.services.recipe_service import RecipeService
from ..recipes.services.recipe_like_service import RecipeLikeService
from ..recipes.response.recipe import RecipeLikeResponse, UserLikedRecipesResponse, AllUserLikesResponse

like_router = APIRouter()
recipe_like_service = RecipeLikeService()


@like_router.post("/{user_id}/like/{recipe_id}", response_model=RecipeLikeResponse)
def like_recipe(user_id: int, recipe_id: int, db: Session = Depends(get_db)):
    """Like a recipe for a specific user"""
    return recipe_like_service.like_recipe(db, user_id, recipe_id)

@like_router.delete("/{user_id}/unlike/{recipe_id}")
def unlike_recipe(user_id: int, recipe_id: int, db: Session = Depends(get_db)):
    """Unlike a recipe for a specific user"""
    result = recipe_like_service.unlike_recipe(db, user_id, recipe_id)
    if result:
        return {"status": "success", "message": "Recipe unliked successfully"}
    return {"status": "error", "message": "Failed to unlike recipe"}

@like_router.get("/{user_id}/likes", response_model=UserLikedRecipesResponse)
def get_user_liked_recipes(user_id: int, db: Session = Depends(get_db)):
    """Get all recipes liked by a specific user"""
    recipes = recipe_like_service.get_user_liked_recipes(db, user_id)
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "user_id": user.id,
        "user_name": user.name,
        "recipes": recipes
    }


__all__ = ["like_router"]