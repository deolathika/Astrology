'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Star, User, Heart, MessageCircle, Settings, 
  Sun, Moon, Sparkles, ChevronRight, Globe,
  Smartphone, Monitor
} from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | 'tablet'>('desktop')

  useEffect(() => {
    // Enhanced device detection
    const detectDevice = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      
      // Check for mobile devices
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent) || (width >= 768 && width <= 1024)
      
      if (isMobileDevice && width < 768) {
        setDeviceType('mobile')
        setIsMobile(true)
      } else if (isTablet || (width >= 768 && width <= 1024)) {
        setDeviceType('tablet')
        setIsMobile(false)
      } else {
        setDeviceType('desktop')
        setIsMobile(false)
      }
    }
    
    detectDevice()
    window.addEventListener('resize', detectDevice)
    return () => window.removeEventListener('resize', detectDevice)
  }, [])

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('onboardingComplete')
    
    // Immediate redirect for better UX
    if (onboardingComplete) {
      if (deviceType === 'mobile') {
        router.push('/mobile-home')
      } else if (deviceType === 'tablet') {
        router.push('/mobile-home') // Tablets use mobile layout
      } else {
        router.push('/main') // Desktop uses main layout
      }
      } else {
        // Always redirect to simple onboarding for new users
        router.push('/simple-onboarding')
      }
    
    // Set loading to false after redirect
    setIsLoading(false)
  }, [router, deviceType])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your cosmic journey...</p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            {deviceType === 'mobile' && (
              <>
                <Smartphone className="w-5 h-5 text-violet-600" />
                <p className="text-sm text-slate-500">Mobile experience detected</p>
              </>
            )}
            {deviceType === 'desktop' && (
              <>
                <Monitor className="w-5 h-5 text-violet-600" />
                <p className="text-sm text-slate-500">Desktop experience detected</p>
              </>
            )}
            {deviceType === 'tablet' && (
              <>
                <Smartphone className="w-5 h-5 text-violet-600" />
                <p className="text-sm text-slate-500">Tablet experience detected</p>
              </>
            )}
          </div>
        </div>
      </div>
    )
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
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome to Your Cosmic Journey
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleNavigation('/today')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Today's Guidance</h3>
                <p className="text-slate-600">Daily cosmic insights</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Get your personalized daily cosmic insights, lucky numbers, and advice.
            </p>
            <button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <span>View Today</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleNavigation('/cosmic-profile')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Cosmic Profile</h3>
                <p className="text-slate-600">Your astrological profile</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Explore your natal chart, numerology, and unique cosmic blueprint.
            </p>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <span>View Profile</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleNavigation('/zodiac-systems')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Zodiac Systems</h3>
                <p className="text-slate-600">Explore all zodiac systems</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Discover Western, Vedic, Chinese, and Sri Lankan zodiac systems.
            </p>
            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <span>Explore Zodiac</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleNavigation('/numerology')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Numerology</h3>
                <p className="text-slate-600">Life path and destiny numbers</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Calculate your life path, destiny, and soul urge numbers.
            </p>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <span>Calculate Numbers</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleNavigation('/compatibility')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Compatibility</h3>
                <p className="text-slate-600">Relationship insights</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Discover your cosmic connections and relationship insights.
            </p>
            <button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <span>Check Compatibility</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleNavigation('/dreams')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <Moon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Dream Analysis</h3>
                <p className="text-slate-600">AI-powered dream interpretation</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Log your dreams and get AI-powered interpretations.
            </p>
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <span>Analyze Dreams</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Quick Actions</h3>
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
      </div>
    </div>
  )
}
