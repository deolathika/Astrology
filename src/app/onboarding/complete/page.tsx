'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  User, Calendar, Clock, MapPin, Star, Heart, Sparkles, 
  ChevronRight, ChevronLeft, Check, X, Globe, Shield,
  Smartphone, Settings, Crown, CheckCircle, Battery, Wifi, Signal
} from 'lucide-react'
import { ZodiacCalculator } from '@/lib/astrology/zodiac-calculator'
import { GeographyService } from '@/lib/geography/country-city-data'
import { LLMAstrologyService } from '@/lib/ai/llm-astrology-service'
import { AstrologyValidator } from '@/lib/astrology/astrology-validator'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  fields: {
    id: string
    label: string
    type: string
    placeholder: string
    required: boolean
    options?: string[]
  }[]
  mobileOptimized?: boolean
  showProgress?: boolean
  showSkip?: boolean
}

interface UserAccountType {
  id: string
  name: string
  description: string
  features: string[]
  limitations: string[]
  price: string
  icon: React.ComponentType<any>
  color: string
  recommended?: boolean
}

const accountTypes: UserAccountType[] = [
  {
    id: 'free',
    name: 'Free User',
    description: 'Perfect for getting started with cosmic guidance',
    features: [
      'Daily cosmic insights',
      'Basic numerology readings',
      'Simple astrology charts',
      'Community access',
      'Basic compatibility check'
    ],
    limitations: [
      '3 readings per day',
      'Basic chart only',
      'No expert consultations'
    ],
    price: 'Free',
    icon: Heart,
    color: 'from-slate-500 to-slate-600'
  },
  {
    id: 'premium',
    name: 'Premium User',
    description: 'Complete cosmic guidance for your daily life',
    features: [
      'Unlimited daily insights',
      'Advanced numerology analysis',
      'Detailed astrology charts',
      'Expert consultations (2/month)',
      'Advanced compatibility analysis',
      'AI-powered dream interpretations',
      'Personalized cosmic calendar'
    ],
    limitations: [],
    price: '$19.99/month',
    icon: Crown,
    color: 'from-violet-500 to-purple-600',
    recommended: true
  },
  {
    id: 'admin',
    name: 'Admin Account',
    description: 'Full control and customization for the entire application',
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
      'Custom integrations'
    ],
    limitations: [],
    price: 'Contact Us',
    icon: Shield,
    color: 'from-amber-500 to-orange-600'
  }
]

