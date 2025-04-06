from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker, Session, declarative_base, relationship
from pydantic import BaseModel
import datetime

from ..session import Base


class Record(Base):
    __tablename__ = "records"
    
    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"), index=True)
    created = Column(DateTime, default=datetime.datetime.utcnow)
    expires = Column(DateTime, nullable=True)
    status = Column(String, default="pending")  # pending, completed, cancelled, etc.
    owned_by = Column(Integer, ForeignKey("users.id"))
    
    # Establish relationships
    item = relationship("Item", back_populates="records")
    owner = relationship("User", back_populates="records")