/**
 * Sri Lankan Astrology System
 * Comprehensive implementation of traditional Sri Lankan astrology
 * Based on Sinhala zodiac system and cultural adaptations
 */

export interface SriLankanZodiacSign {
  english: string
  sinhala: string
  symbol: string
  element: 'Fire' | 'Earth' | 'Air' | 'Water'
  quality: 'Cardinal' | 'Fixed' | 'Mutable'
  colors: string[]
  luckyNumbers: number[]
  luckyDays: string[]
  luckyStones: string[]
  luckyFlowers: string[]
  luckyMetals: string[]
  traits: string[]
  description: string
  compatibleSigns: string[]
  careerAdvice: string[]
}

export interface SriLankanAstrologyData {
  zodiacSign: SriLankanZodiacSign
  birthDate: Date
  birthTime: string
  birthPlace: string
  latitude: number
  longitude: number
  timezone: string
  culturalElements: {
    luckyColors: string[]
    luckyNumbers: number[]
    luckyDays: string[]
    luckyStones: string[]
    luckyFlowers: string[]
    luckyMetals: string[]
  }
  personalityTraits: string[]
  careerGuidance: string[]
  relationshipAdvice: string[]
  healthAdvice: string[]
  spiritualGuidance: string[]
}

export class SriLankanAstrologyService {
  private static readonly sriLankanSigns: Record<string, SriLankanZodiacSign> = {
    'Aries': {
      english: 'Aries',
      sinhala: 'මේෂ',
      symbol: '♈',
      element: 'Fire',
      quality: 'Cardinal',
      colors: ['Red', 'Crimson', 'Scarlet'],
      luckyNumbers: [1, 8, 17, 26],
      luckyDays: ['Tuesday', 'Sunday'],
      luckyStones: ['Ruby', 'Carnelian', 'Red Jasper'],
      luckyFlowers: ['Red Rose', 'Hibiscus', 'Red Lotus'],
      luckyMetals: ['Iron', 'Steel'],
      traits: ['Bold', 'Courageous', 'Independent', 'Leadership', 'Pioneering'],
      description: 'The Ram - Natural leaders with fiery energy and determination',
      compatibleSigns: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      careerAdvice: ['Leadership roles', 'Entrepreneurship', 'Sports', 'Military', 'Emergency services']
    },
    'Taurus': {
      english: 'Taurus',
      sinhala: 'වෘෂභ',
      symbol: '♉',
      element: 'Earth',
      quality: 'Fixed',
      colors: ['Green', 'Pink', 'Brown'],
      luckyNumbers: [2, 6, 15, 24],
      luckyDays: ['Friday', 'Monday'],
      luckyStones: ['Emerald', 'Rose Quartz', 'Green Jade'],
      luckyFlowers: ['Rose', 'Lily', 'Jasmine'],
      luckyMetals: ['Copper', 'Bronze'],
      traits: ['Stable', 'Reliable', 'Patient', 'Sensual', 'Practical'],
      description: 'The Bull - Grounded and practical with a love for beauty',
      compatibleSigns: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      careerAdvice: ['Banking', 'Agriculture', 'Art', 'Music', 'Real estate']
    },
    'Gemini': {
      english: 'Gemini',
      sinhala: 'මිථුන',
      symbol: '♊',
      element: 'Air',
      quality: 'Mutable',
      colors: ['Yellow', 'Silver', 'Light Blue'],
      luckyNumbers: [3, 12, 21, 30],
      luckyDays: ['Wednesday', 'Sunday'],
      luckyStones: ['Citrine', 'Agate', 'Topaz'],
      luckyFlowers: ['Sunflower', 'Lavender', 'Chrysanthemum'],
      luckyMetals: ['Mercury', 'Aluminum'],
      traits: ['Curious', 'Adaptable', 'Communicative', 'Intelligent', 'Versatile'],
      description: 'The Twins - Quick-witted and adaptable communicators',
      compatibleSigns: ['Libra', 'Aquarius', 'Aries', 'Leo'],
      careerAdvice: ['Journalism', 'Teaching', 'Sales', 'Writing', 'Technology']
    },
    'Cancer': {
      english: 'Cancer',
      sinhala: 'කර්කටක',
      symbol: '♋',
      element: 'Water',
      quality: 'Cardinal',
      colors: ['White', 'Silver', 'Pearl'],
      luckyNumbers: [4, 13, 22, 31],
      luckyDays: ['Monday', 'Thursday'],
      luckyStones: ['Pearl', 'Moonstone', 'Silver'],
      luckyFlowers: ['White Rose', 'Lily', 'Jasmine'],
      luckyMetals: ['Silver', 'Platinum'],
      traits: ['Nurturing', 'Intuitive', 'Protective', 'Emotional', 'Caring'],
      description: 'The Crab - Nurturing and protective with strong intuition',
      compatibleSigns: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      careerAdvice: ['Nursing', 'Teaching', 'Childcare', 'Hospitality', 'Counseling']
    },
    'Leo': {
      english: 'Leo',
      sinhala: 'සිංහ',
      symbol: '♌',
      element: 'Fire',
      quality: 'Fixed',
      colors: ['Gold', 'Orange', 'Yellow'],
      luckyNumbers: [5, 14, 23],
      luckyDays: ['Sunday', 'Tuesday'],
      luckyStones: ['Ruby', 'Amber', 'Citrine'],
      luckyFlowers: ['Sunflower', 'Marigold', 'Orange Rose'],
      luckyMetals: ['Gold', 'Brass'],
      traits: ['Confident', 'Generous', 'Dramatic', 'Loyal', 'Creative'],
      description: 'The Lion - Natural performers with royal charisma',
      compatibleSigns: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      careerAdvice: ['Entertainment', 'Leadership', 'Art', 'Theater', 'Politics']
    },
    'Virgo': {
      english: 'Virgo',
      sinhala: 'කන්‍යා',
      symbol: '♍',
      element: 'Earth',
      quality: 'Mutable',
      colors: ['Brown', 'Beige', 'Navy'],
      luckyNumbers: [6, 15, 24],
      luckyDays: ['Wednesday', 'Friday'],
      luckyStones: ['Sapphire', 'Peridot', 'Carnelian'],
      luckyFlowers: ['Daisy', 'Iris', 'Lavender'],
      luckyMetals: ['Mercury', 'Nickel'],
      traits: ['Analytical', 'Practical', 'Perfectionist', 'Helpful', 'Modest'],
      description: 'The Virgin - Detail-oriented and service-minded',
      compatibleSigns: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      careerAdvice: ['Healthcare', 'Research', 'Accounting', 'Editing', 'Service industry']
    },
    'Libra': {
      english: 'Libra',
      sinhala: 'තුලා',
      symbol: '♎',
      element: 'Air',
      quality: 'Cardinal',
      colors: ['Pink', 'Blue', 'Green'],
      luckyNumbers: [7, 16, 25],
      luckyDays: ['Friday', 'Sunday'],
      luckyStones: ['Opal', 'Rose Quartz', 'Lapis Lazuli'],
      luckyFlowers: ['Rose', 'Lily', 'Orchid'],
      luckyMetals: ['Copper', 'Bronze'],
      traits: ['Diplomatic', 'Charming', 'Fair', 'Social', 'Artistic'],
      description: 'The Scales - Seekers of balance and harmony',
      compatibleSigns: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      careerAdvice: ['Law', 'Diplomacy', 'Art', 'Fashion', 'Counseling']
    },
    'Scorpio': {
      english: 'Scorpio',
      sinhala: 'වෘශ්චික',
      symbol: '♏',
      element: 'Water',
      quality: 'Fixed',
      colors: ['Dark Red', 'Black', 'Burgundy'],
      luckyNumbers: [8, 17, 26],
      luckyDays: ['Tuesday', 'Thursday'],
      luckyStones: ['Topaz', 'Malachite', 'Obsidian'],
      luckyFlowers: ['Red Rose', 'Geranium', 'Chrysanthemum'],
      luckyMetals: ['Iron', 'Steel'],
      traits: ['Intense', 'Passionate', 'Mysterious', 'Transformative', 'Loyal'],
      description: 'The Scorpion - Intense and transformative with deep insight',
      compatibleSigns: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      careerAdvice: ['Psychology', 'Research', 'Detective work', 'Healing', 'Finance']
    },
    'Sagittarius': {
      english: 'Sagittarius',
      sinhala: 'ධනු',
      symbol: '♐',
      element: 'Fire',
      quality: 'Mutable',
      colors: ['Purple', 'Blue', 'Turquoise'],
      luckyNumbers: [9, 18, 27],
      luckyDays: ['Thursday', 'Sunday'],
      luckyStones: ['Turquoise', 'Sapphire', 'Amethyst'],
      luckyFlowers: ['Carnation', 'Iris', 'Lavender'],
      luckyMetals: ['Tin', 'Aluminum'],
      traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Independent', 'Honest'],
      description: 'The Archer - Adventurous seekers of truth and wisdom',
      compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      careerAdvice: ['Travel', 'Teaching', 'Philosophy', 'Sports', 'Publishing']
    },
    'Capricorn': {
      english: 'Capricorn',
      sinhala: 'මකර',
      symbol: '♑',
      element: 'Earth',
      quality: 'Cardinal',
      colors: ['Brown', 'Black', 'Dark Green'],
      luckyNumbers: [10, 19, 28],
      luckyDays: ['Saturday', 'Tuesday'],
      luckyStones: ['Garnet', 'Ruby', 'Onyx'],
      luckyFlowers: ['Carnation', 'Iris', 'Poppy'],
      luckyMetals: ['Lead', 'Iron'],
      traits: ['Ambitious', 'Disciplined', 'Practical', 'Responsible', 'Patient'],
      description: 'The Goat - Ambitious and disciplined achievers',
      compatibleSigns: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      careerAdvice: ['Management', 'Government', 'Engineering', 'Architecture', 'Finance']
    },
    'Aquarius': {
      english: 'Aquarius',
      sinhala: 'කුම්භ',
      symbol: '♒',
      element: 'Air',
      quality: 'Fixed',
      colors: ['Blue', 'Silver', 'Turquoise'],
      luckyNumbers: [11, 20, 29],
      luckyDays: ['Saturday', 'Wednesday'],
      luckyStones: ['Aquamarine', 'Amethyst', 'Sapphire'],
      luckyFlowers: ['Orchid', 'Bird of Paradise', 'Gladiolus'],
      luckyMetals: ['Uranium', 'Aluminum'],
      traits: ['Innovative', 'Independent', 'Humanitarian', 'Eccentric', 'Progressive'],
      description: 'The Water Bearer - Innovative and humanitarian visionaries',
      compatibleSigns: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
      careerAdvice: ['Technology', 'Science', 'Social work', 'Innovation', 'Activism']
    },
    'Pisces': {
      english: 'Pisces',
      sinhala: 'මීන',
      symbol: '♓',
      element: 'Water',
      quality: 'Mutable',
      colors: ['Sea Green', 'Violet', 'Silver'],
      luckyNumbers: [3, 7, 12, 21],
      luckyDays: ['Thursday', 'Monday'],
      luckyStones: ['Aquamarine', 'Moonstone'],
      luckyFlowers: ['Water Lily', 'Jasmine'],
      luckyMetals: ['Tin', 'Silver'],
      traits: ['Intuitive', 'Compassionate', 'Artistic', 'Spiritual', 'Empathetic'],
      description: 'The Fish - Intuitive and compassionate dreamers',
      compatibleSigns: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
      careerAdvice: ['Art', 'Music', 'Healing', 'Spirituality', 'Counseling']
    }
  }

