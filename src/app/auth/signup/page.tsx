/**
 * Sign Up Page
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Comprehensive sign-up flow with multiple authentication options
 */

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { CosmicLayout, CosmicCard, CosmicButton, CosmicInput } from '@/components/cosmic'
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Chrome,
  Facebook,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [step, setStep] = useState(1)

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (response.ok) {
        // Auto sign in after successful signup
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.ok) {
          router.push('/dashboard')
        } else {
          setErrors({ general: 'Sign up successful, please sign in' })
        }
      } else {
        const errorData = await response.json()
        setErrors({ general: errorData.message || 'Sign up failed' })
      }
    } catch (error) {
      setErrors({ general: 'An error occurred during sign up' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      setErrors({ general: 'Google sign up failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleFacebookSignUp = async () => {
    setLoading(true)
    try {
      await signIn('facebook', { callbackUrl: '/dashboard' })
    } catch (error) {
      setErrors({ general: 'Facebook sign up failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <CosmicLayout variant="nebula" size="lg" background="nebula">
      <div className="cosmic-container max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold cosmic-text-gradient mb-2">
            Join Daily Secrets
          </h1>
          <p className="text-cosmic-text-secondary">
            Start your cosmic journey today
          </p>
        </div>

        <CosmicCard variant="glass" size="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Social Sign Up */}
            <div className="space-y-4">
              <CosmicButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleGoogleSignUp}
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
                onClick={handleFacebookSignUp}
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

            {/* Manual Sign Up Form */}
            <div className="space-y-4">
              <CosmicInput
                variant="default"
                size="md"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!errors.name}
                errorMessage={errors.name}
                icon={<User className="w-4 h-4" />}
              />

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
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={!!errors.password}
                errorMessage={errors.password}
                icon={<Lock className="w-4 h-4" />}
              />

              <CosmicInput
                variant="default"
                size="md"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errors.general}
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="text-sm text-cosmic-text-secondary">
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-cosmic-gold hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-cosmic-gold hover:underline">
                Privacy Policy
              </a>
            </div>

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
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              Create Account
            </CosmicButton>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-cosmic-text-secondary">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/auth/signin')}
                className="text-cosmic-gold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </CosmicCard>
      </div>
    </CosmicLayout>
  )
}