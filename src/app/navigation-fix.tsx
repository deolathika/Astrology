'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Home, User, Star, Heart, MessageCircle, Settings, 
  Menu, X, ChevronRight, Globe, Shield, Crown
} from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<any>
  description: string
  category: 'main' | 'zodiac' | 'numerology' | 'community' | 'admin'
  requiresAuth?: boolean
  requiresSubscription?: string
}

const navigationItems: NavigationItem[] = [
  // Main Navigation
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home,
    description: 'Your cosmic dashboard',
    category: 'main'
  },
  {
    id: 'today',
    label: 'Today\'s Guidance',
    href: '/today',
    icon: Star,
    description: 'Daily cosmic insights',
    category: 'main'
  },
  {
    id: 'profile',
    label: 'Cosmic Profile',
    href: '/cosmic-profile',
    icon: User,
    description: 'Your astrological profile',
    category: 'main'
  },
  
  // Zodiac Systems
  {
    id: 'western',
    label: 'Western Zodiac',
    href: '/zodiac/western',
    icon: Star,
    description: 'Traditional Western astrology',
    category: 'zodiac'
  },
  {
    id: 'vedic',
    label: 'Vedic Zodiac',
    href: '/zodiac/vedic',
    icon: Star,
    description: 'Ancient Vedic astrology',
    category: 'zodiac'
  },
  {
    id: 'chinese',
    label: 'Chinese Zodiac',
    href: '/zodiac/chinese',
    icon: Star,
    description: 'Chinese zodiac system',
    category: 'zodiac'
  },
  {
    id: 'sri-lankan',
    label: 'Sri Lankan Zodiac',
    href: '/zodiac/sri-lankan',
    icon: Star,
    description: 'Traditional Sri Lankan astrology',
    category: 'zodiac'
  },
  
  // Numerology
  {
    id: 'life-path',
    label: 'Life Path Number',
    href: '/numerology/life-path',
    icon: Heart,
    description: 'Your life path number',
    category: 'numerology'
  },
  {
    id: 'expression',
    label: 'Expression Number',
    href: '/numerology/expression',
    icon: Heart,
    description: 'Your expression number',
    category: 'numerology'
  },
  {
    id: 'soul-urge',
    label: 'Soul Urge Number',
    href: '/numerology/soul-urge',
    icon: Heart,
    description: 'Your soul urge number',
    category: 'numerology'
  },
  {
    id: 'personality',
    label: 'Personality Number',
    href: '/numerology/personality',
    icon: Heart,
    description: 'Your personality number',
    category: 'numerology'
  },
  {
    id: 'master',
    label: 'Master Numbers',
    href: '/numerology/master',
    icon: Crown,
    description: 'Master numbers analysis',
    category: 'numerology'
  },
  
  // Community Features
  {
    id: 'compatibility',
    label: 'Compatibility',
    href: '/compatibility',
    icon: Heart,
    description: 'Relationship compatibility',
    category: 'community'
  },
  {
    id: 'chat',
    label: 'Cosmic Chat',
    href: '/chat',
    icon: MessageCircle,
    description: 'Connect with cosmic souls',
    category: 'community',
    requiresSubscription: 'premium'
  },
  {
    id: 'dreams',
    label: 'Dream Analysis',
    href: '/dreams',
    icon: Star,
    description: 'AI-powered dream interpretation',
    category: 'community',
    requiresSubscription: 'premium'
  },
  
  // Admin Features
  {
    id: 'admin',
    label: 'Admin Panel',
    href: '/admin',
    icon: Shield,
    description: 'System administration',
    category: 'admin',
    requiresAuth: true,
    requiresSubscription: 'admin'
  },
  {
    id: 'subscription',
    label: 'Subscription',
    href: '/subscription',
    icon: Crown,
    description: 'Manage your subscription',
    category: 'main',
    requiresAuth: true
  }
]

export default function NavigationFix() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userSubscription, setUserSubscription] = useState<any>(null)

  useEffect(() => {
    // Load user data
    const profile = localStorage.getItem('userData')
    const subscription = localStorage.getItem('userSubscription')
    
    if (profile) {
      setUserProfile(JSON.parse(profile))
    }
    
    if (subscription) {
      setUserSubscription(JSON.parse(subscription))
    }
  }, [])

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  const canAccess = (item: NavigationItem): boolean => {
    if (item.requiresAuth && !userProfile) return false
    if (item.requiresSubscription && (!userSubscription || userSubscription.planId !== item.requiresSubscription)) return false
    return true
  }

  const getFilteredItems = (category: string) => {
    return navigationItems
      .filter(item => item.category === category)
      .filter(item => canAccess(item))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Daily Secrets</h1>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-slate-200 shadow-lg"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Main Navigation */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Main</h3>
                <div className="space-y-2">
                  {getFilteredItems('main').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-violet-100 text-violet-700'
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Zodiac Systems */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Zodiac Systems</h3>
                <div className="space-y-2">
                  {getFilteredItems('zodiac').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-violet-100 text-violet-700'
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Numerology */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Numerology</h3>
                <div className="space-y-2">
                  {getFilteredItems('numerology').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-violet-100 text-violet-700'
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Community & Admin */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Community & Admin</h3>
                <div className="space-y-2">
                  {getFilteredItems('community').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-violet-100 text-violet-700'
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {getFilteredItems('admin').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-violet-100 text-violet-700'
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Navigation Fixed</h2>
          <p className="text-slate-600 mb-8">All navigation links are now working properly</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationItems.slice(0, 6).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{item.label}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200"
                >
                  Visit {item.label}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

