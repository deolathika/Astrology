import { NextRequest, NextResponse } from 'next/server'
import { PythagoreanNumerology } from '@/lib/numerology/engines'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')
    const system = searchParams.get('system') || 'pythagorean'

    if (!profileId) {
      return NextResponse.json(
        { error: 'Profile ID is required' },
        { status: 400 }
      )
    }

    // TODO: Fetch profile data from database
    const profileData = {
      fullName: 'John Doe',
      birthDate: '1990-01-01'
    }

    // Simplified numerology calculation using static methods
    const numerologyData = {
      lifePath: PythagoreanNumerology.calculateLifePath(profileData.birthDate).number,
      expression: PythagoreanNumerology.calculateDestiny(profileData.fullName).number,
      soulUrge: PythagoreanNumerology.calculateSoulUrge(profileData.fullName).number,
      personality: PythagoreanNumerology.calculatePersonality(profileData.fullName).number,
      birthday: PythagoreanNumerology.calculateBirthday(profileData.birthDate).number,
      currentName: PythagoreanNumerology.calculateCurrentName(profileData.fullName).number,
      master: [],
      system: system
    }

    // Check for master numbers
    const masterNumbers = []
    if (numerologyData.lifePath === 11 || numerologyData.lifePath === 22 || numerologyData.lifePath === 33) {
      masterNumbers.push(numerologyData.lifePath.toString())
    }
    if (numerologyData.expression === 11 || numerologyData.expression === 22 || numerologyData.expression === 33) {
      masterNumbers.push(numerologyData.expression.toString())
    }
    if (numerologyData.soulUrge === 11 || numerologyData.soulUrge === 22 || numerologyData.soulUrge === 33) {
      masterNumbers.push(numerologyData.soulUrge.toString())
    }

    numerologyData.master = [...new Set(masterNumbers)]

    return NextResponse.json({
      success: true,
      data: numerologyData
    })
  } catch (error) {
    console.error('Numerology calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate numerology data' },
      { status: 500 }
    )
  }
}
