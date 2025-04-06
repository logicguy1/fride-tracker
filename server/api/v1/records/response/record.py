from pydantic import BaseModel
from typing import Optional
import datetime
from ...items.response.item import ItemResponse
from ...users.response.user import UserResponse

class RecordResponse(BaseModel):
    id: int
    item_id: int
    owned_by: int
    created: datetime.datetime
    expires: Optional[datetime.datetime] = None
    status: str
    
    class Config:
        orm_mode = True

class RecordDetailResponse(RecordResponse):
    item: ItemResponse
    owner: UserResponse
    
    class Config:
        orm_mode = True