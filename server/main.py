# main.py
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import datetime

from core.db.models import Item, User, Record
from core.db.session import Base, engine, SessionLocal

from api.v1.items.adapter import item_router

# Create the database tables
Base.metadata.create_all(bind=engine)

# Setup FastAPI app
app = FastAPI(title="Simple API with SQLite")

#app.include_router(item_router)
app.include_router(item_router, prefix="/api/v1/items", tags=["Items"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,  # Enable hot reloading
        reload_dirs=["./"],  # Directories to watch for changes
        workers=1  # Keep one worker for development
    )
