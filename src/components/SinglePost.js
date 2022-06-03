import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from './providers/AppContext';
import Button from '@mui/material/Button'
import { Input } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



const ITEM_HEIGHT = 48;


export default function SinglePost({onePost}) {
  const [expanded, setExpanded] = React.useState(false);
  const {delPost, addComment}=useAppContext();
  const inputRefComment=useRef (null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const toggleEditMenu = (event) => {
    setAnchorEl(event.currentTarget);
   
  };
  const closePostMenu = () => {
    setAnchorEl(null);
  };

  const editPostClicked = () => {
    console.log("Editieren");
    setAnchorEl(null);
  };


  const delPostClicked = () => {
    delPost(onePost.id);
    setAnchorEl(null);
  };


  const addCommentClicked = ( ) => {
    console.log("Test1");
    if (inputRefComment.content != undefined){
      console.log("Test2");
      addComment(onePost.id,inputRefComment.content.value, "Ich");
    }
  }


  return (
    <Box  m={2} pt={3}>
      <Card sx={{ maxWidth: 345 }} >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {onePost.title.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <div>
            <IconButton 
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={toggleEditMenu}>
                
              <MoreVertIcon />
            </IconButton>
            

            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={closePostMenu}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >

              
              <MenuItem key="editPost" onClick={editPostClicked}>Editieren</MenuItem>
              <MenuItem key="deletePost" onClick={delPostClicked}>Löschen</MenuItem>
            </Menu>
            
          </div>}
          title= {onePost.title}
          subheader={onePost.date}
        />
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {onePost.description}
          
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show Comments"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
              
          <Input size="big" id=  { "InputForComments_" + onePost.id}
            label="comments"
            multiline
            maxRows={4}
            inputRef={inputRefComment}>
          </Input>
      
       
          <Button sx={{fontSize: 8}} className="sendButton" variant="contained" onClick={addCommentClicked()}>Kommentieren</Button>

            <Typography paragraph>
            Hier kommen später die Kommentare :)
            </Typography>
            
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}