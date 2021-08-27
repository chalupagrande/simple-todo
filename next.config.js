const path = require("path");
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve && config.resolve.alias ? config.resolve.alias : {}),
      "~": path.resolve(__dirname, "./src"),
    };

    return config;
  },
};
