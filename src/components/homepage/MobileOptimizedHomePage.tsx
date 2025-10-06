'use client'

import React, { useState, useEffect } from 'react'
import { 
  Sparkles, 
  Star, 
  Moon, 
  Heart, 
  Calculator,
  Clock,
  MapPin,
  TrendingUp,
  Award,
  Activity,
  Zap,
  Sun,
  Crown,
  ChevronRight,
  RefreshCw,
  Lock,
  Unlock,
  ArrowRight,
  Plus,
  Bell,
  Search
} from 'lucide-react'
import Link from 'next/link'

interface MobileOptimizedHomePageProps {
  user?: any
  onTrackEvent?: (event: string, properties?: any) => void
  onTrackFeatureUsage?: (feature: string, action: string) => void
}

export default function MobileOptimizedHomePage({ user, onTrackEvent, onTrackFeatureUsage }: MobileOptimizedHomePageProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Most essential daily features for mobile
  const essentialFeatures = [
    {
      id: 'horoscope',
      title: 'Horoscope',
      icon: Star,
      color: 'from-purple-500 to-blue-500',
      href: '/zodiac',
      isPremium: false
    },
    {
      id: 'moon',
      title: 'Moon',
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      href: '/zodiac',
      isPremium: false
    },
    {
      id: 'numbers',
      title: 'Numbers',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      href: '/numerology',
      isPremium: false
    },
    {
      id: 'love',
      title: 'Love',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      href: '/compatibility',
      isPremium: true
    }
  ]

  const todayStats = [
    { label: 'Energy', value: '85%', color: 'text-green-400' },
    { label: 'Lucky', value: 'Purple', color: 'text-purple-400' },
    { label: 'Time', value: '2-4 PM', color: 'text-blue-400' },
    { label: 'Mood', value: 'Great', color: 'text-yellow-400' }
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onTrackEvent?.('refresh_insights')
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Morning'
    if (hour < 18) return 'Afternoon'
    return 'Evening'
  }

  return (
    <div className="space-y-4">
      {/* Mobile Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">
          {getGreeting()}, {user?.name?.split(' ')[0] || 'Seeker'}!
        </h1>
        <p className="text-white/80 text-sm mb-3">
          Your cosmic insights for today
        </p>
        
        {/* Time & Location - Compact */}
        <div className="flex items-center justify-center space-x-3 text-white/60 text-xs mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>NYC</span>
          </div>
        </div>
      </div>

      {/* Today's Stats - Compact Grid */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Today's Stats</h2>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="glass-button p-1.5 text-xs"
          >
            {isRefreshing ? (
              <RefreshCw className="w-3 h-3 animate-spin text-white" />
            ) : (
              <RefreshCw className="w-3 h-3 text-white" />
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {todayStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-lg font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-white/70 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Essential Features - 2x2 Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Daily Features</h2>
        <div className="grid grid-cols-2 gap-3">
          {essentialFeatures.map((feature) => (
            <Link key={feature.id} href={feature.href}>
              <div 
                className="glass-card p-4 hover:glass-strong transition-all duration-300 cursor-pointer group"
                onClick={() => onTrackFeatureUsage?.(feature.id, 'click')}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  {feature.isPremium ? (
                    <Lock className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Unlock className="w-4 h-4 text-green-400" />
                  )}
                </div>
                
                <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-white/70 text-xs mb-2">
                  {feature.isPremium ? 'Premium feature' : 'Free to use'}
                </p>
                
                <div className="flex items-center text-blue-400 text-xs group-hover:text-blue-300">
                  <span>Open</span>
                  <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions - Horizontal Scroll */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Quick Actions</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {[
            { title: 'Dreams', icon: Moon, href: '/dreams', color: 'from-indigo-500 to-purple-500' },
            { title: 'Community', icon: Users, href: '/community', color: 'from-emerald-500 to-teal-500' },
            { title: 'Premium', icon: Crown, href: '/premium', color: 'from-amber-500 to-orange-500' }
          ].map((action, index) => (
            <Link key={index} href={action.href}>
              <div 
                className="glass-card p-4 text-center hover:glass-strong transition-all duration-300 cursor-pointer group min-w-[100px]"
                onClick={() => onTrackFeatureUsage?.(action.title.toLowerCase(), 'quick_action')}
              >
                <div className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-white font-medium text-xs">{action.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* User Progress (if premium) */}
      {user?.subscription === 'premium' && (
        <div className="glass-card p-4">
          <h2 className="text-lg font-semibold text-white mb-3">Your Progress</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-white">{user.activity?.totalReadings || 0}</div>
              <div className="text-white/70 text-xs">Readings</div>
            </div>
            <div className="text-center">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-white">Level {user.achievements?.level || 1}</div>
              <div className="text-white/70 text-xs">Achievement</div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Quote - Compact */}
      <div className="glass-card p-4 text-center">
        <blockquote className="text-white/90 text-sm mb-2">
          "The cosmos is within us. We are made of star-stuff."
        </blockquote>
        <div className="flex justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
        </div>
      </div>

      {/* CTA Buttons - Full Width */}
      <div className="space-y-3">
        <Link href="/zodiac">
          <button 
            className="w-full glass-button bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
            onClick={() => onTrackFeatureUsage?.('horoscope', 'cta_click')}
          >
            <Star className="w-5 h-5" />
            <span>Get My Horoscope</span>
          </button>
        </Link>
        
        <Link href="/premium">
          <button 
            className="w-full glass-button border-2 border-white/20 hover:border-white/40 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
            onClick={() => onTrackFeatureUsage?.('premium', 'cta_click')}
          >
            <Crown className="w-5 h-5" />
            <span>Upgrade to Premium</span>
          </button>
        </Link>
      </div>
    </div>
  )
}
