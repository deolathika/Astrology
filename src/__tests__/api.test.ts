import { NextRequest } from 'next/server'
import { GET as getProfile, PUT as updateProfile } from '@/app/api/users/profile/route'
import { mockUser, mockProfile, mockValidationResult } from './fixtures/mock-data'

// Mock Prisma
jest.mock('@/lib/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    profile: {
      upsert: jest.fn(),
    },
  },
}))

// Mock NextAuth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))

// Mock input validation
jest.mock('@/lib/input-validation', () => ({
  validateAndSanitize: jest.fn(),
  emailSchema: jest.fn(),
  nameSchema: jest.fn(),
}))

import { prisma } from '@/lib/database'
import { getServerSession } from 'next-auth'
import { validateAndSanitize } from '@/lib/input-validation'

describe('Profile API Endpoints', () => {
  const mockSession = {
    user: {
      id: 'test-user-123',
      name: 'Test User',
      email: 'test@example.com',
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock successful session
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    
    // Mock successful validation
    ;(validateAndSanitize as jest.Mock).mockReturnValue({
      success: true,
      data: 'Test User',
    })
  })

  describe('GET /api/users/profile', () => {
    test('should return user profile when authenticated', async () => {
      // Mock database response
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        profiles: [mockProfile],
      })

      const request = new NextRequest('http://localhost:3000/api/users/profile')
      const response = await getProfile(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.user).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        image: mockUser.image,
        createdAt: mockUser.createdAt,
        profiles: [mockProfile],
      })
    })

    test('should return 401 when not authenticated', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/users/profile')
      const response = await getProfile(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    test('should return 404 when user not found', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/users/profile')
      const response = await getProfile(request)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('User not found')
    })

    test('should handle database errors', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/users/profile')
      const response = await getProfile(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to fetch user profile')
    })
  })

  describe('PUT /api/users/profile', () => {
    const updateData = {
      name: 'Updated Name',
      email: 'updated@example.com',
      birthDate: '1990-01-15',
      birthTime: '14:30',
      birthPlace: 'New York, US',
      latitude: 40.7128,
      longitude: -74.0060,
      timezone: 'America/New_York',
      zodiacSign: 'Capricorn',
      system: 'western',
    }

    test('should update user profile when authenticated', async () => {
      // Mock database responses
      ;(prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        name: 'Updated Name',
        email: 'updated@example.com',
      })
      
      ;(prisma.profile.upsert as jest.Mock).mockResolvedValue({
        ...mockProfile,
        fullName: 'Updated Name',
      })

      const request = new NextRequest('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await updateProfile(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('Profile updated successfully')
      expect(data.user.name).toBe('Updated Name')
      expect(data.user.email).toBe('updated@example.com')
    })

    test('should return 401 when not authenticated', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await updateProfile(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    test('should validate email format', async () => {
      ;(validateAndSanitize as jest.Mock).mockReturnValueOnce({
        success: false,
        error: 'Invalid email format',
      })

      const request = new NextRequest('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify({
          ...updateData,
          email: 'invalid-email',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await updateProfile(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })

    test('should validate name length', async () => {
      ;(validateAndSanitize as jest.Mock)
        .mockReturnValueOnce({ success: true, data: 'updated@example.com' })
        .mockReturnValueOnce({ success: false, error: 'Name too short' })

      const request = new NextRequest('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify({
          ...updateData,
          name: 'A',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await updateProfile(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Name must be at least 2 characters')
    })

    test('should handle database errors', async () => {
      ;(prisma.user.update as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await updateProfile(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to update profile')
    })

    test('should handle invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        body: 'invalid-json',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await updateProfile(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid JSON')
    })

    test('should update both user and profile tables', async () => {
      ;(prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        name: 'Updated Name',
        email: 'updated@example.com',
      })
      
      ;(prisma.profile.upsert as jest.Mock).mockResolvedValue({
        ...mockProfile,
        fullName: 'Updated Name',
      })

      const request = new NextRequest('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      await updateProfile(request)

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'test-user-123' },
        data: {
          name: 'Updated Name',
          email: 'updated@example.com',
        },
      })

      expect(prisma.profile.upsert).toHaveBeenCalledWith({
        where: { userId: 'test-user-123' },
        update: {
          fullName: 'Updated Name',
          birthDate: new Date('1990-01-15'),
          birthTime: '14:30',
          birthPlace: 'New York, US',
          latitude: 40.7128,
          longitude: -74.0060,
          timezone: 'America/New_York',
          zodiacSign: 'Capricorn',
          system: 'western',
        },
        create: {
          userId: 'test-user-123',
          fullName: 'Updated Name',
          birthDate: new Date('1990-01-15'),
          birthTime: '14:30',
          birthPlace: 'New York, US',
          latitude: 40.7128,
          longitude: -74.0060,
          timezone: 'America/New_York',
          zodiacSign: 'Capricorn',
          system: 'western',
        },
      })
    })
  })
})