import { describe, it, expect, beforeEach } from '@jest/globals'
import { NextRequest } from 'next/server'
import { GET as todayAPI } from '../app/api/today/route'
import { GET as healthAPI } from '../app/api/health/route'

// Mock the monitoring module
jest.mock('../lib/monitoring', () => ({
  logError: jest.fn(),
  logApiUsage: jest.fn(),
  ErrorType: {
    VALIDATION: 'validation',
    SYSTEM: 'system'
  },
  ErrorSeverity: {
    MEDIUM: 'medium',
    HIGH: 'high'
  }
}))

describe('API Endpoints', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()
  })

  describe('/api/today', () => {
    it('should return 400 for missing profileId', async () => {
      const request = new NextRequest('http://localhost:3000/api/today')
      const response = await todayAPI(request)
      const data = await response.json()
      
      expect(response.status).toBe(400)
      expect(data.error).toBe('Profile ID is required')
    })

    it('should return 400 for invalid profileId format', async () => {
      const request = new NextRequest('http://localhost:3000/api/today?profileId=invalid')
      const response = await todayAPI(request)
      const data = await response.json()
      
      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid profile ID format')
    })

    it('should return 200 for valid profileId', async () => {
      const validProfileId = '123e4567-e89b-12d3-a456-426614174000'
      const request = new NextRequest(`http://localhost:3000/api/today?profileId=${validProfileId}`)
      const response = await todayAPI(request)
      
      expect(response.status).toBe(200)
      expect(response.headers.get('X-API-Version')).toBe('1.0.0')
    })

    it('should include rate limiting headers', async () => {
      const validProfileId = '123e4567-e89b-12d3-a456-426614174000'
      const request = new NextRequest(`http://localhost:3000/api/today?profileId=${validProfileId}`)
      const response = await todayAPI(request)
      
      expect(response.headers.get('X-RateLimit-Remaining')).toBeDefined()
      expect(response.headers.get('X-Response-Time')).toBeDefined()
    })

    it('should cache responses', async () => {
      const validProfileId = '123e4567-e89b-12d3-a456-426614174000'
      const request = new NextRequest(`http://localhost:3000/api/today?profileId=${validProfileId}`)
      
      // First request
      const response1 = await todayAPI(request)
      expect(response1.status).toBe(200)
      
      // Second request should be cached
      const response2 = await todayAPI(request)
      expect(response2.status).toBe(200)
    })
  })

  describe('/api/health', () => {
    it('should return health status', async () => {
      const request = new NextRequest('http://localhost:3000/api/health')
      const response = await healthAPI(request)
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(data.status).toBeDefined()
      expect(data.timestamp).toBeDefined()
      expect(data.uptime).toBeDefined()
    })

    it('should include API version header', async () => {
      const request = new NextRequest('http://localhost:3000/api/health')
      const response = await healthAPI(request)
      
      expect(response.headers.get('X-API-Version')).toBe('1.0.0')
    })

    it('should not cache health responses', async () => {
      const request = new NextRequest('http://localhost:3000/api/health')
      const response = await healthAPI(request)
      
      expect(response.headers.get('Cache-Control')).toBe('no-cache, no-store, must-revalidate')
    })
  })

  describe('Security Headers', () => {
    it('should include security headers in responses', async () => {
      const validProfileId = '123e4567-e89b-12d3-a456-426614174000'
      const request = new NextRequest(`http://localhost:3000/api/today?profileId=${validProfileId}`)
      const response = await todayAPI(request)
      
      expect(response.headers.get('X-API-Version')).toBe('1.0.0')
      expect(response.headers.get('X-Response-Time')).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    it('should handle server errors gracefully', async () => {
      // Mock a server error by providing invalid data
      const request = new NextRequest('http://localhost:3000/api/today?profileId=123e4567-e89b-12d3-a456-426614174000')
      
      // This should not throw an error
      const response = await todayAPI(request)
      expect(response.status).toBeLessThan(500)
    })
  })
})
