'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, Heart, Crown, Shield, Zap, Sparkles, 
  ArrowRight, Lock, Check, X, AlertCircle,
  Calendar, Users, MessageCircle, Settings
} from 'lucide-react'
import SubscriptionAwareFeature from '@/components/subscription-aware-feature'

interface UserSubscription {
  planId: string
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  features: string[]
  usage: {
    dailyInsights: number
    expertConsultations: number
    compatibilityChecks: number
  }
}

export default function DashboardEnhanced() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    // Load user profile
    const profile = localStorage.getItem('userData')
    if (profile) {
      const userData = JSON.parse(profile)
      setUserProfile(userData)
    }

    // Load subscription data
    const subscription = localStorage.getItem('userSubscription')
    if (subscription) {
      setUserSubscription(JSON.parse(subscription))
    } else {
      // Default to free plan
      setUserSubscription({
        planId: 'free',
        status: 'active',
        features: ['Daily cosmic insights (3 per day)', 'Basic numerology readings'],
        usage: { dailyInsights: 0, expertConsultations: 0, compatibilityChecks: 0 }
      })
    }
    setIsLoading(false)
  }

  const getPlanInfo = (planId: string) => {
    const plans = {
      free: { name: 'Free', icon: Heart, color: 'text-slate-600', bgColor: 'bg-slate-50' },
      premium: { name: 'Premium', icon: Crown, color: 'text-purple-600', bgColor: 'bg-purple-50' },
      admin: { name: 'Admin', icon: Shield, color: 'text-amber-600', bgColor: 'bg-amber-50' }
    }
    return plans[planId as keyof typeof plans] || plans.free
  }

  const getUsagePercentage = (current: number, limit: number): number => {
    if (limit === -1) return 0 // Unlimited
    return Math.round((current / limit) * 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your cosmic dashboard...</p>
        </div>
      </div>
    )
  }

  const planInfo = getPlanInfo(userSubscription?.planId || 'free')
  const PlanIcon = planInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Cosmic Dashboard</h1>
                <p className="text-slate-600">Your personalized cosmic journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Current Plan</p>
                <div className="flex items-center space-x-2">
                  <PlanIcon className={`w-5 h-5 ${planInfo.color}`} />
                  <span className="font-semibold text-slate-900">{planInfo.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-xl ${planInfo.bgColor} flex items-center justify-center`}>
                <PlanIcon className={`w-8 h-8 ${planInfo.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{planInfo.name} Plan</h2>
                <p className="text-slate-600">Your cosmic journey level</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    userSubscription?.status === 'active' ? 'bg-green-100 text-green-700' :
                    userSubscription?.status === 'cancelled' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {userSubscription?.status?.charAt(0).toUpperCase()}{userSubscription?.status?.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => window.location.href = '/subscription'}
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200"
              >
                Manage Subscription
              </button>
            </div>
          </div>
        </motion.div>

        {/* Usage Statistics */}
        {userSubscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Usage Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Daily Insights</h4>
                  <span className="text-sm text-slate-600">
                    {userSubscription.usage.dailyInsights} / {userSubscription.planId === 'free' ? '3' : '∞'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${getUsagePercentage(userSubscription.usage.dailyInsights, userSubscription.planId === 'free' ? 3 : -1)}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Expert Consultations</h4>
                  <span className="text-sm text-slate-600">
                    {userSubscription.usage.expertConsultations} / {userSubscription.planId === 'free' ? '0' : userSubscription.planId === 'premium' ? '2' : '∞'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${getUsagePercentage(userSubscription.usage.expertConsultations, userSubscription.planId === 'free' ? 0 : userSubscription.planId === 'premium' ? 2 : -1)}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Compatibility Checks</h4>
                  <span className="text-sm text-slate-600">
                    {userSubscription.usage.compatibilityChecks} / {userSubscription.planId === 'free' ? '5' : '∞'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${getUsagePercentage(userSubscription.usage.compatibilityChecks, userSubscription.planId === 'free' ? 5 : -1)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Daily Insights */}
          <SubscriptionAwareFeature feature="unlimited_insights">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Daily Insights</h3>
                  <p className="text-slate-600">Personalized cosmic guidance</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Get your daily cosmic insights, lucky numbers, and personalized advice.
              </p>
              <button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200">
                View Today's Insights
              </button>
            </motion.div>
          </SubscriptionAwareFeature>

          {/* Expert Consultations */}
          <SubscriptionAwareFeature feature="expert_consultations">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Expert Consultations</h3>
                  <p className="text-slate-600">Professional astrological guidance</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Get personalized consultations with certified astrologers and numerologists.
              </p>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                Book Consultation
              </button>
            </motion.div>
          </SubscriptionAwareFeature>

          {/* Advanced Astrology */}
          <SubscriptionAwareFeature feature="advanced_astrology">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Advanced Astrology</h3>
                  <p className="text-slate-600">Detailed cosmic analysis</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Access detailed natal charts, transit analysis, and advanced astrological insights.
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200">
                View Advanced Charts
              </button>
            </motion.div>
          </SubscriptionAwareFeature>

          {/* AI Dream Interpretation */}
          <SubscriptionAwareFeature feature="ai_dreams">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">AI Dream Analysis</h3>
                  <p className="text-slate-600">AI-powered dream interpretation</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Get AI-powered interpretations of your dreams with cosmic insights.
              </p>
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
                Analyze Dreams
              </button>
            </motion.div>
          </SubscriptionAwareFeature>

          {/* Admin Dashboard */}
          <SubscriptionAwareFeature feature="admin_dashboard">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Admin Dashboard</h3>
                  <p className="text-slate-600">System management tools</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Access comprehensive admin tools for user management and system control.
              </p>
              <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200">
                Open Admin Panel
              </button>
            </motion.div>
          </SubscriptionAwareFeature>

          {/* API Access */}
          <SubscriptionAwareFeature feature="api_access">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">API Access</h3>
                  <p className="text-slate-600">Developer tools and integrations</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Access our API for custom integrations and advanced features.
              </p>
              <button className="w-full bg-gradient-to-r from-slate-600 to-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-gray-700 transition-all duration-200">
                View API Docs
              </button>
            </motion.div>
          </SubscriptionAwareFeature>
        </div>
      </div>
    </div>
  )
}


