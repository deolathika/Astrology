/**
 * Daily Secrets - Optimized Numerology Calculation Engine
 * High-performance numerology calculations with caching and multi-system support
 */

import { LRUCache } from 'lru-cache'

// Types
export interface NumerologyData {
  name: string
  birthDate: Date
  system: 'pythagorean' | 'chaldean' | 'kabbalistic'
}

export interface NumerologyResult {
  lifePath: number
  destiny: number
  soulUrge: number
  personality: number
  maturity: number
  expression: number
  challenge: number
  pinnacle: number[]
  personalYear: number
  personalMonth: number
  personalDay: number
  system: string
  interpretations: {
    lifePath: string
    destiny: string
    soulUrge: string
    personality: string
  }
}

// Cache configuration
const cacheConfig = {
  max: 1000,
  ttl: 1000 * 60 * 60 * 24, // 24 hours
}

const numerologyCache = new LRUCache<string, NumerologyResult>(cacheConfig)

/**
 * Optimized Numerology Calculator
 */
export class NumerologyCalculator {
  private static instance: NumerologyCalculator

  private constructor() {}

  static getInstance(): NumerologyCalculator {
    if (!NumerologyCalculator.instance) {
      NumerologyCalculator.instance = new NumerologyCalculator()
    }
    return NumerologyCalculator.instance
  }

  /**
   * Calculate complete numerology profile with caching
   */
  async calculateNumerology(data: NumerologyData): Promise<NumerologyResult> {
    const cacheKey = this.generateCacheKey(data)
    
    // Check cache first
    if (numerologyCache.has(cacheKey)) {
      return numerologyCache.get(cacheKey)!
    }

    try {
      const result = await this.performCalculations(data)
      
      // Cache the result
      numerologyCache.set(cacheKey, result)
      return result

    } catch (error) {
      console.error('Error calculating numerology:', error)
      throw new Error('Failed to calculate numerology')
    }
  }

  /**
   * Perform all numerology calculations
   */
  private async performCalculations(data: NumerologyData): Promise<NumerologyResult> {
    const lifePath = this.calculateLifePath(data.birthDate)
    const destiny = this.calculateDestiny(data.name, data.system)
    const soulUrge = this.calculateSoulUrge(data.name, data.system)
    const personality = this.calculatePersonality(data.name, data.system)
    const maturity = this.calculateMaturity(data.name, data.birthDate, data.system)
    const expression = this.calculateExpression(data.name, data.system)
    const challenge = this.calculateChallenge(data.birthDate)
    const pinnacle = this.calculatePinnacles(data.birthDate)
    const personalYear = this.calculatePersonalYear(data.birthDate)
    const personalMonth = this.calculatePersonalMonth(data.birthDate)
    const personalDay = this.calculatePersonalDay(data.birthDate)

    const interpretations = {
      lifePath: this.getLifePathInterpretation(lifePath),
      destiny: this.getDestinyInterpretation(destiny),
      soulUrge: this.getSoulUrgeInterpretation(soulUrge),
      personality: this.getPersonalityInterpretation(personality)
    }

    return {
      lifePath,
      destiny,
      soulUrge,
      personality,
      maturity,
      expression,
      challenge,
      pinnacle,
      personalYear,
      personalMonth,
      personalDay,
      system: data.system,
      interpretations
    }
  }

  /**
   * Calculate Life Path Number
   */
  private calculateLifePath(birthDate: Date): number {
    const day = birthDate.getDate()
    const month = birthDate.getMonth() + 1
    const year = birthDate.getFullYear()
    
    const sum = this.reduceToSingleDigit(day + month + year)
    return sum
  }

  /**
   * Calculate Destiny Number
   */
  private calculateDestiny(name: string, system: 'pythagorean' | 'chaldean' | 'kabbalistic'): number {
    const fullName = name.toUpperCase().replace(/\s+/g, '')
    const sum = this.getLetterSum(fullName, system)
    return this.reduceToSingleDigit(sum)
  }

  /**
   * Calculate Soul Urge Number
   */
  private calculateSoulUrge(name: string, system: 'pythagorean' | 'chaldean' | 'kabbalistic'): number {
    const vowels = name.toUpperCase().replace(/[^AEIOU]/g, '')
    const sum = this.getLetterSum(vowels, system)
    return this.reduceToSingleDigit(sum)
  }

  /**
   * Calculate Personality Number
   */
  private calculatePersonality(name: string, system: 'pythagorean' | 'chaldean' | 'kabbalistic'): number {
    const consonants = name.toUpperCase().replace(/[AEIOU\s]/g, '')
    const sum = this.getLetterSum(consonants, system)
    return this.reduceToSingleDigit(sum)
  }

  /**
   * Calculate Maturity Number
   */
  private calculateMaturity(name: string, birthDate: Date, system: 'pythagorean' | 'chaldean' | 'kabbalistic'): number {
    const lifePath = this.calculateLifePath(birthDate)
    const destiny = this.calculateDestiny(name, system)
    return this.reduceToSingleDigit(lifePath + destiny)
  }

