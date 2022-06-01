import React from 'react'

import './App.css'
import Grid from '@mui/material/Grid';

//import Content from './components/Content'
import Header from './components/Header'
import Feed from './components/inner components/Feed'
import Input from './components/inner components/Input'
import Sidebar from './components/inner components/Sidebar'
import Footer from './components/Footer'



function App() {
  return (

    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid item xs={12} md={8} >
        <Header>xs=6 md=8 </Header>
    </Grid>
    <Grid item xs={12} md={8} >
        <Input>xs=6 md=8 </Input>
    </Grid>
      <Grid item xs={6} md={4} >
        <Feed>xs=6 md=4 </Feed>
    </Grid>
    <Grid item xs={6} md={8} >
        <Sidebar>xs=6 md=8 </Sidebar>
    </Grid>
      <Grid item xs={12} md={4} >
        <Footer>xs=6 md=4 </Footer>
    </Grid>
    </Grid>
  
    
   
  )
}

export default App;
