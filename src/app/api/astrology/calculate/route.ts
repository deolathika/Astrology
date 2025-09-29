import { NextRequest, NextResponse } from 'next/server'
import { swissEphemeris } from '@/lib/astrology/swiss-ephemeris'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthData } = body

    if (!birthData) {
      return NextResponse.json(
        { error: 'Birth data is required' },
        { status: 400 }
      )
    }

    // Calculate astrology data using Swiss Ephemeris
    const astrologyData = await swissEphemeris.calculateAstrologyData(birthData)

    return NextResponse.json({
      success: true,
      data: astrologyData
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate astrology data' },
      { status: 500 }
    )
  }
}
