'use client'

import { useEffect, useCallback, useState } from 'react'

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: Date
  userId?: string
  sessionId?: string
}

interface PageView {
  page: string
  title: string
  url: string
  timestamp: Date
  userId?: string
  sessionId?: string
}

interface UserBehavior {
  timeOnPage: number
  scrollDepth: number
  clicks: number
  interactions: string[]
  exitIntent: boolean
}

class AnalyticsTracker {
  private events: AnalyticsEvent[] = []
  private pageViews: PageView[] = []
  private userBehavior: UserBehavior = {
    timeOnPage: 0,
    scrollDepth: 0,
    clicks: 0,
    interactions: [],
    exitIntent: false
  }
  private sessionId: string
  private userId?: string
  private startTime: number

  constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
    
    // Only setup event listeners on client side
    if (typeof window !== 'undefined') {
      this.setupEventListeners()
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private setupEventListeners() {
    // Only setup event listeners on client side
    if (typeof window === 'undefined') return

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden', { timeOnPage: Date.now() - this.startTime })
      } else {
        this.trackEvent('page_visible', { timeOnPage: Date.now() - this.startTime })
      }
    })

    // Track scroll depth
    let maxScrollDepth = 0
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        this.userBehavior.scrollDepth = maxScrollDepth
        this.trackEvent('scroll_depth', { depth: maxScrollDepth })
      }
    })

    // Track clicks
    document.addEventListener('click', (event) => {
      this.userBehavior.clicks++
      const target = event.target as HTMLElement
      const element = target.tagName.toLowerCase()
      const className = target.className
      const id = target.id
      
      this.trackEvent('click', {
        element,
        className,
        id,
        text: target.textContent?.slice(0, 50)
      })
    })

    // Track exit intent
    document.addEventListener('mouseleave', (event) => {
      if (event.clientY <= 0) {
        this.userBehavior.exitIntent = true
        this.trackEvent('exit_intent', { timeOnPage: Date.now() - this.startTime })
      }
    })

    // Track form interactions
    document.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement
      this.trackEvent('form_input', {
        field: target.name || target.id,
        value: target.value.slice(0, 20) // Truncate for privacy
      })
    })

    // Track focus events
    document.addEventListener('focus', (event) => {
      const target = event.target as HTMLElement
      this.trackEvent('focus', {
        element: target.tagName.toLowerCase(),
        id: target.id,
        className: target.className
      })
    })
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  trackEvent(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date(),
      userId: this.userId,
      sessionId: this.sessionId
    }

    this.events.push(analyticsEvent)
    this.userBehavior.interactions.push(event)

    // Send to analytics service (simulated)
    this.sendToAnalytics(analyticsEvent)
  }

  trackPageView(page: string, title: string, url: string) {
    const pageView: PageView = {
      page,
      title,
      url,
      timestamp: new Date(),
      userId: this.userId,
      sessionId: this.sessionId
    }

    this.pageViews.push(pageView)
    this.trackEvent('page_view', { page, title, url })
  }

  trackFeatureUsage(feature: string, action: string, properties?: Record<string, any>) {
    this.trackEvent('feature_usage', {
      feature,
      action,
      ...properties
    })
  }

  trackConversion(conversionType: string, value?: number, properties?: Record<string, any>) {
    this.trackEvent('conversion', {
      type: conversionType,
      value,
      ...properties
    })
  }

  trackError(error: string, context?: string) {
    this.trackEvent('error', {
      error,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent
    })
  }

  getSessionData() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      events: this.events,
      pageViews: this.pageViews,
      userBehavior: {
        ...this.userBehavior,
        timeOnPage: Date.now() - this.startTime
      }
    }
  }

  private async sendToAnalytics(event: AnalyticsEvent) {
    // Simulate sending to analytics service
    try {
      // In a real app, this would send to your analytics service
      console.log('Analytics Event:', event)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error('Failed to send analytics event:', error)
    }
  }
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsTracker | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const analyticsInstance = new AnalyticsTracker()
      setAnalytics(analyticsInstance)
    }
  }, [])

  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    if (analytics) {
      analytics.trackEvent(event, properties)
    }
  }, [analytics])

  const trackPageView = useCallback((page: string, title: string, url: string) => {
    if (analytics) {
      analytics.trackPageView(page, title, url)
    }
  }, [analytics])

  const trackFeatureUsage = useCallback((feature: string, action: string, properties?: Record<string, any>) => {
    if (analytics) {
      analytics.trackFeatureUsage(feature, action, properties)
    }
  }, [analytics])

  const trackConversion = useCallback((conversionType: string, value?: number, properties?: Record<string, any>) => {
    if (analytics) {
      analytics.trackConversion(conversionType, value, properties)
    }
  }, [analytics])

  const trackError = useCallback((error: string, context?: string) => {
    if (analytics) {
      analytics.trackError(error, context)
    }
  }, [analytics])

  const setUserId = useCallback((userId: string) => {
    if (analytics) {
      analytics.setUserId(userId)
    }
  }, [analytics])

  const getSessionData = useCallback(() => {
    if (analytics) {
      return analytics.getSessionData()
    }
    return null
  }, [analytics])

  return {
    trackEvent,
    trackPageView,
    trackFeatureUsage,
    trackConversion,
    trackError,
    setUserId,
    getSessionData
  }
}

