/**
 * CSRF Protection Middleware for Daily Secrets App
 * Implements CSRF token validation for state-changing operations
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

interface CSRFConfig {
  secret: string
  tokenLength: number
  headerName: string
  cookieName: string
  maxAge: number
}

const defaultConfig: CSRFConfig = {
  secret: process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET || 'default-csrf-secret',
  tokenLength: 32,
  headerName: 'x-csrf-token',
  cookieName: 'csrf-token',
  maxAge: 60 * 60 * 1000 // 1 hour
}

/**
 * Generate CSRF token
 */
function generateCSRFToken(): string {
  return crypto.randomBytes(defaultConfig.tokenLength).toString('hex')
}

/**
 * Create CSRF token hash
 */
function createCSRFHash(token: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(token)
    .digest('hex')
}

/**
 * Verify CSRF token
 */
function verifyCSRFToken(token: string, hash: string, secret: string): boolean {
  const expectedHash = createCSRFHash(token, secret)
  return crypto.timingSafeEqual(
    Buffer.from(hash, 'hex'),
    Buffer.from(expectedHash, 'hex')
  )
}

/**
 * Get CSRF token from request
 */
async function getCSRFTokenFromRequest(request: NextRequest): Promise<string | null> {
  // Try header first
  const headerToken = request.headers.get(defaultConfig.headerName)
  if (headerToken) return headerToken
  
  // Try cookie
  const cookieToken = request.cookies.get(defaultConfig.cookieName)?.value
  if (cookieToken) return cookieToken
  
  // Try form data for POST requests
  if (request.method === 'POST') {
    try {
      const formData = await request.formData()
      const formToken = formData.get('csrf_token') as string
      if (formToken) return formToken
    } catch (error) {
      // Ignore form data parsing errors
    }
  }
  
  return null
}

/**
 * Set CSRF token in response
 */
function setCSRFToken(response: NextResponse, token: string): void {
  const hash = createCSRFHash(token, defaultConfig.secret)
  
  response.cookies.set(defaultConfig.cookieName, `${token}.${hash}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: defaultConfig.maxAge
  })
}

/**
 * CSRF protection middleware
 */
export function withCSRF(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Skip CSRF for GET requests and safe methods
    if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      return handler(request)
    }
    
    // Skip CSRF for API routes that don't need it
    const pathname = request.nextUrl.pathname
    const skipPaths = [
      '/api/auth/[...nextauth]',
      '/api/health',
      '/api/analytics'
    ]
    
    if (skipPaths.some(path => pathname.startsWith(path))) {
      return handler(request)
    }
    
    const token = await getCSRFTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json(
        { error: 'CSRF token missing' },
        { status: 403 }
      )
    }
    
    // Extract token and hash from cookie format
    const [tokenPart, hashPart] = token.includes('.') 
      ? token.split('.', 2)
      : [token, null]
    
    if (!hashPart) {
      return NextResponse.json(
        { error: 'Invalid CSRF token format' },
        { status: 403 }
      )
    }
    
    if (!verifyCSRFToken(tokenPart, hashPart, defaultConfig.secret)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }
    
    return handler(request)
  }
}

/**
 * Generate and set CSRF token for response
 */
export function generateCSRFResponse(): { token: string; response: NextResponse } {
  const token = generateCSRFToken()
  const response = NextResponse.json({ csrfToken: token })
  setCSRFToken(response, token)
  
  return { token, response }
}

/**
 * CSRF token endpoint
 */
export async function getCSRFToken(request: NextRequest): Promise<NextResponse> {
  const { response } = generateCSRFResponse()
  return response
}

/**
 * Validate CSRF token for API routes
 */
export async function validateCSRFToken(request: NextRequest): Promise<boolean> {
  const token = await getCSRFTokenFromRequest(request)
  
  if (!token) return false
  
  const [tokenPart, hashPart] = token.includes('.') 
    ? token.split('.', 2)
    : [token, null]
  
  if (!hashPart) return false
  
  return verifyCSRFToken(tokenPart, hashPart, defaultConfig.secret)
}

/**
 * CSRF protection for specific routes
 */
export function protectRoute(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return withCSRF(handler)
}

/**
 * Get CSRF configuration
 */
export function getCSRFConfig(): CSRFConfig {
  return { ...defaultConfig }
}

/**
 * Update CSRF configuration
 */
export function updateCSRFConfig(config: Partial<CSRFConfig>): void {
  Object.assign(defaultConfig, config)
}