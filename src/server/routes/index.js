const index = require('./root');
const story = require('./story');

module.exports = (app, next) => {
  app.use('/', index(next));
  app.use('/story', story(next));
};
