from pydantic import BaseModel


class ItemResponse(BaseModel):
    id: int
    name: str
    description: str
    sn: str

    class Config:
        orm_mode = True