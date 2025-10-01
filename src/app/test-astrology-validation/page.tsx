'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, Clock, MapPin, CheckCircle, AlertTriangle, Info, Zap, Brain, Target } from 'lucide-react'
import { AstrologyValidator } from '@/lib/astrology/astrology-validator'
import { GeographyService } from '@/lib/geography/country-city-data'

export default function TestAstrologyValidationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    birthDate: '',
    birthTime: '',
    country: '',
    city: ''
  })
  const [countries, setCountries] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [validationResult, setValidationResult] = useState<any>(null)
  const [isValidating, setIsValidating] = useState(false)

  // Load countries on mount
  useState(() => {
    const countryList = GeographyService.getCountries()
    setCountries(countryList)
  })

  const handleCountryChange = (countryCode: string) => {
    setFormData(prev => ({ ...prev, country: countryCode, city: '' }))
    const cityList = GeographyService.getCitiesByCountry(countryCode)
    setCities(cityList)
  }

  const validateData = async () => {
    if (!formData.fullName || !formData.email || !formData.birthDate || !formData.birthTime || !formData.country || !formData.city) {
      alert('Please fill in all fields')
      return
    }

    setIsValidating(true)
    try {
      const result = await AstrologyValidator.validateBirthData({
        fullName: formData.fullName,
        email: formData.email,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime,
        birthPlace: {
          country: formData.country,
          city: formData.city
        }
      })

      setValidationResult(result)
    } catch (error) {
      console.error('Validation Error:', error)
    } finally {
      setIsValidating(false)
    }
  }

  const getValidationIcon = (isValid: boolean) => {
    return isValid ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-red-500" />
    )
  }

  const getAccuracyColor = (accuracy: string) => {
    switch (accuracy) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Astrology & Numerology Validation Test
          </h1>
          <p className="text-slate-600">
            Test comprehensive validation of birth data, timezone handling, and astrology concepts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-violet-600" />
              <span>Birth Information</span>
            </h2>
            
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Birth Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Birth Date *
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Country and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
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
              </div>
              
              {/* Validate Button */}
              <button
                onClick={validateData}
                disabled={isValidating || !formData.fullName || !formData.email || !formData.birthDate || !formData.birthTime || !formData.country || !formData.city}
                className="w-full bg-violet-600 text-white px-4 py-3 rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>{isValidating ? 'Validating...' : 'Validate Complete Data'}</span>
              </button>
            </div>
          </motion.div>

          {/* Validation Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {validationResult && (
              <>
                {/* Validation Status */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                    {getValidationIcon(validationResult.isValid)}
                    <span>Validation Status</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg border ${validationResult.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="flex items-center space-x-2">
                        {getValidationIcon(validationResult.isValid)}
                        <span className="font-medium">
                          {validationResult.isValid ? 'All data is valid' : 'Validation failed'}
                        </span>
                      </div>
                    </div>
                    
                    {validationResult.errors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <h4 className="font-medium text-red-900 mb-2">Errors:</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          {validationResult.errors.map((error: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                              <AlertTriangle className="w-4 h-4" />
                              <span>{error}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {validationResult.warnings.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <h4 className="font-medium text-yellow-900 mb-2">Warnings:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          {validationResult.warnings.map((warning: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                              <Info className="w-4 h-4" />
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Birth Data Details */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>Birth Data Details</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">Name:</span>
                        <span className="ml-2 text-slate-600">{validationResult.fullName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Email:</span>
                        <span className="ml-2 text-slate-600">{validationResult.email}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Birth Date:</span>
                        <span className="ml-2 text-slate-600">{validationResult.birthDate.toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Birth Time:</span>
                        <span className="ml-2 text-slate-600">{validationResult.birthTime}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Birth Place:</span>
                        <span className="ml-2 text-slate-600">{validationResult.birthPlace.city}, {validationResult.birthPlace.country}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Coordinates:</span>
                        <span className="ml-2 text-slate-600">
                          {validationResult.birthPlace.coordinates.latitude.toFixed(4)}°, {validationResult.birthPlace.coordinates.longitude.toFixed(4)}°
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Timezone:</span>
                        <span className="ml-2 text-slate-600">{validationResult.birthPlace.timezone}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">UTC Time:</span>
                        <span className="ml-2 text-slate-600">{validationResult.utcDateTime.toISOString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zodiac Signs */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                    <Star className="w-5 h-5 text-violet-600" />
                    <span>Zodiac Signs</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-violet-50 rounded-lg p-3 border border-violet-100">
                      <div className="font-semibold text-violet-900">Western</div>
                      <div className="text-sm text-slate-600">{validationResult.zodiacSigns.western}</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="font-semibold text-blue-900">Chinese</div>
                      <div className="text-sm text-slate-600">{validationResult.zodiacSigns.chinese}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                      <div className="font-semibold text-green-900">Vedic</div>
                      <div className="text-sm text-slate-600">{validationResult.zodiacSigns.vedic}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                      <div className="font-semibold text-purple-900">Sri Lankan</div>
                      <div className="text-sm text-slate-600">{validationResult.zodiacSigns.sriLankan}</div>
                    </div>
                  </div>
                </div>

                {/* Astronomical Data */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <span>Astronomical Data</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">Julian Day:</span>
                        <span className="ml-2 text-slate-600">{validationResult.julianDay.toFixed(6)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Sidereal Time:</span>
                        <span className="ml-2 text-slate-600">{validationResult.siderealTime.toFixed(2)}°</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Local Time:</span>
                        <span className="ml-2 text-slate-600">{validationResult.localDateTime.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">UTC Time:</span>
                        <span className="ml-2 text-slate-600">{validationResult.utcDateTime.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {!validationResult && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <div className="text-center py-8">
                  <Target className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-slate-500">Enter birth information and click "Validate Complete Data" to see results</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
