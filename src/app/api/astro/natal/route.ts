import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'
import { swissEphemeris } from '@/lib/astrology/swiss-ephemeris'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')

    if (!profileId) {
      return NextResponse.json(
        { error: 'Profile ID is required' },
        { status: 400 }
      )
    }

    // Fetch actual user profile data from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profiles: true }
    })

    if (!user || !user.profiles.length) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    const userProfile = user.profiles[0]
    const birthDate = userProfile.birthDate ? new Date(userProfile.birthDate) : new Date('1990-01-01')
    const [birthHour, birthMinute] = (userProfile.birthTime || '12:00').split(':').map(Number)

    const birthData = {
      year: birthDate.getFullYear(),
      month: birthDate.getMonth() + 1,
      day: birthDate.getDate(),
      hour: birthHour || 12,
      minute: birthMinute || 0,
      second: 0,
      latitude: userProfile.latitude || 0,
      longitude: userProfile.longitude || 0,
      timezone: userProfile.timezone || 'UTC'
    }

    // Calculate natal chart
    const astrologyData = await swissEphemeris.calculateAstrologyData(birthData)

    return NextResponse.json({
      success: true,
      data: {
        meta: {
          tz: birthData.timezone,
          system: 'tropical',
          engine: 'swiss_ephemeris'
        },
        natal: {
          tropical: {
            planets: astrologyData.planets,
            asc: astrologyData.ascendant,
            mc: astrologyData.midheaven,
            houses: astrologyData.houses
          },
          sidereal: {
            // TODO: Calculate sidereal positions
            planets: [],
            asc: 0,
            mc: 0,
            houses: []
          }
        },
        vedic: {
          nakshatra: {
            name: 'Ashwini',
            pada: 1
          },
          dasha: [
            { planet: 'Sun', start: '2020-01-01', end: '2026-01-01' }
          ]
        }
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate natal chart' },
      { status: 500 }
    )
  }
}
