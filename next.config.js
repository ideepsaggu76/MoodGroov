/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static optimization
  reactStrictMode: true,
  // Optimize images
  images: {
    domains: ['i.scdn.co', 'accounts.scdn.co'], // Allow Spotify image domains
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  // Minimize during development
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: false,
        minimize: false,
        minimizer: []
      }
    }
    return config
  },
  // Experimental features for faster compilation
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', 'framer-motion']
  }
} 