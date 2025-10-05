// Simple in-memory cache implementation
interface CacheEntry {
  value: any
  expires: number
  lastAccessed: number
}

// Cache configuration
const CACHE_CONFIG = {
  max: 1000, // Maximum number of items
  ttl: 1000 * 60 * 5, // 5 minutes default TTL
}

// Create cache instance
const queryCache = new Map<string, CacheEntry>()

// Cache statistics
let cacheStats = {
  hits: 0,
  misses: 0,
  sets: 0,
  deletes: 0,
  clears: 0,
}

// Cache key generator
export function generateCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key]
      return result
    }, {} as Record<string, any>)
  
  return `${prefix}:${JSON.stringify(sortedParams)}`
}

// Generic cached query function
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Check cache first
  const cached = queryCache.get(key)
  if (cached && cached.expires > Date.now()) {
    cached.lastAccessed = Date.now()
    cacheStats.hits++
    return cached.value
  }

  // Cache miss - execute query
  cacheStats.misses++
  const result = await queryFn()
  
  // Store in cache
  const expires = Date.now() + (ttl || CACHE_CONFIG.ttl)
  queryCache.set(key, {
    value: result,
    expires,
    lastAccessed: Date.now()
  })
  cacheStats.sets++
  
  // Clean up if cache is too large
  if (queryCache.size > CACHE_CONFIG.max) {
    const entries = Array.from(queryCache.entries())
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed)
    const toDelete = entries.slice(0, Math.floor(CACHE_CONFIG.max * 0.1))
    toDelete.forEach(([key]) => queryCache.delete(key))
  }
  
  return result
}

// Specific cache functions for common queries
export class QueryCache {
  // User profile cache
  static async getUserProfile(userId: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('user_profile', { userId })
    return cachedQuery(key, queryFn, 1000 * 60 * 10) // 10 minutes
  }

  // User settings cache
  static async getUserSettings(userId: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('user_settings', { userId })
    return cachedQuery(key, queryFn, 1000 * 60 * 30) // 30 minutes
  }

  // User subscription cache
  static async getUserSubscription(userId: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('user_subscription', { userId })
    return cachedQuery(key, queryFn, 1000 * 60 * 15) // 15 minutes
  }

  // Astrology readings cache
  static async getAstrologyReadings(userId: string, type?: string, system?: string, queryFn?: () => Promise<any>) {
    const key = generateCacheKey('astrology_readings', { userId, type, system })
    return cachedQuery(key, queryFn!, 1000 * 60 * 5) // 5 minutes
  }

  // Numerology readings cache
  static async getNumerologyReadings(userId: string, type?: string, system?: string, queryFn?: () => Promise<any>) {
    const key = generateCacheKey('numerology_readings', { userId, type, system })
    return cachedQuery(key, queryFn!, 1000 * 60 * 5) // 5 minutes
  }

  // User notifications cache
  static async getUserNotifications(userId: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('user_notifications', { userId })
    return cachedQuery(key, queryFn, 1000 * 60 * 2) // 2 minutes
  }

  // User dreams cache
  static async getUserDreams(userId: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('user_dreams', { userId })
    return cachedQuery(key, queryFn, 1000 * 60 * 5) // 5 minutes
  }

  // User matches cache
  static async getUserMatches(userId: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('user_matches', { userId })
    return cachedQuery(key, queryFn, 1000 * 60 * 10) // 10 minutes
  }

  // User analytics cache
  static async getUserAnalytics(userId: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('user_analytics', { userId })
    return cachedQuery(key, queryFn, 1000 * 60 * 3) // 3 minutes
  }

  // Daily insights cache
  static async getDailyInsights(userId: string, date: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('daily_insights', { userId, date })
    return cachedQuery(key, queryFn, 1000 * 60 * 60 * 24) // 24 hours
  }

  // Compatibility analysis cache
  static async getCompatibilityAnalysis(userId: string, partnerId: string, queryFn: () => Promise<any>) {
    const key = generateCacheKey('compatibility_analysis', { userId, partnerId })
    return cachedQuery(key, queryFn, 1000 * 60 * 30) // 30 minutes
  }
}

// Cache management functions
export function invalidateUserCache(userId: string) {
  const patterns = [
    `user_profile:{"userId":"${userId}"}`,
    `user_settings:{"userId":"${userId}"}`,
    `user_subscription:{"userId":"${userId}"}`,
    `user_notifications:{"userId":"${userId}"}`,
    `user_dreams:{"userId":"${userId}"}`,
    `user_matches:{"userId":"${userId}"}`,
    `user_analytics:{"userId":"${userId}"}`,
    `daily_insights:{"userId":"${userId}"}`,
    `compatibility_analysis:{"userId":"${userId}"}`,
  ]

  patterns.forEach(pattern => {
    queryCache.delete(pattern)
    cacheStats.deletes++
  })
}

export function invalidateCachePattern(pattern: string) {
  const keys = Array.from(queryCache.keys())
  const matchingKeys = keys.filter(key => key.includes(pattern))
  
  matchingKeys.forEach(key => {
    queryCache.delete(key)
    cacheStats.deletes++
  })
}

export function clearAllCache() {
  queryCache.clear()
  cacheStats.clears++
}

// Cache statistics
export function getCacheStats() {
  return {
    ...cacheStats,
    size: queryCache.size,
    maxSize: CACHE_CONFIG.max,
    hitRate: cacheStats.hits / (cacheStats.hits + cacheStats.misses) || 0,
  }
}

// Cache health check
export function getCacheHealth() {
  const stats = getCacheStats()
  return {
    status: 'healthy',
    stats,
    timestamp: new Date().toISOString(),
  }
}

// Cache warming functions
export async function warmUserCache(userId: string, queries: {
  profile?: () => Promise<any>
  settings?: () => Promise<any>
  subscription?: () => Promise<any>
  notifications?: () => Promise<any>
}) {
  const promises = []

  if (queries.profile) {
    promises.push(QueryCache.getUserProfile(userId, queries.profile))
  }
  
  if (queries.settings) {
    promises.push(QueryCache.getUserSettings(userId, queries.settings))
  }
  
  if (queries.subscription) {
    promises.push(QueryCache.getUserSubscription(userId, queries.subscription))
  }
  
  if (queries.notifications) {
    promises.push(QueryCache.getUserNotifications(userId, queries.notifications))
  }

  await Promise.all(promises)
}

// Cache cleanup (remove expired entries)
export function cleanupCache() {
  const now = Date.now()
  const keys = Array.from(queryCache.keys())
  
  keys.forEach(key => {
    const entry = queryCache.get(key)
    if (entry === undefined) {
      queryCache.delete(key)
      cacheStats.deletes++
    }
  })
}

// Periodic cache cleanup
export function startCacheCleanup(intervalMs: number = 1000 * 60 * 5) { // 5 minutes
  setInterval(cleanupCache, intervalMs)
}