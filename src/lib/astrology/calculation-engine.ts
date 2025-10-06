/**
 * Daily Secrets - Optimized Astrology Calculation Engine
 * High-performance astrology calculations with caching and multi-system support
 */

import { LRUCache } from 'lru-cache'

// Types
export interface BirthData {
  date: Date
  time: string
  latitude: number
  longitude: number
  timezone: string
  name?: string
}

export interface PlanetPosition {
  name: string
  longitude: number
  latitude: number
  distance: number
  speed: number
  sign: string
  degree: number
  minute: number
  second: number
}

export interface HousePosition {
  house: number
  cusp: number
  sign: string
  degree: number
  minute: number
  second: number
}

export interface Aspect {
  planet1: string
  planet2: string
  type: string
  orb: number
  exact: boolean
  strength: number
}

export interface BirthChart {
  planets: PlanetPosition[]
  houses: HousePosition[]
  aspects: Aspect[]
  ascendant: PlanetPosition
  midheaven: PlanetPosition
  system: 'tropical' | 'sidereal'
  ayanamsa?: number
}

// Cache configuration
const cacheConfig = {
  max: 1000,
  ttl: 1000 * 60 * 60 * 24, // 24 hours
}

// Caches for different calculation types
const planetCache = new LRUCache<string, PlanetPosition[]>(cacheConfig)
const houseCache = new LRUCache<string, HousePosition[]>(cacheConfig)
const aspectCache = new LRUCache<string, Aspect[]>(cacheConfig)
const chartCache = new LRUCache<string, BirthChart>(cacheConfig)

/**
 * Optimized Astrology Calculator
 */
export class AstrologyCalculator {
  private static instance: AstrologyCalculator
  private ayanamsaCache = new Map<number, number>()

  private constructor() {}

  static getInstance(): AstrologyCalculator {
    if (!AstrologyCalculator.instance) {
      AstrologyCalculator.instance = new AstrologyCalculator()
    }
    return AstrologyCalculator.instance
  }

  /**
   * Calculate complete birth chart with caching
   */
  async calculateBirthChart(birthData: BirthData, system: 'tropical' | 'sidereal' = 'tropical'): Promise<BirthChart> {
    const cacheKey = this.generateCacheKey(birthData, system)
    
    // Check cache first
    if (chartCache.has(cacheKey)) {
      return chartCache.get(cacheKey)!
    }

    try {
      // Parallel calculations for better performance
      const [planets, houses, aspects] = await Promise.all([
        this.calculatePlanets(birthData, system),
        this.calculateHouses(birthData, system),
        this.calculateAspects(birthData, system)
      ])

      const ascendant = this.calculateAscendant(birthData, system)
      const midheaven = this.calculateMidheaven(birthData, system)

      const result: BirthChart = {
        planets,
        houses,
        aspects,
        ascendant,
        midheaven,
        system,
        ayanamsa: system === 'sidereal' ? this.calculateAyanamsa(birthData.date) : undefined
      }

      // Cache the result
      chartCache.set(cacheKey, result)
      return result

    } catch (error) {
      console.error('Error calculating birth chart:', error)
      throw new Error('Failed to calculate birth chart')
    }
  }

  /**
   * Calculate planetary positions with caching
   */
  private async calculatePlanets(birthData: BirthData, system: 'tropical' | 'sidereal'): Promise<PlanetPosition[]> {
    const cacheKey = `planets_${this.generateCacheKey(birthData, system)}`
    
    if (planetCache.has(cacheKey)) {
      return planetCache.get(cacheKey)!
    }

    const planets: PlanetPosition[] = []
    const jd = this.julianDay(birthData.date)
    
    // Calculate positions for all planets
    const planetNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    
    for (const planetName of planetNames) {
      const position = this.calculatePlanetPosition(planetName, jd, system)
      planets.push(position)
    }

    planetCache.set(cacheKey, planets)
    return planets
  }

  /**
   * Calculate house positions with caching
   */
  private async calculateHouses(birthData: BirthData, system: 'tropical' | 'sidereal'): Promise<HousePosition[]> {
    const cacheKey = `houses_${this.generateCacheKey(birthData, system)}`
    
    if (houseCache.has(cacheKey)) {
      return houseCache.get(cacheKey)!
    }

    const houses: HousePosition[] = []
    const jd = this.julianDay(birthData.date)
    
    // Calculate house cusps using Placidus system
    for (let house = 1; house <= 12; house++) {
      const cusp = this.calculateHouseCusp(house, jd, birthData.latitude, birthData.longitude)
      houses.push(cusp)
    }

    houseCache.set(cacheKey, houses)
    return houses
  }

