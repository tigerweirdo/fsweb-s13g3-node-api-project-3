const express = require('express');
const usersrouter = require("./users/users-router")
const mw = require("./middleware/middleware")

const server = express();

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());


// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;