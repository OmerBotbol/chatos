const { Router } = require('express');
const api = Router();
const user = require('./user');
const message = require('./message');
const chat = require('./chat');

api.use('/user', user);
api.use('/message', message);
api.use('/chat', chat);

module.exports = api;
