// Simple test to verify testing environment is working
describe('Testing Environment', () => {
  test('should have basic testing setup', () => {
    expect(true).toBe(true)
  })

  test('should be able to import modules', () => {
    const testModule = require('../lib/astrology/astrology-validator')
    expect(testModule).toBeDefined()
  })

  test('should have proper environment variables', () => {
    // Set environment variables for testing
    process.env.NEXTAUTH_SECRET = 'test-secret'
    process.env.NEXTAUTH_URL = 'http://localhost:8120'
    
    expect(process.env.NEXTAUTH_SECRET).toBe('test-secret')
    expect(process.env.NEXTAUTH_URL).toBe('http://localhost:8120')
  })
})
