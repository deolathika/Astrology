'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  Star, Mail, Lock, Eye, EyeOff, Loader2, 
  AlertCircle, CheckCircle, Globe, Sparkles,
  User, ArrowRight, Shield, Heart
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { AuthNavigation } from '@/components/auth-navigation'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push('/main')
      }
    }
    checkSession()

    // Check for success message from signup
    const urlParams = new URLSearchParams(window.location.search)
    const message = urlParams.get('message')
    if (message) {
      toast.success(message)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const validateForm = (): boolean => {
    const newErrors: string[] = []

    if (!formData.email) {
      newErrors.push('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('Please enter a valid email address')
    }

    if (!formData.password) {
      newErrors.push('Password is required')
    } else if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setErrors(['Invalid email or password. Please try again.'])
        toast.error('Login failed. Please check your credentials.')
      } else {
        toast.success('Welcome back! Redirecting to your cosmic dashboard...')
        
        // Get user session to determine redirect
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/admin/control-panel')
        } else {
          router.push('/main')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors(['An unexpected error occurred. Please try again.'])
      toast.error('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: '/main' })
    } catch (error) {
      console.error(`${provider} login error:`, error)
      toast.error(`${provider} login failed. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <AuthNavigation />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-violet-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Star className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-slate-900 mb-2"
          >
            Welcome Back
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600"
          >
            Sign in to continue your cosmic journey
          </motion.p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Please fix the following errors:</h4>
                    <ul className="mt-1 text-sm text-red-700">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-violet-600 hover:text-violet-700 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-sm text-slate-500">Or continue with</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <Globe className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700 font-medium">Continue with Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <Shield className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700 font-medium">Continue with Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
              >
                Create one here
              </Link>
            </p>
          </div>

          {/* User Type Information */}
          <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-lg border border-violet-100">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-violet-600" />
              <h4 className="font-medium text-violet-800">Account Types</h4>
            </div>
            <div className="space-y-2 text-sm text-violet-700">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span><strong>Free:</strong> Daily guidance, basic profile</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span><strong>Premium:</strong> Full features, AI insights, community</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span><strong>Admin:</strong> Complete system control</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-slate-500">
            By signing in, you agree to our{' '}
            <Link href="/legal/terms" className="text-violet-600 hover:text-violet-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="text-violet-600 hover:text-violet-700">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
