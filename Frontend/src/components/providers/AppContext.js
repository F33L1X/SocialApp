import React  from 'react';
import { createContext, useContext } from "react";
import usePost from "../hooks/usePost";
import useUser from "../hooks/useUser";


const AppContext=createContext()

const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [allPosts, setPost, addPost,delPost, addComment, 
        setNewPostTitle, setNewPostDescription, allPostsOfUser,
        updateFilterOfPosts, setSearchTerm, setfilteredUserName,
        filteredUserName, searchTerm, toggleLikeOfPost] = usePost();

  const [addUser, loginUser, logoutUser, currentUser,
         addFriendRequest, acceptFriendRequest, rejectFriendRequest, 
         sendNewMessage, loadChatVerlauf, updateMessageStatus] = useUser();

  return (
    <AppContext.Provider value={{allPosts, setPost, addPost, delPost,  
                          updateFilterOfPosts, setSearchTerm, setfilteredUserName,
                          addComment, setNewPostTitle, setNewPostDescription, allPostsOfUser,toggleLikeOfPost,
                          addUser, loginUser, logoutUser, currentUser, 
                          addFriendRequest, acceptFriendRequest, rejectFriendRequest, 
                          filteredUserName, searchTerm, sendNewMessage, loadChatVerlauf, updateMessageStatus}}>
      {children}
    </AppContext.Provider>
  );
}

export {AppContextProvider, useAppContext}