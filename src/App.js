import React, { useState } from 'react'

import './App.css'
import Grid from '@mui/material/Grid';

//import Content from './components/Content'
import Header from './components/Header'
import Feed from './components/inner components/Feed'
import Sidebar from './components/inner components/Sidebar'
import Footer from './components/Footer'
import { AppContextProvider } from './components/providers/AppContext';




function App() {

  
  


  return (
    
    <AppContextProvider>   
      <Grid container rowSpacing={2} columnSpacing={2} irection="row" justifyContent="center" alignItems="center"   >
        <Grid item xs={12}   >
          <Header> </Header>
        </Grid>
      

      
        <Grid item xs={12} sm={5} md={5} lg={5}     >
          <Feed></Feed>
        </Grid>
      
        <Grid item xs={12} sm={3} md={3} lg={3}   >
          <Sidebar></Sidebar>
        </Grid>
    


        <Grid item xs={12} lg={12} >
          <Footer></Footer>
        </Grid>
      </Grid>
    </AppContextProvider>
  
    
   
  )
}

export default App;
