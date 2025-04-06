from pydantic import BaseModel


class ItemCreateRequest(BaseModel):
    name: str
    description: str
    sn: str