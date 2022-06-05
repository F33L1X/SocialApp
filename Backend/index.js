const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

app.use(express.json());

const userSchema = new mongoose.Schema({
  id: String,
  userName: String,
  password: String,
  registrationDate: String,
  friends: Array
});
const UserModel = mongoose.model("users", userSchema)

const postSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  date: String,
  likedBy: Array,
  comments: Array  
});
const PostModel = mongoose.model("posts", postSchema)

app.use(async function (req, res, next) {
  await mongoose.connect('mongodb://localhost:27017/socialAppDB');
  next();
});

app.get('/', async (req, res) => {
  res.send('Hello World123!');
});

/// Users 
app.post('/api/userExists', async  (req, res) => {
  //let userName  = req.body;
  console.log("get - /api/userExists");
  console.log(req.body);
  let userName  = req.body.userName;
  const response = await UserModel.findOne({ userName: userName });
  console.log(response);
  if (response === null )
    res.send(false);
  else  
    res.send(true);
    
})

app.post('/api/loginIsPossible', async  (req, res) => {
  //let userName  = req.body;
  console.log("get - /api/userExists");
  console.log(req.body);
  let userName  = req.body.userName;
  let password = req.body.password
  const response = await UserModel.findOne({ userName: userName , password: password});
  console.log(response);
  if (response === null )
    res.send(false);
  else  
    res.send(true);
    
})

app.post("/api/user", async (req, res) => {
  let singleUser  = req.body;
  console.log("post user");
  console.log(singleUser);
  const result = await UserModel.create(singleUser);
  res.status(200).send(singleUser);
});


/// Posts
app.get('/api/post', async  (req, res) => {
  const response = await PostModel.find();
  res.send(response);
})
app.post("/api/post", async (req, res) => {
  let singlePost = req.body;
  console.log("post post");
  console.log(singlePost);
  const result = await PostModel.create(singlePost);
  res.status(200).send(singlePost);
});

app.put("/api/post", async  (req, res) => {
  let singlePost  = req.body;
  console.log("put post");
  console.log(singlePost);
  const result = await PostModel.updateOne({id: singlePost.id}, singlePost);
  res.status(200).send(singlePost);
})

app.delete("/api/post", async  (req, res) => {
  console.log("delete post");
  let singlePost  = req.body;
  console.log(singlePost);
  const result = await PostModel.deleteOne({id: singlePost.id});
  res.status(200).send(singlePost);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
