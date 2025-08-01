from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
import asyncio
import json
from datetime import datetime, timezone
import uuid

from app.core.database import Execution, Crew, Agent, Task
from app.services.cerebras_service import CerebrasService
from app.core.websocket_manager import WebSocketManager

class ExecutionService:
    def __init__(self, db: Session):
        self.db = db
        self.cerebras_service = CerebrasService()
        self.websocket_manager = WebSocketManager()

    def get_executions(self, skip: int = 0, limit: int = 100, status: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get all executions with optional filtering"""
        query = self.db.query(Execution)
        
        if status:
            query = query.filter(Execution.status == status)
            
        executions = query.offset(skip).limit(limit).all()
        return [
            {
                "id": exec.id,
                "crew_id": exec.crew_id,
                "crew_name": exec.crew_name,
                "status": exec.status,
                "started_at": exec.started_at.isoformat() if exec.started_at else None,
                "completed_at": exec.completed_at.isoformat() if exec.completed_at else None,
                "duration": exec.duration,
                "tokens_used": exec.tokens_used,
                "api_calls": exec.api_calls,
                "result": exec.result,
                "created_at": exec.created_at.isoformat() if exec.created_at else None
            }
            for exec in executions
        ]

    def get_execution(self, execution_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific execution by ID"""
        execution = self.db.query(Execution).filter(Execution.id == execution_id).first()
        if not execution:
            return None
        
        return {
            "id": execution.id,
            "crew_id": execution.crew_id,
            "crew_name": execution.crew_name,
            "status": execution.status,
            "started_at": execution.started_at.isoformat() if execution.started_at else None,
            "completed_at": execution.completed_at.isoformat() if execution.completed_at else None,
            "duration": execution.duration,
            "tokens_used": execution.tokens_used,
            "api_calls": execution.api_calls,
            "result": execution.result,
            "logs": execution.logs or [],
            "created_at": execution.created_at.isoformat() if execution.created_at else None
        }

    def start_execution(self, execution_id: str, crew_id: str):
        """Start a crew execution"""
        # Get crew and its agents/tasks
        crew = self.db.query(Crew).filter(Crew.id == crew_id).first()
        if not crew:
            return
        
        agents = self.db.query(Agent).filter(Agent.crew_id == crew_id).all()
        tasks = self.db.query(Task).filter(Task.crew_id == crew_id).all()
        
        # Start execution in background
        asyncio.create_task(self._execute_crew(execution_id, crew, agents, tasks))

    async def _execute_crew(self, execution_id: str, crew: Crew, agents: List[Agent], tasks: List[Task]):
        """Execute crew in background"""
        try:
            # Update execution status
            execution = self.db.query(Execution).filter(Execution.id == execution_id).first()
            if not execution:
                return
            
            execution.status = "running"
            self.db.commit()
            
            # Send WebSocket update
            await self.websocket_manager.send_to_execution(
                execution_id,
                {
                    "type": "execution_started",
                    "execution_id": execution_id,
                    "crew_name": crew.name,
                    "timestamp": datetime.utcnow().isoformat()
                }
            )
            
            # Simulate execution steps
            logs = []
            tokens_used = 0
            api_calls = 0
            
            # Step 1: Initialize
            log_entry = {
                "timestamp": datetime.utcnow().isoformat(),
                "message": f"🚀 Starting execution of crew: {crew.name}",
                "type": "info"
            }
            logs.append(log_entry)
            await self._send_log_update(execution_id, log_entry)
            
            # Step 2: Process each agent
            for agent in agents:
                log_entry = {
                    "timestamp": datetime.utcnow().isoformat(),
                    "message": f"🧠 Initializing agent: {agent.name} ({agent.role})",
                    "type": "info"
                }
                logs.append(log_entry)
                await self._send_log_update(execution_id, log_entry)
                
                # Simulate agent processing
                await asyncio.sleep(2)
                tokens_used += 1500
                api_calls += 3
                
                log_entry = {
                    "timestamp": datetime.utcnow().isoformat(),
                    "message": f"✅ Agent {agent.name} initialized successfully",
                    "type": "success"
                }
                logs.append(log_entry)
                await self._send_log_update(execution_id, log_entry)
            
            # Step 3: Process tasks
            for task in tasks:
                log_entry = {
                    "timestamp": datetime.utcnow().isoformat(),
                    "message": f"📝 Processing task: {task.name}",
                    "type": "info"
                }
                logs.append(log_entry)
                await self._send_log_update(execution_id, log_entry)
                
                # Simulate task processing
                await asyncio.sleep(3)
                tokens_used += 2000
                api_calls += 5
                
                log_entry = {
                    "timestamp": datetime.utcnow().isoformat(),
                    "message": f"✅ Task '{task.name}' completed successfully",
                    "type": "success"
                }
                logs.append(log_entry)
                await self._send_log_update(execution_id, log_entry)
            
            # Step 4: Generate final result
            log_entry = {
                "timestamp": datetime.utcnow().isoformat(),
                "message": "🎯 Generating final results and report",
                "type": "info"
            }
            logs.append(log_entry)
            await self._send_log_update(execution_id, log_entry)
            
            await asyncio.sleep(2)
            tokens_used += 3000
            api_calls += 8
            
            # Generate mock result
            result = f"""
# Crew Execution Report: {crew.name}

## Summary
- **Crew**: {crew.name}
- **Description**: {crew.description or 'No description'}
- **Agents**: {len(agents)}
- **Tasks**: {len(tasks)}
- **Status**: Completed Successfully

## Execution Details
- **Started**: {execution.started_at.isoformat()}
- **Completed**: {datetime.utcnow().isoformat()}
- **Duration**: {((datetime.utcnow() - execution.started_at).total_seconds()):.2f} seconds
- **Tokens Used**: {tokens_used:,}
- **API Calls**: {api_calls}

## Agent Performance
{chr(10).join([f"- **{agent.name}** ({agent.role}): Completed successfully" for agent in agents])}

## Task Results
{chr(10).join([f"- **{task.name}**: {task.description}" for task in tasks])}

## Recommendations
1. All agents performed as expected
2. Tasks completed within acceptable timeframes
3. Consider optimizing token usage for cost efficiency
4. Monitor execution patterns for future improvements

---
*Generated by CrewAI Dashboard*
            """.strip()
            
            # Update execution with results
            execution.status = "completed"
            execution.completed_at = datetime.utcnow()
            execution.duration = int((execution.completed_at - execution.started_at).total_seconds() * 1000)
            execution.tokens_used = tokens_used
            execution.api_calls = api_calls
            execution.result = result
            execution.logs = logs
            
            self.db.commit()
            
            # Send completion update
            await self.websocket_manager.send_to_execution(
                execution_id,
                {
                    "type": "execution_completed",
                    "execution_id": execution_id,
                    "result": result,
                    "duration": execution.duration,
                    "tokens_used": tokens_used,
                    "api_calls": api_calls,
                    "timestamp": datetime.utcnow().isoformat()
                }
            )
            
        except Exception as e:
            # Handle execution error
            execution = self.db.query(Execution).filter(Execution.id == execution_id).first()
            if execution:
                execution.status = "failed"
                execution.completed_at = datetime.utcnow()
                self.db.commit()
            
            await self.websocket_manager.send_to_execution(
                execution_id,
                {
                    "type": "execution_failed",
                    "execution_id": execution_id,
                    "error": str(e),
                    "timestamp": datetime.utcnow().isoformat()
                }
            )

    async def _send_log_update(self, execution_id: str, log_entry: Dict[str, Any]):
        """Send log update via WebSocket"""
        await self.websocket_manager.send_to_execution(
            execution_id,
            {
                "type": "log_update",
                "execution_id": execution_id,
                "log": log_entry
            }
        )

    def cancel_execution(self, execution_id: str) -> bool:
        """Cancel an execution"""
        execution = self.db.query(Execution).filter(Execution.id == execution_id).first()
        if not execution or execution.status not in ["running", "pending"]:
            return False
        
        execution.status = "cancelled"
        execution.completed_at = datetime.utcnow()
        self.db.commit()
        
        # Send cancellation update
        asyncio.create_task(self.websocket_manager.send_to_execution(
            execution_id,
            {
                "type": "execution_cancelled",
                "execution_id": execution_id,
                "timestamp": datetime.utcnow().isoformat()
            }
        ))
        
        return True

    def get_execution_logs(self, execution_id: str) -> List[Dict[str, Any]]:
        """Get execution logs"""
        execution = self.db.query(Execution).filter(Execution.id == execution_id).first()
        if not execution:
            return []
        
        return execution.logs or []

    def get_system_metrics(self) -> Dict[str, Any]:
        """Get system metrics - currently using mock data for development
        
        In production, this should be replaced with real system monitoring
        using libraries like psutil for CPU/memory usage.
        """
        # Get active executions
        active_executions = self.db.query(Execution).filter(
            Execution.status.in_(["running", "pending"])
        ).count()
        
        # Get total executions
        total_executions = self.db.query(Execution).count()
        
        # Mock system metrics (in real implementation, get from system monitoring)
        return {
            "cpu_usage": 45,
            "memory_usage": 67,
            "network_usage": 23,
            "disk_usage": 34,
            "active_executions": active_executions,
            "total_executions": total_executions,
            "timestamp": datetime.now(timezone.utc).isoformat()
        } 