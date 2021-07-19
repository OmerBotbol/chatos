const { Router } = require('express');
const {
  getChatsByQuery,
  createChat,
  joinToChat,
} = require('../controllers/chatController');
const { validateToken } = require('../utils');
const chat = Router();

chat.use(validateToken);

chat.get('/', getChatsByQuery);

chat.post('/create', createChat);

chat.put('/join', joinToChat);

module.exports = chat;
