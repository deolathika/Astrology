import * as swisseph from 'swisseph';

export interface PlanetPosition {
  longitude: number;
  latitude: number;
  distance: number;
  speed: number;
}

export interface HouseCusp {
  cusp: number;
  longitude: number;
}

export interface AstrologyChart {
  planets: {
    sun: PlanetPosition;
    moon: PlanetPosition;
    mercury: PlanetPosition;
    venus: PlanetPosition;
    mars: PlanetPosition;
    jupiter: PlanetPosition;
    saturn: PlanetPosition;
    uranus: PlanetPosition;
    neptune: PlanetPosition;
    pluto: PlanetPosition;
    northNode: PlanetPosition;
    southNode: PlanetPosition;
  };
  houses: {
    ascendant: number;
    mc: number;
    cusps: HouseCusp[];
  };
  sidereal: {
    planets: {
      sun: PlanetPosition;
      moon: PlanetPosition;
      mercury: PlanetPosition;
      venus: PlanetPosition;
      mars: PlanetPosition;
      jupiter: PlanetPosition;
      saturn: PlanetPosition;
      uranus: PlanetPosition;
      neptune: PlanetPosition;
      pluto: PlanetPosition;
      northNode: PlanetPosition;
      southNode: PlanetPosition;
    };
    houses: {
      ascendant: number;
      mc: number;
      cusps: HouseCusp[];
    };
  };
  nakshatra: {
    moon: string;
    pada: number;
    lord: string;
  };
  dasha: {
    current: string;
    sub: string;
    start: Date;
    end: Date;
  };
}

export class EphemerisService {
  private static readonly PLANET_IDS = {
    sun: 0,
    moon: 1,
    mercury: 2,
    venus: 3,
    mars: 4,
    jupiter: 5,
    saturn: 6,
    uranus: 7,
    neptune: 8,
    pluto: 9,
    northNode: 10,
    southNode: 11
  };

  private static readonly AYANAMSHA = {
    LAHIRI: 1,
    KRISHNAMURTI: 5,
    RAMAN: 3
  };

