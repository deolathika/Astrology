import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, partnerBirthDate, partnerName } = body

    if (!userId || !partnerBirthDate) {
      return NextResponse.json(
        { error: 'User ID and partner birth date are required' },
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

    // Check daily usage limit for free users
    if (user.role === 'user') {
      const today = new Date()
      const startOfDay = new Date(today.setHours(0, 0, 0, 0))
      const endOfDay = new Date(today.setHours(23, 59, 59, 999))

      // Usage tracking temporarily disabled - no usageLog model
      // const usageCount = await prisma.usageLog.count({
      //   where: {
      //     userId: userId,
      //     feature: 'compatibility',
      //     createdAt: {
      //       gte: startOfDay,
      //       lte: endOfDay
      //     }
      //   }
      // })

      // if (usageCount >= 1) {
      //   return NextResponse.json(
      //     { 
      //       error: 'Daily limit reached',
      //       limit: 1,
      //       used: usageCount,
      //       resetTime: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
      //     },
      //     { status: 429 }
      //   )
      // }
    }

    // Get user's birth date from profile
    const userProfile = await prisma.profile.findFirst({
      where: { userId: userId }
    })

    if (!userProfile || !userProfile.birthDate) {
      return NextResponse.json(
        { error: 'User birth date not found. Please complete your profile first.' },
        { status: 400 }
      )
    }

    // Calculate compatibility
    const compatibilityData = calculateCompatibility(
      userProfile.birthDate.toISOString(),
      partnerBirthDate,
      userProfile.name || 'You',
      partnerName || 'Partner'
    )

    // Log usage for free users - temporarily disabled
    // if (user.role === 'user') {
    //   await prisma.usageLog.create({
    //     data: {
    //       userId: userId,
    //       feature: 'compatibility',
    //       metadata: { partnerBirthDate, partnerName }
    //     }
    //   })
    // }

    return NextResponse.json({
      success: true,
      data: compatibilityData,
      meta: {
        userRole: user.role,
        usageLimit: user.role === 'user' ? 1 : 'unlimited'
      }
    })
  } catch (error) {
    console.error('Compatibility calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate compatibility' },
      { status: 500 }
    )
  }
}

function calculateCompatibility(userBirthDate: string, partnerBirthDate: string, userName: string, partnerName: string) {
  const userSign = getSunSign(new Date(userBirthDate))
  const partnerSign = getSunSign(new Date(partnerBirthDate))
  
  const compatibilityScore = getCompatibilityScore(userSign, partnerSign)
  const relationshipType = getRelationshipType(userSign, partnerSign)
  const strengths = getRelationshipStrengths(userSign, partnerSign)
  const challenges = getRelationshipChallenges(userSign, partnerSign)
  const advice = getRelationshipAdvice(userSign, partnerSign)

  return {
    users: {
      user: {
        name: userName,
        sign: userSign,
        element: getElement(userSign),
        modality: getModality(userSign)
      },
      partner: {
        name: partnerName,
        sign: partnerSign,
        element: getElement(partnerSign),
        modality: getModality(partnerSign)
      }
    },
    compatibility: {
      score: compatibilityScore,
      percentage: Math.round(compatibilityScore * 100),
      level: getCompatibilityLevel(compatibilityScore),
      relationshipType: relationshipType
    },
    analysis: {
      strengths: strengths,
      challenges: challenges,
      advice: advice
    },
    elements: {
      userElement: getElement(userSign),
      partnerElement: getElement(partnerSign),
      elementCompatibility: getElementCompatibility(getElement(userSign), getElement(partnerSign))
    },
    modalities: {
      userModality: getModality(userSign),
      partnerModality: getModality(partnerSign),
      modalityCompatibility: getModalityCompatibility(getModality(userSign), getModality(partnerSign))
    }
  }
}

function getSunSign(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
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
  
  return 'Aries'
}

