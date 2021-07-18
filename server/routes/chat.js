const { Router } = require('express');
const chat = Router();

chat.get('/test', (req, res) => {
  res.send('chat test');
});

module.exports = chat;
