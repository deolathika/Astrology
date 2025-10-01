import { NextRequest } from 'next/server'
import crypto from 'crypto'

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function validateCSRFToken(request: NextRequest, token: string): boolean {
  // Get CSRF token from header or body
  const csrfToken = request.headers.get('x-csrf-token') || 
                   request.nextUrl.searchParams.get('_csrf')
  
  if (!csrfToken || !token) {
    return false
  }

  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(csrfToken, 'hex'),
    Buffer.from(token, 'hex')
  )
}

export function getCSRFToken(request: NextRequest): string | null {
  return request.headers.get('x-csrf-token') || 
         request.nextUrl.searchParams.get('_csrf')
}

// CSRF protection middleware
export function csrfProtection(request: NextRequest, sessionToken?: string) {
  // Skip CSRF for GET requests
  if (request.method === 'GET') {
    return { valid: true }
  }

  // Skip CSRF for API routes that don't modify data
  const url = request.nextUrl.pathname
  if (url.startsWith('/api/') && request.method === 'GET') {
    return { valid: true }
  }

  // Validate CSRF token
  if (!sessionToken) {
    return { 
      valid: false, 
      error: 'No session token provided' 
    }
  }

  const csrfToken = getCSRFToken(request)
  if (!csrfToken) {
    return { 
      valid: false, 
      error: 'CSRF token missing' 
    }
  }

  if (!validateCSRFToken(request, csrfToken)) {
    return { 
      valid: false, 
      error: 'Invalid CSRF token' 
    }
  }

  return { valid: true }
}


