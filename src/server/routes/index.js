const index = require('./root');
const story = require('./story');

module.exports = (server, client) => {
  server.use('/', index(client));
  server.use('/story', story(client));
};
