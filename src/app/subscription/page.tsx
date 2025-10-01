'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Crown, Star, Heart, Zap, Shield, Check, X, 
  CreditCard, Calendar, Gift, Sparkles, Lock, Unlock,
  ArrowRight, ArrowLeft, Users, Settings, Bell
} from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  period: string
  features: string[]
  limitations: string[]
  color: string
  bgColor: string
  borderColor: string
  icon: React.ComponentType<any>
  popular?: boolean
  current?: boolean
}

interface UserSubscription {
  planId: string
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  startDate: string
  endDate: string
  autoRenew: boolean
  features: string[]
}

export default function SubscriptionPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free User',
      description: 'Perfect for getting started with cosmic guidance',
      price: 0,
      period: 'forever',
      features: [
        'Daily cosmic insights (3 per day)',
        'Basic numerology readings',
        'Simple astrology charts',
        'Community access',
        'Basic compatibility check',
        'Basic dream interpretation'
      ],
      limitations: [
        'Limited to 3 readings per day',
        'Basic chart only',
        'No expert consultations',
        'No advanced features'
      ],
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      icon: Heart
    },
    {
      id: 'premium',
      name: 'Premium User',
      description: 'Complete cosmic guidance for your daily life',
      price: 19.99,
      period: 'month',
      features: [
        'Unlimited daily insights',
        'Advanced numerology analysis',
        'Detailed astrology charts',
        'Expert consultations (2/month)',
        'Advanced compatibility analysis',
        'AI-powered dream interpretations',
        'Personalized cosmic calendar',
        'Priority customer support',
        'Advanced Vedic astrology',
        'Custom cosmic rituals'
      ],
      limitations: [],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      icon: Crown,
      popular: true
    },
    {
      id: 'admin',
      name: 'Admin Account',
      description: 'Full control and customization for the entire application',
      price: 99.99,
      period: 'month',
      features: [
        'All premium features',
        'Unlimited expert consultations',
        'Personal astrologer assigned',
        'Advanced Vedic astrology',
        'Custom cosmic rituals',
        'Admin dashboard access',
        'User management tools',
        'Content moderation',
        'Analytics and insights',
        'Custom integrations',
        'API access',
        'White-label options'
      ],
      limitations: [],
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: Shield
    }
  ]

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    // Load user profile and subscription
    const profile = localStorage.getItem('userData')
    if (profile) {
      const userData = JSON.parse(profile)
      setUserProfile(userData)
      
      // Load subscription data
      const subscription = localStorage.getItem('userSubscription')
      if (subscription) {
        setCurrentSubscription(JSON.parse(subscription))
      } else {
        // Default to free plan
        setCurrentSubscription({
          planId: 'free',
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
          autoRenew: false,
          features: subscriptionPlans[0].features
        })
      }
    }
    setIsLoading(false)
  }

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId)
    setShowPayment(true)
  }

  const processSubscription = async (planId: string) => {
    const selectedPlan = subscriptionPlans.find(p => p.id === planId)
    if (!selectedPlan) return

    // Simulate payment processing
    const newSubscription: UserSubscription = {
      planId: planId,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      autoRenew: true,
      features: selectedPlan.features
    }

    setCurrentSubscription(newSubscription)
    localStorage.setItem('userSubscription', JSON.stringify(newSubscription))
    setShowPayment(false)
    setSelectedPlan('')
  }

  const cancelSubscription = async () => {
    if (currentSubscription) {
      const updatedSubscription = {
        ...currentSubscription,
        status: 'cancelled' as const,
        autoRenew: false
      }
      setCurrentSubscription(updatedSubscription)
      localStorage.setItem('userSubscription', JSON.stringify(updatedSubscription))
    }
  }

  const getCurrentPlan = () => {
    if (!currentSubscription) return subscriptionPlans[0]
    return subscriptionPlans.find(p => p.id === currentSubscription.planId) || subscriptionPlans[0]
  }

  const getFeatureAccess = (feature: string) => {
    if (!currentSubscription) return false
    return currentSubscription.features.includes(feature)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading subscription plans...</p>
        </div>
      </div>
    )
  }

  const currentPlan = getCurrentPlan()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Subscription Plans</h1>
                <p className="text-slate-600">Choose your cosmic journey level</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Current Plan</p>
                <p className="font-semibold text-slate-900 text-2xl">{currentPlan.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-xl ${currentPlan.bgColor} flex items-center justify-center`}>
                  <currentPlan.icon className={`w-8 h-8 ${currentPlan.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{currentPlan.name}</h2>
                  <p className="text-slate-600">{currentPlan.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      currentSubscription.status === 'active' ? 'bg-green-100 text-green-700' :
                      currentSubscription.status === 'cancelled' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {currentSubscription.status.charAt(0).toUpperCase() + currentSubscription.status.slice(1)}
                    </span>
                    <span className="text-sm text-slate-500">
                      {currentSubscription.autoRenew ? 'Auto-renewal enabled' : 'Auto-renewal disabled'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  ${currentPlan.price}
                  {currentPlan.price > 0 && <span className="text-lg text-slate-600">/{currentPlan.period}</span>}
                </p>
                {currentSubscription.status === 'active' && currentPlan.price > 0 && (
                  <button
                    onClick={cancelSubscription}
                    className="mt-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Subscription Plans */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-sm border-2 p-8 ${
                plan.popular ? 'border-violet-200 ring-2 ring-violet-100' : plan.borderColor
              } ${currentPlan.id === plan.id ? 'ring-2 ring-blue-200' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {currentPlan.id === plan.id && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${plan.bgColor} flex items-center justify-center`}>
                  <plan.icon className={`w-8 h-8 ${plan.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  ${plan.price}
                  {plan.price > 0 && <span className="text-lg text-slate-600">/{plan.period}</span>}
                </div>
                {plan.price === 0 && (
                  <p className="text-sm text-slate-500">Free forever</p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-slate-900">Features included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-slate-900">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-start space-x-2">
                        <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-center">
                {currentPlan.id === plan.id ? (
                  <button
                    disabled
                    className="w-full px-6 py-3 bg-slate-100 text-slate-500 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handlePlanSelection(plan.id)}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Access Matrix */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Feature Access Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-2 font-semibold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-2 font-semibold text-slate-900">Free</th>
                  <th className="text-center py-4 px-2 font-semibold text-slate-900">Premium</th>
                  <th className="text-center py-4 px-2 font-semibold text-slate-900">Admin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Daily Insights', free: '3/day', premium: 'Unlimited', admin: 'Unlimited' },
                  { feature: 'Numerology Analysis', free: 'Basic', premium: 'Advanced', admin: 'Advanced + Custom' },
                  { feature: 'Astrology Charts', free: 'Simple', premium: 'Detailed', admin: 'Detailed + Vedic' },
                  { feature: 'Expert Consultations', free: 'None', premium: '2/month', admin: 'Unlimited' },
                  { feature: 'Compatibility Check', free: 'Basic', premium: 'Advanced', admin: 'Advanced + AI' },
                  { feature: 'Dream Interpretation', free: 'Basic', premium: 'AI-Powered', admin: 'AI + Personal' },
                  { feature: 'Admin Dashboard', free: 'No', premium: 'No', admin: 'Yes' },
                  { feature: 'API Access', free: 'No', premium: 'No', admin: 'Yes' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="py-4 px-2 font-medium text-slate-900">{row.feature}</td>
                    <td className="py-4 px-2 text-center text-slate-600">{row.free}</td>
                    <td className="py-4 px-2 text-center text-purple-600 font-semibold">{row.premium}</td>
                    <td className="py-4 px-2 text-center text-amber-600 font-semibold">{row.admin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Complete Subscription</h3>
            <p className="text-slate-600 mb-6">
              You're about to subscribe to the {subscriptionPlans.find(p => p.id === selectedPlan)?.name} plan.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-900">Plan</span>
                <span className="text-slate-600">{subscriptionPlans.find(p => p.id === selectedPlan)?.name}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-900">Price</span>
                <span className="text-slate-600">
                  ${subscriptionPlans.find(p => p.id === selectedPlan)?.price}/{subscriptionPlans.find(p => p.id === selectedPlan)?.period}
                </span>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => processSubscription(selectedPlan)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg hover:from-violet-700 hover:to-blue-700 transition-all duration-200"
              >
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}