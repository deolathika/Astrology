/**
 * Comprehensive Numerology System
 * Includes Pythagorean, Chaldean, and Master Numbers
 * Based on traditional numerology principles
 */

export interface NumerologyData {
  lifePath: number
  destiny: number
  soulUrge: number
  personality: number
  birthday: number
  maturity: number
  currentName: number
  masterNumbers: number[]
  luckyNumbers: number[]
  dailyNumber: number
  compatibility: {
    compatibleNumbers: number[]
    challengingNumbers: number[]
    neutralNumbers: number[]
  }
  careerGuidance: string[]
  relationshipAdvice: string[]
  spiritualGuidance: string[]
  healthAdvice: string[]
}

export interface MasterNumberData {
  number: number
  name: string
  description: string
  traits: string[]
  challenges: string[]
  opportunities: string[]
  spiritualMeaning: string
}

export class ComprehensiveNumerologyService {
  private static readonly masterNumbers: Record<number, MasterNumberData> = {
    11: {
      number: 11,
      name: 'Master Number 11',
      description: 'The Intuitive - Visionary and inspirational',
      traits: ['Intuitive', 'Visionary', 'Inspirational', 'Sensitive', 'Psychic'],
      challenges: ['Overwhelming', 'Nervous', 'Overly sensitive', 'Unrealistic'],
      opportunities: ['Spiritual teacher', 'Healer', 'Artist', 'Counselor'],
      spiritualMeaning: 'Gateway to higher consciousness and spiritual enlightenment'
    },
    22: {
      number: 22,
      name: 'Master Number 22',
      description: 'The Master Builder - Practical visionary with great potential',
      traits: ['Practical', 'Visionary', 'Builder', 'Organized', 'Ambitious'],
      challenges: ['Overwhelming', 'Perfectionist', 'Impatient', 'Overly critical'],
      opportunities: ['Architect', 'Engineer', 'Leader', 'Entrepreneur'],
      spiritualMeaning: 'Master of manifestation and building on the material plane'
    },
    33: {
      number: 33,
      name: 'Master Number 33',
      description: 'The Master Teacher - Compassionate and healing',
      traits: ['Compassionate', 'Healing', 'Teaching', 'Nurturing', 'Wise'],
      challenges: ['Overwhelming', 'Self-sacrificing', 'Emotional', 'Overly responsible'],
      opportunities: ['Teacher', 'Healer', 'Counselor', 'Parent', 'Mentor'],
      spiritualMeaning: 'Master of compassion and spiritual teaching'
    }
  }

