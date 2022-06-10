////////////// Server für Chat ////////////////////////////
const server = require("http").createServer();
const mongoose = require('mongoose');
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const PORT = 8001;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const conversationSchema = new mongoose.Schema({
    id: String,
    userName1: String,
    userName2: String,
    messages: Array 
  });
  const ChatModel = mongoose.model("chat", conversationSchema)
/*
io.use(async function (req, res, next) {
    await mongoose.connect('mongodb://localhost:27017/socialAppDB');
});
*/

io.on("connection", (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);

    
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
