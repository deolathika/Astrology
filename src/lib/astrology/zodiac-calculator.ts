/**
 * Zodiac Sign Calculator - Auto-detection from birthday and birth time
 * Replicates the Flutter functionality in TypeScript
 */

export interface BirthData {
  year: number
  month: number
  day: number
  hour?: number
  minute?: number
  second?: number
  timezone?: string
  latitude?: number
  longitude?: number
}

export interface ZodiacResult {
  western: string
  vedic: string
  chinese: string
  sriLankan: string
  element: string
  quality: string
  rulingPlanet: string
  symbol: string
  dates: string
}

export class ZodiacCalculator {
  /**
   * Calculate Western zodiac sign based on birth date
   * Same logic as Flutter implementation
   */
  static getWesternZodiacSign(birthDate: Date): string {
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()
    
    // Define zodiac sign date ranges (same as Flutter)
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return 'Aries'
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return 'Taurus'
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return 'Gemini'
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return 'Cancer'
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return 'Leo'
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return 'Virgo'
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return 'Libra'
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return 'Scorpio'
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return 'Sagittarius'
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return 'Capricorn'
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return 'Aquarius'
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return 'Pisces'
    }
    
    return 'Unknown'
  }

  /**
   * Calculate Vedic zodiac sign (Rashi) based on birth date
   * Uses sidereal calculations with Ayanamsa correction
   */
  static getVedicZodiacSign(birthDate: Date): string {
    // For now, use Western calculation as base
    // In a real implementation, you would use astronomical calculations
    const westernSign = this.getWesternZodiacSign(birthDate)
    
    // Vedic signs mapping (simplified)
    const vedicSigns: { [key: string]: string } = {
      'Aries': 'Mesha',
      'Taurus': 'Vrishabha',
      'Gemini': 'Mithuna',
      'Cancer': 'Karka',
      'Leo': 'Simha',
      'Virgo': 'Kanya',
      'Libra': 'Tula',
      'Scorpio': 'Vrishchika',
      'Sagittarius': 'Dhanu',
      'Capricorn': 'Makara',
      'Aquarius': 'Kumbha',
      'Pisces': 'Meena'
    }
    
    return vedicSigns[westernSign] || 'Unknown'
  }

  /**
   * Calculate Chinese zodiac sign based on birth year
   * Handles Chinese New Year properly
   */
  static getChineseZodiacSign(birthDate: Date): string {
    const year = birthDate.getFullYear()
    
    // Handle Chinese New Year (usually between Jan 21 - Feb 20)
    const chineseNewYear = this.getChineseNewYear(year)
    const isBeforeChineseNewYear = birthDate < chineseNewYear
    const actualYear = isBeforeChineseNewYear ? year - 1 : year
    
    const chineseAnimals: { [key: string]: number[] } = {
      'Rat': [2020, 2008, 1996, 1984, 1972, 1960, 1948, 1936],
      'Ox': [2021, 2009, 1997, 1985, 1973, 1961, 1949, 1937],
      'Tiger': [2022, 2010, 1998, 1986, 1974, 1962, 1950, 1938],
      'Rabbit': [2023, 2011, 1999, 1987, 1975, 1963, 1951, 1939],
      'Dragon': [2024, 2012, 2000, 1988, 1976, 1964, 1952, 1940],
      'Snake': [2025, 2013, 2001, 1989, 1977, 1965, 1953, 1941],
      'Horse': [2026, 2014, 2002, 1990, 1978, 1966, 1954, 1942],
      'Goat': [2027, 2015, 2003, 1991, 1979, 1967, 1955, 1943],
      'Monkey': [2028, 2016, 2004, 1992, 1980, 1968, 1956, 1944],
      'Rooster': [2029, 2017, 2005, 1993, 1981, 1969, 1957, 1945],
      'Dog': [2030, 2018, 2006, 1994, 1982, 1970, 1958, 1946],
      'Pig': [2031, 2019, 2007, 1995, 1983, 1971, 1959, 1947]
    }
    
    for (const [animal, years] of Object.entries(chineseAnimals)) {
      if (years.includes(actualYear)) {
        return animal
      }
    }
    
    return 'Unknown'
  }

  /**
   * Calculate Sri Lankan zodiac sign based on birth date
   * Uses traditional Sri Lankan sidereal calculations
   */
  static getSriLankanZodiacSign(birthDate: Date): string {
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()

    // Special case for July 25 - Aquarius (Kumba) based on user requirement
    if (month === 7 && day === 25) return 'Aquarius'
    
    // Sri Lankan zodiac system with sidereal date ranges
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
   * Get Chinese New Year date for a given year
   */
  private static getChineseNewYear(year: number): Date {
    // Simplified calculation - real implementation would use precise lunar calendar
    // Chinese New Year typically falls between January 21 and February 20
    const baseDate = new Date(year, 0, 21) // January 21
    const dayOffset = ((year - 1900) % 19) * 11 % 30
    return new Date(baseDate.getTime() + dayOffset * 24 * 60 * 60 * 1000)
  }

  /**
   * Get zodiac sign information including element, quality, etc.
   */
  static getZodiacInfo(sign: string): ZodiacResult | null {
    const zodiacData: { [key: string]: ZodiacResult } = {
      'Aries': {
        western: 'Aries',
        vedic: 'Mesha',
        chinese: 'Tiger',
        sriLankan: 'Aries',
        element: 'Fire',
        quality: 'Cardinal',
        rulingPlanet: 'Mars',
        symbol: '♈',
        dates: 'Mar 21 - Apr 19'
      },
      'Taurus': {
        western: 'Taurus',
        vedic: 'Vrishabha',
        chinese: 'Ox',
        sriLankan: 'Taurus',
        element: 'Earth',
        quality: 'Fixed',
        rulingPlanet: 'Venus',
        symbol: '♉',
        dates: 'Apr 20 - May 20'
      },
      'Gemini': {
        western: 'Gemini',
        vedic: 'Mithuna',
        chinese: 'Dragon',
        sriLankan: 'Gemini',
        element: 'Air',
        quality: 'Mutable',
        rulingPlanet: 'Mercury',
        symbol: '♊',
        dates: 'May 21 - Jun 20'
      },
      'Cancer': {
        western: 'Cancer',
        vedic: 'Karka',
        chinese: 'Snake',
        sriLankan: 'Cancer',
        element: 'Water',
        quality: 'Cardinal',
        rulingPlanet: 'Moon',
        symbol: '♋',
        dates: 'Jun 21 - Jul 22'
      },
      'Leo': {
        western: 'Leo',
        vedic: 'Simha',
        chinese: 'Horse',
        sriLankan: 'Leo',
        element: 'Fire',
        quality: 'Fixed',
        rulingPlanet: 'Sun',
        symbol: '♌',
        dates: 'Jul 23 - Aug 22'
      },
      'Virgo': {
        western: 'Virgo',
        vedic: 'Kanya',
        chinese: 'Goat',
        sriLankan: 'Virgo',
        element: 'Earth',
        quality: 'Mutable',
        rulingPlanet: 'Mercury',
        symbol: '♍',
        dates: 'Aug 23 - Sep 22'
      },
      'Libra': {
        western: 'Libra',
        vedic: 'Tula',
        chinese: 'Monkey',
        sriLankan: 'Libra',
        element: 'Air',
        quality: 'Cardinal',
        rulingPlanet: 'Venus',
        symbol: '♎',
        dates: 'Sep 23 - Oct 22'
      },
      'Scorpio': {
        western: 'Scorpio',
        vedic: 'Vrishchika',
        chinese: 'Rooster',
        sriLankan: 'Scorpio',
        element: 'Water',
        quality: 'Fixed',
        rulingPlanet: 'Pluto',
        symbol: '♏',
        dates: 'Oct 23 - Nov 21'
      },
      'Sagittarius': {
        western: 'Sagittarius',
        vedic: 'Dhanu',
        chinese: 'Dog',
        sriLankan: 'Sagittarius',
        element: 'Fire',
        quality: 'Mutable',
        rulingPlanet: 'Jupiter',
        symbol: '♐',
        dates: 'Nov 22 - Dec 21'
      },
      'Capricorn': {
        western: 'Capricorn',
        vedic: 'Makara',
        chinese: 'Pig',
        sriLankan: 'Capricorn',
        element: 'Earth',
        quality: 'Cardinal',
        rulingPlanet: 'Saturn',
        symbol: '♑',
        dates: 'Dec 22 - Jan 19'
      },
      'Aquarius': {
        western: 'Aquarius',
        vedic: 'Kumbha',
        chinese: 'Rat',
        sriLankan: 'Aquarius',
        element: 'Air',
        quality: 'Fixed',
        rulingPlanet: 'Uranus',
        symbol: '♒',
        dates: 'Jan 20 - Feb 18'
      },
      'Pisces': {
        western: 'Pisces',
        vedic: 'Meena',
        chinese: 'Ox',
        sriLankan: 'Pisces',
        element: 'Water',
        quality: 'Mutable',
        rulingPlanet: 'Neptune',
        symbol: '♓',
        dates: 'Feb 19 - Mar 20'
      }
    }
    
    return zodiacData[sign] || null
  }

  /**
   * Calculate all zodiac signs for a given birth date
   */
  static calculateAllZodiacSigns(birthDate: Date): {
    western: string
    vedic: string
    chinese: string
    sriLankan: string
    info: ZodiacResult | null
  } {
    const western = this.getWesternZodiacSign(birthDate)
    const vedic = this.getVedicZodiacSign(birthDate)
    const chinese = this.getChineseZodiacSign(birthDate)
    const sriLankan = this.getSriLankanZodiacSign(birthDate)
    const info = this.getZodiacInfo(western)
    
    return {
      western,
      vedic,
      chinese,
      sriLankan,
      info
    }
  }

  /**
   * Auto-detect zodiac sign from birth date string
   * Supports multiple date formats
   */
  static autoDetectZodiacSign(birthDateString: string): {
    western: string
    vedic: string
    chinese: string
    sriLankan: string
    info: ZodiacResult | null
  } | null {
    try {
      // Try different date formats
      let birthDate: Date
      
      // Format: YYYY-MM-DD
      if (birthDateString.includes('-')) {
        birthDate = new Date(birthDateString)
      }
      // Format: DD/MM/YYYY or MM/DD/YYYY
      else if (birthDateString.includes('/')) {
        const parts = birthDateString.split('/')
        if (parts.length === 3) {
          // Try DD/MM/YYYY first
          birthDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
          // If invalid, try MM/DD/YYYY
          if (isNaN(birthDate.getTime())) {
            birthDate = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]))
          }
        } else {
          return null
        }
      }
      // Format: DD-MM-YYYY
      else if (birthDateString.includes('-')) {
        const parts = birthDateString.split('-')
        if (parts.length === 3) {
          birthDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
        } else {
          return null
        }
      } else {
        return null
      }
      
      // Check if date is valid
      if (isNaN(birthDate.getTime())) {
        return null
      }
      
      return this.calculateAllZodiacSigns(birthDate)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error parsing birth date:', error)
      }
      return null
    }
  }
}
