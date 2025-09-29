import { NextRequest, NextResponse } from 'next/server'
import { pythagoreanNumerology, chaldeanNumerology } from '@/lib/numerology/engines'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, birthDate, system = 'pythagorean' } = body

    if (!fullName || !birthDate) {
      return NextResponse.json(
        { error: 'Full name and birth date are required' },
        { status: 400 }
      )
    }

    let numerologyData

    if (system === 'chaldean') {
      numerologyData = {
        lifePath: pythagoreanNumerology.calculateLifePath(birthDate),
        destiny: chaldeanNumerology.calculateDestiny(fullName),
        soulUrge: pythagoreanNumerology.calculateSoulUrge(fullName),
        personality: pythagoreanNumerology.calculatePersonality(fullName),
        birthday: pythagoreanNumerology.calculateBirthday(birthDate),
        currentName: pythagoreanNumerology.calculateCurrentName(fullName)
      }
    } else {
      numerologyData = {
        lifePath: pythagoreanNumerology.calculateLifePath(birthDate),
        destiny: pythagoreanNumerology.calculateDestiny(fullName),
        soulUrge: pythagoreanNumerology.calculateSoulUrge(fullName),
        personality: pythagoreanNumerology.calculatePersonality(fullName),
        birthday: pythagoreanNumerology.calculateBirthday(birthDate),
        currentName: pythagoreanNumerology.calculateCurrentName(fullName)
      }
    }

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
