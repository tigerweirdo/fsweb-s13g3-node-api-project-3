const express = require('express');
const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.json());
server.use(logger);

const usersRoutes = require('./users/users-router.js');
server.use('/api/users', usersRoutes);

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
  