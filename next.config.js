/* eslint-disable */

const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

if (!process.env.SKIP_ENV_VALIDATION) {
  import('./src/env.mjs');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // trailingSlash: true,

  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@/lib/prisma']
  },

  images: {
    domains: [
      'localhost',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com'
    ],
    formats: ['image/webp']
  },

  webpack: config => {
    config.plugins.push(new WindiCSSWebpackPlugin()); // Add the plugin to the existing webpack plugins array (config.plugins)

    return config;
  }
};

module.exports = nextConfig;
