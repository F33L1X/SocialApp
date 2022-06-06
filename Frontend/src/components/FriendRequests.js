import React from 'react'
import { useAppContext } from './providers/AppContext';
import SingleFriendRequest from './SingleFriendRequest';

function FriendRequests() {

    const {currentUser}=useAppContext();
  return (
    <div>
        {
        currentUser.friendRequestsRecieved.map(e => <SingleFriendRequest  key={e.id} friendRequest={e} /> )
        }
        </div>
  )
}

export default FriendRequests