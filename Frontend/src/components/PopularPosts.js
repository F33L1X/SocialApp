import React from 'react'
import { useAppContext } from './providers/AppContext';
import SingleFriend from './SingleFriend';
import SinglePost from './SinglePost';

function PopularPosts() {

    const { allPosts}=useAppContext(); 
    
    let sortedObjs = allPosts.sort((a, b) => a.likedBy.length + a.comments.length< b.likedBy.length + b.comments.length? 1 : -1);
    console.log("PopularPosts");
    console.log(sortedObjs);
    let length = 3
    if (sortedObjs.length < length){
        length = sortedObjs.length
    }
    let topPosts = [];
    for (var i = 0; i < length; i++) {
        topPosts = [...topPosts, sortedObjs[i]]
    }

    if (Object.keys(allPosts).length !== 0){
        return (
        <div>
            <div>
                beliebte Posts
            </div>
            <div>
                {
                   topPosts.map((e) => <SinglePost key={e.id}  post={e} />)
                    //currentUser.friends.map((e) => <SingleFriend key={e.id}  friend={e} />)
                }
            </div>
        </div>
    );
    }
}

export default PopularPosts