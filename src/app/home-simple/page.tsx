'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, Heart, Moon, Star, Users, Bell, Wallet, 
  User, Settings, ChevronRight, Globe, Calculator, Crown, Shield
} from 'lucide-react'

export default function SimpleHomePage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      setUserProfile(JSON.parse(storedData))
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your cosmic journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Daily Secrets
          </h1>
          {userProfile && (
            <p className="text-lg text-slate-600">
              Hello {userProfile.name}! Discover your personalized cosmic insights.
            </p>
          )}
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Today's Secret</h3>
                <p className="text-sm text-slate-600">Personalized daily cosmic guidance</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Get your personalized daily cosmic insights, lucky numbers, and advice.
            </p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
              View Today
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Cosmic Profile</h3>
                <p className="text-sm text-slate-600">Complete astrological analysis</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Explore your natal chart, numerology, and unique cosmic blueprint.
            </p>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">
              View Profile
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Compatibility</h3>
                <p className="text-sm text-slate-600">Relationship insights</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Discover your cosmic connections and relationship insights.
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
              Check Compatibility
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Numerology</h3>
                <p className="text-sm text-slate-600">Numerical analysis</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Calculate your life path, expression, and soul urge numbers.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Calculate Numbers
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Community</h3>
                <p className="text-sm text-slate-600">Connect with cosmic souls</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Connect with like-minded cosmic explorers and share insights.
            </p>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors">
              Join Community
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Premium Services</h3>
                <p className="text-sm text-slate-600">Advanced features</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Unlock advanced features and expert consultations.
            </p>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 transition-colors">
              Upgrade Now
            </button>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">10</div>
                <div className="text-xs text-slate-600">Active Features</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Moon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">5</div>
                <div className="text-xs text-slate-600">Categories</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">3</div>
                <div className="text-xs text-slate-600">Systems</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Crown className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">∞</div>
                <div className="text-xs text-slate-600">Possibilities</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


