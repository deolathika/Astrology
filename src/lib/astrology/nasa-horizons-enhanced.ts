/**
 * Enhanced NASA Horizons API Integration
 * Real astronomical data calculations with Sri Lanka support
 */

export interface NASACoordinates {
  latitude: number
  longitude: number
  elevation: number
  timezone: string
  country: string
  city: string
}

export interface NASAEphemerisData {
  planets: {
    sun: { longitude: number; latitude: number; distance: number }
    moon: { longitude: number; latitude: number; distance: number }
    mercury: { longitude: number; latitude: number; distance: number }
    venus: { longitude: number; latitude: number; distance: number }
    mars: { longitude: number; latitude: number; distance: number }
    jupiter: { longitude: number; latitude: number; distance: number }
    saturn: { longitude: number; latitude: number; distance: number }
    uranus: { longitude: number; latitude: number; distance: number }
    neptune: { longitude: number; latitude: number; distance: number }
    pluto: { longitude: number; latitude: number; distance: number }
  }
  asteroids: {
    ceres: { longitude: number; latitude: number; distance: number }
    pallas: { longitude: number; latitude: number; distance: number }
    juno: { longitude: number; latitude: number; distance: number }
    vesta: { longitude: number; latitude: number; distance: number }
  }
  lunar: {
    phase: string
    illumination: number
    age: number
    nextNewMoon: string
    nextFullMoon: string
  }
  solar: {
    sunrise: string
    sunset: string
    solarNoon: string
    dayLength: number
  }
}

export class NASAHorizonsEnhanced {
  private static readonly NASA_BASE_URL = 'https://ssd-api.jpl.nasa.gov/horizons.api'
  private static readonly SRI_LANKA_COORDINATES = {
    colombo: { lat: 6.9271, lng: 79.8612, tz: 'Asia/Colombo' },
    kandy: { lat: 7.2906, lng: 80.6337, tz: 'Asia/Colombo' },
    galle: { lat: 6.0329, lng: 80.2169, tz: 'Asia/Colombo' },
    jaffna: { lat: 9.6615, lng: 80.0255, tz: 'Asia/Colombo' },
    anuradhapura: { lat: 8.3114, lng: 80.4037, tz: 'Asia/Colombo' }
  }

  /**
   * Get comprehensive astronomical data from NASA
   */
  static async getAstronomicalData(
    utcDateTime: Date,
    coordinates: NASACoordinates
  ): Promise<NASAEphemerisData> {
    try {
      const dateStr = utcDateTime.toISOString().split('T')[0]
      const timeStr = utcDateTime.toISOString().split('T')[1].split('.')[0]

      // Get planetary positions
      const planets = await this.getPlanetaryPositions(dateStr, timeStr, coordinates)
      
      // Get asteroid positions
      const asteroids = await this.getAsteroidPositions(dateStr, timeStr, coordinates)
      
      // Get lunar data
      const lunar = await this.getLunarData(dateStr, timeStr, coordinates)
      
      // Get solar data
      const solar = await this.getSolarData(dateStr, timeStr, coordinates)

      return {
        planets,
        asteroids,
        lunar,
        solar
      }
    } catch (error) {
      console.error('NASA Horizons API Error:', error)
      throw new Error('Failed to fetch astronomical data from NASA')
    }
  }

