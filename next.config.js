/** @type {import('next').Config} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    // Handle binary files for Transformers.js
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader',
    })

    // Handle ONNX runtime files
    config.module.rules.push({
      test: /\.onnx$/,
      use: 'file-loader',
    })

    // Exclude problematic modules from server-side bundle
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        '@xenova/transformers': 'commonjs @xenova/transformers',
        'onnxruntime-node': 'commonjs onnxruntime-node'
      })
    }

    // Fallback for Node.js modules in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      process: false,
    }

    return config
  },
  // PWA configuration removed for Next.js 14 compatibility
  // Optimize for production
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable compression
  compress: true,
  // Performance optimizations
  swcMinify: true,
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@xenova/transformers'],
  },
}

module.exports = nextConfig