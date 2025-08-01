from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db

router = APIRouter()

@router.get("/")
async def get_analytics(db: Session = Depends(get_db)):
    """Get analytics data"""
    return {"message": "Analytics endpoint - to be implemented"}

@router.get("/executions")
async def get_execution_stats(db: Session = Depends(get_db)):
    """Get execution statistics"""
    return {"message": "Execution stats endpoint - to be implemented"} 