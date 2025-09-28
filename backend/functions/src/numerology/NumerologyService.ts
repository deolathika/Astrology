export interface NumerologyProfile {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  masterNumbers: number[];
  dailyNumber: number;
  luckyNumbers: number[];
  chaldean?: {
    lifePath: number;
    expression: number;
    soulUrge: number;
    personality: number;
  };
}

export interface NumerologyAnalysis {
  lifePath: {
    number: number;
    meaning: string;
    challenges: string[];
    opportunities: string[];
    guidance: string;
  };
  expression: {
    number: number;
    meaning: string;
    careerPath: string;
    talents: string[];
    challenges: string[];
  };
  soulUrge: {
    number: number;
    meaning: string;
    heartDesires: string[];
    emotionalNeeds: string[];
    spiritualYearnings: string[];
  };
  personality: {
    number: number;
    meaning: string;
    outerImage: string;
    firstImpression: string;
    hiddenAspects: string[];
  };
  personalYear: {
    number: number;
    theme: string;
    focus: string;
    challenges: string[];
    opportunities: string[];
  };
}

export class NumerologyService {
  private static readonly PYTHAGOREAN_MAP: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };

  private static readonly CHALDEAN_MAP: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5, 'I': 1,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 1, 'R': 2,
    'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5, 'Y': 1, 'Z': 7
  };

  private static readonly VOWELS = ['A', 'E', 'I', 'O', 'U'];

  /**
   * Calculate comprehensive numerology profile
   */
  static calculateProfile(
    fullName: string,
    birthDate: Date,
    useChaldean: boolean = false
  ): NumerologyProfile {
    const cleanName = this.sanitizeName(fullName);
    const map = useChaldean ? this.CHALDEAN_MAP : this.PYTHAGOREAN_MAP;
    
    const lifePath = this.calculateLifePath(birthDate);
    const expression = this.calculateExpression(cleanName, map);
    const soulUrge = this.calculateSoulUrge(cleanName, map);
    const personality = this.calculatePersonality(cleanName, map);
    const dailyNumber = this.calculateDailyNumber(new Date());
    const luckyNumbers = this.calculateLuckyNumbers(birthDate, cleanName);
    
    const masterNumbers = this.extractMasterNumbers([
      lifePath, expression, soulUrge, personality
    ]);
    
    let chaldean;
    if (!useChaldean) {
      const chaldeanMap = this.CHALDEAN_MAP;
      chaldean = {
        lifePath: this.calculateLifePath(birthDate),
        expression: this.calculateExpression(cleanName, chaldeanMap),
        soulUrge: this.calculateSoulUrge(cleanName, chaldeanMap),
        personality: this.calculatePersonality(cleanName, chaldeanMap)
      };
    }
    
    return {
      lifePath,
      expression,
      soulUrge,
      personality,
      masterNumbers,
      dailyNumber,
      luckyNumbers,
      chaldean
    };
  }

  /**
   * Generate detailed numerology analysis
   */
  static generateAnalysis(profile: NumerologyProfile, currentYear: number): NumerologyAnalysis {
    return {
      lifePath: this.getLifePathAnalysis(profile.lifePath),
      expression: this.getExpressionAnalysis(profile.expression),
      soulUrge: this.getSoulUrgeAnalysis(profile.soulUrge),
      personality: this.getPersonalityAnalysis(profile.personality),
      personalYear: this.getPersonalYearAnalysis(profile.lifePath, currentYear)
    };
  }

  private static sanitizeName(name: string): string {
    return name
      .toUpperCase()
      .replace(/[^A-Z\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private static calculateLifePath(birthDate: Date): number {
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();
    
    let sum = day + month + year;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = this.reduceNumber(sum);
    }
    
    return sum;
  }

  private static calculateExpression(name: string, map: { [key: string]: number }): number {
    let sum = 0;
    for (const char of name.replace(/\s/g, '')) {
      sum += map[char] || 0;
    }
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = this.reduceNumber(sum);
    }
    
    return sum;
  }

  private static calculateSoulUrge(name: string, map: { [key: string]: number }): number {
    let sum = 0;
    for (const char of name.replace(/\s/g, '')) {
      if (this.VOWELS.includes(char)) {
        sum += map[char] || 0;
      }
    }
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = this.reduceNumber(sum);
    }
    
    return sum;
  }

  private static calculatePersonality(name: string, map: { [key: string]: number }): number {
    let sum = 0;
    for (const char of name.replace(/\s/g, '')) {
      if (!this.VOWELS.includes(char)) {
        sum += map[char] || 0;
      }
    }
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = this.reduceNumber(sum);
    }
    
    return sum;
  }

  private static calculateDailyNumber(date: Date): number {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    let sum = day + month + year;
    while (sum > 9) {
      sum = this.reduceNumber(sum);
    }
    
    return sum;
  }

  private static calculateLuckyNumbers(birthDate: Date, name: string): number[] {
    const seed = birthDate.getTime() + name.length;
    const numbers: number[] = [];
    
    for (let i = 0; i < 3; i++) {
      const num = (Math.floor(Math.sin(seed + i) * 1000) % 9) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    
    return numbers;
  }

  private static extractMasterNumbers(numbers: number[]): number[] {
    return numbers.filter(num => num === 11 || num === 22 || num === 33);
  }

  private static reduceNumber(num: number): number {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  private static getLifePathAnalysis(number: number): any {
    const meanings = {
      1: {
        meaning: 'Leadership and innovation - you are here to lead and inspire others',
        challenges: ['Learning to lead without dominating others', 'Developing patience and humility'],
        opportunities: ['Leadership roles', 'Entrepreneurship', 'Pioneering new ideas'],
        guidance: 'Trust your leadership abilities and take initiative in your life'
      },
      2: {
        meaning: 'Cooperation and harmony - you are here to bring people together',
        challenges: ['Balancing cooperation with personal needs', 'Avoiding codependency'],
        opportunities: ['Partnerships', 'Diplomatic roles', 'Healing professions'],
        guidance: 'Develop your intuitive and cooperative nature while maintaining balance'
      },
      3: {
        meaning: 'Creative expression and communication - you are here to inspire through art and words',
        challenges: ['Focusing creative energy', 'Avoiding superficiality and gossip'],
        opportunities: ['Arts and entertainment', 'Communication', 'Teaching and writing'],
        guidance: 'Express your creativity and use your communication gifts to inspire others'
      },
      4: {
        meaning: 'Building foundations and stability - you are here to create lasting structures',
        challenges: ['Maintaining flexibility while building stability', 'Avoiding rigidity'],
        opportunities: ['Construction and organization', 'Management', 'Practical skills'],
        guidance: 'Build solid foundations and use your practical nature to create lasting success'
      },
      5: {
        meaning: 'Freedom and adventure - you are here to experience and share life\'s diversity',
        challenges: ['Balancing freedom with responsibility', 'Avoiding restlessness'],
        opportunities: ['Travel and adventure', 'Sales and marketing', 'Freedom-based careers'],
        guidance: 'Embrace change and use your versatility to experience life fully'
      },
      6: {
        meaning: 'Nurturing and service - you are here to care for and support others',
        challenges: ['Caring for others without losing yourself', 'Avoiding perfectionism'],
        opportunities: ['Teaching and healing', 'Family services', 'Community work'],
        guidance: 'Focus on service and use your nurturing nature to help others grow'
      },
      7: {
        meaning: 'Spiritual wisdom and introspection - you are here to seek and share truth',
        challenges: ['Sharing wisdom without being judgmental', 'Avoiding isolation'],
        opportunities: ['Research and spirituality', 'Analysis and investigation', 'Healing'],
        guidance: 'Develop your spiritual awareness and share your wisdom with others'
      },
      8: {
        meaning: 'Material success and authority - you are here to achieve and lead in business',
        challenges: ['Using power wisely', 'Avoiding materialism and control issues'],
        opportunities: ['Business and finance', 'Management', 'Authority positions'],
        guidance: 'Use your power wisely and create material success through ethical means'
      },
      9: {
        meaning: 'Universal love and humanitarianism - you are here to serve humanity',
        challenges: ['Serving others without martyrdom', 'Avoiding self-righteousness'],
        opportunities: ['Humanitarian work', 'Healing and teaching', 'Global service'],
        guidance: 'Serve humanity and use your compassion to make a global impact'
      },
      11: {
        meaning: 'Spiritual enlightenment and inspiration - you are here to inspire others spiritually',
        challenges: ['Balancing spiritual ideals with practical reality'],
        opportunities: ['Spiritual teaching', 'Healing and inspiration', 'Counseling'],
        guidance: 'Trust your intuition and use your spiritual gifts to inspire others'
      },
      22: {
        meaning: 'Master builder and practical idealism - you are here to manifest grand visions',
        challenges: ['Managing grand visions with daily responsibilities'],
        opportunities: ['Large-scale projects', 'Architecture', 'Global impact'],
        guidance: 'Think big and use your practical idealism to manifest grand visions'
      },
      33: {
        meaning: 'Master teacher and spiritual healer - you are here to heal and teach humanity',
        challenges: ['Balancing spiritual service with personal needs'],
        opportunities: ['Spiritual healing', 'Teaching', 'Humanitarian leadership'],
        guidance: 'Use your spiritual gifts to heal and teach humanity'
      }
    };
    
    return meanings[number] || meanings[1];
  }

  private static getExpressionAnalysis(number: number): any {
    const meanings = {
      1: {
        meaning: 'Natural leader with strong will and determination',
        careerPath: 'Leadership, entrepreneurship, management, pioneering',
        talents: ['Leadership', 'Innovation', 'Courage', 'Independence'],
        challenges: ['Learning to work with others', 'Developing patience']
      },
      2: {
        meaning: 'Diplomatic and cooperative with strong intuition',
        careerPath: 'Partnerships, counseling, healing, diplomacy',
        talents: ['Cooperation', 'Intuition', 'Diplomacy', 'Sensitivity'],
        challenges: ['Balancing personal needs', 'Avoiding codependency']
      },
      3: {
        meaning: 'Creative and expressive with natural communication skills',
        careerPath: 'Arts, entertainment, communication, teaching',
        talents: ['Creativity', 'Communication', 'Optimism', 'Artistic ability'],
        challenges: ['Focusing energy', 'Avoiding superficiality']
      },
      4: {
        meaning: 'Practical and reliable with strong organizational skills',
        careerPath: 'Construction, organization, management, practical fields',
        talents: ['Reliability', 'Organization', 'Patience', 'Practicality'],
        challenges: ['Maintaining flexibility', 'Avoiding rigidity']
      },
      5: {
        meaning: 'Adventurous and versatile with natural communication skills',
        careerPath: 'Travel, sales, marketing, adventure, freedom-based work',
        talents: ['Versatility', 'Adaptability', 'Communication', 'Freedom'],
        challenges: ['Balancing freedom with responsibility', 'Avoiding restlessness']
      },
      6: {
        meaning: 'Nurturing and responsible with strong service orientation',
        careerPath: 'Teaching, healing, family services, community work',
        talents: ['Nurturing', 'Responsibility', 'Service', 'Harmony'],
        challenges: ['Caring for others without losing yourself', 'Avoiding perfectionism']
      },
      7: {
        meaning: 'Spiritual and analytical with deep wisdom',
        careerPath: 'Research, spirituality, analysis, investigation',
        talents: ['Wisdom', 'Spirituality', 'Analysis', 'Intuition'],
        challenges: ['Sharing wisdom without judgment', 'Avoiding isolation']
      },
      8: {
        meaning: 'Ambitious and powerful with natural business acumen',
        careerPath: 'Business, finance, management, authority positions',
        talents: ['Power', 'Authority', 'Organization', 'Ambition'],
        challenges: ['Using power wisely', 'Avoiding materialism']
      },
      9: {
        meaning: 'Compassionate and wise with humanitarian spirit',
        careerPath: 'Humanitarian work, healing, teaching, global service',
        talents: ['Compassion', 'Wisdom', 'Service', 'Humanitarianism'],
        challenges: ['Serving others without martyrdom', 'Avoiding self-righteousness']
      }
    };
    
    return meanings[number] || meanings[1];
  }

  private static getSoulUrgeAnalysis(number: number): any {
    const meanings = {
      1: {
        meaning: 'Desires independence, leadership, and recognition',
        heartDesires: ['To lead and inspire others', 'To be recognized for achievements', 'To be independent'],
        emotionalNeeds: ['Recognition', 'Independence', 'Respect', 'Admiration'],
        spiritualYearnings: ['To understand divine purpose', 'To lead others spiritually']
      },
      2: {
        meaning: 'Desires love, harmony, and emotional connection',
        heartDesires: ['To be loved and appreciated', 'To create harmony in relationships', 'To feel emotionally secure'],
        emotionalNeeds: ['Love', 'Appreciation', 'Harmony', 'Emotional security'],
        spiritualYearnings: ['To find unity with the divine', 'To bring peace to the world']
      },
      3: {
        meaning: 'Desires creative expression and social recognition',
        heartDesires: ['To express yourself creatively', 'To be admired for talents', 'To inspire others'],
        emotionalNeeds: ['Admiration', 'Creative expression', 'Joy', 'Social connection'],
        spiritualYearnings: ['To express the divine through creativity', 'To inspire through communication']
      },
      4: {
        meaning: 'Desires stability, security, and lasting foundations',
        heartDesires: ['To build something lasting', 'To be respected for reliability', 'To create security'],
        emotionalNeeds: ['Stability', 'Respect', 'Security', 'Emotional grounding'],
        spiritualYearnings: ['To build a spiritual foundation', 'To serve the divine order']
      },
      5: {
        meaning: 'Desires freedom, adventure, and new experiences',
        heartDesires: ['To be free and adventurous', 'To experience life\'s diversity', 'To explore new horizons'],
        emotionalNeeds: ['Freedom', 'Variety', 'Excitement', 'Emotional stimulation'],
        spiritualYearnings: ['To experience the divine through freedom', 'To explore spiritual adventures']
      },
      6: {
        meaning: 'Desires to nurture, care for others, and create loving relationships',
        heartDesires: ['To nurture and care for others', 'To create a loving home', 'To help others grow'],
        emotionalNeeds: ['Love', 'Nurturing', 'Family connection', 'Emotional security'],
        spiritualYearnings: ['To serve the divine through love', 'To nurture spiritual growth in others']
      },
      7: {
        meaning: 'Desires spiritual understanding, wisdom, and truth',
        heartDesires: ['To understand life\'s mysteries', 'To find spiritual truth', 'To share wisdom'],
        emotionalNeeds: ['Understanding', 'Spiritual connection', 'Emotional depth', 'Solitude'],
        spiritualYearnings: ['To know the divine through wisdom', 'To seek spiritual truth']
      },
      8: {
        meaning: 'Desires material success, power, and authority',
        heartDesires: ['To achieve material success', 'To have power and authority', 'To create lasting impact'],
        emotionalNeeds: ['Respect', 'Power', 'Emotional control', 'Material security'],
        spiritualYearnings: ['To manifest the divine through material success', 'To use power for good']
      },
      9: {
        meaning: 'Desires to serve humanity and make a positive impact',
        heartDesires: ['To serve humanity', 'To make a positive impact', 'To help others grow'],
        emotionalNeeds: ['Love for humanity', 'Emotional fulfillment through service', 'Universal connection'],
        spiritualYearnings: ['To serve the divine through universal love', 'To make a global spiritual impact']
      }
    };
    
    return meanings[number] || meanings[1];
  }

  private static getPersonalityAnalysis(number: number): any {
    const meanings = {
      1: {
        meaning: 'Confident, independent, and leader-like',
        outerImage: 'Strong, determined, natural leader',
        firstImpression: 'Confident, assertive, inspiring',
        hiddenAspects: ['Vulnerability', 'Need for support', 'Fear of failure']
      },
      2: {
        meaning: 'Gentle, cooperative, and diplomatic',
        outerImage: 'Kind, peaceful, harmonious',
        firstImpression: 'Gentle, caring, peacemaker',
        hiddenAspects: ['Personal needs', 'Assertiveness', 'Independence']
      },
      3: {
        meaning: 'Creative, expressive, and optimistic',
        outerImage: 'Artistic, inspiring, joyful',
        firstImpression: 'Creative, expressive, inspiring',
        hiddenAspects: ['Deeper emotions', 'Seriousness', 'Vulnerability']
      },
      4: {
        meaning: 'Reliable, practical, and organized',
        outerImage: 'Dependable, hardworking, stable',
        firstImpression: 'Reliable, practical, trustworthy',
        hiddenAspects: ['Creativity', 'Flexibility', 'Emotional expression']
      },
      5: {
        meaning: 'Adventurous, versatile, and free-spirited',
        outerImage: 'Exciting, dynamic, independent',
        firstImpression: 'Adventurous, exciting, free-spirited',
        hiddenAspects: ['Commitment fears', 'Emotional depth', 'Stability needs']
      },
      6: {
        meaning: 'Caring, nurturing, and responsible',
        outerImage: 'Loving, protective, supportive',
        firstImpression: 'Caring, nurturing, responsible',
        hiddenAspects: ['Personal needs', 'Independence', 'Self-care']
      },
      7: {
        meaning: 'Wise, mysterious, and spiritual',
        outerImage: 'Deep, thoughtful, enigmatic',
        firstImpression: 'Wise, mysterious, spiritual',
        hiddenAspects: ['Emotional needs', 'Social connection', 'Practicality']
      },
      8: {
        meaning: 'Powerful, successful, and authoritative',
        outerImage: 'Strong, confident, successful',
        firstImpression: 'Powerful, successful, authoritative',
        hiddenAspects: ['Spiritual yearnings', 'Emotional vulnerability', 'Humility']
      },
      9: {
        meaning: 'Compassionate, wise, and humanitarian',
        outerImage: 'Caring, wise, universal',
        firstImpression: 'Compassionate, wise, humanitarian',
        hiddenAspects: ['Personal desires', 'Emotional needs', 'Self-care']
      }
    };
    
    return meanings[number] || meanings[1];
  }

  private static getPersonalYearAnalysis(lifePath: number, currentYear: number): any {
    const personalYear = this.calculatePersonalYear(lifePath, currentYear);
    
    const meanings = {
      1: {
        theme: 'New beginnings, leadership, independence, fresh starts',
        focus: 'Taking initiative, starting new projects, leading others',
        challenges: ['Learning to lead without dominating', 'Developing patience'],
        opportunities: ['Leadership roles', 'New beginnings', 'Pioneering projects']
      },
      2: {
        theme: 'Cooperation, partnerships, patience, harmony',
        focus: 'Building partnerships, developing patience, cooperation',
        challenges: ['Balancing cooperation with personal needs', 'Avoiding codependency'],
        opportunities: ['Partnerships', 'Diplomatic roles', 'Healing professions']
      },
      3: {
        theme: 'Creativity, communication, self-expression, joy',
        focus: 'Creative expression, communication, social connections',
        challenges: ['Focusing creative energy', 'Avoiding superficiality'],
        opportunities: ['Creative projects', 'Communication', 'Entertainment']
      },
      4: {
        theme: 'Building foundations, hard work, stability, organization',
        focus: 'Building foundations, hard work, organization, stability',
        challenges: ['Maintaining flexibility while building stability'],
        opportunities: ['Building projects', 'Organization', 'Practical skills']
      },
      5: {
        theme: 'Change, freedom, adventure, versatility',
        focus: 'Embracing change, seeking freedom, adventure, versatility',
        challenges: ['Balancing freedom with responsibility', 'Avoiding restlessness'],
        opportunities: ['Travel', 'Adventure', 'New experiences', 'Freedom']
      },
      6: {
        theme: 'Responsibility, service, family, nurturing',
        focus: 'Service to others, family responsibilities, nurturing',
        challenges: ['Caring for others without losing yourself'],
        opportunities: ['Service opportunities', 'Family growth', 'Healing']
      },
      7: {
        theme: 'Spiritual growth, introspection, wisdom, analysis',
        focus: 'Spiritual growth, introspection, wisdom, analysis',
        challenges: ['Sharing wisdom without being judgmental'],
        opportunities: ['Spiritual growth', 'Research', 'Wisdom', 'Analysis']
      },
      8: {
        theme: 'Material success, power, authority, achievement',
        focus: 'Material success, power, authority, achievement',
        challenges: ['Using power wisely', 'Avoiding materialism'],
        opportunities: ['Business success', 'Material achievement', 'Power']
      },
      9: {
        theme: 'Completion, service, humanitarianism, wisdom',
        focus: 'Completion, service, humanitarianism, wisdom',
        challenges: ['Serving others without martyrdom'],
        opportunities: ['Humanitarian work', 'Service', 'Global impact']
      }
    };
    
    return meanings[personalYear] || meanings[1];
  }

  private static calculatePersonalYear(lifePath: number, currentYear: number): number {
    let sum = lifePath + currentYear;
    while (sum > 9) {
      sum = this.reduceNumber(sum);
    }
    return sum;
  }
}
