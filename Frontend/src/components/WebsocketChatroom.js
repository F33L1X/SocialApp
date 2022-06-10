
import React from "react";
import { useParams, Redirect  } from "react-router-dom";
import useChat from "./hooks/useChat";
import { useAppContext } from './providers/AppContext';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';

const WebsocketChatroom = (props) => {
  const { roomId } = useParams();
  const {currentUser}=useAppContext();

  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent
  const inputRefMessage= React.useRef (null);




  const handleSendMessage = () => {
    if (inputRefMessage.current.value !== "")
        sendMessage(inputRefMessage.current.value, currentUser);
  };

  return (  
    <Grid container>
        <Grid item xs={3} >
            <List>
                {
                currentUser.friends.length> 0
                ?
                messages.map((msg)=>
                <ListItem  key={msg.id}>  
                    {
                    msg.senderID === currentUser.id 
                    ? <ListItemText align="right" primary={msg.text}>{msg.text}</ListItemText>
                    : <ListItemText align="left" primary={msg.text}>{msg.text}</ListItemText>
                    }
                </ListItem>) 
                : "Freunde hinzufügen, um zu chatten"}                   
            </List>
        </Grid>
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" 
                            label="Type Something" fullWidth
                            inputRef={inputRefMessage} />
                </Grid>
            <Grid  align="right">
                <SendIcon onClick={handleSendMessage}/>
            </Grid>
        </Grid>
    </Grid>
/*
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          
          
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.from === currentUser.id ? "my-message" : "received-message"
              }`}
            >
              {message.text}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>*/
  );
};

export default WebsocketChatroom;