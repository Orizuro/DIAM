import axios from 'axios';
import './Channel.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import {  getMessagesURL, WebSocketMessageType, WS_URL } from '../../Constants';
import { useAuth } from '../../hooks/AuthProvider';

const Channel = () => {
  const { channel_id } = useParams();
  const auth = useAuth();

  const [input, setInput] = useState("");
  const [channelName, setChannelName] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { sendJsonMessage } = useWebSocket(WS_URL + channel_id + "/", {
    onOpen: () => {
      setIsLoading(false);
    },

    onClose: () => {
      setIsLoading(false);
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data)
      console.log(data)
      switch (data.type) {
        case WebSocketMessageType.ERROR:
          console.error(data.message);
          break;

        case WebSocketMessageType.MESSAGE:
          setMessages((prev) => [...prev, data]);
          break;

        case WebSocketMessageType.CONNECTION_SUCCESS:
          setChannelName(data.channel_name);
          break;

        default:
          console.log(data)
          break;
      }
    }
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(getMessagesURL(channel_id), { withCredentials: true });
        console.log(response.data.messages);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [channel_id]);

  const sendMessage = () => {
    if (!input.trim()) return;
    sendJsonMessage({ type: WebSocketMessageType.MESSAGE, content: input });
    setInput('');
  };

  const getHourMinute = (dateTimeIso) => {
    return new Date(dateTimeIso).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <>
      <div className='chat-container'>
        <div className='chat-header'>{channelName}</div>

        <div className='chat-messages'>
          {
            messages.map((message, ind) =>
              <div key={ind} className={`chat-bubble ${message.sender === auth.currentUser.username ? 'me' : 'other'}`}>
                {/* <div>PR: 1</div> */}
                <div className="chat-text">{message.content}</div>
                <div className="chat-meta">
                  <span className="chat-name">{`${message.sender}`}</span>
                  <span className="chat-time">{getHourMinute(message.created_at)}</span>
                </div>
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
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}
export default Channel; 
