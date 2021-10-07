const path = require("path");
module.exports = {
  webpack5: true,
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve && config.resolve.alias ? config.resolve.alias : {}),
      "~": path.resolve(__dirname, "./src"),
    };

    // USING THIS TO HOTFIX "cannot find module fs"
    config.resolve.fallback = { fs: false, crypto: false };

    return config;
  },
};
