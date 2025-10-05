'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Star, 
  Moon, 
  Heart, 
  Calculator, 
  Users, 
  Bell, 
  TrendingUp,
  Calendar,
  Zap,
  Crown,
  Sparkles,
  BarChart3,
  Globe,
  Smartphone,
  ArrowRight,
  Settings,
  Plus,
  Eye,
  BookOpen,
  Target,
  Award
} from 'lucide-react'

interface UserDashboardProps {
  user: any
}

export function UserDashboard({ user }: UserDashboardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch user insights
  const { data: insightsData, isLoading: insightsLoading } = useQuery({
    queryKey: ['user-insights', user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/insights?userId=${user?.id}`)
      if (!response.ok) throw new Error('Failed to fetch insights')
      return response.json()
    },
    enabled: !!user?.id
  })

  // Fetch numerology data
  const { data: numerologyData, isLoading: numerologyLoading } = useQuery({
    queryKey: ['user-numerology', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/numerology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          fullName: user?.name || 'User',
          birthDate: user?.profile?.birthDate || '1990-01-01'
        })
      })
      if (!response.ok) throw new Error('Failed to fetch numerology')
      return response.json()
    },
    enabled: !!user?.id
  })

  // Fetch zodiac data
  const { data: zodiacData, isLoading: zodiacLoading } = useQuery({
    queryKey: ['user-zodiac', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/zodiac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          birthDate: user?.profile?.birthDate || '1990-01-01',
          birthTime: user?.profile?.birthTime || '12:00',
          latitude: user?.profile?.lat || 0,
          longitude: user?.profile?.lng || 0
        })
      })
      if (!response.ok) throw new Error('Failed to fetch zodiac')
      return response.json()
    },
    enabled: !!user?.id
  })

  const getThemeClasses = () => {
    switch (user?.role) {
      case 'premium':
        return {
          card: 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200',
          button: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
          text: 'text-amber-900',
          accent: 'text-amber-600'
        }
      case 'admin':
        return {
          card: 'bg-gradient-to-br from-slate-800 to-gray-800 border-2 border-pink-500',
          button: 'bg-gradient-to-r from-pink-500 to-red-500 text-white',
          text: 'text-slate-100',
          accent: 'text-pink-400'
        }
      default:
        return {
          card: 'bg-white border border-gray-200',
          button: 'bg-indigo-600 text-white',
          text: 'text-gray-900',
          accent: 'text-indigo-600'
        }
    }
  }

  const theme = getThemeClasses()

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className={`${theme.card} rounded-xl p-8 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>
              Welcome back, {user?.name || 'Cosmic Explorer'}! ✨
            </h1>
            <p className={`text-lg ${theme.text} opacity-80`}>
              Your cosmic journey continues with personalized insights and guidance.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text} opacity-70`}>Daily Insights</p>
              <p className={`text-2xl font-bold ${theme.text}`}>
                {insightsData?.data?.length || 0}
              </p>
            </div>
            <Star className={`w-8 h-8 ${theme.accent}`} />
          </div>
        </div>

        <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text} opacity-70`}>Life Path</p>
              <p className={`text-2xl font-bold ${theme.text}`}>
                {numerologyData?.data?.lifePath || '--'}
              </p>
            </div>
            <Calculator className={`w-8 h-8 ${theme.accent}`} />
          </div>
        </div>

        <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text} opacity-70`}>Zodiac Sign</p>
              <p className={`text-2xl font-bold ${theme.text}`}>
                {zodiacData?.data?.sign || '--'}
              </p>
            </div>
            <Moon className={`w-8 h-8 ${theme.accent}`} />
          </div>
        </div>

        <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text} opacity-70`}>Cosmic Score</p>
              <p className={`text-2xl font-bold ${theme.text}`}>85%</p>
            </div>
            <TrendingUp className={`w-8 h-8 ${theme.accent}`} />
          </div>
        </div>
      </div>

      {/* Today's Insights */}
      <div className={`${theme.card} rounded-xl p-8 shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${theme.text}`}>Today's Cosmic Insights</h2>
          <button className={`${theme.button} px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
            <Plus className="w-4 h-4 mr-2" />
            New Insight
          </button>
        </div>

        {insightsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insightsData?.data?.slice(0, 3).map((insight: any, index: number) => (
              <div key={index} className={`${theme.card} p-6 rounded-lg`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">{insight.icon || '🌟'}</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme.text}`}>{insight.title}</h3>
                    <p className={`text-sm ${theme.text} opacity-70`}>Cosmic Guidance</p>
                  </div>
                </div>
                <p className={`text-sm ${theme.text} opacity-80`}>{insight.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Numerology Card */}
        <div className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
          <div className="flex items-center space-x-3 mb-4">
            <Calculator className={`w-8 h-8 ${theme.accent}`} />
            <h3 className={`text-lg font-semibold ${theme.text}`}>Numerology</h3>
          </div>
          <p className={`text-sm ${theme.text} opacity-80 mb-4`}>
            Discover the hidden meanings in your numbers and unlock your life path.
          </p>
          <button className={`${theme.button} w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
            Explore Numbers
          </button>
        </div>

        {/* Zodiac Card */}
        <div className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
          <div className="flex items-center space-x-3 mb-4">
            <Moon className={`w-8 h-8 ${theme.accent}`} />
            <h3 className={`text-lg font-semibold ${theme.text}`}>Zodiac Insights</h3>
          </div>
          <p className={`text-sm ${theme.text} opacity-80 mb-4`}>
            Explore your astrological profile and cosmic influences.
          </p>
          <button className={`${theme.button} w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
            View Zodiac
          </button>
        </div>

        {/* Dreams Card */}
        <div className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
          <div className="flex items-center space-x-3 mb-4">
            <Heart className={`w-8 h-8 ${theme.accent}`} />
            <h3 className={`text-lg font-semibold ${theme.text}`}>Dream Analysis</h3>
          </div>
          <p className={`text-sm ${theme.text} opacity-80 mb-4`}>
            Record and analyze your dreams for deeper cosmic understanding.
          </p>
          <button className={`${theme.button} w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
            Analyze Dreams
          </button>
        </div>

        {/* Community Card */}
        <div className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
          <div className="flex items-center space-x-3 mb-4">
            <Users className={`w-8 h-8 ${theme.accent}`} />
            <h3 className={`text-lg font-semibold ${theme.text}`}>Community</h3>
          </div>
          <p className={`text-sm ${theme.text} opacity-80 mb-4`}>
            Connect with fellow cosmic explorers and share insights.
          </p>
          <button className={`${theme.button} w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
            Join Community
          </button>
        </div>

        {/* Compatibility Card */}
        <div className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
          <div className="flex items-center space-x-3 mb-4">
            <Heart className={`w-8 h-8 ${theme.accent}`} />
            <h3 className={`text-lg font-semibold ${theme.text}`}>Compatibility</h3>
          </div>
          <p className={`text-sm ${theme.text} opacity-80 mb-4`}>
            Discover cosmic compatibility with friends and partners.
          </p>
          <button className={`${theme.button} w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
            Check Compatibility
          </button>
        </div>

        {/* Settings Card */}
        <div className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
          <div className="flex items-center space-x-3 mb-4">
            <Bell className={`w-8 h-8 ${theme.accent}`} />
            <h3 className={`text-lg font-semibold ${theme.text}`}>Settings</h3>
          </div>
          <p className={`text-sm ${theme.text} opacity-80 mb-4`}>
            Customize your cosmic experience and preferences.
          </p>
          <button className={`${theme.button} w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
            Open Settings
          </button>
        </div>
      </div>

      {/* Premium Features (if applicable) */}
      {(user?.role === 'premium' || user?.role === 'admin') && (
        <div className={`${theme.card} rounded-xl p-8 shadow-lg`}>
          <div className="flex items-center space-x-3 mb-6">
            <Crown className={`w-8 h-8 ${theme.accent}`} />
            <h2 className={`text-2xl font-bold ${theme.text}`}>Premium Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`${theme.card} p-4 rounded-lg`}>
              <Sparkles className={`w-6 h-6 ${theme.accent} mb-2`} />
              <h3 className={`font-semibold ${theme.text}`}>Advanced Astrology</h3>
              <p className={`text-sm ${theme.text} opacity-70`}>Deep cosmic insights</p>
            </div>
            <div className={`${theme.card} p-4 rounded-lg`}>
              <Calendar className={`w-6 h-6 ${theme.accent} mb-2`} />
              <h3 className={`font-semibold ${theme.text}`}>Cosmic Calendar</h3>
              <p className={`text-sm ${theme.text} opacity-70`}>Astrological events</p>
            </div>
            <div className={`${theme.card} p-4 rounded-lg`}>
              <BarChart3 className={`w-6 h-6 ${theme.accent} mb-2`} />
              <h3 className={`font-semibold ${theme.text}`}>Analytics</h3>
              <p className={`text-sm ${theme.text} opacity-70`}>Personal insights</p>
            </div>
            <div className={`${theme.card} p-4 rounded-lg`}>
              <Globe className={`w-6 h-6 ${theme.accent} mb-2`} />
              <h3 className={`font-semibold ${theme.text}`}>Global Features</h3>
              <p className={`text-sm ${theme.text} opacity-70`}>Worldwide access</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Features (if applicable) */}
      {user?.role === 'admin' && (
        <div className={`${theme.card} rounded-xl p-8 shadow-lg`}>
          <div className="flex items-center space-x-3 mb-6">
            <Settings className={`w-8 h-8 ${theme.accent}`} />
            <h2 className={`text-2xl font-bold ${theme.text}`}>Admin Panel</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`${theme.card} p-4 rounded-lg`}>
              <Users className={`w-6 h-6 ${theme.accent} mb-2`} />
              <h3 className={`font-semibold ${theme.text}`}>User Management</h3>
              <p className={`text-sm ${theme.text} opacity-70`}>Manage all users</p>
            </div>
            <div className={`${theme.card} p-4 rounded-lg`}>
              <BarChart3 className={`w-6 h-6 ${theme.accent} mb-2`} />
              <h3 className={`font-semibold ${theme.text}`}>System Analytics</h3>
              <p className={`text-sm ${theme.text} opacity-70`}>Monitor performance</p>
            </div>
            <div className={`${theme.card} p-4 rounded-lg`}>
              <Target className={`w-6 h-6 ${theme.accent} mb-2`} />
              <h3 className={`font-semibold ${theme.text}`}>QA Testing</h3>
              <p className={`text-sm ${theme.text} opacity-70`}>Quality assurance</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
