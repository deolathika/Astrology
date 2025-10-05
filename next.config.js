/** @type {import('next').Config} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
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

    // Phase 1: Build Optimization
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            priority: 5,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
        },
      }
    }

    return config
  },
  // PWA configuration removed for Next.js 14 compatibility
  // Optimize for production
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Enable compression
  compress: true,
  // Performance optimizations
  swcMinify: true,
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@xenova/transformers', 'lucide-react', '@radix-ui/react-icons'],
  },
  // Phase 1: Performance Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig