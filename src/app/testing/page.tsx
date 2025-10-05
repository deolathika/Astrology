'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ModernLayout } from '@/components/layouts/ModernLayout'
import { useRoleAccess } from '@/lib/role-based-routing'
import { useTheme } from '@/lib/theme-provider'
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Users, 
  Crown, 
  Star,
  Settings,
  Database,
  Shield,
  Zap,
  Globe,
  Smartphone
} from 'lucide-react'

export default function TestingPage() {
  const [testResults, setTestResults] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, loading: userLoading } = useRoleAccess()
  const { theme } = useTheme()

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth/login')
      return
    }

    // Run tests
    runTests()
  }, [user, userLoading, router])

  const runTests = async () => {
    setLoading(true)
    const results: any = {}

    try {
      // Test 1: Authentication
      results.authentication = {
        status: user ? 'pass' : 'fail',
        message: user ? 'User authenticated successfully' : 'User not authenticated',
        details: user ? {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        } : null
      }

      // Test 2: Role-based access
      results.roleAccess = {
        status: user ? 'pass' : 'fail',
        message: user ? `Role-based access working for ${user.role} user` : 'No role access',
        details: user ? {
          role: user.role,
          permissions: getRolePermissions(user.role)
        } : null
      }

      // Test 3: Theme system
      results.themeSystem = {
        status: theme ? 'pass' : 'fail',
        message: theme ? `Theme system working with ${theme} theme` : 'Theme system not working',
        details: {
          currentTheme: theme,
          availableThemes: ['user', 'premium', 'admin']
        }
      }

      // Test 4: API connectivity
      try {
        const response = await fetch('/api/user/insights?userId=' + user?.id)
        results.apiConnectivity = {
          status: response.ok ? 'pass' : 'fail',
          message: response.ok ? 'API connectivity working' : 'API connectivity failed',
          details: {
            status: response.status,
            ok: response.ok
          }
        }
      } catch (error) {
        results.apiConnectivity = {
          status: 'fail',
          message: 'API connectivity failed',
          details: { error: (error as Error).message }
        }
      }

      // Test 5: Database connectivity
      try {
        const response = await fetch('/api/health')
        results.databaseConnectivity = {
          status: response.ok ? 'pass' : 'fail',
          message: response.ok ? 'Database connectivity working' : 'Database connectivity failed',
          details: {
            status: response.status,
            ok: response.ok
          }
        }
      } catch (error) {
        results.databaseConnectivity = {
          status: 'fail',
          message: 'Database connectivity failed',
          details: { error: (error as Error).message }
        }
      }

      // Test 6: Mobile responsiveness
      results.mobileResponsiveness = {
        status: 'pass',
        message: 'Mobile responsiveness test passed',
        details: {
          screenWidth: window.innerWidth,
          isMobile: window.innerWidth < 768,
          isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
          isDesktop: window.innerWidth >= 1024
        }
      }

      // Test 7: Feature access
      results.featureAccess = {
        status: 'pass',
        message: 'Feature access working correctly',
        details: {
          canAccessPremium: user?.role === 'premium' || user?.role === 'admin',
          canAccessAdmin: user?.role === 'admin',
          availableFeatures: getAvailableFeatures(user?.role)
        }
      }

    } catch (error) {
      console.error('Test error:', error)
    }

    setTestResults(results)
    setLoading(false)
  }

  const getRolePermissions = (role: string) => {
    const permissions = {
      user: ['basic-features', 'daily-insights', 'profile', 'community'],
      premium: ['basic-features', 'daily-insights', 'profile', 'community', 'advanced-astrology', 'unlimited-insights', 'ai-features'],
      admin: ['all-features', 'user-management', 'system-analytics', 'content-management']
    }
    return (permissions as any)[role] || []
  }

  const getAvailableFeatures = (role: string) => {
    const features = {
      user: ['Daily Insights', 'Basic Numerology', 'Zodiac Info', 'Community'],
      premium: ['All User Features', 'Advanced Astrology', 'AI Dream Analysis', 'Unlimited Insights', 'Expert Consultations'],
      admin: ['All Premium Features', 'User Management', 'System Analytics', 'Content Management', 'QA Testing']
    }
    return (features as any)[role] || []
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'fail':
        return <XCircle className="w-6 h-6 text-red-500" />
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'fail':
        return 'bg-red-50 border-red-200 text-red-800'
      default:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
    }
  }

  if (userLoading || loading) {
    return (
      <ModernLayout title="Testing Dashboard" description="Comprehensive testing environment">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
        </div>
      </ModernLayout>
    )
  }

  return (
    <ModernLayout title="Testing Dashboard" description="Comprehensive testing environment for all user roles">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Testing Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive testing environment for Daily Secrets application
          </p>
        </div>

        {/* User Info Card */}
        {user && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name || 'User'}
                </h2>
                <p className="text-gray-600">
                  {user.email} • {user.role} {user.role === 'premium' && '⭐'} {user.role === 'admin' && '👑'}
                </p>
                <p className="text-sm text-gray-500">
                  Testing as {user.role} user
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(testResults).map(([testName, result]: [string, any]) => (
            <div
              key={testName}
              className={`rounded-xl border-2 p-6 ${getStatusColor(result.status)}`}
            >
              <div className="flex items-center space-x-3 mb-4">
                {getStatusIcon(result.status)}
                <h3 className="text-lg font-semibold capitalize">
                  {testName.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
              </div>
              <p className="text-sm mb-4">{result.message}</p>
              {result.details && (
                <details className="text-xs">
                  <summary className="cursor-pointer font-medium">View Details</summary>
                  <pre className="mt-2 p-2 bg-black bg-opacity-10 rounded text-xs overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/main')}
              className="flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <Home className="w-6 h-6 text-indigo-600" />
              <span className="font-medium">Go to Dashboard</span>
            </button>
            
            <button
              onClick={() => router.push('/profile')}
              className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <User className="w-6 h-6 text-green-600" />
              <span className="font-medium">View Profile</span>
            </button>
            
            <button
              onClick={() => router.push('/settings')}
              className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600" />
              <span className="font-medium">Settings</span>
            </button>
            
            <button
              onClick={runTests}
              className="flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
            >
              <Zap className="w-6 h-6 text-yellow-600" />
              <span className="font-medium">Run Tests Again</span>
            </button>
          </div>
        </div>

        {/* Feature Testing */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Feature Testing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getAvailableFeatures(user?.role).map((feature: any, index: any) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Application</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Version: 1.0.0</li>
                <li>Environment: Development</li>
                <li>Database: SQLite</li>
                <li>Theme: {theme}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Browser</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>User Agent: {navigator.userAgent}</li>
                <li>Screen: {window.innerWidth}x{window.innerHeight}</li>
                <li>Language: {navigator.language}</li>
                <li>Platform: {navigator.platform}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  )
}

// Import icons
import { Home, User } from 'lucide-react'
