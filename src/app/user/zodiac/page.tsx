'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import { useQuery } from '@tanstack/react-query'

export default function UserZodiacPage() {
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

  // Fetch zodiac data
  const { data: zodiacData, isLoading: zodiacLoading, error: zodiacError } = useQuery({
    queryKey: ['zodiac', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/zodiac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          birthDate: user.profile?.birthDate || '1990-01-01',
          birthTime: user.profile?.birthTime || '12:00',
          latitude: user.profile?.lat || 0,
          longitude: user.profile?.lng || 0
        })
      })
      if (!response.ok) throw new Error('Failed to fetch zodiac')
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
      <StarfieldBackground />

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
              Your Zodiac Profile
            </h1>
            <p className="cosmic-hero-subtitle-minimalist-modern">
              Discover your astrological identity and cosmic influences
            </p>
          </div>

          {/* Zodiac Content */}
          <div className="cosmic-card-minimalist-modern p-6">
            <h2 className="card-title mb-6">Your Astrological Analysis</h2>
            
            {zodiacLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                <p className="text-white/60 mt-4">Calculating your zodiac profile...</p>
              </div>
            ) : zodiacError ? (
              <div className="text-center py-8">
                <div className="text-red-400 mb-4">⚠️</div>
                <p className="text-red-400 mb-4">Failed to calculate zodiac</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="cosmic-btn-minimalist-modern"
                >
                  Try Again
                </button>
              </div>
            ) : zodiacData?.data ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">☀️</div>
                  <h3 className="font-semibold text-white mb-3 text-lg">Sun Sign</h3>
                  <div className="text-2xl font-bold text-orange-400 mb-2">
                    {zodiacData.data.natal?.tropical?.planets?.sun?.sign || 'Aries'}
                  </div>
                  <p className="text-sm text-white/80">Your core personality and identity</p>
                </div>
                
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">🌙</div>
                  <h3 className="font-semibold text-white mb-3 text-lg">Moon Sign</h3>
                  <div className="text-2xl font-bold text-blue-400 mb-2">
                    {zodiacData.data.natal?.tropical?.planets?.moon?.sign || 'Cancer'}
                  </div>
                  <p className="text-sm text-white/80">Your emotional nature and instincts</p>
                </div>
                
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">⬆️</div>
                  <h3 className="font-semibold text-white mb-3 text-lg">Ascendant</h3>
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    {zodiacData.data.natal?.tropical?.asc || 'Leo'}
                  </div>
                  <p className="text-sm text-white/80">How others see you</p>
                </div>
                
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">🔥</div>
                  <h3 className="font-semibold text-white mb-3 text-lg">Element</h3>
                  <div className="text-2xl font-bold text-green-400 mb-2">Fire</div>
                  <p className="text-sm text-white/80">Your elemental nature</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔮</div>
                <p className="text-white/80 mb-4">No zodiac data available</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="cosmic-btn-minimalist-modern"
                >
                  Get Zodiac Reading
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

