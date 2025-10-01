'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, ArrowRight, ArrowLeft, Calculator, Heart, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Moon, Calendar, CheckCircle } from 'lucide-react'

export default function PersonalityNumberPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [personalityNumber, setPersonalityNumber] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const personalityNumbers = [
    {
      number: 1,
      title: 'The Leader',
      description: 'You appear confident, independent, and natural-born leaders to others.',
      traits: ['Independent', 'Ambitious', 'Pioneering', 'Self-reliant', 'Determined'],
      challenges: ['Impatience', 'Stubbornness', 'Loneliness', 'Arrogance'],
      career: ['Entrepreneur', 'Manager', 'CEO', 'Politician', 'Inventor'],
      love: 'You need a partner who respects your independence and supports your ambitions.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      number: 2,
      title: 'The Diplomat',
      description: 'You appear diplomatic, sensitive, and peace-loving to others.',
      traits: ['Diplomatic', 'Intuitive', 'Sensitive', 'Cooperative', 'Patient'],
      challenges: ['Over-sensitivity', 'Indecisiveness', 'Dependency', 'Passivity'],
      career: ['Mediator', 'Counselor', 'Teacher', 'Artist', 'Healer'],
      love: 'You thrive in relationships built on trust, understanding, and emotional connection.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      number: 3,
      title: 'The Creative',
      description: 'You appear creative, expressive, and joyful to others.',
      traits: ['Creative', 'Expressive', 'Optimistic', 'Social', 'Inspiring'],
      challenges: ['Scattered energy', 'Superficiality', 'Gossip', 'Moodiness'],
      career: ['Artist', 'Writer', 'Performer', 'Communicator', 'Designer'],
      love: 'You bring joy and creativity to relationships, but need freedom to express yourself.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      number: 4,
      title: 'The Builder',
      description: 'You appear practical, reliable, and hardworking to others.',
      traits: ['Practical', 'Reliable', 'Hardworking', 'Organized', 'Stable'],
      challenges: ['Rigidity', 'Stubbornness', 'Overwork', 'Lack of flexibility'],
      career: ['Engineer', 'Architect', 'Manager', 'Accountant', 'Builder'],
      love: 'You seek stability and commitment in relationships, valuing loyalty above all.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      number: 5,
      title: 'The Adventurer',
      description: 'You appear adventurous, freedom-loving, and versatile to others.',
      traits: ['Adventurous', 'Freedom-loving', 'Versatile', 'Curious', 'Energetic'],
      challenges: ['Restlessness', 'Impatience', 'Commitment issues', 'Scattered focus'],
      career: ['Traveler', 'Journalist', 'Salesperson', 'Explorer', 'Entrepreneur'],
      love: 'You need a partner who shares your love of adventure and gives you space to explore.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      number: 6,
      title: 'The Nurturer',
      description: 'You appear caring, responsible, and nurturing to others.',
      traits: ['Caring', 'Responsible', 'Nurturing', 'Harmonious', 'Protective'],
      challenges: ['Over-protectiveness', 'Perfectionism', 'Self-sacrifice', 'Control issues'],
      career: ['Teacher', 'Counselor', 'Parent', 'Healer', 'Social worker'],
      love: 'You are a natural caregiver who seeks to create a loving, harmonious home.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      number: 7,
      title: 'The Seeker',
      description: 'You appear spiritual, analytical, and wise to others.',
      traits: ['Spiritual', 'Analytical', 'Intuitive', 'Introspective', 'Wise'],
      challenges: ['Isolation', 'Perfectionism', 'Skepticism', 'Over-analysis'],
      career: ['Researcher', 'Scientist', 'Philosopher', 'Mystic', 'Analyst'],
      love: 'You need a partner who understands your need for solitude and spiritual growth.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      number: 8,
      title: 'The Achiever',
      description: 'You appear ambitious, powerful, and successful to others.',
      traits: ['Ambitious', 'Powerful', 'Materialistic', 'Confident', 'Authoritative'],
      challenges: ['Workaholism', 'Power struggles', 'Materialism', 'Impatience'],
      career: ['Executive', 'Banker', 'Politician', 'Entrepreneur', 'Manager'],
      love: 'You seek a partner who can match your ambition and support your goals.',
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200'
    },
    {
      number: 9,
      title: 'The Humanitarian',
      description: 'You appear compassionate, wise, and humanitarian to others.',
      traits: ['Compassionate', 'Wise', 'Generous', 'Idealistic', 'Universal'],
      challenges: ['Perfectionism', 'Self-righteousness', 'Over-idealism', 'Burned out'],
      career: ['Healer', 'Teacher', 'Philosopher', 'Activist', 'Counselor'],
      love: 'You seek a partner who shares your values and desire to make a difference.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ]

  const masterNumbers = [
    {
      number: 11,
      title: 'The Intuitive',
      description: 'You appear intuitive, spiritual, and inspirational to others.',
      traits: ['Intuitive', 'Spiritual', 'Inspirational', 'Sensitive', 'Visionary'],
      challenges: ['Over-sensitivity', 'Nervousness', 'Perfectionism', 'Anxiety'],
      career: ['Psychic', 'Counselor', 'Teacher', 'Healer', 'Artist'],
      love: 'You need a partner who understands your spiritual nature and intuitive gifts.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      number: 22,
      title: 'The Master Builder',
      description: 'You appear practical, visionary, and masterful to others.',
      traits: ['Practical', 'Visionary', 'Masterful', 'Ambitious', 'Transformative'],
      challenges: ['Overwhelm', 'Perfectionism', 'Pressure', 'Self-doubt'],
      career: ['Architect', 'Engineer', 'CEO', 'Inventor', 'Leader'],
      love: 'You seek a partner who can support your grand visions and share your ambitions.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      number: 33,
      title: 'The Master Teacher',
      description: 'You appear compassionate, healing, and inspiring to others.',
      traits: ['Compassionate', 'Healing', 'Teaching', 'Spiritual', 'Inspiring'],
      challenges: ['Over-responsibility', 'Perfectionism', 'Self-sacrifice', 'Burnout'],
      career: ['Healer', 'Teacher', 'Counselor', 'Spiritual Leader', 'Therapist'],
      love: 'You need a partner who shares your spiritual values and healing mission.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ]

  useEffect(() => {
    // Load user profile and calculate personality number
    const profile = localStorage.getItem('userData')
    if (profile) {
      const userData = JSON.parse(profile)
      setUserProfile(userData)
      
      // Calculate personality number from consonants in full name
      if (userData.fullName) {
        const personalityNum = calculatePersonalityNumber(userData.fullName)
        setPersonalityNumber(personalityNum)
      }
    }
    setIsLoading(false)
  }, [])

  const calculatePersonalityNumber = (fullName: string): number => {
    const consonantValues: { [key: string]: number } = {
      'B': 2, 'C': 3, 'D': 4, 'F': 6, 'G': 7, 'H': 8, 'J': 1, 'K': 2, 'L': 3, 'M': 4,
      'N': 5, 'P': 7, 'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    }
    
    const cleanedName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0
    for (const char of cleanedName) {
      if (consonantValues[char]) {
        sum += consonantValues[char]
      }
    }

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  const getPersonalityInfo = () => {
    if (!personalityNumber) return null
    
    // Check for master numbers first
    if (personalityNumber === 11 || personalityNumber === 22 || personalityNumber === 33) {
      return masterNumbers.find(num => num.number === personalityNumber)
    }
    
    return personalityNumbers.find(num => num.number === personalityNumber)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Calculating your personality number...</p>
        </div>
      </div>
    )
  }

  const personalityInfo = getPersonalityInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Personality Number</h1>
              <p className="text-slate-600">How others perceive you and your outer personality</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Your Personality</p>
                <p className="font-semibold text-slate-900 text-2xl">{personalityNumber || 'Not calculated'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {personalityInfo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Personality Card */}
            <div className={`bg-white rounded-2xl shadow-sm border-2 p-8 ${personalityInfo.borderColor}`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-xl ${personalityInfo.bgColor} flex items-center justify-center`}>
                  <span className="text-3xl font-bold">{personalityNumber}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{personalityInfo.title}</h2>
                  <p className="text-slate-600">{personalityInfo.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Traits */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-purple-600" />
                    Personality Traits
                  </h3>
                  <div className="space-y-2">
                    {personalityInfo.traits.map((trait, index) => (
                      <div key={index} className="flex items-center space-x-2">
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
                    Personality Challenges
                  </h3>
                  <div className="space-y-2">
                    {personalityInfo.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-center space-x-2">
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
                    Career Paths
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {personalityInfo.career.map((career, index) => (
                      <span
                        key={index}
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
                    Love & Relationships
                  </h3>
                  <p className="text-slate-700">{personalityInfo.love}</p>
                </div>
              </div>
            </div>

            {/* All Personality Numbers */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">All Personality Numbers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalityNumbers.map((number, index) => (
                  <motion.div
                    key={number.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      personalityNumber === number.number ? number.borderColor : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${number.bgColor} flex items-center justify-center`}>
                        <span className="text-xl font-bold">{number.number}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{number.title}</h4>
                        <p className="text-sm text-slate-600">{number.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {number.traits.slice(0, 3).map((trait, traitIndex) => (
                        <span
                          key={traitIndex}
                          className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Calculator className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Calculate Your Personality Number</h2>
            <p className="text-slate-600 mb-6">Please complete your profile to see your personality number</p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              Complete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


