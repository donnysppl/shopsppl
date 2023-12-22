/** @type {import('next').NextConfig} */
const nextConfig = {
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
