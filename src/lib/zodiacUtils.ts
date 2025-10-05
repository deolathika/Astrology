/**
 * Zodiac Detection Utilities
 * Auto-detect zodiac signs based on birth date
 */

export type ZodiacSign = 
  | 'aries' | 'taurus' | 'gemini' | 'cancer' 
  | 'leo' | 'virgo' | 'libra' | 'scorpio' 
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

export interface ZodiacInfo {
  sign: ZodiacSign
  name: string
  symbol: string
  element: 'fire' | 'earth' | 'air' | 'water'
  dates: string
  description: string
}

export const zodiacSigns: Record<ZodiacSign, ZodiacInfo> = {
  aries: {
    sign: 'aries',
    name: 'Aries',
    symbol: '♈',
    element: 'fire',
    dates: 'March 21 - April 19',
    description: 'The Ram - Bold, energetic, and natural leaders'
  },
  taurus: {
    sign: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    element: 'earth',
    dates: 'April 20 - May 20',
    description: 'The Bull - Reliable, practical, and determined'
  },
  gemini: {
    sign: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    element: 'air',
    dates: 'May 21 - June 20',
    description: 'The Twins - Curious, adaptable, and communicative'
  },
  cancer: {
    sign: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    element: 'water',
    dates: 'June 21 - July 22',
    description: 'The Crab - Intuitive, protective, and emotional'
  },
  leo: {
    sign: 'leo',
    name: 'Leo',
    symbol: '♌',
    element: 'fire',
    dates: 'July 23 - August 22',
    description: 'The Lion - Confident, creative, and generous'
  },
  virgo: {
    sign: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    element: 'earth',
    dates: 'August 23 - September 22',
    description: 'The Virgin - Analytical, practical, and helpful'
  },
  libra: {
    sign: 'libra',
    name: 'Libra',
    symbol: '♎',
    element: 'air',
    dates: 'September 23 - October 22',
    description: 'The Scales - Diplomatic, fair, and social'
  },
  scorpio: {
    sign: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    element: 'water',
    dates: 'October 23 - November 21',
    description: 'The Scorpion - Passionate, resourceful, and brave'
  },
  sagittarius: {
    sign: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    element: 'fire',
    dates: 'November 22 - December 21',
    description: 'The Archer - Adventurous, independent, and philosophical'
  },
  capricorn: {
    sign: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    element: 'earth',
    dates: 'December 22 - January 19',
    description: 'The Goat - Responsible, disciplined, and practical'
  },
  aquarius: {
    sign: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    element: 'air',
    dates: 'January 20 - February 18',
    description: 'The Water Bearer - Progressive, independent, and humanitarian'
  },
  pisces: {
    sign: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    element: 'water',
    dates: 'February 19 - March 20',
    description: 'The Fish - Compassionate, artistic, and intuitive'
  }
}

/**
 * Get zodiac sign from birth date
 * @param dateString - Birth date in YYYY-MM-DD format
 * @returns ZodiacSign
 */
export function getZodiacSign(dateString: string): ZodiacSign {
  const date = new Date(dateString)
  const month = date.getMonth() + 1 // 0-indexed, so add 1
  const day = date.getDate()

  // Handle leap year for Pisces
  if (month === 2 && day >= 19) return 'pisces'
  if (month === 3 && day <= 20) return 'pisces'
  
  // Handle leap year for Aries
  if (month === 3 && day >= 21) return 'aries'
  if (month === 4 && day <= 19) return 'aries'
  
  // Handle leap year for Taurus
  if (month === 4 && day >= 20) return 'taurus'
  if (month === 5 && day <= 20) return 'taurus'
  
  // Handle leap year for Gemini
  if (month === 5 && day >= 21) return 'gemini'
  if (month === 6 && day <= 20) return 'gemini'
  
  // Handle leap year for Cancer
  if (month === 6 && day >= 21) return 'cancer'
  if (month === 7 && day <= 22) return 'cancer'
  
  // Handle leap year for Leo
  if (month === 7 && day >= 23) return 'leo'
  if (month === 8 && day <= 22) return 'leo'
  
  // Handle leap year for Virgo
  if (month === 8 && day >= 23) return 'virgo'
  if (month === 9 && day <= 22) return 'virgo'
  
  // Handle leap year for Libra
  if (month === 9 && day >= 23) return 'libra'
  if (month === 10 && day <= 22) return 'libra'
  
  // Handle leap year for Scorpio
  if (month === 10 && day >= 23) return 'scorpio'
  if (month === 11 && day <= 21) return 'scorpio'
  
  // Handle leap year for Sagittarius
  if (month === 11 && day >= 22) return 'sagittarius'
  if (month === 12 && day <= 21) return 'sagittarius'
  
  // Handle leap year for Capricorn
  if (month === 12 && day >= 22) return 'capricorn'
  if (month === 1 && day <= 19) return 'capricorn'
  
  // Handle leap year for Aquarius
  if (month === 1 && day >= 20) return 'aquarius'
  if (month === 2 && day <= 18) return 'aquarius'
  
  // Default fallback
  return 'aries'
}

/**
 * Get zodiac info from sign
 * @param sign - ZodiacSign
 * @returns ZodiacInfo
 */
export function getZodiacInfo(sign: ZodiacSign): ZodiacInfo {
  return zodiacSigns[sign]
}

/**
 * Get all zodiac signs as array
 * @returns ZodiacInfo[]
 */
export function getAllZodiacSigns(): ZodiacInfo[] {
  return Object.values(zodiacSigns)
}
