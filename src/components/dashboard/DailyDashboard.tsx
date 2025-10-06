'use client'

import React, { useState, useEffect } from 'react'
import { 
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
  Target,
  Crown,
  RefreshCw,
  Bell,
  Settings,
  Search,
  Filter,
  Plus,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  Users,
  BookOpen,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import Link from 'next/link'
import DailyInsights from '@/components/features/DailyInsights'
import FeaturePrioritizer from '@/components/features/FeaturePrioritizer'

interface DailyDashboardProps {
  user?: any
  onTrackEvent?: (event: string, properties?: any) => void
  onTrackFeatureUsage?: (feature: string, action: string) => void
}

export default function DailyDashboard({ user, onTrackEvent, onTrackFeatureUsage }: DailyDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeSection, setActiveSection] = useState('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onTrackEvent?.('refresh_dashboard')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getTimeBasedInsight = () => {
    const hour = new Date().getHours()
    if (hour < 6) return "Early morning hours bring deep introspection and spiritual connection."
    if (hour < 12) return "Morning energy is perfect for new beginnings and setting intentions."
    if (hour < 18) return "Afternoon brings opportunities for growth and meaningful connections."
    if (hour < 22) return "Evening is ideal for reflection and planning tomorrow's journey."
    return "Night time offers deep cosmic wisdom and dream guidance."
  }

  const quickActions = [
    {
      title: 'Get Horoscope',
      icon: Star,
      href: '/zodiac',
      color: 'from-purple-500 to-blue-500',
      description: 'Your daily cosmic guidance'
    },
    {
      title: 'Check Moon',
      icon: Moon,
      href: '/zodiac',
      color: 'from-indigo-500 to-purple-500',
      description: 'Current lunar energy'
    },
    {
      title: 'Lucky Numbers',
      icon: Calculator,
      href: '/numerology',
      color: 'from-blue-500 to-cyan-500',
      description: 'Your personal numbers'
    },
    {
      title: 'Love Check',
      icon: Heart,
      href: '/compatibility',
      color: 'from-pink-500 to-rose-500',
      description: 'Relationship insights'
    }
  ]

  const sections = [
    { id: 'overview', title: 'Overview', icon: Sparkles },
    { id: 'insights', title: 'Daily Insights', icon: Star },
    { id: 'features', title: 'Features', icon: Target },
    { id: 'progress', title: 'Progress', icon: TrendingUp }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
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
          Your personalized cosmic dashboard for today
        </p>
        
        {/* Time & Location */}
        <div className="flex items-center justify-center space-x-6 text-white/60 text-sm mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>New York</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Premium User</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-card p-2">
        <div className="flex space-x-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
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
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div 
                    className="glass-card p-6 hover:glass-strong transition-all duration-300 cursor-pointer group text-center"
                    onClick={() => onTrackFeatureUsage?.(action.title.toLowerCase().replace(' ', '_'), 'quick_action')}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{action.description}</p>
                    <div className="flex items-center justify-center text-blue-400 text-sm group-hover:text-blue-300">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Today's Insight */}
          <div className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Today's Cosmic Insight</h3>
            </div>
            <p className="text-white/80 text-lg leading-relaxed">
              {getTimeBasedInsight()}
            </p>
          </div>

          {/* User Stats */}
          {user?.subscription === 'premium' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{user.activity?.totalReadings || 0}</div>
                  <div className="text-white/70 text-sm">Readings</div>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">Level {user.achievements?.level || 1}</div>
                  <div className="text-white/70 text-sm">Achievement</div>
                </div>
                <div className="text-center">
                  <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{user.achievements?.streak || 0}</div>
                  <div className="text-white/70 text-sm">Day Streak</div>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{user.achievements?.points || 0}</div>
                  <div className="text-white/70 text-sm">Points</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === 'insights' && (
        <DailyInsights user={user} onTrackEvent={onTrackEvent} />
      )}

      {activeSection === 'features' && (
        <FeaturePrioritizer user={user} onTrackEvent={onTrackEvent} />
      )}

      {activeSection === 'progress' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Horoscope Readings</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-white/20 rounded-full">
                    <div className="w-24 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-white text-sm">5/7</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Dream Analysis</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-white/20 rounded-full">
                    <div className="w-16 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-white text-sm">2/7</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Community Engagement</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-white/20 rounded-full">
                    <div className="w-28 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                  </div>
                  <span className="text-white text-sm">6/7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'First Reading', icon: Star, unlocked: true },
                { title: 'Week Streak', icon: Calendar, unlocked: true },
                { title: 'Community Member', icon: Users, unlocked: false },
                { title: 'Dream Master', icon: Moon, unlocked: false },
                { title: 'Number Expert', icon: Calculator, unlocked: false },
                { title: 'Love Guru', icon: Heart, unlocked: false }
              ].map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                    achievement.unlocked ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-white/10'
                  }`}>
                    <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-white/40'}`} />
                  </div>
                  <div className={`text-sm font-medium ${achievement.unlocked ? 'text-white' : 'text-white/40'}`}>
                    {achievement.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
