const { Router } = require('express');

const router = Router();

module.exports = (client) => {
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const actualPage = '/story';
    const props = { id };
    client.render(req, res, actualPage, props);
  });
  return router;
};
