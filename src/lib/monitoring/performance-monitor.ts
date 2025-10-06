/**
 * Daily Secrets - Performance Monitoring System
 * Comprehensive performance tracking and optimization
 */

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  category: 'navigation' | 'calculation' | 'rendering' | 'api' | 'cache'
  metadata?: Record<string, any>
}

interface PerformanceBudget {
  maxBundleSize: number
  maxInitialLoad: number
  maxCalculationTime: number
  maxRenderTime: number
  maxApiResponse: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private budgets: PerformanceBudget
  private observers: Map<string, PerformanceObserver> = new Map()

  constructor() {
    this.budgets = {
      maxBundleSize: 1000000, // 1MB
      maxInitialLoad: 2000, // 2 seconds
      maxCalculationTime: 5000, // 5 seconds
      maxRenderTime: 1000, // 1 second
      maxApiResponse: 3000 // 3 seconds
    }

    this.initializeObservers()
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers(): void {
    if (typeof window === 'undefined') return

    // Navigation timing
    const navObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          this.recordMetric('navigation', entry.duration, {
            type: entry.entryType,
            loadTime: entry.loadEventEnd - entry.loadEventStart,
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart
          })
        }
      })
    })

    try {
      navObserver.observe({ entryTypes: ['navigation'] })
      this.observers.set('navigation', navObserver)
    } catch (error) {
      console.warn('Navigation timing not supported:', error)
    }

    // Resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming
          this.recordMetric('resource', resource.duration, {
            name: resource.name,
            type: resource.initiatorType,
            size: resource.transferSize,
            cached: resource.transferSize === 0
          })
        }
      })
    })

    try {
      resourceObserver.observe({ entryTypes: ['resource'] })
      this.observers.set('resource', resourceObserver)
    } catch (error) {
      console.warn('Resource timing not supported:', error)
    }

    // Long task monitoring
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'longtask') {
          this.recordMetric('longtask', entry.duration, {
            startTime: entry.startTime,
            name: entry.name
          })
        }
      })
    })

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] })
      this.observers.set('longtask', longTaskObserver)
    } catch (error) {
      console.warn('Long task timing not supported:', error)
    }
  }

  /**
   * Record a performance metric
   */
  recordMetric(
    name: string,
    value: number,
    category: PerformanceMetric['category'],
    metadata?: Record<string, any>
  ): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      category,
      metadata
    }

    this.metrics.push(metric)
    this.checkBudget(metric)
    this.cleanupOldMetrics()
  }

  /**
   * Start timing an operation
   */
  startTimer(name: string): () => void {
    const startTime = performance.now()
    
    return () => {
      const duration = performance.now() - startTime
      this.recordMetric(name, duration, 'calculation')
    }
  }

  /**
   * Measure function execution time
   */
  async measureAsync<T>(
    name: string,
    fn: () => Promise<T>,
    category: PerformanceMetric['category'] = 'calculation'
  ): Promise<T> {
    const startTime = performance.now()
    
    try {
      const result = await fn()
      const duration = performance.now() - startTime
      this.recordMetric(name, duration, category)
      return result
    } catch (error) {
      const duration = performance.now() - startTime
      this.recordMetric(`${name}_error`, duration, category, { error: error.message })
      throw error
    }
  }

  /**
   * Measure synchronous function execution time
   */
  measureSync<T>(
    name: string,
    fn: () => T,
    category: PerformanceMetric['category'] = 'calculation'
  ): T {
    const startTime = performance.now()
    
    try {
      const result = fn()
      const duration = performance.now() - startTime
      this.recordMetric(name, duration, category)
      return result
    } catch (error) {
      const duration = performance.now() - startTime
      this.recordMetric(`${name}_error`, duration, category, { error: error.message })
      throw error
    }
  }

  /**
   * Check if metric exceeds budget
   */
  private checkBudget(metric: PerformanceMetric): void {
    const budgetMap: Record<string, keyof PerformanceBudget> = {
      'navigation': 'maxInitialLoad',
      'calculation': 'maxCalculationTime',
      'rendering': 'maxRenderTime',
      'api': 'maxApiResponse'
    }

    const budgetKey = budgetMap[metric.category]
    if (budgetKey && metric.value > this.budgets[budgetKey]) {
      console.warn(`Performance budget exceeded for ${metric.name}:`, {
        value: metric.value,
        budget: this.budgets[budgetKey],
        category: metric.category
      })
    }
  }

  /**
   * Clean up old metrics to prevent memory leaks
   */
  private cleanupOldMetrics(): void {
    const oneHourAgo = Date.now() - (60 * 60 * 1000)
    this.metrics = this.metrics.filter(metric => metric.timestamp > oneHourAgo)
  }

  /**
   * Get performance summary
   */
  getSummary(): {
    totalMetrics: number
    averageLoadTime: number
    slowestOperations: PerformanceMetric[]
    budgetViolations: PerformanceMetric[]
  } {
    const navigationMetrics = this.metrics.filter(m => m.category === 'navigation')
    const averageLoadTime = navigationMetrics.length > 0
      ? navigationMetrics.reduce((sum, m) => sum + m.value, 0) / navigationMetrics.length
      : 0

    const slowestOperations = [...this.metrics]
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)

    const budgetViolations = this.metrics.filter(metric => {
      const budgetMap: Record<string, keyof PerformanceBudget> = {
        'navigation': 'maxInitialLoad',
        'calculation': 'maxCalculationTime',
        'rendering': 'maxRenderTime',
        'api': 'maxApiResponse'
      }
      const budgetKey = budgetMap[metric.category]
      return budgetKey && metric.value > this.budgets[budgetKey]
    })

    return {
      totalMetrics: this.metrics.length,
      averageLoadTime,
      slowestOperations,
      budgetViolations
    }
  }

  /**
   * Get metrics by category
   */
  getMetricsByCategory(category: PerformanceMetric['category']): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.category === category)
  }

  /**
   * Get Core Web Vitals
   */
  getCoreWebVitals(): {
    lcp?: number
    fid?: number
    cls?: number
  } {
    if (typeof window === 'undefined') return {}

    const vitals: { lcp?: number; fid?: number; cls?: number } = {}

    // Largest Contentful Paint
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint')
    if (lcpEntries.length > 0) {
      vitals.lcp = lcpEntries[lcpEntries.length - 1].startTime
    }

    // First Input Delay
    const fidEntries = performance.getEntriesByType('first-input')
    if (fidEntries.length > 0) {
      vitals.fid = fidEntries[0].processingStart - fidEntries[0].startTime
    }

    // Cumulative Layout Shift
    const clsEntries = performance.getEntriesByType('layout-shift')
    if (clsEntries.length > 0) {
      vitals.cls = clsEntries.reduce((sum, entry) => {
        return sum + (entry as any).value
      }, 0)
    }

    return vitals
  }

  /**
   * Export metrics for analysis
   */
  exportMetrics(): string {
    return JSON.stringify({
      metrics: this.metrics,
      summary: this.getSummary(),
      coreWebVitals: this.getCoreWebVitals(),
      timestamp: Date.now()
    })
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = []
  }

  /**
   * Dispose observers
   */
  dispose(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  return {
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor),
    startTimer: performanceMonitor.startTimer.bind(performanceMonitor),
    measureAsync: performanceMonitor.measureAsync.bind(performanceMonitor),
    measureSync: performanceMonitor.measureSync.bind(performanceMonitor),
    getSummary: performanceMonitor.getSummary.bind(performanceMonitor),
    getCoreWebVitals: performanceMonitor.getCoreWebVitals.bind(performanceMonitor)
  }
}