function getCompatibilityScore(sign1: string, sign2: string): number {
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    'Aries': { 'Aries': 0.8, 'Taurus': 0.4, 'Gemini': 0.7, 'Cancer': 0.3, 'Leo': 0.9, 'Virgo': 0.4, 'Libra': 0.6, 'Scorpio': 0.5, 'Sagittarius': 0.9, 'Capricorn': 0.3, 'Aquarius': 0.7, 'Pisces': 0.4 },
    'Taurus': { 'Aries': 0.4, 'Taurus': 0.8, 'Gemini': 0.3, 'Cancer': 0.7, 'Leo': 0.4, 'Virgo': 0.9, 'Libra': 0.8, 'Scorpio': 0.6, 'Sagittarius': 0.3, 'Capricorn': 0.9, 'Aquarius': 0.4, 'Pisces': 0.7 },
    'Gemini': { 'Aries': 0.7, 'Taurus': 0.3, 'Gemini': 0.8, 'Cancer': 0.4, 'Leo': 0.6, 'Virgo': 0.5, 'Libra': 0.9, 'Scorpio': 0.4, 'Sagittarius': 0.7, 'Capricorn': 0.3, 'Aquarius': 0.9, 'Pisces': 0.4 },
    'Cancer': { 'Aries': 0.3, 'Taurus': 0.7, 'Gemini': 0.4, 'Cancer': 0.8, 'Leo': 0.4, 'Virgo': 0.6, 'Libra': 0.5, 'Scorpio': 0.9, 'Sagittarius': 0.3, 'Capricorn': 0.6, 'Aquarius': 0.4, 'Pisces': 0.9 },
    'Leo': { 'Aries': 0.9, 'Taurus': 0.4, 'Gemini': 0.6, 'Cancer': 0.4, 'Leo': 0.8, 'Virgo': 0.3, 'Libra': 0.7, 'Scorpio': 0.5, 'Sagittarius': 0.9, 'Capricorn': 0.4, 'Aquarius': 0.6, 'Pisces': 0.4 },
    'Virgo': { 'Aries': 0.4, 'Taurus': 0.9, 'Gemini': 0.5, 'Cancer': 0.6, 'Leo': 0.3, 'Virgo': 0.8, 'Libra': 0.6, 'Scorpio': 0.7, 'Sagittarius': 0.4, 'Capricorn': 0.9, 'Aquarius': 0.5, 'Pisces': 0.6 },
    'Libra': { 'Aries': 0.6, 'Taurus': 0.8, 'Gemini': 0.9, 'Cancer': 0.5, 'Leo': 0.7, 'Virgo': 0.6, 'Libra': 0.8, 'Scorpio': 0.4, 'Sagittarius': 0.6, 'Capricorn': 0.5, 'Aquarius': 0.9, 'Pisces': 0.6 },
    'Scorpio': { 'Aries': 0.5, 'Taurus': 0.6, 'Gemini': 0.4, 'Cancer': 0.9, 'Leo': 0.5, 'Virgo': 0.7, 'Libra': 0.4, 'Scorpio': 0.8, 'Sagittarius': 0.4, 'Capricorn': 0.7, 'Aquarius': 0.4, 'Pisces': 0.9 },
    'Sagittarius': { 'Aries': 0.9, 'Taurus': 0.3, 'Gemini': 0.7, 'Cancer': 0.3, 'Leo': 0.9, 'Virgo': 0.4, 'Libra': 0.6, 'Scorpio': 0.4, 'Sagittarius': 0.8, 'Capricorn': 0.3, 'Aquarius': 0.7, 'Pisces': 0.4 },
    'Capricorn': { 'Aries': 0.3, 'Taurus': 0.9, 'Gemini': 0.3, 'Cancer': 0.6, 'Leo': 0.4, 'Virgo': 0.9, 'Libra': 0.5, 'Scorpio': 0.7, 'Sagittarius': 0.3, 'Capricorn': 0.8, 'Aquarius': 0.4, 'Pisces': 0.6 },
    'Aquarius': { 'Aries': 0.7, 'Taurus': 0.4, 'Gemini': 0.9, 'Cancer': 0.4, 'Leo': 0.6, 'Virgo': 0.5, 'Libra': 0.9, 'Scorpio': 0.4, 'Sagittarius': 0.7, 'Capricorn': 0.4, 'Aquarius': 0.8, 'Pisces': 0.5 },
    'Pisces': { 'Aries': 0.4, 'Taurus': 0.7, 'Gemini': 0.4, 'Cancer': 0.9, 'Leo': 0.4, 'Virgo': 0.6, 'Libra': 0.6, 'Scorpio': 0.9, 'Sagittarius': 0.4, 'Capricorn': 0.6, 'Aquarius': 0.5, 'Pisces': 0.8 }
  }
  
  return compatibilityMatrix[sign1]?.[sign2] || 0.5
}

