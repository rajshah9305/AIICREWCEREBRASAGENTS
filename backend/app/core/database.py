from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, Text, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from datetime import datetime
from typing import Optional
import json

from app.core.config import settings

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models
class Crew(Base):
    __tablename__ = "crews"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="active")
    category = Column(String)
    rating = Column(Integer, default=0)
    featured = Column(Boolean, default=False)
    executions = Column(Integer, default=0)
    last_executed = Column(DateTime)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    agents = relationship("Agent", back_populates="crew", cascade="all, delete-orphan")
    tasks = relationship("Task", back_populates="crew", cascade="all, delete-orphan")
    executions_rel = relationship("Execution", back_populates="crew")

class Agent(Base):
    __tablename__ = "agents"
    
    id = Column(String, primary_key=True, index=True)
    crew_id = Column(String, ForeignKey("crews.id"))
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    goal = Column(Text, nullable=False)
    backstory = Column(Text)
    tools = Column(JSON)
    max_iterations = Column(Integer, default=5)
    temperature = Column(Integer, default=0.7)
    model = Column(String, default="llama-4-maverick-17b-128e-instruct")
    status = Column(String, default="idle")
    performance = Column(Integer, default=0)
    tasks_completed = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    crew = relationship("Crew", back_populates="agents")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(String, primary_key=True, index=True)
    crew_id = Column(String, ForeignKey("crews.id"))
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    expected_output = Column(Text, nullable=False)
    assigned_agent = Column(String)
    priority = Column(String, default="medium")
    context = Column(Text)
    output_format = Column(String, default="text")
    status = Column(String, default="pending")
    progress = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    crew = relationship("Crew", back_populates="tasks")

class Execution(Base):
    __tablename__ = "executions"
    
    id = Column(String, primary_key=True, index=True)
    crew_id = Column(String, ForeignKey("crews.id"))
    crew_name = Column(String)
    status = Column(String, default="pending")
    started_at = Column(DateTime, default=func.now())
    completed_at = Column(DateTime)
    duration = Column(Integer, default=0)  # in milliseconds
    tokens_used = Column(Integer, default=0)
    api_calls = Column(Integer, default=0)
    result = Column(Text)
    logs = Column(JSON)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    crew = relationship("Crew", back_populates="executions_rel")

class Template(Base):
    __tablename__ = "templates"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    rating = Column(Integer, default=0)
    featured = Column(Boolean, default=False)
    data = Column(JSON)  # Store template configuration
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

class SystemMetrics(Base):
    __tablename__ = "system_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    cpu_usage = Column(Integer, default=0)
    memory_usage = Column(Integer, default=0)
    network_usage = Column(Integer, default=0)
    disk_usage = Column(Integer, default=0)
    active_executions = Column(Integer, default=0)
    total_executions = Column(Integer, default=0)
    timestamp = Column(DateTime, default=func.now()) 