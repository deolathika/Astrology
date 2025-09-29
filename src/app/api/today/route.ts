import { NextRequest, NextResponse } from 'next/server'

// Cache for daily guidance to avoid recalculating
const dailyCache = new Map<string, any>()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')

    if (!profileId) {
      return NextResponse.json(
        { error: 'Profile ID is required' },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = `${profileId}-${new Date().toDateString()}`
    if (dailyCache.has(cacheKey)) {
      return NextResponse.json(dailyCache.get(cacheKey), {
        headers: {
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        }
      })
    }

    // TODO: Fetch profile data from database
    const userData = {
      fullName: 'John Doe',
      birthDate: '1990-01-01',
      birthTime: '12:00',
      birthPlace: 'New York, NY',
      latitude: 40.7128,
      longitude: -74.0060,
      timezone: 'America/New_York',
      zodiacSign: 'Capricorn',
      system: 'western'
    }

    // Calculate daily guidance
    const today = new Date()
    const dayOfWeek = today.getDay()
    const dayOfMonth = today.getDate()
    const month = today.getMonth() + 1

    // Numerology calculations
    const lifePath = calculateLifePath(userData.birthDate)
    const destiny = calculateDestiny(userData.fullName)
    const dailyNumber = calculateDailyNumber(today)

    // Astrology calculations
    const sunSign = getSunSign(userData.birthDate)
    const moonPhase = getMoonPhase(today)
    const planetaryHours = getPlanetaryHours(today, userData.latitude, userData.longitude)

    // Generate complete daily guidance
    const todayCard = generateTodayCard({
      lifePath,
      destiny,
      dailyNumber,
      sunSign,
      moonPhase,
      planetaryHours,
      dayOfWeek,
      dayOfMonth,
      month
    })

    const response = {
      success: true,
      data: {
        today_card: todayCard,
        share: {
          caption: generateShareCaption(todayCard.longText, sunSign),
          hashtags: ['#DailySecrets', '#CosmicGuidance', '#Astrology', '#Numerology']
        },
        meta: {
          source: 'online',
          generated_at: today.toISOString()
        }
      }
    }

    // Cache the response
    dailyCache.set(cacheKey, response)

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate daily guidance' },
      { status: 500 }
    )
  }
}

function calculateLifePath(birthDate: string): number {
  const date = new Date(birthDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  
  let sum = day + month + year
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  
  return sum
}

function calculateDestiny(fullName: string): number {
  const letterValues: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }
  
  const name = fullName.toUpperCase().replace(/[^A-Z]/g, '')
  let sum = 0
  
  for (const letter of name) {
    sum += letterValues[letter] || 0
  }
  
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  
  return sum
}

function calculateDailyNumber(date: Date): number {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  
  let sum = day + month + year
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  
  return sum
}

function getSunSign(birthDate: string): string {
  const date = new Date(birthDate)
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
    if ((month === sign.start[0] && day >= sign.start[1]) || 
        (month === sign.end[0] && day <= sign.end[1])) {
      return sign.name
    }
  }
  
  return 'Capricorn'
}

function getMoonPhase(date: Date): string {
  // Simplified moon phase calculation
  const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
                 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']
  const dayOfMonth = date.getDate()
  const phaseIndex = Math.floor((dayOfMonth % 8))
  return phases[phaseIndex]
}

function getPlanetaryHours(date: Date): string[] {
  // Simplified planetary hours
  const hours = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars']
  const dayOfWeek = date.getDay()
  const startIndex = dayOfWeek % 7
  return hours.slice(startIndex).concat(hours.slice(0, startIndex))
}

