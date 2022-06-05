import React, { useRef } from 'react';
import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button'
import { useAppContext } from '../providers/AppContext';


function Login() {
  
const refUserName = useRef();
const refUserPW1 = useRef();

const {loginUser}=useAppContext();

const loginUserClicked = async () => {
  let answer = await loginUser(refUserName.current.value,refUserPW1.current.value );
  console.log(answer);
}


  return (
    <div>
      <InputLabel htmlFor="input-with-icon-adornment">
        Nutzername
      </InputLabel>
      <Input size="small" id="userName"  inputRef={refUserName}>  </Input>
      <InputLabel htmlFor="input-with-icon-adornment">
        Passwort
      </InputLabel>
      <Input size="small" id="passwort1"  inputRef={refUserPW1} type="password">  </Input>

      <Button sx={{fontSize: 8}} className="sendButton" variant="contained" onClick={loginUserClicked}>Einloggen</Button>
    
    </div>
  )
}

export default Login