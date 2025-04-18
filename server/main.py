# main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime

from core.db.models import Item, User, Record, RecipeLike
from core.db.session import Base, engine, SessionLocal

# Create the database tables
Base.metadata.create_all(bind=engine)

# Setup FastAPI app
app = FastAPI(
    title="Fridge tracker",
    description="Tracking fridge contents using curl has never been this easy!",
)

# Setup cors

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup FastAPI routes
from api.v1.items.adapter import item_router
app.include_router(item_router, prefix="/api/v1/items", tags=["Items"])

from api.v1.users.adapter import user_router
app.include_router(user_router, prefix="/api/v1/users", tags=["Users"])

from api.v1.records.adapter import record_router
app.include_router(record_router, prefix="/api/v1/records", tags=["Records"])

from api.v1.recipes.adapter import recipe_router
app.include_router(recipe_router, prefix="/api/v1/recipes", tags=["Recipes"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Enable hot reloading
        reload_dirs=["./"],  # Directories to watch for changes
        workers=1,  # Keep one worker for development
    )
