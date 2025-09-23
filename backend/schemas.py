from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from models import EventType

class EventCreate(BaseModel):
    event_name: str
    event_type: EventType
    start_time: datetime
    end_time: Optional[datetime] = None
    description: Optional[str] = None
    event_org_id: int
    req_donation: Optional[int] = 0

class EventUpdate(BaseModel):
    event_name: Optional[str] = None
    event_type: Optional[EventType] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    description: Optional[str] = None
    event_org_id: Optional[int] = None
    req_donation: Optional[int] = None
