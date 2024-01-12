/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    // Increase the timeout for API routes (in milliseconds)
    apiTimeout: 300000, // 300 seconds
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.shopsppl.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'shopsppl.in',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'assets.website-files.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
