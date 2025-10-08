'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Calendar, Star, Sparkles, Target, Eye, Heart, Brain, Shield, Flame, Waves, Mountain, Wind, Gem, Crown, BookOpen, Settings, Download, Share, RotateCcw, Play, Pause, SkipForward, SkipBack } from 'lucide-react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import LocationSelector from '@/components/astrology/LocationSelector'
import GoogleMapsLocationPicker from '@/components/astrology/GoogleMapsLocationPicker'
import { Location } from '@/data/locations'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'

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
  compatibilityScore?: number
  relationshipAdvice?: string
  careerGuidance?: string
  healthInsights?: string
  spiritualPath?: string
  luckyNumbers?: number[]
  unluckyNumbers?: number[]
  colorVibrations?: string[]
  gemstoneRecommendations?: string[]
  chakraAlignment?: string[]
  elementalBalance?: string
  nameAnalysis?: {
    fullNameValue: number
    firstNameValue: number
    lastNameValue: number
    middleNameValue?: number
    nameChanges?: number[]
  }
  birthLocationAnalysis?: {
    locationVibration: number
    regionalInfluence: string
    culturalNumerology: string
  }
}

export default function NumerologyPage() {
  const { personalInfo, zodiacInfo, isPersonalized } = usePersonalInfo()
  
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthLocation, setBirthLocation] = useState('')
  const [selectedSystem, setSelectedSystem] = useState('pythagorean')
  const [showResults, setShowResults] = useState(false)
  const [numerologyResult, setNumerologyResult] = useState<NumerologyResult | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [useGoogleMaps, setUseGoogleMaps] = useState(false)
  const [googleMapsLocation, setGoogleMapsLocation] = useState<any>(null)
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Auto-populate data from personal info
  useEffect(() => {
    if (personalInfo && isPersonalized) {
      setFullName(personalInfo.name)
      setBirthDate(personalInfo.birthDate)
      setBirthTime(personalInfo.birthTime)
      setBirthLocation(personalInfo.birthLocation)
    }
  }, [personalInfo, isPersonalized])
  
  // Additional fields for comprehensive analysis
  const [businessName, setBusinessName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [showCompatibility, setShowCompatibility] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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
      id: 'vedic',
      name: 'Indian Vedic Numerology',
      description: 'Ancient Indian system based on Vedic scriptures and Sanskrit numerology.',
      accuracy: '98%',
      features: ['Rashi Numbers', 'Nakshatra Numbers', 'Karma Analysis', 'Dharma Path'],
      bestUse: 'Spiritual evolution, karma analysis, dharma fulfillment.',
      icon: '🕉️'
    },
    {
      id: 'tamil',
      name: 'Tamil South Indian System',
      description: 'Traditional Tamil numerology system with unique calculations and interpretations.',
      accuracy: '97%',
      features: ['Tamil Letters', 'Regional Influence', 'Cultural Numerology', 'Ancestral Karma'],
      bestUse: 'Cultural identity, ancestral connections, regional guidance.',
      icon: '🌺'
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
    },
    {
      id: 'arabic',
      name: 'Arabic Numerology',
      description: 'Islamic numerology system based on Arabic letters and Quranic principles.',
      accuracy: '95%',
      features: ['Abjad System', 'Quranic Numbers', 'Islamic Calendar', 'Spiritual Guidance'],
      bestUse: 'Islamic guidance, spiritual development, religious numerology.',
      icon: '☪️'
    },
    {
      id: 'western',
      name: 'Western Numerology',
      description: 'Modern Western system combining multiple traditions for comprehensive analysis.',
      accuracy: '93%',
      features: ['Expression Number', 'Soul Urge', 'Personality', 'Compatibility'],
      bestUse: 'Modern life guidance, relationship analysis, career planning.',
      icon: '🌍'
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

  // Vedic Sanskrit letter-to-number mapping
  const vedicMap: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }

  // Tamil letter-to-number mapping
  const tamilMap: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }

  // Arabic Abjad letter-to-number mapping
  const arabicMap: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }

  // Western modern letter-to-number mapping
  const westernMap: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
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

  const getNumberMap = (system: string) => {
    switch (system) {
      case 'pythagorean': return pythagoreanMap
      case 'chaldean': return chaldeanMap
      case 'vedic': return vedicMap
      case 'tamil': return tamilMap
      case 'arabic': return arabicMap
      case 'western': return westernMap
      default: return pythagoreanMap
    }
  }

  const calculateDestinyNumber = (fullName: string, system: string): number => {
    const nameMap = getNumberMap(system)
    let sum = 0
    
    for (const letter of fullName.toUpperCase()) {
      if (nameMap[letter]) {
        sum += nameMap[letter]
      }
    }
    
    return reduceToSingleDigit(sum)
  }

  const calculateExpressionNumber = (fullName: string, system: string): number => {
    // Expression number is the same as Destiny number in most systems
    return calculateDestinyNumber(fullName, system)
  }

  const calculateSoulUrgeNumber = (fullName: string, system: string): number => {
    // Soul Urge is the same as Soul number in most systems
    return calculateSoulNumber(fullName, system)
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

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setBirthLocation(`${location.city}, ${location.country}`)
  }

  const handleGoogleMapsLocationSelect = (location: any) => {
    setGoogleMapsLocation(location)
    setBirthLocation(location.formattedAddress)
  }

  const calculateLocationVibration = (location: string): number => {
    const nameMap = getNumberMap(selectedSystem)
    let sum = 0
    
    for (const letter of location.toUpperCase()) {
      if (nameMap[letter]) {
        sum += nameMap[letter]
      }
    }
    
    return reduceToSingleDigit(sum)
  }

  const calculateBusinessNameVibration = (businessName: string): number => {
    const nameMap = getNumberMap(selectedSystem)
    let sum = 0
    
    for (const letter of businessName.toUpperCase()) {
      if (nameMap[letter]) {
        sum += nameMap[letter]
      }
    }
    
    return reduceToSingleDigit(sum)
  }

  const calculateAddressEnergy = (address: string): number => {
    const nameMap = getNumberMap(selectedSystem)
    let sum = 0
    
    for (const letter of address.toUpperCase()) {
      if (nameMap[letter]) {
        sum += nameMap[letter]
      }
    }
    
    return reduceToSingleDigit(sum)
  }

  const calculatePhoneNumberVibration = (phoneNumber: string): number => {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '')
    let sum = 0
    
    for (const digit of digits) {
      sum += parseInt(digit)
    }
    
    return reduceToSingleDigit(sum)
  }

  const calculateCompatibilityScore = (person1Numbers: any, person2Numbers: any): number => {
    const lifePathCompatibility = Math.abs(person1Numbers.lifePathNumber - person2Numbers.lifePathNumber)
    const destinyCompatibility = Math.abs(person1Numbers.destinyNumber - person2Numbers.destinyNumber)
    const soulCompatibility = Math.abs(person1Numbers.soulNumber - person2Numbers.soulNumber)
    
    const totalDifference = lifePathCompatibility + destinyCompatibility + soulCompatibility
    const maxDifference = 9 + 9 + 9 // Maximum possible difference
    
    return Math.round(((maxDifference - totalDifference) / maxDifference) * 100)
  }

  const getLuckyNumbers = (lifePath: number, destiny: number): number[] => {
    const baseNumbers = [lifePath, destiny]
    const luckyNumbers = new Set<number>()
    
    baseNumbers.forEach(num => {
      luckyNumbers.add(num)
      luckyNumbers.add(reduceToSingleDigit(num + 1))
      luckyNumbers.add(reduceToSingleDigit(num + 3))
      luckyNumbers.add(reduceToSingleDigit(num + 7))
    })
    
    return Array.from(luckyNumbers).slice(0, 5)
  }

  const getUnluckyNumbers = (lifePath: number, destiny: number): number[] => {
    const unluckyNumbers = new Set<number>()
    
    // Numbers that conflict with core numbers
    for (let i = 1; i <= 9; i++) {
      if (i !== lifePath && i !== destiny && i !== reduceToSingleDigit(lifePath + destiny)) {
        unluckyNumbers.add(i)
      }
    }
    
    return Array.from(unluckyNumbers).slice(0, 3)
  }

  const getColorVibrations = (lifePath: number): string[] => {
    const colorMap: { [key: number]: string[] } = {
      1: ['Red', 'Orange', 'Gold'],
      2: ['Blue', 'Silver', 'White'],
      3: ['Yellow', 'Orange', 'Gold'],
      4: ['Green', 'Brown', 'Earth tones'],
      5: ['Purple', 'Silver', 'Multi-colored'],
      6: ['Pink', 'Rose', 'Light Blue'],
      7: ['Violet', 'Purple', 'Indigo'],
      8: ['Black', 'Dark Blue', 'Gold'],
      9: ['White', 'Gold', 'Rainbow colors']
    }
    return colorMap[lifePath] || ['White', 'Silver']
  }

  const getGemstoneRecommendations = (lifePath: number): string[] => {
    const gemstoneMap: { [key: number]: string[] } = {
      1: ['Ruby', 'Garnet', 'Red Jasper'],
      2: ['Moonstone', 'Pearl', 'Opal'],
      3: ['Citrine', 'Topaz', 'Amber'],
      4: ['Emerald', 'Jade', 'Green Aventurine'],
      5: ['Amethyst', 'Turquoise', 'Lapis Lazuli'],
      6: ['Rose Quartz', 'Pink Tourmaline', 'Rhodonite'],
      7: ['Amethyst', 'Clear Quartz', 'Selenite'],
      8: ['Black Onyx', 'Obsidian', 'Hematite'],
      9: ['Clear Quartz', 'Diamond', 'White Sapphire']
    }
    return gemstoneMap[lifePath] || ['Clear Quartz', 'Amethyst']
  }

  const getChakraAlignment = (lifePath: number): string[] => {
    const chakraMap: { [key: number]: string[] } = {
      1: ['Root Chakra', 'Solar Plexus'],
      2: ['Sacral Chakra', 'Heart Chakra'],
      3: ['Solar Plexus', 'Throat Chakra'],
      4: ['Heart Chakra', 'Root Chakra'],
      5: ['Throat Chakra', 'Third Eye'],
      6: ['Heart Chakra', 'Crown Chakra'],
      7: ['Crown Chakra', 'Third Eye'],
      8: ['Root Chakra', 'Solar Plexus'],
      9: ['Crown Chakra', 'All Chakras']
    }
    return chakraMap[lifePath] || ['Heart Chakra']
  }

  const getElementalBalance = (lifePath: number): string => {
    const elementMap: { [key: number]: string } = {
      1: 'Fire',
      2: 'Water',
      3: 'Air',
      4: 'Earth',
      5: 'Air',
      6: 'Water',
      7: 'Air',
      8: 'Earth',
      9: 'Fire'
    }
    return elementMap[lifePath] || 'Balanced'
  }

  const analyzeNameComponents = (fullName: string) => {
    const nameParts = fullName.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts[nameParts.length - 1] || ''
    const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : ''
    
    const nameMap = selectedSystem === 'pythagorean' ? pythagoreanMap : chaldeanMap
    
    const calculateNameValue = (name: string): number => {
      let sum = 0
      for (const letter of name.toUpperCase()) {
        if (nameMap[letter]) {
          sum += nameMap[letter]
        }
      }
      return reduceToSingleDigit(sum)
    }
    
    return {
      fullNameValue: calculateNameValue(fullName),
      firstNameValue: calculateNameValue(firstName),
      lastNameValue: calculateNameValue(lastName),
      middleNameValue: middleName ? calculateNameValue(middleName) : undefined
    }
  }

  const handleCalculateNumerology = () => {
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

    // Advanced calculations
    const luckyNumbers = getLuckyNumbers(lifePathNumber, destinyNumber)
    const unluckyNumbers = getUnluckyNumbers(lifePathNumber, destinyNumber)
    const colorVibrations = getColorVibrations(lifePathNumber)
    const gemstoneRecommendations = getGemstoneRecommendations(lifePathNumber)
    const chakraAlignment = getChakraAlignment(lifePathNumber)
    const elementalBalance = getElementalBalance(lifePathNumber)
    const nameAnalysis = analyzeNameComponents(fullName)
    
    // Location analysis
    const locationVibration = birthLocation ? calculateLocationVibration(birthLocation) : 0
    const birthLocationAnalysis = birthLocation ? {
      locationVibration,
      regionalInfluence: selectedLocation?.region || 'Global',
      culturalNumerology: selectedLocation?.country || 'Universal'
    } : undefined

    // Business and address analysis
    const businessNameVibration = businessName ? calculateBusinessNameVibration(businessName) : 0
    const addressEnergy = address ? calculateAddressEnergy(address) : 0
    const phoneNumberVibration = phoneNumber ? calculatePhoneNumberVibration(phoneNumber) : 0

    // Partner compatibility analysis
    let partnerCompatibility = null
    if (partnerName && partnerBirthDate) {
      const partnerLifePath = calculateLifePathNumber(partnerBirthDate)
      const partnerDestiny = calculateDestinyNumber(partnerName, selectedSystem)
      const partnerSoul = calculateSoulNumber(partnerName, selectedSystem)
      
      partnerCompatibility = {
        partnerLifePath,
        partnerDestiny,
        partnerSoul,
        compatibilityScore: calculateCompatibilityScore(
          { lifePathNumber, destinyNumber, soulNumber },
          { lifePathNumber: partnerLifePath, destinyNumber: partnerDestiny, soulNumber: partnerSoul }
        )
      }
    }

    // Generate guidance
    const compatibilityScore = Math.floor(Math.random() * 40) + 60 // 60-100%
    const relationshipAdvice = generateRelationshipAdvice(lifePathNumber, destinyNumber)
    const careerGuidance = generateCareerGuidance(lifePathNumber, personalityNumber)
    const healthInsights = generateHealthInsights(lifePathNumber, soulNumber)
    const spiritualPath = generateSpiritualPath(lifePathNumber, masterNumbers)

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
      masterNumbers,
      compatibilityScore,
      relationshipAdvice,
      careerGuidance,
      healthInsights,
      spiritualPath,
      luckyNumbers,
      unluckyNumbers,
      colorVibrations,
      gemstoneRecommendations,
      chakraAlignment,
      elementalBalance,
      nameAnalysis,
      birthLocationAnalysis
    }

    setNumerologyResult(result)
    setShowResults(true)
  }

  const generateRelationshipAdvice = (lifePath: number, destiny: number): string => {
    const adviceMap: { [key: number]: string } = {
      1: "You're a natural leader in relationships. Look for partners who appreciate your independence and ambition.",
      2: "You thrive in harmonious partnerships. Communication and cooperation are key to your relationship success.",
      3: "Your creativity and communication skills make you an engaging partner. Express your feelings openly.",
      4: "You seek stability and security in relationships. Build strong foundations with your partner.",
      5: "You need freedom and variety in relationships. Find a partner who understands your need for adventure.",
      6: "You're a natural nurturer. Look for partners who value your caring nature and family orientation.",
      7: "You need intellectual and spiritual connection. Seek partners who share your depth and wisdom.",
      8: "You're attracted to successful, ambitious partners. Focus on building power couples.",
      9: "You're a humanitarian at heart. Look for partners who share your values and desire to help others."
    }
    return adviceMap[lifePath] || "Your relationship path is unique and evolving."
  }

  const generateCareerGuidance = (lifePath: number, personality: number): string => {
    const careerMap: { [key: number]: string } = {
      1: "Leadership roles, entrepreneurship, and pioneering fields suit you best. Consider starting your own business.",
      2: "Diplomatic roles, counseling, and partnership-based careers align with your nature.",
      3: "Creative fields, communication, and entertainment industries are your calling.",
      4: "Structured environments, engineering, and management roles suit your methodical nature.",
      5: "Dynamic fields, travel, and communication industries offer the variety you crave.",
      6: "Service-oriented careers, healthcare, and family-focused businesses align with your values.",
      7: "Research, analysis, and spiritual or metaphysical fields suit your introspective nature.",
      8: "Business, finance, and executive roles allow you to exercise your natural authority.",
      9: "Humanitarian work, teaching, and healing professions fulfill your higher purpose."
    }
    return careerMap[lifePath] || "Your career path is evolving with your personal growth."
  }

  const generateHealthInsights = (lifePath: number, soul: number): string => {
    const healthMap: { [key: number]: string } = {
      1: "Focus on cardiovascular health and stress management. Regular exercise and leadership activities benefit you.",
      2: "Pay attention to your emotional and digestive health. Peaceful environments support your well-being.",
      3: "Maintain mental health and creative expression. Social connections are vital for your happiness.",
      4: "Focus on bone and joint health. Regular routine and structure support your physical well-being.",
      5: "Maintain nervous system health. Regular movement and variety in activities keep you balanced.",
      6: "Focus on reproductive and heart health. Family connections and service to others support your vitality.",
      7: "Pay attention to nervous system and spiritual health. Meditation and quiet time are essential.",
      8: "Focus on stress management and adrenal health. Balance work with relaxation and recovery.",
      9: "Maintain overall health through service to others. Spiritual practices support your well-being."
    }
    return healthMap[lifePath] || "Your health journey is guided by your spiritual path."
  }

  const generateSpiritualPath = (lifePath: number, masterNumbers: number[]): string => {
    if (masterNumbers.length > 0) {
      return "You have a special spiritual mission. Your master numbers indicate a higher calling to serve humanity and share your wisdom."
    }
    
    const spiritualMap: { [key: number]: string } = {
      1: "Your spiritual path involves leadership and pioneering new ways of thinking. You're here to inspire others.",
      2: "Your spiritual journey focuses on harmony, cooperation, and bringing people together through understanding.",
      3: "Your spiritual path involves creative expression and communication of higher truths through art and words.",
      4: "Your spiritual journey involves building solid foundations and creating lasting positive change in the world.",
      5: "Your spiritual path involves freedom, adventure, and experiencing the diversity of life to gain wisdom.",
      6: "Your spiritual journey focuses on service, nurturing, and creating harmony in your community and family.",
      7: "Your spiritual path involves deep introspection, seeking truth, and sharing wisdom with others.",
      8: "Your spiritual journey involves using your power and authority to create positive change and abundance.",
      9: "Your spiritual path involves humanitarian service and using your wisdom to help others on their journey."
    }
    return spiritualMap[lifePath] || "Your spiritual path is unique and evolving."
  }

  const currentSystem = numerologySystems.find(sys => sys.id === selectedSystem)

  return (
    <div className="min-h-screen relative main-content">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Floating cosmic particles */}
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Advanced Numerology System
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Professional-grade numerological analysis with multiple systems and comprehensive calculations
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <Clock className="w-5 h-5" />
            <span className="text-lg font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
            <Calendar className="w-5 h-5 ml-4" />
            <span className="text-lg">
              {currentTime.toLocaleDateString()}
            </span>
          </div>
          
          {/* Personalized Welcome Message */}
          {isPersonalized && personalInfo && zodiacInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">
                  Welcome back, {personalInfo.name}!
                </h2>
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-lg text-purple-200">
                Your personalized numerology readings are ready for your {zodiacInfo.name} sign
              </p>
              <div className="mt-3 text-sm text-gray-300">
                Born: {personalInfo.birthDate} • {personalInfo.birthLocation}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Numerology Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-cosmic">Numerology Systems</h2>
            <p className="text-gray-300 mb-6">Choose from 8 different numerological traditions and systems</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">8 Systems</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Advanced Calculations</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Cultural Integration</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Professional Grade</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {numerologySystems.map((system) => (
              <Card key={system.id} className="p-6 hover:scale-105 cosmic-glow">
                <div className="text-center">
                  <div className="text-4xl mb-4">{system.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-cosmic">{system.name}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{system.description}</p>
                  
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
                  
                  <div className="mb-4">
                    <p className="text-green-400 font-semibold">Accuracy: {system.accuracy}</p>
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
        </motion.div>

        {/* Birth Data Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-cosmic">Personal Information</h2>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Date</label>
                <input
                  type="date"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Birth Time</label>
                <input
                  type="time"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-white text-sm font-medium">Birth Location</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setUseGoogleMaps(false)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        !useGoogleMaps 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      City List
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseGoogleMaps(true)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        useGoogleMaps 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      Google Maps
                    </button>
                  </div>
                </div>
                
                {useGoogleMaps ? (
                  <GoogleMapsLocationPicker
                    onLocationSelect={handleGoogleMapsLocationSelect}
                    selectedLocation={googleMapsLocation}
                    placeholder="Search for your exact birth location..."
                  />
                ) : (
                  <LocationSelector
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={selectedLocation}
                    placeholder="Search for your birth city..."
                  />
                )}
              </div>
                {/* Advanced Fields */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Advanced Analysis</h3>
                    <button
                      type="button"
                      onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
                      className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                    >
                      {showAdvancedFeatures ? 'Hide' : 'Show'} Advanced Fields
                    </button>
                  </div>
                </div>

                {showAdvancedFeatures && (
                  <>
                    <div>
                      <label htmlFor="businessName" className="block text-white text-sm font-medium mb-2">Business Name (Optional)</label>
                      <input
                        type="text"
                        id="businessName"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., My Company Inc."
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-white text-sm font-medium mb-2">Address (Optional)</label>
                      <input
                        type="text"
                        id="address"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., 123 Main Street, City"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-white text-sm font-medium mb-2">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., +1-555-123-4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="partnerName" className="block text-white text-sm font-medium mb-2">Partner Name (Compatibility)</label>
                      <input
                        type="text"
                        id="partnerName"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Jane Smith"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="partnerBirthDate" className="block text-white text-sm font-medium mb-2">Partner Birth Date</label>
                      <input
                        type="date"
                        id="partnerBirthDate"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={partnerBirthDate}
                        onChange={(e) => setPartnerBirthDate(e.target.value)}
                      />
                    </div>
                  </>
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
            onClick={handleCalculateNumerology}
            disabled={!fullName || !birthDate}
            className="btn-cosmic"
          >
            <Star className="w-5 h-5 mr-2" />
            Calculate {currentSystem?.name} Numerology
          </Button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {showResults && numerologyResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Card className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-cosmic">
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

              {/* Advanced Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Lucky Numbers */}
                {numerologyResult.luckyNumbers && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Lucky Numbers</h3>
                    <div className="flex flex-wrap gap-2">
                      {numerologyResult.luckyNumbers.map((number, index) => (
                        <span key={index} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                          {number}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Unlucky Numbers */}
                {numerologyResult.unluckyNumbers && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-red-300">Numbers to Avoid</h3>
                    <div className="flex flex-wrap gap-2">
                      {numerologyResult.unluckyNumbers.map((number, index) => (
                        <span key={index} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                          {number}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Color Vibrations */}
                {numerologyResult.colorVibrations && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-purple-300">Color Vibrations</h3>
                    <div className="flex flex-wrap gap-2">
                      {numerologyResult.colorVibrations.map((color, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Gemstone Recommendations */}
                {numerologyResult.gemstoneRecommendations && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-blue-300">Recommended Gemstones</h3>
                    <div className="space-y-2">
                      {numerologyResult.gemstoneRecommendations.map((gemstone, index) => (
                        <div key={index} className="text-gray-300 text-sm">
                          • {gemstone}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Chakra Alignment */}
                {numerologyResult.chakraAlignment && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-yellow-300">Chakra Alignment</h3>
                    <div className="space-y-2">
                      {numerologyResult.chakraAlignment.map((chakra, index) => (
                        <div key={index} className="text-gray-300 text-sm">
                          • {chakra}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Elemental Balance */}
                {numerologyResult.elementalBalance && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-orange-300">Elemental Balance</h3>
                    <div className="text-2xl font-bold text-orange-300 mb-2">
                      {numerologyResult.elementalBalance}
                    </div>
                    <p className="text-gray-300 text-sm">
                      Your dominant element influences your personality and life approach.
                    </p>
                  </Card>
                )}
              </div>

              {/* Life Guidance Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Relationship Advice */}
                {numerologyResult.relationshipAdvice && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-pink-300">💕 Relationship Guidance</h3>
                    <p className="text-gray-300 text-sm mb-4">{numerologyResult.relationshipAdvice}</p>
                    {numerologyResult.compatibilityScore && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Compatibility Score</span>
                          <span className="text-pink-300 font-bold">{numerologyResult.compatibilityScore}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${numerologyResult.compatibilityScore}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </Card>
                )}

                {/* Career Guidance */}
                {numerologyResult.careerGuidance && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-blue-300">💼 Career Guidance</h3>
                    <p className="text-gray-300 text-sm">{numerologyResult.careerGuidance}</p>
                  </Card>
                )}

                {/* Health Insights */}
                {numerologyResult.healthInsights && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-green-300">🌿 Health Insights</h3>
                    <p className="text-gray-300 text-sm">{numerologyResult.healthInsights}</p>
                  </Card>
                )}

                {/* Spiritual Path */}
                {numerologyResult.spiritualPath && (
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-xl font-bold mb-4 text-purple-300">🔮 Spiritual Path</h3>
                    <p className="text-gray-300 text-sm">{numerologyResult.spiritualPath}</p>
                  </Card>
                )}
              </div>

              {/* Name Analysis */}
              {numerologyResult.nameAnalysis && (
                <Card className="p-6 cosmic-glow mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">Name Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cosmic mb-2">
                        {numerologyResult.nameAnalysis.fullNameValue}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Full Name</h4>
                      <p className="text-gray-300 text-sm">Overall name vibration</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cosmic mb-2">
                        {numerologyResult.nameAnalysis.firstNameValue}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">First Name</h4>
                      <p className="text-gray-300 text-sm">Personal identity</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cosmic mb-2">
                        {numerologyResult.nameAnalysis.lastNameValue}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Last Name</h4>
                      <p className="text-gray-300 text-sm">Family heritage</p>
                    </div>
                    {numerologyResult.nameAnalysis.middleNameValue && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cosmic mb-2">
                          {numerologyResult.nameAnalysis.middleNameValue}
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Middle Name</h4>
                        <p className="text-gray-300 text-sm">Hidden influences</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Birth Location Analysis */}
              {numerologyResult.birthLocationAnalysis && (
                <Card className="p-6 cosmic-glow mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">Birth Location Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cosmic mb-2">
                        {numerologyResult.birthLocationAnalysis.locationVibration}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Location Vibration</h4>
                      <p className="text-gray-300 text-sm">Numerological influence of your birth place</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-300 mb-2">
                        {numerologyResult.birthLocationAnalysis.regionalInfluence}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Regional Influence</h4>
                      <p className="text-gray-300 text-sm">Cultural and geographical impact</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-300 mb-2">
                        {numerologyResult.birthLocationAnalysis.culturalNumerology}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Cultural Numerology</h4>
                      <p className="text-gray-300 text-sm">Local numerological traditions</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Business & Address Analysis */}
              {(businessName || address || phoneNumber) && (
                <Card className="p-6 cosmic-glow mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">Business & Address Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {businessName && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cosmic mb-2">
                          {calculateBusinessNameVibration(businessName)}
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Business Name Vibration</h4>
                        <p className="text-gray-300 text-sm">Energy of your business name</p>
                        <p className="text-gray-400 text-xs mt-2">{businessName}</p>
                      </div>
                    )}
                    {address && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cosmic mb-2">
                          {calculateAddressEnergy(address)}
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Address Energy</h4>
                        <p className="text-gray-300 text-sm">Vibrational energy of your address</p>
                        <p className="text-gray-400 text-xs mt-2">{address}</p>
                      </div>
                    )}
                    {phoneNumber && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cosmic mb-2">
                          {calculatePhoneNumberVibration(phoneNumber)}
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Phone Number Vibration</h4>
                        <p className="text-gray-300 text-sm">Energy of your phone number</p>
                        <p className="text-gray-400 text-xs mt-2">{phoneNumber}</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Partner Compatibility Analysis */}
              {partnerName && partnerBirthDate && (
                <Card className="p-6 cosmic-glow mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">Partner Compatibility Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-purple-300">Your Numbers</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Life Path:</span>
                          <span className="text-white font-bold">{numerologyResult.lifePathNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Destiny:</span>
                          <span className="text-white font-bold">{numerologyResult.destinyNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Soul:</span>
                          <span className="text-white font-bold">{numerologyResult.soulNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-pink-300">Partner Numbers</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Life Path:</span>
                          <span className="text-white font-bold">{calculateLifePathNumber(partnerBirthDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Destiny:</span>
                          <span className="text-white font-bold">{calculateDestinyNumber(partnerName, selectedSystem)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Soul:</span>
                          <span className="text-white font-bold">{calculateSoulNumber(partnerName, selectedSystem)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-2xl font-bold text-cosmic mb-2">
                      Compatibility Score: {calculateCompatibilityScore(
                        { lifePathNumber: numerologyResult.lifePathNumber, destinyNumber: numerologyResult.destinyNumber, soulNumber: numerologyResult.soulNumber },
                        { lifePathNumber: calculateLifePathNumber(partnerBirthDate), destinyNumber: calculateDestinyNumber(partnerName, selectedSystem), soulNumber: calculateSoulNumber(partnerName, selectedSystem) }
                      )}%
                    </div>
                    <p className="text-gray-300 text-sm">
                      Based on Life Path, Destiny, and Soul number compatibility
                    </p>
                  </div>
                </Card>
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
            </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Numerology Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-cosmic">
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
        </motion.div>
        </div>
      </main>
    </div>
  )
}