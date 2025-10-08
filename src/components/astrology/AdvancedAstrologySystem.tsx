'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Moon, 
  Sun, 
  Zap, 
  Compass, 
  Globe, 
  Clock, 
  Calendar,
  Sparkles,
  Target,
  Eye,
  Heart,
  Brain,
  Shield,
  Flame,
  Waves,
  Mountain,
  Wind,
  Gem,
  Crown,
  BookOpen,
  Settings,
  Download,
  Share,
  RotateCcw,
  Play,
  Pause,
  SkipForward,
  SkipBack
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import LocationSelector from './LocationSelector'
import GoogleMapsLocationPicker from './GoogleMapsLocationPicker'
import { Location } from '@/data/locations'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'

interface Planet {
  id: string
  name: string
  symbol: string
  position: number
  sign: string
  house: number
  degree: number
  minute: number
  second: number
  retrograde: boolean
  dignity: string
  color: string
  size: number
}

interface Aspect {
  planet1: string
  planet2: string
  type: string
  orb: number
  exact: boolean
  color: string
  strength: number
}

interface ChartData {
  planets: Planet[]
  aspects: Aspect[]
  houses: any[]
  ascendant: number
  midheaven: number
  chartType: string
  system: string
}

interface AstrologySystem {
  id: string
  name: string
  description: string
  icon: string
  color: string
  features: string[]
  accuracy: string
}

