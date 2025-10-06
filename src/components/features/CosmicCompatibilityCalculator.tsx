'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Star, 
  Moon, 
  Sun, 
  Zap, 
  Shield, 
  Flame, 
  Waves, 
  Mountain, 
  Wind,
  Users,
  MessageCircle,
  Sparkles,
  Target,
  Compass,
  Gem,
  Crown,
  Brain,
  Eye,
  Globe
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

interface CompatibilityResult {
  overallScore: number
  categories: {
    emotional: number
    intellectual: number
    physical: number
    spiritual: number
    communication: number
    values: number
  }
  strengths: string[]
  challenges: string[]
  recommendations: string[]
  cosmicAlignment: {
    element: string
    modality: string
    polarity: string
  }
}

interface Person {
  name: string
  birthDate: string
  birthTime: string
  birthLocation: string
  zodiacSign: string
  element: string
  modality: string
}

export default function CosmicCompatibilityCalculator() {
  const [person1, setPerson1] = useState<Person>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    zodiacSign: '',
    element: '',
    modality: ''
  })
  
  const [person2, setPerson2] = useState<Person>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    zodiacSign: '',
    element: '',
    modality: ''
  })
  
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', element: 'Fire', modality: 'Cardinal', color: 'from-red-500 to-orange-500' },
    { name: 'Taurus', symbol: '♉', element: 'Earth', modality: 'Fixed', color: 'from-green-500 to-emerald-500' },
    { name: 'Gemini', symbol: '♊', element: 'Air', modality: 'Mutable', color: 'from-yellow-500 to-amber-500' },
    { name: 'Cancer', symbol: '♋', element: 'Water', modality: 'Cardinal', color: 'from-blue-500 to-cyan-500' },
    { name: 'Leo', symbol: '♌', element: 'Fire', modality: 'Fixed', color: 'from-orange-500 to-yellow-500' },
    { name: 'Virgo', symbol: '♍', element: 'Earth', modality: 'Mutable', color: 'from-green-600 to-lime-500' },
    { name: 'Libra', symbol: '♎', element: 'Air', modality: 'Cardinal', color: 'from-pink-500 to-rose-500' },
    { name: 'Scorpio', symbol: '♏', element: 'Water', modality: 'Fixed', color: 'from-purple-500 to-violet-500' },
    { name: 'Sagittarius', symbol: '♐', element: 'Fire', modality: 'Mutable', color: 'from-indigo-500 to-blue-500' },
    { name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal', color: 'from-gray-600 to-slate-500' },
    { name: 'Aquarius', symbol: '♒', element: 'Air', modality: 'Fixed', color: 'from-cyan-500 to-teal-500' },
    { name: 'Pisces', symbol: '♓', element: 'Water', modality: 'Mutable', color: 'from-blue-400 to-indigo-500' }
  ]

  const getZodiacSign = (month: number, day: number): string => {
    const signs = [
      { name: 'Capricorn', start: [12, 22], end: [1, 19] },
      { name: 'Aquarius', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', start: [2, 19], end: [3, 20] },
      { name: 'Aries', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', start: [6, 21], end: [7, 22] },
      { name: 'Leo', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', start: [8, 23], end: [9, 22] },
      { name: 'Libra', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
    ]
    
    for (const sign of signs) {
      if ((month === sign.start[0] && day >= sign.start[1]) || 
          (month === sign.end[0] && day <= sign.end[1])) {
        return sign.name
      }
    }
    return 'Capricorn'
  }

  const getElementAndModality = (sign: string) => {
    const signData = zodiacSigns.find(s => s.name === sign)
    return {
      element: signData?.element || 'Unknown',
      modality: signData?.modality || 'Unknown'
    }
  }

  const calculateCompatibility = async () => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Calculate compatibility based on zodiac signs
    const sign1Data = zodiacSigns.find(s => s.name === person1.zodiacSign)
    const sign2Data = zodiacSigns.find(s => s.name === person2.zodiacSign)
    
    if (!sign1Data || !sign2Data) return
    
    // Calculate overall compatibility score
    let overallScore = 50 // Base score
    
    // Element compatibility
    if (sign1Data.element === sign2Data.element) {
      overallScore += 20 // Same element
    } else if (
      (sign1Data.element === 'Fire' && sign2Data.element === 'Air') ||
      (sign1Data.element === 'Air' && sign2Data.element === 'Fire') ||
      (sign1Data.element === 'Water' && sign2Data.element === 'Earth') ||
      (sign1Data.element === 'Earth' && sign2Data.element === 'Water')
    ) {
      overallScore += 15 // Compatible elements
    } else {
      overallScore += 5 // Different elements
    }
    
    // Modality compatibility
    if (sign1Data.modality === sign2Data.modality) {
      overallScore += 10 // Same modality
    } else if (
      (sign1Data.modality === 'Cardinal' && sign2Data.modality === 'Fixed') ||
      (sign1Data.modality === 'Fixed' && sign2Data.modality === 'Cardinal') ||
      (sign1Data.modality === 'Mutable' && sign2Data.modality === 'Cardinal') ||
      (sign1Data.modality === 'Cardinal' && sign2Data.modality === 'Mutable')
    ) {
      overallScore += 8 // Compatible modalities
    }
    
    // Generate detailed results
    const compatibilityResult: CompatibilityResult = {
      overallScore: Math.min(overallScore, 100),
      categories: {
        emotional: Math.floor(Math.random() * 30) + 70,
        intellectual: Math.floor(Math.random() * 30) + 70,
        physical: Math.floor(Math.random() * 30) + 70,
        spiritual: Math.floor(Math.random() * 30) + 70,
        communication: Math.floor(Math.random() * 30) + 70,
        values: Math.floor(Math.random() * 30) + 70
      },
      strengths: [
        `${sign1Data.element} and ${sign2Data.element} elements create dynamic energy`,
        'Strong emotional connection potential',
        'Complementary communication styles',
        'Shared values and life goals',
        'Natural understanding of each other'
      ],
      challenges: [
        'Different approaches to conflict resolution',
        'Varying energy levels and needs',
        'Communication style differences',
        'Different priorities at times'
      ],
      recommendations: [
        'Focus on your shared ${sign1Data.element} energy',
        'Practice active listening and empathy',
        'Celebrate your differences as strengths',
        'Create regular quality time together',
        'Support each other\'s individual growth'
      ],
      cosmicAlignment: {
        element: `${sign1Data.element} & ${sign2Data.element}`,
        modality: `${sign1Data.modality} & ${sign2Data.modality}`,
        polarity: 'Balanced'
      }
    }
    
    setResult(compatibilityResult)
    setIsCalculating(false)
  }

  const handlePersonChange = (person: 'person1' | 'person2', field: keyof Person, value: string) => {
    if (person === 'person1') {
      setPerson1(prev => ({ ...prev, [field]: value }))
    } else {
      setPerson2(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleBirthDateChange = (person: 'person1' | 'person2', birthDate: string) => {
    if (birthDate) {
      const date = new Date(birthDate)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const zodiacSign = getZodiacSign(month, day)
      const { element, modality } = getElementAndModality(zodiacSign)
      
      if (person === 'person1') {
        setPerson1(prev => ({ ...prev, birthDate, zodiacSign, element, modality }))
      } else {
        setPerson2(prev => ({ ...prev, birthDate, zodiacSign, element, modality }))
      }
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Cosmic Compatibility Calculator
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Discover the cosmic connection between two souls
          </p>
        </motion.div>

        {/* Input Forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Person 1 */}
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-center text-pink-400">Person 1</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter full name"
                  value={person1.name}
                  onChange={(e) => handlePersonChange('person1', 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Date</label>
                <input
                  type="date"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={person1.birthDate}
                  onChange={(e) => handleBirthDateChange('person1', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Time (Optional)</label>
                <input
                  type="time"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={person1.birthTime}
                  onChange={(e) => handlePersonChange('person1', 'birthTime', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Location</label>
                <input
                  type="text"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., New York, NY"
                  value={person1.birthLocation}
                  onChange={(e) => handlePersonChange('person1', 'birthLocation', e.target.value)}
                />
              </div>
              {person1.zodiacSign && (
                <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{zodiacSigns.find(s => s.name === person1.zodiacSign)?.symbol}</span>
                    <div>
                      <p className="text-pink-400 font-semibold">{person1.zodiacSign}</p>
                      <p className="text-sm text-gray-300">{person1.element} • {person1.modality}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Person 2 */}
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">Person 2</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                  value={person2.name}
                  onChange={(e) => handlePersonChange('person2', 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Date</label>
                <input
                  type="date"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={person2.birthDate}
                  onChange={(e) => handleBirthDateChange('person2', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Time (Optional)</label>
                <input
                  type="time"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={person2.birthTime}
                  onChange={(e) => handlePersonChange('person2', 'birthTime', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Location</label>
                <input
                  type="text"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Los Angeles, CA"
                  value={person2.birthLocation}
                  onChange={(e) => handlePersonChange('person2', 'birthLocation', e.target.value)}
                />
              </div>
              {person2.zodiacSign && (
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{zodiacSigns.find(s => s.name === person2.zodiacSign)?.symbol}</span>
                    <div>
                      <p className="text-blue-400 font-semibold">{person2.zodiacSign}</p>
                      <p className="text-sm text-gray-300">{person2.element} • {person2.modality}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Calculate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Button
            variant="cosmic"
            size="lg"
            onClick={calculateCompatibility}
            disabled={!person1.name || !person1.birthDate || !person2.name || !person2.birthDate || isCalculating}
            className="btn-cosmic"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Calculating Compatibility...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 mr-2" />
                Calculate Cosmic Compatibility
              </>
            )}
          </Button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Overall Score */}
              <Card className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-4">Overall Compatibility</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className={`text-6xl font-bold ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore}%
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <motion.div
                    className={`h-4 rounded-full bg-gradient-to-r ${getScoreGradient(result.overallScore)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${result.overallScore}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
                <p className="text-lg text-gray-300">
                  {result.overallScore >= 80 ? 'Excellent Compatibility!' :
                   result.overallScore >= 60 ? 'Good Compatibility' :
                   'Challenging but Workable'}
                </p>
              </Card>

              {/* Category Scores */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-center">Detailed Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(result.categories).map(([category, score]) => (
                    <div key={category} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getScoreGradient(score)} flex items-center justify-center text-white font-bold`}>
                          {score}
                        </div>
                      </div>
                      <h4 className="font-semibold capitalize mb-2">{category}</h4>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(score)}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Strengths and Challenges */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-3">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-300">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Areas to Work On
                  </h3>
                  <ul className="space-y-3">
                    {result.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-300">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Recommendations */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-400 flex items-center">
                  <Compass className="w-5 h-5 mr-2" />
                  Cosmic Recommendations
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Cosmic Alignment */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Cosmic Alignment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Elements</h4>
                    <p className="text-lg text-purple-400">{result.cosmicAlignment.element}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Modalities</h4>
                    <p className="text-lg text-purple-400">{result.cosmicAlignment.modality}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Polarity</h4>
                    <p className="text-lg text-purple-400">{result.cosmicAlignment.polarity}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
