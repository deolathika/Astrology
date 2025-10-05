'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Star, Sparkles, Heart, Zap } from 'lucide-react'

interface DailyGuidanceProps {
  user?: {
    name?: string
    birthDate?: string
    zodiacSign?: string
  } | null
}

export function DailyGuidance({ user }: DailyGuidanceProps) {
  const [guidance, setGuidance] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading daily guidance
    const loadGuidance = async () => {
      try {
        // Mock guidance data - in production, this would come from an API
        const mockGuidance = {
          date: new Date().toLocaleDateString(),
          zodiacSign: user?.zodiacSign || 'Gemini',
          dailyInsight: "Today's cosmic energy brings opportunities for growth and transformation. Trust your intuition and embrace new possibilities.",
          luckyNumbers: [7, 14, 21, 28],
          luckyColors: ['Purple', 'Gold', 'Silver'],
          mood: 'Optimistic',
          energy: 'High',
          advice: 'Focus on your goals and take inspired action. The universe is supporting your journey.',
          compatibility: 'High compatibility with Air signs today',
          moonPhase: 'Waxing Crescent',
          planetaryInfluence: 'Mercury in retrograde brings introspection'
        }
        
        setGuidance(mockGuidance)
      } catch (error) {
        console.error('Failed to load daily guidance:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGuidance()
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

  if (!guidance) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 text-center">
        <p className="text-red-600">Unable to load daily guidance</p>
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
          <Sun className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Today's Guidance</h3>
        </div>
        <span className="text-sm text-gray-500">{guidance.date}</span>
      </div>

      {/* Main Insight */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed mb-4">{guidance.dailyInsight}</p>
        <div className="bg-white/50 rounded-lg p-4">
          <p className="text-sm text-gray-600 italic">"{guidance.advice}"</p>
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
            {guidance.luckyNumbers.map((number: number, index: number) => (
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
            {guidance.luckyColors.map((color: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-sm">
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Energy & Mood */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h4 className="font-medium text-gray-900">Energy</h4>
          </div>
          <p className="text-sm text-gray-600">{guidance.energy}</p>
        </div>

        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Moon className="w-4 h-4 text-blue-500" />
            <h4 className="font-medium text-gray-900">Moon Phase</h4>
          </div>
          <p className="text-sm text-gray-600">{guidance.moonPhase}</p>
        </div>

        <div className="bg-white/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-indigo-500" />
            <h4 className="font-medium text-gray-900">Mood</h4>
          </div>
          <p className="text-sm text-gray-600">{guidance.mood}</p>
        </div>
      </div>
    </motion.div>
  )
}