/**
 * Numerology Engines for Daily Secrets App
 * Supports Pythagorean, Chaldean, and other numerology systems
 */

export interface NumerologyResult {
  number: number
  meaning: string
  traits: string[]
  challenges: string[]
  opportunities: string[]
}

export interface LifePathData {
  number: number
  description: string
  traits: string[]
  career: string[]
  relationships: string[]
  challenges: string[]
}

export interface DestinyData {
  number: number
  description: string
  purpose: string
  talents: string[]
  expression: string[]
}

export class PythagoreanNumerology {
  private static readonly letterValues: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }

  private static readonly masterNumbers = [11, 22, 33, 44, 55, 66, 77, 88, 99]

  /**
   * Calculate life path number from birth date
   */
  static calculateLifePath(birthDate: string): LifePathData {
    const date = new Date(birthDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const daySum = this.reduceToSingleDigit(day)
    const monthSum = this.reduceToSingleDigit(month)
    const yearSum = this.reduceToSingleDigit(year)

    let lifePath = daySum + monthSum + yearSum
    lifePath = this.reduceToSingleDigit(lifePath)

    // Check for master numbers
    const fullSum = this.reduceToSingleDigit(day + month + year)
    if (this.masterNumbers.includes(fullSum)) {
      lifePath = fullSum
    }

    return this.getLifePathData(lifePath)
  }

  /**
   * Calculate destiny number from full name
   */
  static calculateDestiny(fullName: string): DestinyData {
    const name = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0

    for (const letter of name) {
      sum += this.letterValues[letter] || 0
    }

    const destiny = this.reduceToSingleDigit(sum)
    return this.getDestinyData(destiny)
  }

  /**
   * Calculate soul urge number (vowels only)
   */
  static calculateSoulUrge(fullName: string): NumerologyResult {
    const vowels = fullName.toUpperCase().replace(/[^AEIOU]/g, '')
    let sum = 0

    for (const letter of vowels) {
      sum += this.letterValues[letter] || 0
    }

    const soulUrge = this.reduceToSingleDigit(sum)
    return this.getNumerologyResult(soulUrge, 'Soul Urge')
  }

  /**
   * Calculate personality number (consonants only)
   */
  static calculatePersonality(fullName: string): NumerologyResult {
    const consonants = fullName.toUpperCase().replace(/[AEIOU]/g, '').replace(/[^A-Z]/g, '')
    let sum = 0

    for (const letter of consonants) {
      sum += this.letterValues[letter] || 0
    }

    const personality = this.reduceToSingleDigit(sum)
    return this.getNumerologyResult(personality, 'Personality')
  }

  /**
   * Calculate birthday number
   */
  static calculateBirthday(birthDate: string): NumerologyResult {
    const date = new Date(birthDate)
    const day = date.getDate()
    const birthday = this.reduceToSingleDigit(day)
    return this.getNumerologyResult(birthday, 'Birthday')
  }

  /**
   * Calculate current name number
   */
  static calculateCurrentName(fullName: string): NumerologyResult {
    const name = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0

    for (const letter of name) {
      sum += this.letterValues[letter] || 0
    }

    const currentName = this.reduceToSingleDigit(sum)
    return this.getNumerologyResult(currentName, 'Current Name')
  }

  /**
   * Reduce number to single digit
   */
  private static reduceToSingleDigit(num: number): number {
    while (num > 9 && !this.masterNumbers.includes(num)) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    }
    return num
  }

  /**
   * Get life path data
   */
  private static getLifePathData(number: number): LifePathData {
    const lifePathData: { [key: number]: LifePathData } = {
      1: {
        number: 1,
        description: 'The Leader - Independent, pioneering, and ambitious',
        traits: ['Independent', 'Ambitious', 'Pioneering', 'Determined', 'Original'],
        career: ['Entrepreneur', 'Manager', 'Leader', 'Innovator', 'Executive'],
        relationships: ['Direct', 'Honest', 'Loyal', 'Protective', 'Independent'],
        challenges: ['Impatience', 'Stubbornness', 'Self-centeredness', 'Arrogance']
      },
      2: {
        number: 2,
        description: 'The Diplomat - Cooperative, intuitive, and peace-loving',
        traits: ['Cooperative', 'Intuitive', 'Diplomatic', 'Patient', 'Supportive'],
        career: ['Mediator', 'Counselor', 'Teacher', 'Artist', 'Healer'],
        relationships: ['Loving', 'Supportive', 'Sensitive', 'Caring', 'Loyal'],
        challenges: ['Oversensitivity', 'Indecision', 'Dependency', 'Passivity']
      },
      3: {
        number: 3,
        description: 'The Creative - Expressive, optimistic, and artistic',
        traits: ['Creative', 'Optimistic', 'Expressive', 'Artistic', 'Enthusiastic'],
        career: ['Artist', 'Writer', 'Performer', 'Designer', 'Communicator'],
        relationships: ['Fun-loving', 'Expressive', 'Charming', 'Inspiring', 'Social'],
        challenges: ['Scattered energy', 'Superficiality', 'Gossip', 'Moodiness']
      },
      11: {
        number: 11,
        description: 'The Intuitive - Inspirational, intuitive, and visionary',
        traits: ['Intuitive', 'Inspirational', 'Visionary', 'Sensitive', 'Idealistic'],
        career: ['Teacher', 'Healer', 'Counselor', 'Artist', 'Spiritual Leader'],
        relationships: ['Intuitive', 'Sensitive', 'Inspiring', 'Supportive', 'Spiritual'],
        challenges: ['Nervous tension', 'Over-sensitivity', 'Perfectionism', 'Self-doubt']
      },
      22: {
        number: 22,
        description: 'The Master Builder - Practical, ambitious, and visionary',
        traits: ['Practical', 'Ambitious', 'Visionary', 'Organized', 'Masterful'],
        career: ['Architect', 'Engineer', 'Builder', 'Manager', 'Visionary Leader'],
        relationships: ['Stable', 'Supportive', 'Ambitious', 'Practical', 'Loyal'],
        challenges: ['Overwhelming responsibility', 'Perfectionism', 'Stress', 'Burnout']
      }
    }

    return lifePathData[number] || lifePathData[1]
  }

  /**
   * Get destiny data
   */
  private static getDestinyData(number: number): DestinyData {
    const destinyData: { [key: number]: DestinyData } = {
      1: {
        number: 1,
        description: 'Leadership and independence',
        purpose: 'To lead and inspire others',
        talents: ['Leadership', 'Innovation', 'Independence', 'Courage'],
        expression: ['Direct', 'Confident', 'Ambitious', 'Original']
      },
      2: {
        number: 2,
        description: 'Cooperation and harmony',
        purpose: 'To bring peace and cooperation',
        talents: ['Diplomacy', 'Intuition', 'Cooperation', 'Sensitivity'],
        expression: ['Gentle', 'Supportive', 'Intuitive', 'Peaceful']
      },
      3: {
        number: 3,
        description: 'Creativity and self-expression',
        purpose: 'To inspire through creativity',
        talents: ['Creativity', 'Communication', 'Artistry', 'Optimism'],
        expression: ['Expressive', 'Artistic', 'Enthusiastic', 'Charming']
      }
    }

    return destinyData[number] || destinyData[1]
  }

  /**
   * Get numerology result
   */
  private static getNumerologyResult(number: number, type: string): NumerologyResult {
    const meanings: { [key: number]: { meaning: string; traits: string[]; challenges: string[]; opportunities: string[] } } = {
      1: {
        meaning: 'Leadership, independence, and new beginnings',
        traits: ['Independent', 'Ambitious', 'Pioneering', 'Determined'],
        challenges: ['Impatience', 'Stubbornness', 'Self-centeredness'],
        opportunities: ['Leadership roles', 'Entrepreneurship', 'Innovation']
      },
      2: {
        meaning: 'Cooperation, diplomacy, and partnership',
        traits: ['Cooperative', 'Intuitive', 'Diplomatic', 'Patient'],
        challenges: ['Oversensitivity', 'Indecision', 'Dependency'],
        opportunities: ['Mediation', 'Counseling', 'Teamwork']
      },
      3: {
        meaning: 'Creativity, self-expression, and communication',
        traits: ['Creative', 'Optimistic', 'Expressive', 'Artistic'],
        challenges: ['Scattered energy', 'Superficiality', 'Moodiness'],
        opportunities: ['Artistic pursuits', 'Communication', 'Entertainment']
      }
    }

    const data = meanings[number] || meanings[1]
    return {
      number,
      meaning: data.meaning,
      traits: data.traits,
      challenges: data.challenges,
      opportunities: data.opportunities
    }
  }
}

export class ChaldeanNumerology {
  private static readonly letterValues: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5, 'I': 1,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 1, 'R': 2,
    'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5, 'Y': 1, 'Z': 7
  }

  /**
   * Calculate Chaldean destiny number
   */
  static calculateDestiny(fullName: string): DestinyData {
    const name = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0

    for (const letter of name) {
      sum += this.letterValues[letter] || 0
    }

    const destiny = this.reduceToSingleDigit(sum)
    return PythagoreanNumerology['getDestinyData'](destiny)
  }

  private static reduceToSingleDigit(num: number): number {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    }
    return num
  }
}

// Export engines
export const pythagoreanNumerology = new PythagoreanNumerology()
export const chaldeanNumerology = new ChaldeanNumerology()
