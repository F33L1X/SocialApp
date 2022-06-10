const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()
const uri = process.env.MONGO_URI;


const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const app = express();
const port = 8000;
const PORT_CHATSERVER = 8002;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

app.use(express.json());

const userSchema = new mongoose.Schema({
  id: String,
  userName: String,
  password: String,
  registrationDate: String,
  friends: Array,
  friendRequestsSent: Array,
  friendRequestsRecieved: Array,
  messages: Array 
});

const UserModel = mongoose.model("users", userSchema)

const postSchema = new mongoose.Schema({
  id: String,
  title: String,
  creator: String,
  description: String,
  date: String,
  likedBy: Array,
  comments: Array
});
const PostModel = mongoose.model("posts", postSchema)


const conversationSchema = new mongoose.Schema({
  roomID: String,
  name: String,
  messages: Array 
});
const ChatModel = mongoose.model("chats", conversationSchema)


// Verbindung mit der MongoDB herstellen
app.use(async function (req, res, next) {
  await mongoose.connect(uri);
  //await mongoose.connect('mongodb://localhost:27017/socialAppDB');
  next();
});


// Chat Server /////////////////////////////////////////////

io.on("connection",  (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId, async () => {
    // User Objekte aus DB abfragen
    const chatRoom = await ChatModel.findOne({ roomID: roomId});
    console.log(chatRoom);
    if (chatRoom !== null){
      // Chatroom existiert bereits -> Daten laden
      //////////////////////////////////////////////////////////
      // Wie gebe ich den Chatverlauf zurück ans Frontend?

    }
    else{
       // Erste Msg zwischen den beiden Usern -> Chatroom in DB anlegen
      chatRoom = {
        roomID: roomId,
        messages: []
      }
      const result = await UserModel.create(chatRoom);
    }
  });

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    
 
    let newMsg = data[0];
    console.log("newMsg");
    console.log(newMsg);


    // User Objekte aus DB abfragen
    const chatRoom = await ChatModel.findOne({ roomID: roomId});
    if (chatRoom!== null){
        // Chatroom existiert bereits -> Daten aktualisieren
        chatRoom.messages = [...chatRoom.messages, newMsg]
        await ChatModel.updateOne({roomID: roomId}, chatRoom);
    }else{
        // Erste Msg zwischen den beiden Usern -> Chatroom in DB anlegen
        // Dürfte eigentlich nie aufgrufen werden!!!
        console.log("FEHLER!!!!!");
        let chatRoom = {
          roomID: roomId,
          messages: [newMsg]
        }
      const result = await ChatModel.create(chatRoom);
      console.log(result);
    }


  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT_CHATSERVER, () => {
  console.log(`Listening on port ${PORT_CHATSERVER}`);
});

app.post ('/api/previousMessages', async (req, res) => {
  console.log("post - /api/previousMessages")
  
  const chatRoom = await ChatModel.findOne({ roomID: req.body.roomId});
  //console.log(chatRoom);
  if (chatRoom !== null){
    console.log(chatRoom.messages);
    res.send(chatRoom.messages);
  }else{
    res.send([]);
  }
})

// User und Post Handling /////////////////////////////////
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

app.put('/api/allMessages', async  (req, res) => {
  // Passwortabsicherung noch nötig!!!
  // NOCH ZU IMPLEMENTIEREN !!!!!
  console.log("put - /api/allMessages");
  console.log(req.body);
  let userName = req.body.userName;
  //Nutzer aus DB abfragen
  const currentUser = await UserModel.findOne({ userName: userName});
  // Verlauf zurückgeben 
  // Vielleicht später hier schon filtern nach Gesprächspartner?
  res.status(200).send(currentUser.messages);

})

