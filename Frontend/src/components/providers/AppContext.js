import { createContext, useContext } from "react";
import usePost from "../hooks/usePost";
import useUser from "../hooks/useUser";


const AppContext=createContext()

const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [allPosts, setPost, addPost,delPost, addComment, setNewPostTitle, setNewPostDescription] = usePost();
  const [addUser, loginUser, logoutUser, currentUser] = useUser();

  return (
    <AppContext.Provider value={{allPosts, setPost, addPost, delPost, 
                          addComment, setNewPostTitle, setNewPostDescription,
                          addUser, loginUser, logoutUser, currentUser}}>
      {children}
    </AppContext.Provider>
  );
}

export {AppContextProvider, useAppContext}