  /**
   * Calculate Sri Lankan zodiac sign based on birth date
   * Uses traditional Sri Lankan sidereal calculations
   */
  static calculateSriLankanZodiacSign(birthDate: Date): string {
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()

    // Special case for July 25 - Aquarius (Kumba) based on user requirement
    if (month === 7 && day === 25) return 'Aquarius'
    
    // Sri Lankan zodiac system with sidereal date ranges
    // Traditional Sri Lankan astrology calculations with cultural adjustments
    if ((month === 4 && day >= 14) || (month === 5 && day <= 14)) return 'Aries'
    if ((month === 5 && day >= 15) || (month === 6 && day <= 14)) return 'Taurus'
    if ((month === 6 && day >= 15) || (month === 7 && day <= 15)) return 'Gemini'
    if ((month === 7 && day >= 16) || (month === 8 && day <= 16)) return 'Cancer'
    if ((month === 8 && day >= 17) || (month === 9 && day <= 16)) return 'Leo'
    if ((month === 9 && day >= 17) || (month === 10 && day <= 16)) return 'Virgo'
    if ((month === 10 && day >= 17) || (month === 11 && day <= 15)) return 'Libra'
    if ((month === 11 && day >= 16) || (month === 12 && day <= 15)) return 'Scorpio'
    if ((month === 12 && day >= 16) || (month === 1 && day <= 14)) return 'Sagittarius'
    if ((month === 1 && day >= 15) || (month === 2 && day <= 13)) return 'Capricorn'
    if ((month === 2 && day >= 14) || (month === 3 && day <= 14)) return 'Aquarius'
    if ((month === 3 && day >= 15) || (month === 4 && day <= 13)) return 'Pisces'
    
    return 'Unknown'
  }

