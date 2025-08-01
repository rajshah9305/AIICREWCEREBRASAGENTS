from fastapi import WebSocket
from typing import Dict, List, Set
import json
import logging

logger = logging.getLogger(__name__)

class WebSocketManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.execution_subscriptions: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket):
        """Connect a new WebSocket client"""
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket connected. Total connections: {len(self.active_connections)}")

    async def disconnect(self, websocket: WebSocket):
        """Disconnect a WebSocket client"""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        
        # Remove from all execution subscriptions
        for execution_id in list(self.execution_subscriptions.keys()):
            if websocket in self.execution_subscriptions[execution_id]:
                self.execution_subscriptions[execution_id].remove(websocket)
                if not self.execution_subscriptions[execution_id]:
                    del self.execution_subscriptions[execution_id]
        
        logger.info(f"WebSocket disconnected. Total connections: {len(self.active_connections)}")

    async def subscribe_to_execution(self, websocket: WebSocket, execution_id: str):
        """Subscribe a WebSocket client to execution updates"""
        if execution_id not in self.execution_subscriptions:
            self.execution_subscriptions[execution_id] = set()
        
        self.execution_subscriptions[execution_id].add(websocket)
        logger.info(f"Subscribed to execution {execution_id}. Total subscribers: {len(self.execution_subscriptions[execution_id])}")

    async def unsubscribe_from_execution(self, websocket: WebSocket, execution_id: str):
        """Unsubscribe a WebSocket client from execution updates"""
        if execution_id in self.execution_subscriptions:
            self.execution_subscriptions[execution_id].discard(websocket)
            if not self.execution_subscriptions[execution_id]:
                del self.execution_subscriptions[execution_id]
            logger.info(f"Unsubscribed from execution {execution_id}")

    async def send_to_execution(self, execution_id: str, message: dict):
        """Send message to all subscribers of an execution"""
        if execution_id not in self.execution_subscriptions:
            return
        
        message_json = json.dumps(message)
        disconnected_websockets = []
        
        for websocket in self.execution_subscriptions[execution_id]:
            try:
                await websocket.send_text(message_json)
            except Exception as e:
                logger.error(f"Error sending message to WebSocket: {e}")
                disconnected_websockets.append(websocket)
        
        # Remove disconnected websockets
        for websocket in disconnected_websockets:
            await self.disconnect(websocket)

    async def send_to_all(self, message: dict):
        """Send message to all connected WebSocket clients"""
        message_json = json.dumps(message)
        disconnected_websockets = []
        
        for websocket in self.active_connections:
            try:
                await websocket.send_text(message_json)
            except Exception as e:
                logger.error(f"Error sending message to WebSocket: {e}")
                disconnected_websockets.append(websocket)
        
        # Remove disconnected websockets
        for websocket in disconnected_websockets:
            await self.disconnect(websocket)

    async def send_personal_message(self, message: dict, websocket: WebSocket):
        """Send message to a specific WebSocket client"""
        try:
            message_json = json.dumps(message)
            await websocket.send_text(message_json)
        except Exception as e:
            logger.error(f"Error sending personal message: {e}")
            await self.disconnect(websocket) 