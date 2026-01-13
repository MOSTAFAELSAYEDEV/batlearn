const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js modules that SQL.js might try to use
  if (!config.resolve) {
    config.resolve = {};
  }
  
  if (!config.resolve.fallback) {
    config.resolve.fallback = {};
  }
  
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,
    "path": false,
    "crypto": false,
    "stream": false,
    "util": false,
  };

  // Ignore sql.js WASM file warnings
  if (!config.ignoreWarnings) {
    config.ignoreWarnings = [];
  }
  
  config.ignoreWarnings = [
    ...config.ignoreWarnings,
    /Failed to parse source map/,
    /Module not found.*sql\.js/,
  ];

  return config;
};
