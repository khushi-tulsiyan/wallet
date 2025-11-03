/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'lib/models.js': 'commonjs lib/models.js',
        'lib/database.js': 'commonjs lib/database.js',
      });
      
      config.resolve.alias = {
        ...config.resolve.alias,
      };
      
      config.module = config.module || {};
      config.module.unknownContextCritical = false;
      config.module.exprContextCritical = false;
      config.module.unknownContextRegExp = /^\.\/.*$/;
      config.module.unknownContextRequest = '.';
      
      config.ignoreWarnings = [
        { module: /lib\/models\.js/ },
        { module: /lib\/database\.js/ },
      ];
    }
    return config;
  },
}

module.exports = nextConfig


