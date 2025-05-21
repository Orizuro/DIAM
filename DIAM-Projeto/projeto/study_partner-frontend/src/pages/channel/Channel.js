import axios from 'axios';
import './Channel.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { getMessagesURL, WebSocketMessageType, WS_URL } from '../../Constants';
import { useAuth } from '../../hooks/AuthProvider';
import { FaHeart } from 'react-icons/fa';

const Channel = () => {
  const { channel_id } = useParams();
  const auth = useAuth();

  const [input, setInput] = useState("");
  const [channelName, setChannelName] = useState("");
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [messageLikes, setMessageLikes] = useState({});

  const { sendJsonMessage } = useWebSocket(WS_URL + channel_id + "/", {
    onOpen: () => {
      setIsLoading(false);
    },

    onClose: () => {
      setIsLoading(false);
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data)
      switch (data.type) {
        case WebSocketMessageType.ERROR:
          console.error(data.message);
          break;

        case WebSocketMessageType.MESSAGE:
            console.log("Received Message to message", data)
            setMessages((prev) => ({
              ...prev, 
              [data.message_id]: data
            }));
            break;

        case WebSocketMessageType.CONNECTION_SUCCESS:
          setChannelName(data.channel_name);
          break;

        case WebSocketMessageType.TOGGLE_LIKE:
          console.log("Received Message to ToggleLike", data)
          setMessages((prev) => ({
            ...prev,
            [data.message_id]: {
              ...prev[data.message_id],
              total_likes: data.total_likes,
              liked_by: data.liked_by
            }
          }));
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

  const handleLike = (messageId) => {
    sendJsonMessage({ type: WebSocketMessageType.TOGGLE_LIKE, message_id: messageId })
  }

  useEffect(() => {
    Object.keys(messages).forEach((key) => {
      const message = messages[key];
      setMessageLikes((prev) => ({
        ...prev,
        [key]: message.liked_by.includes(auth.currentUser.username)
      }));
    })

  }, [messages, auth.currentUser?.username])

  return (
    <>
      <div className='chat-container'>
        <div className='chat-header'>{channelName}</div>

        <div className='chat-messages'>
          {
            Object.keys(messages).map((key) => {
              const message = messages[key];
              return (
                <div key={key} className={`chat-bubble ${message.sender === auth.currentUser.username ? 'me' : 'other'}`}>

                  {/* <div>PR: 1</div> */}
                  <div className="chat-text">{message.content}</div>
                  <div className="chat-meta">
                    <span className="chat-name">{`${message.sender}`}</span>
                    <span className="chat-time">{getHourMinute(message.created_at)}</span>
                    <div className="like-button" onClick={() => handleLike(key)}>
                      <FaHeart className={messageLikes[key] ? "liked" : ""} />
                      {<span className="like-count">{message.total_likes}</span>}
                    </div>
                  </div>
                </div>
              )
            }
            )
          }
        </div>

      <div className='chat-input-bar'>
        <button className="extra-button">+</button>

        <input
          type="text"
          placeholder="Type a message..."
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
