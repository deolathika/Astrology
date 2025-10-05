/**
 * Analytics Usage API
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Tracks user feature usage and analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'
import { z } from 'zod'

const analyticsSchema = z.object({
  feature: z.string(),
  action: z.string(),
  metadata: z.record(z.any()).optional()
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { feature, action, metadata } = analyticsSchema.parse(body)
    
    const userId = session.user.id
    
    // Create analytics record
    const analytics = await prisma.analytics.create({
      data: {
        userId,
        event: `${feature}:${action}`,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Analytics recorded successfully',
      analytics: {
        id: analytics.id,
        event: analytics.event,
        timestamp: analytics.timestamp
      }
    })
    
  } catch (error) {
    console.error('Analytics error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to record analytics' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const userId = session.user.id
    const userRole = session.user.role
    
    const { searchParams } = new URL(request.url)
    const feature = searchParams.get('feature')
    const days = parseInt(searchParams.get('days') || '30')
    
    // Calculate date range
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000)
    
    // Build where clause
    const where: any = {
      userId,
      timestamp: {
        gte: startDate,
        lte: endDate
      }
    }
    
    if (feature) {
      where.feature = feature
    }
    
    // Get analytics data
    const analytics = await prisma.analytics.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 100
    })
    
    // Get summary statistics
    const summary = await prisma.analytics.groupBy({
      by: ['event'],
      where: {
        userId,
        timestamp: {
          gte: startDate,
          lte: endDate
        }
      },
      _count: {
        id: true
      }
    })
    
    // Admin users can see all analytics
    if (userRole === 'admin') {
      const allAnalytics = await prisma.analytics.findMany({
        where: {
          timestamp: {
            gte: startDate,
            lte: endDate
          }
        },
        orderBy: { timestamp: 'desc' },
        take: 1000
      })
      
      const allSummary = await prisma.analytics.groupBy({
        by: ['event'],
        where: {
          timestamp: {
            gte: startDate,
            lte: endDate
          }
        },
        _count: {
          id: true
        }
      })
      
      return NextResponse.json({
        success: true,
        data: {
          analytics: allAnalytics,
          summary: allSummary,
          period: {
            startDate,
            endDate,
            days
          }
        }
      })
    }
    
    return NextResponse.json({
      success: true,
      data: {
        analytics,
        summary,
        period: {
          startDate,
          endDate,
          days
        }
      }
    })
    
  } catch (error) {
    console.error('Get analytics error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
