import { NextRequest } from 'next/server'

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Error types
export enum ErrorType {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  RATE_LIMIT = 'rate_limit',
  DATABASE = 'database',
  EXTERNAL_API = 'external_api',
  SECURITY = 'security',
  SYSTEM = 'system'
}

// Error interface
export interface AppError {
  id: string
  type: ErrorType
  severity: ErrorSeverity
  message: string
  stack?: string
  context?: Record<string, any>
  timestamp: Date
  userId?: string
  requestId?: string
  url?: string
  userAgent?: string
  ip?: string
}

// Alert thresholds
const ALERT_THRESHOLDS = {
  [ErrorSeverity.CRITICAL]: 1, // Alert immediately
  [ErrorSeverity.HIGH]: 5,    // Alert after 5 occurrences
  [ErrorSeverity.MEDIUM]: 20,  // Alert after 20 occurrences
  [ErrorSeverity.LOW]: 100    // Alert after 100 occurrences
}

// In-memory error store (use Redis in production)
const errorStore = new Map<string, AppError[]>()
const alertCounts = new Map<string, number>()

// Log error
export function logError(
  error: Error | string,
  type: ErrorType = ErrorType.SYSTEM,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  context?: Record<string, any>,
  request?: NextRequest
): string {
  const errorId = generateErrorId()
  const timestamp = new Date()
  
  const appError: AppError = {
    id: errorId,
    type,
    severity,
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'object' ? error.stack : undefined,
    context,
    timestamp,
    requestId: request?.headers.get('x-request-id'),
    url: request?.url,
    userAgent: request?.headers.get('user-agent'),
    ip: request?.ip || request?.headers.get('x-forwarded-for')
  }
  
  // Store error
  if (!errorStore.has(type)) {
    errorStore.set(type, [])
  }
  errorStore.get(type)!.push(appError)
  
  // Check alert thresholds
  checkAlertThresholds(type, severity)
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${severity.toUpperCase()}] ${type}:`, appError)
  }
  
  return errorId
}

// Check if we should send an alert
function checkAlertThresholds(type: ErrorType, severity: ErrorSeverity): void {
  const key = `${type}-${severity}`
  const count = (alertCounts.get(key) || 0) + 1
  alertCounts.set(key, count)
  
  const threshold = ALERT_THRESHOLDS[severity]
  if (count >= threshold) {
    sendAlert(type, severity, count)
    alertCounts.set(key, 0) // Reset counter
  }
}

// Send alert (implement based on your notification system)
function sendAlert(type: ErrorType, severity: ErrorSeverity, count: number): void {
  const message = `🚨 Alert: ${count} ${severity} ${type} errors detected`
  
  // In production, send to:
  // - Email (SendGrid, Resend)
  // - Slack webhook
  // - Discord webhook
  // - PagerDuty
  // - Sentry
  
  console.error(`ALERT: ${message}`)
  
  // TODO: Implement actual alerting
  // await sendEmailAlert(message)
  // await sendSlackAlert(message)
  // await sendSentryAlert(message)
}

// Generate unique error ID
function generateErrorId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get error statistics
export function getErrorStats(): Record<string, any> {
  const stats: Record<string, any> = {}
  
  for (const [type, errors] of errorStore.entries()) {
    stats[type] = {
      total: errors.length,
      bySeverity: {
        [ErrorSeverity.LOW]: errors.filter(e => e.severity === ErrorSeverity.LOW).length,
        [ErrorSeverity.MEDIUM]: errors.filter(e => e.severity === ErrorSeverity.MEDIUM).length,
        [ErrorSeverity.HIGH]: errors.filter(e => e.severity === ErrorSeverity.HIGH).length,
        [ErrorSeverity.CRITICAL]: errors.filter(e => e.severity === ErrorSeverity.CRITICAL).length
      },
      lastError: errors[errors.length - 1]?.timestamp
    }
  }
  
  return stats
}

// Health check endpoint
export function getHealthStatus(): Record<string, any> {
  const stats = getErrorStats()
  const totalErrors = Object.values(stats).reduce((sum: number, stat: any) => sum + stat.total, 0)
  
  return {
    status: totalErrors > 100 ? 'unhealthy' : 'healthy',
    timestamp: new Date().toISOString(),
    errors: stats,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  }
}

// Performance monitoring
export function logPerformance(
  operation: string,
  duration: number,
  context?: Record<string, any>
): void {
  if (duration > 5000) { // Log slow operations (>5s)
    logError(
      `Slow operation: ${operation} took ${duration}ms`,
      ErrorType.SYSTEM,
      ErrorSeverity.MEDIUM,
      { operation, duration, ...context }
    )
  }
}

// API usage monitoring
export function logApiUsage(
  endpoint: string,
  method: string,
  statusCode: number,
  duration: number,
  userId?: string
): void {
  const severity = statusCode >= 500 ? ErrorSeverity.HIGH : 
                   statusCode >= 400 ? ErrorSeverity.MEDIUM : 
                   ErrorSeverity.LOW
  
  if (statusCode >= 400) {
    logError(
      `API Error: ${method} ${endpoint} returned ${statusCode}`,
      ErrorType.EXTERNAL_API,
      severity,
      { endpoint, method, statusCode, duration, userId }
    )
  }
}


