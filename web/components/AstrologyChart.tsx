'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sun, 
  Moon, 
  Zap, 
  Star, 
  Compass, 
  Globe, 
  Sparkles,
  TrendingUp,
  Heart,
  Target
} from 'lucide-react'

interface AstrologyChartProps {
  profile: {
    fullName: string
    birthDate: string
    birthTime: string
    birthPlace: string
    latitude: number
    longitude: number
    timezone: string
  }
}

interface ChartData {
  planets: {
    sun: { longitude: number; latitude: number; distance: number; speed: number }
    moon: { longitude: number; latitude: number; distance: number; speed: number }
    mercury: { longitude: number; latitude: number; distance: number; speed: number }
    venus: { longitude: number; latitude: number; distance: number; speed: number }
    mars: { longitude: number; latitude: number; distance: number; speed: number }
    jupiter: { longitude: number; latitude: number; distance: number; speed: number }
    saturn: { longitude: number; latitude: number; distance: number; speed: number }
    uranus: { longitude: number; latitude: number; distance: number; speed: number }
    neptune: { longitude: number; latitude: number; distance: number; speed: number }
    pluto: { longitude: number; latitude: number; distance: number; speed: number }
    northNode: { longitude: number; latitude: number; distance: number; speed: number }
    southNode: { longitude: number; latitude: number; distance: number; speed: number }
  }
  houses: {
    ascendant: number
    mc: number
    cusps: Array<{ cusp: number; longitude: number }>
  }
  sidereal: {
    planets: any
    houses: any
  }
  nakshatra: {
    moon: string
    pada: number
    lord: string
  }
  dasha: {
    current: string
    sub: string
    start: string
    end: string
  }
}

export default function AstrologyChart({ profile }: AstrologyChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'tropical' | 'sidereal' | 'vedic'>('tropical')

  useEffect(() => {
    calculateChart()
  }, [profile])

  const calculateChart = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/astrology-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDate: profile.birthDate,
          latitude: profile.latitude,
          longitude: profile.longitude,
          timezone: profile.timezone,
          ayanamsha: 'LAHIRI'
        })
      })
      
      const data = await response.json()
      setChartData(data.data)
    } catch (error) {
      console.error('Error calculating chart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getZodiacSign = (longitude: number): string => {
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ]
    const signIndex = Math.floor(longitude / 30)
    return signs[signIndex] || 'Unknown'
  }

  const getZodiacSymbol = (sign: string): string => {
    const symbols: { [key: string]: string } = {
      'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
      'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
      'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
    }
    return symbols[sign] || '⭐'
  }

  const getPlanetIcon = (planet: string) => {
    const icons: { [key: string]: any } = {
      sun: Sun,
      moon: Moon,
      mercury: Zap,
      venus: Heart,
      mars: Target,
      jupiter: Star,
      saturn: Globe,
      uranus: Sparkles,
      neptune: Compass,
      pluto: TrendingUp
    }
    return icons[planet] || Star
  }

  const getPlanetColor = (planet: string): string => {
    const colors: { [key: string]: string } = {
      sun: 'text-supernova-gold',
      moon: 'text-celestial-blue',
      mercury: 'text-electric-violet',
      venus: 'text-nebula-pink',
      mars: 'text-red-400',
      jupiter: 'text-aurora-green',
      saturn: 'text-gray-400',
      uranus: 'text-cyan-400',
      neptune: 'text-blue-400',
      pluto: 'text-purple-400'
    }
    return colors[planet] || 'text-white'
  }

  if (isLoading) {
    return (
      <div className="cosmic-card">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-electric-violet/30 border-t-electric-violet rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Calculating your cosmic chart...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!chartData) {
    return (
      <div className="cosmic-card">
        <div className="text-center py-8">
          <p className="text-white/70">Unable to calculate chart. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cosmic-card">
      <div className="mb-6">
        <h3 className="text-2xl font-bold cosmic-text mb-2">Astrology Chart</h3>
        <p className="text-white/70">Real planetary positions and house calculations</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        {[
          { id: 'tropical', label: 'Western', icon: Globe },
          { id: 'sidereal', label: 'Vedic', icon: Compass },
          { id: 'vedic', label: 'Advanced', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-electric-violet text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Chart Content */}
      <div className="space-y-6">
        {/* Planets */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Planetary Positions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(chartData.planets).map(([planet, data]) => {
              const Icon = getPlanetIcon(planet)
              const sign = getZodiacSign(data.longitude)
              const symbol = getZodiacSymbol(sign)
              const colorClass = getPlanetColor(planet)
              
              return (
                <motion.div
                  key={planet}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.random() * 0.2 }}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass} bg-white/10`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium capitalize">{planet}</p>
                    <p className="text-white/70 text-sm">
                      {symbol} {sign} {data.longitude.toFixed(1)}°
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Houses */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">House System</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Compass className="w-4 h-4 text-electric-violet" />
                <span className="text-white font-medium">Ascendant</span>
              </div>
              <p className="text-white/70 text-sm">
                {getZodiacSign(chartData.houses.ascendant)} {chartData.houses.ascendant.toFixed(1)}°
              </p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-supernova-gold" />
                <span className="text-white font-medium">Midheaven</span>
              </div>
              <p className="text-white/70 text-sm">
                {getZodiacSign(chartData.houses.mc)} {chartData.houses.mc.toFixed(1)}°
              </p>
            </div>
          </div>
        </div>

        {/* Vedic Elements */}
        {activeTab === 'sidereal' && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Vedic Elements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Moon className="w-4 h-4 text-celestial-blue" />
                  <span className="text-white font-medium">Nakshatra</span>
                </div>
                <p className="text-white/70 text-sm">
                  {chartData.nakshatra.moon} (Pada {chartData.nakshatra.pada})
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Lord: {chartData.nakshatra.lord}
                </p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-aurora-green" />
                  <span className="text-white font-medium">Dasha</span>
                </div>
                <p className="text-white/70 text-sm">
                  {chartData.dasha.current} Dasha
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Sub: {chartData.dasha.sub}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