function generateDailyGuidance(data: any): string {
  const { lifePath, destiny, dailyNumber, sunSign, moonPhase, dayOfWeek } = data
  
  const guidanceTemplates = [
    `Today's cosmic energy aligns perfectly with your ${lifePath} Life Path number. The ${moonPhase} brings ${getMoonPhaseDescription(moonPhase)} energy to your ${sunSign} nature.`,
    `Your Destiny number ${destiny} is activated by today's ${dailyNumber} vibration. This creates a powerful opportunity for ${getOpportunityDescription(dailyNumber)}.`,
    `The ${getDayOfWeekName(dayOfWeek)} energy combined with your ${sunSign} sign creates a perfect storm for ${getActionDescription(sunSign, dayOfWeek)}.`,
    `Today's planetary alignment favors ${getFavorableAction(lifePath, destiny)}. Trust your intuition and follow the cosmic guidance.`
  ]
  
  return guidanceTemplates.join(' ')
}

function getMoonPhaseDescription(phase: string): string {
  const descriptions: { [key: string]: string } = {
    'New Moon': 'new beginnings and fresh starts',
    'Waxing Crescent': 'growth and intention setting',
    'First Quarter': 'action and decision making',
    'Waxing Gibbous': 'refinement and adjustment',
    'Full Moon': 'completion and manifestation',
    'Waning Gibbous': 'gratitude and sharing',
    'Last Quarter': 'release and letting go',
    'Waning Crescent': 'rest and reflection'
  }
  return descriptions[phase] || 'mystical and transformative'
}

function getOpportunityDescription(number: number): string {
  const opportunities: { [key: number]: string } = {
    1: 'leadership and new beginnings',
    2: 'cooperation and partnership',
    3: 'creativity and self-expression',
    4: 'stability and hard work',
    5: 'change and adventure',
    6: 'harmony and service',
    7: 'spiritual growth and introspection',
    8: 'material success and authority',
    9: 'completion and humanitarianism'
  }
  return opportunities[number] || 'personal growth and development'
}

function getActionDescription(sunSign: string, dayOfWeek: number): string {
  const actions: { [key: string]: string } = {
    'Aries': 'bold leadership and initiative',
    'Taurus': 'steady progress and material security',
    'Gemini': 'communication and learning',
    'Cancer': 'emotional connection and nurturing',
    'Leo': 'creative expression and recognition',
    'Virgo': 'service and attention to detail',
    'Libra': 'harmony and partnership',
    'Scorpio': 'transformation and deep insight',
    'Sagittarius': 'adventure and higher learning',
    'Capricorn': 'ambition and long-term planning',
    'Aquarius': 'innovation and humanitarianism',
    'Pisces': 'intuition and spiritual connection'
  }
  return actions[sunSign] || 'personal growth and development'
}

function getFavorableAction(lifePath: number, destiny: number): string {
  const actions = [
    'creative projects and artistic endeavors',
    'building relationships and partnerships',
    'learning new skills and expanding knowledge',
    'taking care of your physical and mental health',
    'exploring new opportunities and adventures',
    'helping others and community service',
    'spiritual practices and meditation',
    'building wealth and material security',
    'completing projects and tying up loose ends'
  ]
  
  const index = (lifePath + destiny) % actions.length
  return actions[index]
}

function generateLuckyNumbers(dailyNumber: number): number[] {
  const baseNumbers = [dailyNumber, dailyNumber + 1, dailyNumber + 2]
  return baseNumbers.map(num => num > 9 ? num - 9 : num)
}

function generateDayRules(dayOfWeek: number, sunSign: string): string[] {
  const rules = [
    'Start your day with meditation or mindfulness',
    'Wear colors that align with your zodiac sign',
    'Avoid making major decisions during Mercury retrograde',
    'Take time for self-care and relaxation',
    'Connect with nature and the elements',
    'Practice gratitude and positive thinking',
    'Trust your intuition and inner wisdom'
  ]
  
  return rules.slice(0, 3)
}

