from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
from datetime import datetime

from app.core.database import get_db
from app.models.crew import Crew, CrewCreate, CrewUpdate, CrewResponse
from app.services.crew_service import CrewService

router = APIRouter()

@router.get("/", response_model=List[CrewResponse])
async def get_crews(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all crews with optional filtering"""
    crew_service = CrewService(db)
    crews = crew_service.get_crews(skip=skip, limit=limit, status=status, category=category)
    return crews

@router.get("/{crew_id}", response_model=CrewResponse)
async def get_crew(crew_id: str, db: Session = Depends(get_db)):
    """Get a specific crew by ID"""
    crew_service = CrewService(db)
    crew = crew_service.get_crew(crew_id)
    if not crew:
        raise HTTPException(status_code=404, detail="Crew not found")
    return crew

@router.post("/", response_model=CrewResponse)
async def create_crew(crew: CrewCreate, db: Session = Depends(get_db)):
    """Create a new crew"""
    crew_service = CrewService(db)
    created_crew = crew_service.create_crew(crew)
    return created_crew

@router.put("/{crew_id}", response_model=CrewResponse)
async def update_crew(crew_id: str, crew: CrewUpdate, db: Session = Depends(get_db)):
    """Update an existing crew"""
    crew_service = CrewService(db)
    updated_crew = crew_service.update_crew(crew_id, crew)
    if not updated_crew:
        raise HTTPException(status_code=404, detail="Crew not found")
    return updated_crew

@router.delete("/{crew_id}")
async def delete_crew(crew_id: str, db: Session = Depends(get_db)):
    """Delete a crew"""
    crew_service = CrewService(db)
    success = crew_service.delete_crew(crew_id)
    if not success:
        raise HTTPException(status_code=404, detail="Crew not found")
    return {"message": "Crew deleted successfully"}

@router.post("/{crew_id}/execute")
async def execute_crew(crew_id: str, db: Session = Depends(get_db)):
    """Execute a crew"""
    crew_service = CrewService(db)
    execution = crew_service.execute_crew(crew_id)
    if not execution:
        raise HTTPException(status_code=404, detail="Crew not found")
    return execution

@router.get("/{crew_id}/export")
async def export_crew(crew_id: str, db: Session = Depends(get_db)):
    """Export crew configuration"""
    crew_service = CrewService(db)
    export_data = crew_service.export_crew(crew_id)
    if not export_data:
        raise HTTPException(status_code=404, detail="Crew not found")
    return export_data

@router.post("/import")
async def import_crew(crew_data: dict, db: Session = Depends(get_db)):
    """Import crew configuration"""
    crew_service = CrewService(db)
    imported_crew = crew_service.import_crew(crew_data)
    return imported_crew 