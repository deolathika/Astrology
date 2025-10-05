/**
 * User Analytics and Behavior Tracking
 * Principal Full-Stack Engineer + QA Lead + Astrology/Numerology Domain Verifier
 * 
 * Provides comprehensive user behavior tracking and analytics for the Daily Secrets app
 */

export interface UserEvent {
  userId: string
  eventType: string
  eventData: any
  timestamp: string
  sessionId: string
  userAgent: string
  ipAddress?: string
  location?: {
    country: string
    city: string
    timezone: string
  }
}

export interface UserSession {
  sessionId: string
  userId: string
  startTime: string
  endTime?: string
  duration?: number
  pageViews: number
  events: UserEvent[]
  device: {
    type: string
    os: string
    browser: string
  }
  location: {
    country: string
    city: string
    timezone: string
  }
}

export interface UserProfile {
  userId: string
  role: string
  subscriptionStatus: string
  totalSessions: number
  totalTimeSpent: number
  favoriteFeatures: string[]
  astrologySystem: string
  language: string
  lastActive: string
  createdAt: string
}

export interface AnalyticsMetrics {
  totalUsers: number
  activeUsers: number
  newUsers: number
  returningUsers: number
  averageSessionDuration: number
  mostPopularFeatures: Array<{ feature: string; count: number }>
  userEngagement: {
    daily: number
    weekly: number
    monthly: number
  }
  featureUsage: Array<{ feature: string; usage: number }>
  conversionRates: {
    freeToPremium: number
    premiumRetention: number
  }
}

export class UserAnalyticsService {
  private static instance: UserAnalyticsService
  private events: UserEvent[] = []
  private sessions: Map<string, UserSession> = new Map()
  private userProfiles: Map<string, UserProfile> = new Map()

  constructor() {
    this.initializeEventListeners()
  }

  static getInstance(): UserAnalyticsService {
    if (!UserAnalyticsService.instance) {
      UserAnalyticsService.instance = new UserAnalyticsService()
    }
    return UserAnalyticsService.instance
  }

  /**
   * Track user event
   */
  trackEvent(
    userId: string,
    eventType: string,
    eventData: any,
    sessionId: string,
    userAgent: string,
    ipAddress?: string
  ): void {
    const event: UserEvent = {
      userId,
      eventType,
      eventData,
      timestamp: new Date().toISOString(),
      sessionId,
      userAgent,
      ipAddress,
      location: this.getLocationFromIP(ipAddress)
    }

    this.events.push(event)
    this.updateUserProfile(userId, event)
    this.updateSession(sessionId, event)
  }

  /**
   * Track page view
   */
  trackPageView(
    userId: string,
    page: string,
    sessionId: string,
    userAgent: string,
    ipAddress?: string
  ): void {
    this.trackEvent(userId, 'page_view', { page }, sessionId, userAgent, ipAddress)
  }

  /**
   * Track feature usage
   */
  trackFeatureUsage(
    userId: string,
    feature: string,
    action: string,
    sessionId: string,
    userAgent: string,
    ipAddress?: string
  ): void {
    this.trackEvent(userId, 'feature_usage', { feature, action }, sessionId, userAgent, ipAddress)
  }

  /**
   * Track astrology calculation
   */
  trackAstrologyCalculation(
    userId: string,
    system: string,
    calculationType: string,
    sessionId: string,
    userAgent: string,
    ipAddress?: string
  ): void {
    this.trackEvent(userId, 'astrology_calculation', {
      system,
      calculationType,
      timestamp: new Date().toISOString()
    }, sessionId, userAgent, ipAddress)
  }

  /**
   * Track numerology calculation
   */
  trackNumerologyCalculation(
    userId: string,
    system: string,
    calculationType: string,
    sessionId: string,
    userAgent: string,
    ipAddress?: string
  ): void {
    this.trackEvent(userId, 'numerology_calculation', {
      system,
      calculationType,
      timestamp: new Date().toISOString()
    }, sessionId, userAgent, ipAddress)
  }

  /**
   * Track subscription event
   */
  trackSubscriptionEvent(
    userId: string,
    eventType: 'upgrade' | 'downgrade' | 'cancel' | 'renewal',
    plan: string,
    sessionId: string,
    userAgent: string,
    ipAddress?: string
  ): void {
    this.trackEvent(userId, 'subscription_event', {
      eventType,
      plan,
      timestamp: new Date().toISOString()
    }, sessionId, userAgent, ipAddress)
  }