function getCompatibilityLevel(score: number): string {
  if (score >= 0.8) return 'Excellent'
  if (score >= 0.6) return 'Good'
  if (score >= 0.4) return 'Moderate'
  return 'Challenging'
}

function getRelationshipType(sign1: string, sign2: string): string {
  const types: { [key: string]: { [key: string]: string } } = {
    'Aries': { 'Leo': 'Fire Power Couple', 'Sagittarius': 'Adventure Partners', 'Gemini': 'Dynamic Duo', 'Aquarius': 'Innovative Pair' },
    'Taurus': { 'Virgo': 'Earth Harmony', 'Capricorn': 'Stable Foundation', 'Cancer': 'Nurturing Bond', 'Pisces': 'Soul Connection' },
    'Gemini': { 'Libra': 'Air Partnership', 'Aquarius': 'Intellectual Match', 'Aries': 'Energetic Pair', 'Leo': 'Creative Union' },
    'Cancer': { 'Scorpio': 'Water Depth', 'Pisces': 'Emotional Bond', 'Taurus': 'Comfort Zone', 'Virgo': 'Caring Relationship' },
    'Leo': { 'Aries': 'Fire Power', 'Sagittarius': 'Royal Adventure', 'Gemini': 'Creative Spark', 'Libra': 'Elegant Union' },
    'Virgo': { 'Taurus': 'Earth Stability', 'Capricorn': 'Practical Partnership', 'Cancer': 'Nurturing Care', 'Scorpio': 'Deep Analysis' },
    'Libra': { 'Gemini': 'Air Harmony', 'Aquarius': 'Intellectual Bond', 'Leo': 'Elegant Partnership', 'Sagittarius': 'Balanced Adventure' },
    'Scorpio': { 'Cancer': 'Water Depth', 'Pisces': 'Soul Connection', 'Virgo': 'Intense Analysis', 'Capricorn': 'Powerful Union' },
    'Sagittarius': { 'Aries': 'Adventure Team', 'Leo': 'Royal Adventure', 'Libra': 'Balanced Exploration', 'Aquarius': 'Freedom Seekers' },
    'Capricorn': { 'Taurus': 'Earth Foundation', 'Virgo': 'Practical Partnership', 'Scorpio': 'Powerful Union', 'Pisces': 'Dream Realization' },
    'Aquarius': { 'Gemini': 'Air Innovation', 'Libra': 'Intellectual Harmony', 'Aries': 'Revolutionary Pair', 'Sagittarius': 'Freedom Alliance' },
    'Pisces': { 'Cancer': 'Water Emotion', 'Scorpio': 'Soul Depth', 'Taurus': 'Comfort Connection', 'Capricorn': 'Dream Foundation' }
  }
  
  return types[sign1]?.[sign2] || 'Unique Connection'
}

