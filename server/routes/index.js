const { Router } = require('express');
const api = Router();
const user = require('./user');
const chat = require('./chat');

api.use('/user', user);
api.use('/chat', chat);

module.exports = api;
