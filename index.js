const cors = require('cors');
const express = require('express');
const socket = require("socket.io");
const color = require("colors");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, console.log(`Server is running on the port no: ${(PORT)} `.green)
);

// app.use('/company', companyRouter);
// app.use('/clients', clientsRouter);

app.use((error, _req, res, _next) => {
  console.log('Final middleware error');
  if (error.status && error.message) {
    res.status(error.status).json({ message: { error_type: error.type, error_message: error.message } });
  }
  res.status(500).json({ message: error.message || 'Erro desconhecido ao servidor' });
});


app.listen(PORT, () => console.log(`Escutando porta ${PORT}`));
