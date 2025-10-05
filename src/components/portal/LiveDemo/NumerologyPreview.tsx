/**
 * Numerology Preview Component
 * Interactive life path number calculation demo
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Sparkles, Hash } from 'lucide-react'

const lifePathMeanings = {
  1: "The Leader - You are a natural-born leader with strong determination and independence.",
  2: "The Diplomat - You excel at cooperation, harmony, and bringing people together.",
  3: "The Creative - You are expressive, artistic, and have a gift for communication.",
  4: "The Builder - You are practical, organized, and excel at creating solid foundations.",
  5: "The Adventurer - You crave freedom, change, and new experiences.",
  6: "The Nurturer - You are caring, responsible, and have a strong sense of family.",
  7: "The Seeker - You are spiritual, analytical, and seek deeper truths.",
  8: "The Achiever - You are ambitious, business-minded, and excel at material success.",
  9: "The Humanitarian - You are compassionate, wise, and work for the greater good.",
  11: "The Intuitive - You have heightened intuition and spiritual awareness.",
  22: "The Master Builder - You can turn dreams into reality on a large scale.",
  33: "The Master Teacher - You inspire others through compassion and wisdom."
}

const masterNumbers = [11, 22, 33]

export function NumerologyPreview() {
  const [birthDate, setBirthDate] = useState('')
  const [lifePathNumber, setLifePathNumber] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateLifePath = (dateString: string): number => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    // Calculate sum of all digits
    const daySum = day.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    const monthSum = month.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    const yearSum = year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    
    const totalSum = daySum + monthSum + yearSum
    
    // Reduce to single digit or master number
    if (totalSum <= 9 || masterNumbers.includes(totalSum)) {
      return totalSum
    }
    
    // Further reduction if needed
    const finalSum = totalSum.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    return finalSum <= 9 ? finalSum : totalSum
  }

  const handleCalculate = async () => {
    if (!birthDate) return

    setIsCalculating(true)
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      const number = calculateLifePath(birthDate)
      setLifePathNumber(number)
    } catch (error) {
      console.error('Error calculating life path number:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const isMasterNumber = lifePathNumber && masterNumbers.includes(lifePathNumber)

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Calculator className="w-4 h-4" />
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
      {lifePathNumber && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="portal-card p-6"
        >
          <div className="text-center">
            {/* Life Path Number */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 portal-gradient-violet rounded-full mb-4">
                <span className="text-2xl font-bold text-white">{lifePathNumber}</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Life Path Number {lifePathNumber}
              </h4>
              {isMasterNumber && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                  Master Number
                </span>
              )}
            </div>

            {/* Meaning */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-700">Your Life Path</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {lifePathMeanings[lifePathNumber as keyof typeof lifePathMeanings]}
              </p>
            </div>

            {/* Additional Insights */}
            <div className="bg-gradient-to-r from-violet-50 to-sky-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Hash className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-700">Quick Insights</span>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• Your natural talents and abilities</p>
                <p>• Life lessons you're here to learn</p>
                <p>• Your spiritual purpose and path</p>
                {isMasterNumber && (
                  <p>• Special spiritual gifts and responsibilities</p>
                )}
              </div>
            </div>

            {/* Demo Notice */}
            <div className="text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Calculator className="w-3 h-3 text-amber-600" />
                <span className="font-medium text-amber-800">Demo Mode</span>
              </div>
              <p className="mt-1 text-amber-700">
                This is a preview. Get complete numerology analysis including Soul Urge, 
                Expression Numbers, and personalized daily guidance in the full app.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!lifePathNumber && (
        <div className="text-center text-sm text-gray-500">
          <p>Select your birth date above to calculate your life path number and discover its meaning.</p>
        </div>
      )}
    </div>
  )
}