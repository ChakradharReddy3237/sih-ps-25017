from sqlalchemy.orm import Session
from models import Event, EventOrganizer, EventType
from datetime import datetime
from database import SessionLocal
from schemas import EventCreate, EventUpdate
from zoneinfo import ZoneInfo
import json

def get_all_events(session: Session):
    now = datetime.now()

    events = (
        session.query(Event, EventOrganizer)
        .join(EventOrganizer, Event.event_org_id == EventOrganizer.event_org_id)
        .all()
    )

    response_list = []
    for event_obj, organizer in events:
        if event_obj.start_time > now:
            status = "Upcoming"
        elif event_obj.end_time and event_obj.end_time < now:
            status = "Completed"
        else:
            status = "Ongoing"

        response_list.append({
            "id": str(event_obj.event_id),
            "title": event_obj.event_name,
            "description": event_obj.description,
            "start_time": event_obj.start_time.isoformat(),
            "end_time": event_obj.end_time.isoformat() if event_obj.end_time else None,
            "status": status,
            "organizer_name": organizer.event_org_name,
        })

    sort_order = {"Ongoing": 0, "Upcoming": 1, "Completed": 2}
    response_list.sort(key=lambda e: sort_order[e["status"]])

    return response_list

def get_event(session: Session, event_id: int):
    now = datetime.now()

    event = (
        session.query(Event, EventOrganizer)
        .join(EventOrganizer, Event.event_org_id == EventOrganizer.event_org_id)
        .filter(Event.event_id == event_id)
        .first()
    )

    if not event:
        return {"error": f"Event with id {event_id} not found"}

    event_obj, organizer = event

    # Determine status
    if event_obj.start_time > now:
        status = "Upcoming"
    elif event_obj.end_time and event_obj.end_time < now:
        status = "Completed"
    else:
        status = "Ongoing"

    return {
        "title": event_obj.event_name,
        "description": event_obj.description,
        "start_time": event_obj.start_time.isoformat(),
        "end_time": event_obj.end_time.isoformat() if event_obj.end_time else None,
        "status": status,
        "organizer_name": organizer.event_org_name,
    }
def post_event(db: Session, event_data: EventCreate):
    new_event = Event(
        event_name=event_data.event_name,
        event_type=event_data.event_type,
        start_time=event_data.start_time,
        end_time=event_data.end_time,
        description=event_data.description,
        event_org_id=event_data.event_org_id,
        req_donation=event_data.req_donation
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

def update_event(db: Session, event_id: int, update_data: EventUpdate):
    event = db.query(Event).filter(Event.event_id == event_id).first()
    if not event:
        return None

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(event, field, value)

    db.commit()
    db.refresh(event)
    return event

def delete_event(db: Session, event_id: int):
    event = db.query(Event).filter(Event.event_id == event_id).first()
    if not event:
        return False
    db.delete(event)
    db.commit()
    return True

db = SessionLocal()
try:
    events = get_all_events(db)
    print(json.dumps(events, indent=4, ensure_ascii=False))
finally:
    db.close()