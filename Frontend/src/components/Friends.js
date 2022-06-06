import React from 'react'
import { useAppContext } from './providers/AppContext';
import SingleFriend from './SingleFriend';

function Friends() {

    const { currentUser}=useAppContext(); 
  
    if (Object.keys(currentUser).length !== 0){
        return (
        <div>
            <div>
                Freunde
            </div>
            <div>
                {
                    currentUser.friends.map((e) => <SingleFriend key={e.id}  friend={e} />)
                }
            </div>
        </div>
    );
    }
}

export default Friends