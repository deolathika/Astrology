'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Moon, 
  Sun, 
  Compass, 
  Eye, 
  Brain, 
  Gem, 
  Flame, 
  Waves, 
  Mountain, 
  Wind,
  Target,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Info,
  BookOpen,
  Zap,
  Calculator,
  Heart
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'

export default function ZodiacPage() {
  const [selectedSystem, setSelectedSystem] = useState('western')
  const [selectedSign, setSelectedSign] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const zodiacSystems = [
    {
      id: 'western',
      name: 'Western Astrology',
      description: 'Traditional Western zodiac system based on tropical astrology',
      icon: Star,
      color: 'from-blue-500 to-purple-500',
      signs: [
        { name: 'Aries', date: 'Mar 21 - Apr 19', element: 'Fire', icon: Flame, color: 'from-red-500 to-orange-500' },
        { name: 'Taurus', date: 'Apr 20 - May 20', element: 'Earth', icon: Mountain, color: 'from-green-500 to-emerald-500' },
        { name: 'Gemini', date: 'May 21 - Jun 20', element: 'Air', icon: Wind, color: 'from-blue-500 to-cyan-500' },
        { name: 'Cancer', date: 'Jun 21 - Jul 22', element: 'Water', icon: Waves, color: 'from-blue-600 to-indigo-600' },
        { name: 'Leo', date: 'Jul 23 - Aug 22', element: 'Fire', icon: Sun, color: 'from-yellow-500 to-orange-500' },
        { name: 'Virgo', date: 'Aug 23 - Sep 22', element: 'Earth', icon: Gem, color: 'from-green-600 to-teal-600' },
        { name: 'Libra', date: 'Sep 23 - Oct 22', element: 'Air', icon: Compass, color: 'from-pink-500 to-purple-500' },
        { name: 'Scorpio', date: 'Oct 23 - Nov 21', element: 'Water', icon: Eye, color: 'from-red-600 to-pink-600' },
        { name: 'Sagittarius', date: 'Nov 22 - Dec 21', element: 'Fire', icon: Target, color: 'from-purple-500 to-indigo-500' },
        { name: 'Capricorn', date: 'Dec 22 - Jan 19', element: 'Earth', icon: Mountain, color: 'from-gray-600 to-slate-600' },
        { name: 'Aquarius', date: 'Jan 20 - Feb 18', element: 'Air', icon: Brain, color: 'from-cyan-500 to-blue-500' },
        { name: 'Pisces', date: 'Feb 19 - Mar 20', element: 'Water', icon: Waves, color: 'from-blue-500 to-purple-500' }
      ]
    },
    {
      id: 'vedic',
      name: 'Vedic Astrology',
      description: 'Ancient Indian system based on sidereal astrology and lunar mansions',
      icon: Moon,
      color: 'from-orange-500 to-red-500',
      signs: [
        { name: 'Mesha (Aries)', date: 'Apr 14 - May 14', element: 'Fire', icon: Flame, color: 'from-red-500 to-orange-500' },
        { name: 'Vrishabha (Taurus)', date: 'May 15 - Jun 14', element: 'Earth', icon: Mountain, color: 'from-green-500 to-emerald-500' },
        { name: 'Mithuna (Gemini)', date: 'Jun 15 - Jul 14', element: 'Air', icon: Wind, color: 'from-blue-500 to-cyan-500' },
        { name: 'Karka (Cancer)', date: 'Jul 15 - Aug 14', element: 'Water', icon: Waves, color: 'from-blue-600 to-indigo-600' },
        { name: 'Simha (Leo)', date: 'Aug 15 - Sep 14', element: 'Fire', icon: Sun, color: 'from-yellow-500 to-orange-500' },
        { name: 'Kanya (Virgo)', date: 'Sep 15 - Oct 14', element: 'Earth', icon: Gem, color: 'from-green-600 to-teal-600' },
        { name: 'Tula (Libra)', date: 'Oct 15 - Nov 14', element: 'Air', icon: Compass, color: 'from-pink-500 to-purple-500' },
        { name: 'Vrishchika (Scorpio)', date: 'Nov 15 - Dec 14', element: 'Water', icon: Eye, color: 'from-red-600 to-pink-600' },
        { name: 'Dhanu (Sagittarius)', date: 'Dec 15 - Jan 13', element: 'Fire', icon: Target, color: 'from-purple-500 to-indigo-500' },
        { name: 'Makara (Capricorn)', date: 'Jan 14 - Feb 12', element: 'Earth', icon: Mountain, color: 'from-gray-600 to-slate-600' },
        { name: 'Kumbha (Aquarius)', date: 'Feb 13 - Mar 13', element: 'Air', icon: Brain, color: 'from-cyan-500 to-blue-500' },
        { name: 'Meena (Pisces)', date: 'Mar 14 - Apr 13', element: 'Water', icon: Waves, color: 'from-blue-500 to-purple-500' }
      ]
    },
    {
      id: 'chinese',
      name: 'Chinese Astrology',
      description: '12-year cycle based on lunar calendar and animal signs',
      icon: Compass,
      color: 'from-red-500 to-yellow-500',
      signs: [
        { name: 'Rat', date: '1924, 1936, 1948...', element: 'Water', icon: Brain, color: 'from-blue-500 to-cyan-500' },
        { name: 'Ox', date: '1925, 1937, 1949...', element: 'Earth', icon: Mountain, color: 'from-green-500 to-emerald-500' },
        { name: 'Tiger', date: '1926, 1938, 1950...', element: 'Wood', icon: Wind, color: 'from-green-600 to-teal-600' },
        { name: 'Rabbit', date: '1927, 1939, 1951...', element: 'Wood', icon: Gem, color: 'from-green-500 to-emerald-500' },
        { name: 'Dragon', date: '1928, 1940, 1952...', element: 'Earth', icon: Flame, color: 'from-red-500 to-orange-500' },
        { name: 'Snake', date: '1929, 1941, 1953...', element: 'Fire', icon: Eye, color: 'from-red-600 to-pink-600' },
        { name: 'Horse', date: '1930, 1942, 1954...', element: 'Fire', icon: Sun, color: 'from-yellow-500 to-orange-500' },
        { name: 'Goat', date: '1931, 1943, 1955...', element: 'Earth', icon: Mountain, color: 'from-gray-600 to-slate-600' },
        { name: 'Monkey', date: '1932, 1944, 1956...', element: 'Metal', icon: Brain, color: 'from-gray-500 to-slate-500' },
        { name: 'Rooster', date: '1933, 1945, 1957...', element: 'Metal', icon: Target, color: 'from-yellow-600 to-orange-600' },
        { name: 'Dog', date: '1934, 1946, 1958...', element: 'Earth', icon: Mountain, color: 'from-brown-500 to-amber-500' },
        { name: 'Pig', date: '1935, 1947, 1959...', element: 'Water', icon: Waves, color: 'from-blue-500 to-purple-500' }
      ]
    },
    {
      id: 'sri-lankan',
      name: 'Sri Lankan Astrology',
      description: 'Traditional Sinhala astrology system with unique calculations',
      icon: Sun,
      color: 'from-green-500 to-blue-500',
      signs: [
        { name: 'Mesha (Aries)', date: 'Apr 14 - May 14', element: 'Fire', icon: Flame, color: 'from-red-500 to-orange-500' },
        { name: 'Vrishabha (Taurus)', date: 'May 15 - Jun 14', element: 'Earth', icon: Mountain, color: 'from-green-500 to-emerald-500' },
        { name: 'Mithuna (Gemini)', date: 'Jun 15 - Jul 14', element: 'Air', icon: Wind, color: 'from-blue-500 to-cyan-500' },
        { name: 'Karka (Cancer)', date: 'Jul 15 - Aug 14', element: 'Water', icon: Waves, color: 'from-blue-600 to-indigo-600' },
        { name: 'Simha (Leo)', date: 'Aug 15 - Sep 14', element: 'Fire', icon: Sun, color: 'from-yellow-500 to-orange-500' },
        { name: 'Kanya (Virgo)', date: 'Sep 15 - Oct 14', element: 'Earth', icon: Gem, color: 'from-green-600 to-teal-600' },
        { name: 'Tula (Libra)', date: 'Oct 15 - Nov 14', element: 'Air', icon: Compass, color: 'from-pink-500 to-purple-500' },
        { name: 'Vrishchika (Scorpio)', date: 'Nov 15 - Dec 14', element: 'Water', icon: Eye, color: 'from-red-600 to-pink-600' },
        { name: 'Dhanu (Sagittarius)', date: 'Dec 15 - Jan 13', element: 'Fire', icon: Target, color: 'from-purple-500 to-indigo-500' },
        { name: 'Makara (Capricorn)', date: 'Jan 14 - Feb 12', element: 'Earth', icon: Mountain, color: 'from-gray-600 to-slate-600' },
        { name: 'Kumbha (Aquarius)', date: 'Feb 13 - Mar 13', element: 'Air', icon: Brain, color: 'from-cyan-500 to-blue-500' },
        { name: 'Meena (Pisces)', date: 'Mar 14 - Apr 13', element: 'Water', icon: Waves, color: 'from-blue-500 to-purple-500' }
      ]
    }
  ]

  const currentSystem = zodiacSystems.find(system => system.id === selectedSystem)

  const handleSystemChange = (systemId: string) => {
    setSelectedSystem(systemId)
    setSelectedSign('')
  }

  const handleSignSelect = (signName: string) => {
    setSelectedSign(signName)
  }

  const handleBirthInfoSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
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
                <Star className="w-12 h-12 text-purple-600 mr-4" />
              </motion.div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Zodiac Systems
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore different astrological systems from around the world. Discover your sign in Western, Vedic, Chinese, and Sri Lankan astrology.
            </p>
          </motion.div>

          {/* System Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Choose Your Astrological System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {zodiacSystems.map((system, index) => (
                <motion.div
                  key={system.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleSystemChange(system.id)}
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

          {/* Birth Information Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Enter Your Birth Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Time</label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Place</label>
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBirthInfoSubmit}
                  disabled={isLoading}
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
                    'Calculate My Chart'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Zodiac Signs Grid */}
          {currentSystem && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                {currentSystem.name} Signs
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentSystem.signs.map((sign, index) => (
                  <motion.div
                    key={sign.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleSignSelect(sign.name)}
                    className={`cursor-pointer bg-white/80 backdrop-blur-lg border-2 rounded-xl p-6 text-center transition-all duration-300 ${
                      selectedSign === sign.name 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-white/20 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${sign.color} flex items-center justify-center mx-auto mb-4`}>
                      <sign.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{sign.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{sign.date}</p>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {sign.element}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Selected Sign Details */}
          {selectedSign && currentSystem && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {selectedSign} in {currentSystem.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Element:</span>
                        <span className="font-medium">Fire</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quality:</span>
                        <span className="font-medium">Cardinal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ruling Planet:</span>
                        <span className="font-medium">Mars</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Personality Traits</h4>
                    <p className="text-gray-600">
                      Dynamic, energetic, and pioneering. You're a natural leader with a strong desire to initiate new projects and take charge of situations.
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/numerology">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Explore Numerology <ArrowRight className="w-5 h-5 inline ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/numerology">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <Calculator className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Numerology</h3>
                  <p className="text-gray-600">Discover the power of numbers in your life</p>
                </motion.div>
              </Link>
              <Link href="/dreams">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <Moon className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
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