function getRelationshipStrengths(sign1: string, sign2: string): string[] {
  const strengths: { [key: string]: { [key: string]: string[] } } = {
    'Aries': { 'Leo': ['Shared passion', 'Mutual respect', 'Adventure spirit'], 'Sagittarius': ['Adventure', 'Optimism', 'Freedom'] },
    'Taurus': { 'Virgo': ['Stability', 'Practical approach', 'Shared values'], 'Capricorn': ['Ambition', 'Reliability', 'Long-term vision'] },
    'Gemini': { 'Libra': ['Communication', 'Intellectual connection', 'Social harmony'], 'Aquarius': ['Innovation', 'Independence', 'Intellectual bond'] },
    'Cancer': { 'Scorpio': ['Emotional depth', 'Intuition', 'Loyalty'], 'Pisces': ['Compassion', 'Spiritual connection', 'Empathy'] },
    'Leo': { 'Aries': ['Leadership', 'Confidence', 'Mutual admiration'], 'Sagittarius': ['Adventure', 'Optimism', 'Shared enthusiasm'] },
    'Virgo': { 'Taurus': ['Practicality', 'Stability', 'Shared goals'], 'Capricorn': ['Ambition', 'Discipline', 'Long-term planning'] },
    'Libra': { 'Gemini': ['Communication', 'Social harmony', 'Intellectual connection'], 'Aquarius': ['Innovation', 'Independence', 'Social justice'] },
    'Scorpio': { 'Cancer': ['Emotional depth', 'Intuition', 'Protective nature'], 'Pisces': ['Spiritual connection', 'Empathy', 'Deep understanding'] },
    'Sagittarius': { 'Aries': ['Adventure', 'Optimism', 'Shared enthusiasm'], 'Leo': ['Confidence', 'Adventure', 'Mutual respect'] },
    'Capricorn': { 'Taurus': ['Stability', 'Ambition', 'Shared values'], 'Virgo': ['Practicality', 'Discipline', 'Long-term vision'] },
    'Aquarius': { 'Gemini': ['Innovation', 'Independence', 'Intellectual connection'], 'Libra': ['Social harmony', 'Independence', 'Intellectual bond'] },
    'Pisces': { 'Cancer': ['Emotional connection', 'Intuition', 'Nurturing'], 'Scorpio': ['Spiritual depth', 'Empathy', 'Deep understanding'] }
  }
  
  return strengths[sign1]?.[sign2] || ['Unique connection', 'Mutual understanding', 'Special bond']
}

function getRelationshipChallenges(sign1: string, sign2: string): string[] {
  const challenges: { [key: string]: { [key: string]: string[] } } = {
    'Aries': { 'Cancer': ['Different emotional needs', 'Communication styles'], 'Capricorn': ['Different approaches to life', 'Patience levels'] },
    'Taurus': { 'Aquarius': ['Different values', 'Freedom vs security'], 'Sagittarius': ['Different life goals', 'Adventure vs stability'] },
    'Gemini': { 'Pisces': ['Different communication styles', 'Practical vs dreamy'], 'Scorpio': ['Surface vs depth', 'Trust issues'] },
    'Cancer': { 'Aries': ['Emotional vs impulsive', 'Security needs'], 'Sagittarius': ['Home vs adventure', 'Different life goals'] },
    'Leo': { 'Virgo': ['Drama vs practicality', 'Attention needs'], 'Aquarius': ['Individual vs group', 'Different social needs'] },
    'Virgo': { 'Sagittarius': ['Detail vs big picture', 'Different approaches'], 'Pisces': ['Practical vs dreamy', 'Different communication'] },
    'Libra': { 'Aries': ['Harmony vs conflict', 'Decision making'], 'Capricorn': ['Social vs serious', 'Different priorities'] },
    'Scorpio': { 'Gemini': ['Depth vs surface', 'Trust issues'], 'Sagittarius': ['Intensity vs freedom', 'Different life approaches'] },
    'Sagittarius': { 'Taurus': ['Adventure vs stability', 'Different values'], 'Virgo': ['Big picture vs details', 'Different approaches'] },
    'Capricorn': { 'Gemini': ['Serious vs playful', 'Different communication'], 'Leo': ['Work vs play', 'Different priorities'] },
    'Aquarius': { 'Taurus': ['Innovation vs tradition', 'Different values'], 'Scorpio': ['Detachment vs intensity', 'Different emotional needs'] },
    'Pisces': { 'Gemini': ['Dreamy vs practical', 'Different communication'], 'Virgo': ['Emotional vs analytical', 'Different approaches'] }
  }
  
  return challenges[sign1]?.[sign2] || ['Different perspectives', 'Communication styles', 'Life priorities']
}