  private static readonly numberMeanings: Record<number, {
    name: string
    description: string
    traits: string[]
    challenges: string[]
    opportunities: string[]
    spiritualMeaning: string
  }> = {
    1: {
      name: 'The Leader',
      description: 'Independent, pioneering, and ambitious',
      traits: ['Independent', 'Pioneering', 'Ambitious', 'Leadership', 'Originality'],
      challenges: ['Impatient', 'Arrogant', 'Selfish', 'Stubborn'],
      opportunities: ['Leadership', 'Entrepreneurship', 'Innovation', 'Independence'],
      spiritualMeaning: 'The beginning, the source, the divine spark'
    },
    2: {
      name: 'The Diplomat',
      description: 'Cooperative, diplomatic, and intuitive',
      traits: ['Cooperative', 'Diplomatic', 'Intuitive', 'Patient', 'Supportive'],
      challenges: ['Overly sensitive', 'Indecisive', 'Dependent', 'Passive'],
      opportunities: ['Partnership', 'Diplomacy', 'Counseling', 'Support'],
      spiritualMeaning: 'Balance, harmony, and divine partnership'
    },
    3: {
      name: 'The Creative',
      description: 'Expressive, creative, and optimistic',
      traits: ['Creative', 'Expressive', 'Optimistic', 'Enthusiastic', 'Artistic'],
      challenges: ['Scattered', 'Superficial', 'Overly dramatic', 'Inconsistent'],
      opportunities: ['Art', 'Communication', 'Entertainment', 'Teaching'],
      spiritualMeaning: 'Divine expression and creative manifestation'
    },
    4: {
      name: 'The Builder',
      description: 'Practical, organized, and reliable',
      traits: ['Practical', 'Organized', 'Reliable', 'Hardworking', 'Stable'],
      challenges: ['Rigid', 'Stubborn', 'Overly serious', 'Inflexible'],
      opportunities: ['Construction', 'Organization', 'Management', 'Engineering'],
      spiritualMeaning: 'Foundation, stability, and divine order'
    },
    5: {
      name: 'The Adventurer',
      description: 'Freedom-loving, versatile, and progressive',
      traits: ['Freedom-loving', 'Versatile', 'Progressive', 'Adventurous', 'Curious'],
      challenges: ['Restless', 'Irresponsible', 'Inconsistent', 'Overly impulsive'],
      opportunities: ['Travel', 'Sales', 'Communication', 'Adventure'],
      spiritualMeaning: 'Freedom, change, and divine movement'
    },
    6: {
      name: 'The Nurturer',
      description: 'Caring, responsible, and family-oriented',
      traits: ['Caring', 'Responsible', 'Family-oriented', 'Nurturing', 'Protective'],
      challenges: ['Overly responsible', 'Interfering', 'Self-righteous', 'Overwhelming'],
      opportunities: ['Parenting', 'Healing', 'Counseling', 'Service'],
      spiritualMeaning: 'Love, service, and divine nurturing'
    },
    7: {
      name: 'The Seeker',
      description: 'Spiritual, analytical, and introspective',
      traits: ['Spiritual', 'Analytical', 'Introspective', 'Wise', 'Mysterious'],
      challenges: ['Isolated', 'Skeptical', 'Overly analytical', 'Pessimistic'],
      opportunities: ['Research', 'Spirituality', 'Analysis', 'Teaching'],
      spiritualMeaning: 'Divine wisdom and spiritual seeking'
    },
    8: {
      name: 'The Achiever',
      description: 'Ambitious, materialistic, and powerful',
      traits: ['Ambitious', 'Materialistic', 'Powerful', 'Successful', 'Authoritative'],
      challenges: ['Materialistic', 'Ruthless', 'Overly ambitious', 'Controlling'],
      opportunities: ['Business', 'Leadership', 'Finance', 'Management'],
      spiritualMeaning: 'Divine power and material mastery'
    },
    9: {
      name: 'The Humanitarian',
      description: 'Compassionate, generous, and wise',
      traits: ['Compassionate', 'Generous', 'Wise', 'Humanitarian', 'Universal'],
      challenges: ['Overly idealistic', 'Self-sacrificing', 'Emotional', 'Overwhelming'],
      opportunities: ['Service', 'Healing', 'Teaching', 'Humanitarianism'],
      spiritualMeaning: 'Divine love and universal service'
    }
  }

