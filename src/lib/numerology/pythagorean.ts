/**
 * Pythagorean Numerology System for Daily Secrets
 * Implements the traditional Pythagorean numerology calculations
 */

export interface PythagoreanResult {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  maturity: number;
  challenge: number;
  pinnacles: number[];
  interpretations: {
    lifePath: string;
    destiny: string;
    soulUrge: string;
    personality: string;
    birthday: string;
    maturity: string;
    challenge: string;
    pinnacles: string[];
  };
  accuracy: number;
  timestamp: Date;
}

export interface PythagoreanCompatibility {
  overall: number;
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  interpretation: string;
}

class PythagoreanNumerologyService {
  private accuracy: number = 100; // 100% accuracy for calculations
  private cache: Map<string, any> = new Map();
  private cacheTimeout: number = 24 * 60 * 60 * 1000; // 24 hours

  // Pythagorean letter values
  private readonly letterValues: Record<string, number> = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };

  /**
   * Calculate complete Pythagorean numerology reading
   */
  async calculateFullReading(
    fullName: string,
    birthDate: Date
  ): Promise<PythagoreanResult> {
    const cacheKey = `pythagorean_${fullName}_${birthDate.toISOString()}`;
    
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
      const maturity = this.calculateMaturity(lifePath, destiny);
      const challenge = this.calculateChallenge(birthDate);
      const pinnacles = this.calculatePinnacles(birthDate);

      // Get interpretations
      const interpretations = {
        lifePath: this.getLifePathInterpretation(lifePath),
        destiny: this.getDestinyInterpretation(destiny),
        soulUrge: this.getSoulUrgeInterpretation(soulUrge),
        personality: this.getPersonalityInterpretation(personality),
        birthday: this.getBirthdayInterpretation(birthday),
        maturity: this.getMaturityInterpretation(maturity),
        challenge: this.getChallengeInterpretation(challenge),
        pinnacles: pinnacles.map(p => this.getPinnacleInterpretation(p))
      };

      const result: PythagoreanResult = {
        lifePath,
        destiny,
        soulUrge,
        personality,
        birthday,
        maturity,
        challenge,
        pinnacles,
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
      console.error('Pythagorean calculation error:', error);
      throw new Error('Failed to calculate Pythagorean numerology');
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
   * Calculate Maturity Number
   */
  calculateMaturity(lifePath: number, destiny: number): number {
    return this.reduceToSingleDigit(lifePath + destiny);
  }

  /**
   * Calculate Challenge Number
   */
  calculateChallenge(birthDate: Date): number {
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    const daySum = this.reduceToSingleDigit(day);
    const monthSum = this.reduceToSingleDigit(month);
    const yearSum = this.reduceToSingleDigit(year);

    return Math.abs(daySum - monthSum);
  }

  /**
   * Calculate Pinnacle Numbers
   */
  calculatePinnacles(birthDate: Date): number[] {
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    const firstPinnacle = this.reduceToSingleDigit(day + month);
    const secondPinnacle = this.reduceToSingleDigit(day + year);
    const thirdPinnacle = this.reduceToSingleDigit(firstPinnacle + secondPinnacle);
    const fourthPinnacle = this.reduceToSingleDigit(month + year);

    return [firstPinnacle, secondPinnacle, thirdPinnacle, fourthPinnacle];
  }

  /**
   * Calculate compatibility between two people
   */
  async calculateCompatibility(
    person1: { fullName: string; birthDate: Date },
    person2: { fullName: string; birthDate: Date }
  ): Promise<PythagoreanCompatibility> {
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

  private getMaturityInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'In maturity, you will become a confident leader and pioneer.',
      2: 'In maturity, you will become a diplomatic peacemaker and collaborator.',
      3: 'In maturity, you will become a creative artist and communicator.',
      4: 'In maturity, you will become a practical builder and organizer.',
      5: 'In maturity, you will become an adventurous explorer and teacher.',
      6: 'In maturity, you will become a nurturing caregiver and healer.',
      7: 'In maturity, you will become a spiritual teacher and philosopher.',
      8: 'In maturity, you will become a successful business leader and achiever.',
      9: 'In maturity, you will become a humanitarian leader and healer.',
      11: 'In maturity, you will become an inspirational spiritual leader.',
      22: 'In maturity, you will become a master builder and visionary.',
      33: 'In maturity, you will become a master teacher and healer.'
    };

    return interpretations[number] || 'Your maturity number reveals your potential in later life.';
  }

  private getChallengeInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      0: 'Your challenge is to develop self-confidence and independence.',
      1: 'Your challenge is to balance independence with cooperation.',
      2: 'Your challenge is to develop patience and diplomacy.',
      3: 'Your challenge is to express creativity while staying grounded.',
      4: 'Your challenge is to build stability while remaining flexible.',
      5: 'Your challenge is to embrace change while maintaining focus.',
      6: 'Your challenge is to balance responsibility with personal needs.',
      7: 'Your challenge is to seek truth while staying practical.',
      8: 'Your challenge is to achieve success while remaining ethical.',
      9: 'Your challenge is to serve others while caring for yourself.'
    };

    return interpretations[number] || 'Your challenge number reveals the lessons you need to learn.';
  }

  private getPinnacleInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: 'This pinnacle period brings opportunities for leadership and independence.',
      2: 'This pinnacle period brings opportunities for cooperation and partnership.',
      3: 'This pinnacle period brings opportunities for creativity and expression.',
      4: 'This pinnacle period brings opportunities for building and organizing.',
      5: 'This pinnacle period brings opportunities for adventure and change.',
      6: 'This pinnacle period brings opportunities for nurturing and responsibility.',
      7: 'This pinnacle period brings opportunities for spiritual growth and wisdom.',
      8: 'This pinnacle period brings opportunities for material success and achievement.',
      9: 'This pinnacle period brings opportunities for humanitarian service.',
      11: 'This pinnacle period brings opportunities for spiritual inspiration.',
      22: 'This pinnacle period brings opportunities for master building.',
      33: 'This pinnacle period brings opportunities for master teaching.'
    };

    return interpretations[number] || 'This pinnacle period brings unique opportunities for growth.';
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
export const pythagoreanNumerologyService = new PythagoreanNumerologyService();
export default pythagoreanNumerologyService;

