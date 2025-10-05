'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, Sparkles, User, Globe, Calculator, Users, 
  Crown, Settings, Bell, Wallet, MessageCircle, 
  Heart, Moon, Star, Target, Calendar,
  ChevronDown, ChevronUp, Menu, X, Search,
  Smartphone, Tablet, Monitor, Wifi, Battery,
  Volume2, Lock, Unlock, Key, Database, Server,
  Cloud, CheckCircle, Zap, Clock, Info, Plus,
  Minus, ArrowLeft, ArrowRight, ExternalLink,
  Share2, Download, Upload, Copy,
  Save, Trash2, Edit, Eye, EyeOff, Maximize,
  Minimize, RotateCcw, RotateCw, ZoomIn, ZoomOut,
  Move, Hand, MousePointer, Touchpad, Keyboard,
  Type, AlignLeft, AlignCenter, AlignRight, Bold,
  Italic, Underline, Strikethrough, Link, Unlink,
  Code, Hash, AtSign, Percent, DollarSign, Euro,
  Bitcoin, CreditCard, Banknote,
  Receipt, BarChart3, PieChart, TrendingUp,
  TrendingDown, Activity, Smile, Frown,
  Meh, Laugh, Angry,
  ThumbsUp, ThumbsDown,
  Play, Pause,
  SkipBack, SkipForward, Repeat, Shuffle,
  Volume1, VolumeX, Mic, MicOff, Video, VideoOff,
  Camera, Image, File, FileText, FileImage,
  FileVideo, FileAudio
} from 'lucide-react'

interface NavigationItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  route: string
  color: string
  bgColor: string
  status: 'active' | 'beta' | 'coming-soon'
  category: string
  mobileOptimized: boolean
  capabilities: {
    free: string[]
    premium: string[]
    admin: string[]
  }
}

interface NavigationCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  items: NavigationItem[]
}

