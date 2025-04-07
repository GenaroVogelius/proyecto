from abc import abstractmethod
from typing import Any, Dict, Optional
from channels.generic.websocket import AsyncWebsocketConsumer
import logging
import json

logger = logging.getLogger(__name__)

class WebsocketInterfaceInternal(AsyncWebsocketConsumer):
    """
    Internal WebSocket consumer interface following SOLID principles.
    Handles the communication between the application and clients.
    """

    def __init__(self, *args, external_conector: Any, book_limitation: int, **kwargs):
        super().__init__(*args, **kwargs)
        self.external_conector = external_conector
        self.book_limitation = book_limitation
        self.room_group_name = None
        self._is_connected = False

    @property
    def is_connected(self) -> bool:
        """Returns the current connection status."""
        return self._is_connected

    async def connect(self) -> None:
        """Handle WebSocket connection."""
        try:
            self.room_group_name = self.scope['url_route']['kwargs']['room_name']
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
            self._is_connected = True
            logger.info(f"WebSocket connected to room: {self.room_group_name}")
        except Exception as e:
            logger.error(f"Error during WebSocket connection: {str(e)}")
            await self.close()

    async def disconnect(self, close_code: int) -> None:
        """Handle WebSocket disconnection."""
        try:
            if self.room_group_name:
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
            self._is_connected = False
            logger.info(f"WebSocket disconnected from room: {self.room_group_name}")
        except Exception as e:
            logger.error(f"Error during WebSocket disconnection: {str(e)}")

    async def receive(self, text_data: str) -> None:
        """Handle received WebSocket message."""
        try:
            data = json.loads(text_data)
            await self.process_message(data)
        except json.JSONDecodeError:
            logger.error("Invalid JSON received")
            await self.send_error("Invalid message format")
        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")
            await self.send_error("Internal server error")

    @abstractmethod
    async def process_message(self, data: Dict[str, Any]) -> None:
        """Process the received message."""
        pass

    async def send_data(self, data: Dict[str, Any]) -> None:
        """Send data to the WebSocket client."""
        try:
            await self.send(text_data=json.dumps(data))
        except Exception as e:
            logger.error(f"Error sending data: {str(e)}")

    async def send_error(self, message: str) -> None:
        """Send error message to the WebSocket client."""
        error_data = {
            "type": "error",
            "message": message
        }
        await self.send_data(error_data)

    async def group_send(self, data: Dict[str, Any]) -> None:
        """Send data to all clients in the room group."""
        try:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_data",
                    "data": data
                }
            )
        except Exception as e:
            logger.error(f"Error sending group message: {str(e)}") 