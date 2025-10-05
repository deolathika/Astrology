import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, birthDate, system = 'pythagorean' } = body

    if (!fullName || !birthDate) {
      return NextResponse.json(
        { error: 'Full name and birth date are required' },
        { status: 400 }
      )
    }

    // Calculate numerology based on the system
    const numerologyData = calculateNumerology(fullName, birthDate, system)

    return NextResponse.json({
      success: true,
      data: numerologyData
    })

  } catch (error) {
    console.error('Numerology calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate numerology data' },
      { status: 500 }
    )
  }
}

function calculateNumerology(fullName: string, birthDate: string, system: string) {
  const name = fullName.toLowerCase().replace(/[^a-z]/g, '')
  const date = new Date(birthDate)
  
  // Calculate Life Path Number
  const lifePathNumber = calculateLifePath(date)
  
  // Calculate Expression Number
  const expressionNumber = calculateExpression(name, system)
  
  // Calculate Soul Urge Number
  const soulUrgeNumber = calculateSoulUrge(name, system)
  
  // Calculate Personality Number
  const personalityNumber = calculatePersonality(name, system)
  
  // Calculate Birthday Number
  const birthdayNumber = date.getDate()
  
  // Calculate Challenge Number
  const challengeNumber = calculateChallenge(date)

  return {
    lifePath: {
      number: lifePathNumber,
      description: getLifePathDescription(lifePathNumber),
      traits: getLifePathTraits(lifePathNumber),
      career: getLifePathCareer(lifePathNumber),
      relationships: getLifePathRelationships(lifePathNumber),
      challenges: getLifePathChallenges(lifePathNumber)
    },
    expression: {
      number: expressionNumber,
      description: getExpressionDescription(expressionNumber),
      traits: getExpressionTraits(expressionNumber),
      talents: getExpressionTalents(expressionNumber)
    },
    soulUrge: {
      number: soulUrgeNumber,
      description: getSoulUrgeDescription(soulUrgeNumber),
      traits: getSoulUrgeTraits(soulUrgeNumber),
      desires: getSoulUrgeDesires(soulUrgeNumber)
    },
    personality: {
      number: personalityNumber,
      description: getPersonalityDescription(personalityNumber),
      traits: getPersonalityTraits(personalityNumber),
      howOthersSeeYou: getPersonalityHowOthersSeeYou(personalityNumber)
    },
    birthday: {
      number: birthdayNumber,
      description: getBirthdayDescription(birthdayNumber),
      traits: getBirthdayTraits(birthdayNumber),
      talents: getBirthdayTalents(birthdayNumber)
    },
    challenge: {
      number: challengeNumber,
      description: getChallengeDescription(challengeNumber),
      lessons: getChallengeLessons(challengeNumber),
      opportunities: getChallengeOpportunities(challengeNumber)
    },
    system,
    calculatedAt: new Date().toISOString()
  }
}

function calculateLifePath(date: Date): number {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  
  let sum = day + month + year
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}

