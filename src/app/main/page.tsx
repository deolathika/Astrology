'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, User, Heart, MessageCircle, Settings, 
  Sun, Moon, Sparkles, ChevronRight, Globe,
  Menu, X, Home, Calendar, MapPin, Clock,
  Monitor, Smartphone, Tablet, Search,
  Bell, Crown, Shield, Zap
} from 'lucide-react'

export default function MainPage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | 'tablet'>('desktop')

  useEffect(() => {
    // Enhanced device detection
    const detectDevice = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent) || (width >= 768 && width <= 1024)
      
      if (isMobileDevice && width < 768) {
        setDeviceType('mobile')
      } else if (isTablet || (width >= 768 && width <= 1024)) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }
    
    detectDevice()
    window.addEventListener('resize', detectDevice)
    return () => window.removeEventListener('resize', detectDevice)
  }, [])

  useEffect(() => {
    // Load user profile
    const profile = localStorage.getItem('userData')
    if (profile) {
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const sidebarItems = [
    { id: 'home', label: 'Dashboard', icon: Home, path: '/main', active: true },
    { id: 'today', label: 'Today\'s Guidance', icon: Sun, path: '/today' },
    { id: 'profile', label: 'Cosmic Profile', icon: User, path: '/cosmic-profile' },
    { id: 'zodiac', label: 'Zodiac Systems', icon: Star, path: '/zodiac-systems' },
    { id: 'numerology', label: 'Numerology', icon: Sparkles, path: '/numerology' },
    { id: 'compatibility', label: 'Compatibility', icon: Heart, path: '/compatibility' },
    { id: 'dreams', label: 'Dream Analysis', icon: Moon, path: '/dreams' },
    { id: 'chat', label: 'Community Chat', icon: MessageCircle, path: '/chat' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
    { id: 'premium', label: 'Premium', icon: Crown, path: '/premium' },
    { id: 'admin', label: 'Admin Panel', icon: Shield, path: '/admin' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ]

  const featureCards = [
    {
      id: 'today',
      title: 'Today\'s Guidance',
      description: 'Get your personalized daily cosmic insights, lucky numbers, and advice.',
      icon: Sun,
      color: 'violet',
      path: '/today',
      stats: 'Daily Updated'
    },
    {
      id: 'profile',
      title: 'Cosmic Profile',
      description: 'Explore your natal chart, numerology, and unique cosmic blueprint.',
      icon: User,
      color: 'blue',
      path: '/cosmic-profile',
      stats: 'Complete Analysis'
    },
    {
      id: 'zodiac',
      title: 'Zodiac Systems',
      description: 'Discover Western, Vedic, Chinese, and Sri Lankan zodiac systems.',
      icon: Star,
      color: 'green',
      path: '/zodiac-systems',
      stats: '4 Systems'
    },
    {
      id: 'numerology',
      title: 'Numerology',
      description: 'Calculate your life path, destiny, and soul urge numbers.',
      icon: Sparkles,
      color: 'purple',
      path: '/numerology',
      stats: 'Master Numbers'
    },
    {
      id: 'compatibility',
      title: 'Compatibility',
      description: 'Discover your cosmic connections and relationship insights.',
      icon: Heart,
      color: 'pink',
      path: '/compatibility',
      stats: 'AI Powered'
    },
    {
      id: 'dreams',
      title: 'Dream Analysis',
      description: 'Log your dreams and get AI-powered interpretations.',
      icon: Moon,
      color: 'indigo',
      path: '/dreams',
      stats: 'AI Powered'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      violet: 'bg-violet-100 text-violet-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      pink: 'bg-pink-100 text-pink-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600'
  }

  const getGradientClasses = (color: string) => {
    const gradientMap = {
      violet: 'from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700',
      blue: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
      green: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
      purple: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      pink: 'from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700',
      indigo: 'from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
    }
    return gradientMap[color as keyof typeof gradientMap] || 'from-gray-600 to-gray-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ width: isSidebarOpen ? 280 : 0 }}
        animate={{ width: isSidebarOpen ? 280 : 0 }}
        className="bg-white border-r border-slate-200 shadow-lg overflow-hidden"
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Daily Secrets</h1>
              <p className="text-sm text-slate-500">Desktop Experience</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-violet-100 text-violet-700'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search cosmic insights..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              {userProfile && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-900">
                    {userProfile.fullName || 'Cosmic Explorer'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="flex-1 p-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome to Your Cosmic Dashboard
            </h2>
            <p className="text-slate-600">
              Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance.
            </p>
            {userProfile && (
              <p className="text-violet-600 mt-2">
                Welcome back, {userProfile.fullName || 'Cosmic Explorer'}!
              </p>
            )}
          </motion.div>

          {/* Feature Cards - Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleNavigation(card.path)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 ${getColorClasses(card.color)} rounded-xl flex items-center justify-center`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                    <p className="text-slate-600 text-sm">{card.stats}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4">{card.description}</p>
                <button className={`w-full bg-gradient-to-r ${getGradientClasses(card.color)} text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}>
                  <span>Explore {card.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleNavigation('/zodiac/western')}
                className="p-4 text-center hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-slate-900">Western</p>
              </button>
              
              <button
                onClick={() => handleNavigation('/zodiac/vedic')}
                className="p-4 text-center hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Globe className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-slate-900">Vedic</p>
              </button>
              
              <button
                onClick={() => handleNavigation('/zodiac/chinese')}
                className="p-4 text-center hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-slate-900">Chinese</p>
              </button>
              
              <button
                onClick={() => handleNavigation('/zodiac/sri-lankan')}
                className="p-4 text-center hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-slate-900">Sri Lankan</p>
              </button>
            </div>
          </motion.div>

          {/* Device Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              {deviceType === 'mobile' && <Smartphone className="w-4 h-4" />}
              {deviceType === 'tablet' && <Tablet className="w-4 h-4" />}
              {deviceType === 'desktop' && <Monitor className="w-4 h-4" />}
              <span>
                Optimized for {deviceType} devices
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}