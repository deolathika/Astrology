import { NextRequest, NextResponse } from 'next/server'
import { PythagoreanNumerology, ChaldeanNumerology } from '@/lib/numerology/engines'

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
        lifePath: PythagoreanNumerology.calculateLifePath(birthDate),
        destiny: ChaldeanNumerology.calculateDestiny(fullName),
        soulUrge: PythagoreanNumerology.calculateSoulUrge(fullName),
        personality: PythagoreanNumerology.calculatePersonality(fullName),
        birthday: PythagoreanNumerology.calculateBirthday(birthDate),
        currentName: PythagoreanNumerology.calculateCurrentName(fullName)
      }
    } else {
      numerologyData = {
        lifePath: PythagoreanNumerology.calculateLifePath(birthDate),
        destiny: PythagoreanNumerology.calculateDestiny(fullName),
        soulUrge: PythagoreanNumerology.calculateSoulUrge(fullName),
        personality: PythagoreanNumerology.calculatePersonality(fullName),
        birthday: PythagoreanNumerology.calculateBirthday(birthDate),
        currentName: PythagoreanNumerology.calculateCurrentName(fullName)
      }
    }

    return NextResponse.json({
      success: true,
      data: numerologyData
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate numerology data' },
      { status: 500 }
    )
  }
}
