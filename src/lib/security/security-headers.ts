/**
 * Security Headers Middleware for Daily Secrets App
 * Implements comprehensive security headers for production
 */

import { NextRequest, NextResponse } from 'next/server'

interface SecurityHeadersConfig {
  contentSecurityPolicy: string
  permissionsPolicy: string
  referrerPolicy: string
  xFrameOptions: string
  xContentTypeOptions: string
  xXSSProtection: string
  strictTransportSecurity: string
}

const defaultConfig: SecurityHeadersConfig = {
  contentSecurityPolicy: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https: blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "connect-src 'self' https://api.openai.com https://generativelanguage.googleapis.com https://maps.googleapis.com https://www.google-analytics.com https://vitals.vercel-insights.com",
    "frame-src 'self' https://js.stripe.com",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "upgrade-insecure-requests"
  ].join('; '),
  
  permissionsPolicy: [
    'camera=()',
    'microphone=()',
    'geolocation=(self)',
    'interest-cohort=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()'
  ].join(', '),
  
  referrerPolicy: 'strict-origin-when-cross-origin',
  xFrameOptions: 'DENY',
  xContentTypeOptions: 'nosniff',
  xXSSProtection: '1; mode=block',
  strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload'
}

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  // Content Security Policy
  response.headers.set('Content-Security-Policy', defaultConfig.contentSecurityPolicy)
  
  // Permissions Policy
  response.headers.set('Permissions-Policy', defaultConfig.permissionsPolicy)
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', defaultConfig.referrerPolicy)
  
  // X-Frame-Options
  response.headers.set('X-Frame-Options', defaultConfig.xFrameOptions)
  
  // X-Content-Type-Options
  response.headers.set('X-Content-Type-Options', defaultConfig.xContentTypeOptions)
  
  // X-XSS-Protection
  response.headers.set('X-XSS-Protection', defaultConfig.xXSSProtection)
  
  // Strict-Transport-Security (HTTPS only)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', defaultConfig.strictTransportSecurity)
  }
  
  // Additional security headers
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  
  // Cache control for sensitive endpoints
  if (response.url?.includes('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }
  
  return response
}

/**
 * Apply security headers middleware
 */
export function withSecurityHeaders(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const response = await handler(request)
    return applySecurityHeaders(response)
  }
}

/**
 * Get security headers configuration
 */
export function getSecurityHeadersConfig(): SecurityHeadersConfig {
  return { ...defaultConfig }
}

/**
 * Update security headers configuration
 */
export function updateSecurityHeadersConfig(config: Partial<SecurityHeadersConfig>): void {
  Object.assign(defaultConfig, config)
}

/**
 * Development-specific security headers
 */
export function applyDevelopmentSecurityHeaders(response: NextResponse): NextResponse {
  // Relaxed CSP for development
  const devCSP = [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' http://localhost:* https://api.openai.com https://generativelanguage.googleapis.com"
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', devCSP)
  
  // Other headers remain the same
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
}

/**
 * API-specific security headers
 */
export function applyAPISecurityHeaders(response: NextResponse): NextResponse {
  // No caching for API responses
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  
  // CORS headers for API
  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token')
  response.headers.set('Access-Control-Max-Age', '86400')
  
  return applySecurityHeaders(response)
}

/**
 * Static asset security headers
 */
export function applyStaticAssetSecurityHeaders(response: NextResponse): NextResponse {
  // Cache static assets
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  
  // Security headers for static assets
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  
  return response
}