export default function CompleteOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedAccountType, setSelectedAccountType] = useState<string>('')
  const [detectedZodiacSigns, setDetectedZodiacSigns] = useState<any>(null)
  const [countries, setCountries] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [isLoadingLLM, setIsLoadingLLM] = useState(false)
  const [llmAnalysis, setLlmAnalysis] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    timezone: '',
    deviceType: 'mobile',
    system: 'western',
    language: 'en',
    accountType: '',
    zodiacSign: '',
    preferences: {
      astrology: true,
      numerology: true,
      notifications: true,
      community: false,
      pushNotifications: true,
      dailyReminders: true,
      cosmicAlerts: true,
      darkMode: false,
      hapticFeedback: true
    }
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Load countries on component mount
    const loadCountries = () => {
      const countryList = GeographyService.getCountries()
      setCountries(countryList)
    }
    
    loadCountries()
  }, [])

  useEffect(() => {
    // Load cities when country is selected
    if (selectedCountry) {
      const cityList = GeographyService.getCitiesByCountry(selectedCountry)
      setCities(cityList)
      setSelectedCity('') // Reset city selection
    }
  }, [selectedCountry])

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Daily Secrets',
      description: 'Discover the cosmic wisdom that awaits you. Let\'s create your personalized cosmic profile.',
      icon: Sparkles,
      fields: [],
      mobileOptimized: true,
      showProgress: true,
      showSkip: false
    },
    {
      id: 'account-type',
      title: 'Choose Your Account Type',
      description: 'Select the account type that best fits your cosmic journey needs',
      icon: Crown,
      fields: [],
      mobileOptimized: true,
      showProgress: true,
      showSkip: false
    },
    {
      id: 'device',
      title: 'Device Setup',
      description: 'Tell us about your device for the best mobile experience.',
      icon: Smartphone,
      fields: [
        {
          id: 'deviceType',
          label: 'Primary Device',
          type: 'select',
          placeholder: 'Select your primary device',
          required: true,
          options: ['mobile', 'tablet', 'desktop']
        }
      ],
      mobileOptimized: true,
      showProgress: true,
      showSkip: true
    },
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself to create your cosmic profile.',
      icon: User,
      fields: [
        {
          id: 'name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'Enter your full name',
          required: true
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'Enter your email',
          required: true
        }
      ],
      mobileOptimized: true,
      showProgress: true,
      showSkip: true
    },
    {
      id: 'birth-details',
      title: 'Birth Details',
      description: 'Your exact birth details are crucial for accurate cosmic readings.',
      icon: Calendar,
      fields: [
        {
          id: 'birthDate',
          label: 'Birth Date',
          type: 'date',
          placeholder: 'Select your birth date',
          required: true
        },
        {
          id: 'birthTime',
          label: 'Birth Time',
          type: 'time',
          placeholder: 'Select your birth time',
          required: true
        },
        {
          id: 'birthPlace',
          label: 'Birth Place',
          type: 'text',
          placeholder: 'Enter your city, country',
          required: true
        },
        {
          id: 'timezone',
          label: 'Timezone',
          type: 'text',
          placeholder: 'e.g., America/New_York',
          required: true
        }
      ],
      mobileOptimized: true,
      showProgress: true,
      showSkip: true
    },
    {
      id: 'cosmic-system',
      title: 'Cosmic System Preference',
      description: 'Choose your preferred astrological system.',
      icon: Globe,
      fields: [
        {
          id: 'system',
          label: 'Astrology System',
          type: 'select',
          placeholder: 'Select your preferred system',
          required: true,
          options: ['western', 'vedic', 'chinese', 'hybrid']
        },
        {
          id: 'language',
          label: 'Language',
          type: 'select',
          placeholder: 'Select your preferred language',
          required: true,
          options: ['en', 'es', 'fr', 'si', 'ta', 'hi', 'zh']
        }
      ],
      mobileOptimized: true,
      showProgress: true,
      showSkip: true
    },
    {
      id: 'preferences',
      title: 'Personalize Your Experience',
      description: 'Tailor Daily Secrets to your needs.',
      icon: Settings,
      fields: [
        {
          id: 'astrology',
          label: 'Receive Astrology Insights',
          type: 'checkbox',
          placeholder: '',
          required: false
        },
        {
          id: 'numerology',
          label: 'Receive Numerology Insights',
          type: 'checkbox',
          placeholder: '',
          required: false
        },
        {
          id: 'notifications',
          label: 'Enable Notifications',
          type: 'checkbox',
          placeholder: '',
          required: false
        },
        {
          id: 'community',
          label: 'Join Cosmic Community',
          type: 'checkbox',
          placeholder: '',
          required: false
        },
        {
          id: 'pushNotifications',
          label: 'Push Notifications',
          type: 'checkbox',
          placeholder: '',
          required: false
        },
        {
          id: 'dailyReminders',
          label: 'Daily Reminders',
          type: 'checkbox',
          placeholder: '',
          required: false
        },
        {
          id: 'cosmicAlerts',
          label: 'Cosmic Alerts',
          type: 'checkbox',
          placeholder: '',
          required: false
        },
        {
          id: 'darkMode',
          label: 'Dark Mode',
          type: 'checkbox',
          placeholder: '',
          required: false
        },
        {
          id: 'hapticFeedback',
          label: 'Haptic Feedback',
          type: 'checkbox',
          placeholder: '',
          required: false
        }
      ],
      mobileOptimized: true,
      showProgress: true,
      showSkip: true
    },
    {
      id: 'ready',
      title: 'You\'re All Set!',
      description: 'Your cosmic journey awaits. Get ready to unlock daily wisdom and insights.',
      icon: CheckCircle,
      fields: [],
      mobileOptimized: true,
      showProgress: true,
      showSkip: false
    }
  ]

  const handleInputChange = (id: string, value: string | boolean) => {
    if (id in formData.preferences) {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [id]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [id]: value }))
      
      // Auto-detect zodiac sign when birth date is entered
      if (id === 'birthDate' && typeof value === 'string' && value) {
        const zodiacResult = ZodiacCalculator.autoDetectZodiacSign(value)
        if (zodiacResult) {
          setDetectedZodiacSigns(zodiacResult)
          setFormData(prev => ({ 
            ...prev, 
            zodiacSign: zodiacResult.western,
            system: 'western' // Default to western
          }))
        }
      }
    }
  }

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
    setFormData(prev => ({ ...prev, birthPlace: countryCode }))
  }

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName)
    setFormData(prev => ({ ...prev, birthPlace: `${cityName}, ${selectedCountry}` }))
  }

  const generateCompleteAnalysis = async () => {
    if (!formData.birthDate || !formData.birthTime || !selectedCountry || !selectedCity || !formData.name || !formData.email) {
      return
    }

    setIsLoadingLLM(true)
    try {
      // Step 1: Validate all data
      const validatedData = await AstrologyValidator.validateBirthData({
        fullName: formData.name,
        email: formData.email,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime,
        birthPlace: {
          country: selectedCountry,
          city: selectedCity
        }
      })

      if (!validatedData.isValid) {
        console.error('Validation errors:', validatedData.errors)
        return
      }

      // Step 2: Get complete analysis
      const response = await fetch('/api/astro/complete-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          birthPlace: {
            country: selectedCountry,
            city: selectedCity
          }
        })
      })

      const analysis = await response.json()
      setLlmAnalysis(analysis)
    } catch (error) {
      console.error('Complete Analysis Error:', error)
    } finally {
      setIsLoadingLLM(false)
    }
  }

  const handleNext = () => {
    if (isStepValid()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // Onboarding complete, save data and redirect
        localStorage.setItem('userData', JSON.stringify(formData))
        localStorage.setItem('onboardingComplete', 'true')
        
        // Redirect based on device type
        const deviceType = formData.deviceType || 'mobile'
        if (deviceType === 'mobile' || deviceType === 'tablet') {
          router.push('/mobile-home')
        } else {
          router.push('/main')
        }
      }
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const isStepValid = () => {
    const currentStepData = steps[currentStep]
    
    // Special validation for account type step
    if (currentStepData.id === 'account-type') {
      return selectedAccountType !== ''
    }
    
    if (currentStepData.fields.length === 0) return true
    
    return currentStepData.fields.every(field => {
      if (!field.required) return true
      if (field.id in formData.preferences) {
        return formData.preferences[field.id as keyof typeof formData.preferences] !== undefined
      }
      return formData[field.id as keyof typeof formData] !== ''
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} mx-auto`}>
        {/* Mobile Status Bar */}
        {isMobile && (
          <div className="flex justify-between items-center mb-4 text-xs text-slate-600">
            <div className="flex items-center space-x-1">
              <span>9:41</span>
            </div>
            <div className="flex items-center space-x-1">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {steps[currentStep].showProgress && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="font-medium">Step {currentStep + 1} of {steps.length}</span>
              <span className="font-medium">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            {(() => {
              const Icon = steps[currentStep].icon;
              return <Icon className="w-8 h-8 text-white" />;
            })()}
          </div>
          <h1 className={`font-bold text-gray-900 mb-2 ${isMobile ? 'text-xl' : 'text-2xl'}`} style={{ 
            color: '#1f2937', 
            fontWeight: '700',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            {steps[currentStep].title}
          </h1>
          <p className={`text-gray-700 ${isMobile ? 'text-sm' : 'text-base'}`} style={{ 
            color: '#374151',
            fontWeight: '500',
            lineHeight: '1.6'
          }}>
            {steps[currentStep].description}
          </p>
        </motion.div>

        {/* Account Type Selection */}
        {steps[currentStep].id === 'account-type' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mb-6"
          >
            {accountTypes.map((accountType, index) => (
              <motion.div
                key={accountType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedAccountType === accountType.id
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 bg-white hover:border-violet-300'
                }`}
                onClick={() => {
                  setSelectedAccountType(accountType.id)
                  setFormData(prev => ({ ...prev, accountType: accountType.id }))
                }}
              >
                {accountType.recommended && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Recommended
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${accountType.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <accountType.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{accountType.name}</h3>
                      <span className="text-violet-600 font-bold">{accountType.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{accountType.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Features:</span>
                        <ul className="mt-1 space-y-1">
                          {accountType.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2 text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-xs">{feature}</span>
                            </li>
                          ))}
                          {accountType.features.length > 3 && (
                            <li className="text-xs text-gray-500">
                              +{accountType.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      {accountType.limitations.length > 0 && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Limitations:</span>
                          <ul className="mt-1 space-y-1">
                            {accountType.limitations.slice(0, 2).map((limitation, limitationIndex) => (
                              <li key={limitationIndex} className="flex items-center space-x-2 text-gray-500">
                                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <span className="text-xs">{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Zodiac Sign Auto-Detection Display */}
        {detectedZodiacSigns && steps[currentStep].id === 'birth-details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-5 h-5 text-violet-600" />
              <h3 className="text-lg font-semibold text-violet-900">Auto-Detected Zodiac Signs</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-violet-100">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl">{detectedZodiacSigns.info?.symbol}</span>
                  <span className="font-semibold text-slate-900">Western</span>
                </div>
                <p className="text-sm text-slate-600">{detectedZodiacSigns.western}</p>
                <p className="text-xs text-slate-500">{detectedZodiacSigns.info?.element} • {detectedZodiacSigns.info?.quality}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-violet-100">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl">🐉</span>
                  <span className="font-semibold text-slate-900">Chinese</span>
                </div>
                <p className="text-sm text-slate-600">{detectedZodiacSigns.chinese}</p>
                <p className="text-xs text-slate-500">Year of {detectedZodiacSigns.chinese}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-violet-100">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl">🕉️</span>
                  <span className="font-semibold text-slate-900">Vedic</span>
                </div>
                <p className="text-sm text-slate-600">{detectedZodiacSigns.vedic}</p>
                <p className="text-xs text-slate-500">Rashi</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-violet-100">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl">🇱🇰</span>
                  <span className="font-semibold text-slate-900">Sri Lankan</span>
                </div>
                <p className="text-sm text-slate-600">{detectedZodiacSigns.sriLankan}</p>
                <p className="text-xs text-slate-500">Traditional</p>
              </div>
            </div>
            <p className="text-xs text-violet-700 mt-3 text-center">
              ✨ Your zodiac signs have been automatically detected from your birth date!
            </p>
          </motion.div>
        )}

        {/* LLM Analysis Section */}
        {detectedZodiacSigns && formData.birthDate && formData.birthTime && selectedCountry && selectedCity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">AI-Powered Analysis</h3>
              </div>
              <button
                onClick={generateCompleteAnalysis}
                disabled={isLoadingLLM || !formData.birthDate || !formData.birthTime || !selectedCountry || !selectedCity || !formData.name || !formData.email}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoadingLLM ? 'Analyzing...' : 'Generate Complete Analysis'}
              </button>
            </div>
            
            {isLoadingLLM && (
              <div className="flex items-center justify-center py-4">
                <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="ml-3 text-blue-700">Generating AI analysis...</span>
              </div>
            )}
            
            {llmAnalysis && llmAnalysis.success && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h4 className="font-semibold text-slate-900 mb-2">Personality</h4>
                    <p className="text-sm text-slate-600">{llmAnalysis.data.interpretations.personality}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h4 className="font-semibold text-slate-900 mb-2">Career</h4>
                    <p className="text-sm text-slate-600">{llmAnalysis.data.interpretations.career}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h4 className="font-semibold text-slate-900 mb-2">Strengths</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {llmAnalysis.data.interpretations.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h4 className="font-semibold text-slate-900 mb-2">Challenges</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {llmAnalysis.data.interpretations.challenges.map((challenge: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <X className="w-4 h-4 text-red-500" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {llmAnalysis.data.predictions && (
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h4 className="font-semibold text-slate-900 mb-2">Predictions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">Daily:</span>
                        <span className="ml-2 text-slate-600">{llmAnalysis.data.predictions.daily}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Weekly:</span>
                        <span className="ml-2 text-slate-600">{llmAnalysis.data.predictions.weekly}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">AI analysis completed with NASA data accuracy!</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Form Fields */}
        <AnimatePresence>
          {steps[currentStep].fields.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 mb-6"
            >
              {steps[currentStep].fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800" style={{ 
                    color: '#1f2937',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.id as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-base"
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.preferences[field.id as keyof typeof formData.preferences] as boolean}
                        onChange={(e) => handleInputChange(field.id, e.target.checked)}
                        className="w-5 h-5 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                      />
                      <span className="text-base text-gray-700">{field.label}</span>
                    </label>
                  ) : field.id === 'birthPlace' ? (
                    <div className="space-y-4">
                      {/* Country Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          value={selectedCountry}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-base"
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* City Selection */}
                      {selectedCountry && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <select
                            value={selectedCity}
                            onChange={(e) => handleCityChange(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-base"
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name} {city.isCapital && '(Capital)'}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      {/* Coordinates Display */}
                      {selectedCity && (
                        <div className="bg-slate-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-slate-600" />
                            <span className="text-sm font-medium text-slate-700">Coordinates</span>
                          </div>
                          <div className="text-sm text-slate-600">
                            {(() => {
                              const city = cities.find(c => c.name === selectedCity)
                              return city ? `${city.coordinates.latitude.toFixed(4)}°, ${city.coordinates.longitude.toFixed(4)}°` : ''
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.id as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-base"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className={`flex ${currentStep === 0 ? 'justify-end' : 'justify-between'} mt-8`}>
          {currentStep > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="flex items-center space-x-2 px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </motion.button>
          )}
          
          <div className="flex items-center space-x-3">
            {steps[currentStep].showSkip && currentStep < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip
              </button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center space-x-2 px-5 py-2 rounded-full transition-colors ${
                isStepValid()
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
