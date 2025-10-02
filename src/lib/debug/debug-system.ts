/**
 * Comprehensive Debug System for Daily Secrets App
 * Tracks all application states, errors, and user interactions
 */

interface DebugEvent {
  id: string
  timestamp: Date
  type: 'error' | 'warning' | 'info' | 'success' | 'user_action' | 'api_call' | 'calculation'
  category: string
  message: string
  data?: any
  stack?: string
  userId?: string
  sessionId?: string
}

interface DebugSession {
  id: string
  startTime: Date
  endTime?: Date
  events: DebugEvent[]
  userAgent: string
  url: string
  deviceType: string
}

class DebugSystem {
  private events: DebugEvent[] = []
  private sessions: Map<string, DebugSession> = new Map()
  private currentSessionId: string = ''
  private isEnabled: boolean = process.env.NODE_ENV === 'development'

  constructor() {
    this.currentSessionId = this.generateSessionId()
    this.initializeSession()
  }

  private generateSessionId(): string {
    return `debug_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeSession(): void {
    if (!this.isEnabled) return

    const session: DebugSession = {
      id: this.currentSessionId,
      startTime: new Date(),
      events: [],
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      deviceType: this.detectDeviceType()
    }

    this.sessions.set(this.currentSessionId, session)
    this.log('info', 'session', 'Debug session initialized', { sessionId: this.currentSessionId })
  }

  private detectDeviceType(): string {
    if (typeof window === 'undefined') return 'server'
    
    const width = window.innerWidth
    const userAgent = window.navigator.userAgent.toLowerCase()
    
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) && width < 768) {
      return 'mobile'
    } else if (/ipad|android(?!.*mobile)/i.test(userAgent) || (width >= 768 && width <= 1024)) {
      return 'tablet'
    } else {
      return 'desktop'
    }
  }

  public log(
    type: DebugEvent['type'],
    category: string,
    message: string,
    data?: any,
    stack?: string
  ): void {
    if (!this.isEnabled) return

    const event: DebugEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type,
      category,
      message,
      data,
      stack: stack || (type === 'error' ? new Error().stack : undefined),
      sessionId: this.currentSessionId
    }

    this.events.push(event)
    
    const session = this.sessions.get(this.currentSessionId)
    if (session) {
      session.events.push(event)
    }

    // Console output for development
    const emoji = this.getTypeEmoji(type)
    const timestamp = event.timestamp.toISOString().split('T')[1].split('.')[0]
    
    console.log(
      `${emoji} [${timestamp}] ${category.toUpperCase()}: ${message}`,
      data ? data : '',
      stack ? `\nStack: ${stack}` : ''
    )
  }

  private getTypeEmoji(type: string): string {
    const emojis = {
      error: '🔴',
      warning: '🟡',
      info: '🔵',
      success: '🟢',
      user_action: '👤',
      api_call: '🌐',
      calculation: '🧮'
    }
    return emojis[type as keyof typeof emojis] || '📝'
  }

  // Specific logging methods
  public logError(category: string, message: string, error?: Error, data?: any): void {
    this.log('error', category, message, { ...data, error: error?.message }, error?.stack)
  }

  public logWarning(category: string, message: string, data?: any): void {
    this.log('warning', category, message, data)
  }

  public logInfo(category: string, message: string, data?: any): void {
    this.log('info', category, message, data)
  }

  public logSuccess(category: string, message: string, data?: any): void {
    this.log('success', category, message, data)
  }

  public logUserAction(action: string, data?: any): void {
    this.log('user_action', 'user_interaction', action, data)
  }

  public logApiCall(endpoint: string, method: string, status: number, duration: number, data?: any): void {
    this.log('api_call', 'api', `${method} ${endpoint} - ${status} (${duration}ms)`, data)
  }

  public logCalculation(type: string, input: any, output: any, duration: number): void {
    this.log('calculation', 'astrology', `${type} calculation completed in ${duration}ms`, {
      input,
      output,
      duration
    })
  }

  // Session management
  public startNewSession(): string {
    this.currentSessionId = this.generateSessionId()
    this.initializeSession()
    return this.currentSessionId
  }

  public endCurrentSession(): void {
    const session = this.sessions.get(this.currentSessionId)
    if (session) {
      session.endTime = new Date()
      this.log('info', 'session', 'Debug session ended', {
        duration: session.endTime.getTime() - session.startTime.getTime(),
        eventCount: session.events.length
      })
    }
  }

  // Data retrieval
  public getEvents(filter?: { type?: string; category?: string; since?: Date }): DebugEvent[] {
    let filteredEvents = this.events

    if (filter) {
      if (filter.type) {
        filteredEvents = filteredEvents.filter(event => event.type === filter.type)
      }
      if (filter.category) {
        filteredEvents = filteredEvents.filter(event => event.category === filter.category)
      }
      if (filter.since) {
        filteredEvents = filteredEvents.filter(event => event.timestamp >= filter.since!)
      }
    }

    return filteredEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  public getSession(sessionId: string): DebugSession | undefined {
    return this.sessions.get(sessionId)
  }

  public getCurrentSession(): DebugSession | undefined {
    return this.sessions.get(this.currentSessionId)
  }

  public getErrorSummary(): { count: number; recent: DebugEvent[] } {
    const errors = this.getEvents({ type: 'error' })
    return {
      count: errors.length,
      recent: errors.slice(0, 10)
    }
  }

  public getPerformanceMetrics(): {
    apiCalls: number
    calculations: number
    userActions: number
    averageApiResponseTime: number
    averageCalculationTime: number
  } {
    const apiCalls = this.getEvents({ type: 'api_call' })
    const calculations = this.getEvents({ type: 'calculation' })
    const userActions = this.getEvents({ type: 'user_action' })

    const apiDurations = apiCalls
      .map(event => event.data?.duration)
      .filter(duration => typeof duration === 'number')

    const calculationDurations = calculations
      .map(event => event.data?.duration)
      .filter(duration => typeof duration === 'number')

    return {
      apiCalls: apiCalls.length,
      calculations: calculations.length,
      userActions: userActions.length,
      averageApiResponseTime: apiDurations.length > 0 
        ? apiDurations.reduce((sum, duration) => sum + duration, 0) / apiDurations.length 
        : 0,
      averageCalculationTime: calculationDurations.length > 0
        ? calculationDurations.reduce((sum, duration) => sum + duration, 0) / calculationDurations.length
        : 0
    }
  }

  // Export data for analysis
  public exportSessionData(sessionId?: string): any {
    const targetSessionId = sessionId || this.currentSessionId
    const session = this.sessions.get(targetSessionId)
    
    if (!session) return null

    return {
      session,
      metrics: this.getPerformanceMetrics(),
      errorSummary: this.getErrorSummary(),
      allEvents: this.getEvents()
    }
  }

  // Clear old data
  public clearOldData(olderThanHours: number = 24): void {
    const cutoffTime = new Date(Date.now() - olderThanHours * 60 * 60 * 1000)
    
    this.events = this.events.filter(event => event.timestamp >= cutoffTime)
    
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.startTime < cutoffTime) {
        this.sessions.delete(sessionId)
      }
    }
  }
}

// Global debug instance
export const debugSystem = new DebugSystem()

// Convenience functions
export const logError = (category: string, message: string, error?: Error, data?: any) => 
  debugSystem.logError(category, message, error, data)

export const logWarning = (category: string, message: string, data?: any) => 
  debugSystem.logWarning(category, message, data)

export const logInfo = (category: string, message: string, data?: any) => 
  debugSystem.logInfo(category, message, data)

export const logSuccess = (category: string, message: string, data?: any) => 
  debugSystem.logSuccess(category, message, data)

export const logUserAction = (action: string, data?: any) => 
  debugSystem.logUserAction(action, data)

export const logApiCall = (endpoint: string, method: string, status: number, duration: number, data?: any) => 
  debugSystem.logApiCall(endpoint, method, status, duration, data)

export const logCalculation = (type: string, input: any, output: any, duration: number) => 
  debugSystem.logCalculation(type, input, output, duration)

export default debugSystem
