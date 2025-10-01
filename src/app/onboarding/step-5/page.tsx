'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Star, Sparkles, ArrowRight, ArrowLeft, Check, Bell, Mail, MessageCircle, Shield, Globe, Target, Crown, Diamond, Sun, Moon, Calendar } from 'lucide-react'

export default function OnboardingStep5() {
  const [notificationPreferences, setNotificationPreferences] = useState({
    dailyGuidance: true,
    compatibility: true,
    dreams: false,
    meditation: true,
    crystals: false,
    community: true,
    email: true,
    push: true,
    sms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const notificationTypes = [
    {
      id: 'dailyGuidance',
      title: 'Daily Guidance',
      description: 'Get your personalized daily cosmic insights',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'compatibility',
      title: 'Compatibility Updates',
      description: 'Notifications about new cosmic connections',
      icon: Target,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'dreams',
      title: 'Dream Insights',
      description: 'Interpretations and dream guidance',
      icon: Moon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'meditation',
      title: 'Meditation Reminders',
      description: 'Guided meditation and mindfulness sessions',
      icon: Sparkles,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'crystals',
      title: 'Crystal Guidance',
      description: 'Crystal recommendations and healing tips',
      icon: Diamond,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      id: 'community',
      title: 'Community Updates',
      description: 'New messages and community activities',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ]

  const deliveryMethods = [
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive updates via email',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Real-time notifications on your device',
      icon: Bell,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'sms',
      title: 'SMS Notifications',
      description: 'Text messages for important updates',
      icon: MessageCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ]

  useEffect(() => {
    // Load previous step data
    const step4Data = localStorage.getItem('onboardingStep4')
    if (!step4Data) {
      router.push('/onboarding/step-4')
    }
  }, [router])

  const handleNotificationToggle = (type: string) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }))
  }

  const handleNext = () => {
    // Save to localStorage
    localStorage.setItem('onboardingStep5', JSON.stringify(notificationPreferences))
    router.push('/onboarding/step-6')
  }

  const handleBack = () => {
    router.push('/onboarding/step-4')
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
            <span className="text-sm font-medium text-slate-600">Step 5 of 6</span>
            <span className="text-sm font-medium text-slate-600">83%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '83%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Notification Preferences</h1>
          <p className="text-slate-600">Choose how you'd like to receive cosmic updates</p>
        </div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Notification Types */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">What would you like to be notified about?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notificationTypes.map((type, index) => {
                const Icon = type.icon
                const isSelected = notificationPreferences[type.id as keyof typeof notificationPreferences]
                
                return (
                  <motion.button
                    key={type.id}
                    onClick={() => handleNotificationToggle(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? `${type.borderColor} ${type.bgColor} border-2`
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${type.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${type.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-900">{type.title}</h4>
                          {isSelected && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{type.description}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Delivery Methods */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">How would you like to receive notifications?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deliveryMethods.map((method, index) => {
                const Icon = method.icon
                const isSelected = notificationPreferences[method.id as keyof typeof notificationPreferences]
                
                return (
                  <motion.button
                    key={method.id}
                    onClick={() => handleNotificationToggle(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? `${method.borderColor} ${method.bgColor} border-2`
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${method.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-900">{method.title}</h4>
                          {isSelected && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{method.description}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
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
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </motion.div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            You can change these settings anytime in your notification preferences.
          </p>
        </div>
      </motion.div>
    </div>
  )
}


