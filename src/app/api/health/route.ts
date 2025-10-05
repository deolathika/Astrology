import { NextRequest, NextResponse } from 'next/server'
import { checkDatabaseHealth } from '@/lib/database-optimized'

export async function GET(request: NextRequest) {
  try {
    const dbHealth = await checkDatabaseHealth()
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbHealth,
      environment: process.env.NODE_ENV,
      version: '1.0.0'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}