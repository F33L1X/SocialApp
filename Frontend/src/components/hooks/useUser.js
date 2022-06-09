import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


const useUser=()=> {
    
    const [allUsers ,setAllUsers]=useState([]);
    const [currentUser ,setCurrentUser]=useState({});

    const backend_LoginIsPossible = async (userName, userPW) => {
        const json = {"userName": userName,
                      "password": userPW};
        var config = {
          method: 'post',
          url: '/api/loginIsPossible',
          headers: {
            'Content-Type': 'application/json'
          },
          data: json
        };
        let response = await axios (config);    
        console.log(response.data)  
        return response.data;      
    }


    const backend_UserExists = async (userName) => {
      const json = {"userName": userName};
      var config = {
        method: 'post',
        url: '/api/userExists',
        headers: {
          'Content-Type': 'application/json'
        },
        data: json
      };
      let response = await axios (config);      
      return response.data;
    }

    const backend_AddUser = async (singleUser) =>{
      var config = {
        method: 'post',
        url: '/api/user',
        headers: {
          'Content-Type': 'application/json'
        },
        data: singleUser    
      };
      let response = await axios (config);
      return response.data;
    }

    const backend_updateMessageStatus = async (myData) => {
      var config = {
        method: 'put',
        url: '/api/updateMessageStatus',
        headers: {
          'Content-Type': 'application/json'
        },
        data: myData    
      };
      let response = await axios (config);
      return response.data;
    }

    const backend_sendNewMessage = async (newMessage) => {
      var config = {
        method: 'put',
        url: '/api/newMessage',
        headers: {
          'Content-Type': 'application/json'
        },
        data: newMessage    
      };
      let response = await axios (config);
      return response.data;
    }
    const backend_loadChatVerlauf = async (currentUser) => {
      var config = {
        method: 'put',
        url: '/api/allMessages',
        headers: {
          'Content-Type': 'application/json'
        },
        data: currentUser    
      };
      let response = await axios (config);
      return response.data;
    }
    
    const backend_rejectFriendRequest  = async (friendRequest)=>{
      var config = {
        method: 'post',
        url: '/api/rejectFriendRequest',
        headers: {
          'Content-Type': 'application/json'
        },
        data: friendRequest    
      };
      let response = await axios (config);
      return response.data;
    }

    
    const backend_sendFriendRequest= async (friendRequest) =>{
      var config = {
        method: 'post',
        url: '/api/friendRequest',
        headers: {
          'Content-Type': 'application/json'
        },
        data: friendRequest    
      };
      let response = await axios (config);
      return response.data;
    }


    const backend_acceptFriendRequest= async (friendRequest) =>{
      var config = {
        method: 'put',
        url: '/api/acceptFriendRequest',
        headers: {
          'Content-Type': 'application/json'
        },
        data: friendRequest    
      };
      let response = await axios (config);
      return response.data;
    }

    const loginUser =async (name, userPW) => {
      let loggedInUser = await backend_LoginIsPossible(name, userPW)
      if (loggedInUser !== undefined){
        setCurrentUser(loggedInUser);
        return "Login erfolgreich";
      }else{
        return "Fehlerhafte Login Daten";
      }
        
    }
    const logoutUser = () => {
      setCurrentUser({});
    }
    


    const  addUser = async (userName, userPW) =>{
      console.log(userName);
      if (userName !=="" && userPW !== ""){

          ///  Überprüfung einfügen, ob der Nutzer bereits exisitiert
          if (! await backend_UserExists(userName)){
            console.log("lege neuen Nutzer an");
            let today = new Date().toISOString().slice(0, 10);
            let newUser = {id: uuidv4(), userName: userName, password: userPW, registrationDate: today,  
                          friends:[], friendRequestsSent:[], friendRequestsRecieved: [],
                          messages:[]};
            backend_AddUser(newUser);
            setAllUsers ([...allUsers, currentUser]);    
            loginUser(userName, userPW) 
            console.log (newUser);
            
            return "Nutzer erfolgreich angelegt";
          }else  {
            return "Nutzer existiert bereits";
          }
          
        }
      }


      const addFriendRequest = async (message, sendingUser, recievingUser) =>{
        console.log("addFriendRequest");
        let today = new Date();
        let newFriendRequest = {id:uuidv4(), message:message , sendingUser: sendingUser, recievingUser:recievingUser, date: today}
        console.log(newFriendRequest);
        
        setCurrentUser(await backend_sendFriendRequest(newFriendRequest));        
      }
      const acceptFriendRequest= async (requestID)=>{   
          setCurrentUser(await backend_acceptFriendRequest([currentUser,requestID])); 
          console.log(currentUser);  
      }

      const rejectFriendRequest = async (requestID)=> {
          setCurrentUser(await backend_rejectFriendRequest([currentUser,requestID])); 
      }



      const sendNewMessage = async (chatPartnerName, messageText) => {
          let today = new Date();
          let newMessage= {
            id: uuidv4(),
            date: today,
            text: messageText,
            from: currentUser.userName,
            to: chatPartnerName,
            status: 0
         } 
         return await backend_sendNewMessage(newMessage);
      }

      const loadChatVerlauf = async () => {

       return await backend_loadChatVerlauf(currentUser);
      }

      const updateMessageStatus = (messages, newStatus) => {
          return backend_updateMessageStatus ([messages, newStatus])
      }



      return [addUser, loginUser, logoutUser, currentUser, addFriendRequest, 
              acceptFriendRequest,rejectFriendRequest, sendNewMessage, loadChatVerlauf, 
              updateMessageStatus]
}

export default useUser;