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
  Calendar,
  Sun,
  Zap,
  Target,
  BookOpen,
  Users,
  Crown,
  ChevronRight,
  RefreshCw,
  Bell,
  Settings,
  Search,
  Filter,
  Plus,
  CheckCircle,
  ArrowRight,
  Lock,
  Unlock
} from 'lucide-react'
import Link from 'next/link'
import { useResponsive } from '@/hooks/useDevice'

interface OptimizedHomePageProps {
  user?: any
  onTrackEvent?: (event: string, properties?: any) => void
  onTrackFeatureUsage?: (feature: string, action: string) => void
}

export default function OptimizedHomePage({ user, onTrackEvent, onTrackFeatureUsage }: OptimizedHomePageProps) {
  const responsive = useResponsive()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('today')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Most useful daily features
  const dailyFeatures = [
    {
      id: 'horoscope',
      title: 'Today\'s Horoscope',
      description: 'Personalized daily insights',
      icon: Star,
      color: 'from-purple-500 to-blue-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-300',
      href: '/zodiac',
      priority: 1,
      isPremium: false
    },
    {
      id: 'moon_phase',
      title: 'Moon Phase',
      description: 'Current lunar energy',
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10',
      textColor: 'text-indigo-300',
      href: '/zodiac',
      priority: 2,
      isPremium: false
    },
    {
      id: 'numerology',
      title: 'Daily Number',
      description: 'Your lucky number today',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-300',
      href: '/numerology',
      priority: 3,
      isPremium: false
    },
    {
      id: 'compatibility',
      title: 'Love Check',
      description: 'Relationship insights',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-300',
      href: '/compatibility',
      priority: 4,
      isPremium: true
    }
  ]

  const todayInsights = [
    {
      title: 'Energy Level',
      value: '85%',
      trend: 'up',
      color: 'text-green-400',
      icon: Zap
    },
    {
      title: 'Lucky Color',
      value: 'Purple',
      trend: 'stable',
      color: 'text-purple-400',
      icon: Star
    },
    {
      title: 'Best Time',
      value: '2-4 PM',
      trend: 'up',
      color: 'text-blue-400',
      icon: Clock
    },
    {
      title: 'Mood',
      value: 'Optimistic',
      trend: 'up',
      color: 'text-yellow-400',
      icon: Sun
    }
  ]

  const quickActions = [
    {
      title: 'Dream Analysis',
      icon: Moon,
      href: '/dreams',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Community',
      icon: Users,
      href: '/community',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Premium',
      icon: Crown,
      href: '/premium',
      color: 'from-amber-500 to-orange-500'
    }
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onTrackEvent?.('refresh_insights')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {getGreeting()}, {user?.name?.split(' ')[0] || 'Cosmic Seeker'}!
        </h1>
        <p className="text-white/80 text-lg mb-4">
          Your personalized cosmic insights for today
        </p>
        
        {/* Time & Location */}
        <div className="flex items-center justify-center space-x-4 text-white/60 text-sm mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>New York</span>
          </div>
        </div>
      </div>

      {/* Today's Insights */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Today's Insights</h2>
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {todayInsights.map((insight, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${insight.color} bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <insight.icon className="w-6 h-6" />
              </div>
              <div className="text-white/70 text-sm mb-1">{insight.title}</div>
              <div className={`text-lg font-semibold ${insight.color}`}>{insight.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Features */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Daily Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyFeatures.map((feature) => (
            <Link key={feature.id} href={feature.href}>
              <div 
                className="glass-card p-6 hover:glass-strong transition-all duration-300 cursor-pointer group"
                onClick={() => onTrackFeatureUsage?.(feature.id, 'click')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    {feature.isPremium ? (
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Lock className="w-4 h-4" />
                        <span className="text-xs font-medium">Premium</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-green-400">
                        <Unlock className="w-4 h-4" />
                        <span className="text-xs font-medium">Free</span>
                      </div>
                    )}
                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm mb-4">{feature.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${feature.bgColor} ${feature.textColor}`}>
                    Priority {feature.priority}
                  </div>
                  <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div 
                className="glass-card p-4 text-center hover:glass-strong transition-all duration-300 cursor-pointer group"
                onClick={() => onTrackFeatureUsage?.(action.title.toLowerCase().replace(' ', '_'), 'quick_action')}
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-white font-medium text-sm">{action.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* User Stats (if premium) */}
      {user?.subscription === 'premium' && (
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{user.activity?.totalReadings || 0}</div>
              <div className="text-white/70 text-sm">Readings</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Level {user.achievements?.level || 1}</div>
              <div className="text-white/70 text-sm">Achievement</div>
            </div>
            <div className="text-center">
              <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{user.achievements?.streak || 0}</div>
              <div className="text-white/70 text-sm">Day Streak</div>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{user.achievements?.points || 0}</div>
              <div className="text-white/70 text-sm">Points</div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Quote */}
      <div className="glass-card p-6 text-center">
        <blockquote className="text-lg font-medium text-white mb-3">
          "The cosmos is within us. We are made of star-stuff."
        </blockquote>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="glass-card p-6 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Ready for More?</h2>
        <p className="text-white/70 text-sm mb-4">
          Unlock premium features for deeper cosmic insights
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/premium">
            <button 
              className="glass-button bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
              onClick={() => onTrackFeatureUsage?.('premium', 'cta_click')}
            >
              <Crown className="w-5 h-5" />
              <span>Go Premium</span>
            </button>
          </Link>
          <Link href="/zodiac">
            <button 
              className="glass-button border-2 border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
              onClick={() => onTrackFeatureUsage?.('horoscope', 'cta_click')}
            >
              <Star className="w-5 h-5" />
              <span>Get Horoscope</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
