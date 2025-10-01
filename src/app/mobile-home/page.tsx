'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, User, Heart, MessageCircle, Settings, 
  Sun, Moon, Sparkles, ChevronRight, Globe,
  Menu, X, Home, Calendar, MapPin, Clock,
  Smartphone, Monitor, Tablet
} from 'lucide-react'

export default function MobileHomePage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | 'tablet'>('mobile')

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
    setIsMenuOpen(false)
  }

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/mobile-home', active: true },
    { id: 'today', label: 'Today', icon: Sun, path: '/today' },
    { id: 'profile', label: 'Profile', icon: User, path: '/cosmic-profile' },
    { id: 'zodiac', label: 'Zodiac', icon: Star, path: '/zodiac-systems' },
    { id: 'numerology', label: 'Numbers', icon: Sparkles, path: '/numerology' },
    { id: 'compatibility', label: 'Match', icon: Heart, path: '/compatibility' },
    { id: 'dreams', label: 'Dreams', icon: Moon, path: '/dreams' },
    { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ]

  const featureCards = [
    {
      id: 'today',
      title: 'Today\'s Guidance',
      description: 'Daily cosmic insights',
      icon: Sun,
      color: 'violet',
      path: '/today'
    },
    {
      id: 'profile',
      title: 'Cosmic Profile',
      description: 'Your astrological profile',
      icon: User,
      color: 'blue',
      path: '/cosmic-profile'
    },
    {
      id: 'zodiac',
      title: 'Zodiac Systems',
      description: 'Explore all zodiac systems',
      icon: Star,
      color: 'green',
      path: '/zodiac-systems'
    },
    {
      id: 'numerology',
      title: 'Numerology',
      description: 'Life path and destiny numbers',
      icon: Sparkles,
      color: 'purple',
      path: '/numerology'
    },
    {
      id: 'compatibility',
      title: 'Compatibility',
      description: 'Relationship insights',
      icon: Heart,
      color: 'pink',
      path: '/compatibility'
    },
    {
      id: 'dreams',
      title: 'Dream Analysis',
      description: 'AI-powered dream interpretation',
      icon: Moon,
      color: 'indigo',
      path: '/dreams'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Daily Secrets</h1>
              <p className="text-xs text-slate-500">
                {deviceType === 'mobile' && 'Mobile'}
                {deviceType === 'tablet' && 'Tablet'}
                {deviceType === 'desktop' && 'Desktop'} Experience
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-b border-slate-200 shadow-lg"
          >
            <div className="px-4 py-4">
              <div className="grid grid-cols-3 gap-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`p-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-violet-100 text-violet-700'
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs font-medium">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome to Your Cosmic Journey
          </h2>
          <p className="text-slate-600 text-sm">
            Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance.
          </p>
          {userProfile && (
            <p className="text-sm text-violet-600 mt-2">
              Welcome back, {userProfile.fullName || 'Cosmic Explorer'}!
            </p>
          )}
        </motion.div>

        {/* Feature Cards - Mobile Optimized */}
        <div className="space-y-4 mb-8">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-4 border border-slate-200 hover:shadow-md transition-shadow"
              onClick={() => handleNavigation(card.path)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${getColorClasses(card.color)} rounded-xl flex items-center justify-center`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-slate-600 text-sm">{card.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-4 border border-slate-200"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleNavigation('/zodiac/western')}
              className="p-3 text-center hover:bg-slate-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-slate-900">Western</p>
            </button>
            
            <button
              onClick={() => handleNavigation('/zodiac/vedic')}
              className="p-3 text-center hover:bg-slate-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Globe className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-slate-900">Vedic</p>
            </button>
            
            <button
              onClick={() => handleNavigation('/zodiac/chinese')}
              className="p-3 text-center hover:bg-slate-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-slate-900">Chinese</p>
            </button>
            
            <button
              onClick={() => handleNavigation('/zodiac/sri-lankan')}
              className="p-3 text-center hover:bg-slate-50 rounded-lg transition-colors"
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
  )
}