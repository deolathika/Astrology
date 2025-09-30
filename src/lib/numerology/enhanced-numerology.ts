/**
 * Enhanced Numerology System with Chaldean and Master Numbers
 * Supports Pythagorean, Chaldean, and Master Number calculations
 */

export interface NumerologyResult {
  lifePath: number
  expression: number
  soulUrge: number
  personality: number
  birthday: number
  maturity: number
  currentName: number
  masterNumbers: {
    lifePath: number | null
    expression: number | null
    soulUrge: number | null
  }
  chaldean: {
    lifePath: number
    expression: number
    soulUrge: number
    personality: number
  }
  dailyNumber: number
  luckyNumbers: number[]
  compatibility: {
    romantic: number
    friendship: number
    business: number
  }
}

export interface BirthData {
  fullName: string
  birthDate: string
  currentName?: string
}

export class EnhancedNumerology {
  private chaldeanMap: Record<string, number> = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5,
    'I': 1, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8,
    'Q': 1, 'R': 2, 'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5,
    'Y': 1, 'Z': 7
  }

  private pythagoreanMap: Record<string, number> = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
    'I': 9, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7,
    'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6,
    'Y': 7, 'Z': 8
  }

  /**
   * Calculate comprehensive numerology profile
   */
  calculateProfile(data: BirthData): NumerologyResult {
    const fullName = data.fullName.toUpperCase()
    const currentName = (data.currentName || data.fullName).toUpperCase()
    const birthDate = new Date(data.birthDate)
    
    // Pythagorean calculations
    const lifePath = this.calculateLifePath(birthDate)
    const expression = this.calculateExpression(fullName, 'pythagorean')
    const soulUrge = this.calculateSoulUrge(fullName, 'pythagorean')
    const personality = this.calculatePersonality(fullName, 'pythagorean')
    const birthday = this.calculateBirthday(birthDate)
    const maturity = this.calculateMaturity(lifePath, expression)
    const currentNameNumber = this.calculateExpression(currentName, 'pythagorean')
    
    // Chaldean calculations
    const chaldean = {
      lifePath: this.calculateLifePath(birthDate), // Same for both systems
      expression: this.calculateExpression(fullName, 'chaldean'),
      soulUrge: this.calculateSoulUrge(fullName, 'chaldean'),
      personality: this.calculatePersonality(fullName, 'chaldean')
    }
    
    // Master numbers
    const masterNumbers = {
      lifePath: this.getMasterNumber(lifePath),
      expression: this.getMasterNumber(expression),
      soulUrge: this.getMasterNumber(soulUrge)
    }
    
    // Daily number (based on current date)
    const dailyNumber = this.calculateDailyNumber()
    
    // Lucky numbers
    const luckyNumbers = this.calculateLuckyNumbers(fullName, birthDate)
    
    // Compatibility scores
    const compatibility = this.calculateCompatibility(lifePath, expression, soulUrge)
    
    return {
      lifePath,
      expression,
      soulUrge,
      personality,
      birthday,
      maturity,
      currentName: currentNameNumber,
      masterNumbers,
      chaldean,
      dailyNumber,
      luckyNumbers,
      compatibility
    }
  }

  /**
   * Calculate Life Path Number
   */
  private calculateLifePath(birthDate: Date): number {
    const day = birthDate.getDate()
    const month = birthDate.getMonth() + 1
    const year = birthDate.getFullYear()
    
    const daySum = this.reduceToSingleDigit(day)
    const monthSum = this.reduceToSingleDigit(month)
    const yearSum = this.reduceToSingleDigit(year)
    
    const total = daySum + monthSum + yearSum
    return this.reduceToSingleDigit(total)
  }

  /**
   * Calculate Expression Number (Destiny Number)
   */
  private calculateExpression(name: string, system: 'pythagorean' | 'chaldean'): number {
    const map = system === 'chaldean' ? this.chaldeanMap : this.pythagoreanMap
    const cleanName = name.replace(/[^A-Z]/g, '')
    
    let sum = 0
    for (const letter of cleanName) {
      sum += map[letter] || 0
    }
    
    return this.reduceToSingleDigit(sum)
  }

  /**
   * Calculate Soul Urge Number (Heart's Desire)
   */
  private calculateSoulUrge(name: string, system: 'pythagorean' | 'chaldean'): number {
    const map = system === 'chaldean' ? this.chaldeanMap : this.pythagoreanMap
    const vowels = name.match(/[AEIOU]/g) || []
    
    let sum = 0
    for (const vowel of vowels) {
      sum += map[vowel] || 0
    }
    
    return this.reduceToSingleDigit(sum)
  }

  /**
   * Calculate Personality Number
   */
  private calculatePersonality(name: string, system: 'pythagorean' | 'chaldean'): number {
    const map = system === 'chaldean' ? this.chaldeanMap : this.pythagoreanMap
    const consonants = name.match(/[BCDFGHJKLMNPQRSTVWXYZ]/g) || []
    
    let sum = 0
    for (const consonant of consonants) {
      sum += map[consonant] || 0
    }
    
    return this.reduceToSingleDigit(sum)
  }

  /**
   * Calculate Birthday Number
   */
  private calculateBirthday(birthDate: Date): number {
    return this.reduceToSingleDigit(birthDate.getDate())
  }

  /**
   * Calculate Maturity Number
   */
  private calculateMaturity(lifePath: number, expression: number): number {
    return this.reduceToSingleDigit(lifePath + expression)
  }

  /**
   * Calculate Daily Number
   */
  private calculateDailyNumber(): number {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    
    return this.reduceToSingleDigit(day + month + year)
  }

  /**
   * Calculate Lucky Numbers
   */
  private calculateLuckyNumbers(name: string, birthDate: Date): number[] {
    const nameSum = this.calculateExpression(name, 'pythagorean')
    const birthSum = this.calculateLifePath(birthDate)
    const today = new Date()
    const todaySum = this.calculateDailyNumber()
    
    // Generate deterministic lucky numbers
    const base = nameSum + birthSum + todaySum
    const luckyNumbers: number[] = []
    
    for (let i = 1; i <= 6; i++) {
      const num = this.reduceToSingleDigit(base + i)
      if (!luckyNumbers.includes(num)) {
        luckyNumbers.push(num)
      }
    }
    
    return luckyNumbers.slice(0, 5)
  }

  /**
   * Calculate Compatibility Scores
   */
  private calculateCompatibility(lifePath: number, expression: number, soulUrge: number): {
    romantic: number
    friendship: number
    business: number
  } {
    const total = lifePath + expression + soulUrge
    const base = this.reduceToSingleDigit(total)
    
    return {
      romantic: Math.min(100, base * 11),
      friendship: Math.min(100, base * 9),
      business: Math.min(100, base * 10)
    }
  }

  /**
   * Check for Master Numbers (11, 22, 33)
   */
  private getMasterNumber(number: number): number | null {
    if (number === 11 || number === 22 || number === 33) {
      return number
    }
    return null
  }

  /**
   * Reduce number to single digit (except Master Numbers)
   */
  private reduceToSingleDigit(number: number): number {
    if (number === 11 || number === 22 || number === 33) {
      return number
    }
    
    while (number > 9) {
      number = Math.floor(number / 10) + (number % 10)
    }
    
    return number
  }

  /**
   * Get number meanings
   */
  getNumberMeanings(): Record<number, string> {
    return {
      1: "Leadership, independence, originality",
      2: "Cooperation, diplomacy, sensitivity",
      3: "Creativity, self-expression, optimism",
      4: "Stability, hard work, practicality",
      5: "Freedom, adventure, versatility",
      6: "Responsibility, nurturing, harmony",
      7: "Spirituality, analysis, introspection",
      8: "Material success, authority, ambition",
      9: "Humanitarianism, completion, wisdom",
      11: "Intuition, inspiration, enlightenment",
      22: "Master builder, practical vision",
      33: "Master teacher, spiritual guidance"
    }
  }

  /**
   * Get compatibility analysis
   */
  getCompatibilityAnalysis(score: number): string {
    if (score >= 90) return "Exceptional compatibility"
    if (score >= 80) return "Very good compatibility"
    if (score >= 70) return "Good compatibility"
    if (score >= 60) return "Moderate compatibility"
    if (score >= 50) return "Challenging but workable"
    return "Significant challenges"
  }
}

// Export singleton instance
export const enhancedNumerology = new EnhancedNumerology()

