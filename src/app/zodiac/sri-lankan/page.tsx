'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Heart, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Moon, CheckCircle } from 'lucide-react'

export default function SriLankanZodiacPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [selectedSign, setSelectedSign] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  const sriLankanSigns = [
    {
      id: 'mesha',
      name: 'Mesha (Aries)',
      sinhala: 'මේෂ',
      dates: 'April 14 - May 14',
      element: 'Fire',
      quality: 'Cardinal',
      ruler: 'Mars',
      symbol: '♈',
      description: 'The Ram - Bold, ambitious, and natural leaders',
      traits: ['Bold', 'Ambitious', 'Natural Leader', 'Energetic', 'Impulsive'],
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'vrishabha',
      name: 'Vrishabha (Taurus)',
      sinhala: 'වෘෂභ',
      dates: 'May 15 - June 14',
      element: 'Earth',
      quality: 'Fixed',
      ruler: 'Venus',
      symbol: '♉',
      description: 'The Bull - Practical, reliable, and sensual',
      traits: ['Practical', 'Reliable', 'Sensual', 'Stubborn', 'Loyal'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'mithuna',
      name: 'Mithuna (Gemini)',
      sinhala: 'මිථුන',
      dates: 'June 15 - July 14',
      element: 'Air',
      quality: 'Mutable',
      ruler: 'Mercury',
      symbol: '♊',
      description: 'The Twins - Curious, adaptable, and communicative',
      traits: ['Curious', 'Adaptable', 'Communicative', 'Versatile', 'Restless'],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'karka',
      name: 'Karka (Cancer)',
      sinhala: 'කර්ක',
      dates: 'July 15 - August 14',
      element: 'Water',
      quality: 'Cardinal',
      ruler: 'Moon',
      symbol: '♋',
      description: 'The Crab - Emotional, intuitive, and protective',
      traits: ['Emotional', 'Intuitive', 'Protective', 'Nurturing', 'Moody'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'simha',
      name: 'Simha (Leo)',
      sinhala: 'සිංහ',
      dates: 'August 15 - September 14',
      element: 'Fire',
      quality: 'Fixed',
      ruler: 'Sun',
      symbol: '♌',
      description: 'The Lion - Confident, creative, and generous',
      traits: ['Confident', 'Creative', 'Generous', 'Dramatic', 'Proud'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'kanya',
      name: 'Kanya (Virgo)',
      sinhala: 'කන්‍ය',
      dates: 'September 15 - October 14',
      element: 'Earth',
      quality: 'Mutable',
      ruler: 'Mercury',
      symbol: '♍',
      description: 'The Virgin - Analytical, practical, and perfectionist',
      traits: ['Analytical', 'Practical', 'Perfectionist', 'Modest', 'Critical'],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'tula',
      name: 'Tula (Libra)',
      sinhala: 'තුල',
      dates: 'October 15 - November 14',
      element: 'Air',
      quality: 'Cardinal',
      ruler: 'Venus',
      symbol: '♎',
      description: 'The Scales - Diplomatic, fair, and relationship-focused',
      traits: ['Diplomatic', 'Fair', 'Relationship-focused', 'Indecisive', 'Charming'],
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'vrischika',
      name: 'Vrischika (Scorpio)',
      sinhala: 'වෘශ්චික',
      dates: 'November 15 - December 14',
      element: 'Water',
      quality: 'Fixed',
      ruler: 'Mars',
      symbol: '♏',
      description: 'The Scorpion - Intense, passionate, and transformative',
      traits: ['Intense', 'Passionate', 'Transformative', 'Secretive', 'Powerful'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'dhanu',
      name: 'Dhanu (Sagittarius)',
      sinhala: 'ධනු',
      dates: 'December 15 - January 13',
      element: 'Fire',
      quality: 'Mutable',
      ruler: 'Jupiter',
      symbol: '♐',
      description: 'The Archer - Adventurous, philosophical, and optimistic',
      traits: ['Adventurous', 'Philosophical', 'Optimistic', 'Blunt', 'Free-spirited'],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'makara',
      name: 'Makara (Capricorn)',
      sinhala: 'මකර',
      dates: 'January 14 - February 12',
      element: 'Earth',
      quality: 'Cardinal',
      ruler: 'Saturn',
      symbol: '♑',
      description: 'The Goat - Ambitious, disciplined, and practical',
      traits: ['Ambitious', 'Disciplined', 'Practical', 'Reserved', 'Responsible'],
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200'
    },
    {
      id: 'kumbha',
      name: 'Kumbha (Aquarius)',
      sinhala: 'කුම්භ',
      dates: 'February 13 - March 13',
      element: 'Air',
      quality: 'Fixed',
      ruler: 'Saturn',
      symbol: '♒',
      description: 'The Water Bearer - Independent, innovative, and humanitarian',
      traits: ['Independent', 'Innovative', 'Humanitarian', 'Unconventional', 'Detached'],
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200'
    },
    {
      id: 'meena',
      name: 'Meena (Pisces)',
      sinhala: 'මීන',
      dates: 'March 14 - April 13',
      element: 'Water',
      quality: 'Mutable',
      ruler: 'Jupiter',
      symbol: '♓',
      description: 'The Fish - Compassionate, intuitive, and artistic',
      traits: ['Compassionate', 'Intuitive', 'Artistic', 'Dreamy', 'Escapist'],
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    }
  ]

  const nakshatras = [
    {
      name: 'Ashwini',
      sinhala: 'අශ්විනි',
      description: 'The Horsemen - Quick, healing, and energetic',
      traits: ['Quick', 'Healing', 'Energetic', 'Pioneering'],
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Bharani',
      sinhala: 'භරණි',
      description: 'The Bearer - Creative, artistic, and transformative',
      traits: ['Creative', 'Artistic', 'Transformative', 'Sensual'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      name: 'Krittika',
      sinhala: 'කෘත්තික',
      description: 'The Cutter - Sharp, focused, and determined',
      traits: ['Sharp', 'Focused', 'Determined', 'Ambitious'],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Rohini',
      sinhala: 'රෝහිණි',
      description: 'The Red One - Beautiful, nurturing, and sensual',
      traits: ['Beautiful', 'Nurturing', 'Sensual', 'Artistic'],
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      name: 'Mrigashira',
      sinhala: 'මෘගශිර',
      description: 'The Deer Head - Curious, searching, and adaptable',
      traits: ['Curious', 'Searching', 'Adaptable', 'Versatile'],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your Sri Lankan zodiac information...</p>
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Sri Lankan Zodiac</h1>
              <p className="text-slate-600">Traditional Sinhala astrology system</p>
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
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-yellow-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Sri Lankan Astrology</h2>
              <p className="text-slate-600">Traditional Sinhala astrology with cultural context</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">12 Rashi</h3>
              <p className="text-sm text-slate-600">Sidereal zodiac signs with Sinhala names and cultural significance</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <Sparkles className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">27 Nakshatras</h3>
              <p className="text-sm text-slate-600">Lunar mansions for detailed personality analysis</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Cultural Context</h3>
              <p className="text-sm text-slate-600">Local traditions and Sinhala cultural practices</p>
            </div>
          </div>
        </motion.div>

        {/* Nakshatras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Nakshatras (Lunar Mansions)</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {nakshatras.map((nakshatra, index) => (
              <motion.div
                key={nakshatra.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl ${nakshatra.bgColor} border-2 border-transparent hover:border-slate-200 transition-all duration-200`}
              >
                <h4 className={`font-semibold ${nakshatra.color} mb-2`}>{nakshatra.name}</h4>
                <p className="text-sm text-slate-600 mb-2">{nakshatra.sinhala}</p>
                <p className="text-xs text-slate-500 mb-3">{nakshatra.description}</p>
                <div className="space-y-1">
                  {nakshatra.traits.map((trait, traitIndex) => (
                    <div key={traitIndex} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${nakshatra.color.replace('text-', 'bg-')} rounded-full`}></div>
                      <span className="text-xs text-slate-600">{trait}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sri Lankan Signs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sriLankanSigns.map((sign, index) => (
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
                  <p className="text-sm text-slate-600">{sign.sinhala}</p>
                  <p className="text-xs text-slate-500">{sign.dates}</p>
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
                  <span className="text-sm text-slate-600">Quality: <span className="font-semibold">{sign.quality}</span></span>
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


