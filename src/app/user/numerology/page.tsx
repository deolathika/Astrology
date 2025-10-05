'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CosmicNebulaBackground from '@/components/cosmic/CosmicNebulaBackground'
import { useQuery } from '@tanstack/react-query'

export default function UserNumerologyPage() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.role !== 'user') {
        router.push('/main')
        return
      }
      setUser(userData)
    } else {
      router.push('/')
    }
  }, [router])

  // Fetch numerology data
  const { data: numerologyData, isLoading: numerologyLoading, error: numerologyError } = useQuery({
    queryKey: ['numerology', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/numerology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          fullName: user.name || 'User',
          birthDate: user.profile?.birthDate || '1990-01-01'
        })
      })
      if (!response.ok) throw new Error('Failed to fetch numerology')
      return response.json()
    },
    enabled: !!user?.id
  })

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center cosmic-minimalist-modern-bg">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen cosmic-minimalist-modern-bg relative overflow-hidden">
      <CosmicNebulaBackground />

      {/* Navigation */}
      <nav className="cosmic-nav-minimalist-modern fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/user" className="logo">
                Daily Secrets
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Welcome, {user.name || user.email}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  router.push('/')
                }}
                className="cosmic-btn-minimalist-modern"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12 fade-in-minimalist-modern">
            <h1 className="cosmic-hero-title-minimalist-modern">
              Your Numerology Profile
            </h1>
            <p className="cosmic-hero-subtitle-minimalist-modern">
              Discover the hidden meanings in your numbers
            </p>
          </div>

          {/* Numerology Content */}
          <div className="cosmic-card-minimalist-modern p-6">
            <h2 className="card-title mb-6">Your Numerological Analysis</h2>
            
            {numerologyLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                <p className="text-white/60 mt-4">Calculating your numbers...</p>
              </div>
            ) : numerologyError ? (
              <div className="text-center py-8">
                <div className="text-red-400 mb-4">⚠️</div>
                <p className="text-red-400 mb-4">Failed to calculate numerology</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="cosmic-btn-minimalist-modern"
                >
                  Try Again
                </button>
              </div>
            ) : numerologyData?.data ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">🔢</div>
                  <h3 className="font-semibold text-white mb-3 text-lg">Life Path Number</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{numerologyData.data.lifePath}</div>
                  <p className="text-sm text-white/80">{numerologyData.data.lifePathMeaning}</p>
                </div>
                
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="font-semibold text-white mb-3 text-lg">Destiny Number</h3>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{numerologyData.data.destiny}</div>
                  <p className="text-sm text-white/80">{numerologyData.data.destinyMeaning}</p>
                </div>
                
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">💫</div>
                  <h3 className="font-semibold text-white mb-3 text-lg">Soul Urge Number</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">{numerologyData.data.soulUrge}</div>
                  <p className="text-sm text-white/80">{numerologyData.data.soulUrgeMeaning}</p>
                </div>
                
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="font-semibold text-white mb-3 text-lg">Personality Number</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{numerologyData.data.personality}</div>
                  <p className="text-sm text-white/80">{numerologyData.data.personalityMeaning}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔮</div>
                <p className="text-white/80 mb-4">No numerology data available</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="cosmic-btn-minimalist-modern"
                >
                  Calculate Numbers
                </button>
              </div>
            )}

            {/* Back to Dashboard */}
            <div className="mt-8 text-center">
              <Link href="/user" className="cosmic-btn-minimalist-modern">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="cosmic-footer-minimalist-modern relative z-20 mt-12">
        <p>&copy; {new Date().getFullYear()} Daily Secrets. All rights reserved.</p>
      </footer>
    </div>
  )
}