function generateMoodFix(moonPhase: string, sunSign: string): string {
  const moodFixes: { [key: string]: string } = {
    'New Moon': 'Set new intentions and plant seeds for the future',
    'Waxing Crescent': 'Take action on your goals and build momentum',
    'First Quarter': 'Make decisions and overcome obstacles',
    'Waxing Gibbous': 'Refine your approach and stay focused',
    'Full Moon': 'Celebrate achievements and release what no longer serves',
    'Waning Gibbous': 'Share your wisdom and help others',
    'Last Quarter': 'Let go of what no longer serves your highest good',
    'Waning Crescent': 'Rest, reflect, and prepare for the next cycle'
  }
  
  return moodFixes[moonPhase] || 'Trust the process and stay aligned with your purpose'
}

function generateShareCaption(guidance: string, sunSign: string): string {
  const captions = [
    `🌟 Today's cosmic guidance for ${sunSign} ✨`,
    `🔮 The stars have spoken! Here's what the universe wants you to know today`,
    `✨ Daily cosmic wisdom for my fellow ${sunSign} souls`,
    `🌙 The universe is aligning in your favor today, ${sunSign}!`,
    `⭐ Trust the cosmic guidance, beautiful ${sunSign} soul`
  ]
  
  const randomCaption = captions[Math.floor(Math.random() * captions.length)]
  return `${randomCaption}\n\n${guidance.substring(0, 200)}...\n\n#DailySecrets #CosmicGuidance #${sunSign} #Astrology #Numerology`
}

function getDayOfWeekName(dayOfWeek: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[dayOfWeek]
}

function generateTodayCard(data: any) {
  const { lifePath, destiny, dailyNumber, sunSign, moonPhase, planetaryHours, dayOfWeek, dayOfMonth, month } = data
  
  return {
    longText: generateLongText(data),
    lucky: {
      color: generateLuckyColor(dailyNumber),
      number: dailyNumber,
      object: generateLuckyObject(sunSign)
    },
    rules: {
      do: generateDoRules(dayOfWeek, sunSign),
      dont: generateDontRules(dayOfWeek, sunSign)
    },
    moodFix: generateMoodFixArray(moonPhase, sunSign)
  }
}

function generateLongText(data: any): string {
  const { lifePath, destiny, dailyNumber, sunSign, moonPhase } = data
  
  return `Today, the cosmic energies align in your favor as the stars weave a tapestry of opportunity and growth. Your Life Path number ${lifePath} resonates with the universal vibrations, guiding you toward your highest potential. The ${sunSign} energy in your chart brings forth new possibilities, while the ${moonPhase} illuminates your path forward. Trust in the ancient wisdom that flows through your veins, for you are a child of the cosmos, destined for greatness. The planetary influences today favor introspection and spiritual growth, while the numerological vibrations suggest a time of new beginnings and fresh perspectives. Embrace the cosmic flow and let your inner light shine brightly.`
}

function generateLuckyColor(): string {
  const colors = [
    'Cosmic Purple', 'Electric Blue', 'Stellar Gold', 'Nebula Pink', 'Celestial Silver'
  ]
  return colors[dailyNumber % colors.length]
}

function generateLuckyObject(): string {
  const objects = [
    'Crystal Sphere', 'Sacred Feather', 'Cosmic Compass', 'Stellar Amulet', 'Lunar Pendant'
  ]
  return objects[Math.floor(Math.random() * objects.length)]
}

function generateDoRules(): string[] {
  const doRules = [
    'Trust your intuition and follow your inner guidance',
    'Take time for meditation and spiritual reflection',
    'Express gratitude for the cosmic blessings in your life',
    'Connect with nature and the natural rhythms of the earth'
  ]
  return doRules
}

function generateDontRules(): string[] {
  const dontRules = [
    'Make hasty decisions without consulting your higher self',
    'Ignore the subtle signs and synchronicities around you',
    'Dismiss the wisdom of your dreams and inner visions',
    'Rush through important conversations or connections'
  ]
  return dontRules
}

function generateMoodFixArray(): string[] {
  return [
    'Take 5 deep breaths and center yourself',
    'Listen to calming music or nature sounds',
    'Write down three things you are grateful for',
    'Spend 10 minutes in meditation or quiet reflection'
  ]
}
