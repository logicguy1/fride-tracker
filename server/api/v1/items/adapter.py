from fastapi import APIRouter, HTTPException, Depends

from .request.item import ItemCreateRequest
from .response.item import ItemResponse

from core.db.models import Item, User, Record
from core.db.session import Base, engine, SessionLocal, Session
from core.dependencies.get_db import get_db

item_router = APIRouter()


# API endpoints
@item_router.post("/", response_model=ItemResponse)
def create_item(item: ItemCreateRequest, db: Session = Depends(get_db)):
    db_item = Item(
        name=item.name, 
        description=item.description,
        sn = item.sn
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@item_router.get("/", response_model=list[ItemResponse])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = db.query(Item).offset(skip).limit(limit).all()
    return items

@item_router.get("/scan", response_model=ItemResponse)
def scan_item(barcode: str, db: Session = Depends(get_db)):
    db_item = db.query(Item).filter(Item.sn == barcode).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@item_router.get("/{item_id}", response_model=ItemResponse)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@item_router.put("/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemCreateRequest, db: Session = Depends(get_db)):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db_item.name = item.name
    db_item.description = item.description
    db.commit()
    db.refresh(db_item)
    return db_item


@item_router.delete("/{item_id}", response_model=ItemResponse)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(db_item)
    db.commit()
    return db_item


__all__ = ["item_router"]
