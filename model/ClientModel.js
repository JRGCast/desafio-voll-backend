const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllTheClients = async () => {
  try {
    const db = await connection();
    const Clients = db.collection('Clients').find().toArray();
    return Clients;
  } catch (error) {
    console.log(error);
    return `Erro: ${error}`;
  }
};
