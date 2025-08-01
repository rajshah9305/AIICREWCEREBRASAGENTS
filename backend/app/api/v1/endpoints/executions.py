from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.services.execution_service import ExecutionService

router = APIRouter()

@router.get("/")
async def get_executions(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all executions with optional filtering"""
    execution_service = ExecutionService(db)
    executions = execution_service.get_executions(skip=skip, limit=limit, status=status)
    return executions

@router.get("/{execution_id}")
async def get_execution(execution_id: str, db: Session = Depends(get_db)):
    """Get a specific execution by ID"""
    execution_service = ExecutionService(db)
    execution = execution_service.get_execution(execution_id)
    if not execution:
        raise HTTPException(status_code=404, detail="Execution not found")
    return execution

@router.get("/{execution_id}/logs")
async def get_execution_logs(execution_id: str, db: Session = Depends(get_db)):
    """Get execution logs"""
    execution_service = ExecutionService(db)
    logs = execution_service.get_execution_logs(execution_id)
    return {"logs": logs}

@router.post("/{execution_id}/cancel")
async def cancel_execution(execution_id: str, db: Session = Depends(get_db)):
    """Cancel an execution"""
    execution_service = ExecutionService(db)
    success = execution_service.cancel_execution(execution_id)
    if not success:
        raise HTTPException(status_code=404, detail="Execution not found or cannot be cancelled")
    return {"message": "Execution cancelled successfully"} 