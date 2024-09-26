const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // when a user connects, send a message to the chat
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});


/* "connection" is a predefined event in Socket.IO that the server listens for.
When a client successfully connects to the server, this event is triggered.
The callback function you pass into the io.on("connection") event will be executed whenever a client connects, 
and a unique socket object is created for that specific connection. */