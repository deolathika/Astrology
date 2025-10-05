'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { useAppStore } from '@/lib/stores/app-store'
import { trackPageView, trackUserAction } from '@/lib/monitoring/analytics'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    birthTime: '',
    placeLabel: '',
    systemPref: 'western' as 'vedic' | 'western' | 'chinese' | 'hybrid'
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAppStore()
  const router = useRouter()

  React.useEffect(() => {
    trackPageView('/signup', 'Signup Page')
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
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
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          placeLabel: formData.placeLabel,
          systemPref: formData.systemPref
        }),
      })

      const data = await response.json()

      if (data.success) {
        login(data.user, data.user.profile)
        trackUserAction('signup', 'authentication')
        router.push('/')
      } else {
        setError(data.error || 'Signup failed')
      }
    } catch (error) {
      setError('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-foreground">
                Birth Date
              </label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                required
                value={formData.birthDate}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="birthTime" className="block text-sm font-medium text-foreground">
                Birth Time
              </label>
              <Input
                id="birthTime"
                name="birthTime"
                type="time"
                required
                value={formData.birthTime}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="placeLabel" className="block text-sm font-medium text-foreground">
                Birth Place
              </label>
              <Input
                id="placeLabel"
                name="placeLabel"
                type="text"
                required
                value={formData.placeLabel}
                onChange={handleChange}
                className="mt-1"
                placeholder="e.g., New York, NY"
              />
            </div>

            <div>
              <label htmlFor="systemPref" className="block text-sm font-medium text-foreground">
                Astrology System
              </label>
              <select
                id="systemPref"
                name="systemPref"
                value={formData.systemPref}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="western">Western</option>
                <option value="vedic">Vedic</option>
                <option value="chinese">Chinese</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="text-destructive text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
