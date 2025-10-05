/**
 * Sign In Page
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Sign-in flow with multiple authentication options
 */

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { CosmicLayout, CosmicCard, CosmicButton, CosmicInput } from '@/components/cosmic'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Chrome,
  Facebook,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.ok) {
        // Redirect based on user role
        const user = (result as any).user
        if (user?.role === 'admin') {
          router.push('/admin')
        } else if (user?.role === 'premium') {
          router.push('/premium')
        } else {
          router.push('/dashboard')
        }
      } else {
        setErrors({ general: 'Invalid email or password' })
      }
    } catch (error) {
      setErrors({ general: 'An error occurred during sign in' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      setErrors({ general: 'Google sign in failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleFacebookSignIn = async () => {
    setLoading(true)
    try {
      await signIn('facebook', { callbackUrl: '/dashboard' })
    } catch (error) {
      setErrors({ general: 'Facebook sign in failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password')
  }

  return (
    <CosmicLayout variant="nebula" size="lg" background="nebula">
      <div className="cosmic-container max-w-md mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-cosmic-text-secondary hover:text-cosmic-gold mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          
          <h1 className="text-3xl font-bold cosmic-text-gradient mb-2">
            Welcome Back
          </h1>
          <p className="text-cosmic-text-secondary">
            Sign in to continue your cosmic journey
          </p>
        </div>

        <CosmicCard variant="glass" size="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Social Sign In */}
            <div className="space-y-4">
              <CosmicButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continue with Google
              </CosmicButton>

              <CosmicButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleFacebookSignIn}
                disabled={loading}
                className="w-full"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Continue with Facebook
              </CosmicButton>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-cosmic-bg-secondary text-cosmic-text-secondary">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Manual Sign In Form */}
            <div className="space-y-4">
              <CosmicInput
                variant="default"
                size="md"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!errors.email}
                errorMessage={errors.email}
                icon={<Mail className="w-4 h-4" />}
              />

              <CosmicInput
                variant="default"
                size="md"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={!!errors.password}
                errorMessage={errors.password}
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-cosmic-gold hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <CosmicButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2" />
              )}
              Sign In
            </CosmicButton>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-cosmic-text-secondary">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/auth/signup')}
                className="text-cosmic-gold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </CosmicCard>
      </div>
    </CosmicLayout>
  )
}