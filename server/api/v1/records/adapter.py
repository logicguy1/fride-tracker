from fastapi import APIRouter, HTTPException, Depends, Query
from .request.record import RecordCreateRequest, RecordUpdateRequest
from .response.record import RecordResponse, RecordDetailResponse
from core.db.models import Record, Item, User
from core.db.session import Session
from core.dependencies.get_db import get_db
from typing import Optional, List
import datetime

record_router = APIRouter()

# API endpoints
@record_router.post("/", response_model=RecordResponse)
def create_record(record: RecordCreateRequest, db: Session = Depends(get_db)):
    # Check if item exists
    db_item = db.query(Item).filter(Item.id == record.item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Check if user exists
    db_user = db.query(User).filter(User.id == record.owned_by).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Calculate expiry date
    expires_date = None
    if record.expiry_days:
        expires_date = datetime.datetime.utcnow() + datetime.timedelta(days=record.expiry_days)
    
    # Create record
    db_record = Record(
        item_id=record.item_id,
        owned_by=record.owned_by,
        status="active",
        expires=expires_date
    )
    
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@record_router.get("/scan", response_model=Optional[RecordDetailResponse])
def get_active_record_by_scan(barcode: str, db: Session = Depends(get_db)):
    # Find the item by barcode
    db_item = db.query(Item).filter(Item.sn == barcode).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Get the active record for this item
    db_record = db.query(Record).filter(
        Record.item_id == db_item.id,
        Record.status == "active"
    ).first()
    
    # If no active record exists, return None
    if db_record is None:
        return None
    
    # Return record with item and user details
    return db_record

@record_router.get("/item", response_model=Optional[RecordDetailResponse])
def get_active_record_by_id(id: int, db: Session = Depends(get_db)):
    # Find the item by barcode
    db_item = db.query(Item).filter(Item.id == id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Get the active record for this item
    db_record = db.query(Record).filter(
        Record.item_id == db_item.id,
        Record.status == "active"
    ).first()
    
    # If no active record exists, return None
    if db_record is None:
        return None
    
    # Return record with item and user details
    return db_record

@record_router.put("/{record_id}/complete", response_model=RecordResponse)
def complete_record(record_id: int, db: Session = Depends(get_db)):
    db_record = db.query(Record).filter(Record.id == record_id).first()
    if db_record is None:
        raise HTTPException(status_code=404, detail="Record not found")
    
    # Update record status
    db_record.status = "completed"
    db.commit()
    db.refresh(db_record)
    return db_record

@record_router.put("/{record_id}/cancel", response_model=RecordResponse)
def cancel_record(record_id: int, db: Session = Depends(get_db)):
    db_record = db.query(Record).filter(Record.id == record_id).first()
    if db_record is None:
        raise HTTPException(status_code=404, detail="Record not found")
    
    # Update record status
    db_record.status = "cancelled"
    db.commit()
    db.refresh(db_record)
    return db_record

@record_router.get("/", response_model=List[RecordDetailResponse])
def get_records(
    status: Optional[str] = None,
    user_id: Optional[int] = None,
    item_id: Optional[int] = None,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    query = db.query(Record)
    
    # Apply filters if provided
    if status:
        query = query.filter(Record.status == status)
    if user_id:
        query = query.filter(Record.owned_by == user_id)
    if item_id:
        query = query.filter(Record.item_id == item_id)
    
    records = query.offset(skip).limit(limit).all()
    return records

@record_router.get("/{record_id}", response_model=RecordDetailResponse)
def get_record(record_id: int, db: Session = Depends(get_db)):
    db_record = db.query(Record).filter(Record.id == record_id).first()
    if db_record is None:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record

@record_router.get("/expired", response_model=List[RecordDetailResponse])
def get_expired_records(db: Session = Depends(get_db)):
    now = datetime.datetime.utcnow()
    expired_records = db.query(Record).filter(
        Record.status == "active",
        Record.expires <= now
    ).all()
    return expired_records

@record_router.put("/extend/{record_id}", response_model=RecordResponse)
def extend_record(record_id: int, additional_days: int, db: Session = Depends(get_db)):
    db_record = db.query(Record).filter(Record.id == record_id).first()
    if db_record is None:
        raise HTTPException(status_code=404, detail="Record not found")
    
    # Calculate new expiry date
    if db_record.expires:
        db_record.expires = db_record.expires + datetime.timedelta(days=additional_days)
    else:
        db_record.expires = datetime.datetime.utcnow() + datetime.timedelta(days=additional_days)
    
    db.commit()
    db.refresh(db_record)
    return db_record

__all__ = ["record_router"]