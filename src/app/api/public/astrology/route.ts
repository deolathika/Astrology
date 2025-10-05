import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthDate, birthTime, birthPlace, system = 'western' } = body

    if (!birthDate) {
      return NextResponse.json(
        { error: 'Birth date is required' },
        { status: 400 }
      )
    }

    // Mock astrology calculation for demo purposes
    const mockAstrologyData = {
      sun: {
        sign: 'Leo',
        degree: 15.5,
        house: 5,
        element: 'Fire',
        quality: 'Fixed',
        ruler: 'Sun'
      },
      moon: {
        sign: 'Cancer',
        degree: 8.2,
        house: 4,
        element: 'Water',
        quality: 'Cardinal',
        ruler: 'Moon'
      },
      rising: {
        sign: 'Aries',
        degree: 22.1,
        house: 1,
        element: 'Fire',
        quality: 'Cardinal',
        ruler: 'Mars'
      },
      planets: [
        { name: 'Sun', sign: 'Leo', degree: 15.5, house: 5 },
        { name: 'Moon', sign: 'Cancer', degree: 8.2, house: 4 },
        { name: 'Mercury', sign: 'Virgo', degree: 3.7, house: 6 },
        { name: 'Venus', sign: 'Libra', degree: 12.1, house: 7 },
        { name: 'Mars', sign: 'Aries', degree: 22.1, house: 1 },
        { name: 'Jupiter', sign: 'Sagittarius', degree: 18.9, house: 9 },
        { name: 'Saturn', sign: 'Capricorn', degree: 7.3, house: 10 },
        { name: 'Uranus', sign: 'Aquarius', degree: 11.2, house: 11 },
        { name: 'Neptune', sign: 'Pisces', degree: 14.6, house: 12 },
        { name: 'Pluto', sign: 'Scorpio', degree: 9.8, house: 8 }
      ],
      houses: [
        { number: 1, sign: 'Aries', degree: 22.1 },
        { number: 2, sign: 'Taurus', degree: 15.3 },
        { number: 3, sign: 'Gemini', degree: 8.7 },
        { number: 4, sign: 'Cancer', degree: 2.1 },
        { number: 5, sign: 'Leo', degree: 25.5 },
        { number: 6, sign: 'Virgo', degree: 18.9 },
        { number: 7, sign: 'Libra', degree: 12.3 },
        { number: 8, sign: 'Scorpio', degree: 5.7 },
        { number: 9, sign: 'Sagittarius', degree: 29.1 },
        { number: 10, sign: 'Capricorn', degree: 22.5 },
        { number: 11, sign: 'Aquarius', degree: 15.9 },
        { number: 12, sign: 'Pisces', degree: 9.3 }
      ],
      aspects: [
        { planet1: 'Sun', planet2: 'Moon', type: 'Trine', degree: 120 },
        { planet1: 'Sun', planet2: 'Venus', type: 'Conjunction', degree: 0 },
        { planet1: 'Moon', planet2: 'Mars', type: 'Square', degree: 90 },
        { planet1: 'Mercury', planet2: 'Jupiter', type: 'Sextile', degree: 60 }
      ],
      interpretation: {
        personality: 'You are a natural leader with a strong sense of self. Your Leo Sun gives you confidence and charisma, while your Cancer Moon provides emotional depth and intuition.',
        strengths: ['Leadership', 'Creativity', 'Loyalty', 'Protectiveness'],
        challenges: ['Pride', 'Stubbornness', 'Emotional sensitivity'],
        career: 'You excel in roles that allow you to lead and inspire others. Consider careers in management, entertainment, or creative fields.',
        relationships: 'You are loyal and protective in relationships, but may need to work on expressing vulnerability.',
        advice: 'Embrace your natural leadership abilities while staying connected to your emotional needs.'
      },
      system,
      calculatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: mockAstrologyData
    })

  } catch (error) {
    console.error('Astrology calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate astrology data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Public Astrology API',
    endpoints: {
      POST: '/api/public/astrology - Calculate birth chart',
      parameters: {
        birthDate: 'YYYY-MM-DD (required)',
        birthTime: 'HH:MM (optional)',
        birthPlace: 'City, Country (optional)',
        system: 'western|vedic|chinese|sri-lankan (default: western)'
      }
    }
  })
}