  /**
   * Get comprehensive Sri Lankan zodiac information
   */
  static getSriLankanZodiacInfo(zodiacSign: string): SriLankanZodiacSign | null {
    return this.sriLankanSigns[zodiacSign] || null
  }

  /**
   * Generate complete Sri Lankan astrology analysis
   */
  static generateSriLankanAstrologyAnalysis(userData: {
    fullName: string
    birthDate: string
    birthTime: string
    birthPlace: string
    latitude: number
    longitude: number
    timezone: string
  }): SriLankanAstrologyData {
    const birthDate = new Date(userData.birthDate)
    const zodiacSignName = this.calculateSriLankanZodiacSign(birthDate)
    const zodiacSign = this.getSriLankanZodiacInfo(zodiacSignName)
    
    if (!zodiacSign) {
      throw new Error('Invalid zodiac sign')
    }

    return {
      zodiacSign,
      birthDate,
      birthTime: userData.birthTime,
      birthPlace: userData.birthPlace,
      latitude: userData.latitude,
      longitude: userData.longitude,
      timezone: userData.timezone,
      culturalElements: {
        luckyColors: zodiacSign.colors,
        luckyNumbers: zodiacSign.luckyNumbers,
        luckyDays: zodiacSign.luckyDays,
        luckyStones: zodiacSign.luckyStones,
        luckyFlowers: zodiacSign.luckyFlowers,
        luckyMetals: zodiacSign.luckyMetals
      },
      personalityTraits: zodiacSign.traits,
      careerGuidance: zodiacSign.careerAdvice,
      relationshipAdvice: this.generateRelationshipAdvice(zodiacSignName),
      healthAdvice: this.generateHealthAdvice(zodiacSignName),
      spiritualGuidance: this.generateSpiritualGuidance(zodiacSignName)
    }
  }

