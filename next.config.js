/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  // next.js config
});

const conf = {
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ['bcrypt'],
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
};

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(conf);

module.exports = nextConfig;
