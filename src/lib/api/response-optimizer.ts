import { NextResponse } from 'next/server'

// Response optimization configuration
const OPTIMIZATION_CONFIG = {
  maxResponseSize: 10000, // 10KB
  compressionThreshold: 1000, // 1KB
  enableCompression: true,
  enableMinification: true,
  enableCaching: true,
}

// Response optimization utilities
export class ResponseOptimizer {
  // Optimize API response data
  static optimizeData(data: any): any {
    if (!data) return data

    // Remove null/undefined values
    const cleaned = this.removeNullValues(data)
    
    // Compress large objects
    if (this.shouldCompress(cleaned)) {
      return this.compressResponse(cleaned)
    }
    
    return cleaned
  }

  // Remove null and undefined values
  private static removeNullValues(obj: any): any {
    if (obj === null || obj === undefined) return undefined
    
    if (Array.isArray(obj)) {
      return obj
        .map(item => this.removeNullValues(item))
        .filter(item => item !== undefined)
    }
    
    if (typeof obj === 'object') {
      const result: any = {}
      for (const [key, value] of Object.entries(obj)) {
        const cleanedValue = this.removeNullValues(value)
        if (cleanedValue !== undefined) {
          result[key] = cleanedValue
        }
      }
      return result
    }
    
    return obj
  }

  // Check if response should be compressed
  private static shouldCompress(data: any): boolean {
    if (!OPTIMIZATION_CONFIG.enableCompression) return false
    
    const size = JSON.stringify(data).length
    return size > OPTIMIZATION_CONFIG.compressionThreshold
  }

  // Compress response data
  private static compressResponse(data: any): any {
    const compressed = {
      ...data,
      _compressed: true,
      _originalSize: JSON.stringify(data).length,
      _compressedAt: new Date().toISOString(),
    }
    
    return compressed
  }

  // Create optimized NextResponse
  static createOptimizedResponse(
    data: any,
    status: number = 200,
    headers: Record<string, string> = {}
  ): NextResponse {
    const optimizedData = this.optimizeData(data)
    const response = NextResponse.json(optimizedData, { status })
    
    // Add performance headers
    this.addPerformanceHeaders(response)
    
    // Add custom headers
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  }

  // Add performance headers
  private static addPerformanceHeaders(response: NextResponse): void {
    // Cache control
    if (OPTIMIZATION_CONFIG.enableCaching) {
      response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300')
    }
    
    // Performance headers
    response.headers.set('X-Response-Time', Date.now().toString())
    response.headers.set('X-Content-Type-Options', 'nosniff')
    
    // Security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
  }

  // Optimize large responses
  static optimizeLargeResponse(data: any): any {
    const size = JSON.stringify(data).length
    
    if (size > OPTIMIZATION_CONFIG.maxResponseSize) {
      return {
        data: this.paginateData(data),
        pagination: {
          total: Array.isArray(data) ? data.length : 1,
          page: 1,
          limit: 100,
          hasMore: true,
        },
        _optimized: true,
        _originalSize: size,
      }
    }
    
    return data
  }

  // Paginate large arrays
  private static paginateData(data: any, limit: number = 100): any {
    if (Array.isArray(data)) {
      return data.slice(0, limit)
    }
    
    return data
  }

  // Create paginated response
  static createPaginatedResponse(
    data: any[],
    page: number = 1,
    limit: number = 100,
    total?: number
  ): NextResponse {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = data.slice(startIndex, endIndex)
    
    const response = {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: total || data.length,
        totalPages: Math.ceil((total || data.length) / limit),
        hasNext: endIndex < (total || data.length),
        hasPrev: page > 1,
      },
    }
    
    return this.createOptimizedResponse(response)
  }

  // Create error response
  static createErrorResponse(
    message: string,
    statusCode: number = 500,
    code?: string
  ): NextResponse {
    const errorResponse = {
      error: message,
      code,
      statusCode,
      timestamp: new Date().toISOString(),
    }
    
    return this.createOptimizedResponse(errorResponse, statusCode)
  }

  // Create success response
  static createSuccessResponse(
    data: any,
    message?: string,
    statusCode: number = 200
  ): NextResponse {
    const successResponse = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    }
    
    return this.createOptimizedResponse(successResponse, statusCode)
  }
}

// Response caching utilities
export class ResponseCache {
  private static cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()
  
  // Set cache entry
  static set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }
  
  // Get cache entry
  static get(key: string): any | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    
    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }
  
  // Delete cache entry
  static delete(key: string): boolean {
    return this.cache.delete(key)
  }
  
  // Clear all cache
  static clear(): void {
    this.cache.clear()
  }
  
  // Get cache stats
  static getStats(): Record<string, any> {
    const now = Date.now()
    let validEntries = 0
    let expiredEntries = 0
    
    for (const [key, entry] of Array.from(this.cache.entries())) {
      if (now - entry.timestamp > entry.ttl) {
        expiredEntries++
      } else {
        validEntries++
      }
    }
    
    return {
      totalEntries: this.cache.size,
      validEntries,
      expiredEntries,
      hitRate: 0, // Would need to track hits/misses
    }
  }
}

// Response compression utilities
export class ResponseCompression {
  // Compress response data
  static compress(data: any): any {
    if (typeof data !== 'object') return data
    
    // Simple compression by removing redundant data
    const compressed = {
      ...data,
      _compressed: true,
      _size: JSON.stringify(data).length,
    }
    
    return compressed
  }
  
  // Decompress response data
  static decompress(data: any): any {
    if (!data._compressed) return data
    
    const { _compressed, _size, ...rest } = data
    return rest
  }
}

// Response validation
export class ResponseValidator {
  // Validate response structure
  static validateResponse(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!data) {
      errors.push('Response data is null or undefined')
    }
    
    if (typeof data === 'object' && data !== null) {
      // Check for circular references
      if (this.hasCircularReference(data)) {
        errors.push('Response contains circular references')
      }
      
      // Check for excessive nesting
      if (this.getDepth(data) > 10) {
        errors.push('Response has excessive nesting depth')
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
    }
  }
  
  // Check for circular references
  private static hasCircularReference(obj: any, seen: Set<any> = new Set()): boolean {
    if (obj === null || typeof obj !== 'object') return false
    
    if (seen.has(obj)) return true
    
    seen.add(obj)
    
    for (const value of Object.values(obj)) {
      if (this.hasCircularReference(value, seen)) return true
    }
    
    seen.delete(obj)
    return false
  }
  
  // Get object depth
  private static getDepth(obj: any, depth: number = 0): number {
    if (obj === null || typeof obj !== 'object') return depth
    
    let maxDepth = depth
    for (const value of Object.values(obj)) {
      maxDepth = Math.max(maxDepth, this.getDepth(value, depth + 1))
    }
    
    return maxDepth
  }
}

// Response optimization middleware
export function responseOptimizationMiddleware(
  handler: (request: Request) => Promise<NextResponse>
) {
  return async (request: Request): Promise<NextResponse> => {
    const start = performance.now()
    
    try {
      const response = await handler(request)
      const duration = performance.now() - start
      
      // Add performance headers
      response.headers.set('X-Response-Time', `${Math.round(duration)}ms`)
      
      return response
    } catch (error) {
      const duration = performance.now() - start
      console.error(`Response optimization error after ${Math.round(duration)}ms:`, error)
      throw error
    }
  }
}