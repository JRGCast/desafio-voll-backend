require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: {} });
const color = require('colors');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/chatpage', (_req, res) => res.send(`get /chatpagr`));

server.listen(PORT, console.log(`Server running on port: ${(PORT)} `.green));

io.on('connection', (socket) => {
  console.log(`new Connection from: ${socket.id}`);
  socket.emit('connection', null);

  socket.on('setName', (string) => {
    console.log(string);
  socket.emit('setName', string)
  }); 

  socket.on('newMessage', () => {

  });

  socket.on('disconnect', () => console.log(`${socket.id} disconnected`));
});


app.use((error, _req, res, _next) => {
  console.log('Final middleware error');
  if (error.status && error.message) {
    res.status(error.status).json({ message: { error_type: error.type, error_message: error.message } });
  }
  res.status(500).json({ message: error.message || 'Erro desconhecido ao servidor' });
});
