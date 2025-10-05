'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, Heart, Moon, Sun, Zap, Shield, Crown, CheckCircle, XCircle } from 'lucide-react'

interface DayRulesCardProps {
  user?: {
    name?: string
    zodiacSign?: string
  } | null
}

export function DayRulesCard({ user }: DayRulesCardProps) {
  const [rules, setRules] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading day rules
    const loadRules = async () => {
      try {
        // Mock rules data - in production, this would come from an API
        const mockRules = {
          date: new Date().toLocaleDateString(),
          zodiacSign: user?.zodiacSign || 'Gemini',
          do: [
            'Trust your intuition and follow your instincts',
            'Take time for meditation and reflection',
            'Express your creativity through art or writing',
            'Connect with nature and spend time outdoors',
            'Practice gratitude and count your blessings',
            'Be open to new opportunities and experiences',
            'Communicate clearly with loved ones',
            'Focus on your goals and take inspired action'
          ],
          dont: [
            'Don\'t make impulsive decisions without thinking',
            'Avoid negative energy and toxic people',
            'Don\'t ignore your physical health',
            'Avoid overthinking and worrying about the future',
            'Don\'t compare yourself to others',
            'Avoid holding onto grudges and resentment',
            'Don\'t neglect your spiritual practice',
            'Avoid making promises you can\'t keep'
          ],
          energy: 'High',
          mood: 'Optimistic',
          advice: 'Today is a day for growth and transformation. Trust the process and stay positive.',
          affirmation: 'I am aligned with the cosmic energy and trust in my journey.',
          meditation: 'Take 10 minutes to meditate on your goals and visualize your success.',
          crystals: ['Amethyst', 'Citrine', 'Rose Quartz'],
          chakras: ['Crown', 'Third Eye', 'Heart']
        }
        
        setRules(mockRules)
      } catch (error) {
        console.error('Failed to load day rules:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRules()
  }, [user])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!rules) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 text-center">
        <p className="text-red-600">Unable to load day rules</p>
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
          <h3 className="text-lg font-semibold text-gray-900">Day Rules</h3>
        </div>
        <span className="text-sm text-gray-500">{rules.date}</span>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Do's */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h4 className="font-medium text-green-800">Do's</h4>
          </div>
          <div className="space-y-2">
            {rules.do.map((item: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Don'ts */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <XCircle className="w-5 h-5 text-red-500" />
            <h4 className="font-medium text-red-800">Don'ts</h4>
          </div>
          <div className="space-y-2">
            {rules.dont.map((item: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Energy & Mood */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h4 className="font-medium text-gray-900">Energy</h4>
          </div>
          <p className="text-sm text-gray-600">{rules.energy}</p>
        </div>

        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sun className="w-4 h-4 text-orange-500" />
            <h4 className="font-medium text-gray-900">Mood</h4>
          </div>
          <p className="text-sm text-gray-600">{rules.mood}</p>
        </div>
      </div>

      {/* Advice */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Cosmic Advice</h4>
        <p className="text-sm text-gray-700">{rules.advice}</p>
      </div>

      {/* Meditation & Affirmation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Meditation</h4>
          <p className="text-sm text-gray-700">{rules.meditation}</p>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Affirmation</h4>
          <p className="text-sm text-gray-700 italic">"{rules.affirmation}"</p>
        </div>
      </div>

      {/* Crystals & Chakras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Recommended Crystals</h4>
          <div className="flex space-x-2">
            {rules.crystals.map((crystal: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                {crystal}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Active Chakras</h4>
          <div className="flex space-x-2">
            {rules.chakras.map((chakra: string, index: number) => (
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