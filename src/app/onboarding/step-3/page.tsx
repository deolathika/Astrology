'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sun, Moon, Star, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react'

export default function OnboardingStep3() {
  const [selectedSystem, setSelectedSystem] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const zodiacSystems = [
    {
      id: 'western',
      title: 'Western Astrology',
      description: 'Traditional sun sign astrology based on tropical zodiac',
      icon: Sun,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      features: ['Sun Signs', 'Moon Signs', 'Rising Signs', 'Planetary Aspects']
    },
    {
      id: 'vedic',
      title: 'Vedic Astrology',
      description: 'Ancient Indian sidereal astrology system',
      icon: Moon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      features: ['Nakshatras', 'Dasha Periods', 'Vedic Houses', 'Planetary Strengths']
    },
    {
      id: 'chinese',
      title: 'Chinese Zodiac',
      description: 'Year-based animal zodiac system',
      icon: Star,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      features: ['Animal Signs', 'Five Elements', 'Yin/Yang', 'Compatibility']
    },
    {
      id: 'sri-lankan',
      title: 'Sri Lankan Astrology',
      description: 'Traditional Sinhala astrology system',
      icon: Sparkles,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      features: ['Local Traditions', 'Cultural Context', 'Regional Practices', 'Sinhala Calendar']
    }
  ]

  useEffect(() => {
    // Load previous step data
    const step2Data = localStorage.getItem('onboardingStep2')
    if (!step2Data) {
      router.push('/onboarding/step-2')
    }
  }, [router])

  const handleSystemSelect = (systemId: string) => {
    setSelectedSystem(systemId)
  }

  const handleNext = () => {
    if (!selectedSystem) {
      alert('Please select a zodiac system to continue')
      return
    }

    // Save to localStorage
    localStorage.setItem('onboardingStep3', JSON.stringify(selectedSystem))
    router.push('/onboarding/step-4')
  }

  const handleBack = () => {
    router.push('/onboarding/step-2')
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
            <span className="text-sm font-medium text-slate-600">Step 3 of 6</span>
            <span className="text-sm font-medium text-slate-600">50%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Choose Your Zodiac System</h1>
          <p className="text-slate-600">Select the astrological system that resonates with you</p>
        </div>

        {/* Systems Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {zodiacSystems.map((system, index) => {
              const Icon = system.icon
              const isSelected = selectedSystem === system.id
              
              return (
                <motion.button
                  key={system.id}
                  onClick={() => handleSystemSelect(system.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? `${system.borderColor} ${system.bgColor} border-2`
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${system.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${system.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900">{system.title}</h3>
                        {isSelected && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{system.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {system.features.map((feature, featureIndex) => (
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
            You can explore multiple systems later, but we'll start with your preferred one.
          </p>
        </div>
      </motion.div>
    </div>
  )
}


