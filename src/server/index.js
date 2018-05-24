const express = require('express');
const path = require('path');
const helmet = require('helmet');
const robots = require('./robots');
const sitemap = require('./sitemap');

const { PORT } = process.env;

const server = express();
server.use(helmet());

module.exports = (next) => {
  const handle = next.getRequestHandler();

  server.get('/story/:id', (req, res) => {
    const { id } = req.params;
    const actualPage = '/story';
    const props = { id };
    next.render(req, res, actualPage, props);
  });

  server.get('/favicon.ico', (req, res) => {
    const file = path.join(__dirname, 'src/static/favicon.ico');
    next.serveStatic(req, res, file);
  });

  server.get('/robots.txt', (req, res) => {
    const txt = robots(`http://localhost:${PORT}`);
    res.set('Content-Type', 'text/plain');
    res.send(txt);
  });

  server.get('/sitemap.xml', (req, res) => {
    const xml = sitemap();
    res.set('Content-Type', 'text/xml');
    res.send(xml);
  });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};
