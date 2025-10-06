'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Moon, 
  Sun, 
  Heart, 
  Sparkles, 
  ArrowRight,
  Shield,
  Globe,
  Users,
  BookOpen,
  Compass,
  User,
  X,
  MapPin,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import { globalLocations } from '@/data/locations'
import { getZodiacSign } from '@/lib/zodiacUtils'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'

export default function WelcomePage() {
  const router = useRouter()
  const { updatePersonalInfo, updateZodiacInfo } = usePersonalInfo()
  const [showDetails, setShowDetails] = useState(false)
  const [showPersonalForm, setShowPersonalForm] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    latitude: 0,
    longitude: 0,
    timezone: ''
  })
  const [zodiacInfo, setZodiacInfo] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [locationSearch, setLocationSearch] = useState('')
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire' },
    { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth' },
    { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air' },
    { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water' },
    { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire' },
    { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth' },
    { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air' },
    { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water' },
    { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire' },
    { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth' },
    { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air' },
    { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water' }
  ]

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
      const suggestions = globalLocations.filter(location =>
        location.city.toLowerCase().includes(query.toLowerCase()) ||
        location.country.toLowerCase().includes(query.toLowerCase()) ||
        location.region?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
      setLocationSuggestions(suggestions)
      setShowLocationSuggestions(true)
    } else {
      setLocationSuggestions([])
      setShowLocationSuggestions(false)
    }
  }

  const handleLocationSelect = (location: any) => {
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

  const handleSubmit = () => {
    // Use calculated zodiac sign if no manual selection was made
    const finalZodiacInfo = personalInfo.zodiacSign ? 
      zodiacSigns.find(sign => sign.name === personalInfo.zodiacSign) : 
      zodiacInfo

    // Update context with personal information
    updatePersonalInfo(personalInfo)
    
    // Update context with zodiac information
    if (finalZodiacInfo) {
      updateZodiacInfo(finalZodiacInfo)
    }
    
    // Redirect to homepage
    router.push('/')
  }

  return (
    <div className="min-h-screen relative main-content">
      <StarfieldBackground />
      
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: showDetails ? -20 : 0,
              scale: showDetails ? 0.9 : 1
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: showDetails ? 0.8 : 1,
                y: showDetails ? -5 : 0
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="w-16 h-16 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.h1 
              animate={{
                scale: showDetails ? 0.85 : 1,
                y: showDetails ? -8 : 0
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              Daily Secrets
            </motion.h1>
            
            <motion.p 
              animate={{
                scale: showDetails ? 0.9 : 1,
                y: showDetails ? -6 : 0
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
            >
              Your Spiritual Sanctuary
            </motion.p>
            
            <motion.p 
              animate={{
                scale: showDetails ? 0.9 : 1,
                y: showDetails ? -6 : 0
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-base text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              A peaceful place where you can find clarity, hope, and inner strength. 
              Connect with your true self, trust your intuition, and manifest your dreams.
            </motion.p>

            <motion.div 
              animate={{
                scale: showDetails ? 0.9 : 1,
                y: showDetails ? -8 : 0
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                variant="cosmic" 
                size="lg" 
                onClick={() => setShowPersonalForm(true)}
                className="flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                <span>{showDetails ? 'Show Less' : 'Learn More'}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Our Vision, Promise, Methods */}
          <AnimatePresence mode="wait">
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.9 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  staggerChildren: 0.15
                }}
                className="mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Our Vision */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.1 
                    }}
                  >
                    <Card className="p-6 text-center cosmic-glow">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-cosmic">Our Vision</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        To create a spiritual sanctuary where everyone can find peace, 
                        hope, and inner strength. We believe in making spiritual guidance 
                        accessible to all, regardless of background or circumstances.
                      </p>
                    </Card>
                  </motion.div>

                  {/* Our Promise */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.2 
                    }}
                  >
                    <Card className="p-6 text-center cosmic-glow">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-cosmic">Our Promise</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Your privacy and spiritual journey are sacred to us. We provide 
                        accurate, personalized guidance based on authentic astrological 
                        and numerological principles, always respecting your personal space.
                      </p>
                    </Card>
                  </motion.div>

                  {/* Our Methods */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.3 
                    }}
                  >
                    <Card className="p-6 text-center cosmic-glow">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Compass className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-cosmic">Our Methods</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        We combine ancient wisdom with modern technology, using multiple 
                        astrological systems, advanced numerology, and AI-powered insights 
                        to provide the most accurate and meaningful guidance.
                      </p>
                    </Card>
                  </motion.div>
                </div>

                {/* What is Daily Secrets */}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.4 
                  }}
                  className="mt-8"
                >
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-2xl font-bold text-center mb-4 text-cosmic">What is Daily Secrets?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-purple-300">🌙 Astrology & Numerology</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Discover your cosmic blueprint through personalized birth charts, 
                          daily horoscopes, and numerological insights that guide your life path.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-blue-300">💭 Dream Analysis</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Unlock the secrets of your subconscious with AI-powered dream 
                          interpretation and spiritual guidance for your nightly journeys.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-green-300">💕 Compatibility</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Explore cosmic connections and relationship harmony through 
                          advanced compatibility analysis across multiple systems.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-pink-300">🌟 Community</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Connect with like-minded souls in a supportive spiritual community 
                          where you can share experiences and grow together.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Personal Information Form - Inline Modal */}
          <AnimatePresence>
            {showPersonalForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <User className="w-8 h-8 text-white" />
                      </motion.div>
                      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Create Your Profile
                      </h2>
                      <p className="text-gray-300">
                        Tell us about yourself to get personalized insights
                      </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center space-x-4">
                        {[1, 2, 3].map((step) => (
                          <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              currentStep >= step ? 'bg-purple-500' : 'bg-gray-600'
                            }`}>
                              <span className="text-sm font-semibold">{step}</span>
                            </div>
                            {step < 3 && (
                              <div className={`w-12 h-1 ${
                                currentStep > step ? 'bg-purple-500' : 'bg-gray-600'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form Content */}
                    <AnimatePresence mode="wait">
                      {/* Step 1: Basic Info */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              What's your name?
                            </label>
                            <input
                              type="text"
                              value={personalInfo.name}
                              onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              When were you born?
                            </label>
                            <input
                              type="date"
                              value={personalInfo.birthDate}
                              onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Zodiac Selection */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold mb-2 text-cosmic">Choose Your Zodiac Sign</h3>
                            <p className="text-gray-400">Select your zodiac sign or let us calculate it from your birth date</p>
                            {zodiacInfo && (
                              <div className="mt-4 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                                <div className="flex items-center justify-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                    <Star className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-purple-300">
                                      Calculated from your birth date: {zodiacInfo.name}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                      {zodiacInfo.element} • {zodiacInfo.modality}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {zodiacSigns.map((sign) => (
                              <button
                                key={sign.name}
                                onClick={() => setPersonalInfo({...personalInfo, zodiacSign: sign.name})}
                                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                                  personalInfo.zodiacSign === sign.name || (zodiacInfo && zodiacInfo.name === sign.name)
                                    ? 'border-purple-500 bg-purple-500/20'
                                    : 'border-white/20 bg-white/5 hover:border-purple-300 hover:bg-purple-500/10'
                                }`}
                              >
                                <div className="text-2xl mb-2">{sign.symbol}</div>
                                <div className="text-sm font-semibold text-white">{sign.name}</div>
                                <div className="text-xs text-gray-400">{sign.dates}</div>
                                <div className="text-xs text-purple-300">{sign.element}</div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Additional Info */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Birth Time (Optional)
                            </label>
                            <input
                              type="time"
                              value={personalInfo.birthTime}
                              onChange={(e) => setPersonalInfo({...personalInfo, birthTime: e.target.value})}
                              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Birth Location (Optional)
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={locationSearch}
                                onChange={(e) => handleLocationSearch(e.target.value)}
                                onFocus={() => setShowLocationSuggestions(true)}
                                className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                                placeholder="Search for city or country"
                              />
                              {showLocationSuggestions && locationSuggestions.length > 0 && (
                                <ul className="absolute z-20 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                                  {locationSuggestions.map((loc, index) => (
                                    <li
                                      key={index}
                                      className="p-3 text-gray-200 hover:bg-gray-700 cursor-pointer flex items-center"
                                      onClick={() => handleLocationSelect(loc)}
                                    >
                                      <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                                      <div>
                                        <div className="font-medium">{loc.city}, {loc.country}</div>
                                        <div className="text-xs text-gray-400">
                                          {loc.region} • Lat: {loc.latitude}, Lon: {loc.longitude}
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            {selectedLocation && (
                              <div className="mt-3 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-300 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Selected: {selectedLocation.city}, {selectedLocation.country} 
                                <span className="ml-2 text-xs">
                                  (Lat: {selectedLocation.latitude}, Lon: {selectedLocation.longitude})
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                      {currentStep > 1 ? (
                        <Button
                          variant="secondary"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="flex items-center space-x-2"
                        >
                          <span>Back</span>
                        </Button>
                      ) : (
                        <div />
                      )}
                      
                      {currentStep < 3 ? (
                        <Button
                          variant="cosmic"
                          onClick={() => setCurrentStep(currentStep + 1)}
                          disabled={currentStep === 1 && !personalInfo.name}
                          className="flex items-center space-x-2"
                        >
                          <span>Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="cosmic"
                          onClick={handleSubmit}
                          disabled={!personalInfo.name || (!personalInfo.zodiacSign && !zodiacInfo)}
                          className="flex items-center space-x-2"
                        >
                          <span>Complete Setup</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setShowPersonalForm(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
