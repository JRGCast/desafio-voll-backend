require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {}
});
const color = require('colors');
const clientsModel = require('./model/ClientModel');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(PORT, console.log(`Server running on port: ${(PORT)} `.green));

let allConnected = [];

io.on('connection', (socket) => {
  console.log(`new Connection from: ${socket.id}`);
  socket.emit('connection', null);

  socket.on('setName', (givenName) => {
    socket.emit('setName', (givenName));
    allConnected.push({ socketId: socket.id, givenName });
    io.emit('getAllConnected', allConnected);
  });

  socket.on('getAllMessages', async () => {
    const getting = await clientsModel.getAllTheMessages();
    io.emit('getAllMessages', getting);
  });

  socket.on('newMessage', async (message) => {
    await clientsModel.insertOneMessage(message);
    socket.broadcast.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    allConnected = allConnected.filter(({ socketId }) => socketId !== socket.id);
    const filtered = allConnected.filter(({ socketId }) => socketId === socket.id);
    socket.broadcast.emit('getAllConnected', filtered);
    io.emit('chatMessage', `${socket.id} se desconectou`);
    // io.emit('getAllConnected', filtered);
    console.log(`${socket.id} disconnected`);
  });

  socket.on('resetDB', async () => {
    await clientsModel.resetDb();
    io.emit('chatMessage', 'DB APAGADO');
  });
});


app.use((error, _req, res, _next) => {
  console.log('Final middleware error');
  if (error.status && error.message) {
    res.status(error.status).json({ message: { error_type: error.type, error_message: error.message } });
  }
  res.status(500).json({ message: error.message || 'Erro desconhecido ao servidor' });
});
