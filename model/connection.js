const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = process.env.PORT;


const connection = async () => {
  try {
    const conn = await MongoClient.connect(MONGO_DB_URI, OPTIONS);
    return conn.db(MONGO_DB_NAME);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connection;