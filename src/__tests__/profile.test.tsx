import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import ProfilePage from '@/app/profile/page'
import EditProfilePage from '@/app/profile/edit/page'
import { mockUser, mockProfile, mockCountries, mockCities } from './fixtures/mock-data'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

describe('Profile Management', () => {
  const mockPush = jest.fn()
  const mockBack = jest.fn()

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    })
    
    // Mock fetch for API calls
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        user: mockUser,
        profile: mockProfile
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Profile View Page', () => {
    test('should display user profile information', async () => {
      render(<ProfilePage />)
      
      // Wait for profile data to load
      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument()
        expect(screen.getByText('test@example.com')).toBeInTheDocument()
      })
      
      // Check profile sections
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
      expect(screen.getByText('Birth Information')).toBeInTheDocument()
      expect(screen.getByText('Astrology Information')).toBeInTheDocument()
      expect(screen.getByText('Preferences')).toBeInTheDocument()
    })

    test('should display edit button', async () => {
      render(<ProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByText('Edit Profile')).toBeInTheDocument()
      })
    })

    test('should navigate to edit page when edit button is clicked', async () => {
      render(<ProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByText('Edit Profile')).toBeInTheDocument()
      })
      
      fireEvent.click(screen.getByText('Edit Profile'))
      expect(mockPush).toHaveBeenCalledWith('/profile/edit')
    })
  })

  describe('Profile Edit Page', () => {
    test('should display edit form with current data', async () => {
      render(<EditProfilePage />)
      
      // Wait for form to load
      await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument()
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
      })
      
      // Check form sections
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
      expect(screen.getByText('Birth Information')).toBeInTheDocument()
      expect(screen.getByText('Astrology Information')).toBeInTheDocument()
      expect(screen.getByText('Preferences')).toBeInTheDocument()
    })

    test('should allow editing form fields', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument()
      })
      
      const nameInput = screen.getByDisplayValue('Test User')
      fireEvent.change(nameInput, { target: { value: 'Updated Name' } })
      
      expect(nameInput).toHaveValue('Updated Name')
    })

    test('should validate form data', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByText('Save Changes')).toBeInTheDocument()
      })
      
      // Clear required fields to test validation
      const nameInput = screen.getByDisplayValue('Test User')
      fireEvent.change(nameInput, { target: { value: '' } })
      
      const emailInput = screen.getByDisplayValue('test@example.com')
      fireEvent.change(emailInput, { target: { value: '' } })
      
      // Try to save with empty fields
      fireEvent.click(screen.getByText('Save Changes'))
      
      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText('Validation Errors')).toBeInTheDocument()
      })
    })

    test('should save profile changes', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByText('Save Changes')).toBeInTheDocument()
      })
      
      // Mock successful save response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Profile updated successfully'
        })
      })
      
      fireEvent.click(screen.getByText('Save Changes'))
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: expect.any(String)
        })
      })
    })

    test('should handle save errors', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByText('Save Changes')).toBeInTheDocument()
      })
      
      // Mock error response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: 'Failed to save profile'
        })
      })
      
      fireEvent.click(screen.getByText('Save Changes'))
      
      await waitFor(() => {
        expect(screen.getByText('Failed to save profile')).toBeInTheDocument()
      })
    })

    test('should display country and city dropdowns', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByText('Country')).toBeInTheDocument()
        expect(screen.getByText('City')).toBeInTheDocument()
      })
      
      // Check country dropdown
      const countrySelect = screen.getByDisplayValue('US')
      expect(countrySelect).toBeInTheDocument()
      
      // Check city dropdown
      const citySelect = screen.getByDisplayValue('New York')
      expect(citySelect).toBeInTheDocument()
    })

    test('should update city options when country changes', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('US')).toBeInTheDocument()
      })
      
      const countrySelect = screen.getByDisplayValue('US')
      fireEvent.change(countrySelect, { target: { value: 'LK' } })
      
      // Should update city options
      await waitFor(() => {
        expect(screen.getByText('Colombo')).toBeInTheDocument()
      })
    })

    test('should display coordinates when city is selected', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByText('Coordinates')).toBeInTheDocument()
      })
      
      // Should show coordinates for selected city
      expect(screen.getByText('40.7128°, -74.0060°')).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    test('should validate email format', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
      })
      
      const emailInput = screen.getByDisplayValue('test@example.com')
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      
      fireEvent.click(screen.getByText('Save Changes'))
      
      await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument()
      })
    })

    test('should validate birth date', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('1990-01-15')).toBeInTheDocument()
      })
      
      const birthDateInput = screen.getByDisplayValue('1990-01-15')
      fireEvent.change(birthDateInput, { target: { value: '2030-01-15' } })
      
      fireEvent.click(screen.getByText('Save Changes'))
      
      await waitFor(() => {
        expect(screen.getByText('Birth date cannot be in the future')).toBeInTheDocument()
      })
    })

    test('should validate birth time format', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('14:30')).toBeInTheDocument()
      })
      
      const birthTimeInput = screen.getByDisplayValue('14:30')
      fireEvent.change(birthTimeInput, { target: { value: '25:00' } })
      
      fireEvent.click(screen.getByText('Save Changes'))
      
      await waitFor(() => {
        expect(screen.getByText('Invalid birth time format')).toBeInTheDocument()
      })
    })
  })

  describe('Navigation', () => {
    test('should navigate back from edit page', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        // Look for the back button by its icon (ArrowLeft)
        const backButton = screen.getByRole('button', { name: '' })
        expect(backButton).toBeInTheDocument()
      })
      
      // Find the back button by its position (first button in header)
      const buttons = screen.getAllByRole('button')
      const backButton = buttons[0] // First button should be the back button
      fireEvent.click(backButton)
      expect(mockBack).toHaveBeenCalled()
    })

    test('should navigate to profile page after successful save', async () => {
      render(<EditProfilePage />)
      
      await waitFor(() => {
        expect(screen.getByText('Save Changes')).toBeInTheDocument()
      })
      
      // Mock successful save response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Profile updated successfully'
        })
      })
      
      fireEvent.click(screen.getByText('Save Changes'))
      
      // Wait for the async save operation to complete
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/profile')
      }, { timeout: 3000 })
    })
  })
})
