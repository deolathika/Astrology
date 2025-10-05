import { NextRequest, NextResponse } from 'next/server'
import { AstrologyEngineEnhanced } from '@/lib/astrology/astrology-engine-enhanced'
import { NASAHorizonsEnhanced } from '@/lib/astrology/nasa-horizons-enhanced'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthData, city = 'colombo' } = body

    if (!birthData) {
      return NextResponse.json(
        { error: 'Birth data is required' },
        { status: 400 }
      )
    }

    // Get Sri Lanka specific coordinates
    const sriLankaCoords = NASAHorizonsEnhanced.getSriLankaCoordinates(city)

    // Calculate astrology data with Sri Lanka context
    const astrologyData = await AstrologyEngineEnhanced.calculateAstrologyData({
      ...birthData,
      latitude: sriLankaCoords.latitude,
      longitude: sriLankaCoords.longitude,
      timezone: sriLankaCoords.timezone,
      country: sriLankaCoords.country,
      city: sriLankaCoords.city
    })

    // Focus on Sri Lankan astrology features
    const sriLankanData = {
      sinhala: astrologyData.sriLankan,
      western: astrologyData.western,
      vedic: astrologyData.vedic,
      nasa: astrologyData.nasa,
      cultural: {
        sinhalaSign: astrologyData.sriLankan.sinhalaSign,
        sinhalaName: astrologyData.sriLankan.sinhalaName,
        luckyStone: astrologyData.sriLankan.luckyStone,
        luckyColor: astrologyData.sriLankan.luckyColor,
        luckyFlower: astrologyData.sriLankan.luckyFlower,
        luckyMetal: astrologyData.sriLankan.luckyMetal,
        healthAdvice: astrologyData.sriLankan.healthAdvice,
        spiritualGuidance: astrologyData.sriLankan.spiritualGuidance,
        traditionalRemedies: astrologyData.sriLankan.traditionalRemedies
      },
      location: {
        city: sriLankaCoords.city,
        coordinates: {
          latitude: sriLankaCoords.latitude,
          longitude: sriLankaCoords.longitude
        },
        timezone: sriLankaCoords.timezone
      }
    }

    return NextResponse.json({
      success: true,
      data: sriLankanData,
      meta: {
        timestamp: new Date().toISOString(),
        location: sriLankaCoords.city,
        country: 'Sri Lanka',
        language: 'Sinhala'
      }
    })
  } catch (error) {
    console.error('Sri Lankan astrology calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate Sri Lankan astrology data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')
    const city = searchParams.get('city') || 'colombo'

    if (!profileId) {
      return NextResponse.json(
        { error: 'Profile ID is required' },
        { status: 400 }
      )
    }

    // TODO: Fetch profile data from database
    const birthData = {
      date: new Date('1990-01-01'),
      time: '12:00',
      latitude: 6.9271,
      longitude: 79.8612,
      timezone: 'Asia/Colombo',
      country: 'Sri Lanka',
      city: 'Colombo'
    }

    // Get Sri Lanka specific coordinates
    const sriLankaCoords = NASAHorizonsEnhanced.getSriLankaCoordinates(city)

    // Calculate astrology data with Sri Lanka context
    const astrologyData = await AstrologyEngineEnhanced.calculateAstrologyData({
      ...birthData,
      latitude: sriLankaCoords.latitude,
      longitude: sriLankaCoords.longitude,
      timezone: sriLankaCoords.timezone,
      country: sriLankaCoords.country,
      city: sriLankaCoords.city
    })

    // Focus on Sri Lankan astrology features
    const sriLankanData = {
      sinhala: astrologyData.sriLankan,
      western: astrologyData.western,
      vedic: astrologyData.vedic,
      nasa: astrologyData.nasa,
      cultural: {
        sinhalaSign: astrologyData.sriLankan.sinhalaSign,
        sinhalaName: astrologyData.sriLankan.sinhalaName,
        luckyStone: astrologyData.sriLankan.luckyStone,
        luckyColor: astrologyData.sriLankan.luckyColor,
        luckyFlower: astrologyData.sriLankan.luckyFlower,
        luckyMetal: astrologyData.sriLankan.luckyMetal,
        healthAdvice: astrologyData.sriLankan.healthAdvice,
        spiritualGuidance: astrologyData.sriLankan.spiritualGuidance,
        traditionalRemedies: astrologyData.sriLankan.traditionalRemedies
      },
      location: {
        city: sriLankaCoords.city,
        coordinates: {
          latitude: sriLankaCoords.latitude,
          longitude: sriLankaCoords.longitude
        },
        timezone: sriLankaCoords.timezone
      }
    }

    return NextResponse.json({
      success: true,
      data: sriLankanData,
      meta: {
        timestamp: new Date().toISOString(),
        location: sriLankaCoords.city,
        country: 'Sri Lanka',
        language: 'Sinhala'
      }
    })
  } catch (error) {
    console.error('Sri Lankan astrology calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate Sri Lankan astrology data' },
      { status: 500 }
    )
  }
}

