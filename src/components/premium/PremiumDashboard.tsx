'use client'

import React, { useState, useEffect } from 'react'
import { 
  Crown, 
  Star, 
  Moon, 
  Heart, 
  Calculator, 
  Users, 
  Calendar, 
  Target, 
  BookOpen, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp, 
  Award, 
  Clock, 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Download, 
  Lock, 
  Unlock, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  BarChart3, 
  Activity, 
  Compass, 
  Brain, 
  Lightbulb, 
  RefreshCw,
  Settings,
  Bell,
  Star as StarIcon
} from 'lucide-react'
import Link from 'next/link'

interface PremiumFeature {
  id: string
  title: string
  description: string
  icon: any
  gradient: string
  isUnlocked: boolean
  category: 'horoscope' | 'numerology' | 'dreams' | 'compatibility' | 'community' | 'analytics'
  usage: number
  maxUsage: number
}

const premiumFeatures: PremiumFeature[] = [
  {
    id: 'personalized_horoscope',
    title: 'Personalized Horoscope',
    description: 'AI-powered daily, weekly, and monthly horoscopes tailored to your birth chart',
    icon: Star,
    gradient: 'from-purple-500 to-blue-500',
    isUnlocked: true,
    category: 'horoscope',
    usage: 12,
    maxUsage: 30
  },
  {
    id: 'advanced_numerology',
    title: 'Advanced Numerology',
    description: 'Complete numerology analysis including life path, destiny, and soul urge numbers',
    icon: Calculator,
    gradient: 'from-blue-500 to-cyan-500',
    isUnlocked: true,
    category: 'numerology',
    usage: 8,
    maxUsage: 20
  },
  {
    id: 'ai_dream_analysis',
    title: 'AI Dream Analysis',
    description: 'Unlock the hidden meanings in your dreams with advanced AI interpretation',
    icon: Moon,
    gradient: 'from-indigo-500 to-purple-500',
    isUnlocked: true,
    category: 'dreams',
    usage: 15,
    maxUsage: 25
  },
  {
    id: 'love_compatibility',
    title: 'Love Compatibility',
    description: 'Find your perfect match through advanced astrological and numerological analysis',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    isUnlocked: true,
    category: 'compatibility',
    usage: 6,
    maxUsage: 15
  },
  {
    id: 'cosmic_community',
    title: 'Cosmic Community',
    description: 'Connect with fellow seekers and share your cosmic journey in our exclusive community',
    icon: Users,
    gradient: 'from-emerald-500 to-teal-500',
    isUnlocked: true,
    category: 'community',
    usage: 22,
    maxUsage: 50
  },
  {
    id: 'lucky_days_calendar',
    title: 'Lucky Days Calendar',
    description: 'Discover your most auspicious days for important decisions and life events',
    icon: Calendar,
    gradient: 'from-amber-500 to-orange-500',
    isUnlocked: true,
    category: 'horoscope',
    usage: 18,
    maxUsage: 30
  },
  {
    id: 'goal_alignment',
    title: 'Goal Alignment',
    description: 'Align your goals with cosmic energies for maximum success and fulfillment',
    icon: Target,
    gradient: 'from-red-500 to-pink-500',
    isUnlocked: true,
    category: 'analytics',
    usage: 9,
    maxUsage: 20
  },
  {
    id: 'cosmic_library',
    title: 'Cosmic Library',
    description: 'Access exclusive articles, guides, and cosmic wisdom from renowned astrologers',
    icon: BookOpen,
    gradient: 'from-green-500 to-emerald-500',
    isUnlocked: true,
    category: 'community',
    usage: 14,
    maxUsage: 25
  }
]

const premiumStats = [
  { icon: StarIcon, label: 'Premium Features', value: '8/8', color: 'text-green-400' },
  { icon: TrendingUp, label: 'Usage This Month', value: '104/185', color: 'text-blue-400' },
  { icon: Award, label: 'Achievement Level', value: 'Level 5', color: 'text-yellow-400' },
  { icon: Users, label: 'Community Rank', value: '#47', color: 'text-purple-400' }
]

const recentActivity = [
  { action: 'Daily Horoscope', time: '2 hours ago', icon: Star, color: 'text-purple-400' },
  { action: 'Dream Analysis', time: '1 day ago', icon: Moon, color: 'text-indigo-400' },
  { action: 'Compatibility Check', time: '2 days ago', icon: Heart, color: 'text-pink-400' },
  { action: 'Numerology Reading', time: '3 days ago', icon: Calculator, color: 'text-blue-400' },
  { action: 'Community Post', time: '4 days ago', icon: Users, color: 'text-emerald-400' }
]

export default function PremiumDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const categories = [
    { id: 'all', label: 'All Features', icon: Star },
    { id: 'horoscope', label: 'Horoscope', icon: Star },
    { id: 'numerology', label: 'Numerology', icon: Calculator },
    { id: 'dreams', label: 'Dreams', icon: Moon },
    { id: 'compatibility', label: 'Compatibility', icon: Heart },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ]

  const filteredFeatures = selectedCategory === 'all' 
    ? premiumFeatures 
    : premiumFeatures.filter(feature => feature.category === selectedCategory)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="glass-card-strong p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Crown className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Premium Dashboard</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-6">
          Welcome to your exclusive cosmic journey. You have full access to all premium features and insights.
        </p>
        
        {/* Premium Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {premiumStats.map((stat, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 ${stat.color} bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="text-white/70 text-sm">{stat.label}</span>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Premium Features</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => (
            <div key={feature.id} className="glass-card p-6 hover:glass-strong transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  {feature.isUnlocked ? (
                    <div className="flex items-center space-x-1 text-green-400">
                      <Unlock className="w-4 h-4" />
                      <span className="text-xs font-medium">Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-red-400">
                      <Lock className="w-4 h-4" />
                      <span className="text-xs font-medium">Locked</span>
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm mb-4">{feature.description}</p>
              
              {/* Usage Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-xs">Usage this month</span>
                  <span className="text-white/70 text-xs">{feature.usage}/{feature.maxUsage}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(feature.usage / feature.maxUsage) * 100}%` }}
                  />
                </div>
              </div>
              
              <button className="w-full glass-button bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
                <span>Access Feature</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="glass-button px-3 py-2 text-sm flex items-center space-x-2"
          >
            {isRefreshing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 glass-card hover:glass-strong transition-all duration-300">
              <div className={`w-10 h-10 ${activity.color} bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{activity.action}</div>
                <div className="text-white/60 text-sm">{activity.time}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Premium Benefits */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Premium Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Unlimited Access</h3>
            <p className="text-white/70 text-sm">No limits on readings, analyses, or community features</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Priority Support</h3>
            <p className="text-white/70 text-sm">24/7 premium support with faster response times</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Global Community</h3>
            <p className="text-white/70 text-sm">Connect with premium users worldwide</p>
          </div>
        </div>
      </div>
    </div>
  )
}
