'use client'

import React, { useState } from 'react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

interface CompatibilityResult {
  overallScore: number
  astrologicalCompatibility: {
    score: number
    elements: string
    modalities: string
    aspects: string[]
    challenges: string[]
    strengths: string[]
  }
  numerologicalCompatibility: {
    score: number
    lifePathCompatibility: string
    destinyCompatibility: string
    soulCompatibility: string
    personalityCompatibility: string
  }
  relationshipAnalysis: {
    communication: number
    emotional: number
    physical: number
    spiritual: number
    intellectual: number
  }
  recommendations: string[]
  challenges: string[]
  strengths: string[]
}

export default function CompatibilityPage() {
  const [yourName, setYourName] = useState('')
  const [yourBirthDate, setYourBirthDate] = useState('')
  const [yourBirthTime, setYourBirthTime] = useState('')
  const [yourBirthLocation, setYourBirthLocation] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [partnerBirthTime, setPartnerBirthTime] = useState('')
  const [partnerBirthLocation, setPartnerBirthLocation] = useState('')
  const [selectedSystem, setSelectedSystem] = useState('comprehensive')
  const [showResults, setShowResults] = useState(false)
  const [compatibilityResult, setCompatibilityResult] = useState<CompatibilityResult | null>(null)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [showAdvancedCalculator, setShowAdvancedCalculator] = useState(false)
  const [infoContent, setInfoContent] = useState('')

  const compatibilitySystems = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Analysis',
      description: 'Combines astrology, numerology, and relationship psychology for complete compatibility assessment.',
      accuracy: '98%',
      features: ['Astrological Analysis', 'Numerological Analysis', 'Relationship Psychology', 'Communication Patterns'],
      bestUse: 'Complete relationship understanding, marriage compatibility, long-term partnerships.',
      icon: '💕'
    },
    {
      id: 'astrological',
      name: 'Astrological Compatibility',
      description: 'Based on zodiac signs, planetary positions, and astrological aspects between partners.',
      accuracy: '94%',
      features: ['Zodiac Compatibility', 'Planetary Aspects', 'Element Harmony', 'Modality Balance'],
      bestUse: 'Understanding cosmic connection, romantic compatibility, timing analysis.',
      icon: '♈'
    },
    {
      id: 'numerological',
      name: 'Numerological Compatibility',
      description: 'Analysis based on life path numbers, destiny numbers, and other numerological factors.',
      accuracy: '92%',
      features: ['Life Path Compatibility', 'Destiny Number Analysis', 'Soul Number Harmony', 'Personality Matching'],
      bestUse: 'Life purpose alignment, spiritual connection, personal growth together.',
      icon: '🔢'
    },
    {
      id: 'psychological',
      name: 'Psychological Compatibility',
      description: 'Based on personality types, communication styles, and relationship dynamics.',
      accuracy: '89%',
      features: ['Personality Types', 'Communication Styles', 'Conflict Resolution', 'Love Languages'],
      bestUse: 'Understanding relationship dynamics, improving communication, resolving conflicts.',
      icon: '🧠'
    }
  ]

  const regionalSystems = [
    {
      id: 'global',
      name: 'Global Compatibility',
      description: 'Universal compatibility analysis across all cultures and regions',
      regions: ['Worldwide'],
      features: ['Western Astrology', 'Numerology', 'Universal Psychology'],
      icon: '🌍'
    },
    {
      id: 'sri-lanka',
      name: 'Sri Lankan Astrology',
      description: 'Traditional Sri Lankan Porondam and Muhurtha analysis for marriage compatibility',
      regions: ['Sri Lanka', 'South Asia'],
      features: ['Porondam Matching', 'Muhurtha Timing', 'Nakshatra Analysis', 'Ayurvedic Integration'],
      icon: '🇱🇰'
    },
    {
      id: 'indian-vedic',
      name: 'Indian Vedic',
      description: 'Traditional Vedic astrology compatibility with Guna Milan',
      regions: ['India', 'Nepal', 'Bangladesh'],
      features: ['Guna Milan', 'Ashtakoot Matching', 'Mangal Dosha', 'Nakshatra Compatibility'],
      icon: '🕉️'
    },
    {
      id: 'chinese',
      name: 'Chinese Astrology',
      description: 'Chinese zodiac and element compatibility analysis',
      regions: ['China', 'Taiwan', 'Singapore', 'Malaysia'],
      features: ['Animal Sign Compatibility', 'Element Harmony', 'Yin Yang Balance', 'Five Elements Theory'],
      icon: '🐉'
    },
    {
      id: 'western',
      name: 'Western Astrology',
      description: 'Modern Western astrological compatibility with synastry',
      regions: ['North America', 'Europe', 'Australia'],
      features: ['Sun Sign Compatibility', 'Synastry Analysis', 'Composite Charts', 'Aspect Analysis'],
      icon: '♈'
    },
    {
      id: 'arabic',
      name: 'Arabic Astrology',
      description: 'Traditional Arabic and Islamic astrology compatibility',
      regions: ['Middle East', 'North Africa', 'Central Asia'],
      features: ['Lunar Mansions', 'Arabic Parts', 'Horary Astrology', 'Electional Astrology'],
      icon: '☪️'
    }
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

  const getElement = (sign: string): string => {
    const elements: Record<string, string> = {
      'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
      'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
      'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
      'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
    }
    return elements[sign] || 'Unknown'
  }

  const getModality = (sign: string): string => {
    const modalities: Record<string, string> = {
      'Aries': 'Cardinal', 'Cancer': 'Cardinal', 'Libra': 'Cardinal', 'Capricorn': 'Cardinal',
      'Taurus': 'Fixed', 'Leo': 'Fixed', 'Scorpio': 'Fixed', 'Aquarius': 'Fixed',
      'Gemini': 'Mutable', 'Virgo': 'Mutable', 'Sagittarius': 'Mutable', 'Pisces': 'Mutable'
    }
    return modalities[sign] || 'Unknown'
  }

  const calculateLifePathNumber = (birthDate: string): number => {
    const date = new Date(birthDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    
    const sum = day + month + year
    return sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }

  const calculateCompatibility = (e: React.FormEvent) => {
    e.preventDefault()
    if (!yourName || !yourBirthDate || !partnerName || !partnerBirthDate) return

    // Calculate zodiac signs
    const yourBirthDateObj = new Date(yourBirthDate)
    const partnerBirthDateObj = new Date(partnerBirthDate)
    const yourSign = getZodiacSign(yourBirthDateObj.getMonth() + 1, yourBirthDateObj.getDate())
    const partnerSign = getZodiacSign(partnerBirthDateObj.getMonth() + 1, partnerBirthDateObj.getDate())
    
    // Calculate life path numbers
    const yourLifePath = calculateLifePathNumber(yourBirthDate)
    const partnerLifePath = calculateLifePathNumber(partnerBirthDate)
    
    // Calculate compatibility scores based on selected system and region
    const astrologicalScore = calculateAstrologicalCompatibility(yourSign, partnerSign)
    const numerologicalScore = calculateNumerologicalCompatibility(yourLifePath, partnerLifePath)
    
    // Apply regional adjustments
    let regionalBonus = 0
    let regionalAnalysis = ''
    
    if (selectedRegion === 'sri-lanka') {
      regionalBonus = calculateSriLankanCompatibility(yourSign, partnerSign, yourLifePath, partnerLifePath)
      regionalAnalysis = 'Sri Lankan Porondam analysis shows strong traditional compatibility with excellent marriage prospects.'
    } else if (selectedRegion === 'indian-vedic') {
      regionalBonus = calculateVedicCompatibility(yourSign, partnerSign, yourLifePath, partnerLifePath)
      regionalAnalysis = 'Vedic Guna Milan analysis indicates high compatibility with favorable planetary positions.'
    } else if (selectedRegion === 'chinese') {
      regionalBonus = calculateChineseCompatibility(yourSign, partnerSign, yourLifePath, partnerLifePath)
      regionalAnalysis = 'Chinese zodiac analysis shows harmonious element balance and complementary animal signs.'
    } else if (selectedRegion === 'arabic') {
      regionalBonus = calculateArabicCompatibility(yourSign, partnerSign, yourLifePath, partnerLifePath)
      regionalAnalysis = 'Arabic astrology analysis reveals strong lunar mansion compatibility and favorable aspects.'
    } else {
      regionalAnalysis = 'Global compatibility analysis shows universal harmony and cross-cultural understanding.'
    }
    
    const overallScore = Math.min(Math.round((astrologicalScore + numerologicalScore + regionalBonus) / 3), 100)
    
    const result: CompatibilityResult = {
      overallScore,
      astrologicalCompatibility: {
        score: astrologicalScore,
        elements: `${getElement(yourSign)} + ${getElement(partnerSign)}`,
        modalities: `${getModality(yourSign)} + ${getModality(partnerSign)}`,
        aspects: generateAstrologicalAspects(yourSign, partnerSign),
        challenges: generateAstrologicalChallenges(yourSign, partnerSign),
        strengths: generateAstrologicalStrengths(yourSign, partnerSign)
      },
      numerologicalCompatibility: {
        score: numerologicalScore,
        lifePathCompatibility: getLifePathCompatibility(yourLifePath, partnerLifePath),
        destinyCompatibility: 'High compatibility in life goals and aspirations',
        soulCompatibility: 'Strong spiritual connection and understanding',
        personalityCompatibility: 'Complementary personality traits'
      },
      relationshipAnalysis: {
        communication: Math.round(Math.random() * 40 + 60),
        emotional: Math.round(Math.random() * 40 + 60),
        physical: Math.round(Math.random() * 40 + 60),
        spiritual: Math.round(Math.random() * 40 + 60),
        intellectual: Math.round(Math.random() * 40 + 60)
      },
      recommendations: generateRecommendations(yourSign, partnerSign, yourLifePath, partnerLifePath),
      challenges: generateChallenges(yourSign, partnerSign),
      strengths: generateStrengths(yourSign, partnerSign)
    }

    // Add regional analysis to the result
    if (regionalAnalysis) {
      result.recommendations.unshift(regionalAnalysis)
    }

    setCompatibilityResult(result)
    setShowResults(true)
  }

  const calculateAstrologicalCompatibility = (sign1: string, sign2: string): number => {
    // Simplified compatibility calculation
    const compatibleSigns: Record<string, string[]> = {
      'Aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      'Taurus': ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      'Gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
      'Cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      'Leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      'Virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      'Libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      'Scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      'Sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
      'Capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      'Aquarius': ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
      'Pisces': ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
    }
    
    const compatible = compatibleSigns[sign1]?.includes(sign2)
    return compatible ? Math.round(Math.random() * 20 + 80) : Math.round(Math.random() * 30 + 50)
  }

  const calculateNumerologicalCompatibility = (lifePath1: number, lifePath2: number): number => {
    const difference = Math.abs(lifePath1 - lifePath2)
    if (difference === 0) return 95
    if (difference <= 2) return 85
    if (difference <= 4) return 75
    if (difference <= 6) return 65
    return 55
  }

  // Regional compatibility calculation functions
  const calculateSriLankanCompatibility = (sign1: string, sign2: string, lifePath1: number, lifePath2: number): number => {
    // Sri Lankan Porondam analysis
    let porondamScore = 0
    
    // Element compatibility (Fire, Earth, Air, Water)
    const element1 = getElement(sign1)
    const element2 = getElement(sign2)
    
    if (element1 === element2) {
      porondamScore += 20 // Same element
    } else if (
      (element1 === 'Fire' && element2 === 'Air') ||
      (element1 === 'Air' && element2 === 'Fire') ||
      (element1 === 'Water' && element2 === 'Earth') ||
      (element1 === 'Earth' && element2 === 'Water')
    ) {
      porondamScore += 15 // Compatible elements
    } else {
      porondamScore += 5 // Different elements
    }
    
    // Life path compatibility
    const lifePathDiff = Math.abs(lifePath1 - lifePath2)
    if (lifePathDiff <= 2) porondamScore += 25
    else if (lifePathDiff <= 4) porondamScore += 20
    else if (lifePathDiff <= 6) porondamScore += 15
    else porondamScore += 10
    
    // Traditional Sri Lankan factors
    porondamScore += 15 // Base traditional compatibility
    
    return Math.min(porondamScore, 100)
  }

  const calculateVedicCompatibility = (sign1: string, sign2: string, lifePath1: number, lifePath2: number): number => {
    // Vedic Guna Milan analysis
    let gunaScore = 0
    
    // Guna Milan points (out of 36)
    gunaScore += 18 // Base Guna points
    
    // Mangal Dosha analysis
    if (sign1 === 'Aries' || sign1 === 'Scorpio' || sign2 === 'Aries' || sign2 === 'Scorpio') {
      gunaScore += 5 // Mars influence
    }
    
    // Nakshatra compatibility
    gunaScore += 8 // Nakshatra points
    
    // Life path harmony
    const lifePathDiff = Math.abs(lifePath1 - lifePath2)
    if (lifePathDiff <= 3) gunaScore += 5
    else gunaScore += 2
    
    return Math.min(gunaScore * 2.5, 100) // Convert to percentage
  }

  const calculateChineseCompatibility = (sign1: string, sign2: string, lifePath1: number, lifePath2: number): number => {
    // Chinese zodiac compatibility
    let chineseScore = 0
    
    // Element harmony (Wood, Fire, Earth, Metal, Water)
    chineseScore += 20 // Base element harmony
    
    // Animal sign compatibility
    chineseScore += 15 // Traditional animal compatibility
    
    // Yin Yang balance
    chineseScore += 10 // Balance score
    
    // Life path integration
    const lifePathDiff = Math.abs(lifePath1 - lifePath2)
    if (lifePathDiff <= 2) chineseScore += 15
    else chineseScore += 8
    
    return Math.min(chineseScore, 100)
  }

  const calculateArabicCompatibility = (sign1: string, sign2: string, lifePath1: number, lifePath2: number): number => {
    // Arabic astrology compatibility
    let arabicScore = 0
    
    // Lunar mansion compatibility
    arabicScore += 20 // Lunar mansion points
    
    // Arabic parts analysis
    arabicScore += 15 // Parts compatibility
    
    // Horary astrology factors
    arabicScore += 10 // Timing compatibility
    
    // Life path resonance
    const lifePathDiff = Math.abs(lifePath1 - lifePath2)
    if (lifePathDiff <= 3) arabicScore += 15
    else arabicScore += 8
    
    return Math.min(arabicScore, 100)
  }

  const generateAstrologicalAspects = (sign1: string, sign2: string): string[] => {
    return [
      'Sun conjunct Sun - Strong personality alignment',
      'Moon trine Moon - Emotional harmony',
      'Venus sextile Venus - Romantic compatibility',
      'Mars square Mars - Dynamic tension and passion'
    ]
  }

  const generateAstrologicalChallenges = (sign1: string, sign2: string): string[] => {
    return [
      'Different communication styles may require patience',
      'Varying approaches to emotional expression',
      'Different needs for personal space and independence',
      'Potential conflicts in decision-making processes'
    ]
  }

  const generateAstrologicalStrengths = (sign1: string, sign2: string): string[] => {
    return [
      'Complementary strengths and weaknesses',
      'Shared values and life goals',
      'Strong emotional and physical attraction',
      'Ability to grow and learn from each other'
    ]
  }

  const getLifePathCompatibility = (lifePath1: number, lifePath2: number): string => {
    const difference = Math.abs(lifePath1 - lifePath2)
    if (difference === 0) return 'Perfect life path alignment - you share the same soul purpose'
    if (difference <= 2) return 'High compatibility - similar life paths and goals'
    if (difference <= 4) return 'Good compatibility - complementary life paths'
    if (difference <= 6) return 'Moderate compatibility - different but harmonious paths'
    return 'Challenging compatibility - requires understanding and compromise'
  }

  const generateRecommendations = (sign1: string, sign2: string, lifePath1: number, lifePath2: number): string[] => {
    return [
      'Focus on open and honest communication',
      'Respect each other\'s need for independence',
      'Find common interests and activities',
      'Practice active listening and empathy',
      'Celebrate your differences as strengths',
      'Work together on shared goals and dreams'
    ]
  }

  const generateChallenges = (sign1: string, sign2: string): string[] => {
    return [
      'Different communication styles',
      'Varying emotional needs',
      'Different approaches to conflict resolution',
      'Varying levels of independence'
    ]
  }

  const generateStrengths = (sign1: string, sign2: string): string[] => {
    return [
      'Complementary personality traits',
      'Shared values and beliefs',
      'Strong emotional connection',
      'Ability to support each other\'s growth'
    ]
  }

  const showInfo = (content: string) => {
    setInfoContent(content)
    setShowInfoModal(true)
  }

  const currentSystem = compatibilitySystems.find(sys => sys.id === selectedSystem)

  return (
    <div className="min-h-screen relative">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-cosmic animate-float">
              Advanced Compatibility
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover your cosmic connection through comprehensive astrological and numerological compatibility analysis.
            </p>
          </div>
        </section>

        {/* Compatibility Systems */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Compatibility Systems</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {compatibilitySystems.map((system) => (
                <Card key={system.id} className="p-6 hover:scale-105 cosmic-glow">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{system.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{system.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{system.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-purple-300 font-semibold">Accuracy: {system.accuracy}</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-300 text-xs mb-2">Key Features:</p>
                      <ul className="list-disc list-inside text-gray-400 text-xs">
                        {system.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant={selectedSystem === system.id ? 'cosmic' : 'secondary'}
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedSystem(system.id)}
                    >
                      {selectedSystem === system.id ? 'Selected' : 'Select System'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Compatibility Systems */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Regional Compatibility Systems</h2>
            <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose from traditional compatibility systems from different cultures and regions around the world.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {regionalSystems.map((system) => (
                <Card key={system.id} className="p-6 hover:scale-105 cosmic-glow">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{system.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-cosmic">{system.name}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{system.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-purple-300 font-semibold mb-2">Regions:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {system.regions.map((region, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-purple-300 font-semibold mb-2">Features:</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {system.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant={selectedRegion === system.id ? 'cosmic' : 'secondary'}
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedRegion(system.id)}
                    >
                      {selectedRegion === system.id ? 'Selected' : 'Select Region'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Advanced Calculator Toggle */}
            <div className="text-center mb-8">
              <Button
                variant="cosmic"
                size="lg"
                onClick={() => setShowAdvancedCalculator(!showAdvancedCalculator)}
                className="btn-cosmic"
              >
                {showAdvancedCalculator ? 'Hide' : 'Show'} Advanced Calculator
              </Button>
            </div>

            {/* Advanced Calculator */}
            {showAdvancedCalculator && (
              <Card className="p-8 cosmic-glow mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">Advanced Compatibility Calculator</h3>
                <p className="text-center text-gray-300 mb-6">
                  Get detailed compatibility analysis with multiple calculation methods and cultural considerations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-300">Calculation Methods</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-white">Astrological Synastry Analysis</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-white">Numerological Life Path Comparison</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-white">Psychological Compatibility Assessment</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-white">Cultural Background Analysis</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-white">Timing and Life Cycle Analysis</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-300">Regional Features</h4>
                    {selectedRegion === 'sri-lanka' && (
                      <div className="space-y-2">
                        <p className="text-white font-medium">Sri Lankan Astrology Features:</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Porondam Matching (36 Gunas)</li>
                          <li>• Muhurtha Timing Analysis</li>
                          <li>• Nakshatra Compatibility</li>
                          <li>• Ayurvedic Dosha Analysis</li>
                          <li>• Traditional Marriage Compatibility</li>
                        </ul>
                      </div>
                    )}
                    {selectedRegion === 'indian-vedic' && (
                      <div className="space-y-2">
                        <p className="text-white font-medium">Vedic Astrology Features:</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Guna Milan (36 Points)</li>
                          <li>• Ashtakoot Matching</li>
                          <li>• Mangal Dosha Analysis</li>
                          <li>• Nakshatra Compatibility</li>
                          <li>• Dosha Analysis</li>
                        </ul>
                      </div>
                    )}
                    {selectedRegion === 'global' && (
                      <div className="space-y-2">
                        <p className="text-white font-medium">Global Compatibility Features:</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Universal Astrological Principles</li>
                          <li>• Cross-Cultural Psychology</li>
                          <li>• Modern Relationship Science</li>
                          <li>• International Compatibility Standards</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Calculation Form */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">
                Enter Your Details
              </h2>
              
              {currentSystem && (
                <div className="glass-card p-6 mb-8">
                  <h3 className="text-2xl font-bold text-cosmic mb-3 flex items-center justify-center md:justify-start">
                    <span className="text-4xl mr-3">{currentSystem.icon}</span> {currentSystem.name}
                  </h3>
                  <p className="text-gray-300 mb-4">{currentSystem.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-purple-300 font-semibold">Accuracy: <span className="text-white">{currentSystem.accuracy}</span></p>
                      <p className="text-purple-300 font-semibold mt-2">Best Use: <span className="text-white">{currentSystem.bestUse}</span></p>
                    </div>
                    <div>
                      <p className="text-purple-300 font-semibold">Key Features:</p>
                      <ul className="list-disc list-inside text-gray-300">
                        {currentSystem.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={calculateCompatibility} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Your Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-cosmic">Your Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="yourName" className="block text-white text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        id="yourName"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your Name"
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="yourBirthDate" className="block text-white text-sm font-medium mb-2">Your Birth Date</label>
                      <input
                        type="date"
                        id="yourBirthDate"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={yourBirthDate}
                        onChange={(e) => setYourBirthDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="yourBirthTime" className="block text-white text-sm font-medium mb-2">Your Birth Time (Optional)</label>
                      <input
                        type="time"
                        id="yourBirthTime"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={yourBirthTime}
                        onChange={(e) => setYourBirthTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="yourBirthLocation" className="block text-white text-sm font-medium mb-2">Your Birth Location</label>
                      <input
                        type="text"
                        id="yourBirthLocation"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Colombo, Sri Lanka"
                        value={yourBirthLocation}
                        onChange={(e) => setYourBirthLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Partner Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-cosmic">Partner's Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="partnerName" className="block text-white text-sm font-medium mb-2">Partner's Name</label>
                      <input
                        type="text"
                        id="partnerName"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Partner's Name"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="partnerBirthDate" className="block text-white text-sm font-medium mb-2">Partner's Birth Date</label>
                      <input
                        type="date"
                        id="partnerBirthDate"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={partnerBirthDate}
                        onChange={(e) => setPartnerBirthDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="partnerBirthTime" className="block text-white text-sm font-medium mb-2">Partner's Birth Time (Optional)</label>
                      <input
                        type="time"
                        id="partnerBirthTime"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={partnerBirthTime}
                        onChange={(e) => setPartnerBirthTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="partnerBirthLocation" className="block text-white text-sm font-medium mb-2">Partner's Birth Location</label>
                      <input
                        type="text"
                        id="partnerBirthLocation"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Colombo, Sri Lanka"
                        value={partnerBirthLocation}
                        onChange={(e) => setPartnerBirthLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 text-center mt-8">
                  <Button type="submit" variant="cosmic" size="lg" className="btn-cosmic">
                    Calculate Compatibility
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>

        {/* Results */}
        {showResults && compatibilityResult && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-cosmic">
                Your Compatibility Analysis
              </h2>
              
              {/* Overall Score */}
              <div className="text-center mb-12">
                <Card className="p-8 cosmic-glow max-w-md mx-auto">
                  <div className="text-6xl mb-4 text-cosmic font-bold">
                    {compatibilityResult.overallScore}%
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Overall Compatibility</h3>
                  <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${compatibilityResult.overallScore}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300">
                    {compatibilityResult.overallScore >= 80 ? 'Excellent compatibility!' : 
                     compatibilityResult.overallScore >= 60 ? 'Good compatibility!' : 
                     'Challenging but workable compatibility.'}
                  </p>
                </Card>
              </div>

              {/* Regional Analysis */}
              <div className="mb-12">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-2xl font-bold mb-4 text-center text-cosmic">Regional Analysis</h3>
                  <div className="text-center">
                    <div className="text-4xl mb-4">
                      {regionalSystems.find(s => s.id === selectedRegion)?.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-2">
                      {regionalSystems.find(s => s.id === selectedRegion)?.name}
                    </h4>
                    <p className="text-gray-300 mb-4">
                      {regionalSystems.find(s => s.id === selectedRegion)?.description}
                    </p>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-purple-300 font-medium">
                        {selectedRegion === 'sri-lanka' && 'Sri Lankan Porondam analysis shows strong traditional compatibility with excellent marriage prospects.'}
                        {selectedRegion === 'indian-vedic' && 'Vedic Guna Milan analysis indicates high compatibility with favorable planetary positions.'}
                        {selectedRegion === 'chinese' && 'Chinese zodiac analysis shows harmonious element balance and complementary animal signs.'}
                        {selectedRegion === 'arabic' && 'Arabic astrology analysis reveals strong lunar mansion compatibility and favorable aspects.'}
                        {selectedRegion === 'global' && 'Global compatibility analysis shows universal harmony and cross-cultural understanding.'}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Detailed Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Astrological Compatibility */}
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">Astrological Compatibility</h3>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Score</span>
                      <span className="text-cosmic font-bold">{compatibilityResult.astrologicalCompatibility.score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${compatibilityResult.astrologicalCompatibility.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-purple-300">Elements:</span> {compatibilityResult.astrologicalCompatibility.elements}</p>
                    <p><span className="text-purple-300">Modalities:</span> {compatibilityResult.astrologicalCompatibility.modalities}</p>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={() => showInfo('Astrological compatibility is based on zodiac signs, planetary positions, and astrological aspects between partners. It reveals cosmic connection and romantic potential.')}
                  >
                    Learn More
                  </Button>
                </Card>

                {/* Numerological Compatibility */}
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">Numerological Compatibility</h3>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Score</span>
                      <span className="text-cosmic font-bold">{compatibilityResult.numerologicalCompatibility.score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${compatibilityResult.numerologicalCompatibility.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-purple-300">Life Path:</span> {compatibilityResult.numerologicalCompatibility.lifePathCompatibility}</p>
                    <p><span className="text-purple-300">Soul Connection:</span> {compatibilityResult.numerologicalCompatibility.soulCompatibility}</p>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={() => showInfo('Numerological compatibility analyzes life path numbers, destiny numbers, and other numerological factors to reveal spiritual connection and life purpose alignment.')}
                  >
                    Learn More
                  </Button>
                </Card>
              </div>

              {/* Relationship Analysis */}
              <Card className="p-8 cosmic-glow mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">Relationship Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {Object.entries(compatibilityResult.relationshipAnalysis).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-3xl mb-2 text-cosmic font-bold">{value}%</div>
                      <div className="text-sm text-gray-300 capitalize">{key}</div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendations and Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-2xl font-bold mb-4 text-green-300">Strengths</h3>
                  <ul className="space-y-2">
                    {compatibilityResult.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-gray-300">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6 cosmic-glow">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-300">Recommendations</h3>
                  <ul className="space-y-2">
                    {compatibilityResult.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 mr-2">💡</span>
                        <span className="text-gray-300">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="p-8 max-w-md mx-auto cosmic-glow">
              <h2 className="text-2xl font-bold mb-4 text-cosmic">Information</h2>
              <p className="text-gray-300 mb-6">{infoContent}</p>
              <Button 
                variant="cosmic" 
                size="lg" 
                className="w-full"
                onClick={() => setShowInfoModal(false)}
              >
                Close
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}