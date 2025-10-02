'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Star, User, Calendar, Clock, MapPin, 
  ChevronRight, CheckCircle, Globe, Sparkles
} from 'lucide-react'

export default function SimpleOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    timezone: 'UTC',
    system: 'western',
    language: 'en'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Daily Secrets',
      description: 'Let\'s create your cosmic profile in just a few steps.',
      icon: Star,
      fields: []
    },
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself to personalize your experience.',
      icon: User,
      fields: [
        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true },
        { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true }
      ]
    },
    {
      id: 'birth',
      title: 'Birth Information',
      description: 'This information is essential for accurate cosmic readings.',
      icon: Calendar,
      fields: [
        { id: 'birthDate', label: 'Birth Date', type: 'date', placeholder: 'Select your birth date', required: true },
        { id: 'birthTime', label: 'Birth Time', type: 'time', placeholder: 'Enter your birth time', required: false },
        { id: 'birthPlace', label: 'Birth Place', type: 'text', placeholder: 'Enter your birth city', required: true }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Choose your preferred astrology system and language.',
      icon: Globe,
      fields: [
        { id: 'system', label: 'Astrology System', type: 'select', placeholder: 'Choose system', required: true, options: ['western', 'vedic', 'chinese', 'sri-lankan'] },
        { id: 'language', label: 'Language', type: 'select', placeholder: 'Choose language', required: true, options: ['en', 'si', 'ta', 'hi', 'zh'] }
      ]
    }
  ]

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const validateStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex]
    const stepErrors: string[] = []

    step.fields.forEach(field => {
      if (field.required && !formData[field.id as keyof typeof formData]) {
        stepErrors.push(`${field.label} is required`)
      }
    })

    // Email validation
    if (stepIndex === 1 && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      stepErrors.push('Please enter a valid email address')
    }

    // Birth date validation
    if (stepIndex === 2 && formData.birthDate) {
      const birthDate = new Date(formData.birthDate)
      const today = new Date()
      if (birthDate > today) {
        stepErrors.push('Birth date cannot be in the future')
      }
    }

    setErrors(stepErrors)
    return stepErrors.length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handleComplete()
      }
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // Save to localStorage
      localStorage.setItem('onboardingComplete', 'true')
      localStorage.setItem('userProfile', JSON.stringify(formData))
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to main app
      router.push('/main')
    } catch (error) {
      console.error('Onboarding completion error:', error)
      setErrors(['Failed to complete onboarding. Please try again.'])
    } finally {
      setIsLoading(false)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Daily Secrets</h1>
                <p className="text-sm text-slate-600">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-violet-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-2xl mx-auto"
        >
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <currentStepData.icon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-lg text-slate-600">
              {currentStepData.description}
            </p>
          </div>

          {/* Form Fields */}
          {currentStepData.fields.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-6">
              <div className="space-y-4">
                {currentStepData.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'select' ? (
                      <select
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                        required={field.required}
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 text-red-500">⚠️</div>
                <div>
                  <h4 className="font-medium text-red-800">Please fix the following errors:</h4>
                  <ul className="mt-1 text-sm text-red-700">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete Setup</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
