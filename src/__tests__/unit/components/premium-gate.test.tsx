import { describe, it, expect, jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import PremiumGate from '@/components/premium/PremiumGate'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/premium',
    query: {},
  }),
}))

// Mock session
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      },
    },
    status: 'authenticated',
  }),
}))

describe('PremiumGate Component', () => {
  describe('Free User Experience', () => {
    it('should show blurred content for free users', () => {
      render(
        <PremiumGate feature="advanced-numerology">
          <div>Premium Content</div>
        </PremiumGate>
      )
      
      expect(screen.getByText('Premium Content')).toBeInTheDocument()
      expect(screen.getByText('Subscribe to unlock')).toBeInTheDocument()
    })

    it('should show subscribe modal when clicked', () => {
      render(
        <PremiumGate feature="advanced-numerology">
          <div>Premium Content</div>
        </PremiumGate>
      )
      
      const subscribeButton = screen.getByText('Subscribe Now')
      fireEvent.click(subscribeButton)
      
      expect(screen.getByText('Upgrade to Premium')).toBeInTheDocument()
    })

    it('should display feature benefits', () => {
      render(
        <PremiumGate feature="advanced-numerology">
          <div>Premium Content</div>
        </PremiumGate>
      )
      
      expect(screen.getByText('Advanced Numerology')).toBeInTheDocument()
      expect(screen.getByText('Unlock all features')).toBeInTheDocument()
    })
  })

  describe('Premium User Experience', () => {
    beforeEach(() => {
      // Mock premium user session
      jest.doMock('next-auth/react', () => ({
        useSession: () => ({
          data: {
            user: {
              id: '1',
              email: 'premium@example.com',
              name: 'Premium User',
              role: 'premium',
            },
          },
          status: 'authenticated',
        }),
      }))
    })

    it('should show full content for premium users', () => {
      render(
        <PremiumGate feature="advanced-numerology">
          <div>Premium Content</div>
        </PremiumGate>
      )
      
      expect(screen.getByText('Premium Content')).toBeInTheDocument()
      expect(screen.queryByText('Subscribe to unlock')).not.toBeInTheDocument()
    })
  })

  describe('Admin User Experience', () => {
    beforeEach(() => {
      // Mock admin user session
      jest.doMock('next-auth/react', () => ({
        useSession: () => ({
          data: {
            user: {
              id: '1',
              email: 'admin@example.com',
              name: 'Admin User',
              role: 'admin',
            },
          },
          status: 'authenticated',
        }),
      }))
    })

    it('should show full content for admin users', () => {
      render(
        <PremiumGate feature="advanced-numerology">
          <div>Premium Content</div>
        </PremiumGate>
      )
      
      expect(screen.getByText('Premium Content')).toBeInTheDocument()
      expect(screen.queryByText('Subscribe to unlock')).not.toBeInTheDocument()
    })
  })

  describe('Feature Gating', () => {
    it('should gate advanced numerology for free users', () => {
      render(
        <PremiumGate feature="advanced-numerology">
          <div>Advanced Numerology Content</div>
        </PremiumGate>
      )
      
      expect(screen.getByText('Advanced Numerology Content')).toBeInTheDocument()
      expect(screen.getByText('Subscribe to unlock')).toBeInTheDocument()
    })

    it('should gate AI insights for free users', () => {
      render(
        <PremiumGate feature="ai-insights">
          <div>AI Insights Content</div>
        </PremiumGate>
      )
      
      expect(screen.getByText('AI Insights Content')).toBeInTheDocument()
      expect(screen.getByText('Subscribe to unlock')).toBeInTheDocument()
    })

    it('should gate dream analysis for free users', () => {
      render(
        <PremiumGate feature="dream-analysis">
          <div>Dream Analysis Content</div>
        </PremiumGate>
      )
      
      expect(screen.getByText('Dream Analysis Content')).toBeInTheDocument()
      expect(screen.getByText('Subscribe to unlock')).toBeInTheDocument()
    })
  })
})

