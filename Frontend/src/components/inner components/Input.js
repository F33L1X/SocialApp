import React, { useRef } from 'react';
import Button from '@mui/material/Button'
import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';

import { useAppContext } from '../providers/AppContext';

export default function InputField() {

  
  const inputRefTitle=useRef (null);
  const inputRefDescription=useRef (null);
  const {addPost, currentUser}=useAppContext();

 
 

  const addCommit= () =>{
    addPost(inputRefTitle.current.value,inputRefDescription.current.value , currentUser.userName);
  }




  if (Object.keys(currentUser).length !== 0){
    // Posten können nur eingeloggte Nutzer 
    return (
      <div className="Input">
        <div>
          <InputLabel htmlFor="input-with-icon-adornment">
            Titel
          </InputLabel>
          <Input size="small" id="filled-basic"  inputRef={inputRefTitle}>  </Input>
          
          <InputLabel htmlFor="input-with-icon-adornment">
            Beschreibung
          </InputLabel>
          <Input size="big" id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            maxRows={4}
            inputRef={inputRefDescription}>
          </Input>
        </div>
        
        <Button sx={{fontSize: 8}} className="sendButton" variant="contained" onClick={addCommit}>Commit</Button>
      </div>
    )
}
}