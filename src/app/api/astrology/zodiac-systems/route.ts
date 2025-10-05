import { NextRequest, NextResponse } from 'next/server'
import { AstrologyEngineEnhanced } from '@/lib/astrology/astrology-engine-enhanced'
import { NASAHorizonsEnhanced } from '@/lib/astrology/nasa-horizons-enhanced'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthData, systems = ['western', 'vedic', 'chinese', 'sriLankan'] } = body

    if (!birthData) {
      return NextResponse.json(
        { error: 'Birth data is required' },
        { status: 400 }
      )
    }

    // Calculate comprehensive astrology data
    const astrologyData = await AstrologyEngineEnhanced.calculateAstrologyData(birthData)

    // Filter requested systems
    const filteredData: any = {}

    if (systems.includes('western')) {
      filteredData.western = {
        sunSign: astrologyData.western.sunSign,
        moonSign: astrologyData.western.moonSign,
        ascendant: astrologyData.western.ascendant,
        houses: astrologyData.western.houses,
        planets: astrologyData.western.planets,
        aspects: astrologyData.western.aspects,
        elements: astrologyData.western.elements,
        qualities: astrologyData.western.qualities,
        transits: astrologyData.western.transits
      }
    }

    if (systems.includes('vedic')) {
      filteredData.vedic = {
        rashi: astrologyData.vedic.rashi,
        nakshatra: astrologyData.vedic.nakshatra,
        pada: astrologyData.vedic.pada,
        dasha: astrologyData.vedic.dasha,
        yogas: astrologyData.vedic.yogas,
        remedies: astrologyData.vedic.remedies,
        kundali: astrologyData.vedic.kundali
      }
    }

    if (systems.includes('chinese')) {
      filteredData.chinese = {
        animalSign: astrologyData.chinese.animalSign,
        element: astrologyData.chinese.element,
        yinYang: astrologyData.chinese.yinYang,
        luckyNumbers: astrologyData.chinese.luckyNumbers,
        luckyColors: astrologyData.chinese.luckyColors,
        compatibility: astrologyData.chinese.compatibility
      }
    }

    if (systems.includes('sriLankan')) {
      filteredData.sriLankan = {
        sinhalaSign: astrologyData.sriLankan.sinhalaSign,
        sinhalaName: astrologyData.sriLankan.sinhalaName,
        luckyStone: astrologyData.sriLankan.luckyStone,
        luckyColor: astrologyData.sriLankan.luckyColor,
        luckyFlower: astrologyData.sriLankan.luckyFlower,
        luckyMetal: astrologyData.sriLankan.luckyMetal,
        healthAdvice: astrologyData.sriLankan.healthAdvice,
        spiritualGuidance: astrologyData.sriLankan.spiritualGuidance,
        traditionalRemedies: astrologyData.sriLankan.traditionalRemedies
      }
    }

    // Add NASA data if requested
    if (systems.includes('nasa')) {
      filteredData.nasa = astrologyData.nasa
    }

    return NextResponse.json({
      success: true,
      data: filteredData,
      meta: {
        timestamp: new Date().toISOString(),
        systems: systems,
        location: birthData.city || 'Unknown',
        country: birthData.country || 'Unknown'
      }
    })
  } catch (error) {
    console.error('Zodiac systems calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate zodiac systems data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')
    const systems = searchParams.get('systems')?.split(',') || ['western', 'vedic', 'chinese', 'sriLankan']

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

    // Calculate comprehensive astrology data
    const astrologyData = await AstrologyEngineEnhanced.calculateAstrologyData(birthData)

    // Filter requested systems
    const filteredData: any = {}

    if (systems.includes('western')) {
      filteredData.western = {
        sunSign: astrologyData.western.sunSign,
        moonSign: astrologyData.western.moonSign,
        ascendant: astrologyData.western.ascendant,
        houses: astrologyData.western.houses,
        planets: astrologyData.western.planets,
        aspects: astrologyData.western.aspects,
        elements: astrologyData.western.elements,
        qualities: astrologyData.western.qualities,
        transits: astrologyData.western.transits
      }
    }

    if (systems.includes('vedic')) {
      filteredData.vedic = {
        rashi: astrologyData.vedic.rashi,
        nakshatra: astrologyData.vedic.nakshatra,
        pada: astrologyData.vedic.pada,
        dasha: astrologyData.vedic.dasha,
        yogas: astrologyData.vedic.yogas,
        remedies: astrologyData.vedic.remedies,
        kundali: astrologyData.vedic.kundali
      }
    }

    if (systems.includes('chinese')) {
      filteredData.chinese = {
        animalSign: astrologyData.chinese.animalSign,
        element: astrologyData.chinese.element,
        yinYang: astrologyData.chinese.yinYang,
        luckyNumbers: astrologyData.chinese.luckyNumbers,
        luckyColors: astrologyData.chinese.luckyColors,
        compatibility: astrologyData.chinese.compatibility
      }
    }

    if (systems.includes('sriLankan')) {
      filteredData.sriLankan = {
        sinhalaSign: astrologyData.sriLankan.sinhalaSign,
        sinhalaName: astrologyData.sriLankan.sinhalaName,
        luckyStone: astrologyData.sriLankan.luckyStone,
        luckyColor: astrologyData.sriLankan.luckyColor,
        luckyFlower: astrologyData.sriLankan.luckyFlower,
        luckyMetal: astrologyData.sriLankan.luckyMetal,
        healthAdvice: astrologyData.sriLankan.healthAdvice,
        spiritualGuidance: astrologyData.sriLankan.spiritualGuidance,
        traditionalRemedies: astrologyData.sriLankan.traditionalRemedies
      }
    }

    // Add NASA data if requested
    if (systems.includes('nasa')) {
      filteredData.nasa = astrologyData.nasa
    }

    return NextResponse.json({
      success: true,
      data: filteredData,
      meta: {
        timestamp: new Date().toISOString(),
        systems: systems,
        location: birthData.city,
        country: birthData.country
      }
    })
  } catch (error) {
    console.error('Zodiac systems calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate zodiac systems data' },
      { status: 500 }
    )
  }
}

