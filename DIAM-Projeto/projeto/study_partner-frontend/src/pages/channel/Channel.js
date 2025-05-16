import axios from 'axios';
import './Channel.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getMessagesURL, WebSocketMessageType, WS_URL } from '../../Constants';
import { Alert } from '@mui/material';
import { useAuth } from '../../hooks/AuthProvider';

const Channel = () => {
  const { channel_id } = useParams();
  const auth = useAuth();
  const currentUsername = auth.currentUser.username;

  let alertSeverity = "error";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sendMessage = () => {
    if (!input.trim()) return;
    sendJsonMessage({"type": WebSocketMessageType.MESSAGE, "content": input, "sender": currentUsername});
    setMessages([...messages, {sender: currentUsername, content: input }]);
    setInput('');
  };

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL + channel_id + "/", {
    onOpen: () => {
      console.log("Connected!");

      // fetch database messages
      axios.get(getMessagesURL(channel_id), { withCredentials: true })
        .then(response => response.data)
        .then(data => setMessages(data))
        .then(() => {
          setIsLoading(false);
          alertSeverity = "success";
        })
        .catch(error => console.error(error));
    },

    onClose: () => {
      setIsLoading(false);
      alertSeverity = "error";
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data)
      switch (data.type) {
        case WebSocketMessageType.ERROR:
          console.error(data.message);
          break;

        case WebSocketMessageType.MESSAGE:
          setMessages([...messages, {sender: data.sender, content:data.message}]);
          break;

        default:
          console.log(data)
          break;
      }
    }
  });

  console.log(messages)

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState];

  return (
    <>
      <div className='chat-container'>
        <div className='chat-header'>{channel_id}</div>

        <div className='chat-messages'>
          {
            messages.map((message, ind) =>
              <div key={ind} className={`chat-bubble ${message.sender === auth.currentUser.username ? 'me' : 'other'}`}>
                {message.content}
              </div>
            )
          }
        </div>

        <div className='chat-input-bar'>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      <Alert severity={alertSeverity}></Alert>
    </>
  );
}
export default Channel; 
