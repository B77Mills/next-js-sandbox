require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const routes = require('./routes');

const { PORT } = process.env;

const server = express();
server.use(helmet());

server.use((req, res, next) => {
  res.set('Accept-CH', 'DPR');
  res.set('Accept-CH-Lifetime', 60 * 60 * 24 * 30);
  next();
});

module.exports = (client) => {
  const handle = client.getRequestHandler();

  routes(server, client);

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};
