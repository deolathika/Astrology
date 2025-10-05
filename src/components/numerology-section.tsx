'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Calculator, Star, Heart, Moon, Sun } from 'lucide-react'

interface NumerologySectionProps {
  user?: {
    name?: string
    birthDate?: string
  } | null
}

export function NumerologySection({ user }: NumerologySectionProps) {
  const [numerologyData, setNumerologyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading numerology data
    const loadNumerology = async () => {
      try {
        // Mock numerology data - in production, this would come from an API
        const mockData = {
          lifePath: 7,
          destiny: 3,
          soulUrge: 5,
          personality: 2,
          expression: 8,
          maturity: 1,
          meanings: {
            lifePath: "The Seeker - Spiritual and analytical",
            destiny: "The Creative - Expressive and optimistic",
            soulUrge: "The Freedom Lover - Adventurous and curious",
            personality: "The Diplomat - Cooperative and supportive"
          },
          luckyNumbers: [7, 14, 21, 28],
          challenges: [4, 8],
          strengths: ['Intuitive', 'Analytical', 'Spiritual'],
          advice: "Focus on your spiritual growth and trust your intuition"
        }
        
        setNumerologyData(mockData)
      } catch (error) {
        console.error('Failed to load numerology data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNumerology()
  }, [user])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!numerologyData) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 text-center">
        <p className="text-red-600">Unable to load numerology data</p>
      </div>
    )
  }

  const coreNumbers = [
    { name: 'Life Path', number: numerologyData.lifePath, icon: Star, color: 'purple' },
    { name: 'Destiny', number: numerologyData.destiny, icon: Sun, color: 'yellow' },
    { name: 'Soul Urge', number: numerologyData.soulUrge, icon: Heart, color: 'pink' },
    { name: 'Personality', number: numerologyData.personality, icon: Moon, color: 'blue' }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200'
    }
    return colors[color as keyof typeof colors] || colors.purple
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
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Numerology Profile</h3>
          <p className="text-sm text-gray-600">Your cosmic numbers and their meanings</p>
        </div>
      </div>

      {/* Core Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {coreNumbers.map((number, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border-2 ${getColorClasses(number.color)}`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <number.icon className="w-5 h-5" />
              <h4 className="font-medium">{number.name}</h4>
            </div>
            <div className="text-center mb-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold">{number.number}</span>
              </div>
              <p className="text-sm text-gray-600">
                {numerologyData.meanings[number.name.toLowerCase().replace(' ', '')]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lucky Numbers */}
      <div className="bg-white/50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
          <Calculator className="w-4 h-4" />
          <span>Lucky Numbers</span>
        </h4>
        <div className="flex space-x-2">
          {numerologyData.luckyNumbers.map((number: number, index: number) => (
            <span
              key={index}
              className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-medium"
            >
              {number}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths & Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
          <div className="space-y-1">
            {numerologyData.strengths.map((strength: string, index: number) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-sm mr-2 mb-1"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 mb-2">Challenges</h4>
          <div className="space-y-1">
            {numerologyData.challenges.map((challenge: number, index: number) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm mr-2 mb-1"
              >
                {challenge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Advice */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Cosmic Advice</h4>
        <p className="text-gray-700 italic">"{numerologyData.advice}"</p>
      </div>
    </motion.div>
  )
}