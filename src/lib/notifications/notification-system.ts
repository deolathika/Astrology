/**
 * Advanced Notification System with FCM and Local Notifications
 * Supports push notifications, deep links, and offline fallbacks
 */

export interface NotificationData {
  id: string
  type: 'daily_guidance' | 'transit_alert' | 'community' | 'streak' | 'system'
  title: string
  body: string
  data?: Record<string, any>
  imageUrl?: string
  actionUrl?: string
  scheduledFor?: string
  priority: 'low' | 'normal' | 'high'
  category: string
}

export interface NotificationSettings {
  userId: string
  dailyGuidance: boolean
  transitAlerts: boolean
  communityUpdates: boolean
  streakReminders: boolean
  systemUpdates: boolean
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
  timezone: string
}

export interface FCMConfig {
  serverKey: string
  projectId: string
  messagingSenderId: string
}

export class NotificationSystem {
  private fcmConfig: FCMConfig | null = null
  private isInitialized = false
  private serviceWorker: ServiceWorker | null = null
  private notificationSettings: Map<string, NotificationSettings> = new Map()

  /**
   * Initialize notification system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Initialize FCM
      await this.initializeFCM()
      
      // Register service worker
      await this.registerServiceWorker()
      
      // Request notification permission
      await this.requestPermission()
      
      this.isInitialized = true
      } catch (error) {
      throw new Error('Notification system initialization failed')
    }
  }

  /**
   * Send daily guidance notification
   */
  async sendDailyGuidance(userId: string, guidance: string): Promise<boolean> {
    const settings = this.notificationSettings.get(userId)
    if (!settings?.dailyGuidance) return false

    const notification: NotificationData = {
      id: this.generateId(),
      type: 'daily_guidance',
      title: "Today's Cosmic Guidance",
      body: guidance.substring(0, 100) + '...',
      actionUrl: '/today',
      priority: 'high',
      category: 'guidance'
    }

    return await this.sendNotification(userId, notification)
  }

  /**
   * Send transit alert notification
   */
  async sendTransitAlert(
    userId: string,
    planet: string,
    aspect: string,
    description: string
  ): Promise<boolean> {
    const settings = this.notificationSettings.get(userId)
    if (!settings?.transitAlerts) return false

    const notification: NotificationData = {
      id: this.generateId(),
      type: 'transit_alert',
      title: `Transit Alert: ${planet} ${aspect}`,
      body: description,
      actionUrl: '/transits',
      priority: 'normal',
      category: 'transits'
    }

    return await this.sendNotification(userId, notification)
  }

  /**
   * Send community notification
   */
  async sendCommunityNotification(
    userId: string,
    fromUser: string,
    message: string
  ): Promise<boolean> {
    const settings = this.notificationSettings.get(userId)
    if (!settings?.communityUpdates) return false

    const notification: NotificationData = {
      id: this.generateId(),
      type: 'community',
      title: `New message from ${fromUser}`,
      body: message,
      actionUrl: '/community',
      priority: 'normal',
      category: 'community'
    }

    return await this.sendNotification(userId, notification)
  }

  /**
   * Send streak reminder
   */
  async sendStreakReminder(userId: string, streakDays: number): Promise<boolean> {
    const settings = this.notificationSettings.get(userId)
    if (!settings?.streakReminders) return false

    const notification: NotificationData = {
      id: this.generateId(),
      type: 'streak',
      title: `Keep your streak going!`,
      body: `You've checked in ${streakDays} days in a row. Don't break the chain!`,
      actionUrl: '/home',
      priority: 'normal',
      category: 'streak'
    }

    return await this.sendNotification(userId, notification)
  }

  /**
   * Schedule notification for specific time
   */
  async scheduleNotification(
    userId: string,
    notification: NotificationData,
    scheduledTime: Date
  ): Promise<boolean> {
    const now = new Date()
    const delay = scheduledTime.getTime() - now.getTime()

    if (delay <= 0) {
      return await this.sendNotification(userId, notification)
    }

    setTimeout(async () => {
      await this.sendNotification(userId, notification)
    }, delay)

    return true
  }

  /**
   * Update user notification settings
   */
  updateSettings(userId: string, settings: NotificationSettings): void {
    this.notificationSettings.set(userId, settings)
  }

