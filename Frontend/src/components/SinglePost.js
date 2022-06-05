import { useAppContext } from './providers/AppContext';
import { useParams } from "react-router-dom";
import SinglePostContent from "./SinglePostContent";



export default function SinglePost({post}) {
  const {allPosts}=useAppContext();
 
  const { postID } = useParams();
  const paramPost = allPosts.find(e => e.id === postID);
  
  if (post){
    return (SinglePostContent ({post}));
  }else if (paramPost){
    let post = paramPost
    return (SinglePostContent ({post}));
  }

}