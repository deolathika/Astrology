'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface UserFeaturesDashboardProps {
  user: any
}

export default function UserFeaturesDashboard({ user }: UserFeaturesDashboardProps) {
  const [dailyInsights, setDailyInsights] = useState<any[]>([])
  const [numerologyData, setNumerologyData] = useState<any>(null)
  const [zodiacData, setZodiacData] = useState<any>(null)
  const [usageStats, setUsageStats] = useState({
    dailyInsights: 0,
    numerologyChecks: 0,
    zodiacReadings: 0,
    compatibilityChecks: 0
  })

  // Fetch daily insights
  const { data: insightsData, isLoading: insightsLoading } = useQuery({
    queryKey: ['daily-insights', user.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/insights?userId=${user.id}`)
      if (!response.ok) throw new Error('Failed to fetch insights')
      return response.json()
    },
    enabled: !!user.id
  })

  // Fetch numerology data
  const { data: numerologyResponse, isLoading: numerologyLoading } = useQuery({
    queryKey: ['numerology', user.id],
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
    enabled: !!user.id
  })

  // Fetch zodiac data
  const { data: zodiacResponse, isLoading: zodiacLoading } = useQuery({
    queryKey: ['zodiac', user.id],
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
    enabled: !!user.id
  })

  useEffect(() => {
    if (insightsData) {
      setDailyInsights(insightsData.data || [])
    }
    if (numerologyResponse) {
      setNumerologyData(numerologyResponse.data)
    }
    if (zodiacResponse) {
      setZodiacData(zodiacResponse.data)
    }
  }, [insightsData, numerologyResponse, zodiacResponse])

  const handleFeatureClick = (feature: string) => {
    // Track usage
    setUsageStats(prev => ({
      ...prev,
      [feature]: prev[feature as keyof typeof prev] + 1
    }))
  }

  return (
    <div className="space-y-8">
      {/* Usage Statistics */}
      <div className="cosmic-card-minimalist-modern">
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

      {/* Daily Insights */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Today's Cosmic Insights</h3>
        {insightsLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailyInsights.slice(0, 3).map((insight, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">{insight.icon || '🌟'}</div>
                <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
                <p className="text-sm text-white/80">{insight.description}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-center">
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
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Your Numerology Profile</h3>
        {numerologyLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </div>
        ) : numerologyData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Life Path Number</h4>
              <div className="text-3xl font-bold text-blue-400 mb-2">{numerologyData.lifePath}</div>
              <p className="text-sm text-white/80">{numerologyData.lifePathMeaning}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Destiny Number</h4>
              <div className="text-3xl font-bold text-purple-400 mb-2">{numerologyData.destiny}</div>
              <p className="text-sm text-white/80">{numerologyData.destinyMeaning}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Soul Urge Number</h4>
              <div className="text-3xl font-bold text-green-400 mb-2">{numerologyData.soulUrge}</div>
              <p className="text-sm text-white/80">{numerologyData.soulUrgeMeaning}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Personality Number</h4>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{numerologyData.personality}</div>
              <p className="text-sm text-white/80">{numerologyData.personalityMeaning}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
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

      {/* Zodiac Information */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Your Zodiac Profile</h3>
        {zodiacLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </div>
        ) : zodiacData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Sun Sign</h4>
              <div className="text-2xl font-bold text-orange-400 mb-2">{zodiacData.natal?.tropical?.planets?.sun?.sign || 'Aries'}</div>
              <p className="text-sm text-white/80">Your core personality and identity</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Moon Sign</h4>
              <div className="text-2xl font-bold text-blue-400 mb-2">{zodiacData.natal?.tropical?.planets?.moon?.sign || 'Cancer'}</div>
              <p className="text-sm text-white/80">Your emotional nature and instincts</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Ascendant</h4>
              <div className="text-2xl font-bold text-purple-400 mb-2">{zodiacData.natal?.tropical?.asc || 'Leo'}</div>
              <p className="text-sm text-white/80">How others see you</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Element</h4>
              <div className="text-2xl font-bold text-green-400 mb-2">Fire</div>
              <p className="text-sm text-white/80">Your elemental nature</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
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

      {/* Basic Compatibility */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Compatibility Check</h3>
        <div className="text-center py-8">
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

      {/* Community Access */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Community Features</h3>
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
      <div className="cosmic-card-minimalist-modern">
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
    </div>
  )
}
