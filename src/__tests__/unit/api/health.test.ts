import { describe, it, expect } from '@jest/globals'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/health/route'

describe('Health API Endpoint', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const request = new NextRequest('http://localhost:3000/api/health')
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data.status).toBe('ok')
      expect(data.timestamp).toBeDefined()
      expect(data.uptime).toBeDefined()
    })

    it('should include system information', async () => {
      const request = new NextRequest('http://localhost:3000/api/health')
      const response = await GET(request)
      
      const data = await response.json()
      expect(data.status).toBe('ok')
      expect(data.timestamp).toBeDefined()
      expect(data.uptime).toBeGreaterThan(0)
    })

    it('should handle concurrent requests', async () => {
      const request1 = new NextRequest('http://localhost:3000/api/health')
      const request2 = new NextRequest('http://localhost:3000/api/health')
      
      const [response1, response2] = await Promise.all([
        GET(request1),
        GET(request2)
      ])
      
      expect(response1.status).toBe(200)
      expect(response2.status).toBe(200)
      
      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json()
      ])
      
      expect(data1.status).toBe('ok')
      expect(data2.status).toBe('ok')
    })
  })
})
