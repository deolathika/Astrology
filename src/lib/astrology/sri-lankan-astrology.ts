/**
 * Sri Lankan Astrology System for Daily Secrets
 * Traditional Sri Lankan astrological calculations and interpretations
 */

export interface SriLankanChart {
  lagna: number;
  rasi: number[];
  navamsa: number[];
  dasa: string;
  bhukti: string;
  antardasa: string;
  yogas: string[];
  nakshatras: string[];
  tithi: string;
  karana: string;
  yoga: string;
  karan: string;
  accuracy: number;
  timestamp: Date;
}

export interface SriLankanPlanet {
  name: string;
  rasi: number;
  degree: number;
  nakshatra: string;
  nakshatraLord: string;
  strength: number;
  aspects: number[];
  yogas: string[];
}

export interface SriLankanHouse {
  number: number;
  sign: number;
  lord: string;
  planets: string[];
  aspects: string[];
  strength: number;
}

export interface SriLankanDasa {
  current: string;
  remaining: number;
  next: string;
  startDate: Date;
  endDate: Date;
  bhuktis: Array<{
    name: string;
    startDate: Date;
    endDate: Date;
    remaining: number;
  }>;
}

class SriLankanAstrologyService {
  private accuracy: number = 0.1;
  private cache: Map<string, any> = new Map();
  private cacheTimeout: number = 24 * 60 * 60 * 1000; // 24 hours

  // Sri Lankan astrology constants
  private readonly rasiNames = [
    'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
    'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
  ];

  private readonly nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  private readonly planetNames = [
    'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn',
    'Rahu', 'Ketu'
  ];

