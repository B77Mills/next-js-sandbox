const { Router } = require('express');

const router = Router();

module.exports = (next) => {
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const actualPage = '/story';
    const props = { id };
    next.render(req, res, actualPage, props);
  });
  return router;
};
