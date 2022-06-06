import React from 'react'
import { useState, useEffect} from "react";
import SinglePost from './SinglePost'
import { useParams } from "react-router-dom";
import { useAppContext } from './providers/AppContext';
import Button from '@mui/material/Button'

const  Profil = () => {

    
    const {userName} = useParams();
    
    const {updateFilterOfPosts, addFriendRequest, currentUser, allPosts, setfilteredUserName, filteredUserName}=useAppContext(); 
    console.log("Profil: username from useParams: " + userName)
    useEffect( () => {     
        setfilteredUserName(userName);        
    }, []);

    useEffect( () => {
        updateFilterOfPosts();
    }, [filteredUserName]);

    const friendRequestClicked= async () => {
        console.log("friendRequestClicked");
        await addFriendRequest("Hi, ich wäre gerne dein Freund:in :)" ,  currentUser.userName, userName );
        console.log(currentUser);
    }
    let alredySentFriendRequest = false;
    let alreadyRecievedFriendRequest = false;
    let alreadyFriends = false;
    console.log(currentUser);

    if (currentUser !== null){
        if (currentUser.friends !== undefined){
            if (currentUser.friends.filter(e => e.userName === userName).length > 0) {            
                alreadyFriends = true;
             }
        }
        if (currentUser.friendRequestsSent !== undefined){
            if (currentUser.friendRequestsSent.filter(e => e.AngefragtBei === userName).length > 0) {            
                alredySentFriendRequest = true;
             }
        }
        if (currentUser.friendRequestsRecieved !== undefined){
            if (currentUser.friendRequestsRecieved.filter(e => e.Anfragender === userName).length > 0) {            
                alreadyRecievedFriendRequest = true;
             }
        }
        
    }
    let userMessage = ""
    if (alreadyFriends)
        userMessage= "Bereits befreundet";
    else if (alredySentFriendRequest)
         userMessage = "Anfrage bereits gesendet";
    else if (alreadyRecievedFriendRequest)
         userMessage = "Bereits eine freundschaftsanfrage erhalten";
     
    console.log (userMessage);
    return (
            <div> {userName}
            {currentUser.userName!== undefined && currentUser.userName !== userName
            &&  userMessage === ""
            ? 
            // Nutzer ist eingeloggt und aktuell angezeigter Nutzer ist ein anderer Account

                <Button sx={{fontSize: 8}} className="sendButton" variant="contained" 
                        onClick={friendRequestClicked}>Freundschaftsanfrage senden</Button>
            : userMessage 
             }
             
                {   
                allPosts.map(e => <SinglePost key={e.id} post={e} />)
                }
            </div>);
   
}

export default Profil;