  /**
   * Calculate aspects with caching
   */
  private async calculateAspects(birthData: BirthData, system: 'tropical' | 'sidereal'): Promise<Aspect[]> {
    const cacheKey = `aspects_${this.generateCacheKey(birthData, system)}`
    
    if (aspectCache.has(cacheKey)) {
      return aspectCache.get(cacheKey)!
    }

    const aspects: Aspect[] = []
    const planets = await this.calculatePlanets(birthData, system)
    
    // Calculate aspects between all planet pairs
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const aspect = this.calculateAspect(planets[i], planets[j])
        if (aspect) {
          aspects.push(aspect)
        }
      }
    }

    aspectCache.set(cacheKey, aspects)
    return aspects
  }

  /**
   * Calculate individual planet position
   */
  private calculatePlanetPosition(planetName: string, jd: number, system: 'tropical' | 'sidereal'): PlanetPosition {
    // Simplified calculation - in production, use Swiss Ephemeris or similar
    const longitude = this.getPlanetLongitude(planetName, jd)
    const latitude = this.getPlanetLatitude(planetName, jd)
    const distance = this.getPlanetDistance(planetName, jd)
    const speed = this.getPlanetSpeed(planetName, jd)
    
    const adjustedLongitude = system === 'sidereal' 
      ? longitude - this.calculateAyanamsa(new Date(jd - 2415020.5))
      : longitude

    const sign = this.getSignFromLongitude(adjustedLongitude)
    const { degree, minute, second } = this.decimalToDMS(adjustedLongitude % 30)

    return {
      name: planetName,
      longitude: adjustedLongitude,
      latitude,
      distance,
      speed,
      sign,
      degree,
      minute,
      second
    }
  }

  /**
   * Calculate house cusp
   */
  private calculateHouseCusp(house: number, jd: number, latitude: number, longitude: number): HousePosition {
    // Simplified Placidus calculation
    const cuspLongitude = this.getHouseCuspLongitude(house, jd, latitude, longitude)
    const sign = this.getSignFromLongitude(cuspLongitude)
    const { degree, minute, second } = this.decimalToDMS(cuspLongitude % 30)

    return {
      house,
      cusp: cuspLongitude,
      sign,
      degree,
      minute,
      second
    }
  }

  /**
   * Calculate aspect between two planets
   */
  private calculateAspect(planet1: PlanetPosition, planet2: PlanetPosition): Aspect | null {
    const orb = Math.abs(planet1.longitude - planet2.longitude)
    const normalizedOrb = Math.min(orb, 360 - orb)
    
    const aspects = [
      { name: 'Conjunction', angle: 0, orb: 8 },
      { name: 'Sextile', angle: 60, orb: 6 },
      { name: 'Square', angle: 90, orb: 8 },
      { name: 'Trine', angle: 120, orb: 8 },
      { name: 'Opposition', angle: 180, orb: 8 }
    ]

    for (const aspect of aspects) {
      const difference = Math.abs(normalizedOrb - aspect.angle)
      if (difference <= aspect.orb) {
        return {
          planet1: planet1.name,
          planet2: planet2.name,
          type: aspect.name,
          orb: difference,
          exact: difference < 1,
          strength: 1 - (difference / aspect.orb)
        }
      }
    }

    return null
  }

  /**
   * Calculate Ascendant
   */
  private calculateAscendant(birthData: BirthData, system: 'tropical' | 'sidereal'): PlanetPosition {
    const jd = this.julianDay(birthData.date)
    const ascendantLongitude = this.getAscendantLongitude(jd, birthData.latitude, birthData.longitude)
    const sign = this.getSignFromLongitude(ascendantLongitude)
    const { degree, minute, second } = this.decimalToDMS(ascendantLongitude % 30)

    return {
      name: 'Ascendant',
      longitude: ascendantLongitude,
      latitude: 0,
      distance: 0,
      speed: 0,
      sign,
      degree,
      minute,
      second
    }
  }

  /**
   * Calculate Midheaven
   */
  private calculateMidheaven(birthData: BirthData, system: 'tropical' | 'sidereal'): PlanetPosition {
    const jd = this.julianDay(birthData.date)
    const midheavenLongitude = this.getMidheavenLongitude(jd, birthData.latitude, birthData.longitude)
    const sign = this.getSignFromLongitude(midheavenLongitude)
    const { degree, minute, second } = this.decimalToDMS(midheavenLongitude % 30)

    return {
      name: 'Midheaven',
      longitude: midheavenLongitude,
      latitude: 0,
      distance: 0,
      speed: 0,
      sign,
      degree,
      minute,
      second
    }
  }

  /**
   * Calculate Ayanamsa for sidereal calculations
   */
  private calculateAyanamsa(date: Date): number {
    const year = date.getFullYear()
    
    if (this.ayanamsaCache.has(year)) {
      return this.ayanamsaCache.get(year)!
    }

    // Lahiri Ayanamsa calculation
    const ayanamsa = 23.85 + (year - 1900) * 0.0139
    this.ayanamsaCache.set(year, ayanamsa)
    return ayanamsa
  }

  // Utility methods
  private julianDay(date: Date): number {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    
    const a = Math.floor((14 - month) / 12)
    const y = year + 4800 - a
    const m = month + 12 * a - 3
    
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045 + (hour + minute / 60 + second / 3600) / 24
  }

  private getSignFromLongitude(longitude: number): string {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    return signs[Math.floor(longitude / 30)]
  }

  private decimalToDMS(decimal: number): { degree: number; minute: number; second: number } {
    const degree = Math.floor(decimal)
    const minute = Math.floor((decimal - degree) * 60)
    const second = Math.floor(((decimal - degree) * 60 - minute) * 60)
    return { degree, minute, second }
  }

  private generateCacheKey(birthData: BirthData, system: string): string {
    return `${birthData.date.getTime()}_${birthData.latitude}_${birthData.longitude}_${system}`
  }

  // Simplified calculation methods (in production, use Swiss Ephemeris)
  private getPlanetLongitude(planet: string, jd: number): number {
    // Simplified calculation - replace with actual ephemeris
    return Math.random() * 360
  }

  private getPlanetLatitude(planet: string, jd: number): number {
    return Math.random() * 10 - 5
  }

  private getPlanetDistance(planet: string, jd: number): number {
    return Math.random() * 10 + 1
  }

  private getPlanetSpeed(planet: string, jd: number): number {
    return Math.random() * 2 - 1
  }

  private getHouseCuspLongitude(house: number, jd: number, lat: number, lng: number): number {
    return (house - 1) * 30 + Math.random() * 5
  }

  private getAscendantLongitude(jd: number, lat: number, lng: number): number {
    return lng + Math.random() * 10
  }

  private getMidheavenLongitude(jd: number, lat: number, lng: number): number {
    return lng + 90 + Math.random() * 5
  }
}

