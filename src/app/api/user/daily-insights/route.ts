/**
 * User Daily Insights API
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Provides personalized daily insights for authenticated users
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const userRole = session.user.role

    // Get user profile for personalized insights
    const profile = await prisma.profile.findUnique({
      where: { userId }
    })

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'User profile not found' },
        { status: 404 }
      )
    }

    // Get personalized daily insights based on user role
    const insights = await getPersonalizedInsights(profile, userRole)

    return NextResponse.json({
      success: true,
      data: insights
    })
  } catch (error) {
    console.error('Error fetching user daily insights:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch daily insights' },
      { status: 500 }
    )
  }
}

async function getPersonalizedInsights(profile: any, userRole: string) {
  const today = new Date()
  const birthDate = new Date(profile.birthDate)
  
  // Calculate age and life stage
  const age = today.getFullYear() - birthDate.getFullYear()
  const lifeStage = getLifeStage(age)
  
  // Get zodiac sign
  const zodiacSign = getZodiacSign(birthDate)
  
  // Get numerology numbers
  const numerology = getNumerologyProfile(profile.name, birthDate)
  
  // Get personalized insights based on role
  const insights = {
    date: today.toISOString().split('T')[0],
    user: {
      name: profile.name,
      zodiacSign,
      lifeStage,
      numerology
    },
    astrology: getPersonalizedAstrology(zodiacSign, birthDate, today),
    numerology: getPersonalizedNumerology(numerology, today),
    guidance: getPersonalizedGuidance(zodiacSign, numerology, lifeStage),
    luckyNumbers: getLuckyNumbers(birthDate, today),
    luckyColors: getLuckyColors(zodiacSign),
    cosmicEnergy: getCosmicEnergy(today),
    moonPhase: getMoonPhase(today),
    planetaryHour: getPlanetaryHour(today),
    transits: getPlanetaryTransits(birthDate, today),
    compatibility: getDailyCompatibility(zodiacSign, today)
  }

  // Add premium features for premium users
  if (userRole === 'premium' || userRole === 'admin') {
    (insights as any).premium = {
      dreamAnalysis: getDreamAnalysis(today),
      aiInsights: getAIInsights(profile, today),
      detailedTransits: getDetailedTransits(birthDate, today),
      relationshipGuidance: getRelationshipGuidance(zodiacSign, today),
      careerInsights: getCareerInsights(zodiacSign, numerology, today),
      healthGuidance: getHealthGuidance(zodiacSign, today)
    }
  }

  return insights
}

function getLifeStage(age: number): string {
  if (age < 18) return 'Youth'
  if (age < 30) return 'Young Adult'
  if (age < 50) return 'Adult'
  if (age < 65) return 'Middle Age'
  return 'Elder'
}

function getZodiacSign(birthDate: Date): string {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()
  
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
  
  return 'Unknown'
}

function getNumerologyProfile(name: string, birthDate: Date): any {
  const lifePath = calculateLifePath(birthDate)
  const destiny = calculateDestiny(name)
  const soulUrge = calculateSoulUrge(name)
  
  return {
    lifePath,
    destiny,
    soulUrge,
    personality: calculatePersonality(name),
    birthday: calculateBirthday(birthDate)
  }
}

function calculateLifePath(birthDate: Date): number {
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()
  
  let sum = day + month + year
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}

function calculateDestiny(name: string): number {
  const letterValues: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }
  
  let sum = 0
  for (const letter of name.toUpperCase()) {
    if (letterValues[letter]) {
      sum += letterValues[letter]
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}

function calculateSoulUrge(name: string): number {
  const vowels = 'AEIOU'
  let sum = 0
  
  for (const letter of name.toUpperCase()) {
    if (vowels.includes(letter)) {
      sum += getLetterValue(letter)
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}

function calculatePersonality(name: string): number {
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
  let sum = 0
  
  for (const letter of name.toUpperCase()) {
    if (consonants.includes(letter)) {
      sum += getLetterValue(letter)
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}

function calculateBirthday(birthDate: Date): number {
  const day = birthDate.getDate()
  
  while (day > 9 && day !== 11 && day !== 22 && day !== 33) {
    return Math.floor(day / 10) + (day % 10)
  }
  
  return day
}

function getLetterValue(letter: string): number {
  const values: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }
  
  return values[letter] || 0
}

function getPersonalizedAstrology(zodiacSign: string, birthDate: Date, today: Date): string {
  const insights = {
    'Aries': 'Your fiery energy is amplified today, bringing courage and initiative to all your endeavors.',
    'Taurus': 'Your grounded nature provides stability and strength as you pursue your goals today.',
    'Gemini': 'Your communicative abilities are enhanced, making this an excellent day for networking.',
    'Cancer': 'Your intuitive nature is heightened, guiding you toward emotional fulfillment.',
    'Leo': 'Your natural leadership qualities shine brightly, inspiring others around you.',
    'Virgo': 'Your analytical mind helps you solve complex problems with ease today.',
    'Libra': 'Your diplomatic nature brings harmony to relationships and situations.',
    'Scorpio': 'Your transformative energy helps you overcome obstacles and grow stronger.',
    'Sagittarius': 'Your adventurous spirit opens new doors of opportunity and learning.',
    'Capricorn': 'Your ambitious nature drives you toward achieving your long-term goals.',
    'Aquarius': 'Your innovative thinking brings fresh perspectives to old problems.',
    'Pisces': 'Your compassionate nature helps you connect deeply with others today.'
  }
  
  return insights[zodiacSign as keyof typeof insights] || 'The stars align in your favor today.'
}

function getPersonalizedNumerology(numerology: any, today: Date): string {
  const lifePathInsights = {
    1: 'Your leadership qualities are highlighted today. Take initiative and inspire others.',
    2: 'Your cooperative nature brings harmony to relationships and teamwork.',
    3: 'Your creative expression is amplified today. Share your artistic talents.',
    4: 'Your practical approach helps you build solid foundations for future success.',
    5: 'Your adventurous spirit opens new doors of opportunity and growth.',
    6: 'Your nurturing nature brings comfort and support to those around you.',
    7: 'Your spiritual depth provides wisdom and insight for your journey.',
    8: 'Your material success is supported by the cosmic energies today.',
    9: 'Your humanitarian nature inspires positive change in your community.'
  }
  
  return lifePathInsights[numerology.lifePath as keyof typeof lifePathInsights] || 'Your numerology reveals unique patterns for personal growth.'
}

function getPersonalizedGuidance(zodiacSign: string, numerology: any, lifeStage: string): string {
  const guidance = `As a ${zodiacSign} in your ${lifeStage} phase, your Life Path ${numerology.lifePath} energy guides you toward fulfilling your soul's purpose. Today's cosmic energies support your natural gifts and help you overcome any challenges that arise. Trust your intuition and follow your heart's calling.`
  
  return guidance
}

function getLuckyNumbers(birthDate: Date, today: Date): number[] {
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()
  const todayDay = today.getDate()
  
  return [day, month, year, todayDay, day + month]
}

function getLuckyColors(zodiacSign: string): string[] {
  const colors = {
    'Aries': ['Red', 'Orange', 'Gold'],
    'Taurus': ['Green', 'Pink', 'Brown'],
    'Gemini': ['Yellow', 'Silver', 'Blue'],
    'Cancer': ['White', 'Silver', 'Pearl'],
    'Leo': ['Gold', 'Orange', 'Yellow'],
    'Virgo': ['Brown', 'Beige', 'Green'],
    'Libra': ['Pink', 'Blue', 'Green'],
    'Scorpio': ['Red', 'Black', 'Maroon'],
    'Sagittarius': ['Purple', 'Blue', 'Gold'],
    'Capricorn': ['Black', 'Brown', 'Dark Green'],
    'Aquarius': ['Blue', 'Silver', 'Electric Blue'],
    'Pisces': ['Sea Green', 'Aqua', 'Silver']
  }
  
  return colors[zodiacSign as keyof typeof colors] || ['Gold', 'Silver', 'Blue']
}

function getCosmicEnergy(today: Date): string {
  const dayOfMonth = today.getDate()
  const energyLevels = ['Low', 'Medium', 'High', 'Very High']
  const index = dayOfMonth % energyLevels.length
  return energyLevels[index]
}

function getMoonPhase(date: Date): string {
  const moonPhases = [
    "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
  ]
  
  const dayOfMonth = date.getDate()
  const phaseIndex = Math.floor(dayOfMonth / 4) % moonPhases.length
  return moonPhases[phaseIndex]
}

function getPlanetaryHour(date: Date): string {
  const hours = [
    "Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"
  ]
  
  const dayOfWeek = date.getDay()
  const hour = date.getHours()
  const hourIndex = (dayOfWeek + hour) % hours.length
  return hours[hourIndex]
}

function getPlanetaryTransits(birthDate: Date, today: Date): any {
  return {
    sun: 'Favorable for personal growth and self-expression',
    moon: 'Emotional intuition is heightened',
    mercury: 'Communication and learning are emphasized',
    venus: 'Relationships and creativity are highlighted',
    mars: 'Energy and motivation are strong',
    jupiter: 'Expansion and opportunity are present',
    saturn: 'Discipline and structure are important'
  }
}

function getDailyCompatibility(zodiacSign: string, today: Date): any {
  const compatibleSigns = {
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
  
  return {
    compatibleSigns: compatibleSigns[zodiacSign as keyof typeof compatibleSigns] || [],
    energy: 'High compatibility with water and earth signs today',
    advice: 'Focus on relationships with compatible signs for best results'
  }
}

// Premium features
function getDreamAnalysis(today: Date): string {
  return "Your dreams today reveal important messages about your subconscious desires and fears. Pay attention to recurring symbols and emotions."
}

function getAIInsights(profile: any, today: Date): string {
  return `Based on your cosmic profile, AI analysis suggests focusing on ${profile.systemPref || 'western'} astrology principles today for maximum benefit.`
}

function getDetailedTransits(birthDate: Date, today: Date): any {
  return {
    sun: { aspect: 'Trine', influence: 'Positive energy for personal growth' },
    moon: { aspect: 'Sextile', influence: 'Emotional harmony and intuition' },
    mercury: { aspect: 'Conjunction', influence: 'Clear communication and mental clarity' }
  }
}

function getRelationshipGuidance(zodiacSign: string, today: Date): string {
  return `Your ${zodiacSign} energy enhances your relationships today. Focus on communication and understanding with your partner.`
}

function getCareerInsights(zodiacSign: string, numerology: any, today: Date): string {
  return `Your career path is supported by today's cosmic energies. Your Life Path ${numerology.lifePath} energy brings success in your professional endeavors.`
}

function getHealthGuidance(zodiacSign: string, today: Date): string {
  return `Your ${zodiacSign} energy supports your physical and mental well-being today. Focus on activities that align with your natural energy.`
}