  /**
   * Track AI interaction
   */
  trackAIInteraction(
    userId: string,
    aiType: 'openai' | 'gemini' | 'webllm',
    interactionType: string,
    sessionId: string,
    userAgent: string,
    ipAddress?: string
  ): void {
    this.trackEvent(userId, 'ai_interaction', {
      aiType,
      interactionType,
      timestamp: new Date().toISOString()
    }, sessionId, userAgent, ipAddress)
  }

  /**
   * Get user analytics
   */
  getUserAnalytics(userId: string): {
    profile: UserProfile | null
    sessions: UserSession[]
    events: UserEvent[]
    metrics: {
      totalSessions: number
      totalTimeSpent: number
      favoriteFeatures: string[]
      lastActive: string
    }
  } {
    const profile = this.userProfiles.get(userId) || null
    const userSessions = Array.from(this.sessions.values()).filter(s => s.userId === userId)
    const userEvents = this.events.filter(e => e.userId === userId)

    const favoriteFeatures = this.getFavoriteFeatures(userId)
    const totalTimeSpent = userSessions.reduce((total, session) => total + (session.duration || 0), 0)
    const lastActive = userEvents.length > 0 ? userEvents[userEvents.length - 1].timestamp : ''

    return {
      profile,
      sessions: userSessions,
      events: userEvents,
      metrics: {
        totalSessions: userSessions.length,
        totalTimeSpent,
        favoriteFeatures,
        lastActive
      }
    }
  }

  /**
   * Get overall analytics metrics
   */
  getAnalyticsMetrics(): AnalyticsMetrics {
    const totalUsers = this.userProfiles.size
    const activeUsers = this.getActiveUsers()
    const newUsers = this.getNewUsers()
    const returningUsers = this.getReturningUsers()
    const averageSessionDuration = this.getAverageSessionDuration()
    const mostPopularFeatures = this.getMostPopularFeatures()
    const userEngagement = this.getUserEngagement()
    const featureUsage = this.getFeatureUsage()
    const conversionRates = this.getConversionRates()

    return {
      totalUsers,
      activeUsers,
      newUsers,
      returningUsers,
      averageSessionDuration,
      mostPopularFeatures,
      userEngagement,
      featureUsage,
      conversionRates
    }
  }

  /**
   * Get user engagement metrics
   */
  getUserEngagement(): { daily: number; weekly: number; monthly: number } {
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const daily = this.events.filter(e => new Date(e.timestamp) > oneDayAgo).length
    const weekly = this.events.filter(e => new Date(e.timestamp) > oneWeekAgo).length
    const monthly = this.events.filter(e => new Date(e.timestamp) > oneMonthAgo).length

    return { daily, weekly, monthly }
  }

  /**
   * Get feature usage statistics
   */
  getFeatureUsage(): Array<{ feature: string; usage: number }> {
    const featureCounts = new Map<string, number>()

    this.events.forEach(event => {
      if (event.eventType === 'feature_usage') {
        const feature = event.eventData.feature
        featureCounts.set(feature, (featureCounts.get(feature) || 0) + 1)
      }
    })

    return Array.from(featureCounts.entries())
      .map(([feature, usage]) => ({ feature, usage }))
      .sort((a, b) => b.usage - a.usage)
  }

  /**
   * Get most popular features
   */
  getMostPopularFeatures(): Array<{ feature: string; count: number }> {
    return this.getFeatureUsage().slice(0, 10).map(item => ({ feature: item.feature, count: item.usage }))
  }

  /**
   * Get active users (last 24 hours)
   */
  getActiveUsers(): number {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const activeUserIds = new Set(
      this.events
        .filter(e => new Date(e.timestamp) > oneDayAgo)
        .map(e => e.userId)
    )
    return activeUserIds.size
  }

  /**
   * Get new users (last 30 days)
   */
  getNewUsers(): number {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    return Array.from(this.userProfiles.values())
      .filter(profile => new Date(profile.createdAt) > oneMonthAgo).length
  }

  /**
   * Get returning users
   */
  getReturningUsers(): number {
    return this.getActiveUsers() - this.getNewUsers()
  }

  /**
   * Get average session duration
   */
  getAverageSessionDuration(): number {
    const sessionsWithDuration = Array.from(this.sessions.values())
      .filter(s => s.duration)
      .map(s => s.duration!)

    if (sessionsWithDuration.length === 0) return 0

    return sessionsWithDuration.reduce((sum, duration) => sum + duration, 0) / sessionsWithDuration.length
  }