  /**
   * Calculate Life Path Number
   */
  static calculateLifePath(birthDate: string): number {
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

  /**
   * Calculate Destiny Number (Expression Number)
   */
  static calculateDestiny(fullName: string): number {
    const letterValues: Record<string, number> = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    }
    
    const cleanedName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0
    
    for (const char of cleanedName) {
      sum += letterValues[char] || 0
    }
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  /**
   * Calculate Soul Urge Number (Heart's Desire)
   */
  static calculateSoulUrge(fullName: string): number {
    const vowelValues: Record<string, number> = {
      'A': 1, 'E': 5, 'I': 9, 'O': 6, 'U': 3, 'Y': 7
    }
    
    const cleanedName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0
    
    for (const char of cleanedName) {
      if (vowelValues[char]) {
        sum += vowelValues[char]
      }
    }
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  /**
   * Calculate Personality Number
   */
  static calculatePersonality(fullName: string): number {
    const consonantValues: Record<string, number> = {
      'B': 2, 'C': 3, 'D': 4, 'F': 6, 'G': 7, 'H': 8, 'J': 1, 'K': 2, 'L': 3,
      'M': 4, 'N': 5, 'P': 7, 'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'V': 4, 'W': 5,
      'X': 6, 'Y': 7, 'Z': 8
    }
    
    const cleanedName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
    let sum = 0
    
    for (const char of cleanedName) {
      if (consonantValues[char]) {
        sum += consonantValues[char]
      }
    }
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  /**
   * Calculate Birthday Number
   */
  static calculateBirthday(birthDate: string): number {
    const date = new Date(birthDate)
    const day = date.getDate()
    
    let sum = day
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  /**
   * Calculate Maturity Number
   */
  static calculateMaturity(lifePath: number, destiny: number): number {
    let sum = lifePath + destiny
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  /**
   * Calculate Current Name Number
   */
  static calculateCurrentName(currentName: string): number {
    return this.calculateDestiny(currentName)
  }

  /**
   * Calculate Daily Number
   */
  static calculateDailyNumber(date: Date): number {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    
    let sum = day + month + year
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }

  /**
   * Generate Lucky Numbers
   */
  static generateLuckyNumbers(lifePath: number, destiny: number, soulUrge: number): number[] {
    const luckyNumbers = [lifePath, destiny, soulUrge]
    
    // Add master numbers if present
    if (lifePath === 11 || lifePath === 22 || lifePath === 33) {
      luckyNumbers.push(lifePath)
    }
    if (destiny === 11 || destiny === 22 || destiny === 33) {
      luckyNumbers.push(destiny)
    }
    if (soulUrge === 11 || soulUrge === 22 || soulUrge === 33) {
      luckyNumbers.push(soulUrge)
    }
    
    // Add complementary numbers
    const complementary = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const uniqueNumbers = [...new Set(luckyNumbers)]
    
    return uniqueNumbers.sort((a, b) => a - b)
  }

  /**
   * Check Compatibility
   */
  static checkCompatibility(number1: number, number2: number): {
    compatibility: number
    description: string
    advice: string[]
  } {
    const compatibleNumbers: Record<number, number[]> = {
      1: [1, 5, 7],
      2: [2, 4, 8],
      3: [3, 6, 9],
      4: [2, 4, 8],
      5: [1, 5, 7],
      6: [3, 6, 9],
      7: [1, 5, 7],
      8: [2, 4, 8],
      9: [3, 6, 9],
      11: [11, 22, 33],
      22: [11, 22, 33],
      33: [11, 22, 33]
    }
    
    const compatible = compatibleNumbers[number1]?.includes(number2) || false
    const sameNumber = number1 === number2
    
    let compatibility = 50
    let description = ''
    let advice: string[] = []
    
    if (sameNumber) {
      compatibility = 90
      description = `Strong compatibility - both are ${number1}`
      advice = [
        'You share similar vibrational energy',
        'Understand each other\'s motivations',
        'Balance your similar traits'
      ]
    } else if (compatible) {
      compatibility = 80
      description = `Good compatibility between ${number1} and ${number2}`
      advice = [
        'Your numbers are naturally compatible',
        'Focus on your shared values',
        'Communicate openly about differences'
      ]
    } else {
      compatibility = 40
      description = `Challenging but potentially rewarding relationship`
      advice = [
        'Learn from each other\'s differences',
        'Focus on complementary strengths',
        'Practice patience and understanding'
      ]
    }
    
    return {
      compatibility,
      description,
      advice
    }
  }

  /**
   * Generate Complete Numerology Analysis
   */
  static generateCompleteAnalysis(userData: {
    fullName: string
    birthDate: string
    currentName?: string
  }): NumerologyData {
    const lifePath = this.calculateLifePath(userData.birthDate)
    const destiny = this.calculateDestiny(userData.fullName)
    const soulUrge = this.calculateSoulUrge(userData.fullName)
    const personality = this.calculatePersonality(userData.fullName)
    const birthday = this.calculateBirthday(userData.birthDate)
    const maturity = this.calculateMaturity(lifePath, destiny)
    const currentName = userData.currentName ? this.calculateCurrentName(userData.currentName) : destiny
    const dailyNumber = this.calculateDailyNumber(new Date())
    
    // Identify master numbers
    const masterNumbers = [lifePath, destiny, soulUrge, personality, maturity, currentName]
      .filter(num => num === 11 || num === 22 || num === 33)
      .filter((num, index, arr) => arr.indexOf(num) === index)
    
    const luckyNumbers = this.generateLuckyNumbers(lifePath, destiny, soulUrge)
    
    // Generate compatibility data
    const compatibility = {
      compatibleNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => 
        this.checkCompatibility(lifePath, num).compatibility > 70
      ),
      challengingNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => 
        this.checkCompatibility(lifePath, num).compatibility < 50
      ),
      neutralNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => {
        const comp = this.checkCompatibility(lifePath, num)
        return comp.compatibility >= 50 && comp.compatibility <= 70
      })
    }
    
    return {
      lifePath,
      destiny,
      soulUrge,
      personality,
      birthday,
      maturity,
      currentName,
      masterNumbers,
      luckyNumbers,
      dailyNumber,
      compatibility,
      careerGuidance: this.generateCareerGuidance(lifePath),
      relationshipAdvice: this.generateRelationshipAdvice(lifePath),
      spiritualGuidance: this.generateSpiritualGuidance(lifePath),
      healthAdvice: this.generateHealthAdvice(lifePath)
    }
  }

  /**
   * Generate Career Guidance
   */
  private static generateCareerGuidance(lifePath: number): string[] {
    const careerMap: Record<number, string[]> = {
      1: ['Leadership', 'Entrepreneurship', 'Innovation', 'Independence', 'Management'],
      2: ['Partnership', 'Diplomacy', 'Counseling', 'Support', 'Cooperation'],
      3: ['Art', 'Communication', 'Entertainment', 'Teaching', 'Creative'],
      4: ['Construction', 'Organization', 'Management', 'Engineering', 'Administration'],
      5: ['Travel', 'Sales', 'Communication', 'Adventure', 'Marketing'],
      6: ['Parenting', 'Healing', 'Counseling', 'Service', 'Education'],
      7: ['Research', 'Spirituality', 'Analysis', 'Teaching', 'Philosophy'],
      8: ['Business', 'Leadership', 'Finance', 'Management', 'Real Estate'],
      9: ['Service', 'Healing', 'Teaching', 'Humanitarianism', 'Counseling'],
      11: ['Spiritual Teaching', 'Healing', 'Counseling', 'Art', 'Inspiration'],
      22: ['Architecture', 'Engineering', 'Leadership', 'Entrepreneurship', 'Building'],
      33: ['Teaching', 'Healing', 'Counseling', 'Parenting', 'Mentoring']
    }
    
    return careerMap[lifePath] || []
  }

  /**
   * Generate Relationship Advice
   */
  private static generateRelationshipAdvice(lifePath: number): string[] {
    const relationshipMap: Record<number, string[]> = {
      1: [
        'Take leadership in relationships',
        'Allow your partner independence',
        'Communicate your needs clearly'
      ],
      2: [
        'Focus on partnership and cooperation',
        'Balance giving and receiving',
        'Practice patience and understanding'
      ],
      3: [
        'Express your feelings creatively',
        'Maintain communication and fun',
        'Share your artistic interests'
      ],
      4: [
        'Build stable foundations',
        'Show your love through practical support',
        'Be patient with your partner\'s growth'
      ],
      5: [
        'Maintain freedom within the relationship',
        'Share adventures and experiences',
        'Communicate your changing interests'
      ],
      6: [
        'Focus on nurturing and caring',
        'Balance responsibility with fun',
        'Show your love through service'
      ],
      7: [
        'Maintain spiritual connection',
        'Respect your partner\'s need for space',
        'Share your wisdom and insights'
      ],
      8: [
        'Balance material and emotional needs',
        'Show your love through achievement',
        'Be patient with your partner\'s growth'
      ],
      9: [
        'Focus on universal love and service',
        'Balance giving with receiving',
        'Share your humanitarian interests'
      ],
      11: [
        'Maintain spiritual connection',
        'Share your intuitive insights',
        'Support your partner\'s spiritual growth'
      ],
      22: [
        'Build together for the future',
        'Share your practical vision',
        'Support your partner\'s goals'
      ],
      33: [
        'Focus on teaching and healing',
        'Share your compassion and wisdom',
        'Support your partner\'s growth'
      ]
    }
    
    return relationshipMap[lifePath] || []
  }

  /**
   * Generate Spiritual Guidance
   */
  private static generateSpiritualGuidance(lifePath: number): string[] {
    const spiritualMap: Record<number, string[]> = {
      1: [
        'Develop leadership with compassion',
        'Channel your energy into positive action',
        'Practice humility alongside confidence'
      ],
      2: [
        'Practice cooperation and harmony',
        'Develop intuition and sensitivity',
        'Cultivate patience and understanding'
      ],
      3: [
        'Use your creativity for good',
        'Express your joy and optimism',
        'Share your artistic gifts'
      ],
      4: [
        'Build a solid spiritual foundation',
        'Practice discipline and organization',
        'Develop practical wisdom'
      ],
      5: [
        'Embrace change and freedom',
        'Seek spiritual adventure',
        'Develop adaptability'
      ],
      6: [
        'Practice love and service',
        'Develop nurturing and caring',
        'Cultivate responsibility'
      ],
      7: [
        'Seek spiritual wisdom',
        'Practice meditation and introspection',
        'Develop intuitive abilities'
      ],
      8: [
        'Balance material and spiritual',
        'Use your power wisely',
        'Practice generosity and sharing'
      ],
      9: [
        'Practice universal love',
        'Develop compassion and understanding',
        'Serve humanity'
      ],
      11: [
        'Develop spiritual gifts',
        'Practice meditation and intuition',
        'Share your spiritual insights'
      ],
      22: [
        'Build spiritual foundations',
        'Practice practical spirituality',
        'Use your gifts for humanity'
      ],
      33: [
        'Develop spiritual teaching',
        'Practice compassion and healing',
        'Share your spiritual wisdom'
      ]
    }
    
    return spiritualMap[lifePath] || []
  }

  /**
   * Generate Health Advice
   */
  private static generateHealthAdvice(lifePath: number): string[] {
    const healthMap: Record<number, string[]> = {
      1: [
        'Focus on cardiovascular health',
        'Engage in regular exercise',
        'Manage stress through physical activity'
      ],
      2: [
        'Pay attention to emotional health',
        'Practice relaxation techniques',
        'Maintain balanced relationships'
      ],
      3: [
        'Focus on throat and respiratory health',
        'Engage in creative activities',
        'Practice positive thinking'
      ],
      4: [
        'Focus on bone and joint health',
        'Maintain a structured routine',
        'Practice stress management'
      ],
      5: [
        'Focus on nervous system health',
        'Engage in varied activities',
        'Practice flexibility and adaptability'
      ],
      6: [
        'Focus on heart and circulatory health',
        'Practice self-care and nurturing',
        'Maintain emotional balance'
      ],
      7: [
        'Focus on mental and spiritual health',
        'Practice meditation and introspection',
        'Maintain quiet time for reflection'
      ],
      8: [
        'Focus on digestive and elimination health',
        'Practice stress management',
        'Maintain work-life balance'
      ],
      9: [
        'Focus on immune system health',
        'Practice compassion and service',
        'Maintain emotional boundaries'
      ],
      11: [
        'Focus on nervous system health',
        'Practice meditation and relaxation',
        'Maintain spiritual balance'
      ],
      22: [
        'Focus on overall physical health',
        'Practice stress management',
        'Maintain work-life balance'
      ],
      33: [
        'Focus on emotional and spiritual health',
        'Practice compassion and service',
        'Maintain emotional boundaries'
      ]
    }
    
    return healthMap[lifePath] || []
  }

  /**
   * Get Master Number Information
   */
  static getMasterNumberInfo(number: number): MasterNumberData | null {
    return this.masterNumbers[number] || null
  }

  /**
   * Get Number Meaning
   */
  static getNumberMeaning(number: number): any {
    return this.numberMeanings[number] || null
  }

  /**
   * Check if a number is a Master Number
   */
  static isMasterNumber(number: number): boolean {
    return number === 11 || number === 22 || number === 33
  }

  /**
   * Get all Master Numbers
   */
  static getAllMasterNumbers(): Record<number, MasterNumberData> {
    return this.masterNumbers
  }
}

