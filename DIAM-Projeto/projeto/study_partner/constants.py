from enum import Enum

class WebSocketMessageType(str, Enum):
    ERROR = "error"
    MESSAGE = "message"
    SUCCESS = "success"
    CONNECTION_SUCCESS = "connection_success"
    TOGGLE_LIKE = "toggle_like"
