'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, ArrowRight, ArrowLeft, Calculator, Heart, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Moon, Calendar, CheckCircle } from 'lucide-react'

export default function MasterNumbersPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [masterNumbers, setMasterNumbers] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const masterNumberInfo = [
    {
      number: 11,
      title: 'The Intuitive',
      description: 'You are a spiritual messenger with strong intuition and psychic abilities.',
      traits: ['Intuitive', 'Spiritual', 'Inspirational', 'Sensitive', 'Visionary'],
      challenges: ['Over-sensitivity', 'Nervousness', 'Perfectionism', 'Anxiety'],
      career: ['Psychic', 'Counselor', 'Teacher', 'Healer', 'Artist'],
      love: 'You need a partner who understands your spiritual nature and intuitive gifts.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      symbol: '🔮',
      meaning: 'Spiritual enlightenment and intuition'
    },
    {
      number: 22,
      title: 'The Master Builder',
      description: 'You have the ability to turn dreams into reality and create lasting change.',
      traits: ['Practical', 'Visionary', 'Masterful', 'Ambitious', 'Transformative'],
      challenges: ['Overwhelm', 'Perfectionism', 'Pressure', 'Self-doubt'],
      career: ['Architect', 'Engineer', 'CEO', 'Inventor', 'Leader'],
      love: 'You seek a partner who can support your grand visions and share your ambitions.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      symbol: '🏗️',
      meaning: 'Master builder and visionary leader'
    },
    {
      number: 33,
      title: 'The Master Teacher',
      description: 'You are a spiritual teacher with the ability to inspire and heal others.',
      traits: ['Compassionate', 'Healing', 'Teaching', 'Spiritual', 'Inspiring'],
      challenges: ['Over-responsibility', 'Perfectionism', 'Self-sacrifice', 'Burnout'],
      career: ['Healer', 'Teacher', 'Counselor', 'Spiritual Leader', 'Therapist'],
      love: 'You need a partner who shares your spiritual values and healing mission.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      symbol: '🌟',
      meaning: 'Master teacher and spiritual healer'
    }
  ]

  const karmicDebtNumbers = [
    {
      number: 13,
      title: 'Karmic Debt 13',
      description: 'You must learn to work with others and avoid being too independent.',
      lesson: 'Learn to work with others and be part of a team',
      traits: ['Independent', 'Stubborn', 'Resistant to change'],
      challenges: ['Loneliness', 'Isolation', 'Difficulty working with others'],
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      number: 14,
      title: 'Karmic Debt 14',
      description: 'You must learn to be responsible and avoid being too free-spirited.',
      lesson: 'Learn responsibility and commitment',
      traits: ['Free-spirited', 'Restless', 'Avoids commitment'],
      challenges: ['Lack of focus', 'Difficulty with commitment', 'Restlessness'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      number: 16,
      title: 'Karmic Debt 16',
      description: 'You must learn to be humble and avoid being too proud.',
      lesson: 'Learn humility and avoid pride',
      traits: ['Proud', 'Arrogant', 'Self-centered'],
      challenges: ['Pride', 'Arrogance', 'Difficulty accepting help'],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      number: 19,
      title: 'Karmic Debt 19',
      description: 'You must learn to be patient and avoid being too demanding.',
      lesson: 'Learn patience and avoid being demanding',
      traits: ['Demanding', 'Impatient', 'Controlling'],
      challenges: ['Impatience', 'Being too demanding', 'Difficulty waiting'],
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    }
  ]

  useEffect(() => {
    // Load user profile and check for master numbers
    const profile = localStorage.getItem('userData')
    if (profile) {
      const userData = JSON.parse(profile)
      setUserProfile(userData)
      
      // Check for master numbers in various calculations
      const masterNums = checkForMasterNumbers(userData)
      setMasterNumbers(masterNums)
    }
    setIsLoading(false)
  }, [])

  const checkForMasterNumbers = (userData: any): number[] => {
    const masterNums: number[] = []
    
    // Check life path number
    if (userData.birthDate) {
      const lifePath = calculateLifePath(userData.birthDate)
      if (lifePath === 11 || lifePath === 22 || lifePath === 33) {
        masterNums.push(lifePath)
      }
    }
    
    // Check expression number
    if (userData.fullName) {
      const expression = calculateExpressionNumber(userData.fullName)
      if (expression === 11 || expression === 22 || expression === 33) {
        masterNums.push(expression)
      }
    }
    
    return [...new Set(masterNums)] // Remove duplicates
  }

  const calculateLifePath = (birthDate: string): number => {
    const date = new Date(birthDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    
    let sum = day + month + year
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  const calculateExpressionNumber = (fullName: string): number => {
    const letterValues: { [key: string]: number } = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    }
    
    const cleanedName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0
    for (const char of cleanedName) {
      sum += letterValues[char] || 0
    }

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Analyzing your master numbers...</p>
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Master Numbers</h1>
              <p className="text-slate-600">Special numbers with enhanced spiritual significance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Your Master Numbers</p>
                <p className="font-semibold text-slate-900 text-2xl">
                  {masterNumbers.length > 0 ? masterNumbers.join(', ') : 'None found'}
                </p>
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
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Master Numbers</h2>
              <p className="text-slate-600">Special numbers that carry enhanced spiritual significance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <div className="text-3xl mb-3">🔮</div>
              <h3 className="font-semibold text-slate-900 mb-2">11 - The Intuitive</h3>
              <p className="text-sm text-slate-600">Spiritual enlightenment and intuition</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <div className="text-3xl mb-3">🏗️</div>
              <h3 className="font-semibold text-slate-900 mb-2">22 - The Master Builder</h3>
              <p className="text-sm text-slate-600">Master builder and visionary leader</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <div className="text-3xl mb-3">🌟</div>
              <h3 className="font-semibold text-slate-900 mb-2">33 - The Master Teacher</h3>
              <p className="text-sm text-slate-600">Master teacher and spiritual healer</p>
            </div>
          </div>
        </motion.div>

        {/* Master Numbers */}
        <div className="space-y-8">
          {masterNumberInfo.map((master, index) => (
            <motion.div
              key={master.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-sm border-2 p-8 ${
                masterNumbers.includes(master.number) ? master.borderColor : 'border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-xl ${master.bgColor} flex items-center justify-center`}>
                  <span className="text-3xl">{master.symbol}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{master.title}</h2>
                  <p className="text-slate-600">{master.description}</p>
                  <p className="text-sm text-slate-500 mt-1">{master.meaning}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Traits */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-purple-600" />
                    Master Traits
                  </h3>
                  <div className="space-y-2">
                    {master.traits.map((trait, traitIndex) => (
                      <div key={traitIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-slate-700">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-red-600" />
                    Master Challenges
                  </h3>
                  <div className="space-y-2">
                    {master.challenges.map((challenge, challengeIndex) => (
                      <div key={challengeIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-slate-700">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    Master Career Paths
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {master.career.map((career, careerIndex) => (
                      <span
                        key={careerIndex}
                        className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Love */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-600" />
                    Master Love & Relationships
                  </h3>
                  <p className="text-slate-700">{master.love}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Karmic Debt Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-8 mt-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Karmic Debt Numbers</h3>
          <p className="text-slate-600 mb-6">
            These numbers indicate lessons you need to learn in this lifetime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {karmicDebtNumbers.map((debt, index) => (
              <motion.div
                key={debt.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 ${debt.borderColor} ${debt.bgColor}`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-lg ${debt.bgColor} flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-2xl font-bold">{debt.number}</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{debt.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{debt.description}</p>
                  <div className="text-xs text-slate-500">
                    <strong>Lesson:</strong> {debt.lesson}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}


