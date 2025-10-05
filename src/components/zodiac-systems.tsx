'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Globe, Sparkles, Heart, Moon, Sun } from 'lucide-react'

interface ZodiacSystemsProps {
  user?: {
    zodiacSign?: string
    system?: string
  } | null
  onSystemChange?: (system: string) => void
}

export function ZodiacSystems({ user, onSystemChange }: ZodiacSystemsProps) {
  const [selectedSystem, setSelectedSystem] = useState(user?.system || 'western')

  const systems = [
    {
      id: 'western',
      name: 'Western Astrology',
      description: 'Traditional 12-sign zodiac system',
      icon: Star,
      color: 'blue',
      signs: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    },
    {
      id: 'vedic',
      name: 'Vedic Astrology',
      description: 'Ancient Indian astrological system',
      icon: Sparkles,
      color: 'purple',
      signs: ['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena']
    },
    {
      id: 'chinese',
      name: 'Chinese Zodiac',
      description: '12-year cycle with animal signs',
      icon: Heart,
      color: 'red',
      signs: ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']
    },
    {
      id: 'sri_lankan',
      name: 'Sri Lankan Zodiac',
      description: 'Traditional Sinhala astrological system',
      icon: Globe,
      color: 'green',
      signs: ['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena']
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      green: 'bg-green-100 text-green-700 border-green-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Star className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Zodiac Systems</h3>
          <p className="text-sm text-gray-600">Explore different astrological traditions</p>
        </div>
      </div>

      {/* System Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {systems.map((system) => (
          <motion.button
            key={system.id}
            onClick={() => {
              setSelectedSystem(system.id)
              onSystemChange?.(system.id)
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedSystem === system.id
                ? `${getColorClasses(system.color)} border-current`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <system.icon className="w-5 h-5" />
              <h4 className="font-medium">{system.name}</h4>
            </div>
            <p className="text-sm text-gray-600 text-left">{system.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Selected System Details */}
      {selectedSystem && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 rounded-lg p-4"
        >
          <h4 className="font-medium text-gray-900 mb-3">
            {systems.find(s => s.id === selectedSystem)?.name} Signs
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {systems.find(s => s.id === selectedSystem)?.signs.map((sign, index) => (
              <div
                key={index}
                className="p-2 bg-white rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {sign}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Current User Info */}
      {user?.zodiacSign && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Sun className="w-4 h-4 text-yellow-500" />
            <h4 className="font-medium text-gray-900">Your Sign</h4>
          </div>
          <p className="text-gray-700">
            <span className="font-medium">{user.zodiacSign}</span> in {systems.find(s => s.id === selectedSystem)?.name}
          </p>
        </div>
      )}
    </motion.div>
  )
}