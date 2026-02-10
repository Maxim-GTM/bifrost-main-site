import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ...(process.env.NODE_ENV !== 'development' && { assetPrefix: 'https://bifrost.getmaxim.ai' }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.logo.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bifrost-1.ghost.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'getbifrost.ai',
          },
        ],
        destination: 'https://www.getmaxim.ai/bifrost',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.getbifrost.ai',
          },
        ],
        destination: 'https://www.getmaxim.ai/bifrost',
        permanent: true,
      },
      {
        source: '/oss-friends',
        has: [
          {
            type: 'host',
            value: 'getbifrost.ai',
          },
        ],
        destination: 'https://www.getmaxim.ai/bifrost/oss-friends',
        permanent: true,
      },
      {
        source: '/oss-friends',
        has: [
          {
            type: 'host',
            value: 'www.getbifrost.ai',
          },
        ],
        destination: 'https://www.getmaxim.ai/bifrost/oss-friends',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
