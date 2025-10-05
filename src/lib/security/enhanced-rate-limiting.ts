import { NextRequest } from 'next/server'

// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
  keyGenerator?: (request: NextRequest) => string
  onLimitReached?: (request: NextRequest, limit: number) => void
}

// Rate limit store
class RateLimitStore {
  private store: Map<string, { count: number; resetTime: number }> = new Map<string, { count: number; resetTime: number }>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  get(key: string): { count: number; resetTime: number } | undefined {
    return this.store.get(key)
  }

  set(key: string, value: { count: number; resetTime: number }): void {
    this.store.set(key, value)
  }

  delete(key: string): boolean {
    return this.store.delete(key)
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, value] of Array.from(this.store.entries())) {
      if (value.resetTime < now) {
        this.store.delete(key)
      }
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval)
    this.store.clear()
  }
}

// Global rate limit store
const rateLimitStore = new RateLimitStore()

// Enhanced rate limiting class
export class EnhancedRateLimit {
  private config: RateLimitConfig
  private store: RateLimitStore

  constructor(config: RateLimitConfig) {
    this.config = config
    this.store = rateLimitStore
  }

  // Check if request is within rate limit
  async checkLimit(request: NextRequest): Promise<{
    success: boolean
    remaining: number
    resetTime: number
    totalHits: number
  }> {
    const key = this.getKey(request)
    const now = Date.now()
    const windowStart = now - this.config.windowMs

    // Clean old entries
    this.cleanupOldEntries(windowStart)

    // Get current entry
    const current = this.store.get(key)
    
    if (!current) {
      // First request in window
      this.store.set(key, { count: 1, resetTime: now + this.config.windowMs })
      return {
        success: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs,
        totalHits: 1,
      }
    }

    // Check if window has expired
    if (current.resetTime < now) {
      // Window expired, reset
      this.store.set(key, { count: 1, resetTime: now + this.config.windowMs })
      return {
        success: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs,
        totalHits: 1,
      }
    }

    // Check if limit exceeded
    if (current.count >= this.config.maxRequests) {
      if (this.config.onLimitReached) {
        this.config.onLimitReached(request, this.config.maxRequests)
      }
      
      return {
        success: false,
        remaining: 0,
        resetTime: current.resetTime,
        totalHits: current.count,
      }
    }

    // Increment count
    current.count++
    this.store.set(key, current)
    
    return {
      success: true,
      remaining: this.config.maxRequests - current.count,
      resetTime: current.resetTime,
      totalHits: current.count,
    }
  }

  // Get rate limit key
  private getKey(request: NextRequest): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(request)
    }
    
    // Default key generation
    const ip = this.getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const path = request.nextUrl.pathname
    
    return `rate_limit:${ip}:${path}:${userAgent.slice(0, 50)}`
  }

  // Get client IP address
  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const cfConnectingIP = request.headers.get('cf-connecting-ip')
    
    if (cfConnectingIP) return cfConnectingIP
    if (realIP) return realIP
    if (forwarded) return forwarded.split(',')[0].trim()
    
    return request.ip || 'unknown'
  }

  // Clean up old entries
  private cleanupOldEntries(windowStart: number): void {
    const keysToDelete: string[] = []
    const storeMap = this.store as unknown as Map<string, { count: number; resetTime: number }>
    storeMap.forEach((value: { count: number; resetTime: number }, key: string) => {
      if (value.resetTime < windowStart) {
        keysToDelete.push(key)
      }
    })
    keysToDelete.forEach(key => storeMap.delete(key))
  }

  // Get store size
  getSize(): number {
    return (this.store as unknown as Map<string, { count: number; resetTime: number }>).size
  }

  // Get rate limit info
  getInfo(request: NextRequest): {
    key: string
    current: number
    limit: number
    remaining: number
    resetTime: number
  } {
    const key = this.getKey(request)
    const current = this.store.get(key)
    const now = Date.now()
    
    if (!current || current.resetTime < now) {
      return {
        key,
        current: 0,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs,
      }
    }
    
    return {
      key,
      current: current.count,
      limit: this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - current.count),
      resetTime: current.resetTime,
    }
  }
}

// Predefined rate limit configurations
export const RATE_LIMITS = {
  // General API rate limit
  general: new EnhancedRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    keyGenerator: (request) => {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      return `general:${ip}`
    },
  }),

  // Authentication rate limit
  auth: new EnhancedRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    keyGenerator: (request) => {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      return `auth:${ip}`
    },
  }),

  // Profile update rate limit
  profile: new EnhancedRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    keyGenerator: (request) => {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      return `profile:${ip}`
    },
  }),

  // Astrology calculation rate limit
  astrology: new EnhancedRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
    keyGenerator: (request) => {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      return `astrology:${ip}`
    },
  }),

  // Numerology calculation rate limit
  numerology: new EnhancedRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
    keyGenerator: (request) => {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      return `numerology:${ip}`
    },
  }),

  // Dream rate limit
  dreams: new EnhancedRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    keyGenerator: (request) => {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      return `dreams:${ip}`
    },
  }),

  // Community rate limit
  community: new EnhancedRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    keyGenerator: (request) => {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      return `community:${ip}`
    },
  }),

  // Admin rate limit
  admin: new EnhancedRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 50,
    keyGenerator: (request) => {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      return `admin:${ip}`
    },
  }),
}

// Rate limiting middleware
export function createRateLimitMiddleware(rateLimit: EnhancedRateLimit) {
  return async (request: NextRequest): Promise<Response | null> => {
    const result = await rateLimit.checkLimit(request)
    
    if (!result.success) {
      const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000)
      
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter,
          limit: rateLimit.getInfo(request).limit,
          remaining: 0,
          resetTime: result.resetTime,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': rateLimit.getInfo(request).limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': result.resetTime.toString(),
          },
        }
      )
    }
    
    return null
  }
}

// Rate limit info endpoint
export function getRateLimitInfo(request: NextRequest, rateLimit: EnhancedRateLimit) {
  const info = rateLimit.getInfo(request)
  
  return {
    key: info.key,
    current: info.current,
    limit: info.limit,
    remaining: info.remaining,
    resetTime: info.resetTime,
    resetIn: Math.max(0, info.resetTime - Date.now()),
  }
}

// Rate limit statistics
export function getRateLimitStats() {
  return {
    totalKeys: (rateLimitStore as any).getSize(),
    timestamp: new Date().toISOString(),
  }
}

// Clean up rate limit store
export function cleanupRateLimitStore() {
  rateLimitStore.destroy()
}

// Simple rate limiting function for backward compatibility
export function enhancedRateLimit(
  request: NextRequest,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const windowStart = now - windowMs

  // Simple in-memory rate limiting
  const key = `rate_limit:${ip}`
  const current = rateLimitStore.get(key)
  
  if (!current || current.resetTime < now) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (current.count >= limit) {
    return { 
      success: false, 
      remaining: 0, 
      resetTime: current.resetTime 
    }
  }

  current.count++
  rateLimitStore.set(key, current)
  return { success: true, remaining: limit - current.count }
}
