'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Globe,
  Search,
  Navigation as NavigationIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import { globalLocations } from '@/data/locations'
import { getZodiacSign } from '@/lib/zodiacUtils'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'

interface PersonalInfo {
  name: string
  birthDate: string
  birthTime: string
  birthLocation: string
  latitude?: number
  longitude?: number
  timezone?: string
}

export default function PersonalInfoPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    latitude: undefined,
    longitude: undefined,
    timezone: undefined
  })
  const [zodiacInfo, setZodiacInfo] = useState<any>(null)
  const [locationSearch, setLocationSearch] = useState('')
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate zodiac sign when birth date changes
  useEffect(() => {
    if (personalInfo.birthDate) {
      try {
        const zodiacSign = getZodiacSign(personalInfo.birthDate)
        setZodiacInfo(zodiacSign)
      } catch (error) {
        console.error('Error calculating zodiac sign:', error)
        setZodiacInfo(null)
      }
    } else {
      setZodiacInfo(null)
    }
  }, [personalInfo.birthDate])

  // Location search functionality
  const handleLocationSearch = (query: string) => {
    setLocationSearch(query)
    if (query.length > 2) {
      const filtered = globalLocations.filter(location =>
        location.city.toLowerCase().includes(query.toLowerCase()) ||
        location.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      setLocationSuggestions(filtered)
      setShowLocationSuggestions(true)
    } else {
      setShowLocationSuggestions(false)
    }
  }

  const selectLocation = (location: any) => {
    setSelectedLocation(location)
    setPersonalInfo({
      ...personalInfo,
      birthLocation: `${location.city}, ${location.country}`,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone
    })
    setLocationSearch(`${location.city}, ${location.country}`)
    setShowLocationSuggestions(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Store personal information in localStorage
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo))
    localStorage.setItem('zodiacInfo', JSON.stringify(zodiacInfo))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    router.push('/')
  }

  const steps = [
    { number: 1, title: 'Basic Information', icon: User },
    { number: 2, title: 'Birth Details', icon: Calendar },
    { number: 3, title: 'Location', icon: MapPin },
    { number: 4, title: 'Review', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen relative main-content">
      <StarfieldBackground />
      
      <main className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Tell Us About Yourself
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Help us create your personalized spiritual sanctuary
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex justify-center">
              <div className="flex items-center space-x-4">
                {steps.map((stepItem, index) => {
                  const Icon = stepItem.icon
                  const isActive = step >= stepItem.number
                  const isCompleted = step > stepItem.number
                  
                  return (
                    <div key={stepItem.number} className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : isActive ? 'bg-purple-500' : 'bg-gray-600'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-1 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-600'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8 cosmic-glow">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-cosmic">Basic Information</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="cosmic"
                        onClick={() => setStep(2)}
                        disabled={!personalInfo.name.trim()}
                        className="flex items-center space-x-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Birth Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-cosmic">Birth Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Birth Date
                        </label>
                        <input
                          type="date"
                          value={personalInfo.birthDate}
                          onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Birth Time
                        </label>
                        <input
                          type="time"
                          value={personalInfo.birthTime}
                          onChange={(e) => setPersonalInfo({...personalInfo, birthTime: e.target.value})}
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {zodiacInfo && (
                      <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-purple-300">
                              Your Zodiac Sign: {zodiacInfo.name}
                            </p>
                            <p className="text-xs text-gray-300">
                              {zodiacInfo.element} • {zodiacInfo.modality}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button
                        variant="secondary"
                        onClick={() => setStep(1)}
                        className="flex items-center space-x-2"
                      >
                        <span>Back</span>
                      </Button>
                      <Button
                        variant="cosmic"
                        onClick={() => setStep(3)}
                        disabled={!personalInfo.birthDate}
                        className="flex items-center space-x-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-cosmic">Birth Location</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Birth Location
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={locationSearch}
                          onChange={(e) => handleLocationSearch(e.target.value)}
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                          placeholder="Search for your birth city..."
                        />
                        <Search className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                      </div>
                      
                      {showLocationSuggestions && locationSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-white/20 rounded-lg shadow-lg">
                          {locationSuggestions.map((location, index) => (
                            <div
                              key={index}
                              onClick={() => selectLocation(location)}
                              className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                            >
                              <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <div>
                                  <p className="text-white font-medium">{location.city}</p>
                                  <p className="text-gray-400 text-sm">{location.country}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedLocation && (
                      <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-sm font-semibold text-green-300">
                              Location Selected: {selectedLocation.city}, {selectedLocation.country}
                            </p>
                            <p className="text-xs text-gray-300">
                              Timezone: {selectedLocation.timezone}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button
                        variant="secondary"
                        onClick={() => setStep(2)}
                        className="flex items-center space-x-2"
                      >
                        <span>Back</span>
                      </Button>
                      <Button
                        variant="cosmic"
                        onClick={() => setStep(4)}
                        disabled={!selectedLocation}
                        className="flex items-center space-x-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-cosmic">Review Your Information</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h3 className="font-semibold text-purple-300 mb-2">Personal Details</h3>
                        <p className="text-gray-300">Name: {personalInfo.name}</p>
                      </div>
                      
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h3 className="font-semibold text-blue-300 mb-2">Birth Information</h3>
                        <p className="text-gray-300">Date: {personalInfo.birthDate}</p>
                        <p className="text-gray-300">Time: {personalInfo.birthTime}</p>
                        <p className="text-gray-300">Location: {personalInfo.birthLocation}</p>
                      </div>
                      
                      {zodiacInfo && (
                        <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                          <h3 className="font-semibold text-purple-300 mb-2">Your Zodiac Profile</h3>
                          <p className="text-gray-300">Sign: {zodiacInfo.name}</p>
                          <p className="text-gray-300">Element: {zodiacInfo.element}</p>
                          <p className="text-gray-300">Modality: {zodiacInfo.modality}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="secondary"
                        onClick={() => setStep(3)}
                        className="flex items-center space-x-2"
                      >
                        <span>Back</span>
                      </Button>
                      <Button
                        variant="cosmic"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Creating Your Sanctuary...</span>
                          </>
                        ) : (
                          <>
                            <span>Enter Your Sanctuary</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