// Performance decorators
export function measurePerformance(name: string, category: PerformanceMetric['category'] = 'calculation') {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = async function (...args: any[]) {
      return performanceMonitor.measureAsync(name, () => method.apply(this, args), category)
    }

    return descriptor
  }
}

export function measureSyncPerformance(name: string, category: PerformanceMetric['category'] = 'calculation') {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = function (...args: any[]) {
      return performanceMonitor.measureSync(name, () => method.apply(this, args), category)
    }

    return descriptor
  }
}

// Performance utilities
export const performanceUtils = {
  /**
   * Check if device is low-end
   */
  isLowEndDevice(): boolean {
    if (typeof navigator === 'undefined') return false
    
    const connection = (navigator as any).connection
    const memory = (performance as any).memory
    
    return (
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g' ||
      (memory && memory.jsHeapSizeLimit < 100000000) // Less than 100MB
    )
  },

  /**
   * Get device capabilities
   */
  getDeviceCapabilities(): {
    hasWebGL: boolean
    hasWebWorkers: boolean
    hasServiceWorkers: boolean
    hasIndexedDB: boolean
    hasLocalStorage: boolean
    cpuCores: number
  } {
    return {
      hasWebGL: typeof WebGLRenderingContext !== 'undefined',
      hasWebWorkers: typeof Worker !== 'undefined',
      hasServiceWorkers: 'serviceWorker' in navigator,
      hasIndexedDB: typeof indexedDB !== 'undefined',
      hasLocalStorage: typeof localStorage !== 'undefined',
      cpuCores: navigator.hardwareConcurrency || 1
    }
  },

  /**
   * Optimize for device capabilities
   */
  getOptimizationLevel(): 'low' | 'medium' | 'high' {
    const capabilities = this.getDeviceCapabilities()
    const isLowEnd = this.isLowEndDevice()
    
    if (isLowEnd || capabilities.cpuCores < 2) return 'low'
    if (capabilities.cpuCores >= 4 && capabilities.hasWebGL) return 'high'
    return 'medium'
  }
}

export default performanceMonitor

