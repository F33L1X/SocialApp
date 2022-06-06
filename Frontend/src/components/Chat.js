
import React , {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import { useAppContext } from './providers/AppContext';

const Chat = () => {
    
    const {currentUser, sendNewMessage, loadChatVerlauf}=useAppContext(); 
    const [visibleMessages, setVisibleMessages] = React.useState([]);
    const [chatPartner, setChatPartner] = React.useState("");
    const inputRefMessage= React.useRef (null);
    const messagesEndRef = React.useRef(null)
    


    useEffect( () => {
        updateVisibleMessages();
    }, [chatPartner]);


    const updateVisibleMessages = async () =>{
        loadChatVerlauf().then(
            chatVerlauf => {                   
                let filteredChat = chatVerlauf.filter((e) => ( e.from === currentUser.userName && e.to === chatPartner )
                ||  (e.from === chatPartner && e.to === currentUser.userName ))
                setVisibleMessages(filteredChat);
                scrollToBottomWithSmoothScroll();
                       
          });  
    }

    const scrollToBottomWithSmoothScroll = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
          }
     }
  
   
    const setChatPartnerClicked = (newChatPartner) => {
        setChatPartner(newChatPartner);
        console.log(chatPartner)
    }

    const sendNewMessageClicked = async  () => {
        if (inputRefMessage.current.value !== ""){
            await sendNewMessage(chatPartner,inputRefMessage.current.value)
            inputRefMessage.current.value= "";
            updateVisibleMessages();
            /*let chatVerlauf =  await loadChatVerlauf(currentUser);

            let filteredChat = chatVerlauf.filter((e) => ( e.from === currentUser.userName && e.to === chatPartner )
                                                     ||  (e.from === chatPartner && e.to === currentUser.userName ))
            */
           //setVisibleMessages(filteredChat);  

        }
            
    }
  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" >Chat</Typography>
            </Grid>
        </Grid>
        <Grid item xs={3} >
                <List>
                    {
                    currentUser.friends.length> 0
                    ?
                    currentUser.friends.map((e)=>
                    <ListItem button key={e.userName} onClick={() => setChatPartnerClicked(e.userName)}>                        
                        <ListItemText primary={e.userName}>{e.userName}</ListItemText>
                    </ListItem>) 
                    : "Freunde hinzufügen, um zu chatten"}                   
                </List>
            </Grid>

        <Grid container component={Paper} maxHeight= {600} overflow='auto' >
            
            <Grid item xs={9} >
                <List >
                    {visibleMessages.map((e)=>
                    <ListItem key={e.id}>

                        {e.from === currentUser.userName 
                        ?
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary={e.text}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary={e.date}></ListItemText>
                            </Grid>
                        </Grid>
                        :
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary={e.text}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary={e.date}></ListItemText>
                            </Grid>
                        </Grid>
                        }
                        <div ref={messagesEndRef} />
                    </ListItem>
                    )}
                </List>
                <Divider />
                {
                    chatPartner !== ""
                    ?
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" 
                                        label="Type Something" fullWidth
                                        inputRef={inputRefMessage} />
                        </Grid>
                        <Grid xs={1} align="right">
                            <SendIcon onClick={sendNewMessageClicked}/>
                        </Grid>
                    </Grid>
                    :
                    null
                }
                
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;
