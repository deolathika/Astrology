'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Star, 
  Moon, 
  Sun, 
  Sparkles, 
  Heart, 
  Shield, 
  Crown,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Download,
  Share2,
  RefreshCw,
  Settings,
  Info,
  CheckCircle
} from 'lucide-react'
import { CosmicCard, CosmicButton, CosmicInput } from '@/components/cosmic'
import { UserFlowRouter } from '@/components/user-flow/UserFlowRouter'
import { FeatureGate } from '@/components/user-flow/FeatureGate'

interface BirthData {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
  latitude: number
  longitude: number
  timezone: string
}

interface AstrologyResult {
  system: string
  sunSign: string
  moonSign: string
  risingSign: string
  planets: Array<{
    name: string
    sign: string
    degree: number
    house: number
  }>
  houses: Array<{
    number: number
    sign: string
    degree: number
  }>
  aspects: Array<{
    planet1: string
    planet2: string
    aspect: string
    orb: number
  }>
}

export default function AstrologyPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeSystem, setActiveSystem] = useState('western')
  const [birthData, setBirthData] = useState<BirthData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: 0,
    longitude: 0,
    timezone: 'UTC'
  })
  const [results, setResults] = useState<AstrologyResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const zodiacSystems = [
    {
      id: 'western',
      name: 'Western Astrology',
      description: 'Traditional Western zodiac system',
      icon: Star,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'vedic',
      name: 'Vedic Astrology',
      description: 'Ancient Indian astrological system',
      icon: Moon,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'chinese',
      name: 'Chinese Astrology',
      description: '12-year animal cycle system',
      icon: Sun,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'sri_lankan',
      name: 'Sri Lankan',
      description: 'Traditional Sri Lankan system',
      icon: Sparkles,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'hybrid',
      name: 'Hybrid System',
      description: 'Combined approach for accuracy',
      icon: Target,
      color: 'from-violet-500 to-purple-500'
    }
  ]

  const handleCalculate = async () => {
    if (!birthData.name || !birthData.birthDate || !birthData.birthTime) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/astro/complete-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...birthData,
          systems: zodiacSystems.map(s => s.id)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to calculate astrology data')
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    // Handle PDF export
    console.log('Exporting astrology data...')
  }

  const handleShare = () => {
    // Handle sharing
    console.log('Sharing astrology data...')
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please sign in to access astrology features</h1>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <UserFlowRouter>
      <div className="min-h-screen cosmic-bg">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold cosmic-text-gradient">Astrology Systems</h1>
              <p className="text-violet-300">Explore multiple astrological traditions</p>
            </div>
            <div className="flex items-center space-x-4">
              <CosmicButton
                variant="ghost"
                onClick={handleExport}
                icon={<Download className="w-4 h-4" />}
              >
                Export
              </CosmicButton>
              <CosmicButton
                variant="ghost"
                onClick={handleShare}
                icon={<Share2 className="w-4 h-4" />}
              >
                Share
              </CosmicButton>
            </div>
          </div>
        </motion.header>

        <div className="container mx-auto px-4 pb-16">
          {/* Birth Data Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <CosmicCard variant="glass" className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Birth Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CosmicInput
                  label="Full Name"
                  value={birthData.name}
                  onChange={(e) => setBirthData({ ...birthData, name: e.target.value })}
                  placeholder="Enter your full name"
                  icon={<Star className="w-4 h-4" />}
                />
                
                <CosmicInput
                  label="Birth Date"
                  type="date"
                  value={birthData.birthDate}
                  onChange={(e) => setBirthData({ ...birthData, birthDate: e.target.value })}
                  icon={<Calendar className="w-4 h-4" />}
                />
                
                <CosmicInput
                  label="Birth Time"
                  type="time"
                  value={birthData.birthTime}
                  onChange={(e) => setBirthData({ ...birthData, birthTime: e.target.value })}
                  icon={<Clock className="w-4 h-4" />}
                />
                
                <CosmicInput
                  label="Birth Place"
                  value={birthData.birthPlace}
                  onChange={(e) => setBirthData({ ...birthData, birthPlace: e.target.value })}
                  placeholder="City, Country"
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300"
                >
                  {error}
                </motion.div>
              )}

              <div className="mt-6 flex justify-end">
                <CosmicButton
                  onClick={handleCalculate}
                  loading={loading}
                  disabled={loading}
                  icon={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                >
                  {loading ? 'Calculating...' : 'Calculate Chart'}
                </CosmicButton>
              </div>
            </CosmicCard>
          </motion.section>

          {/* Zodiac Systems */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Choose Astrological Systems</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {zodiacSystems.map((system) => (
                <motion.div
                  key={system.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSystem(system.id)}
                  className={`cursor-pointer transition-all ${
                    activeSystem === system.id 
                      ? 'ring-2 ring-gold-400 shadow-cosmic-glow' 
                      : 'hover:ring-1 hover:ring-violet-400'
                  }`}
                >
                  <CosmicCard variant="glass" className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${system.color} rounded-lg flex items-center justify-center`}>
                        <system.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{system.name}</h3>
                        <p className="text-sm text-violet-300">{system.description}</p>
                      </div>
                    </div>
                    
                    {activeSystem === system.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center text-gold-400 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Selected
                      </motion.div>
                    )}
                  </CosmicCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white">Your Astrological Profile</h2>
                
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CosmicCard variant="glass" className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white capitalize">
                          {result.system} Astrology
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-violet-300">Sun: {result.sunSign}</span>
                          <span className="text-sm text-violet-300">Moon: {result.moonSign}</span>
                          <span className="text-sm text-violet-300">Rising: {result.risingSign}</span>
                        </div>
                      </div>

                      {/* Planetary Positions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-gold-400 mb-2">Planetary Positions</h4>
                          <div className="space-y-2">
                            {result.planets.map((planet, planetIndex) => (
                              <div key={planetIndex} className="flex justify-between text-sm">
                                <span className="text-violet-300">{planet.name}</span>
                                <span className="text-white">{planet.sign} {planet.degree.toFixed(1)}°</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gold-400 mb-2">Houses</h4>
                          <div className="space-y-2">
                            {result.houses.slice(0, 6).map((house, houseIndex) => (
                              <div key={houseIndex} className="flex justify-between text-sm">
                                <span className="text-violet-300">House {house.number}</span>
                                <span className="text-white">{house.sign} {house.degree.toFixed(1)}°</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Aspects */}
                      {result.aspects.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gold-400 mb-2">Key Aspects</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {result.aspects.slice(0, 6).map((aspect, aspectIndex) => (
                              <div key={aspectIndex} className="flex justify-between text-sm bg-violet-800/20 p-2 rounded">
                                <span className="text-violet-300">{aspect.planet1} - {aspect.planet2}</span>
                                <span className="text-white">{aspect.aspect} ({aspect.orb.toFixed(1)}°)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CosmicCard>
                  </motion.div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>

          {/* Premium Features Gate */}
          <FeatureGate feature="advancedAstrology">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <CosmicCard variant="glass" className="p-6 text-center">
                <Crown className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Unlock Advanced Astrology</h3>
                <p className="text-violet-300 mb-4">
                  Get detailed transit analysis, progression charts, and personalized cosmic guidance
                </p>
                <CosmicButton
                  variant="premium"
                  onClick={() => router.push('/premium')}
                  icon={<Crown className="w-4 h-4" />}
                >
                  Upgrade to Premium
                </CosmicButton>
              </CosmicCard>
            </motion.section>
          </FeatureGate>
        </div>
      </div>
    </UserFlowRouter>
  )
}