app.put('/api/updateMessageStatus', async  (req, res) => {
  console.log("put - /api/updateMessageStatus");
  
  let newMsg = req.body[0];
  let newStatus = req.body[1];
  console.log(newMsg);
  console.log(newStatus);
 

    // User Objekte aus DB abfragen
    const sender = await UserModel.findOne({ userName: newMsg.from});
    const reciever = await UserModel.findOne({ userName: newMsg.to});

   // Message identifizieren und aktualisieren
    let messagesToBeUpdatedSender =  sender.messages.map(oldMsg => { if (oldMsg.id === newMsg.id) oldMsg.status = newStatus; return oldMsg });
    let messagesToBeUpdatedReciever =  reciever.messages.map(oldMsg => { if (oldMsg.id === newMsg.id) oldMsg.status = newStatus; return oldMsg });
    // Objekte aktualisieren
    sender.messages = messagesToBeUpdatedSender;
    reciever.messages = messagesToBeUpdatedReciever;
      // Daten in DB aktualsisieren
    await UserModel.updateOne({userName: sender.userName}, sender);
    await UserModel.updateOne({userName: reciever.userName}, reciever);
 


  res.status(200).send(messagesToBeUpdatedReciever);

})



app.put('/api/newMessage', async  (req, res) => {
  console.log("put - /api/newMessage");
  console.log(req.body);
  let newMessage = req.body;


  //Nutzer aus DB abfragen
  const sender = await UserModel.findOne({ userName: newMessage.from});
  const reciever = await UserModel.findOne({ userName: newMessage.to});

  // Message hinzufügen
  sender.messages = [... sender.messages, newMessage];
  reciever.messages = [... reciever.messages,newMessage];


  // Daten in DB aktualsisieren
  await UserModel.updateOne({userName: sender.userName}, sender);
  await UserModel.updateOne({userName: reciever.userName}, reciever);
  res.status(200).send(sender);
})

app.post('/api/loginIsPossible', async  (req, res) => {
  //let userName  = req.body;
  console.log("get - /api/userExists");
  console.log(req.body);
  let userName  = req.body.userName;
  let password = req.body.password
  const response = await UserModel.findOne({ userName: userName , password: password});
  console.log(response);
  if (response !== null)
    response.password = "";
  if (response === null )
    res.send(response);
  else  
    res.send(response);
    
})

app.post("/api/user", async (req, res) => {
  let singleUser  = req.body;
  console.log("post user");
  console.log(singleUser);
  const result = await UserModel.create(singleUser);
  res.status(200).send(singleUser);
});

/// Friend Requests
app.post("/api/friendRequest", async (req, res) => {
  let friendRequest  = req.body;
  console.log("post friendRequest");
  console.log(friendRequest);
  const sendingUser = await UserModel.findOne({ userName: friendRequest.sendingUser});
  const recievingUser = await UserModel.findOne({ userName: friendRequest.recievingUser });


  // Recieving User
  recievingUser.friendRequestsRecieved = [...recievingUser.friendRequestsRecieved, 
                                          {Anfragender: friendRequest.sendingUser, AnfragenderID:sendingUser.id, 
                                          date:friendRequest.date,
                                          message:friendRequest.message, id: friendRequest.id }]
  console.log(recievingUser);
  const updatedRecievingUser = await UserModel.updateOne({userName: recievingUser.userName}, recievingUser);
  

  // Sending User
  sendingUser.friendRequestsSent = [...sendingUser.friendRequestsSent, 
                                    {AngefragtBei: friendRequest.recievingUser, AngefragtBeiID:recievingUser.id, 
                                    date:friendRequest.date, 
                                    message:friendRequest.message , id: friendRequest.id}]
  
  await UserModel.updateOne({userName: sendingUser.userName}, sendingUser);

   
  sendingUser.password = "";
  console.log(sendingUser);
  res.status(200).send(sendingUser);
});


app.post("/api/rejectFriendRequest", async  (req, res) => {
  console.log("put /api/rejectFriendRequest");
  let currentUser  = req.body[0];
  let friendRequestID  = req.body[1];
  let friendRequest = currentUser.friendRequestsRecieved.filter((e) => e.id === friendRequestID)[0]
  // Nutzer aus DB auslesen, damit PW nicht vergessen wird
  const sendingUser = await UserModel.findOne({ userName: friendRequest.Anfragender});
  const recievingUser = await UserModel.findOne({ userName: currentUser.userName});
  
  // Freundschaftsanfrage bei beiden löschen
  recievingUser.friendRequestsRecieved= recievingUser.friendRequestsRecieved.filter((e) => e.id !== friendRequestID)
  sendingUser.friendRequestsSent = sendingUser.friendRequestsSent.filter((e) => e.id !== friendRequestID)
  console.log("recievingUser");
  console.log(recievingUser);
  // aktualisierte Daten in Datenbank speichern
  await UserModel.updateOne({userName: recievingUser.userName}, recievingUser);
  await UserModel.updateOne({userName: sendingUser.userName}, sendingUser);
  
  recievingUser.password = "";
  res.status(200).send(recievingUser);
});

