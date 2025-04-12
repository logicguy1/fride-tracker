from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session

from core.dependencies.get_db import get_db
from .services.recipe_like_service import RecipeLikeService
from .response.recipe import AllUserLikesResponse

like_router = APIRouter()
recipe_like_service = RecipeLikeService()


@like_router.get("/likes/all", response_model=AllUserLikesResponse)
def get_all_user_likes(db: Session = Depends(get_db)):
    """Get all users with their liked recipes"""
    users_with_likes = recipe_like_service.get_all_user_likes(db)
    return {"users": users_with_likes}


__all__ = ["like_router"]