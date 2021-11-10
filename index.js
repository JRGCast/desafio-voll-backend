const cors = require('cors');
const express = require('express');
require('dotenv').config()

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (_req, res) => {
  res.send(`Porta ${PORT} Ok!`);
});

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
