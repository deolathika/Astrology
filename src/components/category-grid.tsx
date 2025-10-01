'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, User, Calendar, Moon, Sun, Heart, Sparkles, Zap,
  MessageCircle, Bell, Settings, Globe, Shield, Lock, Unlock,
  ChevronRight, ChevronDown, Info, HelpCircle, AlertCircle
} from 'lucide-react'

interface CategoryGridProps {
  categories: {
    id: string
    name: string
    description: string
    icon: React.ComponentType<any>
    color: string
    bgColor: string
    items: Array<{
      name: string
      description: string
      icon: React.ComponentType<any>
      href: string
      status?: 'active' | 'coming-soon' | 'beta'
    }>
  }[]
  onItemClick?: (item: any) => void
}

export function CategoryGrid({ categories, onItemClick }: CategoryGridProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Active</span>
      case 'beta':
        return <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">Beta</span>
      case 'coming-soon':
        return <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">Coming Soon</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
        >
          {/* Category Header */}
          <button
            onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
            className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                  <p className="text-sm text-slate-600">{category.description}</p>
                </div>
              </div>
              {expandedCategory === category.id ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </button>

          {/* Category Items */}
          <AnimatePresence>
            {expandedCategory === category.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-slate-200"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredItem(`${category.id}-${index}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => onItemClick?.(item)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          hoveredItem === `${category.id}-${index}`
                            ? 'border-blue-200 bg-blue-50 shadow-md'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <item.icon className={`w-5 h-5 ${category.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-slate-900 truncate">{item.name}</h4>
                              {getStatusBadge(item.status)}
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

// Predefined categories based on Flutter features
export const cosmicCategories = [
  {
    id: 'cosmic-guidance',
    name: 'Cosmic Guidance',
    description: 'Daily insights and personalized cosmic wisdom',
    icon: Star,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    items: [
      {
        name: 'Today\'s Guidance',
        description: 'Personalized daily cosmic insights and advice',
        icon: Sun,
        href: '/today',
        status: 'active'
      },
      {
        name: 'Your Cosmic Profile',
        description: 'Complete astrological and numerological profile',
        icon: User,
        href: '/profile',
        status: 'active'
      },
      {
        name: 'Dream Journal',
        description: 'AI-powered dream interpretation and analysis',
        icon: Moon,
        href: '/dreams',
        status: 'active'
      },
      {
        name: 'Compatibility',
        description: 'Cosmic connections and relationship insights',
        icon: Heart,
        href: '/compatibility',
        status: 'active'
      }
    ]
  },
  {
    id: 'astrology-systems',
    name: 'Astrology Systems',
    description: 'Multiple zodiac systems and astrological calculations',
    icon: Sparkles,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    items: [
      {
        name: 'Western Zodiac',
        description: 'Traditional sun sign astrology',
        icon: Sun,
        href: '/zodiac/western',
        status: 'active'
      },
      {
        name: 'Vedic Astrology',
        description: 'Ancient Indian sidereal system',
        icon: Star,
        href: '/zodiac/vedic',
        status: 'active'
      },
      {
        name: 'Chinese Zodiac',
        description: 'Year-based animal zodiac system',
        icon: Calendar,
        href: '/zodiac/chinese',
        status: 'active'
      },
      {
        name: 'Sri Lankan Zodiac',
        description: 'Local traditional system',
        icon: Globe,
        href: '/zodiac/sri-lankan',
        status: 'active'
      }
    ]
  },
  {
    id: 'numerology',
    name: 'Numerology',
    description: 'Pythagorean and Chaldean numerology systems',
    icon: Zap,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    items: [
      {
        name: 'Life Path Number',
        description: 'Your life journey and purpose',
        icon: User,
        href: '/numerology/life-path',
        status: 'active'
      },
      {
        name: 'Expression Number',
        description: 'Your destiny and talents',
        icon: Star,
        href: '/numerology/expression',
        status: 'active'
      },
      {
        name: 'Soul Urge Number',
        description: 'Your heart\'s deepest desires',
        icon: Heart,
        href: '/numerology/soul-urge',
        status: 'active'
      },
      {
        name: 'Master Numbers',
        description: 'Special numbers 11, 22, 33',
        icon: Sparkles,
        href: '/numerology/master',
        status: 'active'
      }
    ]
  },
  {
    id: 'community',
    name: 'Community',
    description: 'Connect with fellow cosmic believers',
    icon: MessageCircle,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    items: [
      {
        name: 'Cosmic Chat',
        description: 'Safe emoji-only community chat',
        icon: MessageCircle,
        href: '/community/chat',
        status: 'active'
      },
      {
        name: 'Notifications',
        description: 'Stay updated with cosmic events',
        icon: Bell,
        href: '/notifications',
        status: 'active'
      },
      {
        name: 'Settings',
        description: 'Privacy and preference settings',
        icon: Settings,
        href: '/settings',
        status: 'active'
      }
    ]
  }
]


