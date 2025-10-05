import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profiles: true,
        userSettings: true,
        subscriptions: true,
        astrologyReadings: true,
        numerologyReadings: true,
        dreams: true,
        matches: true,
        messages: true,
        analytics: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prepare export data
    const exportData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      profiles: user.profiles,
      settings: user.userSettings,
      subscriptions: user.subscriptions,
      astrologyReadings: user.astrologyReadings,
      numerologyReadings: user.numerologyReadings,
      dreams: user.dreams,
      matches: user.matches,
      messages: user.messages,
      analytics: user.analytics,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }

    // Create JSON file
    const jsonData = JSON.stringify(exportData, null, 2)
    const buffer = Buffer.from(jsonData, 'utf-8')

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="daily-secrets-data.json"',
        'Content-Length': buffer.length.toString()
      }
    })

  } catch (error) {
    console.error('Data export error:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}
