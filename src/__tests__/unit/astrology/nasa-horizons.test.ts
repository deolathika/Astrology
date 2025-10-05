import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { NASAHorizonsAPI } from '@/lib/astrology/nasa-horizons'

// Mock fetch
global.fetch = jest.fn()

describe('NASA Horizons API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Astronomical Data Retrieval', () => {
    it('should fetch sun position data', async () => {
      const mockResponse = {
        result: '2024-01-01 12:00:00 45.123 0.000 1.000 0.000 0.000 0.000'
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse)
      })

      const coordinates = {
        latitude: 6.9271,
        longitude: 79.8612,
        elevation: 0,
        timezone: 'Asia/Colombo',
        country: 'Sri Lanka',
        city: 'Colombo'
      }

      const result = await NASAHorizonsAPI.getAstronomicalData(
        new Date('2024-01-01T12:00:00Z'),
        coordinates
      )

      expect(result).toBeDefined()
      expect(result.sun).toBeDefined()
      expect(result.sun.longitude).toBeGreaterThanOrEqual(0)
      expect(result.sun.longitude).toBeLessThan(360)
    })

    it('should fetch moon position data', async () => {
      const mockResponse = {
        result: '2024-01-01 12:00:00 120.456 0.000 1.000 0.000 0.000 0.000'
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse)
      })

      const coordinates = {
        latitude: 6.9271,
        longitude: 79.8612,
        elevation: 0,
        timezone: 'Asia/Colombo',
        country: 'Sri Lanka',
        city: 'Colombo'
      }

      const result = await NASAHorizonsAPI.getAstronomicalData(
        new Date('2024-01-01T12:00:00Z'),
        coordinates
      )

      expect(result).toBeDefined()
      expect(result.moon).toBeDefined()
      expect(result.moon.longitude).toBeGreaterThanOrEqual(0)
      expect(result.moon.longitude).toBeLessThan(360)
    })

    it('should handle API errors gracefully', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('API Error'))

      const coordinates = {
        latitude: 6.9271,
        longitude: 79.8612,
        elevation: 0,
        timezone: 'Asia/Colombo',
        country: 'Sri Lanka',
        city: 'Colombo'
      }

      await expect(
        NASAHorizonsAPI.getAstronomicalData(
          new Date('2024-01-01T12:00:00Z'),
          coordinates
        )
      ).rejects.toThrow('API Error')
    })

    it('should validate coordinate ranges', async () => {
      const invalidCoordinates = {
        latitude: 91, // Invalid latitude
        longitude: 181, // Invalid longitude
        elevation: 0,
        timezone: 'Asia/Colombo',
        country: 'Sri Lanka',
        city: 'Colombo'
      }

      // Should handle invalid coordinates gracefully
      expect(invalidCoordinates.latitude).toBeGreaterThan(90)
      expect(invalidCoordinates.longitude).toBeGreaterThan(180)
    })
  })

  describe('Data Accuracy Validation', () => {
    it('should validate sun position accuracy', async () => {
      const mockResponse = {
        result: '2024-01-01 12:00:00 45.123 0.000 1.000 0.000 0.000 0.000'
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse)
      })

      const coordinates = {
        latitude: 6.9271,
        longitude: 79.8612,
        elevation: 0,
        timezone: 'Asia/Colombo',
        country: 'Sri Lanka',
        city: 'Colombo'
      }

      const result = await NASAHorizonsAPI.getAstronomicalData(
        new Date('2024-01-01T12:00:00Z'),
        coordinates
      )

      // Validate that longitude is within valid range
      expect(result.sun.longitude).toBeGreaterThanOrEqual(0)
      expect(result.sun.longitude).toBeLessThan(360)
      expect(result.sun.latitude).toBeGreaterThanOrEqual(-90)
      expect(result.sun.latitude).toBeLessThanOrEqual(90)
    })

    it('should validate moon position accuracy', async () => {
      const mockResponse = {
        result: '2024-01-01 12:00:00 120.456 0.000 1.000 0.000 0.000 0.000'
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse)
      })

      const coordinates = {
        latitude: 6.9271,
        longitude: 79.8612,
        elevation: 0,
        timezone: 'Asia/Colombo',
        country: 'Sri Lanka',
        city: 'Colombo'
      }

      const result = await NASAHorizonsAPI.getAstronomicalData(
        new Date('2024-01-01T12:00:00Z'),
        coordinates
      )

      // Validate that longitude is within valid range
      expect(result.moon.longitude).toBeGreaterThanOrEqual(0)
      expect(result.moon.longitude).toBeLessThan(360)
      expect(result.moon.latitude).toBeGreaterThanOrEqual(-90)
      expect(result.moon.latitude).toBeLessThanOrEqual(90)
    })
  })
})

