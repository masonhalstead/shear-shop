const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const port = 4001;
const index = require('./routes/index');
const socketServer = express();
socketServer.use(index);
const server = http.createServer(socketServer);
const io = socketIo(server);
let interval;

server.listen(port, () => console.log(`Listening on port ${port}`));

io.on('connection', socket => {
  console.log('New client connected');
  let payload = {
    get_log: false,
    standard_out: false,
  };
  if (interval) {
    clearInterval(interval);
  }
  socket.on('message', message => {
    payload = {
      get_log: message.get_log || false,
      standard_out: message.standard_out || false,
    };
  });
  interval = setInterval(() => getApiAndEmit(socket, payload), 1000);
  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
const getApiAndEmit = async (socket, payload) => {
  try {
    let get_log;
    let standard_out;
    let length = 1;
    if (payload.get_log) {
      get_log = await axios(payload.get_log);
      length = get_log.data.length - 1;
    }
    if (payload.standard_out) {
      standard_out = await axios(payload.standard_out);
    }
    socket.emit('FromAPI', {
      get_log: get_log.data[length] || {},
      standard_out: standard_out.data || '',
    });
  } catch (error) {
    socket.emit('FromAPI', {
      get_log: {},
      standard_out: error.message,
    });
  }
};
