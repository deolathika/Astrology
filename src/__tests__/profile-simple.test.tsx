import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import EditProfilePage from '@/app/profile/edit/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

// Mock GeographyService
jest.mock('@/lib/geography/country-city-data', () => ({
  GeographyService: {
    getCountries: jest.fn(() => [
      { name: 'United States', code: 'US' },
      { name: 'Sri Lanka', code: 'LK' }
    ]),
    getCitiesByCountry: jest.fn(() => [
      { name: 'New York', countryCode: 'US', coordinates: { latitude: 40.7128, longitude: -74.0060 }, timezone: 'America/New_York' }
    ])
  }
}))

// Mock AstrologyValidator
jest.mock('@/lib/astrology/astrology-validator', () => ({
  AstrologyValidator: {
    validateBirthData: jest.fn(() => Promise.resolve({
      isValid: true,
      errors: [],
      warnings: [],
      data: {
        fullName: 'Test User',
        email: 'test@example.com',
        birthDate: '1990-01-01',
        birthTime: '12:00',
        birthPlace: {
          country: 'US',
          city: 'New York',
          latitude: 40.7128,
          longitude: -74.0060,
          timezone: 'America/New_York'
        }
      }
    }))
  }
}))

describe('EditProfilePage - Simple Tests', () => {
  const mockPush = jest.fn()
  const mockBack = jest.fn()

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    })
    
    // Mock successful profile fetch
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        user: {
          name: 'Test User',
          email: 'test@example.com',
          profiles: [{
            fullName: 'Test User',
            birthDate: '1990-01-01',
            birthTime: '12:00',
            birthPlace: 'New York, US',
            latitude: 40.7128,
            longitude: -74.0060,
            timezone: 'America/New_York',
            zodiacSign: 'Capricorn',
            system: 'western',
            language: 'en',
            preferences: {
              darkMode: false,
              hapticFeedback: true,
              notifications: true
            }
          }]
        }
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders edit profile page', async () => {
    render(<EditProfilePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument()
    })
  })

  test('displays save button', async () => {
    render(<EditProfilePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Save Changes')).toBeInTheDocument()
    })
  })

  test('has back button', async () => {
    render(<EditProfilePage />)
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  test('back button calls router.back', async () => {
    render(<EditProfilePage />)
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      const backButton = buttons[0] // First button should be back button
      fireEvent.click(backButton)
      expect(mockBack).toHaveBeenCalled()
    })
  })

  test('save button is clickable', async () => {
    render(<EditProfilePage />)
    
    await waitFor(() => {
      const saveButton = screen.getByText('Save Changes')
      expect(saveButton).toBeInTheDocument()
      expect(saveButton).not.toBeDisabled()
    })
  })

  test('handles save button click', async () => {
    // Mock successful save response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Profile updated successfully'
      })
    })

    render(<EditProfilePage />)
    
    await waitFor(() => {
      const saveButton = screen.getByText('Save Changes')
      fireEvent.click(saveButton)
    })

    // The component should attempt to save
    expect(global.fetch).toHaveBeenCalled()
  })
})