  /**
   * Calculate Expression Number
   */
  private calculateExpression(name: string, system: 'pythagorean' | 'chaldean' | 'kabbalistic'): number {
    return this.calculateDestiny(name, system) // Same as destiny
  }

  /**
   * Calculate Challenge Number
   */
  private calculateChallenge(birthDate: Date): number {
    const day = birthDate.getDate()
    const month = birthDate.getMonth() + 1
    
    const daySum = this.reduceToSingleDigit(day)
    const monthSum = this.reduceToSingleDigit(month)
    
    return Math.abs(daySum - monthSum)
  }

  /**
   * Calculate Pinnacle Numbers
   */
  private calculatePinnacles(birthDate: Date): number[] {
    const lifePath = this.calculateLifePath(birthDate)
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()
    
    const pinnacle1 = this.reduceToSingleDigit(month + day)
    const pinnacle2 = this.reduceToSingleDigit(day + lifePath)
    const pinnacle3 = this.reduceToSingleDigit(pinnacle1 + pinnacle2)
    const pinnacle4 = this.reduceToSingleDigit(month + lifePath)
    
    return [pinnacle1, pinnacle2, pinnacle3, pinnacle4]
  }

  /**
   * Calculate Personal Year Number
   */
  private calculatePersonalYear(birthDate: Date): number {
    const currentYear = new Date().getFullYear()
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()
    
    return this.reduceToSingleDigit(month + day + currentYear)
  }

  /**
   * Calculate Personal Month Number
   */
  private calculatePersonalMonth(birthDate: Date): number {
    const personalYear = this.calculatePersonalYear(birthDate)
    const currentMonth = new Date().getMonth() + 1
    
    return this.reduceToSingleDigit(personalYear + currentMonth)
  }

  /**
   * Calculate Personal Day Number
   */
  private calculatePersonalDay(birthDate: Date): number {
    const personalMonth = this.calculatePersonalMonth(birthDate)
    const currentDay = new Date().getDate()
    
    return this.reduceToSingleDigit(personalMonth + currentDay)
  }

  /**
   * Get letter sum based on numerology system
   */
  private getLetterSum(text: string, system: 'pythagorean' | 'chaldean' | 'kabbalistic'): number {
    let sum = 0
    
    for (const char of text) {
      const value = this.getLetterValue(char, system)
      sum += value
    }
    
    return sum
  }

  /**
   * Get letter value based on numerology system
   */
  private getLetterValue(letter: string, system: 'pythagorean' | 'chaldean' | 'kabbalistic'): number {
    const pythagorean: Record<string, number> = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    }
    
