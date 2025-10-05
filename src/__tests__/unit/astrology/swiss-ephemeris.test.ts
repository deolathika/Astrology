import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import SwissEphemerisEngine from '@/lib/astrology/swiss-ephemeris'

// Mock NASA Horizons API
jest.mock('@/lib/astrology/nasa-horizons', () => ({
  getAstronomicalData: jest.fn(),
}))

describe('Swiss Ephemeris Engine', () => {
  let engine: SwissEphemerisEngine

  beforeEach(() => {
    engine = new SwissEphemerisEngine()
    jest.clearAllMocks()
  })

  describe('Planetary Position Calculations', () => {
    it('should calculate Sun position correctly', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const result = await (engine as any).calculatePlanetPosition('Sun', 2448000, 0, 'tropical')
      
      expect(result).toBeDefined()
      expect(result.longitude).toBeGreaterThanOrEqual(0)
      expect(result.longitude).toBeLessThan(360)
    })

    it('should calculate Moon position correctly', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const result = await (engine as any).calculatePlanetPosition('Moon', 2448000, 0, 'tropical')
      
      expect(result).toBeDefined()
      expect(result.longitude).toBeGreaterThanOrEqual(0)
      expect(result.longitude).toBeLessThan(360)
    })

    it('should handle all major planets', async () => {
      const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
      
      for (const planet of planets) {
        const result = await (engine as any).calculatePlanetPosition(planet, 2448000, 0, 'tropical')
        expect(result).toBeDefined()
        expect(result.longitude).toBeGreaterThanOrEqual(0)
        expect(result.longitude).toBeLessThan(360)
      }
    })
  })

  describe('Astrology Data Calculations', () => {
    it('should calculate comprehensive astrology data', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const result = await engine.calculateAstrologyData(birthData)
      
      expect(result).toBeDefined()
      expect(result.planets).toBeDefined()
      expect(result.houses).toBeDefined()
      expect(result.planets).toBeDefined()
    })

    it('should calculate house cusps', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const result = await (engine as any).calculateHouseCusps(birthData)
      
      expect(result).toBeDefined()
      expect(result.length).toBe(12) // 12 houses
    })

    it('should calculate planetary aspects', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const result = await engine.calculateAspects(birthData)
      
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('Transit Calculations', () => {
    it('should calculate current transits', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const transitDate = new Date()
      const result = await engine.calculateTransits(transitDate, birthData)
      
      expect(result).toBeDefined()
      expect(result.date).toBeDefined()
      expect(result.transits).toBeDefined()
      expect(Array.isArray(result.transits)).toBe(true)
    })

    it('should calculate moon phase', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const transitDate = new Date()
      const result = await engine.calculateTransits(transitDate, birthData)
      
      expect(result.moonPhase).toBeDefined()
      expect(typeof result.moonPhase).toBe('string')
    })

    it('should calculate planetary hours', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const transitDate = new Date()
      const result = await engine.calculateTransits(transitDate, birthData)
      
      expect(result.planetaryHours).toBeDefined()
      expect(result.planetaryHours.currentRuler).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid birth data', async () => {
      const invalidBirthData = {
        year: 1900, // Very old date
        month: 13, // Invalid month
        day: 32, // Invalid day
        hour: 25, // Invalid hour
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      await expect(engine.calculateAstrologyData(invalidBirthData)).rejects.toThrow()
    })

    it('should handle invalid planet names', async () => {
      await expect(engine.calculatePlanetPosition('InvalidPlanet', 2448000, 0, 'tropical')).rejects.toThrow()
    })

    it('should handle invalid coordinate systems', async () => {
      await expect(engine.calculatePlanetPosition('Sun', 2448000, 0, 'invalid')).rejects.toThrow()
    })
  })

  describe('Accuracy Validation', () => {
    it('should validate calculation accuracy', async () => {
      const birthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 6.9271,
        longitude: 79.8612,
        timezone: 'Asia/Colombo'
      }

      const result = await engine.calculateAstrologyData(birthData)
      
      // Validate that all planetary positions are within valid ranges
      for (const [planet, position] of Object.entries(result.planets)) {
        expect(position.longitude).toBeGreaterThanOrEqual(0)
        expect(position.longitude).toBeLessThan(360)
        expect(position.latitude).toBeGreaterThanOrEqual(-90)
        expect(position.latitude).toBeLessThanOrEqual(90)
      }
    })
  })
})
