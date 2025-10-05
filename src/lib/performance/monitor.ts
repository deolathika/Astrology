import { NextRequest, NextResponse } from 'next/server'

// Performance metrics interface
interface PerformanceMetric {
  label: string
  duration: number
  timestamp: number
  metadata?: Record<string, any>
}

interface PerformanceStats {
  count: number
  average: number
  min: number
  max: number
  p95: number
  p99: number
}

// Performance monitor class
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  private customMetrics: Map<string, PerformanceMetric[]> = new Map()
  private isEnabled: boolean = true

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Start timing an operation
  startTimer(label: string, metadata?: Record<string, any>): () => void {
    if (!this.isEnabled) return () => {}
    
    const start = performance.now()
    return () => {
      const duration = performance.now() - start
      this.recordMetric(label, duration, metadata)
    }
  }

  // Record a metric
  recordMetric(label: string, value: number, metadata?: Record<string, any>) {
    if (!this.isEnabled) return

    // Store in simple metrics
    if (!this.metrics.has(label)) {
      this.metrics.set(label, [])
    }
    this.metrics.get(label)!.push(value)

    // Store in custom metrics
    if (!this.customMetrics.has(label)) {
      this.customMetrics.set(label, [])
    }
    this.customMetrics.get(label)!.push({
      label,
      duration: value,
      timestamp: Date.now(),
      metadata,
    })

    // Keep only last 1000 entries per metric
    if (this.metrics.get(label)!.length > 1000) {
      this.metrics.get(label)!.shift()
    }
    if (this.customMetrics.get(label)!.length > 1000) {
      this.customMetrics.get(label)!.shift()
    }
  }

  // Get performance statistics
  getStats(): Record<string, PerformanceStats> {
    const result: Record<string, PerformanceStats> = {}
    
    for (const [label, values] of Array.from(this.metrics.entries())) {
      if (values.length === 0) continue
      
      const sorted = [...values].sort((a: any, b: any) => a - b)
      const count = values.length
      const average = values.reduce((a, b) => a + b, 0) / count
      const min = sorted[0]
      const max = sorted[sorted.length - 1]
      const p95Index = Math.floor(sorted.length * 0.95)
      const p99Index = Math.floor(sorted.length * 0.99)
      
      result[label] = {
        count,
        average: Math.round(average * 100) / 100,
        min: Math.round(min * 100) / 100,
        max: Math.round(max * 100) / 100,
        p95: Math.round(sorted[p95Index] * 100) / 100,
        p99: Math.round(sorted[p99Index] * 100) / 100,
      }
    }
    
    return result
  }

  // Get recent metrics
  getRecentMetrics(label: string, minutes: number = 5): PerformanceMetric[] {
    const cutoff = Date.now() - (minutes * 60 * 1000)
    return this.customMetrics.get(label)?.filter(m => m.timestamp > cutoff) || []
  }

  // Clear metrics
  clearMetrics(label?: string) {
    if (label) {
      this.metrics.delete(label)
      this.customMetrics.delete(label)
    } else {
      this.metrics.clear()
      this.customMetrics.clear()
    }
  }

  // Enable/disable monitoring
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  // Get health status
  getHealthStatus(): Record<string, any> {
    const stats = this.getStats()
    const totalMetrics = Object.keys(stats).length
    const avgResponseTime = Object.values(stats).reduce((acc, stat) => acc + stat.average, 0) / totalMetrics || 0
    
    return {
      status: 'healthy',
      totalMetrics,
      averageResponseTime: Math.round(avgResponseTime * 100) / 100,
      timestamp: new Date().toISOString(),
    }
  }
}

// API performance wrapper
export function withPerformanceMonitoring<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>,
  label: string
) {
  return async (...args: T): Promise<NextResponse> => {
    const monitor = PerformanceMonitor.getInstance()
    const endTimer = monitor.startTimer(label)
    
    try {
      const response = await handler(...args)
      endTimer()
      return response
    } catch (error) {
      endTimer()
      throw error
    }
  }
}

// Database query performance monitoring
export function monitorDatabaseQuery<T>(
  queryFn: () => Promise<T>,
  queryName: string
): Promise<T> {
  const monitor = PerformanceMonitor.getInstance()
  const endTimer = monitor.startTimer(`db_${queryName}`)
  
  return queryFn().finally(endTimer)
}

// API endpoint performance monitoring
export function monitorApiEndpoint(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const monitor = PerformanceMonitor.getInstance()
  const endpoint = request.nextUrl.pathname
  const method = request.method
  const label = `api_${method}_${endpoint.replace(/\//g, '_')}`
  
  const endTimer = monitor.startTimer(label, {
    endpoint,
    method,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip || request.headers.get('x-forwarded-for'),
  })
  
  return handler(request).finally(endTimer)
}

