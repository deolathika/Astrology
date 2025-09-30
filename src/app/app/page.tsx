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
import { SeamlessNavigation } from '@/components/seamless-navigation'

export default function AppPage() {
  const [isMobile, setIsMobile] = useState(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Seamless Navigation */}
      <SeamlessNavigation />

      {/* Main Content */}
      <div className={`${isMobile ? 'ml-0' : 'ml-80'} transition-all duration-300`}>
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Daily Secrets App</h1>
                  <p className="text-sm text-slate-600">
                    {userProfile ? `Welcome back, ${userProfile.name}!` : 'Your cosmic journey awaits'}
                  </p>
                </div>
              </div>
              
              {/* Mobile Status Indicators */}
              {isMobile && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-xs text-slate-600">
                    <Wifi className="w-3 h-3" />
                    <span>Connected</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-600">
                    <Battery className="w-3 h-3" />
                    <span>85%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <motion.a
              href="/today"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Today's Secret</h3>
              </div>
              <p className="text-sm opacity-90">Get your personalized daily cosmic guidance</p>
            </motion.a>

            <motion.a
              href="/profile"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-violet-500 to-pink-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Cosmic Profile</h3>
              </div>
              <p className="text-sm opacity-90">Complete astrological and numerological analysis</p>
            </motion.a>

            <motion.a
              href="/community"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Community</h3>
              </div>
              <p className="text-sm opacity-90">Connect with like-minded cosmic souls</p>
            </motion.a>
          </div>

          {/* Feature Categories */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Core Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/today" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Today's Secret</div>
                    <div className="text-sm text-slate-600">Daily cosmic guidance</div>
                  </div>
                </a>
                <a href="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Cosmic Profile</div>
                    <div className="text-sm text-slate-600">Complete analysis</div>
                  </div>
                </a>
                <a href="/numerology" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Numerology</div>
                    <div className="text-sm text-slate-600">Life path analysis</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Astrology</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/zodiac-systems" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Zodiac Systems</div>
                    <div className="text-sm text-slate-600">Multiple systems</div>
                  </div>
                </a>
                <a href="/compatibility" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Compatibility</div>
                    <div className="text-sm text-slate-600">Relationship analysis</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Community & Premium</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/community" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Community</div>
                    <div className="text-sm text-slate-600">Cosmic conversations</div>
                  </div>
                </a>
                <a href="/premium-services" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Premium Services</div>
                    <div className="text-sm text-slate-600">Advanced features</div>
                  </div>
                </a>
                <a href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Settings</div>
                    <div className="text-sm text-slate-600">Customize experience</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">12</div>
                  <div className="text-xs text-slate-600">Active Features</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">3</div>
                  <div className="text-xs text-slate-600">Beta Features</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">2</div>
                  <div className="text-xs text-slate-600">Coming Soon</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <Grid className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">6</div>
                  <div className="text-xs text-slate-600">Categories</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}