'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, ArrowRight, ArrowLeft, Calculator, Heart, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Moon, Calendar, CheckCircle } from 'lucide-react'

export default function SoulUrgePage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [soulUrgeNumber, setSoulUrgeNumber] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const soulUrgeNumbers = [
    {
      number: 1,
      title: 'The Leader',
      description: 'Your soul craves independence, leadership, and pioneering new paths.',
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
      title: 'The Peacemaker',
      description: 'Your soul seeks harmony, cooperation, and meaningful relationships.',
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
      description: 'Your soul desires self-expression, creativity, and joyful communication.',
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
      description: 'Your soul seeks stability, security, and the satisfaction of hard work.',
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
      title: 'The Explorer',
      description: 'Your soul craves freedom, adventure, and new experiences.',
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
      description: 'Your soul desires to care for others and create harmony in relationships.',
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
      description: 'Your soul seeks spiritual understanding and inner wisdom.',
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
      description: 'Your soul desires material success and the power to make a difference.',
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
      description: 'Your soul seeks to serve humanity and make the world a better place.',
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
      description: 'Your soul is a spiritual messenger with strong intuition and psychic abilities.',
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
      description: 'Your soul has the ability to turn dreams into reality and create lasting change.',
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
      description: 'Your soul is a spiritual teacher with the ability to inspire and heal others.',
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
    // Load user profile and calculate soul urge number
    const profile = localStorage.getItem('userData')
    if (profile) {
      const userData = JSON.parse(profile)
      setUserProfile(userData)
      
      // Calculate soul urge number from vowels in full name
      if (userData.fullName) {
        const soulUrgeNum = calculateSoulUrgeNumber(userData.fullName)
        setSoulUrgeNumber(soulUrgeNum)
      }
    }
    setIsLoading(false)
  }, [])

  const calculateSoulUrgeNumber = (fullName: string): number => {
    const vowelValues: { [key: string]: number } = {
      'A': 1, 'E': 5, 'I': 9, 'O': 6, 'U': 3,
      'Y': 7 // Sometimes considered a vowel
    }
    
    const cleanedName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0
    for (const char of cleanedName) {
      if (vowelValues[char]) {
        sum += vowelValues[char]
      }
    }

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  const getSoulUrgeInfo = () => {
    if (!soulUrgeNumber) return null
    
    // Check for master numbers first
    if (soulUrgeNumber === 11 || soulUrgeNumber === 22 || soulUrgeNumber === 33) {
      return masterNumbers.find(num => num.number === soulUrgeNumber)
    }
    
    return soulUrgeNumbers.find(num => num.number === soulUrgeNumber)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Calculating your soul urge number...</p>
        </div>
      </div>
    )
  }

  const soulUrgeInfo = getSoulUrgeInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Soul Urge Number</h1>
              <p className="text-slate-600">Your heart's deepest desires and motivations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Your Soul Urge</p>
                <p className="font-semibold text-slate-900 text-2xl">{soulUrgeNumber || 'Not calculated'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {soulUrgeInfo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Soul Urge Card */}
            <div className={`bg-white rounded-2xl shadow-sm border-2 p-8 ${soulUrgeInfo.borderColor}`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-xl ${soulUrgeInfo.bgColor} flex items-center justify-center`}>
                  <span className="text-3xl font-bold">{soulUrgeNumber}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{soulUrgeInfo.title}</h2>
                  <p className="text-slate-600">{soulUrgeInfo.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Traits */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-purple-600" />
                    Soul Traits
                  </h3>
                  <div className="space-y-2">
                    {soulUrgeInfo.traits.map((trait, index) => (
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
                    Soul Challenges
                  </h3>
                  <div className="space-y-2">
                    {soulUrgeInfo.challenges.map((challenge, index) => (
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
                    Soul Career Paths
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {soulUrgeInfo.career.map((career, index) => (
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
                    Soul Love & Relationships
                  </h3>
                  <p className="text-slate-700">{soulUrgeInfo.love}</p>
                </div>
              </div>
            </div>

            {/* All Soul Urge Numbers */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">All Soul Urge Numbers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soulUrgeNumbers.map((number, index) => (
                  <motion.div
                    key={number.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      soulUrgeNumber === number.number ? number.borderColor : 'border-slate-200'
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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Calculate Your Soul Urge Number</h2>
            <p className="text-slate-600 mb-6">Please complete your profile to see your soul urge number</p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              Complete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


