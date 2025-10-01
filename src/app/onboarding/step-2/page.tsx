'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Star, Sparkles, Heart, Zap, ArrowRight, ArrowLeft, Check } from 'lucide-react'

export default function OnboardingStep2() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const interests = [
    {
      id: 'astrology',
      title: 'Astrology',
      description: 'Learn about your zodiac sign and planetary influences',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'numerology',
      title: 'Numerology',
      description: 'Discover the power of numbers in your life',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'compatibility',
      title: 'Compatibility',
      description: 'Find your cosmic connections with others',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'dreams',
      title: 'Dream Interpretation',
      description: 'Understand the messages in your dreams',
      icon: Sparkles,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'meditation',
      title: 'Meditation',
      description: 'Connect with your inner self through guided practices',
      icon: Star,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'crystals',
      title: 'Crystals & Healing',
      description: 'Explore the healing power of crystals',
      icon: Sparkles,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    }
  ]

  useEffect(() => {
    // Load previous step data
    const step1Data = localStorage.getItem('onboardingStep1')
    if (!step1Data) {
      router.push('/onboarding/step-1')
    }
  }, [router])

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleNext = () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest to continue')
      return
    }

    // Save to localStorage
    localStorage.setItem('onboardingStep2', JSON.stringify(selectedInterests))
    router.push('/onboarding/step-3')
  }

  const handleBack = () => {
    router.push('/onboarding/step-1')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-600">Step 2 of 6</span>
            <span className="text-sm font-medium text-slate-600">33%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '33%' }}
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">What Interests You?</h1>
          <p className="text-slate-600">Select the areas you'd like to explore in your cosmic journey</p>
        </div>

        {/* Interests Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {interests.map((interest, index) => {
              const Icon = interest.icon
              const isSelected = selectedInterests.includes(interest.id)
              
              return (
                <motion.button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? `${interest.borderColor} ${interest.bgColor} border-2`
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${interest.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${interest.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900">{interest.title}</h3>
                        {isSelected && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{interest.description}</p>
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
            Don't worry, you can always change your preferences later in settings.
          </p>
        </div>
      </motion.div>
    </div>
  )
}


