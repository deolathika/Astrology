'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, User, Calendar, Star, Heart, Sparkles, Moon, Sun,
  ChevronDown, ChevronUp, Settings, Bell, Search, Menu, X,
  Zap, Shield, Globe, Smartphone, Tablet, Monitor, Wifi,
  MessageCircle, Phone, Mail, MapPin, CreditCard, BarChart3,
  PieChart, TrendingUp, Activity, Lock, Unlock, Key, Database,
  Server, Cloud, CheckCircle, AlertCircle, Info, HelpCircle
} from 'lucide-react'

interface MobileLayoutProps {
  children: React.ReactNode
  currentPage?: string
  user?: any
}

export function MobileLayout({ children, currentPage = 'home', user }: MobileLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('cosmic')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const categories = {
    cosmic: {
      name: 'Cosmic Guidance',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: [
        { name: 'Today\'s Guidance', icon: Sun, href: '/today', description: 'Daily cosmic insights' },
        { name: 'Your Profile', icon: User, href: '/profile', description: 'Complete cosmic profile' },
        { name: 'Dream Journal', icon: Moon, href: '/dreams', description: 'AI dream interpretation' },
        { name: 'Compatibility', icon: Heart, href: '/compatibility', description: 'Cosmic connections' }
      ]
    },
    astrology: {
      name: 'Astrology',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        { name: 'Western Zodiac', icon: Sun, href: '/zodiac/western', description: 'Sun sign astrology' },
        { name: 'Vedic Astrology', icon: Star, href: '/zodiac/vedic', description: 'Ancient Indian system' },
        { name: 'Chinese Zodiac', icon: Calendar, href: '/zodiac/chinese', description: 'Year-based system' },
        { name: 'Sri Lankan Zodiac', icon: Globe, href: '/zodiac/sri-lankan', description: 'Local traditions' }
      ]
    },
    numerology: {
      name: 'Numerology',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        { name: 'Life Path Number', icon: User, href: '/numerology/life-path', description: 'Your life journey' },
        { name: 'Expression Number', icon: Star, href: '/numerology/expression', description: 'Your destiny' },
        { name: 'Soul Urge', icon: Heart, href: '/numerology/soul-urge', description: 'Heart\'s desire' },
        { name: 'Master Numbers', icon: Sparkles, href: '/numerology/master', description: 'Special numbers' }
      ]
    },
    community: {
      name: 'Community',
      icon: MessageCircle,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      items: [
        { name: 'Cosmic Chat', icon: MessageCircle, href: '/community/chat', description: 'Connect with believers' },
        { name: 'Notifications', icon: Bell, href: '/notifications', description: 'Stay updated' },
        { name: 'Settings', icon: Settings, href: '/settings', description: 'Preferences' }
      ]
    }
  }

  const quickActions = [
    { name: 'Today\'s Guidance', icon: Sun, href: '/today', color: 'bg-yellow-500' },
    { name: 'My Profile', icon: User, href: '/profile', color: 'bg-blue-500' },
    { name: 'Dreams', icon: Moon, href: '/dreams', color: 'bg-purple-500' },
    { name: 'Compatibility', icon: Heart, href: '/compatibility', color: 'bg-pink-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-lg font-bold text-slate-900">Daily Secrets</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Search className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-lg bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search cosmic guidance..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(categories).map(([key, category]) => (
                  <div key={key} className="p-3 rounded-lg bg-slate-50">
                    <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
                    <div className="space-y-1">
                      {category.items.map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-2 rounded-lg hover:bg-white transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-4 h-4 text-slate-600" />
                            <div>
                              <div className="font-medium text-slate-900">{item.name}</div>
                              <div className="text-sm text-slate-500">{item.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-slate-200"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile */}
              {user && (
                <div className="mb-6 p-4 rounded-lg bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{user.fullName}</div>
                      <div className="text-sm text-slate-500">{user.zodiacSign}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Navigation */}
              <div className="space-y-4">
                {Object.entries(categories).map(([key, category]) => (
                  <div key={key} className="space-y-2">
                    <button
                      onClick={() => setActiveCategory(activeCategory === key ? '' : key)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                        <span className="font-medium text-slate-900">{category.name}</span>
                      </div>
                      {activeCategory === key ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    <AnimatePresence>
                      {activeCategory === key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-8 space-y-1"
                        >
                          {category.items.map((item, index) => (
                            <button
                              key={index}
                              className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <item.icon className="w-4 h-4 text-slate-600" />
                                <div>
                                  <div className="font-medium text-slate-900">{item.name}</div>
                                  <div className="text-sm text-slate-500">{item.description}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-0">
        {/* Quick Actions Bar */}
        <div className="bg-white border-b border-slate-200 px-4 py-3 lg:hidden">
          <div className="flex space-x-2 overflow-x-auto">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-900">{action.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-900">{action.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


