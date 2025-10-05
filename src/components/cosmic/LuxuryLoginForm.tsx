'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LuxuryLoginFormProps {
  onBack?: () => void
}

export default function LuxuryLoginForm({ onBack }: LuxuryLoginFormProps) {
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
        router.push('/main')
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
    <div className="cosmic-fade-in">
      <div className="cosmic-card max-w-md mx-auto">
        <div className="text-center mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back
            </button>
          )}
          <h1 className="cosmic-heading cosmic-heading-lg font-bold mb-2">
            Welcome to
            <span className="cosmic-text-gradient block">Cosmic Secrets</span>
          </h1>
          <p className="cosmic-body">
            Unlock the mysteries of the universe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cosmic-text-secondary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cosmic-input w-full"
              placeholder="Enter your cosmic email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cosmic-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cosmic-input w-full"
              placeholder="Enter your cosmic password"
              required
            />
          </div>

          {error && (
            <div className="cosmic-slide-up bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="cosmic-btn w-full cosmic-interactive"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="cosmic-spinner mr-2"></div>
                Connecting to the cosmos...
              </div>
            ) : (
              'Enter the Cosmic Realm'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-cosmic-text-muted text-sm">
            Don't have a cosmic account?{' '}
            <a href="/signup" className="cosmic-text-gradient hover:cosmic-text-neon transition-all">
              Create one here
            </a>
          </p>
        </div>

        {/* Quick Login Options */}
        <div className="mt-8 pt-6 border-t border-cosmic-border">
          <p className="text-center text-cosmic-text-muted text-sm mb-4">
            Quick Access (Demo Accounts)
          </p>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => {
                setEmail('admin@dailysecrets.com')
                setPassword('admin123')
              }}
              className="cosmic-interactive text-left p-3 rounded-lg bg-cosmic-bg-glass border border-cosmic-border hover:border-cosmic-border-glow transition-all"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3"></div>
                <div>
                  <div className="font-medium text-cosmic-text-primary">Admin Account</div>
                  <div className="text-xs text-cosmic-text-muted">Full access to all features</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => {
                setEmail('premium@dailysecrets.com')
                setPassword('premium123')
              }}
              className="cosmic-interactive text-left p-3 rounded-lg bg-cosmic-bg-glass border border-cosmic-border hover:border-cosmic-border-glow transition-all"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3"></div>
                <div>
                  <div className="font-medium text-cosmic-text-primary">Premium Account</div>
                  <div className="text-xs text-cosmic-text-muted">Advanced cosmic features</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => {
                setEmail('lathika071@gmail.com')
                setPassword('password123')
              }}
              className="cosmic-interactive text-left p-3 rounded-lg bg-cosmic-bg-glass border border-cosmic-border hover:border-cosmic-border-glow transition-all"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-3"></div>
                <div>
                  <div className="font-medium text-cosmic-text-primary">Regular Account</div>
                  <div className="text-xs text-cosmic-text-muted">Basic cosmic features</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
