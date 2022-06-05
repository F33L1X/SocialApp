import React from 'react'
import Typography from '@mui/material/Typography';


function Comment({comment}) {
  return (
    <div>
        <Typography paragraph>
            {comment.userName}  {comment.date} 
        </Typography>
        <Typography paragraph>
            {comment.commentText}
        </Typography>
    </div>
  )
}

export default Comment