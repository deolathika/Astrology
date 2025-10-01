'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, Clock, MapPin, Sparkles, CheckCircle, Globe, Zap, Brain, Target } from 'lucide-react'
import { ZodiacCalculator } from '@/lib/astrology/zodiac-calculator'
import { GeographyService } from '@/lib/geography/country-city-data'
import { LLMAstrologyService } from '@/lib/ai/llm-astrology-service'
import { NASAHorizonsAPI } from '@/lib/astrology/nasa-horizons'

export default function TestAdvancedAstrologyPage() {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [countries, setCountries] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [zodiacResult, setZodiacResult] = useState<any>(null)
  const [nasaData, setNasaData] = useState<any>(null)
  const [llmAnalysis, setLlmAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNASA, setIsLoadingNASA] = useState(false)
  const [isLoadingLLM, setIsLoadingLLM] = useState(false)

  // Load countries on mount
  useState(() => {
    const countryList = GeographyService.getCountries()
    setCountries(countryList)
  })

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
    const cityList = GeographyService.getCitiesByCountry(countryCode)
    setCities(cityList)
    setSelectedCity('')
  }

  const handleBirthDateChange = (date: string) => {
    setBirthDate(date)
    if (date) {
      const zodiacResult = ZodiacCalculator.autoDetectZodiacSign(date)
      if (zodiacResult) {
        setZodiacResult(zodiacResult)
      }
    }
  }

  const getNASAData = async () => {
    if (!birthDate || !birthTime || !selectedCity) return

    setIsLoadingNASA(true)
    try {
      const city = cities.find(c => c.name === selectedCity)
      if (!city) return

      const coordinates = {
        latitude: city.coordinates.latitude,
        longitude: city.coordinates.longitude,
        elevation: 0,
        timezone: city.timezone,
        country: selectedCountry,
        city: selectedCity
      }

      const birthDateTime = new Date(`${birthDate}T${birthTime}`)
      const nasaResult = await NASAHorizonsAPI.getAstronomicalData(birthDateTime, coordinates)
      setNasaData(nasaResult)
    } catch (error) {
      console.error('NASA Data Error:', error)
    } finally {
      setIsLoadingNASA(false)
    }
  }

  const getLLMAnalysis = async () => {
    if (!birthDate || !birthTime || !selectedCountry || !selectedCity) return

    setIsLoadingLLM(true)
    try {
      const request = {
        birthDate,
        birthTime,
        birthPlace: {
          country: selectedCountry,
          city: selectedCity
        },
        system: 'western' as const,
        language: 'en',
        includeInterpretations: true,
        includePredictions: true
      }

      const analysis = await LLMAstrologyService.getAstrologyAnalysis(request)
      setLlmAnalysis(analysis)
    } catch (error) {
      console.error('LLM Analysis Error:', error)
    } finally {
      setIsLoadingLLM(false)
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
            Advanced Astrology Test Suite
          </h1>
          <p className="text-slate-600">
            Test 100% accurate NASA data, country/city selection, and LLM integration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
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
              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => handleBirthDateChange(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              
              {/* Birth Time */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Birth Time
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              
              {/* Country Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Country
                </label>
                <select
                  value={selectedCountry}
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
              
              {/* City Selection */}
              {selectedCountry && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={getNASAData}
                  disabled={isLoadingNASA || !birthDate || !birthTime || !selectedCity}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>{isLoadingNASA ? 'Loading NASA...' : 'Get NASA Data'}</span>
                </button>
                
                <button
                  onClick={getLLMAnalysis}
                  disabled={isLoadingLLM || !birthDate || !birthTime || !selectedCountry || !selectedCity}
                  className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <Brain className="w-4 h-4" />
                  <span>{isLoadingLLM ? 'Analyzing...' : 'Get LLM Analysis'}</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Zodiac Signs */}
            {zodiacResult && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                  <Star className="w-5 h-5 text-violet-600" />
                  <span>Auto-Detected Zodiac Signs</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-violet-50 rounded-lg p-3 border border-violet-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-2xl">{zodiacResult.info?.symbol}</span>
                      <span className="font-semibold text-slate-900">Western</span>
                    </div>
                    <p className="text-sm text-slate-600">{zodiacResult.western}</p>
                    <p className="text-xs text-slate-500">{zodiacResult.info?.element} • {zodiacResult.info?.quality}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-2xl">🐉</span>
                      <span className="font-semibold text-slate-900">Chinese</span>
                    </div>
                    <p className="text-sm text-slate-600">{zodiacResult.chinese}</p>
                    <p className="text-xs text-slate-500">Year of {zodiacResult.chinese}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-2xl">🕉️</span>
                      <span className="font-semibold text-slate-900">Vedic</span>
                    </div>
                    <p className="text-sm text-slate-600">{zodiacResult.vedic}</p>
                    <p className="text-xs text-slate-500">Rashi</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-2xl">🇱🇰</span>
                      <span className="font-semibold text-slate-900">Sri Lankan</span>
                    </div>
                    <p className="text-sm text-slate-600">{zodiacResult.sriLankan}</p>
                    <p className="text-xs text-slate-500">Traditional</p>
                  </div>
                </div>
              </div>
            )}

            {/* NASA Data */}
            {nasaData && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>NASA JPL Horizons Data</span>
                </h3>
                {nasaData.success ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Planetary Positions</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {nasaData.data.planets.slice(0, 6).map((planet: any, index: number) => (
                          <div key={index} className="flex justify-between">
                            <span className="font-medium">{planet.name}:</span>
                            <span>{planet.longitude.toFixed(2)}°</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 rounded-lg p-3">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">NASA data retrieved successfully!</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-red-600 bg-red-50 rounded-lg p-3">
                    <p className="text-sm">NASA API unavailable, using fallback data</p>
                  </div>
                )}
              </div>
            )}

            {/* LLM Analysis */}
            {llmAnalysis && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>AI-Powered Analysis</span>
                </h3>
                {llmAnalysis.success ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                        <h4 className="font-semibold text-purple-900 mb-2">Personality</h4>
                        <p className="text-sm text-slate-600">{llmAnalysis.data.interpretations.personality}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                        <h4 className="font-semibold text-purple-900 mb-2">Career</h4>
                        <p className="text-sm text-slate-600">{llmAnalysis.data.interpretations.career}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 rounded-lg p-3">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">AI analysis completed with NASA data accuracy!</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-red-600 bg-red-50 rounded-lg p-3">
                    <p className="text-sm">LLM analysis failed, check API keys</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
