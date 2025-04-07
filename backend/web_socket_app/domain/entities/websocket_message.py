from dataclasses import dataclass
from typing import Any, Dict, Optional
from datetime import datetime

@dataclass
class WebSocketMessage:
    """
    Entity representing a WebSocket message.
    """
    type: str
    data: Dict[str, Any]
    timestamp: datetime = datetime.utcnow()
    room_name: Optional[str] = None
    error: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        """Convert the message to a dictionary."""
        return {
            "type": self.type,
            "data": self.data,
            "timestamp": self.timestamp.isoformat(),
            "room_name": self.room_name,
            "error": self.error
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'WebSocketMessage':
        """Create a WebSocketMessage from a dictionary."""
        return cls(
            type=data.get("type", ""),
            data=data.get("data", {}),
            timestamp=datetime.fromisoformat(data.get("timestamp", datetime.utcnow().isoformat())),
            room_name=data.get("room_name"),
            error=data.get("error")
        )

    @classmethod
    def create_error_message(cls, error: str, room_name: Optional[str] = None) -> 'WebSocketMessage':
        """Create an error message."""
        return cls(
            type="error",
            data={},
            room_name=room_name,
            error=error
        ) 