
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:8002";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  const  backend_getPreviousMessages = async (roomID) => {
    console.log("backend_getPreviousMessages");
    var config = {
          method: 'post',
          url: '/api/previousMessages',
          headers: {
            'Content-Type': 'application/json'
          },
          data: roomID    
        };
        let response = await axios (config);
        
        console.log(response.data);
        return response.data;
      }

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // declare the data fetching function
    const initMsgs = async () => {
        console.log("initMsgs");
        let msgs = await backend_getPreviousMessages({roomId: roomId})
        console.log(msgs);
        setMessages(msgs);
        
        
    }
    // Vorhergehende Messages aus dem Backend laden und in den Chatroom schreiben
    initMsgs();

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      console.log("useChat");
      console.log("socketRef.current.on");
      console.log(message[0])
      setMessages((messages) => [...messages, message[0]]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody, currentUser) => {
    let newMsg = {
        id: uuidv4(),
        senderID: currentUser.id,
        from: currentUser.userName, 
        text: messageBody,
        date: new Date()
      };

    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, [newMsg, roomId]);
  };

  return { messages, sendMessage };
};

export default useChat;