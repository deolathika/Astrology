'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  Moon,
  Sun,
  ArrowRight,
  Check
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', element: 'Fire', dates: 'Mar 21 - Apr 19' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', dates: 'Apr 20 - May 20' },
  { name: 'Gemini', symbol: '♊', element: 'Air', dates: 'May 21 - Jun 20' },
  { name: 'Cancer', symbol: '♋', element: 'Water', dates: 'Jun 21 - Jul 22' },
  { name: 'Leo', symbol: '♌', element: 'Fire', dates: 'Jul 23 - Aug 22' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', dates: 'Aug 23 - Sep 22' },
  { name: 'Libra', symbol: '♎', element: 'Air', dates: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', dates: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', dates: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', dates: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', dates: 'Jan 20 - Feb 18' },
  { name: 'Pisces', symbol: '♓', element: 'Water', dates: 'Feb 19 - Mar 20' }
]

export default function OnboardingSignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: 0,
    longitude: 0,
    timezone: '',
    zodiacSign: '',
    system: 'western'
  })

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Birth Details', icon: Calendar },
    { id: 3, title: 'Birth Place', icon: MapPin },
    { id: 4, title: 'Zodiac Sign', icon: Star },
    { id: 5, title: 'Complete', icon: Check }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Save user data and redirect to home
    localStorage.setItem('userData', JSON.stringify(formData))
    localStorage.setItem('onboardingComplete', 'true')
    window.location.href = '/'
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Welcome to Daily Secrets
              </h2>
              <p className="text-stellar-gray-light">
                Let's create your cosmic profile
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
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
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="cosmic-input w-full"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Birth Details
              </h2>
              <p className="text-stellar-gray-light">
                For accurate cosmic calculations
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
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
                  onChange={(e) => handleInputChange('birthTime', e.target.value)}
                  className="cosmic-input w-full"
                />
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Birth Place
              </h2>
              <p className="text-stellar-gray-light">
                Location affects your cosmic profile
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Birth Place
                </label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                  className="cosmic-input w-full"
                  placeholder="City, Country"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange('latitude', e.target.value)}
                    className="cosmic-input w-full"
                    placeholder="0.000000"
                  />
                </div>
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange('longitude', e.target.value)}
                    className="cosmic-input w-full"
                    placeholder="0.000000"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Zodiac Sign
              </h2>
              <p className="text-stellar-gray-light">
                Choose your zodiac system
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handleInputChange('system', 'western')}
                  className={`p-4 rounded-xl border transition-all ${
                    formData.system === 'western'
                      ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                      : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                  }`}
                >
                  <div className="text-center">
                    <Sun className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-semibold">Western</div>
                    <div className="text-xs opacity-75">Tropical</div>
                  </div>
                </button>

                <button
                  onClick={() => handleInputChange('system', 'vedic')}
                  className={`p-4 rounded-xl border transition-all ${
                    formData.system === 'vedic'
                      ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                      : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                  }`}
                >
                  <div className="text-center">
                    <Moon className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-semibold">Vedic</div>
                    <div className="text-xs opacity-75">Sidereal</div>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {zodiacSigns.map((sign) => (
                  <button
                    key={sign.name}
                    onClick={() => handleInputChange('zodiacSign', sign.name)}
                    className={`p-4 rounded-xl border transition-all text-center ${
                      formData.zodiacSign === sign.name
                        ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                        : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                    }`}
                  >
                    <div className="text-2xl mb-2">{sign.symbol}</div>
                    <div className="font-semibold text-sm">{sign.name}</div>
                    <div className="text-xs opacity-75">{sign.dates}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-electric-violet/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-electric-violet" />
              </div>
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Profile Complete!
              </h2>
              <p className="text-stellar-gray-light">
                Your cosmic journey begins now
              </p>
            </div>

            <div className="cosmic-card p-6">
              <h3 className="text-lg font-semibold text-starlight-white mb-4">
                Your Cosmic Profile
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Name:</span>
                  <span className="text-starlight-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Birth Date:</span>
                  <span className="text-starlight-white">{formData.birthDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Birth Time:</span>
                  <span className="text-starlight-white">{formData.birthTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Birth Place:</span>
                  <span className="text-starlight-white">{formData.birthPlace}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">Zodiac Sign:</span>
                  <span className="text-starlight-white">{formData.zodiacSign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stellar-gray-light">System:</span>
                  <span className="text-starlight-white capitalize">{formData.system}</span>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      currentStep >= step.id ? 'text-electric-violet' : 'text-stellar-gray'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step.id 
                        ? 'bg-electric-violet text-white' 
                        : 'bg-stellar-gray/20 text-stellar-gray'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 ${
                        currentStep > step.id ? 'bg-electric-violet' : 'bg-stellar-gray/20'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl border transition-all ${
                  currentStep === 1
                    ? 'border-stellar-gray/20 text-stellar-gray cursor-not-allowed'
                    : 'border-electric-violet/30 text-electric-violet hover:border-electric-violet hover:bg-electric-violet/10'
                }`}
              >
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="cosmic-button px-6 py-3 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="cosmic-button px-6 py-3 flex items-center space-x-2"
                >
                  <span>Complete Setup</span>
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
