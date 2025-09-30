import { NextRequest, NextResponse } from 'next/server'
import { enhancedNumerology } from '@/lib/numerology/enhanced-numerology'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')
    const system = searchParams.get('system') || 'pythagorean'

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID required' }, { status: 400 })
    }

    // Get user profile data (mock for now)
    const userProfile = {
      id: profileId,
      fullName: 'Alex Johnson',
      birthDate: '1990-06-15',
      currentName: 'Alex Johnson'
    }

    // Calculate enhanced numerology
    const numerologyData = enhancedNumerology.calculateProfile({
      fullName: userProfile.fullName,
      birthDate: userProfile.birthDate,
      currentName: userProfile.currentName
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

