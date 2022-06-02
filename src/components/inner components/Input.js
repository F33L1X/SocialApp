import React, { useRef } from 'react';
import Button from '@mui/material/Button'
import { Input } from '@mui/material';

import { useAppContext } from '../providers/AppContext';

export default function InputField() {

  
  const inputRef=useRef (null)
  
  const {addPost}=useAppContext()

 
 

  const addCommit= () =>{
    addPost(inputRef.current.value)
  }





  return (
    
    <div className="Input"><Input size="small" id="filled-basic"  inputRef={inputRef}></Input><span>     </span><Button sx={{fontSize: 8}} className="sendButton" variant="contained" onClick={addCommit}>Commit</Button></div>
  )
}