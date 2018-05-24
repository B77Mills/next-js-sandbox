const express = require('express');
const path = require('path');
const helmet = require('helmet');
const routes = require('./routes');

const { PORT } = process.env;

const server = express();
server.use(helmet());

module.exports = (next) => {
  const handle = next.getRequestHandler();

  routes(server, next);

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};
