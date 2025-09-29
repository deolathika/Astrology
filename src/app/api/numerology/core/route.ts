import { NextRequest, NextResponse } from 'next/server'
import { pythagoreanNumerology, chaldeanNumerology } from '@/lib/numerology/engines'

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

    let numerologyData

    if (system === 'chaldean') {
      numerologyData = {
        lifePath: pythagoreanNumerology.calculateLifePath(profileData.birthDate),
        expression: chaldeanNumerology.calculateDestiny(profileData.fullName),
        soulUrge: pythagoreanNumerology.calculateSoulUrge(profileData.fullName),
        personality: pythagoreanNumerology.calculatePersonality(profileData.fullName),
        birthday: pythagoreanNumerology.calculateBirthday(profileData.birthDate),
        maturity: pythagoreanNumerology.calculateMaturity(profileData.birthDate),
        currentName: pythagoreanNumerology.calculateCurrentName(profileData.fullName),
        master: [],
        chaldeanAlt: {
          lifePath: chaldeanNumerology.calculateLifePath(profileData.birthDate),
          expression: chaldeanNumerology.calculateDestiny(profileData.fullName),
          soulUrge: chaldeanNumerology.calculateSoulUrge(profileData.fullName),
          personality: chaldeanNumerology.calculatePersonality(profileData.fullName),
          birthday: chaldeanNumerology.calculateBirthday(profileData.birthDate),
          maturity: chaldeanNumerology.calculateMaturity(profileData.birthDate),
          currentName: chaldeanNumerology.calculateCurrentName(profileData.fullName)
        }
      }
    } else {
      numerologyData = {
        lifePath: pythagoreanNumerology.calculateLifePath(profileData.birthDate),
        expression: pythagoreanNumerology.calculateDestiny(profileData.fullName),
        soulUrge: pythagoreanNumerology.calculateSoulUrge(profileData.fullName),
        personality: pythagoreanNumerology.calculatePersonality(profileData.fullName),
        birthday: pythagoreanNumerology.calculateBirthday(profileData.birthDate),
        maturity: pythagoreanNumerology.calculateMaturity(profileData.birthDate),
        currentName: pythagoreanNumerology.calculateCurrentName(profileData.fullName),
        master: []
      }
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
