const models = require('../models');
const _ = require('lodash');
const { Op } = require('sequelize');
global.Promise = require('bluebird');

const getChatsByQuery = (req, res) => {
  let searchQuery;
  if (_.size(req.query) <= 1) {
    searchQuery = req.query;
  } else {
    const emptyArr = Object.keys(req.query).map((key) => {
      const emptyObj = {};
      emptyObj[key] = req.query[key];
      return emptyObj;
    });
    searchQuery = { [Op.and]: emptyArr };
  }
  models.UsersInChatRooms.findAll({ where: searchQuery, raw: true })
    .then((data) => {
      if (!data) {
        return res.send([]);
      }
      Promise.map(data, (chat) => {
        return models.Chats.findOne({ where: { id: chat.chat_id }, raw: true });
      }).then((result) => {
        res.send(result);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};

const createChat = async (req, res) => {
  const { name, userId } = req.body;
  if (userId !== req.data.id)
    return res.status(403).send('only the user can create his own chat room');
  try {
    const chatData = (await models.Chats.create({ name })).get({ plain: true });
    await models.UsersInChatRooms.create({
      user_id: userId,
      chat_id: chatData.id,
    });
    res.status(201).send({ chatId: chatData.id });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const joinToChat = async (req, res) => {
  const { chatId, userId } = req.body;
  if (userId !== req.data.id)
    return res
      .status(403)
      .send('only the user can choose to join to chat room');
  try {
    await models.UsersInChatRooms.create({
      user_id: userId,
      chat_id: chatId,
    });
    res.status(200).send('you join the chat room successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

module.exports = { getChatsByQuery, createChat, joinToChat };
