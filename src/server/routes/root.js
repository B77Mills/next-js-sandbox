const path = require('path');
const { Router } = require('express');
const robots = require('../services/robots');
const sitemap = require('../services/sitemap');

const router = Router();

module.exports = (next) => {
  router.get('/favicon.ico', (req, res) => {
    const file = path.resolve(__dirname, '../../static/favicon.ico');
    next.serveStatic(req, res, file);
  });

  router.get('/robots.txt', (req, res) => {
    const { protocol } = req;
    const txt = robots(`${protocol}://${req.headers.host}`);
    res.set('Content-Type', 'text/plain');
    res.send(txt);
  });

  router.get('/sitemap.xml', (req, res) => {
    const xml = sitemap();
    res.set('Content-Type', 'text/xml');
    res.send(xml);
  });

  return router;
};
