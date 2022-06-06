import { useState , useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


const usePost=()=> {
    const [allPosts ,setPost]=useState([]);
    const [searchTerm ,setSearchTerm]=useState("");
    const [filteredUserName ,setfilteredUserName]=useState("");

    
    useEffect( () => {     
      backend_LoadPosts().then(
          response => {                   
            setPost(response);           
        });            
    }, []);
    
  

    const  backend_LoadPosts = async () => {
      var config = {
        method: 'get',
        url: '/api/post',
        headers: { }
      };
      let response = await axios (config);
      console.log(response);
      return response.data;
    }

    const backend_AddPost = async (singlePost) =>{
      var config = {
        method: 'post',
        url: '/api/post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: singlePost    
      };
      let response = await axios (config);
      return response.data;
    }
    const backend_UpdatePost = async (singlePost) => {
      var config = {
        method: 'put',
        url: '/api/post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: singlePost    
      };
      let response = await axios (config);
      return response.data;
    }
  

    const backend_DeletePost = async (singlePost) =>{
      var config = {
        method: 'delete',
        url: '/api/post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: singlePost    
      };
      console.log (singlePost);
      let response = await axios (config);
      return response.data;
    }
    const backend_toggleLikeOfPost = async (myData) =>{
      console.log("backend_toggleLikeOfPost");
      var config = {
        method: 'put',
        url: '/api/posts/toggleLikeOfPost',
        headers: {
          'Content-Type': 'application/json'
        },
        data: myData
      };
      let response = await axios (config);           
      return response.data;    
    }


    const backend_filterPosts = async () => {
      console.log("backend_filterPosts");
      const json = {"searchTerm": searchTerm,
                    "userName": filteredUserName};
      console.log(json);
      var config = {
        method: 'post',
        url: '/api/posts/search',
        headers: {
          'Content-Type': 'application/json'
        },
        data: json
      };
      let response = await axios (config);    
      console.log(response.data)  
      return response.data;    
    }
    const backend_getAllPostsOfUser = async (userName) => {
      const json = {"userName": userName};
        var config = {
          method: 'post',
          url: '/api/posts/allPostsOfUser',
          headers: {
            'Content-Type': 'application/json'
          },
          data: json
        };
        let response = await axios (config);    
        console.log(response.data)  
        return response.data;    
    }
    const allPostsOfUser = async (userName) => {
      console.log("postsOfUser - start: " + userName);
      if (userName !==""){
        return await backend_getAllPostsOfUser(userName);
      }
    }

    function addPost (title, description, creator) {
        if (title !=="" && creator !== ""){
          let today = new Date().toISOString().slice(0, 10);
          let newPost = {id:uuidv4(), creator: creator, title: title, description: description, date: today, likedBy:[], comments: []};
          console.log(newPost);
          setPost ([...allPosts, newPost]);
          let response = backend_AddPost(newPost);
          console.log(response);
        }
      }

    function addComment(idOfPost, commentText, userName){
      let today = new Date().toISOString().slice(0, 10);
      let newComment = {id:uuidv4(), commentText:commentText , userName: userName, date: today}
      let updatedPost = allPosts.filter((e) => e.id === idOfPost)[0]
      setPost(allPosts => allPosts.map(e => { if (e.id === idOfPost) e.comments = [...e.comments, newComment]; return e }));
      console.log(updatedPost);
      backend_UpdatePost(updatedPost)
    }

      function delPost (idOfPost) {
        let postToBeDeleted = allPosts.filter((e) => e.id === idOfPost)[0];
        console.log("delPost" + JSON.stringify(postToBeDeleted));
        setPost(allPosts.filter((e) => e.id !== idOfPost));   
        backend_DeletePost(postToBeDeleted);
      }
    
    function setNewPostTitle (postID, newTitle) {
        if (newTitle !==""){
          setPost(allPosts => allPosts.map(e => { if (e.id === postID) e.title = newTitle; return e }));
          console.log(allPosts)
        }
      }

      function setNewPostDescription (postID, newDesc) {
        if (newDesc !==""){ 
          setPost(allPosts => allPosts.map(e => { if (e.id === postID) e.description = newDesc; return e }));
          console.log(allPosts)
        }
      }
    
      const updateFilterOfPosts= async () => {
        console.log("filterPosts - start: ");
        console.log(searchTerm);
        console.log(filteredUserName);
        setPost( await backend_filterPosts());
        
      }
      const toggleLikeOfPost= async (post, currentUser)=>{
        let newPost =  await backend_toggleLikeOfPost([post, currentUser]);
        console.log(newPost);
        return newPost;
      }

    return [allPosts, setPost, addPost,delPost, addComment, 
            setNewPostTitle, setNewPostDescription, allPostsOfUser,
             updateFilterOfPosts, setSearchTerm, setfilteredUserName, 
             filteredUserName, searchTerm, toggleLikeOfPost]
    
}

export default usePost;