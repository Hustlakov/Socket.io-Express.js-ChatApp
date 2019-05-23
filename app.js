const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app); //It's same as http.createServer(app)
const socketIo = require("socket.io");
const io = socketIo(server);

server.listen(80); //port 80 is the default port = http://localhost

app.use(express.static(__dirname));
app.get("/", (req, res) => {
  // __dirname here = D:\testing-socketio
  res.sendFile("/index.html");
});

app.get("/room1/:id", (req, res) => {});

io.on("connection", socket => {
  console.log("Socket connected with id: " + socket.id);
  socket.emit("news", { hello: "world" });
  socket.on("my other event", data => {
    console.log(data);
  });
  socket.on("questionToServer", data => {
    //Send to everyone except self
    socket.broadcast.emit("answerToClient", {
      chat: "Hey client, I am server and I can see you"
    });
    //Send to everyone including self
    io.emit("answerToEveryone", {
      chat2: "This Message is for everyone including myself"
    });
  });
});
