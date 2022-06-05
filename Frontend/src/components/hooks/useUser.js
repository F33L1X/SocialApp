import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


const useUser=()=> {
    
    const [allUsers ,setAllUsers]=useState([]);
    const [currentUser ,setCurrentUser]=useState("");

    const backend_LoginIsPossible = async (userName, userPW) => {
      console.log("backend_LoginIsPossible");
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


    const loginUser =async (name, userPW) => {
      if (await backend_LoginIsPossible(name, userPW)){
        setCurrentUser(name);
        return "Login erfolgreich";
      }else{
        return "Fehlerhafte Login Daten";
      }
        
    }
    const logoutUser = () => {
      setCurrentUser("");
    }





    const  addUser = async (userName, userPW) =>{
      console.log(userName);
      if (userName !=="" && userPW !== ""){

          ///  Überprüfung einfügen, ob der Nutzer bereits exisitiert
          if (! await backend_UserExists(userName)){
            console.log("lege neuen Nutzer an");
            let today = new Date().toISOString().slice(0, 10);
            let newUser = {id: uuidv4(), userName: userName, password: userPW, registrationDate: today};
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
      return [addUser, loginUser, logoutUser, currentUser]
}

export default useUser;