from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware
origins = [
    "http://localhost:5173",  # Assuming Vite dev server runs on this port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Alumnus(BaseModel):
# ... existing code ...
    id: int
    name: str
    email: str
    graduation_year: int
    major: str

class Event(BaseModel):
    id: int
    title: str
    description: str
    date: str

class LoginData(BaseModel):
    username: str
    password: str

# Dummy Data
fake_alumni_db = [
    {"id": 1, "name": "John Doe", "email": "john.doe@example.com", "graduation_year": 2010, "major": "Computer Science"},
    {"id": 2, "name": "Jane Smith", "email": "jane.smith@example.com", "graduation_year": 2012, "major": "Electrical Engineering"}
]
fake_events_db = [
    {"id": 1, "title": "Alumni Meet 2025", "description": "Annual alumni meet.", "date": "2025-12-25"},
    {"id": 2, "title": "Tech Talk", "description": "A talk on recent advancements in AI.", "date": "2025-11-15"}
]

# API Endpoints

@app.get("/")
def read_root():
    return {"message": "Welcome to the Alumni Portal API"}

# ... existing code ...
from passlib.context import CryptContext

# ... existing code ...
app = FastAPI()

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# CORS Middleware
# ... existing code ...
# ... existing code ...
class LoginData(BaseModel):
    username: str
    password: str

class UserInDB(BaseModel):
    username: str
    hashed_password: str
    role: str # "student", "alumni", or "admin"

# Dummy Data
fake_users_db = {}
# ... existing code ...
# Analytics
@app.get("/api/analytics")
def analytics():
# ... existing code ...
    return {"alumni_count": len(fake_alumni_db), "event_count": len(fake_events_db), "donations": 15000}

# Signup
@app.post("/api/signup")
def signup(user_data: UserInDB):
    if user_data.username in fake_users_db:
        return {"error": "Username already exists"}
    hashed_password = pwd_context.hash(user_data.hashed_password)
    user_in_db = UserInDB(username=user_data.username, hashed_password=hashed_password, role=user_data.role)
    fake_users_db[user_data.username] = user_in_db.dict()
    return {"message": f"User {user_data.username} created successfully"}


# Login
@app.post("/api/login")
def login(login_data: LoginData):
    user_in_db = fake_users_db.get(login_data.username)
    if not user_in_db:
        return {"error": "Incorrect username or password"}
    if not pwd_context.verify(login_data.password, user_in_db["hashed_password"]):
        return {"error": "Incorrect username or password"}
    
    return {"message": f"Welcome {login_data.username}", "role": user_in_db["role"]}

# Events
@app.get("/api/events", response_model=List[Event])
# ... existing code ...
def get_events():
    return fake_events_db

@app.post("/api/events", response_model=Event)
def create_event(event: Event):
    fake_events_db.append(event.dict())
    return event

@app.get("/api/event/{event_id}", response_model=Event)
def get_event(event_id: int):
    for event in fake_events_db:
        if event["id"] == event_id:
            return event
    return {"error": "Event not found"}

@app.put("/api/event/{event_id}", response_model=Event)
def update_event(event_id: int, updated_event: Event):
    for i, event in enumerate(fake_events_db):
        if event["id"] == event_id:
            fake_events_db[i] = updated_event.dict()
            return updated_event
    return {"error": "Event not found"}

@app.delete("/api/event/{event_id}")
def delete_event(event_id: int):
    for i, event in enumerate(fake_events_db):
        if event["id"] == event_id:
            del fake_events_db[i]
            return {"message": "Event deleted"}
    return {"error": "Event not found"}

# Alumni
@app.get("/api/alumni", response_model=List[Alumnus])
def get_alumni():
    return fake_alumni_db

@app.post("/api/alumni", response_model=Alumnus)
def create_alumnus(alumnus: Alumnus):
    fake_alumni_db.append(alumnus.dict())
    return alumnus

@app.get("/api/alumni/{alumnus_id}", response_model=Alumnus)
def get_alumnus(alumnus_id: int):
    for alumnus in fake_alumni_db:
        if alumnus["id"] == alumnus_id:
            return alumnus
    return {"error": "Alumnus not found"}

@app.put("/api/alumni/{alumnus_id}", response_model=Alumnus)
def update_alumnus(alumnus_id: int, updated_alumnus: Alumnus):
    for i, alumnus in enumerate(fake_alumni_db):
        if alumnus["id"] == alumnus_id:
            fake_alumni_db[i] = updated_alumnus.dict()
            return updated_alumnus
    return {"error": "Alumnus not found"}

@app.delete("/api/alumni/{alumnus_id}")
def delete_alumnus(alumnus_id: int):
    for i, alumnus in enumerate(fake_alumni_db):
        if alumnus["id"] == alumnus_id:
            del fake_alumni_db[i]
            return {"message": "Alumnus deleted"}
    return {"error": "Alumnus not found"}
