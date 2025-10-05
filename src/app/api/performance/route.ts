import { NextRequest, NextResponse } from 'next/server'
import { PerformanceMonitor } from '@/lib/performance/monitor'
import { getCacheStats } from '@/lib/cache/query-cache'
import { ResponseOptimizer } from '@/lib/api/response-optimizer'
import { handleApiError } from '@/lib/error-handler'

export async function GET(request: NextRequest) {
  const monitor = PerformanceMonitor.getInstance()
  const endTimer = monitor.startTimer('performance_api')
  
  try {
    // Get performance data
    const [performanceStats, cacheStats, optimizationSuggestions] = await Promise.all([
      monitor.getStats(),
      getCacheStats(),
      getOptimizationSuggestions()
    ])
    
    const performanceData = {
      performance: performanceStats,
      cache: cacheStats,
      suggestions: optimizationSuggestions,
      system: {
        memory: getMemoryUsage(),
        cpu: getCpuUsage(),
      },
      timestamp: new Date().toISOString()
    }
    
    endTimer()
    return ResponseOptimizer.createOptimizedResponse(performanceData, 200, {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-API-Version': '1.0.0'
    })
    
  } catch (error) {
    endTimer()
    return handleApiError(error)
  }
}

// Helper functions
function getMemoryUsage(): Record<string, number> {
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

function getCpuUsage(): number {
  if (typeof process !== 'undefined' && process.cpuUsage) {
    const usage = process.cpuUsage()
    return Math.round((usage.user + usage.system) / 1000) // Convert to milliseconds
  }
  
  return 0
}

function getOptimizationSuggestions(): string[] {
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
