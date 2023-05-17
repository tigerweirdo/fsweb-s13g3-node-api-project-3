const server = require('./api/server');

const port = 9000;

server.listen(port, () => console.log(`${port} no'lu port dinleniyor...`));