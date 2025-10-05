import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database-optimized'
import { handleApiError } from '@/lib/error-handler'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user with profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profiles: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Premium features based on user role
    const premiumFeatures = {
      unlimitedInsights: user.role === 'premium' || user.role === 'admin',
      advancedAstrology: user.role === 'premium' || user.role === 'admin',
      aiDreamAnalysis: user.role === 'premium' || user.role === 'admin',
      expertConsultations: user.role === 'premium' || user.role === 'admin',
      personalizedCalendar: user.role === 'premium' || user.role === 'admin',
      compatibilityReports: user.role === 'premium' || user.role === 'admin',
      dataExport: user.role === 'premium' || user.role === 'admin',
      prioritySupport: user.role === 'premium' || user.role === 'admin'
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        features: premiumFeatures,
        usage: {
          dailyInsights: user.role === 'premium' || user.role === 'admin' ? 'unlimited' : 3,
          numerologyChecks: user.role === 'premium' || user.role === 'admin' ? 'unlimited' : 1,
          zodiacReadings: user.role === 'premium' || user.role === 'admin' ? 'unlimited' : 1,
          compatibilityChecks: user.role === 'premium' || user.role === 'admin' ? 'unlimited' : 1
        }
      },
      message: 'Premium features loaded successfully'
    })
  } catch (error) {
    return handleApiError(error)
  }
}

