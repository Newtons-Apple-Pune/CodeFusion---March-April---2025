/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ],

  images: {
    domains: [], // Add if using external image URLs
    minimumCacheTTL: 60,
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },

  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  trailingSlash: true,
};
