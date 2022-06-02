import React from 'react'

import './App.css'
import Grid from '@mui/material/Grid';

//import Content from './components/Content'
import Header from './components/Header'
import Feed from './components/inner components/Feed'

import Sidebar from './components/inner components/Sidebar'
import Footer from './components/Footer'




function App() {
  return (
    

    <Grid container rowSpacing={2} columnSpacing={2} irection="row" justifyContent="center" alignItems="center"   >
      <Grid item xs={12}   >
        <Header>xs=6 md=8 </Header>
      </Grid>
      

      
      <Grid item xs={8} lg={5}     >
        <Feed></Feed>
      </Grid>
      
      <Grid item xs={4} lg={3}   >
        <Sidebar></Sidebar>
      </Grid>
    


      <Grid item xs={12} lg={12} >
        <Footer></Footer>
      </Grid>
    </Grid>
  
    
   
  )
}

export default App;