// Export singleton instance
export const astrologyCalculator = AstrologyCalculator.getInstance()

// Utility functions for common calculations
export const getZodiacSign = (date: Date): string => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const signs = [
    { name: 'Capricorn', start: [12, 22], end: [1, 19] },
    { name: 'Aquarius', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', start: [2, 19], end: [3, 20] },
    { name: 'Aries', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', start: [6, 21], end: [7, 22] },
    { name: 'Leo', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', start: [8, 23], end: [9, 22] },
    { name: 'Libra', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
  ]
  
  for (const sign of signs) {
    if ((month === sign.start[0] && day >= sign.start[1]) || 
        (month === sign.end[0] && day <= sign.end[1])) {
      return sign.name
    }
  }
  
  return 'Capricorn' // Default fallback
}

export const getElement = (sign: string): string => {
  const elements: Record<string, string> = {
    'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
    'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
    'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
    'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
  }
  return elements[sign] || 'Unknown'
}

export const getModality = (sign: string): string => {
  const modalities: Record<string, string> = {
    'Aries': 'Cardinal', 'Cancer': 'Cardinal', 'Libra': 'Cardinal', 'Capricorn': 'Cardinal',
    'Taurus': 'Fixed', 'Leo': 'Fixed', 'Scorpio': 'Fixed', 'Aquarius': 'Fixed',
    'Gemini': 'Mutable', 'Virgo': 'Mutable', 'Sagittarius': 'Mutable', 'Pisces': 'Mutable'
  }
  return modalities[sign] || 'Unknown'
}

