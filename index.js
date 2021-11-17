require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: {} });
const color = require('colors');
const clientsModel = require('./model/ClientModel');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(PORT, console.log(`Server running on port: ${(PORT)} `.green));

const newMessage = (message) => {

};

io.on('connection', (socket) => {
  console.log(`new Connection from: ${socket.id}`);
  socket.emit('connection', null);

  socket.on('setName', (givenName) => {
    io.emit('setName', (givenName) => console.log(givenName));
  });

  socket.on('getAllMessages', async () => {
    io.emit('getAllMessages', async () => {
      const getting = await clientsModel.getAllTheMessages();
      return getting;
    });
  });

  socket.on('newMessage', async (message) => {
    await clientsModel.insertOneMessage(message);
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => console.log(`${socket.id} disconnected`));

  socket.on('resetDB', async () => {
    await clientsModel.resetDb();
    io.emit('chatMessage', (message) => console.log('apagado'));
  });
});


app.use((error, _req, res, _next) => {
  console.log('Final middleware error');
  if (error.status && error.message) {
    res.status(error.status).json({ message: { error_type: error.type, error_message: error.message } });
  }
  res.status(500).json({ message: error.message || 'Erro desconhecido ao servidor' });
});
