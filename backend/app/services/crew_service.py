from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import json

from app.core.database import Crew, Agent, Task, Execution
from app.models.crew import CrewCreate, CrewUpdate, CrewResponse
from app.services.execution_service import ExecutionService
from app.services.cerebras_service import CerebrasService

class CrewService:
    def __init__(self, db: Session):
        self.db = db
        self.execution_service = ExecutionService(db)
        self.cerebras_service = CerebrasService()

    def get_crews(self, skip: int = 0, limit: int = 100, status: Optional[str] = None, category: Optional[str] = None) -> List[CrewResponse]:
        """Get all crews with optional filtering"""
        query = self.db.query(Crew)
        
        if status:
            query = query.filter(Crew.status == status)
        if category:
            query = query.filter(Crew.category == category)
            
        crews = query.offset(skip).limit(limit).all()
        return [CrewResponse.from_orm(crew) for crew in crews]

    def get_crew(self, crew_id: str) -> Optional[CrewResponse]:
        """Get a specific crew by ID"""
        crew = self.db.query(Crew).filter(Crew.id == crew_id).first()
        return CrewResponse.from_orm(crew) if crew else None

    def create_crew(self, crew_data: CrewCreate) -> CrewResponse:
        """Create a new crew"""
        crew_id = str(uuid.uuid4())
        
        # Create crew
        crew = Crew(
            id=crew_id,
            name=crew_data.name,
            description=crew_data.description,
            status=crew_data.status.value,
            category=crew_data.category,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        
        self.db.add(crew)
        self.db.commit()
        self.db.refresh(crew)
        
        # Create agents if provided
        if crew_data.agents:
            for agent_data in crew_data.agents:
                agent = Agent(
                    id=str(uuid.uuid4()),
                    crew_id=crew_id,
                    name=agent_data.get("name", ""),
                    role=agent_data.get("role", ""),
                    goal=agent_data.get("goal", ""),
                    backstory=agent_data.get("backstory", ""),
                    tools=agent_data.get("tools", []),
                    max_iterations=agent_data.get("max_iterations", 5),
                    temperature=agent_data.get("temperature", 0.7),
                    model=agent_data.get("model", "llama-4-maverick-17b-128e-instruct"),
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                self.db.add(agent)
        
        # Create tasks if provided
        if crew_data.tasks:
            for task_data in crew_data.tasks:
                task = Task(
                    id=str(uuid.uuid4()),
                    crew_id=crew_id,
                    name=task_data.get("name", ""),
                    description=task_data.get("description", ""),
                    expected_output=task_data.get("expected_output", ""),
                    assigned_agent=task_data.get("assigned_agent", ""),
                    priority=task_data.get("priority", "medium"),
                    context=task_data.get("context", ""),
                    output_format=task_data.get("output_format", "text"),
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                self.db.add(task)
        
        self.db.commit()
        return CrewResponse.from_orm(crew)

    def update_crew(self, crew_id: str, crew_data: CrewUpdate) -> Optional[CrewResponse]:
        """Update an existing crew"""
        crew = self.db.query(Crew).filter(Crew.id == crew_id).first()
        if not crew:
            return None
        
        # Update crew fields
        if crew_data.name is not None:
            crew.name = crew_data.name
        if crew_data.description is not None:
            crew.description = crew_data.description
        if crew_data.category is not None:
            crew.category = crew_data.category
        if crew_data.status is not None:
            crew.status = crew_data.status.value
        
        crew.updated_at = datetime.now(timezone.utc)
        
        self.db.commit()
        self.db.refresh(crew)
        return CrewResponse.from_orm(crew)

    def delete_crew(self, crew_id: str) -> bool:
        """Delete a crew"""
        crew = self.db.query(Crew).filter(Crew.id == crew_id).first()
        if not crew:
            return False
        
        self.db.delete(crew)
        self.db.commit()
        return True

    def execute_crew(self, crew_id: str) -> Optional[Dict[str, Any]]:
        """Execute a crew"""
        crew = self.db.query(Crew).filter(Crew.id == crew_id).first()
        if not crew:
            return None
        
        # Create execution record
        execution = Execution(
            id=str(uuid.uuid4()),
            crew_id=crew_id,
            crew_name=crew.name,
            status="running",
            started_at=datetime.now(timezone.utc),
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        
        self.db.add(execution)
        self.db.commit()
        
        # Start execution in background
        self.execution_service.start_execution(execution.id, crew_id)
        
        return {
            "id": execution.id,
            "crew_id": crew_id,
            "crew_name": crew.name,
            "status": "running",
            "started_at": execution.started_at.isoformat()
        }

    def export_crew(self, crew_id: str) -> Optional[Dict[str, Any]]:
        """Export crew configuration"""
        crew = self.db.query(Crew).filter(Crew.id == crew_id).first()
        if not crew:
            return None
        
        # Get agents and tasks
        agents = self.db.query(Agent).filter(Agent.crew_id == crew_id).all()
        tasks = self.db.query(Task).filter(Task.crew_id == crew_id).all()
        
        return {
            "crew": {
                "name": crew.name,
                "description": crew.description,
                "category": crew.category,
                "status": crew.status
            },
            "agents": [
                {
                    "name": agent.name,
                    "role": agent.role,
                    "goal": agent.goal,
                    "backstory": agent.backstory,
                    "tools": agent.tools,
                    "max_iterations": agent.max_iterations,
                    "temperature": agent.temperature,
                    "model": agent.model
                }
                for agent in agents
            ],
            "tasks": [
                {
                    "name": task.name,
                    "description": task.description,
                    "expected_output": task.expected_output,
                    "assigned_agent": task.assigned_agent,
                    "priority": task.priority,
                    "context": task.context,
                    "output_format": task.output_format
                }
                for task in tasks
            ],
            "exported_at": datetime.now(timezone.utc).isoformat()
        }

    def import_crew(self, crew_data: Dict[str, Any]) -> CrewResponse:
        """Import crew configuration"""
        crew_id = str(uuid.uuid4())
        
        # Create crew
        crew = Crew(
            id=crew_id,
            name=crew_data["crew"]["name"],
            description=crew_data["crew"]["description"],
            category=crew_data["crew"]["category"],
            status=crew_data["crew"]["status"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        self.db.add(crew)
        
        # Create agents
        for agent_data in crew_data.get("agents", []):
            agent = Agent(
                id=str(uuid.uuid4()),
                crew_id=crew_id,
                name=agent_data["name"],
                role=agent_data["role"],
                goal=agent_data["goal"],
                backstory=agent_data.get("backstory", ""),
                tools=agent_data.get("tools", []),
                max_iterations=agent_data.get("max_iterations", 5),
                temperature=agent_data.get("temperature", 0.7),
                model=agent_data.get("model", "llama-4-maverick-17b-128e-instruct"),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            self.db.add(agent)
        
        # Create tasks
        for task_data in crew_data.get("tasks", []):
            task = Task(
                id=str(uuid.uuid4()),
                crew_id=crew_id,
                name=task_data["name"],
                description=task_data["description"],
                expected_output=task_data["expected_output"],
                assigned_agent=task_data.get("assigned_agent", ""),
                priority=task_data.get("priority", "medium"),
                context=task_data.get("context", ""),
                output_format=task_data.get("output_format", "text"),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            self.db.add(task)
        
        self.db.commit()
        self.db.refresh(crew)
        return CrewResponse.from_orm(crew) 