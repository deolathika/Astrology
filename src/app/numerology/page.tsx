'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  Hash, 
  Star, 
  Heart, 
  Brain, 
  Crown, 
  Shield, 
  Zap, 
  Target, 
  Compass,
  Sparkles,
  ArrowRight,
  Info,
  BookOpen,
  Calendar,
  User,
  Lock,
  Unlock
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [selectedSystem, setSelectedSystem] = useState('pythagorean')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)

  const numerologySystems = [
    {
      id: 'pythagorean',
      name: 'Pythagorean Numerology',
      description: 'Based on the teachings of Pythagoras, using numbers 1-9',
      icon: Calculator,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'chaldean',
      name: 'Chaldean Numerology',
      description: 'Ancient Babylonian system with different number values',
      icon: Hash,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'master',
      name: 'Master Numbers',
      description: 'Special significance for numbers 11, 22, 33',
      icon: Crown,
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const coreNumbers = [
    {
      id: 'life-path',
      name: 'Life Path Number',
      description: 'Your main purpose and direction in life',
      icon: Compass,
      color: 'from-blue-500 to-cyan-500',
      calculation: 'Sum of birth date digits reduced to single digit',
      premium: false
    },
    {
      id: 'soul-urge',
      name: 'Soul Urge Number',
      description: 'Your inner desires and motivations',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      calculation: 'Sum of vowels in full name',
      premium: true
    },
    {
      id: 'expression',
      name: 'Expression Number',
      description: 'Your talents and abilities',
      icon: Star,
      color: 'from-purple-500 to-indigo-500',
      calculation: 'Sum of all letters in full name',
      premium: true
    },
    {
      id: 'personality',
      name: 'Personality Number',
      description: 'How others perceive you',
      icon: User,
      color: 'from-green-500 to-emerald-500',
      calculation: 'Sum of consonants in full name',
      premium: true
    },
    {
      id: 'birthday',
      name: 'Birthday Number',
      description: 'Your natural talents and abilities',
      icon: Calendar,
      color: 'from-yellow-500 to-orange-500',
      calculation: 'Day of birth (1-31)',
      premium: false
    },
    {
      id: 'challenge',
      name: 'Challenge Number',
      description: 'Life lessons and obstacles to overcome',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      calculation: 'Complex calculation based on birth date',
      premium: true
    }
  ]

  const numberMeanings = {
    1: { meaning: 'Leadership, independence, innovation', traits: ['Ambitious', 'Pioneering', 'Self-reliant'] },
    2: { meaning: 'Cooperation, diplomacy, partnership', traits: ['Diplomatic', 'Supportive', 'Intuitive'] },
    3: { meaning: 'Creativity, communication, expression', traits: ['Artistic', 'Optimistic', 'Expressive'] },
    4: { meaning: 'Stability, organization, hard work', traits: ['Practical', 'Reliable', 'Methodical'] },
    5: { meaning: 'Freedom, adventure, change', traits: ['Adventurous', 'Versatile', 'Curious'] },
    6: { meaning: 'Responsibility, nurturing, harmony', traits: ['Caring', 'Responsible', 'Harmonious'] },
    7: { meaning: 'Spirituality, analysis, introspection', traits: ['Spiritual', 'Analytical', 'Mysterious'] },
    8: { meaning: 'Success, authority, material achievement', traits: ['Ambitious', 'Authoritative', 'Successful'] },
    9: { meaning: 'Humanitarianism, completion, wisdom', traits: ['Compassionate', 'Wise', 'Universal'] }
  }

  const handleCalculate = async () => {
    if (!fullName || !birthDate) return
    
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock calculation results
    const mockResults = {
      lifePath: 7,
      soulUrge: 3,
      expression: 5,
      personality: 2,
      birthday: 15,
      challenge: 4
    }
    
    setResults(mockResults)
    setIsLoading(false)
  }

  const handleUpgrade = () => {
    setIsPremium(true)
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Calculator className="w-12 h-12 text-purple-600 mr-4" />
              </motion.div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Numerology
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the hidden meanings in your name and birth date. Unlock the power of numbers to understand your life path, personality, and destiny.
            </p>
          </motion.div>

          {/* System Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Choose Your Numerology System</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {numerologySystems.map((system, index) => (
                <motion.div
                  key={system.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedSystem(system.id)}
                  className={`cursor-pointer bg-white/80 backdrop-blur-lg border-2 rounded-2xl p-6 transition-all duration-300 ${
                    selectedSystem === system.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-white/20 hover:border-purple-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${system.color} flex items-center justify-center mb-4 mx-auto`}>
                    <system.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{system.name}</h3>
                  <p className="text-gray-600 text-sm text-center">{system.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Enter Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full birth name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCalculate}
                  disabled={isLoading || !fullName || !birthDate}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Calculating...
                    </div>
                  ) : (
                    'Calculate My Numbers'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Core Numbers Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Your Core Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreNumbers.map((number, index) => (
                <motion.div
                  key={number.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${number.color} flex items-center justify-center`}>
                      <number.icon className="w-6 h-6 text-white" />
                    </div>
                    {number.premium && !isPremium && (
                      <div className="flex items-center text-yellow-600">
                        <Lock className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Premium</span>
                      </div>
                    )}
                    {number.premium && isPremium && (
                      <div className="flex items-center text-green-600">
                        <Unlock className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Unlocked</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{number.name}</h3>
                  <p className="text-gray-600 mb-4">{number.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <strong>Calculation:</strong> {number.calculation}
                  </div>
                  {number.premium && !isPremium ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                    >
                      Upgrade to Unlock
                    </motion.button>
                  ) : (
                    <div className="text-center">
                      {results && (
                        <div className="text-2xl font-bold text-purple-600">
                          {results[number.id] || 'N/A'}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results Display */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Life Path Number: {results.lifePath}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Meaning</h4>
                    <p className="text-gray-600 mb-4">
                      {numberMeanings[results.lifePath]?.meaning}
                    </p>
                    <h5 className="text-md font-semibold text-gray-900 mb-2">Key Traits</h5>
                    <div className="flex flex-wrap gap-2">
                      {numberMeanings[results.lifePath]?.traits.map((trait, index) => (
                        <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Life Path Guidance</h4>
                    <p className="text-gray-600">
                      Your Life Path Number {results.lifePath} indicates your main purpose and direction in life. 
                      This number reveals the lessons you need to learn and the challenges you'll face on your journey.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Premium Upgrade CTA */}
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl p-8 text-white text-center">
                <Crown className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Unlock Your Complete Numerology Profile</h3>
                <p className="text-lg mb-6">
                  Get access to all your core numbers, detailed interpretations, and personalized guidance
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpgrade}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Upgrade to Premium
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/zodiac">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <Star className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Astrology</h3>
                  <p className="text-gray-600">Discover your cosmic blueprint</p>
                </motion.div>
              </Link>
              <Link href="/dreams">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <Brain className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Dream Analysis</h3>
                  <p className="text-gray-600">Unlock the secrets of your dreams</p>
                </motion.div>
              </Link>
              <Link href="/compatibility">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <Heart className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Compatibility</h3>
                  <p className="text-gray-600">Find your cosmic match</p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  )
}