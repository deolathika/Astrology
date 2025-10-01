'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Heart, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Moon, CheckCircle } from 'lucide-react'

export default function ChineseZodiacPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [selectedSign, setSelectedSign] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  const chineseSigns = [
    {
      id: 'rat',
      name: 'Rat',
      years: '2020, 2008, 1996, 1984, 1972, 1960',
      element: 'Water',
      yinYang: 'Yang',
      ruler: 'Mercury',
      symbol: '🐀',
      description: 'The Rat - Intelligent, adaptable, and resourceful',
      traits: ['Intelligent', 'Adaptable', 'Resourceful', 'Charming', 'Ambitious'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'ox',
      name: 'Ox',
      years: '2021, 2009, 1997, 1985, 1973, 1961',
      element: 'Earth',
      yinYang: 'Yin',
      ruler: 'Venus',
      symbol: '🐂',
      description: 'The Ox - Strong, reliable, and hardworking',
      traits: ['Strong', 'Reliable', 'Hardworking', 'Patient', 'Determined'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'tiger',
      name: 'Tiger',
      years: '2022, 2010, 1998, 1986, 1974, 1962',
      element: 'Wood',
      yinYang: 'Yang',
      ruler: 'Jupiter',
      symbol: '🐅',
      description: 'The Tiger - Brave, confident, and passionate',
      traits: ['Brave', 'Confident', 'Passionate', 'Independent', 'Charismatic'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'rabbit',
      name: 'Rabbit',
      years: '2023, 2011, 1999, 1987, 1975, 1963',
      element: 'Wood',
      yinYang: 'Yin',
      ruler: 'Moon',
      symbol: '🐰',
      description: 'The Rabbit - Gentle, compassionate, and artistic',
      traits: ['Gentle', 'Compassionate', 'Artistic', 'Diplomatic', 'Intuitive'],
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'dragon',
      name: 'Dragon',
      years: '2024, 2012, 2000, 1988, 1976, 1964',
      element: 'Earth',
      yinYang: 'Yang',
      ruler: 'Sun',
      symbol: '🐉',
      description: 'The Dragon - Powerful, ambitious, and charismatic',
      traits: ['Powerful', 'Ambitious', 'Charismatic', 'Confident', 'Lucky'],
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'snake',
      name: 'Snake',
      years: '2025, 2013, 2001, 1989, 1977, 1965',
      element: 'Fire',
      yinYang: 'Yin',
      ruler: 'Mercury',
      symbol: '🐍',
      description: 'The Snake - Wise, mysterious, and intuitive',
      traits: ['Wise', 'Mysterious', 'Intuitive', 'Charming', 'Determined'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'horse',
      name: 'Horse',
      years: '2026, 2014, 2002, 1990, 1978, 1966',
      element: 'Fire',
      yinYang: 'Yang',
      ruler: 'Jupiter',
      symbol: '🐴',
      description: 'The Horse - Energetic, adventurous, and free-spirited',
      traits: ['Energetic', 'Adventurous', 'Free-spirited', 'Optimistic', 'Independent'],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'goat',
      name: 'Goat',
      years: '2027, 2015, 2003, 1991, 1979, 1967',
      element: 'Earth',
      yinYang: 'Yin',
      ruler: 'Venus',
      symbol: '🐐',
      description: 'The Goat - Creative, gentle, and empathetic',
      traits: ['Creative', 'Gentle', 'Empathetic', 'Artistic', 'Peaceful'],
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      id: 'monkey',
      name: 'Monkey',
      years: '2028, 2016, 2004, 1992, 1980, 1968',
      element: 'Metal',
      yinYang: 'Yang',
      ruler: 'Mercury',
      symbol: '🐵',
      description: 'The Monkey - Clever, playful, and innovative',
      traits: ['Clever', 'Playful', 'Innovative', 'Curious', 'Versatile'],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'rooster',
      name: 'Rooster',
      years: '2029, 2017, 2005, 1993, 1981, 1969',
      element: 'Metal',
      yinYang: 'Yin',
      ruler: 'Venus',
      symbol: '🐓',
      description: 'The Rooster - Punctual, honest, and hardworking',
      traits: ['Punctual', 'Honest', 'Hardworking', 'Confident', 'Perfectionist'],
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 'dog',
      name: 'Dog',
      years: '2030, 2018, 2006, 1994, 1982, 1970',
      element: 'Earth',
      yinYang: 'Yang',
      ruler: 'Mars',
      symbol: '🐕',
      description: 'The Dog - Loyal, honest, and protective',
      traits: ['Loyal', 'Honest', 'Protective', 'Faithful', 'Courageous'],
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200'
    },
    {
      id: 'pig',
      name: 'Pig',
      years: '2031, 2019, 2007, 1995, 1983, 1971',
      element: 'Water',
      yinYang: 'Yin',
      ruler: 'Jupiter',
      symbol: '🐷',
      description: 'The Pig - Generous, sincere, and optimistic',
      traits: ['Generous', 'Sincere', 'Optimistic', 'Compassionate', 'Hardworking'],
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    }
  ]

  const elements = [
    {
      name: 'Wood',
      description: 'Growth, creativity, and flexibility',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      traits: ['Creative', 'Flexible', 'Growth-oriented', 'Idealistic']
    },
    {
      name: 'Fire',
      description: 'Passion, energy, and transformation',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      traits: ['Passionate', 'Energetic', 'Transformative', 'Dynamic']
    },
    {
      name: 'Earth',
      description: 'Stability, practicality, and nurturing',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      traits: ['Stable', 'Practical', 'Nurturing', 'Reliable']
    },
    {
      name: 'Metal',
      description: 'Strength, determination, and precision',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      traits: ['Strong', 'Determined', 'Precise', 'Focused']
    },
    {
      name: 'Water',
      description: 'Wisdom, adaptability, and flow',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      traits: ['Wise', 'Adaptable', 'Flowing', 'Intuitive']
    }
  ]

  useEffect(() => {
    // Load user profile
    const profile = localStorage.getItem('userData')
    if (profile) {
      const userData = JSON.parse(profile)
      setUserProfile(userData)
      setSelectedSign(userData.zodiacSign?.toLowerCase() || '')
    }
    setIsLoading(false)
  }, [])

  const getChineseSign = (birthYear: number) => {
    const startYear = 1900
    const cycle = 12
    const yearIndex = (birthYear - startYear) % cycle
    const signs = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig']
    return signs[yearIndex]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your Chinese zodiac information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Chinese Zodiac</h1>
              <p className="text-slate-600">12-year cycle based on lunar calendar</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Your Sign</p>
                <p className="font-semibold text-slate-900 capitalize">{userProfile?.zodiacSign || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-yellow-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Chinese Astrology</h2>
              <p className="text-slate-600">Based on the 12-year lunar cycle and five elements</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <Calendar className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">12 Animals</h3>
              <p className="text-sm text-slate-600">Each year is represented by a different animal with unique characteristics</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <Sparkles className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">5 Elements</h3>
              <p className="text-sm text-slate-600">Wood, Fire, Earth, Metal, and Water influence personality traits</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Yin & Yang</h3>
              <p className="text-sm text-slate-600">Balance of masculine and feminine energies in each sign</p>
            </div>
          </div>
        </motion.div>

        {/* Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">The Five Elements</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {elements.map((element, index) => (
              <motion.div
                key={element.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl ${element.bgColor} border-2 border-transparent hover:border-slate-200 transition-all duration-200`}
              >
                <h4 className={`font-semibold ${element.color} mb-2`}>{element.name}</h4>
                <p className="text-sm text-slate-600 mb-3">{element.description}</p>
                <div className="space-y-1">
                  {element.traits.map((trait, traitIndex) => (
                    <div key={traitIndex} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${element.color.replace('text-', 'bg-')} rounded-full`}></div>
                      <span className="text-xs text-slate-600">{trait}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chinese Signs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chineseSigns.map((sign, index) => (
            <motion.div
              key={sign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-sm border-2 p-6 transition-all duration-200 hover:shadow-md ${
                selectedSign === sign.id ? sign.borderColor : 'border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${sign.bgColor} flex items-center justify-center`}>
                  <span className="text-2xl">{sign.symbol}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{sign.name}</h3>
                  <p className="text-sm text-slate-600">{sign.years}</p>
                </div>
              </div>
              
              <p className="text-slate-700 mb-4">{sign.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Element: <span className="font-semibold">{sign.element}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Yin/Yang: <span className="font-semibold">{sign.yinYang}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Ruler: <span className="font-semibold">{sign.ruler}</span></span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-slate-900 mb-2">Key Traits</h4>
                <div className="flex flex-wrap gap-2">
                  {sign.traits.map((trait, traitIndex) => (
                    <span
                      key={traitIndex}
                      className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


