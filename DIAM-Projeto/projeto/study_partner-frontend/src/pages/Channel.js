import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WS_URL } from '../Constants';
import { useAuth } from '../hooks/AuthProvider';

const Channel = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isLoggedIn) {
    navigate("/")
  }

  const { channel_id } = useParams();

  const [message, setMessage] = useState("")
  const [messageHistory, setMessageHistory] = useState([])

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL + channel_id + "/", {
    onOpen: () => {
      console.log("Connected!");
    },

    onClose: () => {
      console.log("Disconnected!");
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data)
      setMessageHistory([...messageHistory, data.message])
    }
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState];

  return (
    <> <p>THIS IS A the {channel_id} CHANNEL</p>
      {
        messageHistory.map((receivedMessage) => <p>{receivedMessage}</p>)
      }
      <input onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => { sendJsonMessage({ type: "exmpelo", message: message }) }}>mandar mensagem</button>
    </>
  );
}
export default Channel; 
