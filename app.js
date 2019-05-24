const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app); //It's same as http.createServer(app)
const socketIo = require("socket.io");
const io = socketIo(server);

server.listen(80); //port 80 is the default port = http://localhost

app.use(express.static(__dirname)); // __dirname here = D:\testing-socketio

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.get("/room1/:id", (req, res) => {});

io.on("connection", socket => {
  // console.log("Socket connected with id: " + socket.id);
  // socket.emit("news", { hello: "world" });
  // socket.on("my other event", data => {
  //   console.log(data);
  // });
  socket.on("submitMessage", data => {
    //Send to everyone except self
    // socket.broadcast.emit("answerToClient", {
    //   text
    // });

    //Send to everyone including self
    io.emit("sendGlobalMessage", {
      text: data.text
    });
  });
});
