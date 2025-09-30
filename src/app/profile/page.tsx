'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Calendar, Clock, MapPin, Settings, Edit3, Star, Moon, Sun, 
  Heart, Sparkles, ChevronRight, ArrowLeft, Smartphone, Wifi, Battery, 
  Volume2, Globe, Calculator, Target, Compass, Crown, Diamond, Eye,
  TrendingUp, Zap, Shield, BookOpen, Gift, Bell, Wallet
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const profile = localStorage.getItem('userData')
    if (profile) {
      setUserProfile(JSON.parse(profile))
    }
    setIsLoading(false)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
  return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-600">No profile data found. Please complete onboarding.</p>
      </div>
    )
  }

  const profileSections = [
    {
      id: 'personal-details',
      title: 'Personal Details',
      icon: User,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      content: (
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Name:</span>
            <span>{userProfile.name}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Birth Date:</span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {userProfile.birthDate}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Birth Time:</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {userProfile.birthTime}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Birth Place:</span>
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {userProfile.birthPlace}
            </span>
          </div>
        </div>
      ),
      mobileOptimized: true
    },
    {
      id: 'astrology',
      title: 'Astrology Insights',
      icon: Star,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      content: (
        <div className="space-y-3 text-sm text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-violet-50 rounded-lg">
              <p className="font-medium text-violet-800">Zodiac Sign</p>
              <p className="text-violet-600">{userProfile.zodiacSign}</p>
            </div>
            <div className="p-3 bg-violet-50 rounded-lg">
              <p className="font-medium text-violet-800">Sun Sign</p>
              <p className="text-violet-600">Leo</p>
            </div>
            <div className="p-3 bg-violet-50 rounded-lg">
              <p className="font-medium text-violet-800">Moon Sign</p>
              <p className="text-violet-600">Cancer</p>
            </div>
            <div className="p-3 bg-violet-50 rounded-lg">
              <p className="font-medium text-violet-800">Ascendant</p>
              <p className="text-violet-600">Virgo</p>
            </div>
          </div>
          <div className="p-3 bg-violet-50 rounded-lg">
            <p className="font-medium text-violet-800">System</p>
            <p className="text-violet-600 capitalize">{userProfile.system}</p>
          </div>
        </div>
      ),
      mobileOptimized: true
    },
    {
      id: 'numerology',
      title: 'Numerology Blueprint',
      icon: Calculator,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      content: (
        <div className="space-y-3 text-sm text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-800">Life Path Number</p>
              <p className="text-2xl font-bold text-orange-600">{userProfile.lifePathNumber}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-800">Expression Number</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-800">Soul Urge Number</p>
              <p className="text-2xl font-bold text-orange-600">5</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-800">Personality Number</p>
              <p className="text-2xl font-bold text-orange-600">3</p>
            </div>
          </div>
        </div>
      ),
      mobileOptimized: true
    },
    {
      id: 'compatibility',
      title: 'Compatibility Overview',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      content: (
        <div className="space-y-3 text-sm text-slate-700">
          <div className="p-4 bg-pink-50 rounded-lg text-center">
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <p className="text-pink-700">Discover your cosmic connections with others.</p>
            <p className="text-xs text-pink-600 mt-1">(Requires another profile for full analysis)</p>
          </div>
                </div>
      ),
      mobileOptimized: true
    },
    {
      id: 'dreams',
      title: 'Dream Insights',
      icon: Moon,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      content: (
        <div className="space-y-3 text-sm text-slate-700">
          <div className="p-4 bg-teal-50 rounded-lg text-center">
            <Moon className="w-8 h-8 text-teal-500 mx-auto mb-2" />
            <p className="text-teal-700">Explore your subconscious with AI-powered dream interpretations.</p>
            <p className="text-xs text-teal-600 mt-1">(Visit Dream Journal to log dreams)</p>
                </div>
              </div>
      ),
      mobileOptimized: true
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-Optimized Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h1 className="text-lg md:text-xl font-semibold text-slate-900">Cosmic Profile</h1>
            </div>

            <button className="p-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
              <Settings className="w-4 h-4 md:w-5 md:h-5" />
            </button>
                </div>
                </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Mobile Status Bar */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4"
          >
            <div className="flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center space-x-2">
                <Smartphone className="w-3 h-3" />
                <span>Mobile Optimized</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Wifi className="w-3 h-3" />
                  <span>Connected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Battery className="w-3 h-3" />
                  <span>85%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Volume2 className="w-3 h-3" />
                  <span>70%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-6 mb-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">{userProfile.name}</h2>
              <p className="text-sm md:text-base text-slate-600">Cosmic Explorer</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-slate-600">Zodiac: <span className="font-semibold">{userProfile.zodiacSign}</span></span>
              </div>
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-orange-500" />
              <span className="text-slate-600">Life Path: <span className="font-semibold">{userProfile.lifePathNumber}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-green-500" />
              <span className="text-slate-600">System: <span className="font-semibold capitalize">{userProfile.system}</span></span>
                </div>
              </div>
        </motion.div>

        {/* Profile Sections */}
        <div className="space-y-4">
          {profileSections.map((section, index) => {
            const Icon = section.icon
            const isExpanded = expandedSection === section.id
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full p-4 md:p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${section.color}`} />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-slate-900">{section.title}</h3>
                        <p className="text-xs md:text-sm text-slate-500">Tap to explore details</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-slate-100"
                    >
                      <div className="p-4 md:p-6">
                        {section.content}
            </div>
          </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile Quick Actions */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center space-x-2 p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
                <Edit3 className="w-4 h-4" />
                <span className="text-xs font-medium">Edit Profile</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors">
                <Star className="w-4 h-4" />
                <span className="text-xs font-medium">Astrology</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                <Calculator className="w-4 h-4" />
                <span className="text-xs font-medium">Numerology</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-medium">Compatibility</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}