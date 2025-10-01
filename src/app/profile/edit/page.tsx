'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  User, Calendar, Clock, MapPin, Star, Save, ArrowLeft, 
  CheckCircle, AlertTriangle, Globe, Mail, Phone, 
  Edit3, Eye, EyeOff, Settings, Shield
} from 'lucide-react'
import { GeographyService } from '@/lib/geography/country-city-data'
import { AstrologyValidator } from '@/lib/astrology/astrology-validator'

interface ProfileData {
  id: string
  fullName: string
  email: string
  phone?: string
  birthDate: string
  birthTime: string
  birthPlace: {
    country: string
    city: string
    coordinates: {
      latitude: number
      longitude: number
    }
    timezone: string
  }
  zodiacSign: string
  system: string
  preferences: {
    language: string
    notifications: boolean
    darkMode: boolean
    hapticFeedback: boolean
  }
}

export default function EditProfilePage() {
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [countries, setCountries] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [validationWarnings, setValidationWarnings] = useState<string[]>([])
  const [isValid, setIsValid] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    birthTime: '',
    country: '',
    city: '',
    zodiacSign: '',
    system: 'western',
    language: 'en',
    notifications: true,
    darkMode: false,
    hapticFeedback: true
  })

  useEffect(() => {
    loadProfileData()
    loadCountries()
  }, [])

  const loadProfileData = async () => {
    try {
      // Simulate loading profile data
      const mockProfile: ProfileData = {
        id: 'user123',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        birthDate: '1990-01-15',
        birthTime: '14:30',
        birthPlace: {
          country: 'US',
          city: 'New York',
          coordinates: { latitude: 40.7128, longitude: -74.0060 },
          timezone: 'America/New_York'
        },
        zodiacSign: 'Capricorn',
        system: 'western',
        preferences: {
          language: 'en',
          notifications: true,
          darkMode: false,
          hapticFeedback: true
        }
      }
      
      setProfileData(mockProfile)
      setFormData({
        fullName: mockProfile.fullName,
        email: mockProfile.email,
        phone: mockProfile.phone || '',
        birthDate: mockProfile.birthDate,
        birthTime: mockProfile.birthTime,
        country: mockProfile.birthPlace.country,
        city: mockProfile.birthPlace.city,
        zodiacSign: mockProfile.zodiacSign,
        system: mockProfile.system,
        language: mockProfile.preferences.language,
        notifications: mockProfile.preferences.notifications,
        darkMode: mockProfile.preferences.darkMode,
        hapticFeedback: mockProfile.preferences.hapticFeedback
      })
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCountries = () => {
    const countryList = GeographyService.getCountries()
    setCountries(countryList)
  }

  const handleCountryChange = (countryCode: string) => {
    setFormData(prev => ({ ...prev, country: countryCode, city: '' }))
    const cityList = GeographyService.getCitiesByCountry(countryCode)
    setCities(cityList)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const validateForm = async () => {
    try {
      const validatedData = await AstrologyValidator.validateBirthData({
        fullName: formData.fullName,
        email: formData.email,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime,
        birthPlace: {
          country: formData.country,
          city: formData.city
        }
      })

      setValidationErrors(validatedData.errors)
      setValidationWarnings(validatedData.warnings)
      setIsValid(validatedData.isValid)

      return validatedData.isValid
    } catch (error) {
      console.error('Validation error:', error)
      setValidationErrors(['Validation failed'])
      setIsValid(false)
      return false
    }
  }

  const handleSave = async () => {
    const isValidForm = await validateForm()
    
    if (!isValidForm) {
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          birthPlace: `${formData.city}, ${formData.country}`,
          latitude: cities.find(c => c.name === formData.city)?.coordinates.latitude || 0,
          longitude: cities.find(c => c.name === formData.city)?.coordinates.longitude || 0,
          timezone: cities.find(c => c.name === formData.city)?.timezone || 'UTC',
          zodiacSign: formData.zodiacSign,
          system: formData.system
        })
      })

      if (response.ok) {
        router.push('/profile')
      } else {
        const error = await response.json()
        setValidationErrors([error.error || 'Failed to save profile'])
      }
    } catch (error) {
      console.error('Save error:', error)
      setValidationErrors(['Failed to save profile'])
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
                  <p className="text-sm text-slate-600">Update your personal information</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving || !isValid}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Validation Messages */}
          {validationErrors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Validation Errors</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>•</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {validationWarnings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-900">Warnings</h3>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                {validationWarnings.map((warning, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Form Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-violet-600" />
                <span>Personal Information</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </motion.div>

            {/* Birth Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Birth Information</span>
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Birth Date *
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Birth Time *
                    </label>
                    <input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => handleInputChange('birthTime', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!formData.country}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} {city.isCapital && '(Capital)'}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Coordinates Display */}
                {formData.city && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Coordinates</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      {(() => {
                        const city = cities.find(c => c.name === formData.city)
                        return city ? `${city.coordinates.latitude.toFixed(4)}°, ${city.coordinates.longitude.toFixed(4)}°` : ''
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Astrology Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span>Astrology Information</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Zodiac Sign
                  </label>
                  <input
                    type="text"
                    value={formData.zodiacSign}
                    onChange={(e) => handleInputChange('zodiacSign', e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Your zodiac sign"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Astrology System
                  </label>
                  <select
                    value={formData.system}
                    onChange={(e) => handleInputChange('system', e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  >
                    <option value="western">Western</option>
                    <option value="vedic">Vedic</option>
                    <option value="chinese">Chinese</option>
                    <option value="sri-lankan">Sri Lankan</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-green-600" />
                <span>Preferences</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="si">Sinhala</option>
                    <option value="ta">Tamil</option>
                    <option value="hi">Hindi</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={(e) => handleInputChange('notifications', e.target.checked)}
                      className="w-5 h-5 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <span className="text-base text-gray-700">Enable Notifications</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.darkMode}
                      onChange={(e) => handleInputChange('darkMode', e.target.checked)}
                      className="w-5 h-5 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <span className="text-base text-gray-700">Dark Mode</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hapticFeedback}
                      onChange={(e) => handleInputChange('hapticFeedback', e.target.checked)}
                      className="w-5 h-5 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <span className="text-base text-gray-700">Haptic Feedback</span>
                  </label>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-end"
          >
            <button
              onClick={handleSave}
              disabled={isSaving || !isValid}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Profile'}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
