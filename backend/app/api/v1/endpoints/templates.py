from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime, timezone

from app.core.database import get_db

router = APIRouter()

# Mock templates for development
MOCK_TEMPLATES = [
    {
        "id": "template-1",
        "name": "Research Team",
        "description": "A template for research and analysis tasks",
        "category": "research",
        "agents": [
            {
                "name": "Research Analyst",
                "role": "Senior Research Analyst",
                "goal": "Conduct thorough research and analysis",
                "backstory": "Expert in market research and data analysis"
            }
        ],
        "tasks": [
            {
                "name": "Market Research",
                "description": "Analyze market trends and opportunities",
                "expected_output": "Comprehensive market analysis report"
            }
        ],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "template-2",
        "name": "Content Creation",
        "description": "Template for content creation and marketing",
        "category": "content",
        "agents": [
            {
                "name": "Content Writer",
                "role": "Senior Content Writer",
                "goal": "Create engaging and high-quality content",
                "backstory": "Experienced writer with expertise in digital marketing"
            }
        ],
        "tasks": [
            {
                "name": "Blog Post Creation",
                "description": "Write informative blog posts",
                "expected_output": "SEO-optimized blog post"
            }
        ],
        "created_at": datetime.now(timezone.utc).isoformat()
    }
]

@router.get("/", response_model=List[Dict[str, Any]])
async def get_templates(db: Session = Depends(get_db)):
    """Get all crew templates"""
    # Return mock templates for development
    # In production, this would query a templates table
    return MOCK_TEMPLATES

@router.get("/{template_id}", response_model=Dict[str, Any])
async def get_template(template_id: str, db: Session = Depends(get_db)):
    """Get a specific template by ID"""
    template = next((t for t in MOCK_TEMPLATES if t["id"] == template_id), None)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.post("/", response_model=Dict[str, Any])
async def create_template(template_data: Dict[str, Any], db: Session = Depends(get_db)):
    """Create a new template"""
    # For development, return the created template with an ID
    new_template = {
        "id": f"template-{len(MOCK_TEMPLATES) + 1}",
        "created_at": datetime.now(timezone.utc).isoformat(),
        **template_data
    }
    MOCK_TEMPLATES.append(new_template)
    return new_template 