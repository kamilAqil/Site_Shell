const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');



const path = require("path");

dotenvLoad();

const withNextEnv = nextEnv({
  publicPrefix : 'PUB_',
  staticPrefix : 'STAT_'
});


module.exports = withNextEnv({
  images: {
    domains: ['square-catalog-sandbox.s3.amazonaws.com'][' https://square-catalog-sandbox.s3.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });
    config.module.rules.push({
      resolve: {
        modules: [path.resolve(), "node_modules"],
      },
    });
    return config;
  },
});
