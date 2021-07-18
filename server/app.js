const express = require('express');
const app = express();
const api = require('./routes');

app.use('/api', api);

module.exports = app;