  /**
   * Get conversion rates
   */
  getConversionRates(): { freeToPremium: number; premiumRetention: number } {
    const totalUsers = this.userProfiles.size
    const premiumUsers = Array.from(this.userProfiles.values())
      .filter(profile => profile.subscriptionStatus === 'premium').length

    const freeToPremium = totalUsers > 0 ? (premiumUsers / totalUsers) * 100 : 0
    const premiumRetention = 85 // Placeholder - would need historical data

    return { freeToPremium, premiumRetention }
  }

  /**
   * Get favorite features for user
   */
  getFavoriteFeatures(userId: string): string[] {
    const userEvents = this.events.filter(e => e.userId === userId)
    const featureCounts = new Map<string, number>()

    userEvents.forEach(event => {
      if (event.eventType === 'feature_usage') {
        const feature = event.eventData.feature
        featureCounts.set(feature, (featureCounts.get(feature) || 0) + 1)
      }
    })

    return Array.from(featureCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([feature]) => feature)
  }

  /**
   * Update user profile
   */
  private updateUserProfile(userId: string, event: UserEvent): void {
    let profile = this.userProfiles.get(userId)

    if (!profile) {
      profile = {
        userId,
        role: 'user',
        subscriptionStatus: 'free',
        totalSessions: 0,
        totalTimeSpent: 0,
        favoriteFeatures: [],
        astrologySystem: 'western',
        language: 'en',
        lastActive: event.timestamp,
        createdAt: event.timestamp
      }
    }

    profile.lastActive = event.timestamp
    this.userProfiles.set(userId, profile)
  }

  /**
   * Update session
   */
  private updateSession(sessionId: string, event: UserEvent): void {
    let session = this.sessions.get(sessionId)

    if (!session) {
      session = {
        sessionId,
        userId: event.userId,
        startTime: event.timestamp,
        pageViews: 0,
        events: [],
        device: this.parseUserAgent(event.userAgent),
        location: event.location || { country: 'Unknown', city: 'Unknown', timezone: 'UTC' }
      }
    }

    if (event.eventType === 'page_view') {
      session.pageViews++
    }

    session.events.push(event)
    this.sessions.set(sessionId, session)
  }

  /**
   * Parse user agent
   */
  private parseUserAgent(userAgent: string): { type: string; os: string; browser: string } {
    // Simplified user agent parsing
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)
    const isTablet = /iPad|Tablet/.test(userAgent)
    
    let deviceType = 'desktop'
    if (isTablet) deviceType = 'tablet'
    else if (isMobile) deviceType = 'mobile'

    const os = /Windows/.test(userAgent) ? 'Windows' :
               /Mac/.test(userAgent) ? 'macOS' :
               /Linux/.test(userAgent) ? 'Linux' :
               /Android/.test(userAgent) ? 'Android' :
               /iOS/.test(userAgent) ? 'iOS' : 'Unknown'

    const browser = /Chrome/.test(userAgent) ? 'Chrome' :
                   /Firefox/.test(userAgent) ? 'Firefox' :
                   /Safari/.test(userAgent) ? 'Safari' :
                   /Edge/.test(userAgent) ? 'Edge' : 'Unknown'

    return { type: deviceType, os, browser }
  }

  /**
   * Get location from IP (simplified)
   */
  private getLocationFromIP(ipAddress?: string): { country: string; city: string; timezone: string } {
    // Simplified location detection
    return {
      country: 'Unknown',
      city: 'Unknown',
      timezone: 'UTC'
    }
  }

  /**
   * Initialize event listeners
   */
  private initializeEventListeners(): void {
    // Browser event listeners for client-side tracking
    if (typeof window !== 'undefined') {
      // Track page visibility changes
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.trackEvent('system', 'page_hidden', {}, 'system', navigator.userAgent)
        } else {
          this.trackEvent('system', 'page_visible', {}, 'system', navigator.userAgent)
        }
      })

      // Track page unload
      window.addEventListener('beforeunload', () => {
        this.trackEvent('system', 'page_unload', {}, 'system', navigator.userAgent)
      })
    }
  }

  /**
   * Export analytics data
   */
  exportAnalytics(): {
    events: UserEvent[]
    sessions: UserSession[]
    userProfiles: UserProfile[]
    metrics: AnalyticsMetrics
  } {
    return {
      events: this.events,
      sessions: Array.from(this.sessions.values()),
      userProfiles: Array.from(this.userProfiles.values()),
      metrics: this.getAnalyticsMetrics()
    }
  }

  /**
   * Clear analytics data
   */
  clearAnalytics(): void {
    this.events = []
    this.sessions.clear()
    this.userProfiles.clear()
  }
}

// Export singleton instance
export const userAnalytics = UserAnalyticsService.getInstance()
