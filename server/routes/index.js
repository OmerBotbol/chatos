const { Router } = require('express');
const api = Router();
const user = require('./user');
const chat = require('./chat');
const image = require('./image');

api.use('/user', user);
api.use('/chat', chat);
api.use('/image', image);

module.exports = api;
