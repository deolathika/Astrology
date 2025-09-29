'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Sun, Moon, Check, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react'
interface OnboardingData {
  fullName: string
  email: string
  birthDate: string
  birthTime: string
  birthPlace: string
  latitude: number
  longitude: number
  timezone: string
  zodiacSystem: string
  language: string
  interests: string[]
}

const zodiacSystems = [
  { id: 'western', name: 'Western', description: 'Traditional Western astrology', icon: Sun },
  { id: 'vedic', name: 'Vedic', description: 'Ancient Indian astrology', icon: Star },
  { id: 'chinese', name: 'Chinese', description: 'Chinese zodiac system', icon: Moon },
  { id: 'sri_lankan', name: 'Sri Lankan', description: 'Sri Lankan astrology', icon: Heart }
]

const languages = [
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'si', name: 'සිංහල', flag: '🇱🇰' },
  { id: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { id: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { id: 'zh', name: '中文', flag: '🇨🇳' }
]

const interests = [
  { id: 'daily_guidance', name: 'Daily Guidance', icon: Sun },
  { id: 'numerology', name: 'Numerology', icon: Star },
  { id: 'dreams', name: 'Dream Interpretation', icon: Moon },
  { id: 'compatibility', name: 'Compatibility', icon: Heart },
  { id: 'career', name: 'Career Guidance', icon: Sparkles },
  { id: 'love', name: 'Love & Relationships', icon: Heart }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<OnboardingData>({
    fullName: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: 0,
    longitude: 0,
    timezone: '',
    zodiacSystem: 'western',
    language: 'en',
    interests: []
  })

  const steps = [
    { id: 'welcome', title: 'Welcome to Your Cosmic Journey' },
    { id: 'personal', title: 'Personal Information' },
    { id: 'birth', title: 'Birth Details' },
    { id: 'preferences', title: 'Cosmic Preferences' },
    { id: 'interests', title: 'Your Interests' },
    { id: 'complete', title: 'Welcome to the Cosmos!' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      localStorage.setItem('daily-secrets-profile', JSON.stringify(formData))
      localStorage.setItem('daily-secrets-onboarding-complete', 'true')
      window.location.href = '/'
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInterestToggle = (interestId: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interestId)
        ? formData.interests.filter(id => id !== interestId)
        : [...formData.interests, interestId]
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-electric-violet to-supernova-gold rounded-full flex items-center justify-center"
            >
              <Star className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-cosmic-gradient-text mb-6">
              Welcome to Daily Secrets
            </h1>
            
            <p className="text-stellar-gray-light text-lg mb-8 max-w-2xl mx-auto">
              Discover the secrets of the universe through personalized astrology, 
              numerology, and cosmic guidance. Your journey to self-discovery starts here.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="cosmic-card text-center">
                <Sun className="w-8 h-8 text-supernova-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-starlight-white mb-2">
                  Daily Guidance
                </h3>
                <p className="text-stellar-gray-light text-sm">
                  Get personalized cosmic insights every day
                </p>
              </div>
              
              <div className="cosmic-card text-center">
                <Star className="w-8 h-8 text-electric-violet mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-starlight-white mb-2">
                  Numerology
                </h3>
                <p className="text-stellar-gray-light text-sm">
                  Discover your life path and destiny numbers
                </p>
              </div>
              
              <div className="cosmic-card text-center">
                <Moon className="w-8 h-8 text-stellar-pink mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-starlight-white mb-2">
                  Dream Analysis
                </h3>
                <p className="text-stellar-gray-light text-sm">
                  Interpret your dreams with cosmic wisdom
                </p>
              </div>
            </div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            key="personal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-8 text-center">
              Tell Us About Yourself
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="cosmic-input w-full"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="cosmic-input w-full"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="birth"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-8 text-center">
              Your Birth Details
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="cosmic-input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Birth Time
                  </label>
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                    className="cosmic-input w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Birth Place
                </label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                  className="cosmic-input w-full"
                  placeholder="Enter your birth place"
                />
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-8 text-center">
              Your Cosmic Preferences
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-starlight-white mb-6">
                  Zodiac System
                </h3>
                <div className="space-y-4">
                  {zodiacSystems.map((system) => {
                    const Icon = system.icon
                    return (
                      <button
                        key={system.id}
                        onClick={() => setFormData({...formData, zodiacSystem: system.id})}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          formData.zodiacSystem === system.id
                            ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                            : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <Icon className="w-6 h-6" />
                          <div>
                            <div className="font-semibold">{system.name}</div>
                            <div className="text-sm opacity-75">{system.description}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-starlight-white mb-6">
                  Language
                </h3>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setFormData({...formData, language: lang.id})}
                      className={`w-full p-3 rounded-xl border transition-all text-left ${
                        formData.language === lang.id
                          ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                          : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-semibold">{lang.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="interests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-8 text-center">
              What Interests You?
            </h2>
            
            <p className="text-stellar-gray-light text-center mb-8">
              Select the areas you'd like to explore (you can change these later)
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {interests.map((interest) => {
                const Icon = interest.icon
                const isSelected = formData.interests.includes(interest.id)
                
                return (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`p-6 rounded-xl border transition-all text-center ${
                      isSelected
                        ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                        : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-4" />
                    <div className="font-semibold">{interest.name}</div>
                    {isSelected && (
                      <Check className="w-5 h-5 mx-auto mt-2 text-electric-violet" />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-electric-violet via-supernova-gold to-stellar-pink rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-cosmic-gradient-text mb-6">
              Welcome to the Cosmos!
            </h1>
            
            <p className="text-stellar-gray-light text-lg mb-8 max-w-2xl mx-auto">
              Your cosmic profile has been created. Get ready to discover the secrets 
              of the universe through personalized astrology and numerology insights.
            </p>
            
            <div className="cosmic-card max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-starlight-white mb-4">
                Your Cosmic Profile Summary
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Name:</span>
                  <span className="text-starlight-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Zodiac System:</span>
                  <span className="text-starlight-white capitalize">{formData.zodiacSystem}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Language:</span>
                  <span className="text-starlight-white">
                    {languages.find(l => l.id === formData.language)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Interests:</span>
                  <span className="text-starlight-white">{formData.interests.length} selected</span>
                </div>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-stellar-gray-light text-sm">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-stellar-gray-light text-sm">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="cosmic-progress">
              <motion.div
                className="cosmic-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between max-w-2xl mx-auto mt-12">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                currentStep === 0
                  ? 'bg-cosmic-navy text-stellar-gray-light cursor-not-allowed'
                  : 'bg-cosmic-navy border border-electric-violet text-electric-violet hover:bg-electric-violet hover:text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={handleNext}
              className="cosmic-button flex items-center space-x-2"
            >
              <span>
                {currentStep === steps.length - 1 ? 'Start Your Journey' : 'Next'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
