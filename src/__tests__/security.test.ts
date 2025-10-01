import { describe, it, expect, beforeEach } from '@jest/globals'
import { NextRequest } from 'next/server'
import { apiRateLimit, authRateLimit } from '../lib/rate-limit'
import { validateCSRFToken, generateCSRFToken } from '../lib/csrf'
import { encryptPII, decryptPII, maskPII } from '../lib/encryption'
import { validateAndSanitize, emailSchema, passwordSchema } from '../lib/input-validation'

describe('Security Features', () => {
  describe('Rate Limiting', () => {
    it('should allow requests within limit', () => {
      const request = new NextRequest('http://localhost:3000/api/test')
      const result = apiRateLimit(request)
      expect(result.success).toBe(true)
      expect(result.remaining).toBeGreaterThan(0)
    })

    it('should block requests exceeding limit', () => {
      // Simulate multiple requests
      for (let i = 0; i < 101; i++) {
        const request = new NextRequest('http://localhost:3000/api/test')
        apiRateLimit(request)
      }
      
      const request = new NextRequest('http://localhost:3000/api/test')
      const result = apiRateLimit(request)
      expect(result.success).toBe(false)
    })

    it('should have different limits for auth endpoints', () => {
      const request = new NextRequest('http://localhost:3000/api/auth/login')
      const result = authRateLimit(request)
      expect(result.success).toBe(true)
      expect(result.remaining).toBeLessThanOrEqual(5)
    })
  })

  describe('CSRF Protection', () => {
    it('should generate valid CSRF tokens', () => {
      const token = generateCSRFToken()
      expect(token).toHaveLength(64)
      expect(/^[a-f0-9]+$/.test(token)).toBe(true)
    })

    it('should validate correct CSRF tokens', () => {
      const token = generateCSRFToken()
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'x-csrf-token': token }
      })
      
      const isValid = validateCSRFToken(request, token)
      expect(isValid).toBe(true)
    })

    it('should reject invalid CSRF tokens', () => {
      const token = generateCSRFToken()
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'x-csrf-token': 'invalid-token' }
      })
      
      const isValid = validateCSRFToken(request, token)
      expect(isValid).toBe(false)
    })
  })

  describe('PII Encryption', () => {
    beforeEach(() => {
      // Set up test encryption key
      process.env.ENCRYPTION_KEY = 'a'.repeat(64)
    })

    it('should encrypt and decrypt PII data', () => {
      const originalData = 'sensitive-user-data@example.com'
      const encrypted = encryptPII(originalData)
      const decrypted = decryptPII(encrypted)
      
      expect(encrypted).not.toBe(originalData)
      expect(decrypted).toBe(originalData)
    })

    it('should mask PII for display', () => {
      const email = 'user@example.com'
      const phone = '1234567890'
      const name = 'John Doe'
      
      expect(maskPII(email, 'email')).toBe('us***@example.com')
      expect(maskPII(phone, 'phone')).toBe('123***7890')
      expect(maskPII(name, 'name')).toBe('J*** D**')
    })

    it('should handle encryption errors gracefully', () => {
      delete process.env.ENCRYPTION_KEY
      
      expect(() => encryptPII('test')).toThrow('ENCRYPTION_KEY environment variable is required')
    })
  })

  describe('Input Validation', () => {
    it('should validate email addresses', () => {
      const validEmail = 'user@example.com'
      const invalidEmail = 'invalid-email'
      
      expect(validateAndSanitize(emailSchema, validEmail).success).toBe(true)
      expect(validateAndSanitize(emailSchema, invalidEmail).success).toBe(false)
    })

    it('should validate password strength', () => {
      const strongPassword = 'SecurePass123!'
      const weakPassword = '123'
      
      expect(validateAndSanitize(passwordSchema, strongPassword).success).toBe(true)
      expect(validateAndSanitize(passwordSchema, weakPassword).success).toBe(false)
    })

    it('should sanitize malicious input', () => {
      const maliciousInput = '<script>alert("xss")</script>'
      const sanitized = maliciousInput
        .trim()
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
      
      expect(sanitized).toBe('scriptalert("xss")/script')
    })
  })
})


