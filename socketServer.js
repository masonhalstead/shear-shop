const cryptoJS = require('crypto-js');
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
  if (interval) {
    clearInterval(interval);
  }
  let jobId = socket.handshake.query['jobId'];
  let private_key = socket.handshake.query['private_key'];
  let public_key = socket.handshake.query['public_key'];
  let host = socket.handshake.query['host'];
  let hash = socket.handshake.query['hash'];

  interval = setInterval(() => getApiAndEmit(socket, jobId, private_key, public_key, host, hash), 2000);
  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

const getApiAndEmit = async (socket, jobId, private_key, public_key, host, hash) => {
  try {

    if (!private_key || !public_key) {
      throw new Error('Error authenticating credentials');
    }
    const url = `/jobs/${jobId}/get_log`;

    const res = await axios({
      method: 'get',
      url: `${host}${url}`,
      headers: {
        public_key: public_key,
        'content-type': 'application/json',
        hash: hash
      },
    });
    socket.emit('FromAPI', res.data);
  } catch (error) {
    console.log(error);
    console.error(`Error: ${error}`);
  }
};
