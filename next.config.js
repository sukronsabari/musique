/** @type {import('next').NextConfig} */

// configure pwa
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  scope: '/app',
  // register: true,
  // sw: 'service-worker.js',
  //...
});

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.mzstatic.com',
        pathname: '/image/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
        port: '',
      },
    ],
  },
});
