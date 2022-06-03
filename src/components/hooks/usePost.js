import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
//import axios from "axios";   für später

const usePost=()=> {
    const [post,setPost]=useState([]);
    
    
    function addPost (title, description) {
        if (title !==""){
          let today = new Date().toISOString().slice(0, 10);
          let newPost = {id:uuidv4(), title: title, description: description, date: today, likedBy:[], Comments: []};
          setPost ([...post, newPost]);
         
        }
      }
    function addComment(idOfPost, commentText, userName){
      let newComment = {id:uuidv4(), commentText:commentText , userName: userName }
      setPost(post => post.map(e => { if (e.id === idOfPost) e.Comments = [...e.Comments, newComment]; return e }));
    }

      function delPost (idOfPost) {
        setPost(post.filter((e) => e.id !== idOfPost))         
      }
    
    function setNewPostTitle (postID, newTitle) {
        if (newTitle !==""){
          let today = new Date().toISOString().slice(0, 10)
          setPost(posts => posts.map(e => { if (e.id === postID) e.title = newTitle; return e }));
          console.log(post)
        }
      }

      function setNewPostDescription (postID, newDesc) {
        if (newDesc !==""){
          let today = new Date().toISOString().slice(0, 10)
          setPost(posts => posts.map(e => { if (e.id === postID) e.description = newDesc; return e }));
          console.log(post)
        }
      }
    return [post, setPost, addPost,delPost, addComment, setNewPostTitle, setNewPostDescription]
    
}

export default usePost;