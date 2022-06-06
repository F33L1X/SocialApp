import React, {useEffect} from 'react'
import InputField from './Input'
import SinglePost from '../SinglePost'
import { useAppContext } from '../providers/AppContext';


function Feed() {
  const {allPosts, setfilteredUserName, filteredUserName, updateFilterOfPosts}=useAppContext();

  // Filter des UserNames löschen
  useEffect( () => {     
      setfilteredUserName("");        
  }, []);

  useEffect( () => {
      updateFilterOfPosts();
  }, [filteredUserName]);

  return (
    <div className="Feed">
      <div>
        {}
        <InputField/>

        {
        allPosts.map(e => <SinglePost  key={e.id} post={e} /> )
        }
        
      </div>
    </div>
  )
}

export default Feed