  /**
   * Calculate Sri Lankan birth chart
   */
  async calculateSriLankanChart(
    birthDate: Date,
    birthTime: Date,
    location: { latitude: number; longitude: number; timezone: string }
  ): Promise<SriLankanChart> {
    const cacheKey = `sri_lankan_${birthDate.toISOString()}_${birthTime.toISOString()}_${location.latitude}_${location.longitude}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      // Calculate Lagna (Ascendant)
      const lagna = await this.calculateLagna(birthDate, birthTime, location);
      
      // Calculate planetary positions in Rasi
      const rasi = await this.calculateRasiPositions(birthDate, birthTime, location);
      
      // Calculate Navamsa positions
      const navamsa = await this.calculateNavamsaPositions(rasi);
      
      // Calculate Dasa system
      const dasa = await this.calculateDasa(birthDate, birthTime, location);
      
      // Calculate Yogas
      const yogas = await this.calculateYogas(rasi, lagna);
      
      // Calculate Nakshatras
      const nakshatras = await this.calculateNakshatras(rasi);
      
      // Calculate Tithi, Karana, Yoga, Karan
      const tithi = await this.calculateTithi(birthDate, birthTime, location);
      const karana = await this.calculateKarana(tithi);
      const yoga = await this.calculateYoga(birthDate, birthTime, location);
      const karan = await this.calculateKaran(birthDate, birthTime, location);

      const chart: SriLankanChart = {
        lagna,
        rasi,
        navamsa,
        dasa: dasa.current,
        bhukti: dasa.bhuktis[0]?.name || '',
        antardasa: dasa.bhuktis[0]?.name || '',
        yogas,
        nakshatras,
        tithi,
        karana,
        yoga,
        karan,
        accuracy: this.accuracy,
        timestamp: new Date()
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: chart,
        timestamp: Date.now()
      });

      return chart;
    } catch (error) {
      console.error('Sri Lankan chart calculation error:', error);
      throw new Error('Failed to calculate Sri Lankan birth chart');
    }
  }

  /**
   * Calculate Lagna (Ascendant)
   */
  private async calculateLagna(
    birthDate: Date,
    birthTime: Date,
    location: { latitude: number; longitude: number; timezone: string }
  ): Promise<number> {
    // Simplified Lagna calculation
    // In production, this would use proper astronomical calculations
    const hour = birthTime.getHours();
    const minute = birthTime.getMinutes();
    const timeInHours = hour + minute / 60;
    
    // Basic Lagna calculation based on time
    const lagna = (timeInHours * 15) % 360;
    return lagna;
  }

  /**
   * Calculate planetary positions in Rasi
   */
  private async calculateRasiPositions(
    birthDate: Date,
    birthTime: Date,
    location: { latitude: number; longitude: number; timezone: string }
  ): Promise<number[]> {
    // Simplified Rasi calculation
    // In production, this would use proper astronomical calculations
    const positions: number[] = [];
    
    for (let i = 0; i < 9; i++) {
      // Simulate planetary positions
      const position = (Math.random() * 360) % 360;
      positions.push(position);
    }
    
    return positions;
  }

  /**
   * Calculate Navamsa positions
   */
  private async calculateNavamsaPositions(rasi: number[]): Promise<number[]> {
    return rasi.map(position => (position * 9) % 360);
  }

  /**
   * Calculate Dasa system
   */
  private async calculateDasa(
    birthDate: Date,
    birthTime: Date,
    location: { latitude: number; longitude: number; timezone: string }
  ): Promise<SriLankanDasa> {
    // Simplified Dasa calculation
    const current = 'Sun';
    const remaining = 6; // years
    const next = 'Moon';
    
    const startDate = new Date(birthDate);
    const endDate = new Date(birthDate);
    endDate.setFullYear(endDate.getFullYear() + remaining);

    const bhuktis = [
      {
        name: 'Sun',
        startDate: new Date(startDate),
        endDate: new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000),
        remaining: 1
      },
      {
        name: 'Moon',
        startDate: new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000),
        endDate: new Date(startDate.getTime() + 2 * 365 * 24 * 60 * 60 * 1000),
        remaining: 1
      }
    ];

    return {
      current,
      remaining,
      next,
      startDate,
      endDate,
      bhuktis
    };
  }

  /**
   * Calculate Yogas
   */
  private async calculateYogas(rasi: number[], lagna: number): Promise<string[]> {
    const yogas: string[] = [];
    
    // Simplified Yoga calculation
    // In production, this would use proper astrological rules
    if (rasi[0] > 0 && rasi[0] < 30) {
      yogas.push('Surya Yoga');
    }
    if (rasi[1] > 0 && rasi[1] < 30) {
      yogas.push('Chandra Yoga');
    }
    
    return yogas;
  }

  /**
   * Calculate Nakshatras
   */
  private async calculateNakshatras(rasi: number[]): Promise<string[]> {
    return rasi.map(position => {
      const nakshatraIndex = Math.floor(position / 13.33);
      return this.nakshatraNames[nakshatraIndex % this.nakshatraNames.length];
    });
  }

  /**
   * Calculate Tithi
   */
  private async calculateTithi(
    birthDate: Date,
    birthTime: Date,
    location: { latitude: number; longitude: number; timezone: string }
  ): Promise<string> {
    // Simplified Tithi calculation
    const day = birthDate.getDate();
    const tithi = ((day - 1) % 15) + 1;
    return `Tithi ${tithi}`;
  }

  /**
   * Calculate Karana
   */
  private async calculateKarana(tithi: string): Promise<string> {
    // Simplified Karana calculation
    const tithiNum = parseInt(tithi.split(' ')[1]);
    if (tithiNum <= 7) {
      return 'Bava';
    } else if (tithiNum <= 14) {
      return 'Balava';
    } else {
      return 'Kaulava';
    }
  }

  /**
   * Calculate Yoga
   */
  private async calculateYoga(
    birthDate: Date,
    birthTime: Date,
    location: { latitude: number; longitude: number; timezone: string }
  ): Promise<string> {
    // Simplified Yoga calculation
    const day = birthDate.getDate();
    const yoga = ((day - 1) % 27) + 1;
    return `Yoga ${yoga}`;
  }

  /**
   * Calculate Karan
   */
  private async calculateKaran(
    birthDate: Date,
    birthTime: Date,
    location: { latitude: number; longitude: number; timezone: string }
  ): Promise<string> {
    // Simplified Karan calculation
    const hour = birthTime.getHours();
    if (hour < 6) {
      return 'Bava';
    } else if (hour < 12) {
      return 'Balava';
    } else if (hour < 18) {
      return 'Kaulava';
    } else {
      return 'Taitila';
    }
  }

  /**
   * Get Sri Lankan astrological interpretation
   */
  async getInterpretation(chart: SriLankanChart): Promise<{
    general: string;
    personality: string;
    career: string;
    relationships: string;
    health: string;
    spirituality: string;
  }> {
    // Simplified interpretation
    // In production, this would use proper astrological rules and interpretations
    return {
      general: 'Your Sri Lankan birth chart reveals a strong connection to traditional values and spiritual wisdom.',
      personality: 'You possess the qualities of your Lagna sign and are influenced by the planetary positions.',
      career: 'Your career path is guided by the 10th house and its lord, indicating success in your chosen field.',
      relationships: 'Your relationships are influenced by the 7th house and Venus, showing harmony and understanding.',
      health: 'Your health is governed by the 6th house and its lord, indicating good vitality and strength.',
      spirituality: 'Your spiritual path is guided by the 9th house and Jupiter, showing wisdom and enlightenment.'
    };
  }

  /**
   * Calculate compatibility between two charts
   */
  async calculateCompatibility(
    chart1: SriLankanChart,
    chart2: SriLankanChart
  ): Promise<{
    overall: number;
    emotional: number;
    physical: number;
    mental: number;
    spiritual: number;
    interpretation: string;
  }> {
    // Simplified compatibility calculation
    // In production, this would use proper astrological compatibility rules
    const overall = Math.floor(Math.random() * 40) + 60; // 60-100%
    const emotional = Math.floor(Math.random() * 40) + 60;
    const physical = Math.floor(Math.random() * 40) + 60;
    const mental = Math.floor(Math.random() * 40) + 60;
    const spiritual = Math.floor(Math.random() * 40) + 60;

    return {
      overall,
      emotional,
      physical,
      mental,
      spiritual,
      interpretation: 'Your charts show good compatibility with strong potential for a harmonious relationship.'
    };
  }
}

// Export singleton instance
export const sriLankanAstrologyService = new SriLankanAstrologyService();
export default sriLankanAstrologyService;