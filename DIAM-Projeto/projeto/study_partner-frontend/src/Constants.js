import axios from "axios"

// export const BACKEND_HOST = '192.168.1.10:8000'
export const BACKEND_HOST = 'localhost:8000'

// account
export const USER_URL = `http://${BACKEND_HOST}/api/user/`
export const LOGIN_URL = `http://${BACKEND_HOST}/api/login/`
export const LOGOUT_URL = `http://${BACKEND_HOST}/api/logout/`
export const SIGNUP_URL = `http://${BACKEND_HOST}/api/signup/`

// UCS
export const GET_UCS_URL = `http://${BACKEND_HOST}/api/get-ucs/`
export const CREATE_UC_URL = `http://${BACKEND_HOST}/api/create-uc/`
export const DELETE_UC_URL = `http://${BACKEND_HOST}/api/delete-uc/`
export const EDIT_UC_URL = `http://${BACKEND_HOST}/api/edit_uc/`

// Sessions
export const GET_SESSIONS_URL = `http://${BACKEND_HOST}/api/get-sessions/`
export const CREATE_SESSION_URL = `http://${BACKEND_HOST}/api/create-session/`
export const DELETE_SESSION_URL = `http://${BACKEND_HOST}/api/delete-session/`

export const GET_CHANNELS_BY_SESSIONS_URL = `http://${BACKEND_HOST}/api/get_channels_by_sessions/`
export const GET_CHANNELS_URL = `http://${BACKEND_HOST}/api/get-channels/`


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
  CONNECTION_SUCCESS: "connection_success",
  TOGGLE_LIKE: "toggle_like"
}

export const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const deleteFactory = async (endpoint, id) => {
  try {
    return await axios.post(endpoint, { id }, { withCredentials: true });
  } catch (err) {
    throw err;
  }
}

