from fastapi import APIRouter, HTTPException, Depends
from .request.user import UserCreateRequest
from .response.user import UserResponse
from core.db.models import User
from core.db.session import Session
from core.dependencies.get_db import get_db

user_router = APIRouter()

# API endpoints
@user_router.post("/", response_model=UserResponse)
def create_user(user: UserCreateRequest, db: Session = Depends(get_db)):
    db_user = User(
        name=user.name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@user_router.get("/", response_model=list[UserResponse])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@user_router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@user_router.get("/find", response_model=UserResponse)
def find_user(name: str, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.name == name).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@user_router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreateRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.name = user.name
    db.commit()
    db.refresh(db_user)
    return db_user

@user_router.delete("/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user

from api.v1.users.like_adapter import like_router
user_router.include_router(like_router, prefix="", tags=["Likes"])

__all__ = ["user_router"]