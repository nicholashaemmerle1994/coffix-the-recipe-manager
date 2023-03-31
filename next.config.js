/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default;

const conf = {
  experimental: {
    appDir: true,
  },

  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
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
})(conf);

module.exports = nextConfig;
