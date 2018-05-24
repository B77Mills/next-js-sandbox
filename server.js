const express = require('express');
const next = require('next');
const path = require('path');
const helmet = require('helmet');
const robots = require('./src/server/robots');
const sitemap = require('./src/server/sitemap');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: './src',
});
const handle = app.getRequestHandler();
const { PORT } = process.env;

app.prepare().then(() => {
  const server = express();
  server.use(helmet());

  server.get('/story/:id', (req, res) => {
    const { id } = req.params;
    const actualPage = '/story';
    const props = { id } ;
    app.render(req, res, actualPage, props);
  });

  server.get('/favicon.ico', (req, res) => {
    const file = path.join(__dirname, 'src/static/favicon.ico');
    app.serveStatic(req, res, file);
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
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