    const chaldean: Record<string, number> = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5, 'I': 1,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 1, 'R': 2,
      'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5, 'Y': 1, 'Z': 7
    }
    
    const kabbalistic: Record<string, number> = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 10, 'K': 20, 'L': 30, 'M': 40, 'N': 50, 'O': 60, 'P': 70, 'Q': 80, 'R': 90,
      'S': 100, 'T': 200, 'U': 300, 'V': 400, 'W': 500, 'X': 600, 'Y': 700, 'Z': 800
    }
    
    const systems = { pythagorean, chaldean, kabbalistic }
    return systems[system][letter] || 0
  }

  /**
   * Reduce number to single digit (except master numbers)
   */
  private reduceToSingleDigit(number: number): number {
    if (number === 11 || number === 22 || number === 33) {
      return number // Master numbers
    }
    
    while (number > 9) {
      number = Math.floor(number / 10) + (number % 10)
    }
    
    return number
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(data: NumerologyData): string {
    return `${data.name}_${data.birthDate.getTime()}_${data.system}`
  }

  // Interpretation methods
  private getLifePathInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'The Leader: Independent, ambitious, and a pioneer. You are a natural-born leader with strong determination.',
      2: 'The Peacemaker: Harmonious, diplomatic, and intuitive. You excel at cooperation and mediation.',
      3: 'The Communicator: Creative, expressive, and optimistic. You have a gift for communication and creativity.',
      4: 'The Builder: Practical, disciplined, and stable. You are methodical and reliable in all endeavors.',
      5: 'The Adventurer: Freedom-loving, adaptable, and restless. You seek variety and new experiences.',
      6: 'The Nurturer: Responsible, caring, and community-oriented. You have a strong sense of duty and service.',
      7: 'The Seeker: Analytical, spiritual, and introspective. You are drawn to deeper meanings and mysteries.',
      8: 'The Powerhouse: Ambitious, successful, and authoritative. You have strong business and material instincts.',
      9: 'The Humanitarian: Compassionate, generous, and wise. You are here to serve humanity.',
      11: 'The Master Intuitive: Highly intuitive, inspiring, and visionary. You have exceptional spiritual insight.',
      22: 'The Master Builder: Practical idealist, powerful, and transformative. You can turn dreams into reality.',
      33: 'The Master Healer: Compassionate, selfless, and a universal healer. You are here to serve humanity at the highest level.'
    }
    
    return interpretations[number] || 'A unique path awaits you.'
  }

  private getDestinyInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'Your destiny is to lead and inspire others through your independence and originality.',
      2: 'Your destiny involves bringing harmony and cooperation to the world.',
      3: 'Your destiny is to communicate, create, and inspire through artistic expression.',
      4: 'Your destiny is to build solid foundations and provide stability for others.',
      5: 'Your destiny involves freedom, change, and adventure in all areas of life.',
      6: 'Your destiny is to nurture, heal, and care for others in your community.',
      7: 'Your destiny involves seeking truth, wisdom, and spiritual understanding.',
      8: 'Your destiny is to achieve material success and use your power wisely.',
      9: 'Your destiny is to serve humanity and help others on their spiritual journey.',
      11: 'Your destiny is to inspire others through your intuitive insights and spiritual wisdom.',
      22: 'Your destiny is to build something lasting that benefits humanity.',
      33: 'Your destiny is to heal and uplift humanity through your compassion and wisdom.'
    }
    
    return interpretations[number] || 'Your destiny is unique and unfolding.'
  }

  private getSoulUrgeInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'Your soul craves independence, leadership, and the freedom to be yourself.',
      2: 'Your soul seeks harmony, partnership, and peaceful relationships.',
      3: 'Your soul desires creative expression, joy, and communication.',
      4: 'Your soul seeks security, stability, and a solid foundation.',
      5: 'Your soul craves freedom, adventure, and new experiences.',
      6: 'Your soul seeks to nurture, heal, and care for others.',
      7: 'Your soul desires spiritual understanding, wisdom, and inner peace.',
      8: 'Your soul seeks material success, power, and recognition.',
      9: 'Your soul desires to serve humanity and make a difference in the world.',
      11: 'Your soul seeks to inspire others through your intuitive gifts.',
      22: 'Your soul desires to build something meaningful for humanity.',
      33: 'Your soul seeks to heal and uplift others through compassion.'
    }
    
    return interpretations[number] || 'Your soul has unique desires and aspirations.'
  }

  private getPersonalityInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'You appear confident, independent, and natural leader to others.',
      2: 'You appear diplomatic, cooperative, and peace-loving to others.',
      3: 'You appear creative, expressive, and optimistic to others.',
      4: 'You appear practical, reliable, and hardworking to others.',
      5: 'You appear adventurous, freedom-loving, and adaptable to others.',
      6: 'You appear caring, responsible, and nurturing to others.',
      7: 'You appear wise, analytical, and spiritually inclined to others.',
      8: 'You appear ambitious, successful, and authoritative to others.',
      9: 'You appear compassionate, generous, and humanitarian to others.',
      11: 'You appear intuitive, inspiring, and spiritually gifted to others.',
      22: 'You appear capable, visionary, and masterful to others.',
      33: 'You appear healing, compassionate, and spiritually evolved to others.'
    }
    
    return interpretations[number] || 'Your personality is unique and multifaceted.'
  }
}

// Export singleton instance
export const numerologyCalculator = NumerologyCalculator.getInstance()

// Utility functions
export const getNumberMeaning = (number: number): string => {
  const meanings: Record<number, string> = {
    1: 'Leadership, independence, originality',
    2: 'Cooperation, diplomacy, harmony',
    3: 'Creativity, communication, joy',
    4: 'Stability, practicality, hard work',
    5: 'Freedom, adventure, change',
    6: 'Responsibility, nurturing, service',
    7: 'Spirituality, analysis, wisdom',
    8: 'Material success, power, authority',
    9: 'Humanitarianism, completion, wisdom',
    11: 'Intuition, inspiration, spiritual insight',
    22: 'Master builder, practical idealism',
    33: 'Master healer, universal compassion'
  }
  
  return meanings[number] || 'Unique spiritual significance'
}

export const getNumberColor = (number: number): string => {
  const colors: Record<number, string> = {
    1: '#FF6B6B', // Red
    2: '#4ECDC4', // Teal
    3: '#45B7D1', // Blue
    4: '#96CEB4', // Green
    5: '#FFEAA7', // Yellow
    6: '#DDA0DD', // Plum
    7: '#98D8C8', // Mint
    8: '#F7DC6F', // Gold
    9: '#BB8FCE', // Purple
    11: '#85C1E9', // Light Blue
    22: '#F8C471', // Orange
    33: '#82E0AA'  // Light Green
  }
  
  return colors[number] || '#CCCCCC'
}

export const getNumberElement = (number: number): string => {
  const elements: Record<number, string> = {
    1: 'Fire',
    2: 'Water',
    3: 'Fire',
    4: 'Earth',
    5: 'Air',
    6: 'Water',
    7: 'Water',
    8: 'Earth',
    9: 'Fire',
    11: 'Air',
    22: 'Earth',
    33: 'Water'
  }
  
  return elements[number] || 'Unknown'
}

