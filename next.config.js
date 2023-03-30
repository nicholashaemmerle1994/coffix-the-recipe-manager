/** @type {import('next').NextConfig} */

// import { withPWA } from 'next-pwa';

// const withPWA = require('next-pwa');

// const conf = {
//   experimental: {
//     appDir: true,
//     typedRoutes: true,
//     serverComponentsExternalPackages: ['bcrypt'],
//   },

//   eslint: {
//     ignoreDuringBuilds: true,
//   },

//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };

// const nextConfig = withPWA({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   // disable: process.env.NODE_ENV === 'development',
// })(conf);

// module.exports = nextConfig;

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    scope: '/',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
});
