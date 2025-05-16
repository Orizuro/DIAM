// export const BACKEND_HOST = '192.168.1.10:8000'
export const BACKEND_HOST = 'localhost:8000'

export const LOGIN_URL = `http://${BACKEND_HOST}/api/login/`
export const LOGOUT_URL = `http://${BACKEND_HOST}/api/logout/`
export const SIGNUP_URL = `http://${BACKEND_HOST}/api/signup/`

export const getMessagesURL = (channel_id) => {
  return `http://${BACKEND_HOST}/api/messages/?channel_id=${channel_id}`
}

// LocalStorage
export const LS_USER_ITEM = 'user'

// Websockets
export const WS_URL = `ws://${BACKEND_HOST}/channel/`

export const WebSocketMessageType = {
  ERROR: "error",
  MESSAGE: "message",
  SUCCESS: "success",
  CONNECTION_SUCCESS: "connection_success"
}
