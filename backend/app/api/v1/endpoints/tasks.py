from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timezone
import uuid

from app.core.database import get_db, Task
# Note: TaskCreate and TaskResponse models need to be defined in app.models.crew

router = APIRouter()

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(crew_id: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all tasks, optionally filtered by crew_id"""
    query = db.query(Task)
    if crew_id:
        query = query.filter(Task.crew_id == crew_id)
    
    tasks = query.all()
    return [TaskResponse.from_orm(task) for task in tasks]

@router.post("/", response_model=TaskResponse)
async def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    """Create a new task"""
    task = Task(
        id=str(uuid.uuid4()),
        crew_id=task_data.crew_id,
        name=task_data.name,
        description=task_data.description,
        expected_output=task_data.expected_output,
        assigned_agent=task_data.assigned_agent,
        priority=task_data.priority,
        context=task_data.context or "",
        output_format=task_data.output_format or "text",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    
    db.add(task)
    db.commit()
    db.refresh(task)
    
    return TaskResponse.from_orm(task) 