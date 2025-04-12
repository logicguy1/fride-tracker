from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker, Session, declarative_base, relationship

from ..session import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    
    # Establish relationship with records
    records = relationship("Record", back_populates="owner")
    liked_recipes = relationship("RecipeLike", back_populates="user", cascade="all, delete-orphan")