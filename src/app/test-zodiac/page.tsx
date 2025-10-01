'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, Sparkles, CheckCircle } from 'lucide-react'
import { ZodiacCalculator } from '@/lib/astrology/zodiac-calculator'

export default function TestZodiacPage() {
  const [birthDate, setBirthDate] = useState('')
  const [zodiacResult, setZodiacResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDateChange = (date: string) => {
    setBirthDate(date)
    
    if (date) {
      setIsLoading(true)
      
      // Simulate processing time
      setTimeout(() => {
        const result = ZodiacCalculator.autoDetectZodiacSign(date)
        setZodiacResult(result)
        setIsLoading(false)
      }, 500)
    } else {
      setZodiacResult(null)
    }
  }

  const testDates = [
    { date: '1990-05-15', label: 'May 15, 1990 (Taurus)' },
    { date: '1985-07-25', label: 'July 25, 1985 (Leo)' },
    { date: '1992-12-10', label: 'December 10, 1992 (Sagittarius)' },
    { date: '1988-03-21', label: 'March 21, 1988 (Aries)' },
    { date: '1995-11-30', label: 'November 30, 1995 (Sagittarius)' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Zodiac Sign Auto-Detection Test
          </h1>
          <p className="text-slate-600">
            Test the automatic zodiac sign detection from birthday and birth time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-violet-600" />
              <span>Enter Birth Date</span>
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quick Test Dates
                </label>
                <div className="space-y-2">
                  {testDates.map((testDate, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateChange(testDate.date)}
                      className="w-full text-left p-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {testDate.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-violet-600" />
              <span>Detection Results</span>
            </h2>
            
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                <span className="ml-3 text-slate-600">Detecting zodiac signs...</span>
              </div>
            )}
            
            {zodiacResult && !isLoading && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4">
                  <h3 className="font-semibold text-violet-900 mb-3">Auto-Detected Signs</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-violet-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl">{zodiacResult.info?.symbol}</span>
                        <span className="font-semibold text-slate-900">Western</span>
                      </div>
                      <p className="text-sm text-slate-600">{zodiacResult.western}</p>
                      <p className="text-xs text-slate-500">{zodiacResult.info?.element} • {zodiacResult.info?.quality}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-violet-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl">🐉</span>
                        <span className="font-semibold text-slate-900">Chinese</span>
                      </div>
                      <p className="text-sm text-slate-600">{zodiacResult.chinese}</p>
                      <p className="text-xs text-slate-500">Year of {zodiacResult.chinese}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-violet-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl">🕉️</span>
                        <span className="font-semibold text-slate-900">Vedic</span>
                      </div>
                      <p className="text-sm text-slate-600">{zodiacResult.vedic}</p>
                      <p className="text-xs text-slate-500">Rashi</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-violet-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl">🇱🇰</span>
                        <span className="font-semibold text-slate-900">Sri Lankan</span>
                      </div>
                      <p className="text-sm text-slate-600">{zodiacResult.sriLankan}</p>
                      <p className="text-xs text-slate-500">Traditional</p>
                    </div>
                  </div>
                </div>
                
                {zodiacResult.info && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Western Sign Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">Element:</span>
                        <span className="ml-2 text-slate-600">{zodiacResult.info.element}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Quality:</span>
                        <span className="ml-2 text-slate-600">{zodiacResult.info.quality}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Ruling Planet:</span>
                        <span className="ml-2 text-slate-600">{zodiacResult.info.rulingPlanet}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Dates:</span>
                        <span className="ml-2 text-slate-600">{zodiacResult.info.dates}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Zodiac signs successfully auto-detected!</span>
                </div>
              </div>
            )}
            
            {!zodiacResult && !isLoading && (
              <div className="text-center py-8 text-slate-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>Enter a birth date to see auto-detected zodiac signs</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
