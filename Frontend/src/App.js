import React from 'react'

import './App.css'
import Grid from '@mui/material/Grid';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/inner components/Register';
//import Content from './components/Content'
import Header from './components/Header'
import Feed from './components/inner components/Feed'
import Sidebar from './components/inner components/Sidebar'
import Footer from './components/Footer'
import SinglePost from './components/SinglePost'
import Profil from './components/Profil'
import Login from './components/inner components/Login';
import { AppContextProvider } from './components/providers/AppContext';
import FriendRequests from './components/FriendRequests';
import WebsocketChat from './components/WebsocketChat';
import EditProfil from './components/EditProfil';
import WebsocketChatroom from "./components/WebsocketChatroom";

function App() {

  
  


  return (
    
    <AppContextProvider>   
      <BrowserRouter>
      
        <Grid container rowSpacing={2} columnSpacing={2} irection="row" justifyContent="center" alignItems="center"   >
            <Grid item xs={12}   >
              <Header> </Header>
            </Grid>       
          <Grid item xs={12} sm={5} md={5} lg={5}>
            <Routes>
              <Route path ="/" element={<Feed />} />
              <Route path="post/:postID" element={<SinglePost />} />
              <Route path ="/register" element={<Register />} />
              <Route path ="/login" element={<Login />} />
              <Route path="profil/:userName" element={<Profil />} />
              <Route path="/freundschaftsanfragen" element={<FriendRequests />} />
              <Route path="/chat" element={<WebsocketChat />} />
              <Route path="/chatroom/:roomId" element={<WebsocketChatroom />}/>
              <Route path="/editProfil" element={<EditProfil />} />
            </Routes>
          </Grid>          
          <Grid item xs={12} sm={3} md={3} lg={3}   >
            <Sidebar></Sidebar>
          </Grid>      
          <Grid item xs={12} lg={12} >
            <Footer></Footer>
          </Grid>        
        </Grid>
        
      </BrowserRouter>
    </AppContextProvider>
  
    
   
  )
}

export default App;
