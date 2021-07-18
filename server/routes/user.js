const { Router } = require('express');
const user = Router();

user.get('/test', (req, res) => {
  res.send('user test');
});

module.exports = user;
