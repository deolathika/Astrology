/**
 * Rate Limiting System for Daily Secrets App
 * Implements role-based rate limiting for API endpoints
 */

import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message: string
  skipSuccessfulRequests?: boolean
}

interface RateLimiter {
  requests: Map<string, { count: number; resetTime: number }>
  config: RateLimitConfig
}

// Rate limit configurations by role
export const rateLimiters = {
  // General API rate limiting
  general: {
    requests: new Map<string, { count: number; resetTime: number }>(),
    config: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
      message: 'Too many requests, please try again later'
    }
  },
  
  // Authentication rate limiting
  auth: {
    requests: new Map<string, { count: number; resetTime: number }>(),
    config: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5,
      message: 'Too many authentication attempts, please try again later'
    }
  },
  
  // Admin operations rate limiting
  admin: {
    requests: new Map<string, { count: number; resetTime: number }>(),
    config: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 10,
      message: 'Admin rate limit exceeded'
    }
  },
  
  // Sensitive operations rate limiting
  sensitive: {
    requests: new Map<string, { count: number; resetTime: number }>(),
    config: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 3,
      message: 'Sensitive operation rate limit exceeded'
    }
  },
  
  // Premium user rate limiting
  premium: {
    requests: new Map<string, { count: number; resetTime: number }>(),
    config: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 20,
      message: 'Premium rate limit exceeded'
    }
  }
}

/**
 * Get client identifier for rate limiting
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get user ID from headers first
  const userId = request.headers.get('x-user-id')
  if (userId) return `user:${userId}`
  
  // Fall back to IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
  return `ip:${ip}`
}

/**
 * Check if request is within rate limit
 */
function isWithinRateLimit(limiter: RateLimiter, identifier: string): boolean {
  const now = Date.now()
  const clientData = limiter.requests.get(identifier)
  
  if (!clientData) {
    limiter.requests.set(identifier, {
      count: 1,
      resetTime: now + limiter.config.windowMs
    })
    return true
  }
  
  // Check if window has expired
  if (now > clientData.resetTime) {
    limiter.requests.set(identifier, {
      count: 1,
      resetTime: now + limiter.config.windowMs
    })
    return true
  }
  
  // Check if within limit
  if (clientData.count < limiter.config.maxRequests) {
    clientData.count++
    return true
  }
  
  return false
}

/**
 * Apply rate limiting to API route
 */
export function applyRateLimit(
  limiter: RateLimiter,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const identifier = getClientIdentifier(request)
    
    if (!isWithinRateLimit(limiter, identifier)) {
      return NextResponse.json(
        {
          error: limiter.config.message,
          retryAfter: Math.ceil(limiter.config.windowMs / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(limiter.config.windowMs / 1000).toString(),
            'X-RateLimit-Limit': limiter.config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + limiter.config.windowMs).toISOString()
          }
        }
      )
    }
    
    // Add rate limit headers to response
    const response = await handler(request)
    const clientData = limiter.requests.get(identifier)
    const remaining = clientData ? Math.max(0, limiter.config.maxRequests - clientData.count) : 0
    
    response.headers.set('X-RateLimit-Limit', limiter.config.maxRequests.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', new Date(clientData?.resetTime || Date.now()).toISOString())
    
    return response
  }
}

/**
 * Role-based rate limiting
 */
export function applyRoleBasedRateLimit(
  userRole: string,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  let limiter: RateLimiter
  
  switch (userRole) {
    case 'admin':
      limiter = rateLimiters.admin
      break
    case 'premium':
      limiter = rateLimiters.premium
      break
    default:
      limiter = rateLimiters.general
      break
  }
  
  return applyRateLimit(limiter, handler)
}

/**
 * Clean up expired rate limit entries
 */
export function cleanupRateLimits(): void {
  const now = Date.now()
  
  Object.values(rateLimiters).forEach(limiter => {
    for (const [identifier, data] of Array.from(limiter.requests.entries())) {
      if (now > data.resetTime) {
        limiter.requests.delete(identifier)
      }
    }
  })
}

// Clean up expired entries every 5 minutes
setInterval(cleanupRateLimits, 5 * 60 * 1000)