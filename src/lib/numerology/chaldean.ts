/**
 * Chaldean Numerology System for Daily Secrets
 * Implements the traditional Chaldean numerology calculations
 */

export interface ChaldeanResult {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  karmicDebt: number[];
  masterNumbers: number[];
  interpretations: {
    lifePath: string;
    destiny: string;
    soulUrge: string;
    personality: string;
    birthday: string;
    karmicDebt: string[];
    masterNumbers: string[];
  };
  accuracy: number;
  timestamp: Date;
}

export interface ChaldeanCompatibility {
  overall: number;
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  interpretation: string;
}

class ChaldeanNumerologyService {
  private accuracy: number = 100; // 100% accuracy for calculations
  private cache: Map<string, any> = new Map();
  private cacheTimeout: number = 24 * 60 * 60 * 1000; // 24 hours

  // Chaldean letter values (different from Pythagorean)
  private readonly letterValues: Record<string, number> = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5, 'I': 1,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 1, 'R': 2,
    'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5, 'Y': 1, 'Z': 7
  };

  /**
   * Calculate complete Chaldean numerology reading
   */
  async calculateFullReading(
    fullName: string,
    birthDate: Date
  ): Promise<ChaldeanResult> {
    const cacheKey = `chaldean_${fullName}_${birthDate.toISOString()}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      // Calculate all numbers
      const lifePath = this.calculateLifePath(birthDate);
      const destiny = this.calculateDestiny(fullName);
      const soulUrge = this.calculateSoulUrge(fullName);
      const personality = this.calculatePersonality(fullName);
      const birthday = this.calculateBirthday(birthDate);
      const karmicDebt = this.calculateKarmicDebt(fullName);
      const masterNumbers = this.calculateMasterNumbers(fullName, birthDate);

      // Get interpretations
      const interpretations = {
        lifePath: this.getLifePathInterpretation(lifePath),
        destiny: this.getDestinyInterpretation(destiny),
        soulUrge: this.getSoulUrgeInterpretation(soulUrge),
        personality: this.getPersonalityInterpretation(personality),
        birthday: this.getBirthdayInterpretation(birthday),
        karmicDebt: karmicDebt.map(kd => this.getKarmicDebtInterpretation(kd)),
        masterNumbers: masterNumbers.map(mn => this.getMasterNumberInterpretation(mn))
      };

      const result: ChaldeanResult = {
        lifePath,
        destiny,
        soulUrge,
        personality,
        birthday,
        karmicDebt,
        masterNumbers,
        interpretations,
        accuracy: this.accuracy,
        timestamp: new Date()
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;
    } catch (error) {
      console.error('Chaldean calculation error:', error);
      throw new Error('Failed to calculate Chaldean numerology');
    }
  }

  /**
   * Calculate Life Path Number
   */
  calculateLifePath(birthDate: Date): number {
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    const sum = this.reduceToSingleDigit(day) + this.reduceToSingleDigit(month) + this.reduceToSingleDigit(year);
    return this.reduceToSingleDigit(sum);
  }

  /**
   * Calculate Destiny Number
   */
  calculateDestiny(fullName: string): number {
    const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;

    for (const letter of name) {
      sum += this.letterValues[letter] || 0;
    }

    return this.reduceToSingleDigit(sum);
  }

  /**
   * Calculate Soul Urge Number
   */
  calculateSoulUrge(fullName: string): number {
    const vowels = fullName.toUpperCase().replace(/[^AEIOU]/g, '');
    let sum = 0;

    for (const vowel of vowels) {
      sum += this.letterValues[vowel] || 0;
    }

    return this.reduceToSingleDigit(sum);
  }

  /**
   * Calculate Personality Number
   */
  calculatePersonality(fullName: string): number {
    const consonants = fullName.toUpperCase().replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, '');
    let sum = 0;

    for (const consonant of consonants) {
      sum += this.letterValues[consonant] || 0;
    }

    return this.reduceToSingleDigit(sum);
  }

  /**
   * Calculate Birthday Number
   */
  calculateBirthday(birthDate: Date): number {
    return this.reduceToSingleDigit(birthDate.getDate());
  }

  /**
   * Calculate Karmic Debt Numbers
   */
  calculateKarmicDebt(fullName: string): number[] {
    const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    const karmicDebts: number[] = [];
    
    // Check for karmic debt numbers (13, 14, 16, 19)
    const karmicNumbers = [13, 14, 16, 19];
    
    for (const letter of name) {
      const value = this.letterValues[letter] || 0;
      if (karmicNumbers.includes(value)) {
        karmicDebts.push(value);
      }
    }

    return Array.from(new Set(karmicDebts)); // Remove duplicates
  }

  /**
   * Calculate Master Numbers
   */
  calculateMasterNumbers(fullName: string, birthDate: Date): number[] {
    const masterNumbers: number[] = [];
    
    // Check name for master numbers
    const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    let nameSum = 0;
    for (const letter of name) {
      nameSum += this.letterValues[letter] || 0;
    }
    
    if (nameSum === 11 || nameSum === 22 || nameSum === 33) {
      masterNumbers.push(nameSum);
    }

    // Check birth date for master numbers
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();
    
    const birthSum = this.reduceToSingleDigit(day) + this.reduceToSingleDigit(month) + this.reduceToSingleDigit(year);
    if (birthSum === 11 || birthSum === 22 || birthSum === 33) {
      masterNumbers.push(birthSum);
    }

    return Array.from(new Set(masterNumbers)); // Remove duplicates
  }

  /**
   * Calculate compatibility between two people
   */
  async calculateCompatibility(
    person1: { fullName: string; birthDate: Date },
    person2: { fullName: string; birthDate: Date }
  ): Promise<ChaldeanCompatibility> {
    const reading1 = await this.calculateFullReading(person1.fullName, person1.birthDate);
    const reading2 = await this.calculateFullReading(person2.fullName, person2.birthDate);

    const lifePathCompatibility = this.calculateNumberCompatibility(reading1.lifePath, reading2.lifePath);
    const destinyCompatibility = this.calculateNumberCompatibility(reading1.destiny, reading2.destiny);
    const soulUrgeCompatibility = this.calculateNumberCompatibility(reading1.soulUrge, reading2.soulUrge);
    const personalityCompatibility = this.calculateNumberCompatibility(reading1.personality, reading2.personality);

    const overall = Math.round((lifePathCompatibility + destinyCompatibility + soulUrgeCompatibility + personalityCompatibility) / 4);

    return {
      overall,
      lifePath: lifePathCompatibility,
      destiny: destinyCompatibility,
      soulUrge: soulUrgeCompatibility,
      personality: personalityCompatibility,
      interpretation: this.getCompatibilityInterpretation(overall)
    };
  }

  /**
   * Reduce number to single digit (except master numbers)
   */
  private reduceToSingleDigit(number: number): number {
    if (number === 11 || number === 22 || number === 33) {
      return number; // Master numbers
    }

    while (number > 9) {
      number = Math.floor(number / 10) + (number % 10);
    }

    return number;
  }

  /**
   * Calculate compatibility between two numbers
   */
  private calculateNumberCompatibility(num1: number, num2: number): number {
    const diff = Math.abs(num1 - num2);
    
    if (diff === 0) return 100;
    if (diff === 1) return 90;
    if (diff === 2) return 80;
    if (diff === 3) return 70;
    if (diff === 4) return 60;
    if (diff === 5) return 50;
    if (diff === 6) return 40;
    if (diff === 7) return 30;
    if (diff === 8) return 20;
    return 10;
  }

  // Interpretation methods
  private getLifePathInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'You are a natural leader with strong independence and determination.',
      2: 'You are diplomatic, cooperative, and have a natural ability to work with others.',
      3: 'You are creative, expressive, and have a gift for communication.',
      4: 'You are practical, organized, and have a strong work ethic.',
      5: 'You are adventurous, freedom-loving, and embrace change.',
      6: 'You are nurturing, responsible, and have a strong sense of family.',
      7: 'You are spiritual, analytical, and seek deeper meaning in life.',
      8: 'You are ambitious, materialistic, and have strong business acumen.',
      9: 'You are humanitarian, compassionate, and seek to help others.',
      11: 'You are intuitive, inspirational, and have spiritual gifts.',
      22: 'You are a master builder with the ability to manifest dreams into reality.',
      33: 'You are a master teacher with the ability to inspire and heal others.'
    };

    return interpretations[number] || 'Your life path number reveals your unique journey and purpose.';
  }

  private getDestinyInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'Your destiny is to lead and inspire others through your independence.',
      2: 'Your destiny is to bring harmony and cooperation to the world.',
      3: 'Your destiny is to express creativity and bring joy to others.',
      4: 'Your destiny is to build and organize systems that benefit society.',
      5: 'Your destiny is to experience life fully and share your adventures.',
      6: 'Your destiny is to nurture and care for others.',
      7: 'Your destiny is to seek truth and share spiritual wisdom.',
      8: 'Your destiny is to achieve material success and help others prosper.',
      9: 'Your destiny is to serve humanity and make a positive impact.',
      11: 'Your destiny is to inspire others through your spiritual insights.',
      22: 'Your destiny is to build something lasting that benefits many.',
      33: 'Your destiny is to teach and heal others through your wisdom.'
    };

    return interpretations[number] || 'Your destiny number reveals your life purpose and mission.';
  }

  private getSoulUrgeInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'Your soul craves independence and the ability to lead.',
      2: 'Your soul craves partnership and harmonious relationships.',
      3: 'Your soul craves creative expression and joy.',
      4: 'Your soul craves stability and security.',
      5: 'Your soul craves freedom and new experiences.',
      6: 'Your soul craves love and nurturing relationships.',
      7: 'Your soul craves spiritual understanding and truth.',
      8: 'Your soul craves material success and recognition.',
      9: 'Your soul craves to serve and help others.',
      11: 'Your soul craves spiritual enlightenment and inspiration.',
      22: 'Your soul craves to build something meaningful and lasting.',
      33: 'Your soul craves to teach and heal others.'
    };

    return interpretations[number] || 'Your soul urge number reveals your deepest desires and motivations.';
  }

  private getPersonalityInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'You appear confident, independent, and natural leader.',
      2: 'You appear diplomatic, cooperative, and peace-loving.',
      3: 'You appear creative, expressive, and optimistic.',
      4: 'You appear practical, reliable, and hardworking.',
      5: 'You appear adventurous, dynamic, and freedom-loving.',
      6: 'You appear nurturing, responsible, and family-oriented.',
      7: 'You appear mysterious, analytical, and spiritual.',
      8: 'You appear ambitious, confident, and business-oriented.',
      9: 'You appear wise, compassionate, and humanitarian.',
      11: 'You appear intuitive, inspirational, and spiritually gifted.',
      22: 'You appear masterful, practical, and capable of great achievements.',
      33: 'You appear wise, compassionate, and spiritually evolved.'
    };

    return interpretations[number] || 'Your personality number reveals how others perceive you.';
  }

  private getBirthdayInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'You have natural leadership abilities and independence.',
      2: 'You have diplomatic skills and work well with others.',
      3: 'You have creative talents and communication skills.',
      4: 'You have practical abilities and organizational skills.',
      5: 'You have adventurous spirit and adaptability.',
      6: 'You have nurturing abilities and sense of responsibility.',
      7: 'You have analytical mind and spiritual awareness.',
      8: 'You have business acumen and material success potential.',
      9: 'You have humanitarian instincts and wisdom.',
      11: 'You have intuitive gifts and spiritual insights.',
      22: 'You have master builder abilities and practical wisdom.',
      33: 'You have master teacher abilities and healing gifts.'
    };

    return interpretations[number] || 'Your birthday number reveals your natural talents and abilities.';
  }

  private getKarmicDebtInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      13: 'Karmic debt of laziness - you must learn to work hard and be disciplined.',
      14: 'Karmic debt of excess - you must learn moderation and balance.',
      16: 'Karmic debt of ego - you must learn humility and service to others.',
      19: 'Karmic debt of power - you must learn to use power wisely and for good.'
    };

    return interpretations[number] || 'This karmic debt number reveals lessons you must learn in this lifetime.';
  }

  private getMasterNumberInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      11: 'Master number of intuition and inspiration - you have spiritual gifts.',
      22: 'Master number of the master builder - you can manifest dreams into reality.',
      33: 'Master number of the master teacher - you can inspire and heal others.'
    };

    return interpretations[number] || 'This master number reveals your special spiritual gifts.';
  }

  private getCompatibilityInterpretation(score: number): string {
    if (score >= 90) return 'Excellent compatibility with strong potential for a harmonious relationship.';
    if (score >= 80) return 'Very good compatibility with good potential for a successful relationship.';
    if (score >= 70) return 'Good compatibility with moderate potential for a fulfilling relationship.';
    if (score >= 60) return 'Fair compatibility with some challenges but potential for growth.';
    if (score >= 50) return 'Moderate compatibility with significant differences to work through.';
    return 'Challenging compatibility requiring significant effort and understanding.';
  }
}

// Export singleton instance
export const chaldeanNumerologyService = new ChaldeanNumerologyService();
export default chaldeanNumerologyService;
