const path = require('path');
const { Router } = require('express');
const robots = require('../services/robots');
const sitemap = require('../services/sitemap');

const router = Router();

module.exports = (client) => {
  router.get('/:storyId([0-9]{8})', (req, res) => {
    const { storyId } = req.params;
    res.redirect(301, `/story/${storyId}`);
  });

  router.get('/favicon.ico', (req, res) => {
    const file = path.resolve(__dirname, '../../static/favicon.ico');
    client.serveStatic(req, res, file);
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
