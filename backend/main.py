from fastapi import FastAPI, HTTPException, Depends, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import asyncio
import json
import os
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
import uuid
import logging

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.api import api_router
from app.core.websocket_manager import WebSocketManager
from app.services.crew_service import CrewService
from app.services.execution_service import ExecutionService
from app.services.cerebras_service import CerebrasService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)

# WebSocket manager
websocket_manager = WebSocketManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting CrewAI Dashboard API...")
    yield
    # Shutdown
    logger.info("Shutting down CrewAI Dashboard API...")

app = FastAPI(
    title="CrewAI Dashboard API",
    description="Backend API for CrewAI Dashboard",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")

# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("type") == "subscribe":
                execution_id = message.get("execution_id")
                if execution_id:
                    await websocket_manager.subscribe_to_execution(websocket, execution_id)
            
            elif message.get("type") == "unsubscribe":
                execution_id = message.get("execution_id")
                if execution_id:
                    await websocket_manager.unsubscribe_from_execution(websocket, execution_id)
    
    except WebSocketDisconnect:
        await websocket_manager.disconnect(websocket)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0"
    }

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "CrewAI Dashboard API",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    ) 