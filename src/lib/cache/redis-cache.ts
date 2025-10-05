/**
 * Redis Cache Integration for Performance Optimization
 * Principal Full-Stack Engineer + QA Lead + Astrology/Numerology Domain Verifier
 * 
 * Provides high-performance caching for astrology calculations, user data, and API responses
 */

export interface CacheConfig {
  host: string
  port: number
  password?: string
  db: number
  ttl: number
  maxRetries: number
  retryDelay: number
}

export interface CacheOptions {
  ttl?: number
  tags?: string[]
  namespace?: string
}

export interface CacheStats {
  hits: number
  misses: number
  sets: number
  deletes: number
  hitRate: number
  memoryUsage: string
  connectedClients: number
}

export class RedisCacheService {
  private static instance: RedisCacheService
  private client: any = null
  private isConnected = false
  private stats: CacheStats
  private config: CacheConfig

  constructor() {
    this.config = {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
      ttl: parseInt(process.env.REDIS_TTL || '3600'), // 1 hour default
      maxRetries: 3,
      retryDelay: 1000
    }

    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      hitRate: 0,
      memoryUsage: '0MB',
      connectedClients: 0
    }
  }

  static getInstance(): RedisCacheService {
    if (!RedisCacheService.instance) {
      RedisCacheService.instance = new RedisCacheService()
    }
    return RedisCacheService.instance
  }

  /**
   * Initialize Redis connection
   */
  async initialize(): Promise<void> {
    if (this.isConnected) return

    try {
      // Dynamic import for Redis client
      const { createClient } = await import('redis')
      
      this.client = createClient({
        socket: {
          host: this.config.host,
          port: this.config.port,
          connectTimeout: 10000
        },
        password: this.config.password,
        database: this.config.db
      })

      this.client.on('error', (err: Error) => {
        console.error('Redis Client Error:', err)
        this.isConnected = false
      })

      this.client.on('connect', () => {
        console.log('Redis Client Connected')
        this.isConnected = true
      })

      this.client.on('ready', () => {
        console.log('Redis Client Ready')
        this.isConnected = true
      })

      await this.client.connect()
      this.isConnected = true
      
      console.log('Redis cache initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Redis:', error)
      this.isConnected = false
      // Fallback to in-memory cache
      this.initializeFallback()
    }
  }

  /**
   * Initialize fallback in-memory cache
   */
  private initializeFallback(): void {
    console.log('Using in-memory cache fallback')
    this.client = new Map()
    this.isConnected = true
  }

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) {
      await this.initialize()
    }

    try {
      const value = await this.client.get(key)
      
      if (value) {
        this.stats.hits++
        this.updateHitRate()
        return JSON.parse(value)
      } else {
        this.stats.misses++
        this.updateHitRate()
        return null
      }
    } catch (error) {
      console.error('Cache get error:', error)
      this.stats.misses++
      this.updateHitRate()
      return null
    }
  }

  /**
   * Set value in cache
   */
  async set(key: string, value: any, options: CacheOptions = {}): Promise<boolean> {
    if (!this.isConnected) {
      await this.initialize()
    }

    try {
      const ttl = options.ttl || this.config.ttl
      const serializedValue = JSON.stringify(value)
      
      if (this.client instanceof Map) {
        // In-memory fallback
        this.client.set(key, serializedValue)
        setTimeout(() => this.client.delete(key), ttl * 1000)
      } else {
        // Redis
        await this.client.setEx(key, ttl, serializedValue)
      }

      this.stats.sets++
      return true
    } catch (error) {
      console.error('Cache set error:', error)
      return false
    }
  }

  /**
   * Delete value from cache
   */
  async delete(key: string): Promise<boolean> {
    if (!this.isConnected) {
      await this.initialize()
    }

    try {
      if (this.client instanceof Map) {
        this.client.delete(key)
      } else {
        await this.client.del(key)
      }

      this.stats.deletes++
      return true
    } catch (error) {
      console.error('Cache delete error:', error)
      return false
    }
  }

  /**
   * Clear cache by pattern
   */
  async clearPattern(pattern: string): Promise<number> {
    if (!this.isConnected) {
      await this.initialize()
    }

    try {
      if (this.client instanceof Map) {
        // In-memory fallback
        let count = 0
        const keys = Array.from(this.client.keys())
        for (const key of keys) {
          if (key.includes(pattern)) {
            this.client.delete(key)
            count++
          }
        }
        return count
      } else {
        // Redis
        const keys = await this.client.keys(pattern)
        if (keys.length > 0) {
          await this.client.del(keys)
        }
        return keys.length
      }
    } catch (error) {
      console.error('Cache clear pattern error:', error)
      return 0
    }
  }

  /**
   * Cache astrology calculation
   */
  async cacheAstrologyCalculation(
    birthData: any,
    calculationType: string,
    result: any,
    ttl: number = 3600
  ): Promise<boolean> {
    const key = `astrology:${calculationType}:${this.hashBirthData(birthData)}`
    return await this.set(key, result, { ttl })
  }

  /**
   * Get cached astrology calculation
   */
  async getCachedAstrologyCalculation(
    birthData: any,
    calculationType: string
  ): Promise<any | null> {
    const key = `astrology:${calculationType}:${this.hashBirthData(birthData)}`
    return await this.get(key)
  }

  /**
   * Cache numerology calculation
   */
  async cacheNumerologyCalculation(
    name: string,
    birthDate: string,
    calculationType: string,
    result: any,
    ttl: number = 3600
  ): Promise<boolean> {
    const key = `numerology:${calculationType}:${this.hashString(name + birthDate)}`
    return await this.set(key, result, { ttl })
  }

  /**
   * Get cached numerology calculation
   */
  async getCachedNumerologyCalculation(
    name: string,
    birthDate: string,
    calculationType: string
  ): Promise<any | null> {
    const key = `numerology:${calculationType}:${this.hashString(name + birthDate)}`
    return await this.get(key)
  }

  /**
   * Cache user profile
   */
  async cacheUserProfile(userId: string, profile: any, ttl: number = 1800): Promise<boolean> {
    const key = `user:profile:${userId}`
    return await this.set(key, profile, { ttl })
  }

  /**
   * Get cached user profile
   */
  async getCachedUserProfile(userId: string): Promise<any | null> {
    const key = `user:profile:${userId}`
    return await this.get(key)
  }

  /**
   * Cache API response
   */
  async cacheAPIResponse(
    endpoint: string,
    params: any,
    response: any,
    ttl: number = 300
  ): Promise<boolean> {
    const key = `api:${endpoint}:${this.hashString(JSON.stringify(params))}`
    return await this.set(key, response, { ttl })
  }

  /**
   * Get cached API response
   */
  async getCachedAPIResponse(endpoint: string, params: any): Promise<any | null> {
    const key = `api:${endpoint}:${this.hashString(JSON.stringify(params))}`
    return await this.get(key)
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats }
  }

  /**
   * Clear all cache
   */
  async clearAll(): Promise<boolean> {
    if (!this.isConnected) {
      await this.initialize()
    }

    try {
      if (this.client instanceof Map) {
        this.client.clear()
      } else {
        await this.client.flushDb()
      }
      return true
    } catch (error) {
      console.error('Cache clear all error:', error)
      return false
    }
  }

  /**
   * Check if cache is connected
   */
  isCacheConnected(): boolean {
    return this.isConnected
  }

  /**
   * Hash birth data for cache key
   */
  private hashBirthData(birthData: any): string {
    const data = {
      year: birthData.year,
      month: birthData.month,
      day: birthData.day,
      hour: birthData.hour,
      minute: birthData.minute,
      latitude: birthData.latitude,
      longitude: birthData.longitude
    }
    return this.hashString(JSON.stringify(data))
  }

  /**
   * Hash string for cache key
   */
  private hashString(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }

  /**
   * Update hit rate
   */
  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0
  }

  /**
   * Close Redis connection
   */
  async close(): Promise<void> {
    if (this.client && !(this.client instanceof Map)) {
      await this.client.quit()
    }
    this.isConnected = false
  }
}

// Export singleton instance
export const redisCache = RedisCacheService.getInstance()
