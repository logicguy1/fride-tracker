from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from core.dependencies.get_db import get_db
from core.db.models.user import User
from core.db.models.recipeLike import RecipeLike
from core.db.models.recipe import Recipe

class RecipeLikeService:
    def like_recipe(self, db: Session, user_id: int, recipe_id: int) -> RecipeLike:
        """Add a like to a recipe for a specific user"""
        # Check if recipe exists
        recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
        if not recipe:
            raise HTTPException(status_code=404, detail="Recipe not found")
            
        # Check if user exists
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        # Check if like already exists
        existing_like = db.query(RecipeLike).filter(
            RecipeLike.user_id == user_id,
            RecipeLike.recipe_id == recipe_id
        ).first()
        
        if existing_like:
            return existing_like
            
        # Create new like
        recipe_like = RecipeLike(user_id=user_id, recipe_id=recipe_id)
        db.add(recipe_like)
        db.commit()
        db.refresh(recipe_like)
        return recipe_like
    
    def unlike_recipe(self, db: Session, user_id: int, recipe_id: int) -> bool:
        """Remove a like from a recipe for a specific user"""
        # Find the like
        like = db.query(RecipeLike).filter(
            RecipeLike.user_id == user_id,
            RecipeLike.recipe_id == recipe_id
        ).first()
        
        if not like:
            raise HTTPException(status_code=404, detail="Like not found")
        
        # Delete the like
        db.delete(like)
        db.commit()
        return True
    
    def get_user_liked_recipes(self, db: Session, user_id: int) -> List[Recipe]:
        """Get all recipes liked by a specific user"""
        # Check if user exists
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        # Get liked recipes
        likes = db.query(RecipeLike).filter(RecipeLike.user_id == user_id).all()
        recipe_ids = [like.recipe_id for like in likes]
        
        if not recipe_ids:
            return []
            
        recipes = db.query(Recipe).filter(Recipe.id.in_(recipe_ids)).all()
        return recipes
    
    def get_all_user_likes(self, db: Session) -> List[dict]:
        """Get all users with their liked recipes"""
        # Get all users
        users = db.query(User).all()
        result = []
        
        for user in users:
            recipes = self.get_user_liked_recipes(db, user.id)
            result.append({
                "user_id": user.id,
                "user_name": user.name,
                "recipes": recipes
            })
            
        return result