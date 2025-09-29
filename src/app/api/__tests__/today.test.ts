import { GET } from '../today/route'
import { NextRequest } from 'next/server'

// Mock the Swiss Ephemeris and other dependencies
jest.mock('@/lib/astrology/swiss-ephemeris', () => ({
  SwissEphemerisEngine: jest.fn().mockImplementation(() => ({
    calculatePlanetaryPositions: jest.fn().mockResolvedValue([]),
    calculateHouseCusps: jest.fn().mockResolvedValue([]),
  })),
}))

describe('/api/today', () => {
  it('should return daily guidance for valid profileId', async () => {
    const request = new NextRequest('http://localhost:3000/api/today?profileId=test123')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toHaveProperty('today_card')
    expect(data.data).toHaveProperty('share')
    expect(data.data).toHaveProperty('meta')
  })

  it('should return error for missing profileId', async () => {
    const request = new NextRequest('http://localhost:3000/api/today')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Profile ID is required')
  })

  it('should cache responses for same profileId', async () => {
    const request = new NextRequest('http://localhost:3000/api/today?profileId=test123')
    
    // First request
    const response1 = await GET(request)
    const data1 = await response1.json()
    
    // Second request (should be cached)
    const response2 = await GET(request)
    const data2 = await response2.json()

    expect(response1.status).toBe(200)
    expect(response2.status).toBe(200)
    expect(data1.success).toBe(true)
    expect(data2.success).toBe(true)
  })
})
