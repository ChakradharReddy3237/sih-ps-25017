from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DB_PASSWORD = os.getenv("DB_PASSWORD")

DATABASE_URL = f"postgresql+psycopg2://postgres:{DB_PASSWORD}@localhost:5432/plenilune"

engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