function calculateExpression(name: string, system: string): number {
  const letterValues = getLetterValues(system)
  let sum = 0
  
  for (const letter of name) {
    if (letterValues[letter]) {
      sum += letterValues[letter]
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}

function calculateSoulUrge(name: string, system: string): number {
  const vowels = name.match(/[aeiou]/g) || []
  const letterValues = getLetterValues(system)
  let sum = 0
  
  for (const vowel of vowels) {
    if (letterValues[vowel]) {
      sum += letterValues[vowel]
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}

function calculatePersonality(name: string, system: string): number {
  const consonants = name.match(/[bcdfghjklmnpqrstvwxyz]/g) || []
  const letterValues = getLetterValues(system)
  let sum = 0
  
  for (const consonant of consonants) {
    if (letterValues[consonant]) {
      sum += letterValues[consonant]
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}

function calculateChallenge(date: Date): number {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  
  const daySum = day > 9 ? Math.floor(day / 10) + (day % 10) : day
  const monthSum = month > 9 ? Math.floor(month / 10) + (month % 10) : month
  const yearSum = year > 9 ? Math.floor(year / 10) + (year % 10) : year
  
  return Math.abs(daySum - monthSum)
}

function getLetterValues(system: string): Record<string, number> {
  if (system === 'chaldean') {
    return {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 8, 'g': 3, 'h': 5,
      'i': 1, 'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 7, 'p': 8,
      'q': 1, 'r': 2, 's': 3, 't': 4, 'u': 6, 'v': 6, 'w': 6, 'x': 5,
      'y': 1, 'z': 7
    }
  } else { // Pythagorean
    return {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8,
      'i': 9, 'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7,
      'q': 8, 'r': 9, 's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6,
      'y': 7, 'z': 8
    }
  }
}

// Description and trait functions
function getLifePathDescription(number: number): string {
  const descriptions = {
    1: 'The Leader - Independent, pioneering, and ambitious',
    2: 'The Diplomat - Cooperative, intuitive, and supportive',
    3: 'The Creative - Expressive, optimistic, and artistic',
    4: 'The Builder - Practical, organized, and hardworking',
    5: 'The Adventurer - Freedom-loving, versatile, and curious',
    6: 'The Nurturer - Responsible, caring, and harmonious',
    7: 'The Seeker - Spiritual, analytical, and introspective',
    8: 'The Achiever - Ambitious, materialistic, and authoritative',
    9: 'The Humanitarian - Compassionate, wise, and universal'
  }
  return descriptions[number as keyof typeof descriptions] || 'Unknown path'
}

function getLifePathTraits(number: number): string[] {
  const traits = {
    1: ['Independent', 'Ambitious', 'Pioneering', 'Self-reliant', 'Determined'],
    2: ['Diplomatic', 'Supportive', 'Intuitive', 'Cooperative', 'Patient'],
    3: ['Creative', 'Optimistic', 'Expressive', 'Artistic', 'Enthusiastic'],
    4: ['Practical', 'Organized', 'Hardworking', 'Reliable', 'Methodical'],
    5: ['Adventurous', 'Versatile', 'Curious', 'Freedom-loving', 'Progressive'],
    6: ['Caring', 'Responsible', 'Harmonious', 'Nurturing', 'Protective'],
    7: ['Spiritual', 'Analytical', 'Introspective', 'Mysterious', 'Perfectionist'],
    8: ['Ambitious', 'Materialistic', 'Authoritative', 'Successful', 'Powerful'],
    9: ['Compassionate', 'Wise', 'Universal', 'Generous', 'Idealistic']
  }
  return traits[number as keyof typeof traits] || []
}

function getLifePathCareer(number: number): string[] {
  const careers = {
    1: ['Entrepreneur', 'Manager', 'Politician', 'Inventor', 'Leader'],
    2: ['Mediator', 'Counselor', 'Teacher', 'Artist', 'Healer'],
    3: ['Artist', 'Writer', 'Performer', 'Communicator', 'Designer'],
    4: ['Engineer', 'Accountant', 'Manager', 'Builder', 'Organizer'],
    5: ['Salesperson', 'Traveler', 'Reporter', 'Adventurer', 'Explorer'],
    6: ['Teacher', 'Counselor', 'Parent', 'Healer', 'Social Worker'],
    7: ['Scientist', 'Researcher', 'Philosopher', 'Mystic', 'Analyst'],
    8: ['Executive', 'Banker', 'Lawyer', 'Politician', 'Business Owner'],
    9: ['Humanitarian', 'Teacher', 'Healer', 'Artist', 'Philosopher']
  }
  return careers[number as keyof typeof careers] || []
}

function getLifePathRelationships(number: number): string[] {
  const relationships = {
    1: ['Independent', 'Direct', 'Ambitious', 'Loyal', 'Protective'],
    2: ['Supportive', 'Intuitive', 'Diplomatic', 'Caring', 'Sensitive'],
    3: ['Expressive', 'Fun-loving', 'Optimistic', 'Creative', 'Social'],
    4: ['Stable', 'Reliable', 'Practical', 'Loyal', 'Traditional'],
    5: ['Adventurous', 'Freedom-loving', 'Versatile', 'Curious', 'Progressive'],
    6: ['Nurturing', 'Responsible', 'Caring', 'Harmonious', 'Protective'],
    7: ['Mysterious', 'Spiritual', 'Analytical', 'Independent', 'Introspective'],
    8: ['Ambitious', 'Materialistic', 'Powerful', 'Successful', 'Authoritative'],
    9: ['Compassionate', 'Wise', 'Universal', 'Generous', 'Idealistic']
  }
  return relationships[number as keyof typeof relationships] || []
}

function getLifePathChallenges(number: number): string[] {
  const challenges = {
    1: ['Impatience', 'Stubbornness', 'Self-centeredness', 'Arrogance'],
    2: ['Indecisiveness', 'Over-sensitivity', 'Dependency', 'Passivity'],
    3: ['Scattered energy', 'Superficiality', 'Gossip', 'Moodiness'],
    4: ['Rigidity', 'Stubbornness', 'Overwork', 'Pessimism'],
    5: ['Restlessness', 'Irresponsibility', 'Impulsiveness', 'Addiction'],
    6: ['Over-protectiveness', 'Meddling', 'Martyrdom', 'Perfectionism'],
    7: ['Isolation', 'Perfectionism', 'Skepticism', 'Aloofness'],
    8: ['Materialism', 'Power struggles', 'Workaholism', 'Ruthlessness'],
    9: ['Idealism', 'Self-sacrifice', 'Disappointment', 'Martyrdom']
  }
  return challenges[number as keyof typeof challenges] || []
}

// Additional helper functions for other numbers
function getExpressionDescription(number: number): string {
  return `Expression Number ${number} - Your talents and abilities`
}

function getExpressionTraits(number: number): string[] {
  return getLifePathTraits(number)
}

function getExpressionTalents(number: number): string[] {
  return getLifePathCareer(number)
}

function getSoulUrgeDescription(number: number): string {
  return `Soul Urge Number ${number} - Your inner desires and motivations`
}

function getSoulUrgeTraits(number: number): string[] {
  return getLifePathTraits(number)
}

function getSoulUrgeDesires(number: number): string[] {
  return getLifePathTraits(number)
}

function getPersonalityDescription(number: number): string {
  return `Personality Number ${number} - How others perceive you`
}

function getPersonalityTraits(number: number): string[] {
  return getLifePathTraits(number)
}

function getPersonalityHowOthersSeeYou(number: number): string[] {
  return getLifePathTraits(number)
}

function getBirthdayDescription(number: number): string {
  return `Birthday Number ${number} - Your natural talents and abilities`
}

function getBirthdayTraits(number: number): string[] {
  return getLifePathTraits(number)
}

function getBirthdayTalents(number: number): string[] {
  return getLifePathCareer(number)
}

function getChallengeDescription(number: number): string {
  return `Challenge Number ${number} - Life lessons and obstacles to overcome`
}

function getChallengeLessons(number: number): string[] {
  return getLifePathChallenges(number)
}

function getChallengeOpportunities(number: number): string[] {
  return getLifePathTraits(number)
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Public Numerology API',
    endpoints: {
      POST: '/api/public/numerology - Calculate numerology',
      parameters: {
        fullName: 'Full birth name (required)',
        birthDate: 'YYYY-MM-DD (required)',
        system: 'pythagorean|chaldean (default: pythagorean)'
      }
    }
  })
}