  /**
   * Get user notification settings
   */
  getSettings(userId: string): NotificationSettings | null {
    return this.notificationSettings.get(userId) || null
  }

  /**
   * Clear all notifications for user
   */
  async clearNotifications(userId: string): Promise<void> {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CLEAR_NOTIFICATIONS',
        userId
      })
    }
  }

  /**
   * Get notification history
   */
  async getNotificationHistory(userId: string): Promise<NotificationData[]> {
    // This would typically fetch from a database
    // For now, return empty array
    return []
  }

  /**
   * Initialize FCM
   */
  private async initializeFCM(): Promise<void> {
    if (!this.fcmConfig) {
      return
    }

    try {
      // Initialize Firebase
      const { initializeApp } = await import('firebase/app')
      const { getMessaging, getToken } = await import('firebase/messaging')
      
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: this.fcmConfig.projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: this.fcmConfig.messagingSenderId,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      }

      const app = initializeApp(firebaseConfig)
      const messaging = getMessaging(app)
      
      // Get FCM token
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY
      })

      if (token) {
        // Store token for server-side notifications
        localStorage.setItem('fcm_token', token)
      }
    } catch (error) {
      }
  }

  /**
   * Register service worker
   */
  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        this.serviceWorker = registration.active || registration.installing || registration.waiting
        
        } catch (error) {
        }
    }
  }

  /**
   * Request notification permission
   */
  private async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission === 'denied') {
      return 'denied'
    }

    const permission = await Notification.requestPermission()
    return permission
  }

  /**
   * Send notification
   */
  private async sendNotification(userId: string, notification: NotificationData): Promise<boolean> {
    try {
      // Check if we're in quiet hours
      const settings = this.notificationSettings.get(userId)
      if (settings?.quietHours?.enabled && this.isInQuietHours(settings.quietHours)) {
        return false
      }

      // Try FCM first
      if (this.fcmConfig) {
        const success = await this.sendFCMNotification(userId, notification)
        if (success) return true
      }

      // Fallback to local notifications
      return await this.sendLocalNotification(notification)
    } catch (error) {
      return false
    }
  }

  /**
   * Send FCM notification
   */
  private async sendFCMNotification(userId: string, notification: NotificationData): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          notification
        })
      })

      return response.ok
    } catch (error) {
      return false
    }
  }

  /**
   * Send local notification
   */
  private async sendLocalNotification(notification: NotificationData): Promise<boolean> {
    if (Notification.permission !== 'granted') {
      return false
    }

    try {
      const notif = new Notification(notification.title, {
        body: notification.body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: notification.id,
        data: notification.data,
        requireInteraction: notification.priority === 'high',
        actions: [
          {
            action: 'view',
            title: 'View',
            icon: '/icon-192.png'
          },
          {
            action: 'dismiss',
            title: 'Dismiss'
          }
        ]
      })

      notif.onclick = () => {
        if (notification.actionUrl) {
          window.location.href = notification.actionUrl
        }
        notif.close()
      }

      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Check if current time is in quiet hours
   */
  private isInQuietHours(quietHours: { start: string; end: string }): boolean {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    
    const [startHour, startMin] = quietHours.start.split(':').map(Number)
    const [endHour, endMin] = quietHours.end.split(':').map(Number)
    
    const startTime = startHour * 60 + startMin
    const endTime = endHour * 60 + endMin
    
    if (startTime <= endTime) {
      return currentTime >= startTime && currentTime <= endTime
    } else {
      // Quiet hours span midnight
      return currentTime >= startTime || currentTime <= endTime
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  /**
   * Set FCM configuration
   */
  setFCMConfig(config: FCMConfig): void {
    this.fcmConfig = config
  }

  /**
   * Get system status
   */
  getStatus(): {
    initialized: boolean
    fcmConfigured: boolean
    serviceWorkerActive: boolean
    permission: NotificationPermission
  } {
    return {
      initialized: this.isInitialized,
      fcmConfigured: this.fcmConfig !== null,
      serviceWorkerActive: this.serviceWorker !== null,
      permission: Notification.permission
    }
  }
}

// Export singleton instance
export const notificationSystem = new NotificationSystem()