// Memory usage monitoring
export function getMemoryUsage(): Record<string, number> {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage()
    return {
      rss: Math.round(usage.rss / 1024 / 1024 * 100) / 100, // MB
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100, // MB
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100, // MB
      external: Math.round(usage.external / 1024 / 1024 * 100) / 100, // MB
    }
  }
  
  return {}
}

// CPU usage monitoring (simplified)
export function getCpuUsage(): number {
  if (typeof process !== 'undefined' && process.cpuUsage) {
    const usage = process.cpuUsage()
    return Math.round((usage.user + usage.system) / 1000) // Convert to milliseconds
  }
  
  return 0
}

// Performance alerts
export class PerformanceAlerts {
  private static instance: PerformanceAlerts
  private thresholds: Map<string, number> = new Map()
  private alertCallbacks: Map<string, (value: number, threshold: number) => void> = new Map()

  static getInstance(): PerformanceAlerts {
    if (!PerformanceAlerts.instance) {
      PerformanceAlerts.instance = new PerformanceAlerts()
    }
    return PerformanceAlerts.instance
  }

  setThreshold(metric: string, threshold: number) {
    this.thresholds.set(metric, threshold)
  }

  setAlertCallback(metric: string, callback: (value: number, threshold: number) => void) {
    this.alertCallbacks.set(metric, callback)
  }

  checkAlert(metric: string, value: number) {
    const threshold = this.thresholds.get(metric)
    if (threshold && value > threshold) {
      const callback = this.alertCallbacks.get(metric)
      if (callback) {
        callback(value, threshold)
      }
    }
  }
}

// Performance dashboard data
export function getPerformanceDashboard() {
  const monitor = PerformanceMonitor.getInstance()
  const stats = monitor.getStats()
  const health = monitor.getHealthStatus()
  const memory = getMemoryUsage()
  const cpu = getCpuUsage()

  return {
    performance: stats,
    health,
    system: {
      memory,
      cpu,
    },
    timestamp: new Date().toISOString(),
  }
}

// Performance optimization suggestions
export function getOptimizationSuggestions(): string[] {
  const monitor = PerformanceMonitor.getInstance()
  const stats = monitor.getStats()
  const suggestions: string[] = []

  // Check for slow database queries
  Object.entries(stats).forEach(([label, stat]) => {
    if (label.startsWith('db_') && stat.average > 1000) {
      suggestions.push(`Database query '${label}' is slow (${stat.average}ms avg). Consider adding indexes or optimizing the query.`)
    }
  })

  // Check for slow API endpoints
  Object.entries(stats).forEach(([label, stat]) => {
    if (label.startsWith('api_') && stat.average > 500) {
      suggestions.push(`API endpoint '${label}' is slow (${stat.average}ms avg). Consider optimizing the endpoint.`)
    }
  })

  // Check memory usage
  const memory = getMemoryUsage()
  if (memory.heapUsed > 100) {
    suggestions.push(`High memory usage detected (${memory.heapUsed}MB). Consider implementing memory optimization strategies.`)
  }

  return suggestions
}

// Performance monitoring middleware
export function performanceMiddleware(request: NextRequest) {
  const start = performance.now()
  
  return (response: NextResponse) => {
    const duration = performance.now() - start
    const monitor = PerformanceMonitor.getInstance()
    
    monitor.recordMetric('middleware_performance', duration, {
      path: request.nextUrl.pathname,
      method: request.method,
    })
    
    return response
  }
}

// Initialize performance monitoring
export function initializePerformanceMonitoring() {
  const monitor = PerformanceMonitor.getInstance()
  const alerts = PerformanceAlerts.getInstance()
  
  // Set up default thresholds
  alerts.setThreshold('db_query', 1000) // 1 second
  alerts.setThreshold('api_endpoint', 500) // 500ms
  alerts.setThreshold('middleware_performance', 100) // 100ms
  
  // Set up alert callbacks
  alerts.setAlertCallback('db_query', (value, threshold) => {
    console.warn(`Slow database query detected: ${value}ms (threshold: ${threshold}ms)`)
  })
  
  alerts.setAlertCallback('api_endpoint', (value, threshold) => {
    console.warn(`Slow API endpoint detected: ${value}ms (threshold: ${threshold}ms)`)
  })
  
  alerts.setAlertCallback('middleware_performance', (value, threshold) => {
    console.warn(`Slow middleware detected: ${value}ms (threshold: ${threshold}ms)`)
  })
  
  console.log('✅ Performance monitoring initialized')
}