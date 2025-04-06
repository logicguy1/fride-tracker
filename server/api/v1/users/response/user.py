from pydantic import BaseModel
from typing import List, Optional


class UserResponse(BaseModel):
    id: int
    name: str
    
    class Config:
        orm_mode = True