import React from 'react'
import InputField from './Input'
import SinglePost from '../SinglePost'
import { useAppContext } from '../providers/AppContext';


function Feed() {
  const {allPosts}=useAppContext();


  return (
    <div className="Feed">
      <div>
        <InputField/>

        {
        allPosts.map(e => <SinglePost  key={e.id} post={e} /> )
        }
        
      </div>
    </div>
  )
}

export default Feed