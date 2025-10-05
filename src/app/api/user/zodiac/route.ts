import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, birthDate, birthTime, latitude, longitude } = body

    if (!userId || !birthDate) {
      return NextResponse.json(
        { error: 'User ID and birth date are required' },
        { status: 400 }
      )
    }

    // Check user's daily usage
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // For now, we'll implement client-side rate limiting
    // In a production app, you'd want to implement proper server-side rate limiting

    // Calculate zodiac information
    const zodiacData = calculateZodiacInfo(birthDate, birthTime, latitude, longitude)

    // Client-side rate limiting will be handled by the frontend

    return NextResponse.json({
      success: true,
      data: zodiacData,
      meta: {
        userRole: user.role,
        usageLimit: user.role === 'user' ? 1 : 'unlimited'
      }
    })
  } catch (error) {
    console.error('Zodiac calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate zodiac information' },
      { status: 500 }
    )
  }
}

function calculateZodiacInfo(birthDate: string, birthTime?: string, latitude?: number, longitude?: number) {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // Calculate sun sign
  const sunSign = getSunSign(month, day)
  
  // Calculate moon sign (simplified)
  const moonSign = getMoonSign(month, day)
  
  // Calculate ascendant (simplified)
  const ascendant = getAscendant(month, day, birthTime)
  
  // Get element and modality
  const element = getElement(sunSign)
  const modality = getModality(sunSign)

  return {
    sunSign: {
      sign: sunSign,
      element: element,
      modality: modality,
      description: getSunSignDescription(sunSign),
      traits: getSunSignTraits(sunSign)
    },
    moonSign: {
      sign: moonSign,
      description: getMoonSignDescription(moonSign),
      traits: getMoonSignTraits(moonSign)
    },
    ascendant: {
      sign: ascendant,
      description: getAscendantDescription(ascendant),
      traits: getAscendantTraits(ascendant)
    },
    compatibility: {
      compatibleSigns: getCompatibleSigns(sunSign),
      challengingSigns: getChallengingSigns(sunSign)
    },
    dailyHoroscope: generateDailyHoroscope(sunSign),
    luckyNumbers: getLuckyNumbers(sunSign),
    luckyColors: getLuckyColors(sunSign)
  }
}

function getSunSign(month: number, day: number): string {
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
    if (sign.name === 'Capricorn') {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return sign.name
      }
    } else {
      const [startMonth, startDay] = sign.start
      const [endMonth, endDay] = sign.end
      
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign.name
      }
    }
  }
  
  return 'Aries' // Default fallback
}

function getMoonSign(month: number, day: number): string {
  // Simplified moon sign calculation
  const moonSigns = ['Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini']
  return moonSigns[(month + day) % 12]
}

function getAscendant(month: number, day: number, birthTime?: string): string {
  // Simplified ascendant calculation
  const ascendants = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  return ascendants[(month + day + (birthTime ? parseInt(birthTime.split(':')[0]) : 12)) % 12]
}

function getElement(sign: string): string {
  const elements: { [key: string]: string } = {
    'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
    'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
    'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
    'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
  }
  return elements[sign] || 'Fire'
}

function getModality(sign: string): string {
  const modalities: { [key: string]: string } = {
    'Aries': 'Cardinal', 'Cancer': 'Cardinal', 'Libra': 'Cardinal', 'Capricorn': 'Cardinal',
    'Taurus': 'Fixed', 'Leo': 'Fixed', 'Scorpio': 'Fixed', 'Aquarius': 'Fixed',
    'Gemini': 'Mutable', 'Virgo': 'Mutable', 'Sagittarius': 'Mutable', 'Pisces': 'Mutable'
  }
  return modalities[sign] || 'Cardinal'
}

function getSunSignDescription(sign: string): string {
  const descriptions: { [key: string]: string } = {
    'Aries': 'You are a natural leader with boundless energy and enthusiasm.',
    'Taurus': 'You are grounded, practical, and appreciate the finer things in life.',
    'Gemini': 'You are curious, communicative, and always seeking new experiences.',
    'Cancer': 'You are nurturing, intuitive, and deeply connected to your emotions.',
    'Leo': 'You are confident, creative, and love to be the center of attention.',
    'Virgo': 'You are analytical, detail-oriented, and always striving for perfection.',
    'Libra': 'You are diplomatic, charming, and seek harmony in all relationships.',
    'Scorpio': 'You are intense, mysterious, and have a deep understanding of life.',
    'Sagittarius': 'You are adventurous, philosophical, and always seeking the truth.',
    'Capricorn': 'You are ambitious, disciplined, and have a strong sense of responsibility.',
    'Aquarius': 'You are innovative, independent, and march to the beat of your own drum.',
    'Pisces': 'You are compassionate, artistic, and deeply connected to the spiritual realm.'
  }
  return descriptions[sign] || 'You are unique and special.'
}

