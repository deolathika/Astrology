'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, Heart, Moon, Sun, Calculator, Sparkles, 
  Calendar, MapPin, MessageCircle, Share2, Download,
  Zap, Shield, Crown, Globe, Target, BookOpen
} from 'lucide-react'

interface QuickActionsProps {
  user?: {
    role?: string
  } | null
  onAction?: (action: string) => void
}

export function QuickActions({ user, onAction }: QuickActionsProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const actions = [
    {
      id: 'daily_guidance',
      title: 'Daily Guidance',
      description: 'Get today\'s cosmic insights',
      icon: Sun,
      color: 'yellow',
      path: '/today'
    },
    {
      id: 'cosmic_profile',
      title: 'Cosmic Profile',
      description: 'View your astrological profile',
      icon: Star,
      color: 'purple',
      path: '/cosmic-profile'
    },
    {
      id: 'numerology',
      title: 'Numerology',
      description: 'Calculate your life path numbers',
      icon: Calculator,
      color: 'blue',
      path: '/numerology'
    },
    {
      id: 'compatibility',
      title: 'Compatibility',
      description: 'Check relationship compatibility',
      icon: Heart,
      color: 'pink',
      path: '/compatibility'
    },
    {
      id: 'dream_analysis',
      title: 'Dream Analysis',
      description: 'Analyze your dreams with AI',
      icon: Moon,
      color: 'indigo',
      path: '/dreams'
    },
    {
      id: 'zodiac_systems',
      title: 'Zodiac Systems',
      description: 'Explore different zodiac traditions',
      icon: Globe,
      color: 'green',
      path: '/zodiac-systems'
    }
  ]

  const premiumActions = [
    {
      id: 'advanced_astrology',
      title: 'Advanced Astrology',
      description: 'Detailed birth chart analysis',
      icon: Sparkles,
      color: 'purple',
      path: '/advanced-astrology',
      premium: true
    },
    {
      id: 'cosmic_events',
      title: 'Cosmic Events',
      description: 'Upcoming planetary events',
      icon: Calendar,
      color: 'blue',
      path: '/cosmic-events',
      premium: true
    },
    {
      id: 'personalized_insights',
      title: 'Personalized Insights',
      description: 'AI-powered cosmic guidance',
      icon: Target,
      color: 'green',
      path: '/personalized-insights',
      premium: true
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200',
      green: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
    }
    return colors[color as keyof typeof colors] || colors.purple
  }

  const handleActionClick = (action: any) => {
    setSelectedAction(action.id)
    onAction?.(action.id)
    
    // Simulate navigation delay
    setTimeout(() => {
      setSelectedAction(null)
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-sm text-gray-600">Access your cosmic tools instantly</p>
        </div>
      </div>

      {/* Free Actions */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Core Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={() => handleActionClick(action)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border-2 transition-all ${getColorClasses(action.color)} ${
                selectedAction === action.id ? 'ring-2 ring-purple-300' : ''
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <action.icon className="w-5 h-5" />
                <h5 className="font-medium">{action.title}</h5>
              </div>
              <p className="text-sm text-gray-600 text-left">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Premium Actions */}
      {user?.role === 'premium' || user?.role === 'admin' ? (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span>Premium Features</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumActions.map((action, index) => (
              <motion.button
                key={action.id}
                onClick={() => handleActionClick(action)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition-all ${getColorClasses(action.color)} ${
                  selectedAction === action.id ? 'ring-2 ring-purple-300' : ''
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <action.icon className="w-5 h-5" />
                  <h5 className="font-medium">{action.title}</h5>
                  <Crown className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-600 text-left">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 text-center">
          <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h4 className="font-medium text-gray-900 mb-2">Unlock Premium Features</h4>
          <p className="text-sm text-gray-600 mb-3">Get access to advanced astrology, cosmic events, and personalized insights</p>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors">
            Upgrade to Premium
          </button>
        </div>
      )}
    </motion.div>
  )
}