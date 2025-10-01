import { NextRequest, NextResponse } from 'next/server'
import { getHealthStatus, getErrorStats } from '@/lib/monitoring'

export async function GET(request: NextRequest) {
  try {
    const health = getHealthStatus()
    const errorStats = getErrorStats()
    
    return NextResponse.json({
      ...health,
      errors: errorStats,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-API-Version': '1.0.0'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}


