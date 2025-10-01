'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, ArrowRight, ArrowLeft, Calculator, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Moon, Calendar, CheckCircle, User, Users, Search, Filter } from 'lucide-react'

export default function CompatibilityPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [partnerProfile, setPartnerProfile] = useState<any>(null)
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'zodiac' | 'numerology' | 'overall'>('overall')

  const zodiacCompatibility = [
    { sign: 'Aries', compatible: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'], incompatible: ['Cancer', 'Capricorn'] },
    { sign: 'Taurus', compatible: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'], incompatible: ['Leo', 'Aquarius'] },
    { sign: 'Gemini', compatible: ['Libra', 'Aquarius', 'Aries', 'Leo'], incompatible: ['Virgo', 'Pisces'] },
    { sign: 'Cancer', compatible: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'], incompatible: ['Aries', 'Libra'] },
    { sign: 'Leo', compatible: ['Aries', 'Sagittarius', 'Gemini', 'Libra'], incompatible: ['Taurus', 'Scorpio'] },
    { sign: 'Virgo', compatible: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'], incompatible: ['Gemini', 'Sagittarius'] },
    { sign: 'Libra', compatible: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'], incompatible: ['Cancer', 'Capricorn'] },
    { sign: 'Scorpio', compatible: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'], incompatible: ['Leo', 'Aquarius'] },
    { sign: 'Sagittarius', compatible: ['Aries', 'Leo', 'Libra', 'Aquarius'], incompatible: ['Virgo', 'Pisces'] },
    { sign: 'Capricorn', compatible: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'], incompatible: ['Aries', 'Libra'] },
    { sign: 'Aquarius', compatible: ['Gemini', 'Libra', 'Aries', 'Sagittarius'], incompatible: ['Taurus', 'Scorpio'] },
    { sign: 'Pisces', compatible: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'], incompatible: ['Gemini', 'Sagittarius'] }
  ]

  const numerologyCompatibility = [
    { number: 1, compatible: [1, 5, 7], incompatible: [2, 4, 8] },
    { number: 2, compatible: [2, 4, 8], incompatible: [1, 5, 7] },
    { number: 3, compatible: [3, 6, 9], incompatible: [4, 7, 8] },
    { number: 4, compatible: [2, 4, 8], incompatible: [1, 3, 5] },
    { number: 5, compatible: [1, 5, 7], incompatible: [2, 4, 6] },
    { number: 6, compatible: [3, 6, 9], incompatible: [1, 5, 7] },
    { number: 7, compatible: [1, 5, 7], incompatible: [2, 3, 6] },
    { number: 8, compatible: [2, 4, 8], incompatible: [1, 3, 5] },
    { number: 9, compatible: [3, 6, 9], incompatible: [1, 2, 4] }
  ]

  useEffect(() => {
    // Load user profile
    const profile = localStorage.getItem('userData')
    if (profile) {
      const userData = JSON.parse(profile)
      setUserProfile(userData)
    }
  }, [])

  const calculateCompatibility = () => {
    if (!userProfile || !partnerProfile) return

    setIsLoading(true)
    
    // Simulate calculation time
    setTimeout(() => {
      let score = 0
      let factors = 0

      // Zodiac compatibility
      if (userProfile.zodiacSign && partnerProfile.zodiacSign) {
        const userSign = userProfile.zodiacSign
        const partnerSign = partnerProfile.zodiacSign
        
        const userCompatibility = zodiacCompatibility.find(z => z.sign === userSign)
        if (userCompatibility) {
          if (userCompatibility.compatible.includes(partnerSign)) {
            score += 30
          } else if (userCompatibility.incompatible.includes(partnerSign)) {
            score += 10
          } else {
            score += 20
          }
        }
        factors++
      }

      // Numerology compatibility
      if (userProfile.lifePath && partnerProfile.lifePath) {
        const userLifePath = userProfile.lifePath
        const partnerLifePath = partnerProfile.lifePath
        
        const userNumerology = numerologyCompatibility.find(n => n.number === userLifePath)
        if (userNumerology) {
          if (userNumerology.compatible.includes(partnerLifePath)) {
            score += 30
          } else if (userNumerology.incompatible.includes(partnerLifePath)) {
            score += 10
          } else {
            score += 20
          }
        }
        factors++
      }

      // Age compatibility (simple calculation)
      if (userProfile.birthDate && partnerProfile.birthDate) {
        const userAge = new Date().getFullYear() - new Date(userProfile.birthDate).getFullYear()
        const partnerAge = new Date().getFullYear() - new Date(partnerProfile.birthDate).getFullYear()
        const ageDiff = Math.abs(userAge - partnerAge)
        
        if (ageDiff <= 2) {
          score += 20
        } else if (ageDiff <= 5) {
          score += 15
        } else if (ageDiff <= 10) {
          score += 10
        } else {
          score += 5
        }
        factors++
      }

      // Calculate final score
      const finalScore = factors > 0 ? Math.round(score / factors) : 0
      setCompatibilityScore(finalScore)
      setIsLoading(false)
    }, 2000)
  }

  const getCompatibilityLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' }
    if (score >= 60) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' }
    if (score >= 40) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    return { level: 'Challenging', color: 'text-red-600', bgColor: 'bg-red-50' }
  }

  const compatibilityLevel = compatibilityScore ? getCompatibilityLevel(compatibilityScore) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Compatibility Check</h1>
              <p className="text-slate-600">Discover your cosmic connection with others</p>
            </div>
            <div className="flex items-center space-x-4">
              {compatibilityScore && (
                <div className="text-right">
                  <p className="text-sm text-slate-500">Compatibility Score</p>
                  <p className="font-semibold text-slate-900 text-2xl">{compatibilityScore}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Partner Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Enter Partner Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={partnerProfile?.fullName || ''}
                onChange={(e) => setPartnerProfile({...partnerProfile, fullName: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Enter partner's full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Birth Date</label>
              <input
                type="date"
                value={partnerProfile?.birthDate || ''}
                onChange={(e) => setPartnerProfile({...partnerProfile, birthDate: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Birth Time</label>
              <input
                type="time"
                value={partnerProfile?.birthTime || ''}
                onChange={(e) => setPartnerProfile({...partnerProfile, birthTime: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Birth Place</label>
              <input
                type="text"
                value={partnerProfile?.birthPlace || ''}
                onChange={(e) => setPartnerProfile({...partnerProfile, birthPlace: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Enter birth city"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={calculateCompatibility}
              disabled={!partnerProfile?.fullName || !partnerProfile?.birthDate || isLoading}
              className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Calculating...' : 'Check Compatibility'}
            </button>
          </div>
        </motion.div>

        {/* Compatibility Results */}
        {compatibilityScore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Overall Score */}
            <div className={`bg-white rounded-2xl shadow-sm border-2 p-8 ${compatibilityLevel?.bgColor}`}>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{compatibilityScore}%</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Compatibility Score</h2>
                <p className={`text-xl font-semibold ${compatibilityLevel?.color}`}>
                  {compatibilityLevel?.level} Match
                </p>
                <p className="text-slate-600 mt-2">
                  {compatibilityScore >= 80 ? 'You have an excellent cosmic connection!' :
                   compatibilityScore >= 60 ? 'You have a good cosmic connection.' :
                   compatibilityScore >= 40 ? 'You have a fair cosmic connection.' :
                   'You may face some challenges, but love can overcome them.'}
                </p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Detailed Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Zodiac Compatibility</h4>
                  <p className="text-sm text-slate-600">
                    {userProfile?.zodiacSign} & {partnerProfile?.zodiacSign}
                  </p>
                </div>
                
                <div className="text-center p-6 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Numerology Match</h4>
                  <p className="text-sm text-slate-600">
                    Life Path Numbers
                  </p>
                </div>
                
                <div className="text-center p-6 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Age Compatibility</h4>
                  <p className="text-sm text-slate-600">
                    Age difference analysis
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Compatibility Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mt-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Compatibility Guide</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-4">Zodiac Compatibility</h4>
              <div className="space-y-3">
                {zodiacCompatibility.slice(0, 6).map((sign, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <h5 className="font-semibold text-slate-900">{sign.sign}</h5>
                    <p className="text-sm text-slate-600">
                      Compatible: {sign.compatible.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-4">Numerology Compatibility</h4>
              <div className="space-y-3">
                {numerologyCompatibility.slice(0, 6).map((number, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <h5 className="font-semibold text-slate-900">Number {number.number}</h5>
                    <p className="text-sm text-slate-600">
                      Compatible: {number.compatible.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}