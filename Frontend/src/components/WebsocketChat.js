
import React from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppContext } from './providers/AppContext';



const WebsocketChat = () => {

    const {currentUser}=useAppContext();

  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (friendshipID) => {
    setRoomName(friendshipID);  
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
            <Grid item xs={3} >
                <List>
                    {
                    currentUser.friends.length> 0
                    ?
                    currentUser.friends.map((e)=>
                    
                    <ListItem button key={e.userName} onClick={() => handleRoomNameChange(e.id)}>                        
                        <ListItemText primary={e.userName}>{e.userName}</ListItemText>
                    </ListItem>) 
                    : "Freunde hinzufügen, um zu chatten"}                   
                </List>
            </Grid>


      <Link to={`/chatroom/${roomName}`} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

export default WebsocketChat;