export function SeamlessNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Load user profile
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      setUserProfile(JSON.parse(storedData))
    }
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigationCategories: NavigationCategory[] = [
    {
      id: 'core',
      title: 'Core Features',
      description: 'Essential daily cosmic guidance',
      icon: Sparkles,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      items: [
        {
          id: 'home',
          title: 'Home',
          description: 'Your cosmic dashboard',
          icon: Home,
          route: '/app',
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          status: 'active',
          category: 'core',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic dashboard', 'Limited features'],
            premium: ['Full dashboard', 'All features', 'Customization'],
            admin: ['Admin dashboard', 'All features', 'System management']
          }
        },
        {
          id: 'today',
          title: "Today's Secret",
          description: 'Personalized daily cosmic guidance',
          icon: Sparkles,
          route: '/today',
          color: 'text-violet-600',
          bgColor: 'bg-violet-50',
          status: 'active',
          category: 'core',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic guidance (3/day)', 'Simple lucky numbers'],
            premium: ['Unlimited guidance', 'Advanced features', 'Share functionality'],
            admin: ['All features', 'Custom algorithms', 'Analytics']
          }
        },
        {
          id: 'profile',
          title: 'Cosmic Profile',
          description: 'Complete astrological and numerological analysis',
          icon: User,
          route: '/profile',
          color: 'text-slate-600',
          bgColor: 'bg-slate-50',
          status: 'active',
          category: 'core',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic profile', 'Simple chart'],
            premium: ['Complete profile', 'Advanced analysis', 'Detailed interpretations'],
            admin: ['All features', 'Custom profiles', 'Bulk management']
          }
        }
      ]
    },
    {
      id: 'astrology',
      title: 'Astrology',
      description: 'Complete astrological analysis',
      icon: Globe,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      items: [
        {
          id: 'zodiac-systems',
          title: 'Zodiac Systems',
          description: 'Western, Vedic, Chinese, and Hybrid systems',
          icon: Globe,
          route: '/zodiac-systems',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          status: 'active',
          category: 'astrology',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic zodiac info'],
            premium: ['Multiple systems', 'Detailed comparisons'],
            admin: ['All systems', 'Custom systems', 'System management']
          }
        },
        {
          id: 'compatibility',
          title: 'Compatibility',
          description: 'Relationship analysis and synastry',
          icon: Heart,
          route: '/compatibility',
          color: 'text-pink-600',
          bgColor: 'bg-pink-50',
          status: 'active',
          category: 'astrology',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic compatibility'],
            premium: ['Advanced synastry', 'Composite charts'],
            admin: ['All features', 'Custom compatibility', 'Analytics']
          }
        }
      ]
    },
    {
      id: 'numerology',
      title: 'Numerology',
      description: 'Numerical analysis and life path',
      icon: Calculator,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        {
          id: 'numerology',
          title: 'Numerology',
          description: 'Life path, expression, and soul urge numbers',
          icon: Calculator,
          route: '/numerology',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          status: 'active',
          category: 'numerology',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic numerology'],
            premium: ['Advanced numerology', 'Multiple systems'],
            admin: ['All features', 'Custom calculations', 'Analytics']
          }
        }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with cosmic souls',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        {
          id: 'community',
          title: 'Community',
          description: 'Emoji-based cosmic conversations',
          icon: MessageCircle,
          route: '/community',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          status: 'active',
          category: 'community',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic chat'],
            premium: ['Unlimited chat', 'Advanced features'],
            admin: ['Moderation tools', 'Analytics', 'Management']
          }
        }
      ]
    },
    {
      id: 'premium',
      title: 'Premium Services',
      description: 'Advanced features and consultations',
      icon: Crown,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      items: [
        {
          id: 'premium-services',
          title: 'Premium Services',
          description: 'Unlock all advanced features',
          icon: Crown,
          route: '/premium-services',
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          status: 'active',
          category: 'premium',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic features only'],
            premium: ['All premium features', 'Unlimited access'],
            admin: ['All features', 'Admin tools', 'System management']
          }
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings & Tools',
      description: 'Customize your experience',
      icon: Settings,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      items: [
        {
          id: 'settings',
          title: 'Settings',
          description: 'Customize your cosmic experience',
          icon: Settings,
          route: '/settings',
          color: 'text-slate-600',
          bgColor: 'bg-slate-50',
          status: 'active',
          category: 'settings',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic settings'],
            premium: ['Advanced settings', 'Customization'],
            admin: ['All settings', 'System settings', 'User management']
          }
        },
        {
          id: 'notifications',
          title: 'Notifications',
          description: 'Manage your cosmic alerts',
          icon: Bell,
          route: '/notifications',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          status: 'active',
          category: 'settings',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic notifications'],
            premium: ['Advanced notifications', 'Custom alerts'],
            admin: ['All notifications', 'Bulk notifications', 'Analytics']
          }
        },
        {
          id: 'wallet',
          title: 'Wallet',
          description: 'Manage your cosmic finances',
          icon: Wallet,
          route: '/wallet',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          status: 'active',
          category: 'settings',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic wallet'],
            premium: ['Advanced wallet', 'Payment methods'],
            admin: ['All features', 'Transaction management', 'Analytics']
          }
        }
      ]
    }
  ]

  const filteredCategories = navigationCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.items.some(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
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

  const handleNavigation = (route: string) => {
    router.push(route)
    setIsOpen(false)
  }

  const isCurrentRoute = (route: string) => {
    return pathname === route || pathname.startsWith(route + '/')
  }

  return (
    <>
      {/* Mobile Navigation Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full shadow-lg hover:from-violet-600 hover:to-purple-700 transition-all z-40"
        >
          <Menu className="w-6 h-6 mx-auto" />
        </button>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 shadow-lg z-30">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Daily Secrets</h1>
                <p className="text-sm text-slate-600">
                  {userProfile ? `Welcome, ${userProfile.name}!` : 'Navigation'}
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            {/* Navigation Categories */}
            <div className="space-y-4">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={category.id} className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                        <category.icon className={`w-4 h-4 ${category.color}`} />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-slate-900">{category.title}</div>
                        <div className="text-xs text-slate-600">{category.description}</div>
                      </div>
                    </div>
                    {selectedCategory === category.id ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {selectedCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 space-y-1">
                          {category.items.map((item, itemIndex) => {
                            const StatusIcon = getStatusIcon(item.status)
                            const isActive = isCurrentRoute(item.route)
                            return (
                              <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                                onClick={() => handleNavigation(item.route)}
                                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors group ${
                                  isActive 
                                    ? 'bg-violet-50 text-violet-700 border border-violet-200' 
                                    : 'hover:bg-slate-50'
                                }`}
                              >
                                <div className={`w-6 h-6 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                                  <item.icon className={`w-3 h-3 ${item.color}`} />
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-slate-900">{item.title}</span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                      <StatusIcon className="w-2 h-2 inline mr-1" />
                                      {item.status}
                                    </span>
                                  </div>
                                  <div className="text-xs text-slate-600">{item.description}</div>
                                </div>
                                {isActive && (
                                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                                )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-slate-900">Daily Secrets</h1>
                      <p className="text-sm text-slate-600">
                        {userProfile ? `Welcome, ${userProfile.name}!` : 'Navigation'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                {/* Navigation Categories */}
                <div className="space-y-4">
                  {filteredCategories.map((category, categoryIndex) => (
                    <div key={category.id} className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                            <category.icon className={`w-4 h-4 ${category.color}`} />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-slate-900">{category.title}</div>
                            <div className="text-xs text-slate-600">{category.description}</div>
                          </div>
                        </div>
                        {selectedCategory === category.id ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      <AnimatePresence>
                        {selectedCategory === category.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 space-y-1">
                              {category.items.map((item, itemIndex) => {
                                const StatusIcon = getStatusIcon(item.status)
                                const isActive = isCurrentRoute(item.route)
                                return (
                                  <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                                    onClick={() => handleNavigation(item.route)}
                                    className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors group ${
                                      isActive 
                                        ? 'bg-violet-50 text-violet-700 border border-violet-200' 
                                        : 'hover:bg-slate-50'
                                    }`}
                                  >
                                    <div className={`w-6 h-6 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                                      <item.icon className={`w-3 h-3 ${item.color}`} />
                                    </div>
                                    <div className="flex-1 text-left">
                                      <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-slate-900">{item.title}</span>
                                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                          <StatusIcon className="w-2 h-2 inline mr-1" />
                                          {item.status}
                                        </span>
                                      </div>
                                      <div className="text-xs text-slate-600">{item.description}</div>
                                    </div>
                                    {isActive && (
                                      <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                                    )}
                                  </motion.button>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


