module.exports = {
  options: {
    buildType: 'spa',
    enableBabelCache: false,
  },
  modifyWebpackConfig(opts) {
    const config = opts.webpackConfig;

    // Ignore fs dependencies so we can use winston
    // if (opts.env.target === 'node' && !opts.env.dev) {
    config.node = { fs: 'empty' };
    // }
    config.performance = {
      hints: false,
      maxEntrypointSize: 812000,
      maxAssetSize: 812000
    }

    return config;
  },
};
