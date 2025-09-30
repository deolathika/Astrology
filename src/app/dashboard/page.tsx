'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Heart, Moon, Star, Users, Scale, Bell, Wallet, 
  User, Settings, ChevronRight, Info, Zap, Shield, Globe,
  TrendingUp, Calendar, Clock, Target, Gift, BookOpen,
  Calculator, Brain, Compass, Crown, Diamond, Eye, Sun,
  Menu, X, Home as HomeIcon, ArrowLeft, ArrowRight,
  ChevronDown, ChevronUp, ExternalLink, Plus, Minus, Share2,
  Smartphone, Tablet, Monitor, Wifi, Battery, Volume2,
  Search, Filter, Grid, List, RefreshCw, Download,
  MessageCircle, Phone, Mail, MapPin, CreditCard,
  BarChart3, PieChart, TrendingDown, Activity,
  Lock, Unlock, Key, Database, Server, Cloud,
  CheckCircle
} from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CosmicNavigation } from '@/components/cosmic-navigation'

interface FeatureCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  features: {
    id: string
    title: string
    description: string
    icon: React.ComponentType<any>
    route: string
    status: 'active' | 'beta' | 'coming-soon'
  }[]
}

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const featureCategories: FeatureCategory[] = [
    {
      id: 'daily-guidance',
      title: 'Daily Guidance',
      description: 'Your personalized daily cosmic insights',
      icon: Sparkles,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      features: [
        {
          id: 'todays-secret',
          title: "Today's Secret",
          description: 'Personalized daily cosmic guidance',
          icon: Sparkles,
          route: '/today',
          status: 'active'
        },
        {
          id: 'lucky-trio',
          title: 'Lucky Trio',
          description: 'Your cosmic lucky elements for today',
          icon: Star,
          route: '/today',
          status: 'active'
        },
        {
          id: 'moon-phases',
          title: 'Moon Phases',
          description: 'Lunar cycle guidance and rituals',
          icon: Moon,
          route: '/moon-phases',
          status: 'beta'
        }
      ]
    },
    {
      id: 'astrology',
      title: 'Astrology',
      description: 'Complete astrological analysis and charts',
      icon: Globe,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      features: [
        {
          id: 'cosmic-profile',
          title: 'Cosmic Profile',
          description: 'Complete astrological and numerological analysis',
          icon: User,
          route: '/profile',
          status: 'active'
        },
        {
          id: 'zodiac-systems',
          title: 'Zodiac Systems',
          description: 'Western, Vedic, Chinese, and Hybrid systems',
          icon: Globe,
          route: '/zodiac-systems',
          status: 'active'
        },
        {
          id: 'compatibility',
          title: 'Compatibility',
          description: 'Relationship analysis and synastry',
          icon: Heart,
          route: '/compatibility',
          status: 'active'
        }
      ]
    },
    {
      id: 'numerology',
      title: 'Numerology',
      description: 'Numerical analysis and life path guidance',
      icon: Calculator,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      features: [
        {
          id: 'life-path',
          title: 'Life Path Analysis',
          description: 'Your numerological life path and purpose',
          icon: Target,
          route: '/numerology',
          status: 'active'
        },
        {
          id: 'expression-number',
          title: 'Expression Number',
          description: 'Your talents and abilities',
          icon: Brain,
          route: '/numerology',
          status: 'active'
        }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with like-minded cosmic souls',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      features: [
        {
          id: 'cosmic-chat',
          title: 'Cosmic Chat',
          description: 'Emoji-based cosmic conversations',
          icon: MessageCircle,
          route: '/community',
          status: 'active'
        },
        {
          id: 'cosmic-groups',
          title: 'Cosmic Groups',
          description: 'Join groups based on your cosmic profile',
          icon: Users,
          route: '/groups',
          status: 'beta'
        }
      ]
    },
    {
      id: 'premium',
      title: 'Premium Services',
      description: 'Advanced features and expert consultations',
      icon: Crown,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      features: [
        {
          id: 'expert-consultations',
          title: 'Expert Consultations',
          description: 'One-on-one sessions with certified astrologers',
          icon: Users,
          route: '/consultations',
          status: 'active'
        },
        {
          id: 'premium-features',
          title: 'Premium Features',
          description: 'Unlock all advanced cosmic features',
          icon: Diamond,
          route: '/premium-services',
          status: 'active'
        }
      ]
    }
  ]

  const filteredCategories = featureCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'beta': return 'text-yellow-600 bg-yellow-100'
      case 'coming-soon': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'beta': return Zap
      case 'coming-soon': return Clock
      default: return Info
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Cosmic Dashboard</h1>
                <p className="text-slate-600">Explore all features of Daily Secrets</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Feature Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Category Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{category.title}</h2>
                      <p className="text-slate-600">{category.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {selectedCategory === category.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Category Features */}
              <AnimatePresence>
                {selectedCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.features.map((feature, featureIndex) => {
                        const StatusIcon = getStatusIcon(feature.status)
                        return (
                          <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                            className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-8 h-8 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                                <feature.icon className={`w-4 h-4 ${category.color}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                                  <StatusIcon className="w-3 h-3 inline mr-1" />
                                  {feature.status}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{feature.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-500">Click to explore</span>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {featureCategories.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'active').length, 0)}
                </div>
                <div className="text-sm text-slate-600">Active Features</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {featureCategories.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'beta').length, 0)}
                </div>
                <div className="text-sm text-slate-600">Beta Features</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {featureCategories.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'coming-soon').length, 0)}
                </div>
                <div className="text-sm text-slate-600">Coming Soon</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <Grid className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {featureCategories.length}
                </div>
                <div className="text-sm text-slate-600">Categories</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <CosmicNavigation />
    </div>
  )
}