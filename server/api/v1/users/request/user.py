from pydantic import BaseModel


class UserCreateRequest(BaseModel):
    name: str
    
    class Config:
        orm_mode = True