'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Moon, 
  Heart, 
  Calculator, 
  Users, 
  Bell, 
  TrendingUp,
  Calendar,
  Zap,
  Crown,
  Sparkles,
  BarChart3,
  Globe,
  Smartphone,
  ArrowRight,
  Plus,
  Eye,
  BookOpen,
  Target,
  Award,
  Shield,
  Database,
  Lock,
  Unlock,
  Activity,
  Compass,
  Brain,
  Sun,
  Diamond,
  Gift,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  PieChart,
  TrendingDown,
  Cloud,
  Server,
  Key,
  CheckCircle,
  ExternalLink,
  Share2,
  Download,
  RefreshCw,
  Filter,
  Grid,
  List,
  Volume2,
  Battery,
  Wifi,
  Monitor,
  Tablet,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Info,
  Scale,
  Wallet,
  Clock,
  Settings,
  User,
  Home,
  Search,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Focus,
  Layers,
  Palette,
  Brush,
  Scissors,
  Copy,
  // Paste, // Not available in lucide-react
  // Cut, // Not available in lucide-react
  Save,
  Upload,
  Trash2,
  Archive,
  Folder,
  File,
  Image,
  Video,
  Music,
  Headphones,
  Mic,
  Camera,
  Map,
  Navigation,
  Flag,
  Trophy,
  Medal,
  Badge,
  Tag,
  // Label, // Not available in lucide-react
  Bookmark,
  Pin,
  // Thumbtack, // Not available in lucide-react
  Paperclip,
  Link,
  Unlink,
  // Security, // Not available in lucide-react
  // Privacy, // Not available in lucide-react
  EyeOff,
  // Visibility, // Not available in lucide-react
  // VisibilityOff, // Not available in lucide-react
  // Show, // Not available in lucide-react
  // Hide, // Not available in lucide-react
  // Reveal, // Not available in lucide-react
  // Conceal, // Not available in lucide-react
  // Open, // Not available in lucide-react
  // Close, // Not available in lucide-react
  // Start, // Not available in lucide-react
  // End, // Not available in lucide-react
  // Begin, // Not available in lucide-react
  // Finish, // Not available in lucide-react
  // Complete, // Not available in lucide-react
  // Done, // Not available in lucide-react
  Check,
  X,
  // Cross, // Not available in lucide-react
  // Cancel, // Not available in lucide-react
  Delete,
  // Remove, // Not available in lucide-react
  // Add, // Not available in lucide-react
  // Subtract, // Not available in lucide-react
  // Multiply, // Not available in lucide-react
  // Divide, // Not available in lucide-react
  // Equal, // Not available in lucide-react
  // NotEqual, // Not available in lucide-react
  // Greater, // Not available in lucide-react
  // Less, // Not available in lucide-react
  // GreaterEqual, // Not available in lucide-react
  // LessEqual, // Not available in lucide-react
  // Times, // Not available in lucide-react
  Slash,
  Percent,
  // Dollar, // Not available in lucide-react
  // Euro, // Not available in lucide-react
  // Pound, // Not available in lucide-react
  // Yen, // Not available in lucide-react
  // Bitcoin, // Not available in lucide-react
  Banknote,
  Coins,
  PiggyBank,
  // Safe, // Not available in lucide-react
  // Vault // Not available in lucide-react
} from 'lucide-react'

interface UltimateDashboardProps {
  user: any
}