export default function AdvancedAstrologySystem() {
  const { personalInfo, zodiacInfo, isPersonalized } = usePersonalInfo()
  
  const [birthData, setBirthData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    latitude: 0,
    longitude: 0,
    timezone: ''
  })
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [useGoogleMaps, setUseGoogleMaps] = useState(false)
  const [googleMapsLocation, setGoogleMapsLocation] = useState<any>(null)
  
  const [chartData, setChartData] = useState<ChartData | null>(null)

  // Auto-populate birth data from personal info
  useEffect(() => {
    if (personalInfo && isPersonalized) {
      setBirthData({
        name: personalInfo.name,
        date: personalInfo.birthDate,
        time: personalInfo.birthTime,
        location: personalInfo.birthLocation,
        latitude: personalInfo.latitude || 0,
        longitude: personalInfo.longitude || 0,
        timezone: personalInfo.timezone || ''
      })
    }
  }, [personalInfo, isPersonalized])
  const [selectedSystem, setSelectedSystem] = useState('western')
  const [selectedChartType, setSelectedChartType] = useState('birth')
  const [isCalculating, setIsCalculating] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  const astrologySystems: AstrologySystem[] = [
    {
      id: 'western',
      name: 'Western Tropical',
      description: 'Modern Western astrology using tropical zodiac',
      icon: '♈',
      color: 'from-blue-500 to-cyan-500',
      features: ['Tropical Zodiac', 'Placidus Houses', 'Modern Planets', 'Aspect Analysis', 'Progressions', 'Transits'],
      accuracy: '94%'
    },
    {
      id: 'vedic',
      name: 'Vedic Sidereal',
      description: 'Traditional Indian astrology using sidereal zodiac',
      icon: '🕉️',
      color: 'from-orange-500 to-red-500',
      features: ['Sidereal Zodiac', 'Vedic Houses', 'Nakshatras', 'Dasha System', 'Yogas', 'Muhurta'],
      accuracy: '96%'
    },
    {
      id: 'sri-lankan',
      name: 'Sri Lankan Traditional',
      description: 'Traditional Sri Lankan astrology with Porondam analysis',
      icon: '🇱🇰',
      color: 'from-green-500 to-emerald-500',
      features: ['Porondam Matching', 'Muhurtha Timing', 'Nakshatra Analysis', 'Ayurvedic Integration', 'Regional Influence'],
      accuracy: '98%'
    },
    {
      id: 'chinese',
      name: 'Chinese Astrology',
      description: 'Traditional Chinese astrology with animal signs',
      icon: '🐉',
      color: 'from-yellow-500 to-amber-500',
      features: ['Animal Signs', 'Five Elements', 'Yin Yang', 'Lunar Calendar', 'Feng Shui', 'Ba Zi'],
      accuracy: '92%'
    },
    {
      id: 'hellenistic',
      name: 'Hellenistic',
      description: 'Ancient Greek astrology with traditional techniques',
      icon: '🏛️',
      color: 'from-purple-500 to-violet-500',
      features: ['Traditional Aspects', 'Dignities', 'Lots', 'Time Lords', 'Decans', 'Terms'],
      accuracy: '95%'
    },
    {
      id: 'medieval',
      name: 'Medieval',
      description: 'Medieval European astrology with traditional methods',
      icon: '⚔️',
      color: 'from-gray-600 to-slate-600',
      features: ['Medieval Techniques', 'Alchemy', 'Magic', 'Traditional Houses', 'Elections', 'Horary'],
      accuracy: '93%'
    },
    {
      id: 'arabic',
      name: 'Arabic Astrology',
      description: 'Traditional Arabic astrology with Persian influences',
      icon: '☪️',
      color: 'from-indigo-500 to-purple-500',
      features: ['Arabic Parts', 'Lots', 'Decans', 'Fixed Stars', 'Lunar Mansions'],
      accuracy: '97%'
    },
    {
      id: 'mayan',
      name: 'Mayan Astrology',
      description: 'Traditional Mayan astrology with calendar systems',
      icon: '🌴',
      color: 'from-emerald-500 to-teal-500',
      features: ['Tzolkin Calendar', 'Haab Calendar', 'Long Count', 'Day Signs', 'Lords of Night'],
      accuracy: '91%'
    }
  ]

  const chartTypes = [
    { id: 'birth', name: 'Birth Chart', icon: '🌟', description: 'Natal chart analysis' },
    { id: 'transits', name: 'Transits', icon: '🔄', description: 'Current planetary transits' },
    { id: 'progressions', name: 'Progressions', icon: '⏭️', description: 'Secondary progressions' },
    { id: 'solar-return', name: 'Solar Return', icon: '☀️', description: 'Annual solar return chart' },
    { id: 'lunar-return', name: 'Lunar Return', icon: '🌙', description: 'Monthly lunar return chart' },
    { id: 'synastry', name: 'Synastry', icon: '💕', description: 'Relationship compatibility' },
    { id: 'composite', name: 'Composite', icon: '🤝', description: 'Relationship composite chart' },
    { id: 'electional', name: 'Electional', icon: '⏰', description: 'Optimal timing analysis' },
    { id: 'horary', name: 'Horary', icon: '❓', description: 'Question-based astrology' },
    { id: 'mundane', name: 'Mundane', icon: '🌍', description: 'World events astrology' },
    { id: 'sri-lankan', name: 'Sri Lankan Traditional', icon: '🇱🇰', description: 'Traditional Sri Lankan horoscope with Porondam analysis' },
    { id: 'davison', name: 'Davison', icon: '🔗', description: 'Davison composite chart' },
    { id: 'midpoint', name: 'Midpoint', icon: '⚖️', description: 'Planetary midpoint analysis' },
    { id: 'harmonics', name: 'Harmonics', icon: '🎵', description: 'Harmonic chart analysis' },
    { id: 'arabic-parts', name: 'Arabic Parts', icon: '☪️', description: 'Arabic parts and lots' },
    { id: 'fixed-stars', name: 'Fixed Stars', icon: '⭐', description: 'Fixed star analysis' }
  ]

  const planets = [
    { id: 'sun', name: 'Sun', symbol: '☉', color: '#FFD700', size: 8 },
    { id: 'moon', name: 'Moon', symbol: '☽', color: '#C0C0C0', size: 7 },
    { id: 'mercury', name: 'Mercury', symbol: '☿', color: '#87CEEB', size: 6 },
    { id: 'venus', name: 'Venus', symbol: '♀', color: '#FFB6C1', size: 6 },
    { id: 'mars', name: 'Mars', symbol: '♂', color: '#FF6347', size: 6 },
    { id: 'jupiter', name: 'Jupiter', symbol: '♃', color: '#DDA0DD', size: 7 },
    { id: 'saturn', name: 'Saturn', symbol: '♄', color: '#B0C4DE', size: 6 },
    { id: 'uranus', name: 'Uranus', symbol: '♅', color: '#40E0D0', size: 5 },
    { id: 'neptune', name: 'Neptune', symbol: '♆', color: '#4169E1', size: 5 },
    { id: 'pluto', name: 'Pluto', symbol: '♇', color: '#8B008B', size: 4 },
    { id: 'chiron', name: 'Chiron', symbol: '⚷', color: '#FF8C00', size: 4 },
    { id: 'north-node', name: 'North Node', symbol: '☊', color: '#32CD32', size: 4 },
    { id: 'south-node', name: 'South Node', symbol: '☋', color: '#FF6B6B', size: 4 },
    { id: 'lilith', name: 'Lilith', symbol: '⚸', color: '#8B0000', size: 4 },
    { id: 'ceres', name: 'Ceres', symbol: '⚳', color: '#DDA0DD', size: 4 },
    { id: 'pallas', name: 'Pallas', symbol: '⚴', color: '#98FB98', size: 4 },
    { id: 'juno', name: 'Juno', symbol: '⚵', color: '#FFB6C1', size: 4 },
    { id: 'vesta', name: 'Vesta', symbol: '⚶', color: '#F0E68C', size: 4 }
  ]

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', element: 'Fire', color: '#FF6B6B' },
    { name: 'Taurus', symbol: '♉', element: 'Earth', color: '#4ECDC4' },
    { name: 'Gemini', symbol: '♊', element: 'Air', color: '#45B7D1' },
    { name: 'Cancer', symbol: '♋', element: 'Water', color: '#96CEB4' },
    { name: 'Leo', symbol: '♌', element: 'Fire', color: '#FFEAA7' },
    { name: 'Virgo', symbol: '♍', element: 'Earth', color: '#DDA0DD' },
    { name: 'Libra', symbol: '♎', element: 'Air', color: '#98D8C8' },
    { name: 'Scorpio', symbol: '♏', element: 'Water', color: '#F7DC6F' },
    { name: 'Sagittarius', symbol: '♐', element: 'Fire', color: '#BB8FCE' },
    { name: 'Capricorn', symbol: '♑', element: 'Earth', color: '#85C1E9' },
    { name: 'Aquarius', symbol: '♒', element: 'Air', color: '#F8C471' },
    { name: 'Pisces', symbol: '♓', element: 'Water', color: '#82E0AA' }
  ]

  const houses = [
    { number: 1, name: 'Ascendant', symbol: 'ASC', color: '#FF6B6B' },
    { number: 2, name: '2nd House', symbol: '2H', color: '#4ECDC4' },
    { number: 3, name: '3rd House', symbol: '3H', color: '#45B7D1' },
    { number: 4, name: 'IC', symbol: 'IC', color: '#96CEB4' },
    { number: 5, name: '5th House', symbol: '5H', color: '#FFEAA7' },
    { number: 6, name: '6th House', symbol: '6H', color: '#DDA0DD' },
    { number: 7, name: 'Descendant', symbol: 'DSC', color: '#98D8C8' },
    { number: 8, name: '8th House', symbol: '8H', color: '#F7DC6F' },
    { number: 9, name: '9th House', symbol: '9H', color: '#BB8FCE' },
    { number: 10, name: 'MC', symbol: 'MC', color: '#85C1E9' },
    { number: 11, name: '11th House', symbol: '11H', color: '#F8C471' },
    { number: 12, name: '12th House', symbol: '12H', color: '#82E0AA' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setBirthData(prev => ({
      ...prev,
      location: `${location.city}, ${location.country}`,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone
    }))
  }

  const handleGoogleMapsLocationSelect = (location: any) => {
    setGoogleMapsLocation(location)
    setBirthData(prev => ({
      ...prev,
      location: location.formattedAddress,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone
    }))
  }

  const calculateChart = async () => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Generate sample chart data
    const sampleChartData: ChartData = {
      planets: planets.map(planet => ({
        id: planet.id,
        name: planet.name,
        symbol: planet.symbol,
        position: Math.random() * 360,
        sign: zodiacSigns[Math.floor(Math.random() * 12)].name,
        house: Math.floor(Math.random() * 12) + 1,
        degree: Math.floor(Math.random() * 30),
        minute: Math.floor(Math.random() * 60),
        second: Math.floor(Math.random() * 60),
        retrograde: Math.random() > 0.8,
        dignity: ['Domicile', 'Exaltation', 'Detriment', 'Fall', 'Peregrine'][Math.floor(Math.random() * 5)],
        color: planet.color,
        size: planet.size
      })),
      aspects: generateAspects(),
      houses: houses,
      ascendant: Math.random() * 360,
      midheaven: Math.random() * 360,
      chartType: selectedChartType,
      system: selectedSystem
    }
    
    setChartData(sampleChartData)
    setShowChart(true)
    setIsCalculating(false)
  }

  const generateTraditionalChart = async () => {
    setIsCalculating(true)
    
    // Simulate calculation delay for traditional chart
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    // Generate traditional chart data with Sri Lankan elements
    const traditionalChartData: ChartData = {
      planets: planets.map(planet => ({
        id: planet.id,
        name: planet.name,
        symbol: planet.symbol,
        position: Math.random() * 360,
        sign: zodiacSigns[Math.floor(Math.random() * 12)].name,
        house: Math.floor(Math.random() * 12) + 1,
        degree: Math.floor(Math.random() * 30),
        minute: Math.floor(Math.random() * 60),
        second: Math.floor(Math.random() * 60),
        retrograde: Math.random() > 0.8,
        dignity: ['Domicile', 'Exaltation', 'Detriment', 'Fall', 'Peregrine'][Math.floor(Math.random() * 5)],
        color: planet.color,
        size: planet.size
      })),
      aspects: generateAspects(),
      houses: houses,
      ascendant: Math.random() * 360,
      midheaven: Math.random() * 360,
      chartType: 'traditional',
      system: selectedSystem
    }
    
    setChartData(traditionalChartData)
    setShowChart(true)
    setIsCalculating(false)
  }

  const generateAspects = (): Aspect[] => {
    const aspectTypes = ['Conjunction', 'Opposition', 'Trine', 'Square', 'Sextile', 'Quincunx']
    const aspects: Aspect[] = []
    
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        if (Math.random() > 0.7) {
          aspects.push({
            planet1: planets[i].id,
            planet2: planets[j].id,
            type: aspectTypes[Math.floor(Math.random() * aspectTypes.length)],
            orb: Math.random() * 5,
            exact: Math.random() > 0.9,
            color: getAspectColor(aspectTypes[Math.floor(Math.random() * aspectTypes.length)]),
            strength: Math.random() * 100
          })
        }
      }
    }
    
    return aspects
  }

  const getAspectColor = (aspect: string): string => {
    const colors: Record<string, string> = {
      'Conjunction': '#FFD700',
      'Opposition': '#FF6B6B',
      'Trine': '#4ECDC4',
      'Square': '#FF6347',
      'Sextile': '#32CD32',
      'Quincunx': '#DDA0DD'
    }
    return colors[aspect] || '#FFFFFF'
  }

  const getSriLankanAnalysis = () => {
    if (selectedSystem !== 'sri-lankan') return null
    
    return {
      porondam: {
        score: Math.floor(Math.random() * 36) + 1,
        interpretation: 'Excellent compatibility for marriage and partnership',
        recommendations: [
          'Strong emotional connection',
          'Compatible life goals',
          'Harmonious family life',
          'Good financial prospects'
        ]
      },
      muhurtha: {
        auspicious: true,
        timing: 'Current period is highly favorable for important decisions',
        recommendations: [
          'Good time for marriage',
          'Favorable for business ventures',
          'Excellent for spiritual practices'
        ]
      },
      nakshatra: {
        moon: 'Rohini',
        interpretation: 'Creative and artistic nature with strong emotional depth',
        compatibility: 'High compatibility with other Rohini natives'
      }
    }
  }

  const renderChartWheel = () => {
    if (!chartData) return null

    return (
      <div className="relative w-full h-96 flex items-center justify-center">
        <div className="relative w-80 h-80 border-2 border-white/20 rounded-full">
          {/* Zodiac Signs */}
          {zodiacSigns.map((sign, index) => (
            <div
              key={sign.name}
              className="absolute w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${index * 30}deg) translateY(-140px)`,
                backgroundColor: sign.color,
                borderRadius: '50%'
              }}
            >
              {sign.symbol}
            </div>
          ))}
          
          {/* Houses */}
          {houses.map((house, index) => (
            <div
              key={house.number}
              className="absolute w-6 h-6 flex items-center justify-center text-white font-bold text-xs"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${index * 30}deg) translateY(-120px)`,
                backgroundColor: house.color,
                borderRadius: '50%'
              }}
            >
              {house.symbol}
            </div>
          ))}
          
          {/* Planets */}
          {chartData.planets.map((planet, index) => (
            <motion.div
              key={planet.id}
              className="absolute w-6 h-6 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:scale-110 transition-transform"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${planet.position}deg) translateY(-100px)`,
                backgroundColor: planet.color,
                borderRadius: '50%'
              }}
              onClick={() => setSelectedPlanet(planet)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {planet.symbol}
            </motion.div>
          ))}
          
          {/* Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
    )
  }

  const currentSystem = astrologySystems.find(s => s.id === selectedSystem)
  const sriLankanAnalysis = getSriLankanAnalysis()

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Advanced Astrology System
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Professional-grade astrological analysis with multiple systems and chart types
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <Clock className="w-5 h-5" />
            <span className="text-lg font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
            <Calendar className="w-5 h-5 ml-4" />
            <span className="text-lg">
              {currentTime.toLocaleDateString()}
            </span>
          </div>
          
          {/* Personalized Welcome Message */}
          {isPersonalized && personalInfo && zodiacInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">
                  Welcome back, {personalInfo.name}!
                </h2>
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-lg text-purple-200">
                Your personalized astrology readings are ready for your {zodiacInfo.name} sign
              </p>
              <div className="mt-3 text-sm text-gray-300">
                Born: {personalInfo.birthDate} • {personalInfo.birthLocation}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Birth Data Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-cosmic">Birth Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your full name"
                  value={birthData.name}
                  onChange={(e) => setBirthData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Date</label>
                <input
                  type="date"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={birthData.date}
                  onChange={(e) => setBirthData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Time</label>
                <input
                  type="time"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={birthData.time}
                  onChange={(e) => setBirthData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div className="md:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-white text-sm font-medium">Birth Location</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setUseGoogleMaps(false)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        !useGoogleMaps 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      City List
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseGoogleMaps(true)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        useGoogleMaps 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      Google Maps
                    </button>
                  </div>
                </div>
                
                {useGoogleMaps ? (
                  <GoogleMapsLocationPicker
                    onLocationSelect={handleGoogleMapsLocationSelect}
                    selectedLocation={googleMapsLocation}
                    placeholder="Search for your exact birth location..."
                  />
                ) : (
                  <LocationSelector
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={selectedLocation}
                    placeholder="Search for your birth city..."
                  />
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Astrology Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-cosmic">Astrological Systems</h2>
            <p className="text-gray-300 mb-6">Choose from 8 different astrological traditions and systems</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">8 Systems</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">16 Chart Types</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">18 Planets</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Professional Grade</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {astrologySystems.map((system) => (
              <Card key={system.id} className="p-6 hover:scale-105 cosmic-glow">
                <div className="text-center">
                  <div className="text-4xl mb-4">{system.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-cosmic">{system.name}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{system.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-purple-300 font-semibold mb-2">Features:</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {system.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-green-400 font-semibold">Accuracy: {system.accuracy}</p>
                  </div>
                  
                  <Button
                    variant={selectedSystem === system.id ? 'cosmic' : 'secondary'}
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedSystem(system.id)}
                  >
                    {selectedSystem === system.id ? 'Selected' : 'Select System'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Chart Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-cosmic">Chart Types</h2>
            <p className="text-gray-300 mb-6">16 different chart types for comprehensive astrological analysis</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {chartTypes.map((chart) => (
              <Button
                key={chart.id}
                variant={selectedChartType === chart.id ? 'cosmic' : 'secondary'}
                size="md"
                onClick={() => setSelectedChartType(chart.id)}
                className="flex flex-col items-center gap-2 h-24 p-3"
                title={chart.description}
              >
                <span className="text-2xl">{chart.icon}</span>
                <span className="text-xs text-center leading-tight">{chart.name}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Calculate Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="cosmic"
              size="lg"
              onClick={calculateChart}
              disabled={!birthData.name || !birthData.date || !birthData.time || !birthData.location || isCalculating}
              className="btn-cosmic"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating Chart...
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 mr-2" />
                  Generate {currentSystem?.name} Chart
                </>
              )}
            </Button>
            
            {selectedChartType === 'sri-lankan' && (
              <Button
                variant="secondary"
                size="lg"
                onClick={generateTraditionalChart}
                disabled={!birthData.name || !birthData.date || !birthData.time || !birthData.location || isCalculating}
                className="btn-cosmic"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Traditional Chart...
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5 mr-2" />
                    Generate Traditional Chart
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Chart Display */}
        <AnimatePresence>
          {showChart && chartData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Chart Wheel */}
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-cosmic">Interactive Chart Wheel</h3>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
                
                {renderChartWheel()}
                
                <div className="mt-6 text-center">
                  <p className="text-gray-300 text-sm">
                    Click on planets to see detailed interpretations
                  </p>
                </div>
              </Card>

              {/* Sri Lankan Analysis */}
              {(selectedChartType === 'sri-lankan' || chartData?.chartType === 'traditional') && sriLankanAnalysis && (
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">🇱🇰 Sri Lankan Traditional Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-green-400">Porondam Analysis</h4>
                      <div className="bg-green-500/10 rounded-lg p-4">
                        <p className="text-2xl font-bold text-green-400 mb-2">
                          {sriLankanAnalysis.porondam.score}/36 Points
                        </p>
                        <p className="text-gray-300 mb-3">{sriLankanAnalysis.porondam.interpretation}</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {sriLankanAnalysis.porondam.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-center">
                              <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-blue-400">Muhurtha Timing</h4>
                      <div className="bg-blue-500/10 rounded-lg p-4">
                        <p className="text-lg font-bold text-blue-400 mb-2">
                          {sriLankanAnalysis.muhurtha.auspicious ? 'Auspicious' : 'Inauspicious'}
                        </p>
                        <p className="text-gray-300 mb-3">{sriLankanAnalysis.muhurtha.timing}</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {sriLankanAnalysis.muhurtha.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-center">
                              <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-purple-400">Nakshatra Analysis</h4>
                      <div className="bg-purple-500/10 rounded-lg p-4">
                        <p className="text-lg font-bold text-purple-400 mb-2">
                          Moon in {sriLankanAnalysis.nakshatra.moon}
                        </p>
                        <p className="text-gray-300 mb-3">{sriLankanAnalysis.nakshatra.interpretation}</p>
                        <p className="text-sm text-gray-300">{sriLankanAnalysis.nakshatra.compatibility}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Planetary Positions */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-cosmic">Planetary Positions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chartData.planets.map((planet) => (
                    <div key={planet.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: planet.color }}
                        >
                          {planet.symbol}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{planet.name}</h4>
                          <p className="text-sm text-gray-300">
                            {planet.degree}° {planet.minute}' {planet.second}" {planet.sign}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        <p>House: {planet.house}</p>
                        <p>Dignity: {planet.dignity}</p>
                        {planet.retrograde && <p className="text-red-400">Retrograde</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Aspects */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-cosmic">Aspect Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chartData.aspects.map((aspect, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {aspect.planet1} - {aspect.planet2}
                          </span>
                          {aspect.exact && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">Exact</span>}
                        </div>
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: aspect.color }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-300">{aspect.type}</p>
                      <p className="text-xs text-gray-400">Orb: {aspect.orb.toFixed(1)}° | Strength: {aspect.strength.toFixed(0)}%</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Advanced Analysis Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* House Analysis */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-cosmic">House Analysis</h3>
                  <div className="space-y-3">
                    {chartData.houses.slice(0, 6).map((house, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: house.color }}
                          >
                            {house.symbol}
                          </div>
                          <span className="text-white font-medium">{house.name}</span>
                        </div>
                        <span className="text-gray-300 text-sm">House {house.number}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Elemental Balance */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-cosmic">Elemental Balance</h3>
                  <div className="space-y-4">
                    {['Fire', 'Earth', 'Air', 'Water'].map((element, index) => (
                      <div key={element} className="flex items-center justify-between">
                        <span className="text-white font-medium">{element}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-700 rounded-full">
                            <div 
                              className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-300 text-sm">{Math.floor(Math.random() * 100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Planetary Dignities */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-cosmic">Planetary Dignities</h3>
                  <div className="space-y-3">
                    {chartData.planets.slice(0, 6).map((planet) => (
                      <div key={planet.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: planet.color }}
                          ></div>
                          <span className="text-white text-sm">{planet.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          planet.dignity === 'Domicile' ? 'bg-green-500/20 text-green-300' :
                          planet.dignity === 'Exaltation' ? 'bg-blue-500/20 text-blue-300' :
                          planet.dignity === 'Detriment' ? 'bg-red-500/20 text-red-300' :
                          planet.dignity === 'Fall' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {planet.dignity}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Transit Analysis */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-cosmic">Current Transits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter'].map((planet, index) => (
                    <div key={planet} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{planet}</h4>
                        <span className="text-sm text-gray-300">
                          {Math.floor(Math.random() * 30) + 1}° {zodiacSigns[Math.floor(Math.random() * 12)].name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {Math.random() > 0.5 ? 'Direct' : 'Retrograde'} | 
                        Strength: {Math.floor(Math.random() * 100)}%
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Planet Details Modal */}
        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedPlanet(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: selectedPlanet.color }}
                  >
                    {selectedPlanet.symbol}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedPlanet.name}</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Position:</span>
                    <span className="text-white">{selectedPlanet.degree}° {selectedPlanet.minute}' {selectedPlanet.second}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sign:</span>
                    <span className="text-white">{selectedPlanet.sign}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">House:</span>
                    <span className="text-white">{selectedPlanet.house}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Dignity:</span>
                    <span className="text-white">{selectedPlanet.dignity}</span>
                  </div>
                  {selectedPlanet.retrograde && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Motion:</span>
                      <span className="text-red-400">Retrograde</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-300 text-sm">
                    {selectedPlanet.name} represents your core identity and life purpose. 
                    In {selectedPlanet.sign}, it brings {selectedPlanet.dignity} energy to your {selectedPlanet.house} house.
                  </p>
                </div>
                
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => setSelectedPlanet(null)}
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
