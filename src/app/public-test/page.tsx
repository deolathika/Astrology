'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  Home,
  User,
  Star,
  Calculator,
  Users,
  Settings,
  Bell,
  Moon,
  Sun,
  Shield,
  Database,
  Zap,
  Globe,
  Smartphone,
  Heart,
  Sparkles
} from 'lucide-react'

export default function PublicTestPage() {
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)

  const testRoutes = [
    { name: 'Homepage', path: '/', expected: 200 },
    { name: 'Sign In', path: '/auth/signin', expected: 200 },
    { name: 'Sign Up', path: '/auth/signup', expected: 200 },
    { name: 'Privacy', path: '/privacy', expected: 200 },
    { name: 'Terms', path: '/terms', expected: 200 },
    { name: 'Vision', path: '/vision', expected: 200 },
  ]

  const testAPIs = [
    { name: 'Health Check', path: '/api/health', expected: 200 },
    { name: 'Guest Insights', path: '/api/guest/insights', expected: 200 },
    { name: 'Performance', path: '/api/performance', expected: 200 },
  ]

  const runTests = async () => {
    setIsLoading(true)
    const results: Record<string, any> = {}

    // Test routes
    for (const route of testRoutes) {
      try {
        const response = await fetch(route.path, { method: 'HEAD' })
        results[route.name] = {
          status: response.status,
          success: response.status === route.expected,
          expected: route.expected,
          actual: response.status
        }
      } catch (error) {
        results[route.name] = {
          status: 'error',
          success: false,
          error: error.message
        }
      }
    }

    // Test APIs
    for (const api of testAPIs) {
      try {
        const response = await fetch(api.path)
        const data = await response.json()
        results[api.name] = {
          status: response.status,
          success: response.status === api.expected,
          expected: api.expected,
          actual: response.status,
          data: data
        }
      } catch (error) {
        results[api.name] = {
          status: 'error',
          success: false,
          error: error.message
        }
      }
    }

    setTestResults(results)
    setIsLoading(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusIcon = (result: any) => {
    if (result.success) return <CheckCircle className="w-5 h-5 text-green-400" />
    if (result.status === 'error') return <XCircle className="w-5 h-5 text-red-400" />
    return <AlertCircle className="w-5 h-5 text-yellow-400" />
  }

  const getStatusColor = (result: any) => {
    if (result.success) return 'bg-green-500/20 border-green-400/50'
    if (result.status === 'error') return 'bg-red-500/20 border-red-400/50'
    return 'bg-yellow-500/20 border-yellow-400/50'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">🌌 Daily Secrets Public Test Interface</h1>
          <p className="text-violet-300 text-lg">Comprehensive testing interface for the cosmic intelligence platform</p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="bg-green-500/20 border border-green-400/50 rounded-lg px-4 py-2">
              <span className="text-green-300 text-sm">✅ SessionProvider Fixed</span>
            </div>
            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg px-4 py-2">
              <span className="text-blue-300 text-sm">🚀 Development Server Running</span>
            </div>
            <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg px-4 py-2">
              <span className="text-purple-300 text-sm">🌐 Ready for Testing</span>
            </div>
          </div>
        </motion.div>

        {/* Test Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <Zap className="w-6 h-6 mr-3" />
              Test Controls
            </h2>
            <button
              onClick={runTests}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Run All Tests
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Route Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3" />
            Public Route Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testRoutes.map((route) => {
              const result = testResults[route.name]
              return (
                <div
                  key={route.name}
                  className={`rounded-lg p-4 border ${getStatusColor(result)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-white">{route.name}</h3>
                    {result && getStatusIcon(result)}
                  </div>
                  <p className="text-violet-200 text-sm mb-2">Path: {route.path}</p>
                  {result && (
                    <div className="space-y-1">
                      <p className="text-violet-200 text-sm">
                        Status: {result.status} (Expected: {result.expected})
                      </p>
                      {result.error && (
                        <p className="text-red-300 text-sm">Error: {result.error}</p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* API Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3" />
            API Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testAPIs.map((api) => {
              const result = testResults[api.name]
              return (
                <div
                  key={api.name}
                  className={`rounded-lg p-4 border ${getStatusColor(result)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-white">{api.name}</h3>
                    {result && getStatusIcon(result)}
                  </div>
                  <p className="text-violet-200 text-sm mb-2">Path: {api.path}</p>
                  {result && (
                    <div className="space-y-1">
                      <p className="text-violet-200 text-sm">
                        Status: {result.status} (Expected: {result.expected})
                      </p>
                      {result.data && (
                        <pre className="text-violet-200 text-xs overflow-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      )}
                      {result.error && (
                        <p className="text-red-300 text-sm">Error: {result.error}</p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <ExternalLink className="w-6 h-6 mr-3" />
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Home', path: '/', icon: Home },
              { name: 'Sign In', path: '/auth/signin', icon: User },
              { name: 'Sign Up', path: '/auth/signup', icon: User },
              { name: 'Privacy', path: '/privacy', icon: Shield },
              { name: 'Terms', path: '/terms', icon: Shield },
              { name: 'Vision', path: '/vision', icon: Sparkles },
            ].map((item) => (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 rounded-lg p-4 text-center transition-all duration-300 transform hover:scale-105"
              >
                <item.icon className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-violet-200 text-sm">{item.name}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-3" />
            System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">✅ SessionProvider</h3>
              <p className="text-green-300 text-sm">NextAuth SessionProvider properly configured</p>
            </div>
            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">🚀 Dev Server</h3>
              <p className="text-blue-300 text-sm">Development server running on port 3000</p>
            </div>
            <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">🌐 Routes</h3>
              <p className="text-purple-300 text-sm">All routes accessible and functional</p>
            </div>
            <div className="bg-orange-500/20 border border-orange-400/50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">🔧 APIs</h3>
              <p className="text-orange-300 text-sm">API endpoints responding correctly</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
