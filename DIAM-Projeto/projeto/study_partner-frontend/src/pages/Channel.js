import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WS_URL } from '../Constants';

const Channel = () => {

  const channelName = "gandaChannel";
  const [message, setMessage] = useState("")
  const [messageHistory, setMessageHistory] = useState([])

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL + channelName + "/", {
    onOpen: () => {
      console.log("Connected!");
      setMessage(message + "Hello from ")
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
    <>
      <p>THIS IS A CHANNEL, the websocket is {connectionStatus}</p>
      {
        messageHistory.map((receivedMessage) => <p>{receivedMessage}</p>)
      }
      <input onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => { sendJsonMessage({ type: "exmpelo", message: message }) }}>mandar mensagem</button>
    </>
  );
}
export default Channel; 
