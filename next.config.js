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
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/ekartcon/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                { key: 'Cache-Control', value: 'no-store, max-age=0', },
            ]
        }
    ]
}
}

module.exports = nextConfig