  private static readonly NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha',
    'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  private static readonly NAKSHATRA_LORDS = [
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
    'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus', 'Sun',
    'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
    'Jupiter', 'Saturn', 'Mercury'
  ];

  /**
   * Calculate comprehensive astrology chart
   */
  static calculateChart(
    birthDate: Date,
    latitude: number,
    longitude: number,
    timezone: string,
    ayanamsha: 'LAHIRI' | 'KRISHNAMURTI' | 'RAMAN' = 'LAHIRI'
  ): AstrologyChart {
    const julianDay = this.dateToJulianDay(birthDate);
    const ayanamshaId = this.AYANAMSHA[ayanamsha];
    
    // Calculate tropical positions
    const tropicalPlanets = this.calculatePlanets(julianDay, false);
    const tropicalHouses = this.calculateHouses(julianDay, latitude, longitude);
    
    // Calculate sidereal positions
    const siderealPlanets = this.calculatePlanets(julianDay, true, ayanamshaId);
    const siderealHouses = this.calculateHouses(julianDay, latitude, longitude, true, ayanamshaId);
    
    // Calculate Nakshatra
    const nakshatra = this.calculateNakshatra(siderealPlanets.moon.longitude);
    
    // Calculate Dasha
    const dasha = this.calculateDasha(siderealPlanets.moon.longitude, birthDate);
    
    return {
      planets: tropicalPlanets,
      houses: tropicalHouses,
      sidereal: {
        planets: siderealPlanets,
        houses: siderealHouses
      },
      nakshatra,
      dasha
    };
  }

  /**
   * Calculate current transits
   */
  static calculateTransits(
    currentDate: Date,
    latitude: number,
    longitude: number
  ): any {
    const julianDay = this.dateToJulianDay(currentDate);
    const planets = this.calculatePlanets(julianDay, false);
    
    return {
      date: currentDate,
      planets,
      moonPhase: this.calculateMoonPhase(planets.sun.longitude, planets.moon.longitude),
      tithi: this.calculateTithi(planets.sun.longitude, planets.moon.longitude),
      rahuKalam: this.calculateRahuKalam(currentDate, latitude, longitude)
    };
  }

  private static dateToJulianDay(date: Date): number {
    return swisseph.swe_julday(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
      date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600,
      swisseph.SE_GREG_CAL
    );
  }

  private static calculatePlanets(
    julianDay: number,
    isSidereal: boolean,
    ayanamshaId?: number
  ): any {
    const planets: any = {};
    
    for (const [name, id] of Object.entries(this.PLANET_IDS)) {
      try {
        const result = swisseph.swe_calc_ut(
          julianDay,
          id,
          swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SPEED
        );
        
        let longitude = result.longitude;
        
        if (isSidereal && ayanamshaId) {
          const ayanamsha = swisseph.swe_get_ayanamsa(julianDay);
          longitude = longitude - ayanamsha;
          if (longitude < 0) longitude += 360;
        }
        
        planets[name] = {
          longitude: longitude,
          latitude: result.latitude,
          distance: result.distance,
          speed: result.speed
        };
      } catch (error) {
        console.error(`Error calculating ${name}:`, error);
        planets[name] = {
          longitude: 0,
          latitude: 0,
          distance: 0,
          speed: 0
        };
      }
    }
    
    return planets;
  }

  private static calculateHouses(
    julianDay: number,
    latitude: number,
    longitude: number,
    isSidereal: boolean = false,
    ayanamshaId?: number
  ): any {
    try {
      const result = swisseph.swe_houses(
        julianDay,
        latitude,
        longitude,
        'P' // Placidus house system
      );
      
      let ascendant = result.ascendant;
      let mc = result.mc;
      let cusps = result.cusps;
      
      if (isSidereal && ayanamshaId) {
        const ayanamsha = swisseph.swe_get_ayanamsa(julianDay);
        ascendant = ascendant - ayanamsha;
        mc = mc - ayanamsha;
        cusps = cusps.map((cusp: number) => {
          let adjusted = cusp - ayanamsha;
          if (adjusted < 0) adjusted += 360;
          return adjusted;
        });
      }
      
      return {
        ascendant,
        mc,
        cusps: cusps.map((cusp: number, index: number) => ({
          cusp: index + 1,
          longitude: cusp
        }))
      };
    } catch (error) {
      console.error('Error calculating houses:', error);
      return {
        ascendant: 0,
        mc: 0,
        cusps: []
      };
    }
  }

  private static calculateNakshatra(moonLongitude: number): any {
    const nakshatraIndex = Math.floor(moonLongitude / 13.333333);
    const pada = Math.floor((moonLongitude % 13.333333) / 3.333333) + 1;
    
    return {
      moon: this.NAKSHATRAS[nakshatraIndex] || 'Unknown',
      pada,
      lord: this.NAKSHATRA_LORDS[nakshatraIndex] || 'Unknown'
    };
  }

  private static calculateDasha(moonLongitude: number, birthDate: Date): any {
    // Simplified Vimshottari Dasha calculation
    const nakshatraIndex = Math.floor(moonLongitude / 13.333333);
    const dashaSequence = [
      'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
    ];
    
    const currentDasha = dashaSequence[nakshatraIndex % 9];
    const dashaPeriods = {
      'Ketu': 7, 'Venus': 20, 'Sun': 6, 'Moon': 10, 'Mars': 7,
      'Rahu': 18, 'Jupiter': 16, 'Saturn': 19, 'Mercury': 17
    };
    
    return {
      current: currentDasha,
      sub: currentDasha, // Simplified
      start: birthDate,
      end: new Date(birthDate.getTime() + dashaPeriods[currentDasha] * 365.25 * 24 * 60 * 60 * 1000)
    };
  }

  private static calculateMoonPhase(sunLongitude: number, moonLongitude: number): any {
    const phase = (moonLongitude - sunLongitude + 360) % 360;
    const illumination = (1 + Math.cos(phase * Math.PI / 180)) / 2;
    
    let phaseName = '';
    if (phase < 45) phaseName = 'New Moon';
    else if (phase < 90) phaseName = 'Waxing Crescent';
    else if (phase < 135) phaseName = 'First Quarter';
    else if (phase < 180) phaseName = 'Waxing Gibbous';
    else if (phase < 225) phaseName = 'Full Moon';
    else if (phase < 270) phaseName = 'Waning Gibbous';
    else if (phase < 315) phaseName = 'Last Quarter';
    else phaseName = 'Waning Crescent';
    
    return {
      phase: phaseName,
      illumination: Math.round(illumination * 100) / 100,
      age: Math.round(phase / 12.2)
    };
  }

  private static calculateTithi(sunLongitude: number, moonLongitude: number): any {
    const tithi = Math.floor((moonLongitude - sunLongitude + 360) % 360 / 12) + 1;
    const tithiNames = [
      'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
      'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
      'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
    ];
    
    return {
      index: tithi,
      name: tithiNames[tithi - 1] || 'Unknown'
    };
  }

  private static calculateRahuKalam(date: Date, latitude: number, longitude: number): string {
    // Simplified Rahu Kalam calculation
    const dayOfWeek = date.getDay();
    const rahuKalamTimes = [
      ['07:30-09:00', '09:00-10:30', '10:30-12:00', '12:00-13:30', '13:30-15:00', '15:00-16:30', '16:30-18:00'],
      ['09:00-10:30', '10:30-12:00', '12:00-13:30', '13:30-15:00', '15:00-16:30', '16:30-18:00', '07:30-09:00'],
      ['10:30-12:00', '12:00-13:30', '13:30-15:00', '15:00-16:30', '16:30-18:00', '07:30-09:00', '09:00-10:30'],
      ['12:00-13:30', '13:30-15:00', '15:00-16:30', '16:30-18:00', '07:30-09:00', '09:00-10:30', '10:30-12:00'],
      ['13:30-15:00', '15:00-16:30', '16:30-18:00', '07:30-09:00', '09:00-10:30', '10:30-12:00', '12:00-13:30'],
      ['15:00-16:30', '16:30-18:00', '07:30-09:00', '09:00-10:30', '10:30-12:00', '12:00-13:30', '13:30-15:00'],
      ['16:30-18:00', '07:30-09:00', '09:00-10:30', '10:30-12:00', '12:00-13:30', '13:30-15:00', '15:00-16:30']
    ];
    
    return rahuKalamTimes[dayOfWeek][0]; // Simplified to first time slot
  }
}
