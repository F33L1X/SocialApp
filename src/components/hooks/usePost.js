import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
//import axios from "axios";   für später

const usePost=()=> {
    const [post,setPost]=useState([]);
    function addPost (title) {
        if (title !==""){
          
          setPost ([...post, {id:uuidv4(), title:title, done:true}]);
          console.log(post)
          
        }
      }

    return [post, setPost, addPost]
    
}

export default usePost;