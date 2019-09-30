const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = 4001;
const index = require("./routes/index");
const socketServer = express();
socketServer.use(index);
const server = http.createServer(socketServer);
const io = socketIo(server);
let interval;

server.listen(port, () => console.log(`Listening on port ${port}`));

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 2000);
  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    socket.emit("FromAPI", res.data.body);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
