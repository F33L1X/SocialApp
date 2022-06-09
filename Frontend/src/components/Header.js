import React, {useRef, useEffect} from 'react'
import Logo from './inner components/Logo'
import { Link } from "react-router-dom";


import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useAppContext } from './providers/AppContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


function Header() {
  const {logoutUser, currentUser, updateFilterOfPosts, setSearchTerm, searchTerm}=useAppContext();
  const inputRefSearchBar=useRef (null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect( () => {     
    updateFilterOfPosts();             
  }, [searchTerm]);




  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    

  
  const searchChanged = async () => {
    console.log("searchChanged")
    console.log(inputRefSearchBar.current.value)
 
    setSearchTerm(inputRefSearchBar.current.value);
      
   
  }

  if (Object.keys(currentUser).length === 0){
    return (
      <div className="Header">
         <Link to="/">
          <Logo></Logo>
         </Link>
         <TextField id="outlined-basic" label="Suche" variant="outlined" 
                    onChange={searchChanged} inputRef={inputRefSearchBar} />
         <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ minWidth: 100 }}>Contact</Typography>
          <Typography sx={{ minWidth: 100 }}>Profile</Typography>
          <Tooltip title="Login / Registrieren">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link to="/login">
            <MenuItem>
              <Avatar /> Login 
            </MenuItem>
          </Link>
          <Divider />
          
          <Link to="/register">
            <MenuItem>          
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Registrieren
            </MenuItem>
          </Link>          
        </Menu>
      </React.Fragment>
      </div>
  )
  }
  else{
    // User is logged in
    return (
      <div className="Header">
         <Link to="/">
          <Logo></Logo>
         </Link>
  
         <TextField id="outlined-basic" label="Suche" variant="outlined" 
                    onChange={searchChanged} inputRef={inputRefSearchBar} />


         <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Link to="/chat">
            <Tooltip title="Chat">             
                <ChatBubbleIcon />         
            </Tooltip>
          </Link>
          <Tooltip title="Nutzername">             
              <Typography sx={{ minWidth: 100 }}>{currentUser.userName}</Typography>              
          </Tooltip>
          <Tooltip title="Freundschaftsanfragen">
            <Link to="/freundschaftsanfragen">
              <PersonAddIcon /> 
              <Typography sx={{ minWidth: 100 }}>{currentUser.friendRequestsRecieved.length}</Typography>
            </Link>
            
          </Tooltip>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link to ="/editProfil">
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
          </Link>
          <Divider />
          
          
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Link to="/">
            <MenuItem onClick={logoutUser}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Link>
        </Menu>
      </React.Fragment>
      </div>
  );
  }
  



   
}

export default Header