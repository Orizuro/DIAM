import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getMessagesURL, WebSocketMessageType, WS_URL } from '../Constants';

const Channel = () => {
  const { channel_id } = useParams();

  const [message, setMessage] = useState("")
  const [messageHistory, setMessageHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL + channel_id + "/", {
    onOpen: () => {
      console.log("Connected!");

      // fetch database messages
      axios.get(getMessagesURL(channel_id), { withCredentials: true })
        .then(response => response.data)
        .then(data => setMessageHistory(data))
        .then(() => setIsLoading(false))
        .catch(error => console.error(error));
    },

    onClose: () => {
      setIsLoading(false);
      console.log("Disconnected!");
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data)
      switch (data.type) {
        case WebSocketMessageType.ERROR:
          console.error(data.message);
          break;

        case WebSocketMessageType.MESSAGE:
          setMessageHistory([...messageHistory, data.message]);
          break;

        default:
          break;
      }
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
    isLoading
      ? <p>Loading...</p>
      : <> <p>THIS IS A the {channel_id} CHANNEL</p>
        {
          messageHistory.map((receivedMessage, ind) =>
            <p key={ind}>{receivedMessage.content}</p>
          )
        }
        <input onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => {
          sendJsonMessage({ type: WebSocketMessageType.MESSAGE, message: message })
        }}>
          mandar mensagem
        </button>
      </>
  );
}
export default Channel; 
