/**
 * Notification Service for Daily Secrets App
 * Supports FCM Web Push and local notifications
 */

export interface NotificationData {
  title: string
  body: string
  icon?: string
  badge?: string
  image?: string
  tag?: string
  data?: any
  actions?: NotificationAction[]
  requireInteraction?: boolean
  silent?: boolean
  timestamp?: number
}

export interface NotificationAction {
  action: string
  title: string
  icon?: string
}

export class NotificationService {
  private isSupported = false
  private permission: NotificationPermission = 'default'
  private registration: ServiceWorkerRegistration | null = null

  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator
    this.permission = Notification.permission
  }

  /**
   * Request notification permission
   */
  async requestPermission(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn('Notifications are not supported in this browser')
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      this.permission = permission
      return permission === 'granted'
    } catch (error) {
      console.error('Failed to request notification permission:', error)
      return false
    }
  }

  /**
   * Check if notifications are supported and permitted
   */
  isNotificationAvailable(): boolean {
    return this.isSupported && this.permission === 'granted'
  }

  /**
   * Register service worker for push notifications
   */
  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers are not supported')
      return null
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service worker registered:', this.registration)
      return this.registration
    } catch (error) {
      console.error('Failed to register service worker:', error)
      return null
    }
  }

  /**
   * Subscribe to push notifications
   */
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration) {
      await this.registerServiceWorker()
    }

    if (!this.registration) {
      console.error('Service worker not registered')
      return null
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        )
      })

      console.log('Push subscription created:', subscription)
      return subscription
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error)
      return null
    }
  }

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribeFromPush(): Promise<boolean> {
    if (!this.registration) {
      return false
    }

    try {
      const subscription = await this.registration.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        console.log('Push subscription removed')
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error)
      return false
    }
  }

  /**
   * Send local notification
   */
  async sendLocalNotification(data: NotificationData): Promise<void> {
    if (!this.isNotificationAvailable()) {
      console.warn('Notifications not available')
      return
    }

    try {
      const notification = new Notification(data.title, {
        body: data.body,
        icon: data.icon || '/icon-192.png',
        badge: data.badge || '/icon-192.png',
        image: data.image,
        tag: data.tag,
        data: data.data,
        requireInteraction: data.requireInteraction || false,
        silent: data.silent || false,
        timestamp: data.timestamp || Date.now()
      })

      // Auto-close after 5 seconds unless requireInteraction is true
      if (!data.requireInteraction) {
        setTimeout(() => {
          notification.close()
        }, 5000)
      }

      // Handle click
      notification.onclick = () => {
        window.focus()
        notification.close()
        
        // Handle notification click action
        if (data.data?.url) {
          window.location.href = data.data.url
        }
      }

      console.log('Local notification sent:', data.title)
    } catch (error) {
      console.error('Failed to send local notification:', error)
    }
  }

  /**
   * Send push notification via FCM
   */
  async sendPushNotification(
    subscription: PushSubscription,
    data: NotificationData
  ): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          notification: data
        })
      })

      if (response.ok) {
        console.log('Push notification sent successfully')
        return true
      } else {
        console.error('Failed to send push notification:', response.statusText)
        return false
      }
    } catch (error) {
      console.error('Failed to send push notification:', error)
      return false
    }
  }

  /**
   * Schedule notification for later
   */
  async scheduleNotification(
    data: NotificationData,
    delay: number
  ): Promise<void> {
    setTimeout(() => {
      this.sendLocalNotification(data)
    }, delay)
  }

  /**
   * Schedule daily notification
   */
  async scheduleDailyNotification(
    data: NotificationData,
    time: { hour: number; minute: number }
  ): Promise<void> {
    const now = new Date()
    const scheduledTime = new Date()
    scheduledTime.setHours(time.hour, time.minute, 0, 0)

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    const delay = scheduledTime.getTime() - now.getTime()
    
    setTimeout(() => {
      this.sendLocalNotification(data)
      // Reschedule for next day
      this.scheduleDailyNotification(data, time)
    }, delay)
  }

  /**
   * Clear all notifications
   */
  async clearAllNotifications(): Promise<void> {
    if (this.registration) {
      const notifications = await this.registration.getNotifications()
      notifications.forEach(notification => {
        notification.close()
      })
    }
  }

  /**
   * Get notification settings
   */
  getNotificationSettings(): {
    supported: boolean
    permitted: boolean
    serviceWorkerRegistered: boolean
  } {
    return {
      supported: this.isSupported,
      permitted: this.permission === 'granted',
      serviceWorkerRegistered: this.registration !== null
    }
  }

  /**
   * Convert VAPID key to Uint8Array
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  /**
   * Initialize notification service
   */
  async initialize(): Promise<boolean> {
    try {
      // Request permission
      const hasPermission = await this.requestPermission()
      if (!hasPermission) {
        console.warn('Notification permission denied')
        return false
      }

      // Register service worker
      await this.registerServiceWorker()

      // Subscribe to push notifications
      await this.subscribeToPush()

      console.log('Notification service initialized successfully')
      return true
    } catch (error) {
      console.error('Failed to initialize notification service:', error)
      return false
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService()
