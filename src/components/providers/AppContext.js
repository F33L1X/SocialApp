import { createContext, useContext } from "react";
import usePost from "../hooks/usePost";

const AppContext=createContext()

const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [post, setPost, addPost,delPost, addComment, setNewPostTitle, setNewPostDescription] = usePost();

  return (
    <AppContext.Provider value={{ post, setPost, addPost, delPost, addComment, setNewPostTitle, setNewPostDescription }}>
      {children}
    </AppContext.Provider>
  );
}

export {AppContextProvider, useAppContext}