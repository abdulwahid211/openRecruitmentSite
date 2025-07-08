import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// next.config.js
module.exports = {
  webpack(config: any) {
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
  basePath: '/landsea', // Adjust the base path as needed
  trailingSlash: true, // or false, depending on your preference
};
