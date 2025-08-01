from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="CrewAI Dashboard API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "CrewAI Dashboard API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": "2024-01-15T10:30:00Z"}

@app.get("/api/v1/crews")
async def get_crews():
    return [
        {
            "id": "1",
            "name": "Research & Analysis Team",
            "description": "Multi-agent research workflow with analyst, researcher, and writer",
            "status": "active",
            "category": "Research",
            "rating": 4.8,
            "featured": True,
            "executions": 12,
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z"
        },
        {
            "id": "2",
            "name": "Content Creation Squad",
            "description": "SEO-optimized content creation with strategist and editor",
            "status": "active",
            "category": "Content",
            "rating": 4.5,
            "featured": False,
            "executions": 8,
            "created_at": "2024-01-15T09:30:00Z",
            "updated_at": "2024-01-15T09:30:00Z"
        },
        {
            "id": "3",
            "name": "Code Review Team",
            "description": "Automated code review with security and performance analysis",
            "status": "active",
            "category": "Development",
            "rating": 4.7,
            "featured": True,
            "executions": 15,
            "created_at": "2024-01-15T08:30:00Z",
            "updated_at": "2024-01-15T08:30:00Z"
        }
    ]

@app.get("/api/v1/executions")
async def get_executions():
    return [
        {
            "id": "1",
            "crew_id": "1",
            "crew_name": "Research & Analysis Team",
            "status": "completed",
            "started_at": "2024-01-15T10:00:00Z",
            "completed_at": "2024-01-15T10:30:00Z",
            "duration": 1800000,
            "tokens_used": 15420,
            "api_calls": 45,
            "created_at": "2024-01-15T10:00:00Z"
        },
        {
            "id": "2",
            "crew_id": "2",
            "crew_name": "Content Creation Squad",
            "status": "running",
            "started_at": "2024-01-15T10:15:00Z",
            "completed_at": None,
            "duration": 900000,
            "tokens_used": 8200,
            "api_calls": 25,
            "created_at": "2024-01-15T10:15:00Z"
        }
    ]

@app.get("/api/v1/system/metrics")
async def get_system_metrics():
    return {
        "cpu_usage": 45,
        "memory_usage": 67,
        "network_usage": 23,
        "disk_usage": 34,
        "active_executions": 1,
        "total_executions": 25,
        "timestamp": "2024-01-15T10:30:00Z"
    }

if __name__ == "__main__":
    print("🚀 Starting CrewAI Dashboard Backend...")
    print("📍 Host: 0.0.0.0")
    print("🔌 Port: 8000")
    print("🌐 API URL: http://localhost:8000")
    print("📚 Docs: http://localhost:8000/docs")
    print("=" * 50)
    
    uvicorn.run(
        "simple_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 