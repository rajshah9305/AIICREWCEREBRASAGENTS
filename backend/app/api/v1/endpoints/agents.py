from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db

router = APIRouter()

@router.get("/")
async def get_agents(db: Session = Depends(get_db)):
    """Get all agents"""
    return {"message": "Agents endpoint - to be implemented"}

@router.post("/")
async def create_agent(db: Session = Depends(get_db)):
    """Create a new agent"""
    return {"message": "Create agent endpoint - to be implemented"} 