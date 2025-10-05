import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, fullName, birthDate } = body

    if (!userId || !fullName || !birthDate) {
      return NextResponse.json(
        { error: 'User ID, full name, and birth date are required' },
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

    // Calculate numerology
    const numerologyData = calculateNumerology(fullName, birthDate)

    // Client-side rate limiting will be handled by the frontend

    return NextResponse.json({
      success: true,
      data: numerologyData,
      meta: {
        userRole: user.role,
        usageLimit: user.role === 'user' ? 1 : 'unlimited'
      }
    })
  } catch (error) {
    console.error('Numerology calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate numerology' },
      { status: 500 }
    )
  }
}

function calculateNumerology(fullName: string, birthDate: string) {
  // Calculate Life Path Number
  const lifePath = calculateLifePath(birthDate)
  
  // Calculate Destiny Number
  const destiny = calculateDestiny(fullName)
  
  // Calculate Soul Urge Number
  const soulUrge = calculateSoulUrge(fullName)
  
  // Calculate Personality Number
  const personality = calculatePersonality(fullName)

  return {
    lifePath: {
      number: lifePath,
      meaning: getLifePathMeaning(lifePath)
    },
    destiny: {
      number: destiny,
      meaning: getDestinyMeaning(destiny)
    },
    soulUrge: {
      number: soulUrge,
      meaning: getSoulUrgeMeaning(soulUrge)
    },
    personality: {
      number: personality,
      meaning: getPersonalityMeaning(personality)
    },
    summary: {
      dominantNumber: Math.max(lifePath, destiny, soulUrge, personality),
      compatibility: getCompatibilityNumbers(lifePath, destiny),
      luckyNumbers: getLuckyNumbers(lifePath, destiny)
    }
  }
}

function calculateLifePath(birthDate: string) {
  const date = new Date(birthDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  
  let sum = day + month + year
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  
  return sum
}

function calculateDestiny(fullName: string) {
  const letterValues: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }
  
  let sum = 0
  for (const letter of fullName.toUpperCase()) {
    if (letterValues[letter]) {
      sum += letterValues[letter]
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  
  return sum
}

function calculateSoulUrge(fullName: string) {
  const vowelValues: { [key: string]: number } = {
    'A': 1, 'E': 5, 'I': 9, 'O': 6, 'U': 3
  }
  
  let sum = 0
  for (const letter of fullName.toUpperCase()) {
    if (vowelValues[letter]) {
      sum += vowelValues[letter]
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  
  return sum
}

function calculatePersonality(fullName: string) {
  const consonantValues: { [key: string]: number } = {
    'B': 2, 'C': 3, 'D': 4, 'F': 6, 'G': 7, 'H': 8, 'J': 1, 'K': 2, 'L': 3,
    'M': 4, 'N': 5, 'P': 7, 'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'V': 4, 'W': 5,
    'X': 6, 'Y': 7, 'Z': 8
  }
  
  let sum = 0
  for (const letter of fullName.toUpperCase()) {
    if (consonantValues[letter]) {
      sum += consonantValues[letter]
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  
  return sum
}

function getLifePathMeaning(number: number): string {
  const meanings: { [key: number]: string } = {
    1: 'You are a natural leader with strong independence and determination.',
    2: 'You are diplomatic, cooperative, and excel in partnerships.',
    3: 'You are creative, expressive, and bring joy to others.',
    4: 'You are practical, organized, and build solid foundations.',
    5: 'You are adventurous, freedom-loving, and embrace change.',
    6: 'You are nurturing, responsible, and focused on family and community.',
    7: 'You are spiritual, analytical, and seek deeper understanding.',
    8: 'You are ambitious, material-focused, and excel in business.',
    9: 'You are humanitarian, compassionate, and serve others.',
    11: 'You are intuitive, inspirational, and a natural teacher.',
    22: 'You are a master builder who can manifest dreams into reality.',
    33: 'You are a master teacher who uplifts and heals others.'
  }
  return meanings[number] || 'Your life path is unique and special.'
}

function getDestinyMeaning(number: number): string {
  const meanings: { [key: number]: string } = {
    1: 'Your destiny is to lead and inspire others through your actions.',
    2: 'Your destiny is to bring harmony and cooperation to the world.',
    3: 'Your destiny is to express creativity and bring joy to others.',
    4: 'Your destiny is to build and organize systems that benefit others.',
    5: 'Your destiny is to explore and share new experiences with others.',
    6: 'Your destiny is to nurture and care for others in your community.',
    7: 'Your destiny is to seek and share spiritual wisdom.',
    8: 'Your destiny is to achieve material success and help others do the same.',
    9: 'Your destiny is to serve humanity and make the world a better place.',
    11: 'Your destiny is to inspire others through your spiritual insights.',
    22: 'Your destiny is to build something great that benefits many people.',
    33: 'Your destiny is to heal and uplift others through your compassion.'
  }
  return meanings[number] || 'Your destiny is to fulfill your unique purpose.'
}

function getSoulUrgeMeaning(number: number): string {
  const meanings: { [key: number]: string } = {
    1: 'You desire independence, leadership, and being first.',
    2: 'You desire harmony, partnership, and peaceful relationships.',
    3: 'You desire self-expression, creativity, and social interaction.',
    4: 'You desire stability, security, and a solid foundation.',
    5: 'You desire freedom, adventure, and new experiences.',
    6: 'You desire to nurture, care for others, and create harmony.',
    7: 'You desire spiritual growth, knowledge, and inner peace.',
    8: 'You desire material success, power, and recognition.',
    9: 'You desire to serve others and make a positive impact.',
    11: 'You desire to inspire others and share spiritual insights.',
    22: 'You desire to build something significant and lasting.',
    33: 'You desire to heal and uplift others through your compassion.'
  }
  return meanings[number] || 'Your soul desires to fulfill its unique purpose.'
}

function getPersonalityMeaning(number: number): string {
  const meanings: { [key: number]: string } = {
    1: 'Others see you as confident, independent, and a natural leader.',
    2: 'Others see you as diplomatic, cooperative, and a peacemaker.',
    3: 'Others see you as creative, expressive, and full of joy.',
    4: 'Others see you as reliable, organized, and hardworking.',
    5: 'Others see you as adventurous, freedom-loving, and dynamic.',
    6: 'Others see you as nurturing, responsible, and caring.',
    7: 'Others see you as wise, spiritual, and mysterious.',
    8: 'Others see you as ambitious, successful, and powerful.',
    9: 'Others see you as compassionate, humanitarian, and wise.',
    11: 'Others see you as intuitive, inspirational, and enlightened.',
    22: 'Others see you as a master builder and visionary.',
    33: 'Others see you as a master teacher and healer.'
  }
  return meanings[number] || 'Others see you as unique and special.'
}

function getCompatibilityNumbers(lifePath: number, destiny: number): number[] {
  const compatibleNumbers = [lifePath, destiny]
  if (lifePath !== destiny) {
    compatibleNumbers.push(Math.abs(lifePath - destiny))
  }
  return compatibleNumbers
}

function getLuckyNumbers(lifePath: number, destiny: number): number[] {
  return [lifePath, destiny, lifePath + destiny, Math.abs(lifePath - destiny)].filter(n => n > 0)
}
