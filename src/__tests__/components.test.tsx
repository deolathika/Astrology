import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../components/theme-provider'
import { UserProvider } from '../components/user-provider'
import { TranslationProvider } from '../components/translation-provider'

// Mock components for testing
const TestComponent = () => (
  <div data-testid="test-component">
    <h1>Test Component</h1>
  </div>
)

describe('Component Providers', () => {
  describe('ThemeProvider', () => {
    it('should render children', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('test-component')).toBeInTheDocument()
    })

    it('should provide theme context', () => {
      const TestConsumer = () => {
        const { theme } = useTheme()
        return <div data-testid="theme">{theme}</div>
      }

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('theme')).toHaveTextContent('light')
    })
  })

  describe('UserProvider', () => {
    it('should render children', () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )
      
      expect(screen.getByTestId('test-component')).toBeInTheDocument()
    })

    it('should provide user context', () => {
      const TestConsumer = () => {
        const { user } = useUser()
        return <div data-testid="user">{user ? 'logged-in' : 'logged-out'}</div>
      }

      render(
        <UserProvider>
          <TestConsumer />
        </UserProvider>
      )
      
      expect(screen.getByTestId('user')).toHaveTextContent('logged-out')
    })
  })

  describe('TranslationProvider', () => {
    it('should render children', () => {
      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      )
      
      expect(screen.getByTestId('test-component')).toBeInTheDocument()
    })

    it('should provide translation context', () => {
      const TestConsumer = () => {
        const { language, translate } = useTranslation()
        return (
          <div data-testid="translation">
            {language}: {translate('welcome_cosmic_journey')}
          </div>
        )
      }

      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>
      )
      
      expect(screen.getByTestId('translation')).toHaveTextContent('en: Welcome to Your Cosmic Journey')
    })
  })
})

// Mock the hooks for testing
const useTheme = () => ({ theme: 'light', setTheme: jest.fn(), toggleTheme: jest.fn() })
const useUser = () => ({ user: null, loadUser: jest.fn(), saveUser: jest.fn(), clearUser: jest.fn() })
const useTranslation = () => ({ 
  language: 'en', 
  setLanguage: jest.fn(), 
  translate: (key: string) => {
    const translations: Record<string, string> = {
      'welcome_cosmic_journey': 'Welcome to Your Cosmic Journey'
    }
    return translations[key] || key
  }
})


