from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Enum, ForeignKey,
    Boolean, DECIMAL
)
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum
from zoneinfo import ZoneInfo

Base = declarative_base()

# --- ENUMS ---

class UserRole(enum.Enum):
    Student = "Student"
    Alumni = "Alumni"
    Admin = "Admin"

class EventOrgType(enum.Enum):
    Club = "Club"
    Department = "Department"
    Institute = "Institute"
    Hostel = "Hostel"

class EventType(enum.Enum):
    Reunion = "Reunion"
    Webinar = "Webinar"
    Seminar = "Seminar"
    Cultural = "Cultural"
    Technical = "Technical"
    Sports = "Sports"
    Institute = "Institute"

class ParticipantRole(enum.Enum):
    Participant = "Participant"
    Guest = "Guest"
    Speaker = "Speaker"
    Panelist = "Panelist"
    Organizer = "Organizer"

class OpportunityType(enum.Enum):
    Job = "Job"
    Internship = "Internship"
    Mentorship = "Mentorship"
    Referral = "Referral"

class MentorshipStatus(enum.Enum):
    Accepted = "Accepted"
    Pending = "Pending"
    Rejected = "Rejected"


# --- CORE USER & PROFILES ---

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    created_at = Column(DateTime, default=datetime.now(ZoneInfo("Asia/Kolkata")), nullable=False)

    alumni_profile = relationship("AlumniProfile", uselist=False, back_populates="user")
    student_profile = relationship("StudentProfile", uselist=False, back_populates="user")
    admin_profile = relationship("AdminProfile", uselist=False, back_populates="user")


class AlumniProfile(Base):
    __tablename__ = "alumni_profiles"

    alumni_id = Column(Integer, ForeignKey("users.user_id"), primary_key=True)
    alumni_name = Column(String, nullable=False)
    ph_no = Column(String)
    graduation_year = Column(Integer, nullable=False)
    department_id = Column(Integer, ForeignKey("department.department_id"), nullable=False)
    bio = Column(Text)
    linkedin_profile_url = Column(String)

    user = relationship("User", back_populates="alumni_profile")


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    student_id = Column(Integer, ForeignKey("users.user_id"), primary_key=True)
    student_name = Column(String, nullable=False)
    department_id = Column(Integer, ForeignKey("department.department_id"), nullable=False)
    ph_no = Column(String)
    joined_year = Column(Integer)
    bio = Column(Text)

    user = relationship("User", back_populates="student_profile")


class AdminProfile(Base):
    __tablename__ = "admin_profiles"

    admin_id = Column(Integer, ForeignKey("users.user_id"), primary_key=True)
    admin_name = Column(String, nullable=False)
    personal_details = Column(Text)
    started_on = Column(Date)
    ended_on = Column(Date)

    user = relationship("User", back_populates="admin_profile")


# --- INSTITUTION STRUCTURE ---

class Department(Base):
    __tablename__ = "department"

    department_id = Column(Integer, primary_key=True, autoincrement=True)
    department_name = Column(String, unique=True, nullable=False)


class Organization(Base):
    __tablename__ = "organization"

    organization_id = Column(Integer, primary_key=True, autoincrement=True)
    organization_name = Column(String, unique=True, nullable=False)
    website = Column(String)
    description = Column(Text)


# --- CORE FEATURES ---

class Career(Base):
    __tablename__ = "career"

    career_id = Column(Integer, primary_key=True, autoincrement=True)
    alumni_id = Column(Integer, ForeignKey("alumni_profiles.alumni_id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organization.organization_id"), nullable=False)
    role = Column(String, nullable=False)
    location = Column(String)
    started_on = Column(Date, nullable=False)
    worked_till = Column(Date)  # NULL means current job
    description = Column(Text)


class EventOrganizer(Base):
    __tablename__ = "event_organizers"

    event_org_id = Column(Integer, primary_key=True, autoincrement=True)
    event_org_type = Column(Enum(EventOrgType), nullable=False)
    event_org_name = Column(String, nullable=False)
    description = Column(Text)


class Event(Base):
    __tablename__ = "event"

    event_id = Column(Integer, primary_key=True, autoincrement=True)
    event_name = Column(String, nullable=False)
    event_type = Column(Enum(EventType), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime)
    description = Column(Text)
    event_org_id = Column(Integer, ForeignKey("event_organizers.event_org_id"), nullable=False)


class EventParticipation(Base):
    __tablename__ = "event_participation"

    event_id = Column(Integer, ForeignKey("event.event_id"), primary_key=True)
    alumni_id = Column(Integer, ForeignKey("alumni_profiles.alumni_id"), primary_key=True)
    role = Column(Enum(ParticipantRole), default=ParticipantRole.Participant, nullable=False)
    feedback = Column(Text)


class Donation(Base):
    __tablename__ = "donation"

    donation_id = Column(Integer, primary_key=True, autoincrement=True)
    alumni_id = Column(Integer, ForeignKey("alumni_profiles.alumni_id"), nullable=False)
    event_id = Column(Integer, ForeignKey("event.event_id"))
    amount = Column(DECIMAL(10, 2), nullable=False)
    currency = Column(String(3), default="INR", nullable=False)
    transaction_id = Column(String, unique=True, nullable=False)
    donation_date = Column(DateTime, default=datetime.now(ZoneInfo("Asia/Kolkata")), nullable=False)


class Opportunity(Base):
    __tablename__ = "opportunity"

    opportunity_id = Column(Integer, primary_key=True, autoincrement=True)
    posted_by_alumni_id = Column(Integer, ForeignKey("alumni_profiles.alumni_id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organization.organization_id"))
    type = Column(Enum(OpportunityType), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    target_audience = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# --- MENTORSHIP MODULE ---

class Request(Base):
    __tablename__ = "requests"

    request_id = Column(Integer, primary_key=True, autoincrement=True)
    request_name = Column(String)
    student_id = Column(Integer, ForeignKey("student_profiles.student_id"), nullable=False)
    alumni_id = Column(Integer, ForeignKey("alumni_profiles.alumni_id"), nullable=False)
    request_desc = Column(Text)
    requested_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    req_status = Column(Enum(MentorshipStatus), default=MentorshipStatus.Pending, nullable=False)
    action_taken_by = Column(Integer, ForeignKey("admin_profiles.admin_id"))


class Mentorship(Base):
    __tablename__ = "mentorship"

    mentorship_id = Column(Integer, primary_key=True, autoincrement=True)
    request_id = Column(Integer, ForeignKey("requests.request_id"), nullable=False)
    mentor_id = Column(Integer, ForeignKey("alumni_profiles.alumni_id"), nullable=False)
    feedback = Column(Text)
