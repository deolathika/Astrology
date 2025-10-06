'use client'

import React, { useState } from 'react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

interface NumerologyResult {
  lifePathNumber: number
  destinyNumber: number
  soulNumber: number
  personalityNumber: number
  maturityNumber: number
  personalYear: number
  personalMonth: number
  personalDay: number
  challengeNumbers: number[]
  pinnacleNumbers: number[]
  karmicDebtNumbers: number[]
  masterNumbers: number[]
}

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthLocation, setBirthLocation] = useState('')
  const [selectedSystem, setSelectedSystem] = useState('pythagorean')
  const [showResults, setShowResults] = useState(false)
  const [numerologyResult, setNumerologyResult] = useState<NumerologyResult | null>(null)

  const numerologySystems = [
    {
      id: 'pythagorean',
      name: 'Pythagorean Numerology',
      description: 'Based on the teachings of Pythagoras, assigns numbers 1-9 to letters A-Z.',
      accuracy: '94%',
      features: ['Life Path Number', 'Destiny Number', 'Soul Number', 'Personality Number'],
      bestUse: 'Personal growth, understanding life purpose, daily guidance.',
      icon: '🔢'
    },
    {
      id: 'chaldean',
      name: 'Chaldean Numerology',
      description: 'Ancient Babylonian system that uses different number assignments for letters.',
      accuracy: '96%',
      features: ['Karmic Numbers', 'Master Numbers', 'Challenge Numbers', 'Pinnacle Numbers'],
      bestUse: 'Karmic insights, spiritual development, past life connections.',
      icon: '🏛️'
    },
    {
      id: 'kabbalistic',
      name: 'Kabbalistic Numerology',
      description: 'Hebrew-based system focusing on spiritual and mystical aspects of numbers.',
      accuracy: '92%',
      features: ['Gematria', 'Tree of Life', 'Spiritual Path', 'Divine Numbers'],
      bestUse: 'Spiritual guidance, mystical insights, divine connection.',
      icon: '✡️'
    },
    {
      id: 'chinese',
      name: 'Chinese Numerology',
      description: 'Based on Chinese philosophy and the I Ching, focusing on balance and harmony.',
      accuracy: '89%',
      features: ['Five Elements', 'Yin Yang Balance', 'Lucky Numbers', 'Feng Shui Numbers'],
      bestUse: 'Harmony, balance, luck, and prosperity guidance.',
      icon: '🐉'
    }
  ]

  // Pythagorean letter-to-number mapping
  const pythagoreanMap: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }

  // Chaldean letter-to-number mapping
  const chaldeanMap: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5, 'I': 1,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 1, 'R': 2,
    'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5, 'Y': 1, 'Z': 7
  }

  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    }
    return num
  }

  const calculateLifePathNumber = (birthDate: string): number => {
    const date = new Date(birthDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    
    const sum = day + month + year
    return reduceToSingleDigit(sum)
  }

  const calculateDestinyNumber = (fullName: string, system: string): number => {
    const nameMap = system === 'pythagorean' ? pythagoreanMap : chaldeanMap
    let sum = 0
    
    for (const letter of fullName.toUpperCase()) {
      if (nameMap[letter]) {
        sum += nameMap[letter]
      }
    }
    
    return reduceToSingleDigit(sum)
  }

  const calculateSoulNumber = (fullName: string, system: string): number => {
    const nameMap = system === 'pythagorean' ? pythagoreanMap : chaldeanMap
    const vowels = ['A', 'E', 'I', 'O', 'U']
    let sum = 0
    
    for (const letter of fullName.toUpperCase()) {
      if (vowels.includes(letter) && nameMap[letter]) {
        sum += nameMap[letter]
      }
    }
    
    return reduceToSingleDigit(sum)
  }

  const calculatePersonalityNumber = (fullName: string, system: string): number => {
    const nameMap = system === 'pythagorean' ? pythagoreanMap : chaldeanMap
    const vowels = ['A', 'E', 'I', 'O', 'U']
    let sum = 0
    
    for (const letter of fullName.toUpperCase()) {
      if (!vowels.includes(letter) && nameMap[letter]) {
        sum += nameMap[letter]
      }
    }
    
    return reduceToSingleDigit(sum)
  }

  const calculatePersonalYear = (birthDate: string): number => {
    const date = new Date(birthDate)
    const currentYear = new Date().getFullYear()
    const day = date.getDate()
    const month = date.getMonth() + 1
    
    const sum = day + month + currentYear
    return reduceToSingleDigit(sum)
  }

  const calculatePersonalMonth = (birthDate: string): number => {
    const date = new Date(birthDate)
    const currentDate = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const currentMonth = currentDate.getMonth() + 1
    
    const sum = day + month + currentMonth
    return reduceToSingleDigit(sum)
  }

  const calculatePersonalDay = (birthDate: string): number => {
    const date = new Date(birthDate)
    const currentDate = new Date()
    const day = date.getDate()
    const currentDay = currentDate.getDate()
    
    const sum = day + currentDay
    return reduceToSingleDigit(sum)
  }

  const getNumberMeaning = (number: number): string => {
    const meanings: { [key: number]: string } = {
      1: 'The Leader - Independent, ambitious, and a natural-born leader with strong determination.',
      2: 'The Peacemaker - Harmonious, diplomatic, and intuitive. You excel at cooperation and mediation.',
      3: 'The Communicator - Creative, expressive, and optimistic. You have a gift for communication and creativity.',
      4: 'The Builder - Practical, disciplined, and stable. You are methodical and reliable in all endeavors.',
      5: 'The Adventurer - Freedom-loving, adaptable, and restless. You seek variety and new experiences.',
      6: 'The Nurturer - Responsible, caring, and community-oriented. You have a strong sense of duty and service.',
      7: 'The Seeker - Analytical, spiritual, and introspective. You are drawn to deeper meanings and mysteries.',
      8: 'The Powerhouse - Ambitious, successful, and authoritative. You have strong business and material instincts.',
      9: 'The Humanitarian - Compassionate, generous, and wise. You are here to serve humanity.',
      11: 'The Master Intuitive - Highly intuitive, inspiring, and visionary. You have exceptional spiritual insight.',
      22: 'The Master Builder - Practical idealist, powerful, and transformative. You can turn dreams into reality.',
      33: 'The Master Healer - Compassionate, selfless, and a universal healer. You are here to serve humanity at the highest level.'
    }
    return meanings[number] || 'A unique path awaits you.'
  }

  const getPersonalYearMeaning = (number: number): string => {
    const meanings: { [key: number]: string } = {
      1: 'New Beginnings - Time to start fresh projects and take initiative.',
      2: 'Cooperation - Focus on partnerships and collaboration.',
      3: 'Creativity - Express yourself through art, communication, and social activities.',
      4: 'Building - Work hard to establish solid foundations.',
      5: 'Change - Embrace freedom and new experiences.',
      6: 'Responsibility - Focus on family, home, and service to others.',
      7: 'Spirituality - Seek inner wisdom and spiritual growth.',
      8: 'Achievement - Focus on material success and recognition.',
      9: 'Completion - Finish projects and prepare for new cycles.'
    }
    return meanings[number] || 'A year of growth and development.'
  }

  const handleCalculateNumerology = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !birthDate) return

    const lifePathNumber = calculateLifePathNumber(birthDate)
    const destinyNumber = calculateDestinyNumber(fullName, selectedSystem)
    const soulNumber = calculateSoulNumber(fullName, selectedSystem)
    const personalityNumber = calculatePersonalityNumber(fullName, selectedSystem)
    const personalYear = calculatePersonalYear(birthDate)
    const personalMonth = calculatePersonalMonth(birthDate)
    const personalDay = calculatePersonalDay(birthDate)

    // Calculate maturity number (life path + destiny)
    const maturityNumber = reduceToSingleDigit(lifePathNumber + destinyNumber)

    // Calculate challenge numbers (simplified)
    const challengeNumbers = [
      reduceToSingleDigit(Math.abs(lifePathNumber - destinyNumber)),
      reduceToSingleDigit(Math.abs(soulNumber - personalityNumber))
    ]

    // Calculate pinnacle numbers (simplified)
    const pinnacleNumbers = [
      reduceToSingleDigit(lifePathNumber + destinyNumber),
      reduceToSingleDigit(soulNumber + personalityNumber)
    ]

    // Check for karmic debt numbers (13, 14, 16, 19)
    const karmicDebtNumbers = [13, 14, 16, 19].filter(num => 
      lifePathNumber === num || destinyNumber === num || soulNumber === num
    )

    // Check for master numbers
    const masterNumbers = [11, 22, 33].filter(num => 
      lifePathNumber === num || destinyNumber === num || soulNumber === num
    )

    const result: NumerologyResult = {
      lifePathNumber,
      destinyNumber,
      soulNumber,
      personalityNumber,
      maturityNumber,
      personalYear,
      personalMonth,
      personalDay,
      challengeNumbers,
      pinnacleNumbers,
      karmicDebtNumbers,
      masterNumbers
    }

    setNumerologyResult(result)
    setShowResults(true)
  }

  const currentSystem = numerologySystems.find(sys => sys.id === selectedSystem)

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
              Advanced Numerology
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Uncover the hidden meanings and influences of numbers in your life through ancient wisdom and modern insights.
            </p>
          </div>
        </section>

        {/* Numerology Systems */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Numerology Systems</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {numerologySystems.map((system) => (
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

        {/* Calculation Form */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">
                Calculate Your Numerology
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

              <form onSubmit={handleCalculateNumerology} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthDate" className="block text-white text-sm font-medium mb-2">Birth Date</label>
                  <input
                    type="date"
                    id="birthDate"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthTime" className="block text-white text-sm font-medium mb-2">Birth Time (Optional)</label>
                  <input
                    type="time"
                    id="birthTime"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="birthLocation" className="block text-white text-sm font-medium mb-2">Birth Location</label>
                  <input
                    type="text"
                    id="birthLocation"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., New York, USA"
                    value={birthLocation}
                    onChange={(e) => setBirthLocation(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 text-center mt-6">
                  <Button type="submit" variant="cosmic" size="lg" className="btn-cosmic">
                    Calculate My Numerology
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>

        {/* Results */}
        {showResults && numerologyResult && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-cosmic">
                Your Numerology Reading
              </h2>
              
              {/* Core Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-6xl mb-4 text-cosmic font-bold">
                    {numerologyResult.lifePathNumber}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Life Path Number</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {getNumberMeaning(numerologyResult.lifePathNumber)}
                  </p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-6xl mb-4 text-cosmic font-bold">
                    {numerologyResult.destinyNumber}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Destiny Number</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {getNumberMeaning(numerologyResult.destinyNumber)}
                  </p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-6xl mb-4 text-cosmic font-bold">
                    {numerologyResult.soulNumber}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Soul Number</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {getNumberMeaning(numerologyResult.soulNumber)}
                  </p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-6xl mb-4 text-cosmic font-bold">
                    {numerologyResult.personalityNumber}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Personality Number</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {getNumberMeaning(numerologyResult.personalityNumber)}
                  </p>
                </Card>
              </div>

              {/* Personal Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-6xl mb-4 text-cosmic font-bold">
                    {numerologyResult.personalYear}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Personal Year</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {getPersonalYearMeaning(numerologyResult.personalYear)}
                  </p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-6xl mb-4 text-cosmic font-bold">
                    {numerologyResult.personalMonth}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Personal Month</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Current month's energy and focus
                  </p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-6xl mb-4 text-cosmic font-bold">
                    {numerologyResult.personalDay}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Personal Day</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Today's numerological influence
                  </p>
                </Card>
              </div>

              {/* Special Numbers */}
              {(numerologyResult.masterNumbers.length > 0 || numerologyResult.karmicDebtNumbers.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {numerologyResult.masterNumbers.length > 0 && (
                    <Card className="p-6 cosmic-glow">
                      <h3 className="text-2xl font-bold mb-4 text-purple-300">Master Numbers</h3>
                      <div className="space-y-3">
                        {numerologyResult.masterNumbers.map((number, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-cosmic">{number}</span>
                            <span className="text-gray-300">{getNumberMeaning(number)}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {numerologyResult.karmicDebtNumbers.length > 0 && (
                    <Card className="p-6 cosmic-glow">
                      <h3 className="text-2xl font-bold mb-4 text-red-300">Karmic Debt Numbers</h3>
                      <div className="space-y-3">
                        {numerologyResult.karmicDebtNumbers.map((number, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-red-400">{number}</span>
                            <span className="text-gray-300">Lessons to learn from past lives</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {/* Detailed Analysis */}
              <Card className="p-8 cosmic-glow">
                <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">
                  Comprehensive Numerology Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-300">Core Numbers Analysis</h4>
                    <p className="text-gray-300 mb-4">
                      Your Life Path Number {numerologyResult.lifePathNumber} represents your soul's purpose and the lessons you're here to learn. 
                      Combined with your Destiny Number {numerologyResult.destinyNumber}, it shows your potential for achievement and success.
                    </p>
                    <p className="text-gray-300 mb-4">
                      Your Soul Number {numerologyResult.soulNumber} reveals your inner desires and what truly motivates you, 
                      while your Personality Number {numerologyResult.personalityNumber} shows how others perceive you.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-300">Current Influences</h4>
                    <p className="text-gray-300 mb-4">
                      This is Personal Year {numerologyResult.personalYear} for you, which means {getPersonalYearMeaning(numerologyResult.personalYear).toLowerCase()}
                    </p>
                    <p className="text-gray-300 mb-4">
                      Your Personal Month {numerologyResult.personalMonth} and Personal Day {numerologyResult.personalDay} 
                      provide additional insights into your current energy and focus areas.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Numerology Guide */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">
              Numerology Number Meanings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <Card key={number} className="p-6 cosmic-glow">
                  <div className="text-center">
                    <div className="text-4xl mb-4 text-cosmic font-bold">{number}</div>
                    <h3 className="text-lg font-semibold mb-3">Number {number}</h3>
                    <p className="text-gray-300 text-sm">{getNumberMeaning(number)}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}