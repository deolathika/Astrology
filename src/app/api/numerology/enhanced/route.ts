import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'
import { enhancedNumerology } from '@/lib/numerology/enhanced-numerology'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')
    const system = searchParams.get('system') || 'pythagorean'

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID required' }, { status: 400 })
    }

    // Get actual user profile data from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profiles: true }
    })

    if (!user || !user.profiles.length) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    const userProfile = user.profiles[0]
    const profileData = {
      id: profileId,
      fullName: userProfile.fullName || user.name || 'User',
      birthDate: userProfile.birthDate ? userProfile.birthDate.toISOString().split('T')[0] : '1990-01-01',
      currentName: userProfile.fullName || user.name || 'User'
    }

    // Calculate enhanced numerology
    const numerologyData = enhancedNumerology.calculateProfile({
      fullName: profileData.fullName,
      birthDate: profileData.birthDate,
      currentName: profileData.currentName
    })

    // Get number meanings
    const meanings = enhancedNumerology.getNumberMeanings()

    return NextResponse.json({
      success: true,
      numerology: numerologyData,
      meanings,
      timestamp: new Date().toISOString(),
      source: 'enhanced_numerology'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Numerology calculation failed' },
      { status: 500 }
    )
  }
}