function getRelationshipAdvice(sign1: string, sign2: string): string {
  const advice: { [key: string]: { [key: string]: string } } = {
    'Aries': { 'Leo': 'Support each other\'s ambitions and share adventures together.', 'Sagittarius': 'Embrace each other\'s need for freedom and adventure.' },
    'Taurus': { 'Virgo': 'Focus on shared practical goals and appreciate each other\'s reliability.', 'Capricorn': 'Build a strong foundation together and support each other\'s ambitions.' },
    'Gemini': { 'Libra': 'Communicate openly and enjoy social activities together.', 'Aquarius': 'Respect each other\'s independence while maintaining intellectual connection.' },
    'Cancer': { 'Scorpio': 'Create emotional security and trust in your relationship.', 'Pisces': 'Nurture each other\'s emotional needs and spiritual connection.' },
    'Leo': { 'Aries': 'Celebrate each other\'s achievements and share leadership roles.', 'Sagittarius': 'Plan adventures together and support each other\'s dreams.' },
    'Virgo': { 'Taurus': 'Focus on practical goals and appreciate each other\'s attention to detail.', 'Capricorn': 'Work together toward long-term goals and support each other\'s ambitions.' },
    'Libra': { 'Gemini': 'Enjoy intellectual conversations and social activities together.', 'Aquarius': 'Respect each other\'s independence while maintaining harmony.' },
    'Scorpio': { 'Cancer': 'Build deep emotional trust and create a secure foundation.', 'Pisces': 'Nurture your spiritual connection and emotional understanding.' },
    'Sagittarius': { 'Aries': 'Plan exciting adventures and support each other\'s independence.', 'Leo': 'Share your enthusiasm and celebrate each other\'s achievements.' },
    'Capricorn': { 'Taurus': 'Build a stable foundation and work toward shared goals.', 'Virgo': 'Focus on practical achievements and support each other\'s ambitions.' },
    'Aquarius': { 'Gemini': 'Enjoy intellectual discussions and respect each other\'s independence.', 'Libra': 'Maintain harmony while respecting each other\'s need for freedom.' },
    'Pisces': { 'Cancer': 'Create emotional security and nurture each other\'s feelings.', 'Scorpio': 'Build deep trust and spiritual connection together.' }
  }
  
  return advice[sign1]?.[sign2] || 'Focus on communication, understanding, and mutual respect in your relationship.'
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

function getElementCompatibility(element1: string, element2: string): string {
  const compatibility: { [key: string]: { [key: string]: string } } = {
    'Fire': { 'Fire': 'High energy, potential conflicts', 'Earth': 'Fire needs earth for grounding', 'Air': 'Air fuels fire', 'Water': 'Water can extinguish fire' },
    'Earth': { 'Fire': 'Earth provides stability for fire', 'Earth': 'Strong foundation together', 'Air': 'Earth can feel suffocated by air', 'Water': 'Water nourishes earth' },
    'Air': { 'Fire': 'Air fuels fire', 'Earth': 'Air can feel restricted by earth', 'Air': 'Intellectual connection', 'Water': 'Air and water can be refreshing' },
    'Water': { 'Fire': 'Water can extinguish fire', 'Earth': 'Water nourishes earth', 'Air': 'Water and air can be refreshing', 'Water': 'Deep emotional connection' }
  }
  
  return compatibility[element1]?.[element2] || 'Unique elemental combination'
}

function getModalityCompatibility(modality1: string, modality2: string): string {
  const compatibility: { [key: string]: { [key: string]: string } } = {
    'Cardinal': { 'Cardinal': 'Both like to initiate, potential conflicts', 'Fixed': 'Cardinal initiates, fixed maintains', 'Mutable': 'Cardinal initiates, mutable adapts' },
    'Fixed': { 'Cardinal': 'Fixed maintains, cardinal initiates', 'Fixed': 'Both like stability, potential stubbornness', 'Mutable': 'Fixed maintains, mutable adapts' },
    'Mutable': { 'Cardinal': 'Mutable adapts, cardinal initiates', 'Fixed': 'Mutable adapts, fixed maintains', 'Mutable': 'Both adaptable, potential lack of direction' }
  }
  
  return compatibility[modality1]?.[modality2] || 'Unique modality combination'
}
