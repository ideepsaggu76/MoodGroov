/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static optimization
  reactStrictMode: true,
  // Optimize images
  images: {
    domains: ['i.scdn.co'], // Allow Spotify image domains
    unoptimized: process.env.NODE_ENV === 'development'
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