import React, {  useRef } from 'react';
import Button from '@mui/material/Button'

export default function Input() {

  
  const inputRef=useRef (null)
  

 
 

  function addComment () {
    if (inputRef.current.value !==""){
      console.log ("klicked")
    }
  }





  return (
    
    <div className="Input"><input ref={inputRef}></input><Button sx={{fontSize: 8}} className="sendButton" variant="contained" onClick={addComment}>Commit</Button></div>
  )
}