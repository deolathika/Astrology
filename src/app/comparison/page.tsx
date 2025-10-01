'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, Star, Calculator, ToggleLeft, ToggleRight, ChevronDown, ChevronUp, Info } from 'lucide-react'

interface AstrologyData {
  western: {
    sun: { sign: string; degree: number; house: number }
    moon: { sign: string; degree: number; house: number }
    ascendant: { sign: string; degree: number }
    houses: Array<{ sign: string; cusp: number }>
    elements: { fire: number; earth: number; air: number; water: number }
  }
  vedic: {
    sun: { sign: string; nakshatra: string; pada: number; degree: number }
    moon: { sign: string; nakshatra: string; pada: number; degree: number }
    ascendant: { sign: string; degree: number }
    dasha: { current: string; next: string; years: number }
    elements: { fire: number; earth: number; air: number; water: number }
  }
  numerology: {
    lifePath: number
    expression: number
    soulUrge: number
    personality: number
    birthday: number
    maturity: number
    masterNumbers: number[]
    chaldean: {
      lifePath: number
      expression: number
      soulUrge: number
    }
  }
}

export default function ComparisonPage() {
  const [astrologyData, setAstrologyData] = useState<AstrologyData | null>(null)
  const [activeSystem, setActiveSystem] = useState<'western' | 'vedic' | 'numerology'>('western')
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAstrologyData()
  }, [])

  const loadAstrologyData = async () => {
    try {
      // Load user profile
      const userData = localStorage.getItem('userData')
      if (!userData) {
        // Redirect to onboarding if no data
        window.location.href = '/onboarding'
        return
      }

      const profile = JSON.parse(userData)
      
      // Fetch astrology data
      const [natalResponse, numerologyResponse] = await Promise.all([
        fetch(`/api/astro/natal?profileId=${profile.id}`),
        fetch(`/api/numerology/enhanced?profileId=${profile.id}`)
      ])

      if (natalResponse.ok && numerologyResponse.ok) {
        const natalData = await natalResponse.json()
        const numerologyData = await numerologyResponse.json()
        
        setAstrologyData({
          western: natalData.western,
          vedic: natalData.vedic,
          numerology: numerologyData.numerology
        })
      }
    } catch (error) {
      // Use mock data for development
      setAstrologyData({
        western: {
          sun: { sign: 'Leo', degree: 15.5, house: 5 },
          moon: { sign: 'Cancer', degree: 8.2, house: 4 },
          ascendant: { sign: 'Gemini', degree: 22.1 },
          houses: [
            { sign: 'Gemini', cusp: 0 },
            { sign: 'Cancer', cusp: 30 },
            { sign: 'Leo', cusp: 60 },
            { sign: 'Virgo', cusp: 90 },
            { sign: 'Libra', cusp: 120 },
            { sign: 'Scorpio', cusp: 150 },
            { sign: 'Sagittarius', cusp: 180 },
            { sign: 'Capricorn', cusp: 210 },
            { sign: 'Aquarius', cusp: 240 },
            { sign: 'Pisces', cusp: 270 },
            { sign: 'Aries', cusp: 300 },
            { sign: 'Taurus', cusp: 330 }
          ],
          elements: { fire: 3, earth: 2, air: 4, water: 3 }
        },
        vedic: {
          sun: { sign: 'Cancer', degree: 1.2, nakshatra: 'Pushya', pada: 1 },
          moon: { sign: 'Gemini', degree: 25.8, nakshatra: 'Punarvasu', pada: 3 },
          ascendant: { sign: 'Taurus', degree: 8.5 },
          dasha: { current: 'Venus', next: 'Sun', years: 2.5 },
          elements: { fire: 2, earth: 4, air: 3, water: 3 }
        },
        numerology: {
          lifePath: 7,
          expression: 3,
          soulUrge: 9,
          personality: 6,
          birthday: 15,
          maturity: 1,
          masterNumbers: [11],
          chaldean: {
            lifePath: 5,
            expression: 8,
            soulUrge: 4
          }
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDetails = (section: string) => {
    setShowDetails(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'text-red-500'
      case 'earth': return 'text-green-500'
      case 'air': return 'text-blue-500'
      case 'water': return 'text-purple-500'
      default: return 'text-gray-500'
    }
  }

  const getMasterNumberColor = (number: number) => {
    switch (number) {
      case 11: return 'text-violet-600'
      case 22: return 'text-blue-600'
      case 33: return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading your cosmic profile...</p>
        </div>
      </div>
    )
  }

  if (!astrologyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">Please complete your profile to see comparisons</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/onboarding'}>
            Complete Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto py-8"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-primary flex items-center">
            <Scale className="w-8 h-8 mr-3" />
            Astrology Comparison
          </h1>
          <p className="text-gray-600 mt-2">Compare Western, Vedic, and Numerology insights</p>
        </div>

        {/* System Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'western', label: 'Western', icon: Star },
              { id: 'vedic', label: 'Vedic', icon: Star },
              { id: 'numerology', label: 'Numerology', icon: Calculator }
            ].map((system) => {
              const Icon = system.icon
              return (
                <button
                  key={system.id}
                  onClick={() => setActiveSystem(system.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeSystem === system.id
                      ? 'bg-white text-violet-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{system.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Western Astrology */}
        {activeSystem === 'western' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2" />
                Western Astrology
              </h2>

              {/* Sun, Moon, Ascendant */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Sun</h3>
                  <div className="text-2xl font-bold text-yellow-600">
                    {astrologyData.western.sun.sign}
                  </div>
                  <div className="text-sm text-gray-600">
                    {astrologyData.western.sun.degree.toFixed(1)}° • House {astrologyData.western.sun.house}
                  </div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Moon</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {astrologyData.western.moon.sign}
                  </div>
                  <div className="text-sm text-gray-600">
                    {astrologyData.western.moon.degree.toFixed(1)}° • House {astrologyData.western.moon.house}
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Ascendant</h3>
                  <div className="text-2xl font-bold text-green-600">
                    {astrologyData.western.ascendant.sign}
                  </div>
                  <div className="text-sm text-gray-600">
                    {astrologyData.western.ascendant.degree.toFixed(1)}°
                  </div>
                </div>
              </div>

              {/* Elements Balance */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Elements Balance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(astrologyData.western.elements).map(([element, count]) => (
                    <div key={element} className="text-center">
                      <div className={`text-2xl font-bold ${getElementColor(element)}`}>
                        {count}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">{element}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Houses */}
              <div>
                <button
                  onClick={() => toggleDetails('houses')}
                  className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Houses</h3>
                  {showDetails.houses ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                <AnimatePresence>
                  {showDetails.houses && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {astrologyData.western.houses.map((house, index) => (
                          <div key={index} className="text-center p-3 bg-white rounded-lg border">
                            <div className="font-semibold text-gray-900">House {index + 1}</div>
                            <div className="text-sm text-gray-600">{house.sign}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vedic Astrology */}
        {activeSystem === 'vedic' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2" />
                Vedic Astrology
              </h2>

              {/* Sun, Moon, Ascendant */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Sun</h3>
                  <div className="text-2xl font-bold text-yellow-600">
                    {astrologyData.vedic.sun.sign}
                  </div>
                  <div className="text-sm text-gray-600">
                    {astrologyData.vedic.sun.nakshatra} Pada {astrologyData.vedic.sun.pada}
                  </div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Moon</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {astrologyData.vedic.moon.sign}
                  </div>
                  <div className="text-sm text-gray-600">
                    {astrologyData.vedic.moon.nakshatra} Pada {astrologyData.vedic.moon.pada}
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Ascendant</h3>
                  <div className="text-2xl font-bold text-green-600">
                    {astrologyData.vedic.ascendant.sign}
                  </div>
                  <div className="text-sm text-gray-600">
                    {astrologyData.vedic.ascendant.degree.toFixed(1)}°
                  </div>
                </div>
              </div>

              {/* Dasha */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Dasha</h3>
                <div className="p-4 bg-violet-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">
                      {astrologyData.vedic.dasha.current}
                    </div>
                    <div className="text-sm text-gray-600">
                      {astrologyData.vedic.dasha.years} years remaining
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Next: {astrologyData.vedic.dasha.next}
                    </div>
                  </div>
                </div>
              </div>

              {/* Elements Balance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Elements Balance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(astrologyData.vedic.elements).map(([element, count]) => (
                    <div key={element} className="text-center">
                      <div className={`text-2xl font-bold ${getElementColor(element)}`}>
                        {count}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">{element}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Numerology */}
        {activeSystem === 'numerology' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-2" />
                Numerology
              </h2>

              {/* Core Numbers */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-violet-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Life Path</h3>
                  <div className={`text-3xl font-bold ${getMasterNumberColor(astrologyData.numerology.lifePath)}`}>
                    {astrologyData.numerology.lifePath}
                  </div>
                  <div className="text-xs text-gray-500">Your life's purpose</div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Expression</h3>
                  <div className={`text-3xl font-bold ${getMasterNumberColor(astrologyData.numerology.expression)}`}>
                    {astrologyData.numerology.expression}
                  </div>
                  <div className="text-xs text-gray-500">Your talents</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Soul Urge</h3>
                  <div className={`text-3xl font-bold ${getMasterNumberColor(astrologyData.numerology.soulUrge)}`}>
                    {astrologyData.numerology.soulUrge}
                  </div>
                  <div className="text-xs text-gray-500">Your heart's desire</div>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Personality</h3>
                  <div className={`text-3xl font-bold ${getMasterNumberColor(astrologyData.numerology.personality)}`}>
                    {astrologyData.numerology.personality}
                  </div>
                  <div className="text-xs text-gray-500">How others see you</div>
                </div>

                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Birthday</h3>
                  <div className={`text-3xl font-bold ${getMasterNumberColor(astrologyData.numerology.birthday)}`}>
                    {astrologyData.numerology.birthday}
                  </div>
                  <div className="text-xs text-gray-500">Your special gift</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Maturity</h3>
                  <div className={`text-3xl font-bold ${getMasterNumberColor(astrologyData.numerology.maturity)}`}>
                    {astrologyData.numerology.maturity}
                  </div>
                  <div className="text-xs text-gray-500">Your potential</div>
                </div>
              </div>

              {/* Master Numbers */}
              {astrologyData.numerology.masterNumbers.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Master Numbers</h3>
                  <div className="flex flex-wrap gap-2">
                    {astrologyData.numerology.masterNumbers.map((number) => (
                      <span
                        key={number}
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getMasterNumberColor(number)} bg-violet-100`}
                      >
                        {number} - Master Number
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chaldean System */}
              <div>
                <button
                  onClick={() => toggleDetails('chaldean')}
                  className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Chaldean System</h3>
                  {showDetails.chaldean ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                <AnimatePresence>
                  {showDetails.chaldean && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-violet-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Life Path</h4>
                          <div className="text-2xl font-bold text-violet-600">
                            {astrologyData.numerology.chaldean.lifePath}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Expression</h4>
                          <div className="text-2xl font-bold text-blue-600">
                            {astrologyData.numerology.chaldean.expression}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Soul Urge</h4>
                          <div className="text-2xl font-bold text-green-600">
                            {astrologyData.numerology.chaldean.soulUrge}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}



