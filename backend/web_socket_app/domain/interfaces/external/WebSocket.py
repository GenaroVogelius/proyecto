from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
import logging

logger = logging.getLogger(__name__)

class WebSocketExternal(ABC):
    """
    Interface for external WebSocket communication
    """

    def __init__(self, keep_running: bool = True):
        self._keep_running = keep_running
        self._error_count = 0
        self._max_retries = 3


    @abstractmethod
    async def connect(self) -> None:
        """Establish connection to the external WebSocket."""
        pass

    @abstractmethod
    async def disconnect(self) -> None:
        """Close the connection to the external WebSocket."""
        pass



    async def handle_error(self, error: Exception) -> None:
        """
        Handle WebSocket errors with retry logic.
        Args:
            error (Exception): The error that occurred
        """
        self._error_count += 1
        logger.error(f"WebSocket error occurred: {str(error)}")
        
        if self._error_count <= self._max_retries:
            logger.info(f"Attempting to reconnect (attempt {self._error_count}/{self._max_retries})")
            await self.reconnect()
        else:
            logger.error("Max retry attempts reached. Stopping connection.")
            self._keep_running = False


        """Attempt to reconnect to the WebSocket."""
        pass 