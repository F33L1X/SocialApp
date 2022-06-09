import React  from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import AddTaskIcon from '@mui/icons-material/AddTask';

import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useAppContext } from './providers/AppContext';  
  
  
  const ITEM_HEIGHT = 48;

const SingleFriendRequest = ({friendRequest}) => {
    const {acceptFriendRequest, rejectFriendRequest}=useAppContext(); 
    
    const acceptFriendRequestClicked =() =>{
        acceptFriendRequest (friendRequest.id);
    }

    const rejectFriendRequestClicked = () => {
        rejectFriendRequest(friendRequest.id);
    }

    console.log(friendRequest);
    
    return (
    <Box  m={2} pt={3}>
        <Card sx={{ maxWidth: 345 }} >
          <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">                           
                    {friendRequest.Anfragender.charAt(0).toUpperCase() }     
                </Avatar>      
            }
            title= {friendRequest.Anfragender}
            subheader= {friendRequest.date}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
             {friendRequest.message}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={acceptFriendRequestClicked} >
              <AddTaskIcon />
            </IconButton>
            <IconButton aria-label="share"  onClick={rejectFriendRequestClicked} >
              <DoNotDisturbIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    );
}

export default SingleFriendRequest;