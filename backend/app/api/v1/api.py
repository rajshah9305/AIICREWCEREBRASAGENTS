from fastapi import APIRouter
from app.api.v1.endpoints import crews, executions, agents, tasks, templates, analytics, system

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(crews.router, prefix="/crews", tags=["crews"])
api_router.include_router(executions.router, prefix="/executions", tags=["executions"])
api_router.include_router(agents.router, prefix="/agents", tags=["agents"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(templates.router, prefix="/templates", tags=["templates"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(system.router, prefix="/system", tags=["system"]) 