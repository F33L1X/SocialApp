import React from 'react'
import InputField from './Input'
import SinglePost from '../SinglePost'
import { useAppContext } from '../providers/AppContext';


function Feed() {
  const {post}=useAppContext()


  return (
    <div className="Feed">
      <div>
        <InputField/>

        {
        post.map(e => <SinglePost  key={e.id} onePost={e} /> )
        }
        
      </div>
    </div>
  )
}

export default Feed