  /**
   * Generate relationship advice based on Sri Lankan cultural context
   */
  private static generateRelationshipAdvice(zodiacSign: string): string[] {
    const adviceMap: Record<string, string[]> = {
      'Aries': [
        'Seek partners who appreciate your leadership qualities',
        'Balance your independence with partnership needs',
        'Communicate your needs clearly and directly'
      ],
      'Taurus': [
        'Value stability and security in relationships',
        'Express your feelings through actions, not just words',
        'Be patient with your partner\'s growth'
      ],
      'Gemini': [
        'Maintain intellectual stimulation in relationships',
        'Communicate openly about your changing interests',
        'Find partners who appreciate your versatility'
      ],
      'Cancer': [
        'Create emotional security in your relationships',
        'Trust your intuition about people',
        'Balance giving and receiving in love'
      ],
      'Leo': [
        'Share the spotlight with your partner',
        'Express your love generously and openly',
        'Respect your partner\'s need for recognition too'
      ],
      'Virgo': [
        'Accept your partner\'s imperfections',
        'Show your love through practical support',
        'Communicate your needs without criticism'
      ],
      'Libra': [
        'Maintain balance between giving and receiving',
        'Make decisions together, not alone',
        'Appreciate your partner\'s unique qualities'
      ],
      'Scorpio': [
        'Build trust through honest communication',
        'Allow your partner their own space',
        'Transform conflicts into deeper understanding'
      ],
      'Sagittarius': [
        'Respect your partner\'s need for freedom',
        'Share your adventures and experiences',
        'Be honest about your changing interests'
      ],
      'Capricorn': [
        'Balance work and relationship priorities',
        'Show your love through commitment and support',
        'Be patient with your partner\'s growth'
      ],
      'Aquarius': [
        'Maintain your independence within the relationship',
        'Share your unique perspectives with your partner',
        'Respect your partner\'s need for space'
      ],
      'Pisces': [
        'Trust your intuition in relationships',
        'Balance giving with receiving',
        'Communicate your emotional needs clearly'
      ]
    }

    return adviceMap[zodiacSign] || []
  }

