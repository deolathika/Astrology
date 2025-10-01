'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Star, Sparkles, ArrowRight, ArrowLeft, Check, Heart, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Moon, Calendar } from 'lucide-react'

export default function OnboardingStep4() {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const preferences = [
    {
      id: 'daily-guidance',
      title: 'Daily Guidance',
      description: 'Get personalized daily cosmic insights and advice',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      features: ['Daily horoscope', 'Lucky numbers', 'Mood guidance', 'Energy levels']
    },
    {
      id: 'compatibility',
      title: 'Compatibility',
      description: 'Discover your cosmic connections with others',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      features: ['Romantic compatibility', 'Friendship analysis', 'Business partnerships', 'Family dynamics']
    },
    {
      id: 'dreams',
      title: 'Dream Interpretation',
      description: 'Understand the messages in your dreams',
      icon: Moon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      features: ['Dream journal', 'Symbol interpretation', 'Lucid dreaming', 'Sleep guidance']
    },
    {
      id: 'meditation',
      title: 'Meditation & Mindfulness',
      description: 'Connect with your inner self through guided practices',
      icon: Sparkles,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      features: ['Guided meditations', 'Breathing exercises', 'Chakra alignment', 'Spiritual growth']
    },
    {
      id: 'crystals',
      title: 'Crystals & Healing',
      description: 'Explore the healing power of crystals and energy work',
      icon: Diamond,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      features: ['Crystal recommendations', 'Energy healing', 'Chakra stones', 'Healing rituals']
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with like-minded cosmic souls',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: ['Cosmic chat', 'Group discussions', 'Expert consultations', 'Shared experiences']
    }
  ]

  useEffect(() => {
    // Load previous step data
    const step3Data = localStorage.getItem('onboardingStep3')
    if (!step3Data) {
      router.push('/onboarding/step-3')
    }
  }, [router])

  const handlePreferenceToggle = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId) 
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    )
  }

  const handleNext = () => {
    if (selectedPreferences.length === 0) {
      alert('Please select at least one preference to continue')
      return
    }

    // Save to localStorage
    localStorage.setItem('onboardingStep4', JSON.stringify(selectedPreferences))
    router.push('/onboarding/step-5')
  }

  const handleBack = () => {
    router.push('/onboarding/step-3')
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
            <span className="text-sm font-medium text-slate-600">Step 4 of 6</span>
            <span className="text-sm font-medium text-slate-600">67%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '67%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Choose Your Preferences</h1>
          <p className="text-slate-600">Select the features that interest you most</p>
        </div>

        {/* Preferences Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {preferences.map((preference, index) => {
              const Icon = preference.icon
              const isSelected = selectedPreferences.includes(preference.id)
              
              return (
                <motion.button
                  key={preference.id}
                  onClick={() => handlePreferenceToggle(preference.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? `${preference.borderColor} ${preference.bgColor} border-2`
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${preference.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${preference.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900">{preference.title}</h3>
                        {isSelected && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{preference.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {preference.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
            You can always change these preferences later in your settings.
          </p>
        </div>
      </motion.div>
    </div>
  )
}


