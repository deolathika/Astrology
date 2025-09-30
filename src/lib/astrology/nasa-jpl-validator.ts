/**
 * NASA/JPL Horizons API Integration for Astrology Validation
 * Provides accurate planetary positions for validation against Swiss Ephemeris
 */

export interface JPLPlanetData {
  name: string
  longitude: number
  latitude: number
  distance: number
  speed: number
  timestamp: string
}

export interface JPLValidationResult {
  planet: string
  swissValue: number
  jplValue: number
  difference: number
  tolerance: number
  isValid: boolean
}

export class NASAJPLValidator {
  private baseUrl = 'https://ssd-api.jpl.nasa.gov/horizons.api'
  private cache = new Map<string, JPLPlanetData[]>()
  private cacheExpiry = 24 * 60 * 60 * 1000 // 24 hours

  /**
   * Validate Swiss Ephemeris calculations against NASA/JPL data
   */
  async validatePlanetaryPositions(
    swissData: any[],
    date: Date,
    location: { latitude: number; longitude: number }
  ): Promise<JPLValidationResult[]> {
    try {
      const jplData = await this.fetchJPLData(date, location)
      const results: JPLValidationResult[] = []

      for (const swissPlanet of swissData) {
        const jplPlanet = jplData.find(p => p.name.toLowerCase() === swissPlanet.name.toLowerCase())
        
        if (jplPlanet) {
          const difference = Math.abs(swissPlanet.longitude - jplPlanet.longitude)
          const tolerance = this.getTolerance(swissPlanet.name)
          const isValid = difference <= tolerance

          results.push({
            planet: swissPlanet.name,
            swissValue: swissPlanet.longitude,
            jplValue: jplPlanet.longitude,
            difference,
            tolerance,
            isValid
          })
        }
      }

      return results
    } catch (error) {
      return []
    }
  }

  /**
   * Fetch planetary data from NASA/JPL Horizons API
   */
  private async fetchJPLData(
    date: Date,
    location: { latitude: number; longitude: number }
  ): Promise<JPLPlanetData[]> {
    const cacheKey = `${date.toISOString()}_${location.latitude}_${location.longitude}`
    const cached = this.cache.get(cacheKey)
    
    if (cached && this.isCacheValid(cacheKey)) {
      return cached
    }

    try {
      const dateStr = date.toISOString().split('T')[0]
      const timeStr = date.toISOString().split('T')[1].split('.')[0]
      
      const planets = [
        'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
      ]
      
      const results: JPLPlanetData[] = []
      
      for (const planet of planets) {
        try {
          const planetData = await this.fetchPlanetData(planet, dateStr, timeStr, location)
          if (planetData) {
            results.push(planetData)
          }
        } catch (error) {
          }
      }

      this.cache.set(cacheKey, results)
      return results
    } catch (error) {
      throw new Error('Failed to fetch JPL data')
    }
  }

  /**
   * Fetch data for a specific planet
   */
  private async fetchPlanetData(
    planet: string,
    date: string,
    time: string,
    location: { latitude: number; longitude: number }
  ): Promise<JPLPlanetData | null> {
    const planetCodes: Record<string, string> = {
      'Sun': '10',
      'Moon': '301',
      'Mercury': '199',
      'Venus': '299',
      'Mars': '499',
      'Jupiter': '599',
      'Saturn': '699',
      'Uranus': '799',
      'Neptune': '899',
      'Pluto': '999'
    }

    const planetCode = planetCodes[planet]
    if (!planetCode) return null

    const params = new URLSearchParams({
      format: 'json',
      COMMAND: planetCode,
      OBJ_DATA: 'YES',
      MAKE_EPHEM: 'YES',
      EPHEM_TYPE: 'OBSERVER',
      CENTER: 'coord',
      COORD_TYPE: 'GEODETIC',
      SITE_COORD: `${location.longitude},${location.latitude},0`,
      START_TIME: `${date} ${time}`,
      STOP_TIME: `${date} ${time}`,
      STEP_SIZE: '1d',
      QUANTITIES: '1,9,20,23,24,25'
    })

    const response = await fetch(`${this.baseUrl}?${params}`)
    const data = await response.json()

    if (data.result && data.result.includes('$$SOE')) {
      const lines = data.result.split('\n')
      const dataLine = lines.find((line: string) => line.includes('$$SOE') && line.length > 20)
      
      if (dataLine) {
        const values = dataLine.trim().split(/\s+/)
        if (values.length >= 6) {
          return {
            name: planet,
            longitude: parseFloat(values[1]) || 0,
            latitude: parseFloat(values[2]) || 0,
            distance: parseFloat(values[3]) || 0,
            speed: parseFloat(values[4]) || 0,
            timestamp: `${date} ${time}`
          }
        }
      }
    }

    return null
  }

  /**
   * Get tolerance for planet validation
   */
  private getTolerance(planetName: string): number {
    const tolerances: Record<string, number> = {
      'Sun': 0.1,
      'Moon': 0.2,
      'Mercury': 0.1,
      'Venus': 0.1,
      'Mars': 0.1,
      'Jupiter': 0.1,
      'Saturn': 0.1,
      'Uranus': 0.1,
      'Neptune': 0.1,
      'Pluto': 0.1
    }
    
    return tolerances[planetName] || 0.1
  }

  /**
   * Check if cache is still valid
   */
  private isCacheValid(cacheKey: string): boolean {
    const cached = this.cache.get(cacheKey)
    if (!cached) return false
    
    const now = Date.now()
    const cacheTime = this.cache.get(`${cacheKey}_time`) as number
    return now - cacheTime < this.cacheExpiry
  }

  /**
   * Clear expired cache entries
   */
  clearExpiredCache(): void {
    const now = Date.now()
    for (const [key, value] of this.cache.entries()) {
      if (key.endsWith('_time')) {
        const cacheTime = value as number
        if (now - cacheTime > this.cacheExpiry) {
          this.cache.delete(key)
          this.cache.delete(key.replace('_time', ''))
        }
      }
    }
  }

  /**
   * Get validation summary
   */
  getValidationSummary(results: JPLValidationResult[]): {
    total: number
    valid: number
    invalid: number
    averageDifference: number
    worstDifference: number
  } {
    const valid = results.filter(r => r.isValid).length
    const invalid = results.length - valid
    const averageDifference = results.reduce((sum, r) => sum + r.difference, 0) / results.length
    const worstDifference = Math.max(...results.map(r => r.difference))

    return {
      total: results.length,
      valid,
      invalid,
      averageDifference,
      worstDifference
    }
  }
}

// Export singleton instance
export const nasaJPLValidator = new NASAJPLValidator()