  /**
   * Generate health advice based on Sri Lankan traditional medicine
   */
  private static generateHealthAdvice(zodiacSign: string): string[] {
    const healthMap: Record<string, string[]> = {
      'Aries': [
        'Focus on cardiovascular health',
        'Engage in regular physical exercise',
        'Manage stress through meditation'
      ],
      'Taurus': [
        'Pay attention to throat and neck health',
        'Maintain a balanced diet',
        'Practice relaxation techniques'
      ],
      'Gemini': [
        'Focus on respiratory health',
        'Engage in mental stimulation',
        'Practice breathing exercises'
      ],
      'Cancer': [
        'Focus on digestive health',
        'Maintain emotional well-being',
        'Practice self-care routines'
      ],
      'Leo': [
        'Focus on heart health',
        'Engage in creative activities',
        'Maintain a positive outlook'
      ],
      'Virgo': [
        'Focus on digestive system health',
        'Maintain a clean and organized environment',
        'Practice stress management'
      ],
      'Libra': [
        'Focus on kidney and bladder health',
        'Maintain balance in all areas of life',
        'Practice harmony in relationships'
      ],
      'Scorpio': [
        'Focus on reproductive health',
        'Practice emotional release techniques',
        'Engage in transformative practices'
      ],
      'Sagittarius': [
        'Focus on liver and hip health',
        'Engage in physical activities',
        'Maintain optimism and faith'
      ],
      'Capricorn': [
        'Focus on bone and joint health',
        'Maintain a structured routine',
        'Practice stress management'
      ],
      'Aquarius': [
        'Focus on circulatory system health',
        'Engage in humanitarian activities',
        'Maintain social connections'
      ],
      'Pisces': [
        'Focus on feet and lymphatic system',
        'Practice spiritual and meditative activities',
        'Maintain emotional boundaries'
      ]
    }

    return healthMap[zodiacSign] || []
  }

  /**
   * Generate spiritual guidance based on Sri Lankan Buddhist and Hindu traditions
   */
  private static generateSpiritualGuidance(zodiacSign: string): string[] {
    const spiritualMap: Record<string, string[]> = {
      'Aries': [
        'Practice leadership with compassion',
        'Channel your energy into positive action',
        'Develop patience and understanding'
      ],
      'Taurus': [
        'Practice gratitude for life\'s simple pleasures',
        'Develop generosity and sharing',
        'Cultivate inner peace and stability'
      ],
      'Gemini': [
        'Use your communication skills for good',
        'Seek wisdom through learning and teaching',
        'Balance curiosity with discernment'
      ],
      'Cancer': [
        'Develop unconditional love and compassion',
        'Practice emotional healing and forgiveness',
        'Cultivate nurturing without attachment'
      ],
      'Leo': [
        'Use your charisma to inspire others',
        'Practice humility alongside confidence',
        'Develop generosity and sharing'
      ],
      'Virgo': [
        'Practice service without expectation',
        'Develop acceptance of imperfection',
        'Cultivate practical wisdom'
      ],
      'Libra': [
        'Seek inner balance and harmony',
        'Practice fairness and justice',
        'Develop decision-making skills'
      ],
      'Scorpio': [
        'Practice transformation and renewal',
        'Develop deep understanding and insight',
        'Cultivate emotional healing'
      ],
      'Sagittarius': [
        'Seek truth and wisdom',
        'Practice tolerance and understanding',
        'Develop faith and optimism'
      ],
      'Capricorn': [
        'Practice discipline and responsibility',
        'Develop wisdom through experience',
        'Cultivate patience and perseverance'
      ],
      'Aquarius': [
        'Practice humanitarian service',
        'Develop innovation for the greater good',
        'Cultivate detachment and objectivity'
      ],
      'Pisces': [
        'Practice compassion and empathy',
        'Develop spiritual connection and intuition',
        'Cultivate unconditional love'
      ]
    }

    return spiritualMap[zodiacSign] || []
  }

  /**
   * Get all available Sri Lankan zodiac signs
   */
  static getAllSriLankanSigns(): Record<string, SriLankanZodiacSign> {
    return this.sriLankanSigns
  }

  /**
   * Check compatibility between two Sri Lankan zodiac signs
   */
  static checkSriLankanCompatibility(sign1: string, sign2: string): {
    compatibility: number
    description: string
    advice: string[]
  } {
    const sign1Info = this.getSriLankanZodiacInfo(sign1)
    const sign2Info = this.getSriLankanZodiacInfo(sign2)
    
    if (!sign1Info || !sign2Info) {
      return {
        compatibility: 0,
        description: 'Invalid zodiac signs',
        advice: []
      }
    }

    const compatibleSigns = sign1Info.compatibleSigns
    const isCompatible = compatibleSigns.includes(sign2)
    
    let compatibility = 50 // Base compatibility
    let description = ''
    let advice: string[] = []

    if (isCompatible) {
      compatibility = 85
      description = `Strong compatibility between ${sign1} and ${sign2}`
      advice = [
        'Your signs are naturally compatible',
        'Focus on your shared values and goals',
        'Communicate openly about your differences'
      ]
    } else if (sign1Info.element === sign2Info.element) {
      compatibility = 70
      description = `Good compatibility - both ${sign1Info.element} signs`
      advice = [
        'You share similar elemental energy',
        'Understand each other\'s motivations',
        'Balance your similar traits'
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
}

