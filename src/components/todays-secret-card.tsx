'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, Heart, Moon, Sun, Zap, Shield, Crown } from 'lucide-react'

interface TodaysSecretCardProps {
  user?: {
    name?: string
    zodiacSign?: string
  } | null
}

export function TodaysSecretCard({ user }: TodaysSecretCardProps) {
  const [secret, setSecret] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading today's secret
    const loadSecret = async () => {
      try {
        // Mock secret data - in production, this would come from an API
        const mockSecret = {
          date: new Date().toLocaleDateString(),
          title: "The Cosmic Connection",
          message: "Today, the universe is aligning to bring you closer to your true purpose. Trust the signs and follow your intuition.",
          zodiacSign: user?.zodiacSign || 'Gemini',
          luckyNumbers: [7, 14, 21, 28],
          luckyColors: ['Purple', 'Gold', 'Silver'],
          energy: 'High',
          mood: 'Optimistic',
          advice: 'Focus on your goals and take inspired action. The universe is supporting your journey.',
          moonPhase: 'Waxing Crescent',
          planetaryInfluence: 'Mercury in retrograde brings introspection',
          compatibility: 'High compatibility with Air signs today',
          secret: 'The secret to your success today lies in trusting your inner voice and taking bold action.',
          affirmation: 'I am aligned with the cosmic energy and trust in my journey.',
          meditation: 'Take 5 minutes to meditate on your goals and visualize your success.',
          crystals: ['Amethyst', 'Citrine', 'Rose Quartz'],
          chakras: ['Crown', 'Third Eye', 'Heart']
        }
        
        setSecret(mockSecret)
      } catch (error) {
        console.error('Failed to load today\'s secret:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSecret()
  }, [user])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  if (!secret) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 text-center">
        <p className="text-red-600">Unable to load today's secret</p>
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
          <h3 className="text-lg font-semibold text-gray-900">Today's Secret</h3>
        </div>
        <span className="text-sm text-gray-500">{secret.date}</span>
      </div>

      {/* Main Secret */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-900 mb-3">{secret.title}</h4>
        <p className="text-gray-700 leading-relaxed mb-4">{secret.message}</p>
        <div className="bg-white/50 rounded-lg p-4">
          <p className="text-sm text-gray-600 italic">"{secret.secret}"</p>
        </div>
      </div>

      {/* Lucky Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <h4 className="font-medium text-gray-900">Lucky Numbers</h4>
          </div>
          <div className="flex space-x-2">
            {secret.luckyNumbers.map((number: number, index: number) => (
              <span key={index} className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-medium">
                {number}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <h4 className="font-medium text-gray-900">Lucky Colors</h4>
          </div>
          <div className="flex space-x-2">
            {secret.luckyColors.map((color: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-sm">
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Energy & Mood */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h4 className="font-medium text-gray-900">Energy</h4>
          </div>
          <p className="text-sm text-gray-600">{secret.energy}</p>
        </div>

        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Moon className="w-4 h-4 text-blue-500" />
            <h4 className="font-medium text-gray-900">Moon Phase</h4>
          </div>
          <p className="text-sm text-gray-600">{secret.moonPhase}</p>
        </div>

        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sun className="w-4 h-4 text-orange-500" />
            <h4 className="font-medium text-gray-900">Mood</h4>
          </div>
          <p className="text-sm text-gray-600">{secret.mood}</p>
        </div>
      </div>

      {/* Affirmation & Meditation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Daily Affirmation</h4>
          <p className="text-sm text-gray-700 italic">"{secret.affirmation}"</p>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Meditation</h4>
          <p className="text-sm text-gray-700">{secret.meditation}</p>
        </div>
      </div>

      {/* Crystals & Chakras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Recommended Crystals</h4>
          <div className="flex space-x-2">
            {secret.crystals.map((crystal: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                {crystal}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Active Chakras</h4>
          <div className="flex space-x-2">
            {secret.chakras.map((chakra: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                {chakra}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}