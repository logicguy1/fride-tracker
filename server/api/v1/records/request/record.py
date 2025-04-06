from pydantic import BaseModel
from typing import Optional

class RecordCreateRequest(BaseModel):
    item_id: int
    owned_by: int
    expiry_days: Optional[int] = None
    
    class Config:
        orm_mode = True

class RecordUpdateRequest(BaseModel):
    status: Optional[str] = None
    
    class Config:
        orm_mode = True