function getSunSignTraits(sign: string): string[] {
  const traits: { [key: string]: string[] } = {
    'Aries': ['Bold', 'Energetic', 'Pioneering', 'Impulsive'],
    'Taurus': ['Stable', 'Patient', 'Reliable', 'Stubborn'],
    'Gemini': ['Curious', 'Adaptable', 'Witty', 'Restless'],
    'Cancer': ['Nurturing', 'Intuitive', 'Protective', 'Moody'],
    'Leo': ['Confident', 'Generous', 'Dramatic', 'Proud'],
    'Virgo': ['Analytical', 'Practical', 'Modest', 'Critical'],
    'Libra': ['Diplomatic', 'Charming', 'Fair', 'Indecisive'],
    'Scorpio': ['Intense', 'Passionate', 'Loyal', 'Secretive'],
    'Sagittarius': ['Adventurous', 'Optimistic', 'Honest', 'Impatient'],
    'Capricorn': ['Ambitious', 'Disciplined', 'Responsible', 'Pessimistic'],
    'Aquarius': ['Innovative', 'Independent', 'Humanitarian', 'Detached'],
    'Pisces': ['Compassionate', 'Artistic', 'Intuitive', 'Escapist']
  }
  return traits[sign] || ['Unique', 'Special', 'Individual']
}

function getMoonSignDescription(sign: string): string {
  return `Your moon sign in ${sign} influences your emotional nature and inner self.`
}

function getMoonSignTraits(sign: string): string[] {
  return ['Emotional', 'Intuitive', 'Sensitive', 'Nurturing']
}

function getAscendantDescription(sign: string): string {
  return `Your ascendant in ${sign} represents how others see you and your first impression.`
}

function getAscendantTraits(sign: string): string[] {
  return ['Outgoing', 'Charming', 'Confident', 'Approachable']
}

function getCompatibleSigns(sign: string): string[] {
  const compatibility: { [key: string]: string[] } = {
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
  return compatibility[sign] || []
}

function getChallengingSigns(sign: string): string[] {
  const challenges: { [key: string]: string[] } = {
    'Aries': ['Cancer', 'Capricorn'],
    'Taurus': ['Leo', 'Aquarius'],
    'Gemini': ['Virgo', 'Pisces'],
    'Cancer': ['Aries', 'Libra'],
    'Leo': ['Taurus', 'Scorpio'],
    'Virgo': ['Gemini', 'Sagittarius'],
    'Libra': ['Cancer', 'Capricorn'],
    'Scorpio': ['Leo', 'Aquarius'],
    'Sagittarius': ['Virgo', 'Pisces'],
    'Capricorn': ['Aries', 'Libra'],
    'Aquarius': ['Taurus', 'Scorpio'],
    'Pisces': ['Gemini', 'Sagittarius']
  }
  return challenges[sign] || []
}

function generateDailyHoroscope(sign: string): string {
  const horoscopes: { [key: string]: string } = {
    'Aries': 'Today brings new opportunities for leadership. Trust your instincts and take bold action.',
    'Taurus': 'Focus on stability and comfort today. Your practical approach will lead to success.',
    'Gemini': 'Communication is key today. Share your ideas and listen to others.',
    'Cancer': 'Your intuition is strong today. Trust your feelings and nurture those around you.',
    'Leo': 'Your creativity shines today. Express yourself and share your talents.',
    'Virgo': 'Pay attention to details today. Your analytical mind will solve problems.',
    'Libra': 'Seek harmony in relationships today. Your diplomatic skills are needed.',
    'Scorpio': 'Your intensity serves you well today. Dive deep into important matters.',
    'Sagittarius': 'Adventure calls today. Explore new possibilities and expand your horizons.',
    'Capricorn': 'Your ambition drives you today. Set goals and work steadily toward them.',
    'Aquarius': 'Innovation is your strength today. Think outside the box and be original.',
    'Pisces': 'Your compassion is needed today. Help others and trust your intuition.'
  }
  return horoscopes[sign] || 'Today is a day for growth and self-discovery.'
}

function getLuckyNumbers(sign: string): number[] {
  const numbers: { [key: string]: number[] } = {
    'Aries': [1, 8, 17, 26],
    'Taurus': [2, 6, 15, 24],
    'Gemini': [3, 12, 21, 30],
    'Cancer': [4, 13, 22, 31],
    'Leo': [5, 14, 23],
    'Virgo': [6, 15, 24],
    'Libra': [7, 16, 25],
    'Scorpio': [8, 17, 26],
    'Sagittarius': [9, 18, 27],
    'Capricorn': [10, 19, 28],
    'Aquarius': [11, 20, 29],
    'Pisces': [12, 21, 30]
  }
  return numbers[sign] || [7, 14, 21]
}

function getLuckyColors(sign: string): string[] {
  const colors: { [key: string]: string[] } = {
    'Aries': ['Red', 'Orange', 'Crimson'],
    'Taurus': ['Green', 'Pink', 'Earth tones'],
    'Gemini': ['Yellow', 'Silver', 'Light blue'],
    'Cancer': ['White', 'Silver', 'Sea green'],
    'Leo': ['Gold', 'Orange', 'Yellow'],
    'Virgo': ['Brown', 'Beige', 'Navy'],
    'Libra': ['Pink', 'Blue', 'Green'],
    'Scorpio': ['Black', 'Red', 'Maroon'],
    'Sagittarius': ['Purple', 'Blue', 'Turquoise'],
    'Capricorn': ['Black', 'Brown', 'Dark green'],
    'Aquarius': ['Blue', 'Silver', 'Electric blue'],
    'Pisces': ['Sea green', 'Aqua', 'Lavender']
  }
  return colors[sign] || ['Blue', 'Purple', 'Silver']
}
