'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import { useQuery } from '@tanstack/react-query'

export default function UserInsightsPage() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [usageStats, setUsageStats] = useState({
    dailyInsights: 0,
    numerologyChecks: 0,
    zodiacReadings: 0,
    compatibilityChecks: 0
  })
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      // Allow all authenticated users to access insights
      setUser(userData)
      
      // Load usage stats from localStorage
      const storedUsage = localStorage.getItem('userUsage')
      if (storedUsage) {
        setUsageStats(JSON.parse(storedUsage))
      }
    } else {
      router.push('/')
    }
  }, [router])

  // Fetch daily insights
  const { data: insightsData, isLoading: insightsLoading, error: insightsError, refetch: refetchInsights } = useQuery({
    queryKey: ['daily-insights', user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/insights?userId=${user.id}`)
      if (!response.ok) throw new Error('Failed to fetch insights')
      return response.json()
    },
    enabled: !!user?.id
  })

  // Fetch numerology data
  const { data: numerologyData, isLoading: numerologyLoading, refetch: refetchNumerology } = useQuery({
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
    enabled: false // Only fetch when requested
  })

  // Fetch zodiac data
  const { data: zodiacData, isLoading: zodiacLoading, refetch: refetchZodiac } = useQuery({
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
    enabled: false // Only fetch when requested
  })

  const handleFeatureClick = (feature: string) => {
    // Update usage stats
    const newUsage = {
      ...usageStats,
      [feature]: usageStats[feature as keyof typeof usageStats] + 1
    }
    setUsageStats(newUsage)
    localStorage.setItem('userUsage', JSON.stringify(newUsage))
    
    // Trigger appropriate API call
    if (feature === 'numerologyChecks' && numerologyData === undefined) {
      refetchNumerology()
    } else if (feature === 'zodiacReadings' && zodiacData === undefined) {
      refetchZodiac()
    }
  }

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
              Your Cosmic Dashboard
            </h1>
            <p className="cosmic-hero-subtitle-minimalist-modern">
              Discover the mysteries of the universe with your personalized cosmic insights
            </p>
          </div>

          {/* Usage Statistics */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <h3 className="card-title mb-4">Your Usage Today</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{usageStats.dailyInsights}/3</div>
                <div className="text-sm text-white/60">Daily Insights</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{usageStats.numerologyChecks}/1</div>
                <div className="text-sm text-white/60">Numerology</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{usageStats.zodiacReadings}/1</div>
                <div className="text-sm text-white/60">Zodiac Reading</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{usageStats.compatibilityChecks}/1</div>
                <div className="text-sm text-white/60">Compatibility</div>
              </div>
            </div>
          </div>

          {/* Daily Insights Section */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <h2 className="card-title mb-6">Today's Cosmic Guidance</h2>
            
            {insightsLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                <p className="text-white/60 mt-4">Loading your cosmic insights...</p>
              </div>
            ) : insightsError ? (
              <div className="text-center py-8">
                <div className="text-red-400 mb-4">⚠️</div>
                <p className="text-red-400 mb-4">Failed to load insights</p>
                <button 
                  onClick={() => refetchInsights()}
                  className="cosmic-btn-minimalist-modern"
                >
                  Try Again
                </button>
              </div>
            ) : insightsData?.data ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insightsData.data.map((insight: any, index: number) => (
                  <div key={insight.id || index} className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-4xl mb-4">{insight.icon || '🌟'}</div>
                    <h3 className="font-semibold text-white mb-3 text-lg">{insight.title}</h3>
                    <p className="text-sm text-white/80 leading-relaxed">{insight.description}</p>
                    <div className="mt-4 text-xs text-white/60">
                      {new Date(insight.timestamp || Date.now()).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔮</div>
                <p className="text-white/80 mb-4">No insights available today</p>
                <button 
                  onClick={() => refetchInsights()}
                  className="cosmic-btn-minimalist-modern"
                >
                  Refresh Insights
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <button 
                onClick={() => handleFeatureClick('dailyInsights')}
                disabled={usageStats.dailyInsights >= 3}
                className="cosmic-btn-minimalist-modern disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {usageStats.dailyInsights >= 3 ? 'Daily Limit Reached' : 'Get More Insights'}
              </button>
            </div>
          </div>

          {/* Numerology Section */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <h2 className="card-title mb-6">Your Numerology Profile</h2>
            
            {numerologyLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                <p className="text-white/60 mt-4">Calculating your numbers...</p>
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
                <p className="text-white/80 mb-4">Calculate your numerology profile</p>
                <button 
                  onClick={() => handleFeatureClick('numerologyChecks')}
                  disabled={usageStats.numerologyChecks >= 1}
                  className="cosmic-btn-minimalist-modern disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {usageStats.numerologyChecks >= 1 ? 'Daily Limit Reached' : 'Calculate My Numbers'}
                </button>
              </div>
            )}
          </div>

          {/* Zodiac Information Section */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <h2 className="card-title mb-6">Your Zodiac Profile</h2>
            
            {zodiacLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                <p className="text-white/60 mt-4">Calculating your zodiac profile...</p>
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
                <p className="text-white/80 mb-4">Get your zodiac reading</p>
                <button 
                  onClick={() => handleFeatureClick('zodiacReadings')}
                  disabled={usageStats.zodiacReadings >= 1}
                  className="cosmic-btn-minimalist-modern disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {usageStats.zodiacReadings >= 1 ? 'Daily Limit Reached' : 'Get My Zodiac Reading'}
                </button>
              </div>
            )}
          </div>

          {/* Basic Compatibility Section */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <h2 className="card-title mb-6">Compatibility Check</h2>
            <div className="text-center py-8">
              <div className="text-4xl mb-4">💕</div>
              <p className="text-white/80 mb-4">Check your compatibility with friends, family, or partners</p>
              <button 
                onClick={() => handleFeatureClick('compatibilityChecks')}
                disabled={usageStats.compatibilityChecks >= 1}
                className="cosmic-btn-minimalist-modern disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {usageStats.compatibilityChecks >= 1 ? 'Daily Limit Reached' : 'Check Compatibility'}
              </button>
            </div>
          </div>

          {/* Community Access Section */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <h2 className="card-title mb-6">Community Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">💬</div>
                <h4 className="font-semibold text-white mb-2">Community Chat</h4>
                <p className="text-sm text-white/80 mb-4">Connect with other cosmic enthusiasts</p>
                <Link href="/community" className="cosmic-btn-minimalist-modern">
                  Join Chat
                </Link>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="font-semibold text-white mb-2">Knowledge Base</h4>
                <p className="text-sm text-white/80 mb-4">Learn about astrology and numerology</p>
                <Link href="/knowledge" className="cosmic-btn-minimalist-modern">
                  Explore
                </Link>
              </div>
            </div>
          </div>

          {/* Upgrade Prompt */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">✨ Unlock Premium Features</h3>
              <p className="text-white/80 mb-6">
                Get unlimited access to all cosmic features and advanced insights
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Premium Features</h4>
                  <div className="space-y-2 text-sm text-white/80">
                    <div>• Unlimited daily insights</div>
                    <div>• Advanced astrology charts</div>
                    <div>• AI-powered dream analysis</div>
                    <div>• Expert consultations</div>
                    <div>• Detailed compatibility reports</div>
                    <div>• Personalized cosmic calendar</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Benefits</h4>
                  <div className="space-y-2 text-sm text-white/80">
                    <div>• No daily limits</div>
                    <div>• Priority support</div>
                    <div>• Exclusive content</div>
                    <div>• Advanced calculations</div>
                    <div>• Data export</div>
                    <div>• Expert guidance</div>
                  </div>
                </div>
              </div>
              <button className="cosmic-btn-minimalist-modern">
                Upgrade to Premium - $9.99/month
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Link href="/user" className="cosmic-btn-minimalist-modern">
              ← Back to Dashboard
            </Link>
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
