from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import (
    Base, User, UserRole, AlumniProfile, StudentProfile,
    Department, EventOrganizer, Event, EventType, EventOrgType
)
from datetime import datetime
from auth import hash_password

# Create all tables
Base.metadata.create_all(bind=engine)

# Seed data
def seed():
    db: Session = SessionLocal()

    # Departments
    cse = Department(department_name="Computer Science")
    ece = Department(department_name="Electronics")
    db.add_all([cse, ece])
    db.commit()

    # Users & Alumni
    u1 = User(user_id=112201026, email="gurpreet.singh@example.com", password_hash=hash_password("hash1"), role=UserRole.Alumni)
    u2 = User(user_id=112201014, email="mandeep.kaur@example.com", password_hash=hash_password("hash2"), role=UserRole.Student)
    db.add_all([u1, u2])
    db.commit()

    a1 = AlumniProfile(
        alumni_id=u1.user_id,
        alumni_name="Gurpreet Singh",
        ph_no="9876543210",
        graduation_year=2015,
        department_id=cse.department_id,
        bio="Software Engineer passionate about AI.",
        linkedin_profile_url="https://linkedin.com/in/gurpreet"
    )
    s1 = StudentProfile(
        student_id=u2.user_id,
        student_name="Mandeep Kaur",
        department_id=ece.department_id,
        ph_no="9123456780",
        joined_year=2022,
        bio="Final year student interested in IoT."
    )
    db.add_all([a1, s1])
    db.commit()

    # Event Organizers
    org = EventOrganizer(event_org_type=EventOrgType.Club,
                         event_org_name="Punjabi Cultural Club",
                         description="Promotes Punjabi heritage")
    db.add(org)
    db.commit()

    # Events (Punjabi cultural)
    event1 = Event(
        event_name="Baisakhi Celebration",
        event_type=EventType.Cultural,
        start_time=datetime(2024, 4, 13, 18, 0),
        end_time=datetime(2024, 4, 13, 22, 0),
        description="Dance, Gidda, and Bhangra performances.",
        event_org_id=org.event_org_id
    )
    event2 = Event(
        event_name="Punjabi Folk Music Night",
        event_type=EventType.Cultural,
        start_time=datetime(2024, 8, 20, 19, 0),
        end_time=datetime(2024, 8, 20, 23, 0),
        description="Live dhol and folk singers.",
        event_org_id=org.event_org_id
    )
    db.add_all([event1, event2])
    db.commit()

    db.close()
    print("Seed data inserted!")

if __name__ == "__main__":
    seed()
