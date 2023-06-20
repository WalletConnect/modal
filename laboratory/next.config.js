/** @type {import('next').NextConfig} */

// Only required within the scope of this monorepo
const nextConfig = {
  transpilePackages: ['@walletconnect/modal-ui', '@walletconnect/modal-core'],
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'export',
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false
    }
    return config
  }
}

module.exports = nextConfig