  /**
   * Get planetary positions from NASA Horizons
   */
  private static async getPlanetaryPositions(
    date: string,
    time: string,
    coordinates: NASACoordinates
  ) {
    const planetIds = {
      sun: '10',
      moon: '301',
      mercury: '199',
      venus: '299',
      mars: '499',
      jupiter: '599',
      saturn: '699',
      uranus: '799',
      neptune: '899',
      pluto: '999'
    }

    const planets: any = {}

    for (const [planet, id] of Object.entries(planetIds)) {
      try {
        const response = await fetch(
          `${this.NASA_BASE_URL}?format=json&COMMAND='${id}'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='coord'&COORD_TYPE='GEODETIC'&SITE_COORD='${coordinates.longitude},${coordinates.latitude},${coordinates.elevation}'&START_TIME='${date} ${time}'&STOP_TIME='${date} ${time}'&STEP_SIZE='1d'&QUANTITIES='1,9,20,23,24,25'`
        )
        
        const data = await response.json()
        
        if (data.result && data.result.length > 0) {
          const ephemeris = data.result.split('\n').find((line: string) => line.startsWith(date))
          if (ephemeris) {
            const values = ephemeris.split(/\s+/)
            planets[planet] = {
              longitude: parseFloat(values[2]) || 0,
              latitude: parseFloat(values[3]) || 0,
              distance: parseFloat(values[4]) || 0
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching ${planet} data:`, error)
        planets[planet] = { longitude: 0, latitude: 0, distance: 0 }
      }
    }

    return planets
  }

  /**
   * Get asteroid positions
   */
  private static async getAsteroidPositions(
    date: string,
    time: string,
    coordinates: NASACoordinates
  ) {
    const asteroidIds = {
      ceres: '2000001',
      pallas: '2000002',
      juno: '2000003',
      vesta: '2000004'
    }

    const asteroids: any = {}

    for (const [asteroid, id] of Object.entries(asteroidIds)) {
      try {
        const response = await fetch(
          `${this.NASA_BASE_URL}?format=json&COMMAND='${id}'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='coord'&COORD_TYPE='GEODETIC'&SITE_COORD='${coordinates.longitude},${coordinates.latitude},${coordinates.elevation}'&START_TIME='${date} ${time}'&STOP_TIME='${date} ${time}'&STEP_SIZE='1d'&QUANTITIES='1,9,20,23,24,25'`
        )
        
        const data = await response.json()
        
        if (data.result && data.result.length > 0) {
          const ephemeris = data.result.split('\n').find((line: string) => line.startsWith(date))
          if (ephemeris) {
            const values = ephemeris.split(/\s+/)
            asteroids[asteroid] = {
              longitude: parseFloat(values[2]) || 0,
              latitude: parseFloat(values[3]) || 0,
              distance: parseFloat(values[4]) || 0
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching ${asteroid} data:`, error)
        asteroids[asteroid] = { longitude: 0, latitude: 0, distance: 0 }
      }
    }

    return asteroids
  }

  /**
   * Get lunar data including phase and illumination
   */
  private static async getLunarData(
    date: string,
    time: string,
    coordinates: NASACoordinates
  ) {
    try {
      // Calculate moon phase
      const moonPhase = this.calculateMoonPhase(new Date(`${date}T${time}`))
      
      // Calculate lunar age
      const lunarAge = this.calculateLunarAge(new Date(`${date}T${time}`))
      
      // Calculate next new moon and full moon
      const nextNewMoon = this.calculateNextNewMoon(new Date(`${date}T${time}`))
      const nextFullMoon = this.calculateNextFullMoon(new Date(`${date}T${time}`))

      return {
        phase: moonPhase,
        illumination: this.calculateIllumination(new Date(`${date}T${time}`)),
        age: lunarAge,
        nextNewMoon: nextNewMoon.toISOString(),
        nextFullMoon: nextFullMoon.toISOString()
      }
    } catch (error) {
      console.error('Error calculating lunar data:', error)
      return {
        phase: 'New Moon',
        illumination: 0,
        age: 0,
        nextNewMoon: new Date().toISOString(),
        nextFullMoon: new Date().toISOString()
      }
    }
  }

  /**
   * Get solar data including sunrise/sunset
   */
  private static async getSolarData(
    date: string,
    time: string,
    coordinates: NASACoordinates
  ) {
    try {
      const solarTimes = this.calculateSolarTimes(
        new Date(`${date}T${time}`),
        coordinates.latitude,
        coordinates.longitude
      )

      return {
        sunrise: solarTimes.sunrise.toISOString(),
        sunset: solarTimes.sunset.toISOString(),
        solarNoon: solarTimes.solarNoon.toISOString(),
        dayLength: solarTimes.dayLength
      }
    } catch (error) {
      console.error('Error calculating solar data:', error)
      return {
        sunrise: new Date().toISOString(),
        sunset: new Date().toISOString(),
        solarNoon: new Date().toISOString(),
        dayLength: 12
      }
    }
  }

  /**
   * Calculate moon phase
   */
  private static calculateMoonPhase(date: Date): string {
    const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
                   'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']
    
    // Simplified moon phase calculation
    const daysSinceNewMoon = (date.getTime() - new Date('2023-01-21').getTime()) / (1000 * 60 * 60 * 24)
    const phaseIndex = Math.floor((daysSinceNewMoon % 29.53) / 3.69)
    
    return phases[phaseIndex] || 'New Moon'
  }

  /**
   * Calculate lunar age in days
   */
  private static calculateLunarAge(date: Date): number {
    const lastNewMoon = new Date('2023-01-21')
    return Math.floor((date.getTime() - lastNewMoon.getTime()) / (1000 * 60 * 60 * 24)) % 29.53
  }

  /**
   * Calculate moon illumination percentage
   */
  private static calculateIllumination(date: Date): number {
    const lunarAge = this.calculateLunarAge(date)
    return Math.abs(Math.sin((lunarAge / 29.53) * 2 * Math.PI)) * 100
  }

  /**
   * Calculate next new moon
   */
  private static calculateNextNewMoon(date: Date): Date {
    const lunarAge = this.calculateLunarAge(date)
    const daysToNewMoon = 29.53 - lunarAge
    return new Date(date.getTime() + daysToNewMoon * 24 * 60 * 60 * 1000)
  }

  /**
   * Calculate next full moon
   */
  private static calculateNextFullMoon(date: Date): Date {
    const lunarAge = this.calculateLunarAge(date)
    const daysToFullMoon = (14.77 - lunarAge + 29.53) % 29.53
    return new Date(date.getTime() + daysToFullMoon * 24 * 60 * 60 * 1000)
  }

  /**
   * Calculate solar times (sunrise, sunset, solar noon)
   */
  private static calculateSolarTimes(
    date: Date,
    latitude: number,
    longitude: number
  ) {
    // Simplified solar calculation
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    const declination = 23.45 * Math.sin((360 * (284 + dayOfYear) / 365) * Math.PI / 180)
    
    const hourAngle = Math.acos(-Math.tan(latitude * Math.PI / 180) * Math.tan(declination * Math.PI / 180))
    const sunrise = 12 - (hourAngle * 180 / Math.PI) / 15 - longitude / 15
    const sunset = 12 + (hourAngle * 180 / Math.PI) / 15 - longitude / 15
    
    const sunriseTime = new Date(date)
    sunriseTime.setHours(Math.floor(sunrise), (sunrise % 1) * 60, 0, 0)
    
    const sunsetTime = new Date(date)
    sunsetTime.setHours(Math.floor(sunset), (sunset % 1) * 60, 0, 0)
    
    const solarNoon = new Date(date)
    solarNoon.setHours(12 - longitude / 15, 0, 0, 0)
    
    const dayLength = (sunset - sunrise) * 60

    return {
      sunrise: sunriseTime,
      sunset: sunsetTime,
      solarNoon: solarNoon,
      dayLength: dayLength
    }
  }

  /**
   * Get Sri Lanka specific coordinates
   */
  static getSriLankaCoordinates(city: string = 'colombo'): NASACoordinates {
    const coords = this.SRI_LANKA_COORDINATES[city as keyof typeof this.SRI_LANKA_COORDINATES] || this.SRI_LANKA_COORDINATES.colombo
    
    return {
      latitude: coords.lat,
      longitude: coords.lng,
      elevation: 0,
      timezone: coords.tz,
      country: 'Sri Lanka',
      city: city.charAt(0).toUpperCase() + city.slice(1)
    }
  }
}
