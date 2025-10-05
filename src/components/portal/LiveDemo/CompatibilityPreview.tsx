/**
 * Compatibility Preview Component
 * Interactive compatibility check between two zodiac signs
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Star, Sparkles } from 'lucide-react'
import { getZodiacInfo, type ZodiacSign } from '@/lib/zodiacUtils'

const compatibilityMatrix: Record<string, Record<string, { score: number; tip: string }>> = {
  aries: {
    aries: { score: 85, tip: "Two Aries create an exciting, dynamic partnership with lots of energy and passion." },
    taurus: { score: 60, tip: "Aries and Taurus balance each other - fire meets earth for a stable yet exciting relationship." },
    gemini: { score: 75, tip: "Aries and Gemini share a love for adventure and communication, creating a lively partnership." },
    cancer: { score: 50, tip: "Aries and Cancer have different emotional needs but can learn from each other's strengths." },
    leo: { score: 90, tip: "Aries and Leo are both fire signs, creating an intense, passionate, and dynamic relationship." },
    virgo: { score: 45, tip: "Aries and Virgo have different approaches to life but can complement each other well." },
    libra: { score: 70, tip: "Aries and Libra balance each other - fire and air create a harmonious partnership." },
    scorpio: { score: 65, tip: "Aries and Scorpio create an intense, passionate relationship with strong chemistry." },
    sagittarius: { score: 95, tip: "Aries and Sagittarius are both fire signs, creating an adventurous and exciting partnership." },
    capricorn: { score: 40, tip: "Aries and Capricorn have different life approaches but can learn from each other." },
    aquarius: { score: 80, tip: "Aries and Aquarius share a love for independence and innovation, creating a unique bond." },
    pisces: { score: 55, tip: "Aries and Pisces have different emotional styles but can create a balanced relationship." }
  },
  taurus: {
    aries: { score: 60, tip: "Taurus and Aries balance each other - earth grounds fire for a stable relationship." },
    taurus: { score: 80, tip: "Two Taurus create a stable, comfortable partnership with shared values and goals." },
    gemini: { score: 50, tip: "Taurus and Gemini have different needs but can learn from each other's perspectives." },
    cancer: { score: 85, tip: "Taurus and Cancer share emotional depth and create a nurturing, secure relationship." },
    leo: { score: 70, tip: "Taurus and Leo balance each other - earth provides stability for fire's passion." },
    virgo: { score: 90, tip: "Taurus and Virgo are both earth signs, creating a practical and harmonious partnership." },
    libra: { score: 75, tip: "Taurus and Libra appreciate beauty and harmony, creating an aesthetically pleasing relationship." },
    scorpio: { score: 80, tip: "Taurus and Scorpio create an intense, passionate relationship with deep emotional connection." },
    sagittarius: { score: 45, tip: "Taurus and Sagittarius have different life approaches but can complement each other." },
    capricorn: { score: 95, tip: "Taurus and Capricorn are both earth signs, creating a stable and successful partnership." },
    aquarius: { score: 40, tip: "Taurus and Aquarius have different values but can learn from each other's perspectives." },
    pisces: { score: 85, tip: "Taurus and Pisces create a dreamy, romantic relationship with shared emotional depth." }
  }
  // Note: This is a simplified matrix for demo purposes
}

const getCompatibilityScore = (sign1: ZodiacSign, sign2: ZodiacSign): { score: number; tip: string } => {
  const compatibility = compatibilityMatrix[sign1]?.[sign2]
  if (compatibility) {
    return compatibility
  }
  
  // Fallback for missing combinations
  const baseScore = Math.floor(Math.random() * 40) + 50 // Random score between 50-90
  return {
    score: baseScore,
    tip: `${sign1.charAt(0).toUpperCase() + sign1.slice(1)} and ${sign2.charAt(0).toUpperCase() + sign2.slice(1)} create a unique relationship with potential for growth and understanding.`
  }
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-600 bg-emerald-50'
  if (score >= 60) return 'text-amber-600 bg-amber-50'
  return 'text-red-600 bg-red-50'
}

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent Match'
  if (score >= 60) return 'Good Match'
  return 'Challenging Match'
}

export function CompatibilityPreview() {
  const [sign1, setSign1] = useState<ZodiacSign | ''>('')
  const [sign2, setSign2] = useState<ZodiacSign | ''>('')
  const [compatibility, setCompatibility] = useState<{ score: number; tip: string } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ] as ZodiacSign[]

  const handleCalculate = async () => {
    if (!sign1 || !sign2) return

    setIsCalculating(true)
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      const result = getCompatibilityScore(sign1, sign2)
      setCompatibility(result)
    } catch (error) {
      console.error('Error calculating compatibility:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const sign1Info = sign1 ? getZodiacInfo(sign1) : null
  const sign2Info = sign2 ? getZodiacInfo(sign2) : null

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Heart className="w-4 h-4" />
          <span>Select two zodiac signs</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Sign</label>
            <select
              value={sign1}
              onChange={(e) => setSign1(e.target.value as ZodiacSign)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
            >
              <option value="">Select sign</option>
              {zodiacSigns.map((sign) => (
                <option key={sign} value={sign}>
                  {getZodiacInfo(sign).name} {getZodiacInfo(sign).symbol}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Second Sign</label>
            <select
              value={sign2}
              onChange={(e) => setSign2(e.target.value as ZodiacSign)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
            >
              <option value="">Select sign</option>
              {zodiacSigns.map((sign) => (
                <option key={sign} value={sign}>
                  {getZodiacInfo(sign).name} {getZodiacInfo(sign).symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleCalculate}
          disabled={!sign1 || !sign2 || isCalculating}
          className="w-full portal-btn portal-btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCalculating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Calculating...</span>
            </div>
          ) : (
            'Check Compatibility'
          )}
        </button>
      </div>

      {/* Result Section */}
      {compatibility && sign1Info && sign2Info && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="portal-card p-6"
        >
          <div className="text-center">
            {/* Signs Display */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="text-3xl mb-2">{sign1Info.symbol}</div>
                <div className="text-sm font-medium text-gray-700">{sign1Info.name}</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-violet-600" />
                <span className="text-lg font-bold text-gray-900">{compatibility.score}%</span>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">{sign2Info.symbol}</div>
                <div className="text-sm font-medium text-gray-700">{sign2Info.name}</div>
              </div>
            </div>

            {/* Compatibility Score */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${getScoreColor(compatibility.score)}`}>
              <Star className="w-4 h-4 mr-2" />
              {getScoreLabel(compatibility.score)}
            </div>

            {/* Compatibility Tip */}
            <div className="bg-gradient-to-r from-violet-50 to-sky-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-700">Compatibility Insight</span>
              </div>
              <p className="text-sm text-gray-700">
                {compatibility.tip}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <div className="font-medium text-gray-700 mb-1">Elements</div>
                <div>{sign1Info.element} + {sign2Info.element}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">Relationship</div>
                <div>{compatibility.score >= 80 ? 'Harmonious' : compatibility.score >= 60 ? 'Balanced' : 'Challenging'}</div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-4 text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Users className="w-3 h-3 text-amber-600" />
                <span className="font-medium text-amber-800">Demo Mode</span>
              </div>
              <p className="mt-1 text-amber-700">
                This is a preview. Get detailed compatibility reports, relationship analysis, 
                and personalized insights in the full app.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!compatibility && (
        <div className="text-center text-sm text-gray-500">
          <p>Select two zodiac signs above to check their compatibility and get relationship insights.</p>
        </div>
      )}
    </div>
  )
}
