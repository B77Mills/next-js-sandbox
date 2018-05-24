const next = require('next');
const loadServer = require('./src/server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });

app.prepare().then(() => loadServer(app)).catch((ex) => {
  // eslint-disable-next-line no-console
  console.error(ex.stack);
  process.exit(1);
});
