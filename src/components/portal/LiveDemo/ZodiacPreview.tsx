/**
 * Zodiac Preview Component
 * Interactive zodiac sign detection demo
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { getZodiacSign, getZodiacInfo, type ZodiacSign } from '@/lib/zodiacUtils'
import { Calendar, Sparkles, Star } from 'lucide-react'

const dailyInsights = {
  aries: "Today brings fresh energy and new opportunities. Trust your instincts and take bold action.",
  taurus: "Focus on stability and comfort. Your practical approach will lead to success.",
  gemini: "Communication is key today. Share your ideas and listen to others' perspectives.",
  cancer: "Your intuition is strong. Trust your emotional intelligence and protect what matters.",
  leo: "Your natural leadership shines today. Inspire others with your confidence and creativity.",
  virgo: "Attention to detail will serve you well. Organize and perfect your current projects.",
  libra: "Seek balance in all areas. Your diplomatic skills will help resolve conflicts.",
  scorpio: "Dive deep into meaningful connections. Your intensity can transform situations.",
  sagittarius: "Adventure calls! Explore new horizons and expand your knowledge.",
  capricorn: "Your disciplined approach will yield results. Focus on long-term goals.",
  aquarius: "Innovation and originality are your strengths today. Think outside the box.",
  pisces: "Your compassion and creativity are highlighted. Trust your artistic instincts."
}

export function ZodiacPreview() {
  const [birthDate, setBirthDate] = useState('')
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = async () => {
    if (!birthDate) return

    setIsCalculating(true)
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      const sign = getZodiacSign(birthDate)
      setZodiacSign(sign)
    } catch (error) {
      console.error('Error calculating zodiac sign:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const zodiacInfo = zodiacSign ? getZodiacInfo(zodiacSign) : null

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Calendar className="w-4 h-4" />
          <span>Enter your birth date</span>
        </div>
        
        <div className="flex space-x-3">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
            placeholder="Select your birth date"
          />
          <button
            onClick={handleCalculate}
            disabled={!birthDate || isCalculating}
            className="portal-btn portal-btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCalculating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Calculate'
            )}
          </button>
        </div>
      </div>

      {/* Result Section */}
      {zodiacSign && zodiacInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="portal-card p-6"
        >
          <div className="text-center">
            {/* Zodiac Symbol and Name */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="text-4xl">{zodiacInfo.symbol}</div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">{zodiacInfo.name}</h4>
                <p className="text-sm text-gray-600">{zodiacInfo.dates}</p>
              </div>
            </div>

            {/* Element and Description */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-800 capitalize">
                {zodiacInfo.element} Sign
              </span>
            </div>

            <p className="text-gray-600 mb-4">{zodiacInfo.description}</p>

            {/* Daily Insight */}
            <div className="bg-gradient-to-r from-violet-50 to-sky-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-700">Today's Insight</span>
              </div>
              <p className="text-sm text-gray-700">
                {dailyInsights[zodiacSign]}
              </p>
            </div>

            {/* Demo Notice */}
            <div className="mt-4 text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Star className="w-3 h-3 text-amber-600" />
                <span className="font-medium text-amber-800">Demo Mode</span>
              </div>
              <p className="mt-1 text-amber-700">
                This is a preview. Get personalized birth chart analysis, transit interpretations, 
                and detailed insights in the full app.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!zodiacSign && (
        <div className="text-center text-sm text-gray-500">
          <p>Select your birth date above to discover your zodiac sign and get a personalized insight.</p>
        </div>
      )}
    </div>
  )
}