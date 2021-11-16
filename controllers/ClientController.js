const clientsModel = require('../model/ClientModel');

const getAllMsgs = async (_req, res) => {
  const gettingMsgs = await clientsModel.getAllTheMessages();
  res.json(gettingMsgs);
};

const insertNewMessage = async (req, res) => {
  const { username, date, message } = req.body;
  const gettingMsgs = await clientsModel.insertOneMessage(username, date, message);
  res.send(200).json({ message: gettingMsgs });
};

module.exports = { getAllMsgs, insertNewMessage };