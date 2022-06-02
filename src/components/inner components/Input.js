import React, {  useRef } from 'react';
import Button from '@mui/material/Button'
import { Input  } from '@mui/material';

export default function InputField() {

  
  const inputRef=useRef (null)
  

 
 

  function addComment () {
    if (inputRef.current.value !==""){
      console.log ("klicked")
    }
  }





  return (
    
    <div className="Input"><Input size="small" id="filled-basic"  ref={inputRef}></Input><span>     </span><Button sx={{fontSize: 8}} className="sendButton" variant="contained" onClick={addComment}>Commit</Button></div>
  )
}