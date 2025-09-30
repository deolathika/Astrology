/**
 * IndexedDB Service for Daily Secrets App
 * Provides offline data storage using Dexie
 */

import Dexie, { Table } from 'dexie'

export interface OfflineUser {
  id: string
  fullName: string
  email: string
  birthDate: string
  birthTime: string
  birthPlace: string
  latitude: number
  longitude: number
  timezone: string
  language: string
  theme: string
  lastSync: Date
}

export interface OfflineReading {
  id: string
  userId: string
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  system: 'western' | 'vedic' | 'chinese' | 'sri_lankan'
  data: any
  insights: string
  date: Date
  synced: boolean
}

export interface OfflineDream {
  id: string
  userId: string
  title: string
  description: string
  symbols: string[]
  interpretation: string
  emotionalTone: string
  significance: string
  tags: string[]
  date: Date
  synced: boolean
}

export interface OfflineSettings {
  id: string
  userId: string
  notifications: boolean
  dailyGuidance: boolean
  dreamAlerts: boolean
  compatibilityUpdates: boolean
  cosmicEvents: boolean
  pushNotifications: boolean
  emailNotifications: boolean
  profileVisibility: string
  dataSharing: boolean
  analytics: boolean
  crashReports: boolean
  lastSync: Date
}

export interface OfflineCache {
  id: string
  key: string
  data: any
  expires: Date
  lastAccess: Date
}

class DailySecretsDB extends Dexie {
  users!: Table<OfflineUser>
  readings!: Table<OfflineReading>
  dreams!: Table<OfflineDream>
  settings!: Table<OfflineSettings>
  cache!: Table<OfflineCache>

  constructor() {
    super('DailySecretsDB')
    
    this.version(1).stores({
      users: 'id, email, lastSync',
      readings: 'id, userId, type, system, date, synced',
      dreams: 'id, userId, date, synced',
      settings: 'id, userId, lastSync',
      cache: 'id, key, expires, lastAccess'
    })
  }
}

export const db = new DailySecretsDB()

export class OfflineService {
  /**
   * Save user data offline
   */
  static async saveUser(user: OfflineUser): Promise<void> {
    try {
      await db.users.put({
        ...user,
        lastSync: new Date()
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Get user data offline
   */
  static async getUser(userId: string): Promise<OfflineUser | undefined> {
    try {
      return await db.users.get(userId)
    } catch (error) {
      return undefined
    }
  }

  /**
   * Save reading offline
   */
  static async saveReading(reading: OfflineReading): Promise<void> {
    try {
      await db.readings.put(reading)
    } catch (error) {
      throw error
    }
  }

  /**
   * Get readings offline
   */
  static async getReadings(userId: string, type?: string): Promise<OfflineReading[]> {
    try {
      let query = db.readings.where('userId').equals(userId)
      
      if (type) {
        query = query.and(reading => reading.type === type)
      }
      
      return await query.toArray()
    } catch (error) {
      return []
    }
  }

  /**
   * Save dream offline
   */
  static async saveDream(dream: OfflineDream): Promise<void> {
    try {
      await db.dreams.put(dream)
    } catch (error) {
      throw error
    }
  }

  /**
   * Get dreams offline
   */
  static async getDreams(userId: string): Promise<OfflineDream[]> {
    try {
      return await db.dreams.where('userId').equals(userId).toArray()
    } catch (error) {
      return []
    }
  }

  /**
   * Save settings offline
   */
  static async saveSettings(settings: OfflineSettings): Promise<void> {
    try {
      await db.settings.put({
        ...settings,
        lastSync: new Date()
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Get settings offline
   */
  static async getSettings(userId: string): Promise<OfflineSettings | undefined> {
    try {
      return await db.settings.get(userId)
    } catch (error) {
      return undefined
    }
  }

  /**
   * Cache data for offline use
   */
  static async cacheData(key: string, data: any, ttl: number = 3600000): Promise<void> {
    try {
      const expires = new Date(Date.now() + ttl)
      await db.cache.put({
        id: key,
        key,
        data,
        expires,
        lastAccess: new Date()
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Get cached data
   */
  static async getCachedData(key: string): Promise<any | null> {
    try {
      const cached = await db.cache.get(key)
      
      if (!cached) {
        return null
      }
      
      if (cached.expires < new Date()) {
        await db.cache.delete(key)
        return null
      }
      
      // Update last access
      await db.cache.update(key, { lastAccess: new Date() })
      
      return cached.data
    } catch (error) {
      return null
    }
  }

  /**
   * Clear expired cache
   */
  static async clearExpiredCache(): Promise<void> {
    try {
      const now = new Date()
      await db.cache.where('expires').below(now).delete()
    } catch (error) {
      }
  }

  /**
   * Get unsynced data
   */
  static async getUnsyncedData(): Promise<{
    readings: OfflineReading[]
    dreams: OfflineDream[]
  }> {
    try {
      const readings = await db.readings.where('synced').equals(false).toArray()
      const dreams = await db.dreams.where('synced').equals(false).toArray()
      
      return { readings, dreams }
    } catch (error) {
      return { readings: [], dreams: [] }
    }
  }

  /**
   * Mark data as synced
   */
  static async markAsSynced(type: 'readings' | 'dreams', ids: string[]): Promise<void> {
    try {
      if (type === 'readings') {
        await db.readings.where('id').anyOf(ids).modify({ synced: true })
      } else if (type === 'dreams') {
        await db.dreams.where('id').anyOf(ids).modify({ synced: true })
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Clear all offline data
   */
  static async clearAllData(): Promise<void> {
    try {
      await db.users.clear()
      await db.readings.clear()
      await db.dreams.clear()
      await db.settings.clear()
      await db.cache.clear()
    } catch (error) {
      throw error
    }
  }

  /**
   * Get storage usage
   */
  static async getStorageUsage(): Promise<{
    users: number
    readings: number
    dreams: number
    settings: number
    cache: number
    total: number
  }> {
    try {
      const users = await db.users.count()
      const readings = await db.readings.count()
      const dreams = await db.dreams.count()
      const settings = await db.settings.count()
      const cache = await db.cache.count()
      
      return {
        users,
        readings,
        dreams,
        settings,
        cache,
        total: users + readings + dreams + settings + cache
      }
    } catch (error) {
      return { users: 0, readings: 0, dreams: 0, settings: 0, cache: 0, total: 0 }
    }
  }
}

export default OfflineService
