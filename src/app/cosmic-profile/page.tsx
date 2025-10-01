'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Star, Moon, Sun, Globe, Calculator, Heart, Shield, 
  ChevronDown, ChevronUp, Info, Zap, Target, BookOpen,
  TrendingUp, Calendar, Clock, MapPin, Sparkles
} from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CosmicNavigation } from '@/components/cosmic-navigation'

interface BirthData {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
  latitude: number
  longitude: number
  timezone: string
}

interface AstrologyData {
  western: {
    sun: { sign: string; degree: number; house: number; element: string }
    moon: { sign: string; degree: number; house: number; element: string }
    ascendant: { sign: string; degree: number; element: string }
    houses: Array<{ number: number; sign: string; cusp: number }>
    elements: { fire: number; earth: number; air: number; water: number }
    planets: Array<{ name: string; sign: string; degree: number; house: number }>
  }
  vedic: {
    sun: { sign: string; nakshatra: string; pada: number; degree: number }
    moon: { sign: string; nakshatra: string; pada: number; degree: number }
    ascendant: { sign: string; degree: number }
    dasha: { current: string; next: string; years: number; lord: string }
    elements: { fire: number; earth: number; air: number; water: number }
  }
}

interface NumerologyData {
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

export default function CosmicProfilePage() {
  const [birthData, setBirthData] = useState<BirthData | null>(null)
  const [astrologyData, setAstrologyData] = useState<AstrologyData | null>(null)
  const [numerologyData, setNumerologyData] = useState<NumerologyData | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      // Load birth data
      const userData = localStorage.getItem('userData')
      if (userData) {
        const profile = JSON.parse(userData)
        setBirthData({
          name: profile.name,
          birthDate: profile.birthDate,
          birthTime: profile.birthTime,
          birthPlace: profile.birthPlace,
          latitude: profile.latitude || 0,
          longitude: profile.longitude || 0,
          timezone: profile.timezone || 'UTC'
        })
      }

      // Load astrology data
      const [natalResponse, numerologyResponse] = await Promise.all([
        fetch('/api/astro/natal?profileId=test123'),
        fetch('/api/numerology/enhanced?profileId=test123')
      ])

      if (natalResponse.ok && numerologyResponse.ok) {
        const natal = await natalResponse.json()
        const numerology = await numerologyResponse.json()
        
        setAstrologyData(natal)
        setNumerologyData(numerology.numerology)
      }
    } catch (error) {
      // Use mock data for development
      setAstrologyData({
        western: {
          sun: { sign: 'Leo', degree: 15.5, house: 5, element: 'Fire' },
          moon: { sign: 'Cancer', degree: 8.2, house: 4, element: 'Water' },
          ascendant: { sign: 'Gemini', degree: 22.1, element: 'Air' },
          houses: [
            { number: 1, sign: 'Gemini', cusp: 0 },
            { number: 2, sign: 'Cancer', cusp: 30 },
            { number: 3, sign: 'Leo', cusp: 60 },
            { number: 4, sign: 'Virgo', cusp: 90 },
            { number: 5, sign: 'Libra', cusp: 120 },
            { number: 6, sign: 'Scorpio', cusp: 150 },
            { number: 7, sign: 'Sagittarius', cusp: 180 },
            { number: 8, sign: 'Capricorn', cusp: 210 },
            { number: 9, sign: 'Aquarius', cusp: 240 },
            { number: 10, sign: 'Pisces', cusp: 270 },
            { number: 11, sign: 'Aries', cusp: 300 },
            { number: 12, sign: 'Taurus', cusp: 330 }
          ],
          elements: { fire: 3, earth: 2, air: 4, water: 3 },
          planets: [
            { name: 'Sun', sign: 'Leo', degree: 15.5, house: 5 },
            { name: 'Moon', sign: 'Cancer', degree: 8.2, house: 4 },
            { name: 'Mercury', sign: 'Virgo', degree: 2.1, house: 6 },
            { name: 'Venus', sign: 'Cancer', degree: 25.8, house: 4 },
            { name: 'Mars', sign: 'Aries', degree: 18.3, house: 11 },
            { name: 'Jupiter', sign: 'Sagittarius', degree: 12.7, house: 7 },
            { name: 'Saturn', sign: 'Capricorn', degree: 8.9, house: 8 }
          ]
        },
        vedic: {
          sun: { sign: 'Cancer', degree: 1.2, nakshatra: 'Pushya', pada: 1 },
          moon: { sign: 'Gemini', degree: 25.8, nakshatra: 'Punarvasu', pada: 3 },
          ascendant: { sign: 'Taurus', degree: 8.5 },
          dasha: { current: 'Venus', next: 'Sun', years: 2.5, lord: 'Venus' },
          elements: { fire: 2, earth: 4, air: 3, water: 3 }
        }
      })

      setNumerologyData({
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
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Fire': return 'text-red-500'
      case 'Earth': return 'text-green-500'
      case 'Air': return 'text-blue-500'
      case 'Water': return 'text-purple-500'
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

  const profileSections = [
    {
      id: 'identity',
      title: 'Identity & Birth Data',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'western',
      title: 'Western Astrology',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'vedic',
      title: 'Vedic Astrology',
      icon: Globe,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'numerology',
      title: 'Numerology',
      icon: Calculator,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'elements',
      title: 'Elemental Balance',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'houses',
      title: 'Houses & Planets',
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Breadcrumbs />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
            Your Cosmic Profile
          </h1>
          <p className="text-gray-600">
            Complete astrological and numerological analysis
          </p>
        </motion.div>

        {/* Profile Sections */}
        <div className="space-y-6">
          {profileSections.map((section, index) => {
            const Icon = section.icon
            const isExpanded = expandedSection === section.id
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${section.color}`} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-gray-600">
                        {section.id === 'identity' && 'Your birth information and basic details'}
                        {section.id === 'western' && 'Tropical zodiac analysis and planetary positions'}
                        {section.id === 'vedic' && 'Sidereal zodiac with Nakshatras and Dasha'}
                        {section.id === 'numerology' && 'Pythagorean and Chaldean number analysis'}
                        {section.id === 'elements' && 'Fire, Earth, Air, and Water balance'}
                        {section.id === 'houses' && '12 houses and planetary placements'}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 border-t pt-6"
                    >
                      {section.id === 'identity' && birthData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Full Name</label>
                              <p className="text-lg font-semibold text-gray-900">{birthData.name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Birth Date</label>
                              <p className="text-lg font-semibold text-gray-900">{birthData.birthDate}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Birth Time</label>
                              <p className="text-lg font-semibold text-gray-900">{birthData.birthTime}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Birth Place</label>
                              <p className="text-lg font-semibold text-gray-900">{birthData.birthPlace}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Coordinates</label>
                              <p className="text-lg font-semibold text-gray-900">
                                {birthData.latitude}°N, {birthData.longitude}°E
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Timezone</label>
                              <p className="text-lg font-semibold text-gray-900">{birthData.timezone}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.id === 'western' && astrologyData && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Sun</h4>
                              <div className="text-2xl font-bold text-yellow-600">
                                {astrologyData.western.sun.sign}
                              </div>
                              <div className="text-sm text-gray-600">
                                {astrologyData.western.sun.degree.toFixed(1)}° • House {astrologyData.western.sun.house}
                              </div>
                              <div className={`text-sm ${getElementColor(astrologyData.western.sun.element)}`}>
                                {astrologyData.western.sun.element}
                              </div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Moon</h4>
                              <div className="text-2xl font-bold text-blue-600">
                                {astrologyData.western.moon.sign}
                              </div>
                              <div className="text-sm text-gray-600">
                                {astrologyData.western.moon.degree.toFixed(1)}° • House {astrologyData.western.moon.house}
                              </div>
                              <div className={`text-sm ${getElementColor(astrologyData.western.moon.element)}`}>
                                {astrologyData.western.moon.element}
                              </div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Ascendant</h4>
                              <div className="text-2xl font-bold text-green-600">
                                {astrologyData.western.ascendant.sign}
                              </div>
                              <div className="text-sm text-gray-600">
                                {astrologyData.western.ascendant.degree.toFixed(1)}°
                              </div>
                              <div className={`text-sm ${getElementColor(astrologyData.western.ascendant.element)}`}>
                                {astrologyData.western.ascendant.element}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">All Planets</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {astrologyData.western.planets.map((planet) => (
                                <div key={planet.name} className="text-center p-3 bg-gray-50 rounded-lg">
                                  <div className="font-semibold text-gray-900">{planet.name}</div>
                                  <div className="text-lg font-bold text-violet-600">{planet.sign}</div>
                                  <div className="text-xs text-gray-600">
                                    {planet.degree.toFixed(1)}° • H{planet.house}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {section.id === 'vedic' && astrologyData && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Sun (Vedic)</h4>
                              <div className="text-2xl font-bold text-yellow-600">
                                {astrologyData.vedic.sun.sign}
                              </div>
                              <div className="text-sm text-gray-600">
                                {astrologyData.vedic.sun.nakshatra} Pada {astrologyData.vedic.sun.pada}
                              </div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Moon (Vedic)</h4>
                              <div className="text-2xl font-bold text-blue-600">
                                {astrologyData.vedic.moon.sign}
                              </div>
                              <div className="text-sm text-gray-600">
                                {astrologyData.vedic.moon.nakshatra} Pada {astrologyData.vedic.moon.pada}
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-violet-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Current Dasha</h4>
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
                      )}

                      {section.id === 'numerology' && numerologyData && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-violet-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Life Path</h4>
                              <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.lifePath)}`}>
                                {numerologyData.lifePath}
                              </div>
                              <div className="text-xs text-gray-500">Your life's purpose</div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Expression</h4>
                              <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.expression)}`}>
                                {numerologyData.expression}
                              </div>
                              <div className="text-xs text-gray-500">Your talents</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Soul Urge</h4>
                              <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.soulUrge)}`}>
                                {numerologyData.soulUrge}
                              </div>
                              <div className="text-xs text-gray-500">Your heart's desire</div>
                            </div>
                          </div>

                          {numerologyData.masterNumbers.length > 0 && (
                            <div className="p-4 bg-yellow-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Master Numbers</h4>
                              <div className="flex flex-wrap gap-2">
                                {numerologyData.masterNumbers.map((number) => (
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

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Chaldean System</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-900">Life Path</div>
                                <div className="text-xl font-bold text-violet-600">
                                  {numerologyData.chaldean.lifePath}
                                </div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-900">Expression</div>
                                <div className="text-xl font-bold text-blue-600">
                                  {numerologyData.chaldean.expression}
                                </div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-900">Soul Urge</div>
                                <div className="text-xl font-bold text-green-600">
                                  {numerologyData.chaldean.soulUrge}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.id === 'elements' && astrologyData && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(astrologyData.western.elements).map(([element, count]) => (
                              <div key={element} className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className={`text-3xl font-bold ${getElementColor(element)}`}>
                                  {count}
                                </div>
                                <div className="text-sm text-gray-600 capitalize">{element}</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      element === 'fire' ? 'bg-red-500' :
                                      element === 'earth' ? 'bg-green-500' :
                                      element === 'air' ? 'bg-blue-500' : 'bg-purple-500'
                                    }`}
                                    style={{ width: `${(count / 12) * 100}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.id === 'houses' && astrologyData && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {astrologyData.western.houses.map((house) => (
                              <div key={house.number} className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-900">House {house.number}</div>
                                <div className="text-lg font-bold text-violet-600">{house.sign}</div>
                                <div className="text-xs text-gray-600">
                                  {house.cusp}°
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      <CosmicNavigation />
    </div>
  )
}



