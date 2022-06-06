import React  from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useAppContext } from './providers/AppContext';  
  
  
  const ITEM_HEIGHT = 48;

const SingleFriend = ({friend}) => {
    const {currentUser}=useAppContext(); 

    console.log(friend);
    //console.log("SinglePostContent: " + JSON.stringify(post));

      
    return (
    <Box  m={2} pt={3}>
        <Card sx={{ maxWidth: 345 }} >
          <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">                           
                    {friend.userName.charAt(0).toUpperCase() }     
                </Avatar>      
            }
            title= {friend.userName}
            subheader= {friend.date}
          />
          <CardContent>            
            <ChatBubbleIcon />
          </CardContent>
          
        </Card>
      </Box>
    );
}

export default SingleFriend;