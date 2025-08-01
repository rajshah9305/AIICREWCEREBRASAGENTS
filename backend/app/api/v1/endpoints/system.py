from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.services.execution_service import ExecutionService

router = APIRouter()

@router.get("/info")
async def get_system_info(db: Session = Depends(get_db)):
    """Get system information"""
    return {
        "name": "CrewAI Dashboard",
        "version": "1.0.0",
        "status": "healthy",
        "environment": "development"
    }

@router.get("/health")
async def get_system_health(db: Session = Depends(get_db)):
    """Get system health status"""
    return {
        "status": "healthy",
        "timestamp": "2024-01-15T10:30:00Z",
        "uptime": "2h 15m 30s"
    }

@router.get("/metrics")
async def get_system_metrics(db: Session = Depends(get_db)):
    """Get system metrics"""
    execution_service = ExecutionService(db)
    metrics = execution_service.get_system_metrics()
    return metrics 