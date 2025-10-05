import { NextRequest, NextResponse } from 'next/server'
import { AstrologyEngineEnhanced } from '@/lib/astrology/astrology-engine-enhanced'
import { requirePremium } from '@/lib/auth/role-middleware'
import { z } from 'zod'

const premiumAstrologySchema = z.object({
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  second: z.number().int().min(0).max(59),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timezone: z.number(),
  country: z.string().min(1),
  city: z.string().min(1),
  zodiacSystem: z.enum(['western', 'vedic', 'chinese', 'sri-lanka', 'hybrid']).default('western'),
})

export async function POST(request: NextRequest) {
  try {
    // Check if user has premium access
    const premiumCheck = await requirePremium(request)
    if (premiumCheck instanceof NextResponse) {
      return premiumCheck
    }

    const body = await request.json()
    const validatedData = premiumAstrologySchema.parse(body)

    // Create astrology engine instance
    const astrologyEngine = new AstrologyEngineEnhanced()
    
    // Transform data to match expected format
    const birthData = {
      date: new Date(validatedData.year, validatedData.month - 1, validatedData.day),
      time: `${validatedData.hour.toString().padStart(2, '0')}:${validatedData.minute.toString().padStart(2, '0')}`,
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      timezone: validatedData.timezone.toString(),
      country: validatedData.country,
      city: validatedData.city
    }

    // Calculate comprehensive natal chart
    const natalChart = await AstrologyEngineEnhanced.calculateAstrologyData(birthData, true) // isPremium = true

    return NextResponse.json({
      success: true,
      data: natalChart,
      message: 'Premium astrology analysis successful',
    })
  } catch (error) {
    console.error('Premium astrology calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate premium astrology data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if user has premium access
    const premiumCheck = await requirePremium(request)
    if (premiumCheck instanceof NextResponse) {
      return premiumCheck
    }

    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')
    const features = searchParams.get('features')?.split(',') || ['all']

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

    // Calculate premium astrology data
    const astrologyData = await AstrologyEngineEnhanced.calculateAstrologyData(
      birthData,
      true
    )

    // Filter features based on request
    const filteredData = filterPremiumFeatures(astrologyData, features)

    return NextResponse.json({
      success: true,
      data: filteredData,
      meta: {
        timestamp: new Date().toISOString(),
        features: features,
        premium: true
      }
    })
  } catch (error) {
    console.error('Premium astrology calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate premium astrology data' },
      { status: 500 }
    )
  }
}

function filterPremiumFeatures(data: any, features: string[]) {
  if (features.includes('all')) {
    return data
  }

  const filteredData: any = {}

  if (features.includes('western')) {
    filteredData.western = data.western
  }

  if (features.includes('vedic')) {
    filteredData.vedic = data.vedic
  }

  if (features.includes('chinese')) {
    filteredData.chinese = data.chinese
  }

  if (features.includes('sriLankan')) {
    filteredData.sriLankan = data.sriLankan
  }

  if (features.includes('nasa')) {
    filteredData.nasa = data.nasa
  }

  if (features.includes('premium')) {
    filteredData.premium = data.premium
  }

  return filteredData
}