app.put("/api/acceptFriendRequest", async  (req, res) => {
  console.log("put acceptFriendRequest");
  let currentUser  = req.body[0];
  let friendRequestID  = req.body[1];
  let friendRequest = currentUser.friendRequestsRecieved.filter((e) => e.id === friendRequestID)[0]
  let today = new Date();
  let newFriend = friendRequest.Anfragender;
  
  // Nutzer aus DB auslesen, damit PW nicht vergessen wird
  const sendingUser = await UserModel.findOne({ userName: friendRequest.Anfragender});
  const recievingUser = await UserModel.findOne({ userName: currentUser.userName});

  // neue Freundschaft anlegen
  let newFriendshipRecievingUser = {id: friendRequestID , userName: newFriend, 
                                    userID:newFriend.AnfragenderID, StartOfFriendship:today}

  let newFriendshipSendingUser = {id: friendRequestID , userName: currentUser.userName,
                                    userID:currentUser.id, StartOfFriendship:today}

  // User updaten mit neuem Freund
  recievingUser.friends = [...  recievingUser.friends ,newFriendshipRecievingUser]  
  sendingUser.friends = [...sendingUser.friends, newFriendshipSendingUser]

  // Freundschaftsanfrage bei beiden löschen
  recievingUser.friendRequestsRecieved= recievingUser.friendRequestsRecieved.filter((e) => e.id !== friendRequestID)
  sendingUser.friendRequestsSent = sendingUser.friendRequestsSent.filter((e) => e.id !== friendRequestID)
 
  // aktualisierte Daten in Datenbank speichern
  await UserModel.updateOne({userName: recievingUser.userName}, recievingUser);
  await UserModel.updateOne({userName: sendingUser.userName}, sendingUser);
  
  
  recievingUser.password = "";
  res.status(200).send(recievingUser);
})

/// Posts
app.get('/api/post', async  (req, res) => {
  const response = await PostModel.find();
  res.send(response);
})

app.put ('/api/posts/toggleLikeOfPost', async (req, res) => {
    console.log("/api/posts/toggleLikeOfPost");
  let post = req.body[0];
  let user = req.body[1];
  if (user === undefined){
    // User ist nicht eingeloggt und dürfte eigenlich den button gar nicht sehen
    return;
  }
    

  let userName = user.userName
  console.log(post.likedBy)
  console.log(post.likedBy.includes(userName))
  if (post.likedBy.includes(userName)){
    //UserName entfernen
    console.log("UserName entfernen")
    post.likedBy = post.likedBy.filter((e) => e !== userName)
    await PostModel.updateOne({id: post.id}, post);
  }
  else {
    // userName hinzufügen
    console.log("UserName hinzufügen")
    post.likedBy = [...post.likedBy, userName]
    await PostModel.updateOne({id: post.id}, post);
  } 
    
  
  console.log(post.likedBy)
  res.send(post);
})


app.post('/api/posts/search', async  (req, res) => {
  let searchTerm = req.body.searchTerm;
  let userName = req.body.userName;
  
  if (userName !== "" && searchTerm !== ""){
    let filteredPosts = await PostModel.find({description: new RegExp(searchTerm, 'i'),
                                              creator: userName});
    res.send(filteredPosts);
  }else if (searchTerm !== ""){
    // Nur Filterkriterien für SearchtTerm aus Suchbar übergeben -> nur danach suchen
    let filteredPosts = await PostModel.find({description: new RegExp(searchTerm, 'i')});
    res.send(filteredPosts);
  }else if (userName !== ""){
    // nur Filterkriterium UserName übergeben -> nur danach suchen
    let filteredPosts = await PostModel.find({creator: userName});
    res.send(filteredPosts);
  }else{
    // Keine Filterkriterien wurden übergeben - also ungefiltert zurückgeben
    let filteredPosts = await PostModel.find();
    res.send(filteredPosts);
  }

})

app.post('/api/posts/allPostsOfUser', async  (req, res) => {
  let userName = req.body.userName;
  const response = await PostModel.find({ creator: userName });
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








