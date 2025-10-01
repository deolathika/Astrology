'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Star, Sparkles, ArrowRight, ArrowLeft, Check, Heart, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Moon, Calendar, CheckCircle } from 'lucide-react'

export default function OnboardingStep6() {
  const [selectedPlan, setSelectedPlan] = useState<string>('free')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const plans = [
    {
      id: 'free',
      title: 'Free Plan',
      description: 'Perfect for getting started with cosmic guidance',
      price: '$0',
      period: 'forever',
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: [
        'Daily horoscope',
        'Basic numerology',
        'Simple compatibility',
        'Community access',
        'Basic dream interpretation'
      ],
      limitations: [
        'Limited daily guidance',
        'Basic numerology only',
        'Simple compatibility scores'
      ]
    },
    {
      id: 'premium',
      title: 'Premium Plan',
      description: 'Unlock the full power of cosmic wisdom',
      price: '$9.99',
      period: 'per month',
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      features: [
        'Unlimited daily guidance',
        'Advanced numerology',
        'Detailed compatibility analysis',
        'Premium community features',
        'AI-powered dream interpretation',
        'Personalized meditation sessions',
        'Crystal recommendations',
        'Priority support'
      ],
      popular: true
    },
    {
      id: 'admin',
      title: 'Admin Plan',
      description: 'Full access to all features and administration',
      price: '$29.99',
      period: 'per month',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      features: [
        'Everything in Premium',
        'Admin dashboard',
        'User management',
        'Analytics and insights',
        'Content moderation',
        'API access',
        'Custom integrations',
        '24/7 priority support'
      ]
    }
  ]

  useEffect(() => {
    // Load previous step data
    const step5Data = localStorage.getItem('onboardingStep5')
    if (!step5Data) {
      router.push('/onboarding/step-5')
    }
  }, [router])

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    try {
      // Save all onboarding data
      const step1Data = localStorage.getItem('onboardingStep1')
      const step2Data = localStorage.getItem('onboardingStep2')
      const step3Data = localStorage.getItem('onboardingStep3')
      const step4Data = localStorage.getItem('onboardingStep4')
      const step5Data = localStorage.getItem('onboardingStep5')
      
      const completeProfile = {
        ...JSON.parse(step1Data || '{}'),
        interests: JSON.parse(step2Data || '[]'),
        zodiacSystem: JSON.parse(step3Data || '""'),
        preferences: JSON.parse(step4Data || '[]'),
        notifications: JSON.parse(step5Data || '{}'),
        plan: selectedPlan,
        onboardingComplete: true,
        completedAt: new Date().toISOString()
      }
      
      // Save complete profile
      localStorage.setItem('userData', JSON.stringify(completeProfile))
      localStorage.setItem('onboardingComplete', 'true')
      
      // Redirect to main app
      router.push('/main')
    } catch (error) {
      console.error('Error completing onboarding:', error)
      alert('There was an error completing your setup. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/onboarding/step-5')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-600">Step 6 of 6</span>
            <span className="text-sm font-medium text-slate-600">100%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Choose Your Plan</h1>
          <p className="text-slate-600">Select the plan that best fits your cosmic journey</p>
        </div>

        {/* Plans */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const isSelected = selectedPlan === plan.id
              
              return (
                <motion.button
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? `${plan.borderColor} ${plan.bgColor} border-2`
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${plan.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${plan.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-900">{plan.title}</h3>
                        {isSelected && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{plan.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-600">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 text-sm">Features:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {plan.limitations && plan.limitations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <h4 className="font-semibold text-slate-900 text-sm mb-2">Limitations:</h4>
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-center space-x-2">
                          <div className="w-4 h-4 border border-slate-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-slate-600">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <motion.button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </motion.button>

            <motion.button
              type="button"
              onClick={handleComplete}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Completing Setup...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Setup
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            You can upgrade or downgrade your plan anytime in your account settings.
          </p>
        </div>
      </motion.div>
    </div>
  )
}


