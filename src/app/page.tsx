'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Sparkles, 
  Star, 
  Moon, 
  Heart, 
  Users, 
  Bell, 
  Settings,
  Crown,
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Shield,
  Database,
  BarChart
} from 'lucide-react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    
    // Check for stored user session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        
        // Redirect based on user role
        if (userData.role === 'admin') {
          router.push('/admin')
        } else if (userData.role === 'premium') {
          router.push('/premium')
        } else {
          router.push('/main')
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
      }
    }
  }, [router])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Daily Secrets
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Daily Secrets
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover your cosmic journey with personalized astrology, numerology, and dream analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Begin Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                href="/testing"
                className="bg-gray-100 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Testing Dashboard</span>
                <Zap className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Insights</h3>
              <p className="text-gray-600">
                Get personalized daily guidance based on your cosmic profile
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Astrology</h3>
              <p className="text-gray-600">
                Explore multiple zodiac systems including Western, Vedic, and Chinese
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dream Analysis</h3>
              <p className="text-gray-600">
                AI-powered dream interpretation and journaling
              </p>
            </div>
          </div>

          {/* Quick Access */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Quick Access
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/testing" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 hover:shadow-lg transition-all group">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <span className="font-semibold text-gray-900">Testing</span>
                </div>
              </Link>
              <Link href="/main" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 hover:shadow-lg transition-all group">
                <div className="text-center">
                  <Star className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <span className="font-semibold text-gray-900">Dashboard</span>
                </div>
              </Link>
              <Link href="/premium" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-amber-500 hover:shadow-lg transition-all group">
                <div className="text-center">
                  <Crown className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <span className="font-semibold text-gray-900">Premium</span>
                </div>
              </Link>
              <Link href="/admin" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-pink-500 hover:shadow-lg transition-all group">
                <div className="text-center">
                  <Settings className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <span className="font-semibold text-gray-900">Admin</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Test User Credentials */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Test User Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Free User</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">user@test.com</p>
                <p className="text-sm text-gray-600">password123</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Premium User</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">premium@test.com</p>
                <p className="text-sm text-gray-600">password123</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <Settings className="w-4 h-4 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Admin User</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">admin@test.com</p>
                <p className="text-sm text-gray-600">password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Daily Secrets. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LoginForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/simple-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Redirect based on user role
        if (data.user.role === 'admin') {
          router.push('/admin')
        } else if (data.user.role === 'premium') {
          router.push('/premium')
        } else {
          router.push('/main')
        }
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            {onBack && (
              <button
                onClick={onBack}
                className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back
              </button>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to
              <span className="block text-indigo-600">Daily Secrets</span>
            </h1>
            <p className="text-gray-600">
              Unlock the mysteries of the universe
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Create one here
              </a>
            </p>
          </div>

          {/* Quick Login Options */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm mb-4">
              Quick Access (Demo Accounts)
            </p>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => {
                  setEmail('admin@test.com')
                  setPassword('password123')
                }}
                className="text-left p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Admin Account</div>
                    <div className="text-xs text-gray-500">Full access to all features</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setEmail('premium@test.com')
                  setPassword('password123')
                }}
                className="text-left p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Premium Account</div>
                    <div className="text-xs text-gray-500">Advanced cosmic features</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setEmail('user@test.com')
                  setPassword('password123')
                }}
                className="text-left p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Regular Account</div>
                    <div className="text-xs text-gray-500">Basic cosmic features</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}