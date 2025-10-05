'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, Heart, Moon, Sun, Zap, Shield, Crown } from 'lucide-react'

interface LuckyTrioCardProps {
  user?: {
    name?: string
    zodiacSign?: string
  } | null
}

export function LuckyTrioCard({ user }: LuckyTrioCardProps) {
  const [trio, setTrio] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading lucky trio
    const loadTrio = async () => {
      try {
        // Mock trio data - in production, this would come from an API
        const mockTrio = {
          date: new Date().toLocaleDateString(),
          numbers: [7, 14, 21],
          colors: ['Purple', 'Gold', 'Silver'],
          crystals: ['Amethyst', 'Citrine', 'Rose Quartz'],
          meanings: {
            numbers: 'These numbers represent spiritual growth, intuition, and divine guidance',
            colors: 'Purple for spirituality, Gold for wisdom, Silver for intuition',
            crystals: 'Amethyst for protection, Citrine for abundance, Rose Quartz for love'
          },
          advice: 'Use these elements together to enhance your cosmic energy today',
          meditation: 'Meditate with these crystals while visualizing your goals',
          affirmation: 'I am aligned with the cosmic energy and trust in my journey'
        }
        
        setTrio(mockTrio)
      } catch (error) {
        console.error('Failed to load lucky trio:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTrio()
  }, [user])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!trio) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 text-center">
        <p className="text-red-600">Unable to load lucky trio</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Lucky Trio</h3>
        </div>
        <span className="text-sm text-gray-500">{trio.date}</span>
      </div>

      {/* Trio Elements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Numbers */}
        <div className="bg-white/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h4 className="font-medium text-gray-900">Numbers</h4>
          </div>
          <div className="space-y-2">
            {trio.numbers.map((number: number, index: number) => (
              <div key={index} className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                {number}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">{trio.meanings.numbers}</p>
        </div>

        {/* Colors */}
        <div className="bg-white/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Heart className="w-5 h-5 text-pink-500" />
            <h4 className="font-medium text-gray-900">Colors</h4>
          </div>
          <div className="space-y-2">
            {trio.colors.map((color: string, index: number) => (
              <div key={index} className="px-3 py-2 bg-pink-100 text-pink-700 rounded text-sm font-medium">
                {color}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">{trio.meanings.colors}</p>
        </div>

        {/* Crystals */}
        <div className="bg-white/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Moon className="w-5 h-5 text-blue-500" />
            <h4 className="font-medium text-gray-900">Crystals</h4>
          </div>
          <div className="space-y-2">
            {trio.crystals.map((crystal: string, index: number) => (
              <div key={index} className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                {crystal}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">{trio.meanings.crystals}</p>
        </div>
      </div>

      {/* Advice */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Cosmic Advice</h4>
        <p className="text-sm text-gray-700">{trio.advice}</p>
      </div>

      {/* Meditation & Affirmation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Meditation</h4>
          <p className="text-sm text-gray-700">{trio.meditation}</p>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Affirmation</h4>
          <p className="text-sm text-gray-700 italic">"{trio.affirmation}"</p>
        </div>
      </div>
    </motion.div>
  )
}