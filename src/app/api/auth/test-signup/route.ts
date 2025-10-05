import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database-optimized'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simple test - just try to connect to database
    await prisma.$connect()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test signup error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

