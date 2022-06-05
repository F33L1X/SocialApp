
import React, { useRef } from 'react';
import Button from '@mui/material/Button'
import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppContext } from '../providers/AppContext';



function Register() {

const refUserName = useRef();
const refUserPW1 = useRef();
const refUserPW2 = useRef();

const {addUser}=useAppContext();

const [open, setOpen] = React.useState(false);
const [openUserExists, setOpenUserExists] = React.useState(false);
const [openUserCreated, setOpenUserCreated] = React.useState(false);


const handleClose = () => {
  setOpen(false);
};
const handleCloseUserExists = () => {
  setOpenUserExists(false);
};
const handleCloseUserCreated = () => {
  setOpenUserCreated(false);
};







const addUserClicked = async () => {
  
  if(refUserPW1.current.value !== refUserPW2.current.value){  
    setOpen(true);
  }else if (refUserName.current.value !== ""){
    console.log("addUserClicked");
    let answer = await addUser(refUserName.current.value, refUserPW1.current.value);
    console.log(answer);
    if (answer === "Nutzer existiert bereits"){
      setOpenUserExists(true);
    }else{   
      setOpenUserCreated(true);
    }
  }
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
      <InputLabel htmlFor="input-with-icon-adornment">
        Passwort bestätigen
      </InputLabel>
      <Input size="small" id="passwort2"  inputRef={refUserPW2}  type="password">  </Input>

      <Button sx={{fontSize: 8}} className="sendButton" variant="contained" onClick={addUserClicked}>Nutzer registrieren</Button>
    

        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Fehlerhafte Passwort Eingabe"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Eingegebene Passwörter stimmen nicht überein, bitte überprüfen Sie Ihre Eingabe.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>        
          </DialogActions>
        </Dialog>


        <Dialog
          open={openUserExists}
          onClose={handleCloseUserExists}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Nutzer existiert bereits"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Der eingegebene Nutzername exisitert bereits. Bitte geben Sie einen anderen Username ein.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUserExists}>OK</Button>        
          </DialogActions>
        </Dialog>


        <Dialog
          open={openUserCreated}
          onClose={handleCloseUserCreated}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Nutzer erfolgreich angelegt"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Der eingegebene Nutzer wurde erfolgreich angelegt.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUserCreated}>OK</Button>        
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default Register