module.exports = {
  distDir: '../.next',

  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.jsx?$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        emitWarning: dev,
      },
    });
    return config;
  },
};
