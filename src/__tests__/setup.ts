import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Mock TextEncoder and TextDecoder for Node.js environment
global.TextEncoder = TextEncoder as any
global.TextDecoder = TextDecoder as any

// Mock fetch for API tests
global.fetch = jest.fn()

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Next.js session
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: 'test-user-123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER'
      }
    },
    status: 'authenticated'
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// Mock environment variables
process.env.NEXTAUTH_SECRET = 'test-secret'
process.env.NEXTAUTH_URL = 'http://localhost:8120'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/daily_secrets_test'

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

beforeAll(() => {
  // Suppress console warnings and errors in tests
  const suppressConsole = (originalMethod: any) => (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') || args[0].includes('Error:'))
    ) {
      return
    }
    originalMethod.call(console, ...args)
  }
  
  console.error = suppressConsole(originalConsoleError)
  console.warn = suppressConsole(originalConsoleWarn)
})

afterAll(() => {
  console.error = originalConsoleError
  console.warn = originalConsoleWarn
})
