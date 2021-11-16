const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllTheMessages = async () => {
  try {
    const db = await connection();
    const Clients = db.collection('WebchatMessages').find().toArray();
    return Clients;
  } catch (error) {
    console.log(error);
    return `Erro: ${error}`;
  }
};

const insertOneMessage = async (message) => {
  try {
    const db = await connection();
    const Clients = db.collection('WebchatMessages').insertOne({ message });
    return Clients;
  } catch (error) {
    console.log(error);
    return `Erro: ${error}`;
  }
};

module.exports = { getAllTheMessages, insertOneMessage };