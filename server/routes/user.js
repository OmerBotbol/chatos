const { Router } = require('express');
const user = Router();
const { validateToken } = require('../utils');
const {
  login,
  createUser,
  updateAccessToken,
} = require('../controllers/userControllers');

user.post('/create', createUser);

user.post('/login', login);

user.post('/refreshToken', updateAccessToken);

user.get('/data', validateToken, (req, res) => {
  const { data } = req;
  res.send(data);
});

module.exports = user;
