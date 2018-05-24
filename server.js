const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: './src',
});
const handle = app.getRequestHandler();
const { PORT } = process.env;

app.prepare().then(() => {
  const server = express();

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
