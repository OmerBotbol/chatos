const { Router } = require('express');
const message = Router();

message.get('/test', (req, res) => {
  res.send('message test');
});

module.exports = message;
