import { NextRequest } from 'next/server'

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message: string
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store (use Redis in production)
const store: RateLimitStore = {}

export function rateLimit(config: RateLimitConfig) {
  return (request: NextRequest) => {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Clean up expired entries
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })

    // Get or create entry for this IP
    if (!store[ip]) {
      store[ip] = {
        count: 0,
        resetTime: now + config.windowMs
      }
    }

    // Check if window has expired
    if (store[ip].resetTime < now) {
      store[ip] = {
        count: 0,
        resetTime: now + config.windowMs
      }
    }

    // Increment counter
    store[ip].count++

    // Check if limit exceeded
    if (store[ip].count > config.maxRequests) {
      return {
        success: false,
        message: config.message,
        remaining: 0,
        resetTime: store[ip].resetTime
      }
    }

    return {
      success: true,
      remaining: config.maxRequests - store[ip].count,
      resetTime: store[ip].resetTime
    }
  }
}

// Predefined rate limiters
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per 15 minutes
  message: 'Too many requests, please try again later'
})

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts per 15 minutes
  message: 'Too many authentication attempts, please try again later'
})

export const uploadRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 uploads per minute
  message: 'Too many uploads, please slow down'
})