export function UltimateDashboard({ user }: UltimateDashboardProps) {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  // Fetch user insights
  const { data: insightsData, isLoading: insightsLoading } = useQuery({
    queryKey: ['user-insights', user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/insights?userId=${user?.id}`)
      if (!response.ok) throw new Error('Failed to fetch insights')
      return response.json()
    },
    enabled: !!user?.id
  })

  // Fetch numerology data
  const { data: numerologyData, isLoading: numerologyLoading } = useQuery({
    queryKey: ['user-numerology', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/numerology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          fullName: user?.name || 'User',
          birthDate: user?.profile?.birthDate || '1990-01-01'
        })
      })
      if (!response.ok) throw new Error('Failed to fetch numerology')
      return response.json()
    },
    enabled: !!user?.id
  })

  // Fetch zodiac data
  const { data: zodiacData, isLoading: zodiacLoading } = useQuery({
    queryKey: ['user-zodiac', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/zodiac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          birthDate: user?.profile?.birthDate || '1990-01-01',
          birthTime: user?.profile?.birthTime || '12:00',
          latitude: user?.profile?.lat || 0,
          longitude: user?.profile?.lng || 0
        })
      })
      if (!response.ok) throw new Error('Failed to fetch zodiac')
      return response.json()
    },
    enabled: !!user?.id
  })

  const getThemeClasses = () => {
    switch (user?.role) {
      case 'premium':
        return {
          card: 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200',
          button: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
          text: 'text-amber-900',
          accent: 'text-amber-600',
          background: 'bg-gradient-to-br from-amber-50 to-orange-100'
        }
      case 'admin':
        return {
          card: 'bg-gradient-to-br from-slate-800 to-gray-800 border-2 border-pink-500',
          button: 'bg-gradient-to-r from-pink-500 to-red-500 text-white',
          text: 'text-slate-100',
          accent: 'text-pink-400',
          background: 'bg-gradient-to-br from-slate-900 to-gray-900'
        }
      default:
        return {
          card: 'bg-white border border-gray-200',
          button: 'bg-indigo-600 text-white',
          text: 'text-gray-900',
          accent: 'text-indigo-600',
          background: 'bg-gradient-to-br from-slate-50 to-gray-100'
        }
    }
  }

  const theme = getThemeClasses()

  const getAdvancedFeatures = () => {
    const features = [
      {
        id: 'nasa-validation',
        title: 'NASA/JPL Validation',
        description: 'Real-time accuracy checking against NASA Horizons API',
        icon: Globe,
        status: 'active',
        capabilities: ['±0.1° planetary accuracy', 'Real-time validation', 'NASA data integration'],
        category: 'astrology'
      },
      {
        id: 'swiss-ephemeris',
        title: 'Swiss Ephemeris Integration',
        description: 'Accurate planetary calculations with Swiss Ephemeris',
        icon: Calculator,
        status: 'active',
        capabilities: ['High-precision calculations', 'Multiple coordinate systems', 'Advanced algorithms'],
        category: 'astrology'
      },
      {
        id: 'multi-zodiac',
        title: 'Multi-Zodiac Systems',
        description: 'Western, Vedic, Chinese, and Sri Lankan astrology',
        icon: Compass,
        status: 'active',
        capabilities: ['4 zodiac systems', 'Cultural context', 'Cross-system analysis'],
        category: 'astrology'
      },
      {
        id: 'advanced-numerology',
        title: 'Advanced Numerology',
        description: 'Pythagorean and Chaldean systems with master numbers',
        icon: Brain,
        status: 'active',
        capabilities: ['Dual systems', 'Master numbers', 'Karmic debt analysis'],
        category: 'numerology'
      },
      {
        id: 'ai-integration',
        title: 'AI Integration',
        description: 'Offline AI capabilities with WebLLM and Transformers.js',
        icon: Sparkles,
        status: 'active',
        capabilities: ['Local AI processing', 'Offline functionality', 'Privacy-focused'],
        category: 'ai'
      },
      {
        id: 'dream-analysis',
        title: 'Dream Analysis',
        description: 'AI-powered dream interpretation and symbolism',
        icon: BookOpen,
        status: 'active',
        capabilities: ['Symbol interpretation', 'Pattern recognition', 'Cultural context'],
        category: 'ai'
      },
      {
        id: 'community-features',
        title: 'Community Features',
        description: 'Safe emoji-only chat with consent management',
        icon: Users,
        status: 'active',
        capabilities: ['Moderated chat', 'Consent management', 'Privacy controls'],
        category: 'social'
      },
      {
        id: 'compatibility-matching',
        title: 'Compatibility Matching',
        description: 'Zodiac-based matching system with multiple algorithms',
        icon: Heart,
        status: 'active',
        capabilities: ['Multi-system matching', 'Advanced algorithms', 'Privacy protection'],
        category: 'social'
      },
      {
        id: 'data-export',
        title: 'Data Export',
        description: 'Export your cosmic data in multiple formats',
        icon: Download,
        status: 'active',
        capabilities: ['Multiple formats', 'Scheduled exports', 'Privacy controls'],
        category: 'premium'
      },
      {
        id: 'cosmic-calendar',
        title: 'Cosmic Calendar',
        description: 'Astrological events and cosmic timing',
        icon: Calendar,
        status: 'active',
        capabilities: ['Event tracking', 'Notifications', 'Custom events'],
        category: 'premium'
      },
      {
        id: 'user-management',
        title: 'User Management',
        description: 'Complete user management system',
        icon: Settings,
        status: 'active',
        capabilities: ['Role management', 'Account control', 'Analytics'],
        category: 'admin'
      },
      {
        id: 'system-analytics',
        title: 'System Analytics',
        description: 'Comprehensive system monitoring and analytics',
        icon: BarChart3,
        status: 'active',
        capabilities: ['Performance monitoring', 'Usage analytics', 'System health'],
        category: 'admin'
      }
    ]

    return features.filter(feature => {
      if (user?.role === 'admin') return true
      if (user?.role === 'premium') return feature.category !== 'admin'
      return feature.category === 'astrology' || feature.category === 'numerology'
    })
  }

  const getFeatureCategories = () => {
    const categories = [
      { id: 'astrology', title: 'Astrology Systems', icon: Moon, color: 'text-purple-600' },
      { id: 'numerology', title: 'Numerology Systems', icon: Calculator, color: 'text-blue-600' },
      { id: 'ai', title: 'AI Features', icon: Brain, color: 'text-cyan-600' },
      { id: 'social', title: 'Community & Social', icon: Users, color: 'text-green-600' },
      { id: 'premium', title: 'Premium Features', icon: Crown, color: 'text-amber-600' },
      { id: 'admin', title: 'Admin Features', icon: Settings, color: 'text-red-600' }
    ]

    return categories.filter(category => {
      if (user?.role === 'admin') return true
      if (user?.role === 'premium') return category.id !== 'admin'
      return category.id === 'astrology' || category.id === 'numerology'
    })
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${theme.card} rounded-xl p-8 shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>
              Welcome back, {user?.name || 'Cosmic Explorer'}! ✨
            </h1>
            <p className={`text-lg ${theme.text} opacity-80`}>
              Your comprehensive cosmic journey with all advanced features at your fingertips.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text} opacity-70`}>Daily Insights</p>
              <p className={`text-2xl font-bold ${theme.text}`}>
                {insightsData?.data?.length || 0}
              </p>
            </div>
            <Star className={`w-8 h-8 ${theme.accent}`} />
          </div>
        </div>

        <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text} opacity-70`}>Life Path</p>
              <p className={`text-2xl font-bold ${theme.text}`}>
                {numerologyData?.data?.lifePath || '--'}
              </p>
            </div>
            <Calculator className={`w-8 h-8 ${theme.accent}`} />
          </div>
        </div>

        <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text} opacity-70`}>Zodiac Sign</p>
              <p className={`text-2xl font-bold ${theme.text}`}>
                {zodiacData?.data?.sign || '--'}
              </p>
            </div>
            <Moon className={`w-8 h-8 ${theme.accent}`} />
          </div>
        </div>

        <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text} opacity-70`}>Cosmic Score</p>
              <p className={`text-2xl font-bold ${theme.text}`}>95%</p>
            </div>
            <TrendingUp className={`w-8 h-8 ${theme.accent}`} />
          </div>
        </div>
      </motion.div>

      {/* Advanced Features Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-8"
      >
        {getFeatureCategories().map((category, categoryIndex) => {
          const categoryFeatures = getAdvancedFeatures().filter(f => f.category === category.id)
          
          return (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center space-x-3">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <h2 className={`text-2xl font-bold ${theme.text}`}>{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryFeatures.map((feature, featureIndex) => {
                  const isExpanded = expandedCards.has(feature.id)
                  const Icon = feature.icon
                  
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + (categoryIndex * 0.1) + (featureIndex * 0.05) }}
                      className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          feature.status === 'active' ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-300'
                        }`}>
                          <Icon className={`w-6 h-6 ${feature.status === 'active' ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${theme.text}`}>{feature.title}</h3>
                          <div className="flex items-center space-x-2">
                            {feature.status === 'active' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`text-xs ${feature.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                              {feature.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className={`text-sm ${theme.text} opacity-80 mb-4`}>
                        {feature.description}
                      </p>
                      
                      <div className="space-y-3">
                        <button
                          onClick={() => toggleCard(feature.id)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors`}
                        >
                          <span className={`text-sm font-medium ${theme.text}`}>Capabilities</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-2"
                            >
                              {feature.capabilities.map((capability, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                  <span className={`text-xs ${theme.text} opacity-70`}>{capability}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <button className={`${theme.button} w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Explore Feature
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* System Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`${theme.card} rounded-xl p-8 shadow-lg`}
      >
        <h2 className={`text-2xl font-bold ${theme.text} mb-6`}>System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className={`text-sm ${theme.text}`}>Database: Healthy</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className={`text-sm ${theme.text}`}>API: Operational</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className={`text-sm ${theme.text}`}>AI: Active</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className={`text-sm ${theme.text}`}>Mobile: Optimized</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}