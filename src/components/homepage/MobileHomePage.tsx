'use client'

import React, { useState, useEffect } from 'react'
import { 
  Sparkles, 
  Star, 
  Moon, 
  Heart, 
  Users, 
  Calculator,
  Crown,
  Clock,
  MapPin,
  Search,
  Filter,
  RefreshCw,
  ChevronRight,
  Lock,
  TrendingUp,
  Award,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { useResponsive } from '@/hooks/useDevice'
import ResponsiveGrid, { ResponsiveCard, ResponsiveButton, ResponsiveText } from '@/components/responsive/ResponsiveGrid'

interface MobileHomePageProps {
  user?: any
  onTrackEvent?: (event: string, properties?: any) => void
  onTrackFeatureUsage?: (feature: string, action: string) => void
}

export default function MobileHomePage({ user, onTrackEvent, onTrackFeatureUsage }: MobileHomePageProps) {
  const responsive = useResponsive()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const quickActions = [
    {
      icon: Star,
      title: 'Horoscope',
      description: 'Daily insights',
      href: '/zodiac',
      gradient: 'from-purple-500 to-blue-500',
      color: 'text-purple-400'
    },
    {
      icon: Moon,
      title: 'Dreams',
      description: 'AI analysis',
      href: '/dreams',
      gradient: 'from-indigo-500 to-purple-500',
      color: 'text-indigo-400'
    },
    {
      icon: Heart,
      title: 'Love',
      description: 'Compatibility',
      href: '/compatibility',
      gradient: 'from-pink-500 to-rose-500',
      color: 'text-pink-400'
    },
    {
      icon: Calculator,
      title: 'Numbers',
      description: 'Numerology',
      href: '/numerology',
      gradient: 'from-blue-500 to-cyan-500',
      color: 'text-blue-400'
    }
  ]

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', element: 'Fire', color: 'bg-orange-500' },
    { name: 'Taurus', symbol: '♉', element: 'Earth', color: 'bg-green-500' },
    { name: 'Gemini', symbol: '♊', element: 'Air', color: 'bg-blue-400' },
    { name: 'Cancer', symbol: '♋', element: 'Water', color: 'bg-blue-600' },
    { name: 'Leo', symbol: '♌', element: 'Fire', color: 'bg-orange-500' },
    { name: 'Virgo', symbol: '♍', element: 'Earth', color: 'bg-green-500' }
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onTrackEvent?.('refresh_data')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-6">
      {/* Mobile Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <ResponsiveText variant="h1" className="text-white mb-2">
          Daily Secrets
        </ResponsiveText>
        <ResponsiveText variant="body" className="text-white/80 mb-4">
          {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Discover your cosmic journey'}
        </ResponsiveText>
        
        {/* Status Bar */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex items-center space-x-2 text-white/60 text-sm">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center space-x-2 text-white/60 text-sm">
            <MapPin className="w-4 h-4" />
            <span>New York</span>
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="space-y-3">
        <Link href="/zodiac">
          <ResponsiveButton 
            variant="primary" 
            size="lg" 
            fullWidth
            onClick={() => onTrackFeatureUsage?.('horoscope', 'cta_click')}
          >
            <Star className="w-5 h-5 mr-2" />
            Get My Horoscope
          </ResponsiveButton>
        </Link>
        
        {user?.subscription === 'premium' ? (
          <ResponsiveButton 
            variant="outline" 
            size="lg" 
            fullWidth
            onClick={() => onTrackFeatureUsage?.('premium_dashboard', 'access')}
          >
            <Crown className="w-5 h-5 mr-2" />
            Premium Dashboard
          </ResponsiveButton>
        ) : (
          <Link href="/premium">
            <ResponsiveButton 
              variant="outline" 
              size="lg" 
              fullWidth
              onClick={() => onTrackFeatureUsage?.('premium', 'cta_click')}
            >
              <Crown className="w-5 h-5 mr-2" />
              Go Premium
            </ResponsiveButton>
          </Link>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <ResponsiveText variant="h3" className="text-white mb-4">
          Quick Actions
        </ResponsiveText>
        <ResponsiveGrid mobileCols={2} tabletCols={4} desktopCols={4} gap="sm">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <ResponsiveCard 
                className="text-center hover:glass-strong"
                onClick={() => onTrackFeatureUsage?.(action.title.toLowerCase(), 'quick_action')}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <ResponsiveText variant="h4" className="text-white mb-1">
                  {action.title}
                </ResponsiveText>
                <ResponsiveText variant="caption" className="text-white/70">
                  {action.description}
                </ResponsiveText>
              </ResponsiveCard>
            </Link>
          ))}
        </ResponsiveGrid>
      </div>

      {/* Zodiac Signs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <ResponsiveText variant="h3" className="text-white">
            Zodiac Signs
          </ResponsiveText>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="glass-button p-2 text-sm"
          >
            {isRefreshing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <RefreshCw className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className="glass-card p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search zodiac signs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input pl-10 pr-4 py-3"
            />
          </div>
        </div>

        <ResponsiveGrid mobileCols={2} tabletCols={3} desktopCols={6} gap="sm">
          {zodiacSigns.map((sign, index) => (
            <ResponsiveCard key={index} className="text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3 text-lg">
                {sign.symbol}
              </div>
              <ResponsiveText variant="small" className="text-white font-semibold mb-1">
                {sign.name}
              </ResponsiveText>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${sign.color} mb-2`}>
                {sign.element}
              </div>
              <ResponsiveButton 
                variant="secondary" 
                size="sm" 
                fullWidth
                onClick={() => onTrackFeatureUsage?.('zodiac_sign', 'view')}
              >
                <Lock className="w-3 h-3 mr-1" />
                Unlock
              </ResponsiveButton>
            </ResponsiveCard>
          ))}
        </ResponsiveGrid>
      </div>

      {/* User Stats (if premium) */}
      {user?.subscription === 'premium' && (
        <div>
          <ResponsiveText variant="h3" className="text-white mb-4">
            Your Stats
          </ResponsiveText>
          <ResponsiveGrid mobileCols={2} tabletCols={4} desktopCols={4} gap="sm">
            <ResponsiveCard className="text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <ResponsiveText variant="h4" className="text-white">
                {user.activity?.totalReadings || 0}
              </ResponsiveText>
              <ResponsiveText variant="caption" className="text-white/70">
                Readings
              </ResponsiveText>
            </ResponsiveCard>
            
            <ResponsiveCard className="text-center">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <ResponsiveText variant="h4" className="text-white">
                Level {user.achievements?.level || 1}
              </ResponsiveText>
              <ResponsiveText variant="caption" className="text-white/70">
                Achievement
              </ResponsiveText>
            </ResponsiveCard>
            
            <ResponsiveCard className="text-center">
              <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <ResponsiveText variant="h4" className="text-white">
                {user.achievements?.streak || 0}
              </ResponsiveText>
              <ResponsiveText variant="caption" className="text-white/70">
                Day Streak
              </ResponsiveText>
            </ResponsiveCard>
            
            <ResponsiveCard className="text-center">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <ResponsiveText variant="h4" className="text-white">
                {user.achievements?.points || 0}
              </ResponsiveText>
              <ResponsiveText variant="caption" className="text-white/70">
                Points
              </ResponsiveText>
            </ResponsiveCard>
          </ResponsiveGrid>
        </div>
      )}

      {/* Daily Quote */}
      <ResponsiveCard className="text-center">
        <blockquote className="text-white/90 mb-3">
          "The cosmos is within us. We are made of star-stuff."
        </blockquote>
        <div className="flex justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
        </div>
      </ResponsiveCard>
    </div>
  )
}
