import { GET } from '../numerology/core/route'
import { NextRequest } from 'next/server'

describe('/api/numerology/core', () => {
  it('should return numerology data for valid profileId', async () => {
    const request = new NextRequest('http://localhost:3000/api/numerology/core?profileId=test123')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toHaveProperty('lifePath')
    expect(data.data).toHaveProperty('expression')
    expect(data.data).toHaveProperty('soulUrge')
    expect(data.data).toHaveProperty('personality')
    expect(data.data).toHaveProperty('birthday')
    expect(data.data).toHaveProperty('currentName')
    expect(data.data).toHaveProperty('master')
    expect(data.data).toHaveProperty('system')
  })

  it('should return error for missing profileId', async () => {
    const request = new NextRequest('http://localhost:3000/api/numerology/core')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Profile ID is required')
  })

  it('should handle different numerology systems', async () => {
    const request = new NextRequest('http://localhost:3000/api/numerology/core?profileId=test123&system=chaldean')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.system).toBe('chaldean')
  })
})
