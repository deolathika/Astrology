import { NextRequest, NextResponse } from 'next/server'
import { AstrologyValidator } from '@/lib/astrology/astrology-validator'
import { NASAHorizonsAPI } from '@/lib/astrology/nasa-horizons'
import { LLMAstrologyService } from '@/lib/ai/llm-astrology-service'
import { SwissEphemerisEngine } from '@/lib/astrology/swiss-ephemeris'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Step 1: Validate all birth data
    const validatedData = await AstrologyValidator.validateBirthData(body)
    
    if (!validatedData.isValid) {
      return NextResponse.json({
        success: false,
        error: 'Invalid birth data',
        details: validatedData.errors,
        warnings: validatedData.warnings
      }, { status: 400 })
    }

    // Step 2: Validate astrology concepts
    const astrologyValidation = AstrologyValidator.validateAstrologyConcepts(validatedData)
    const numerologyValidation = AstrologyValidator.validateNumerologyConcepts(validatedData)

    // Step 3: Get NASA data with proper coordinates and timezone
    const nasaData = await NASAHorizonsAPI.getAstronomicalData(
      validatedData.utcDateTime,
      {
        latitude: validatedData.birthPlace.coordinates.latitude,
        longitude: validatedData.birthPlace.coordinates.longitude,
        elevation: 0,
        timezone: validatedData.birthPlace.timezone,
        country: validatedData.birthPlace.country,
        city: validatedData.birthPlace.city
      }
    )

    // Step 4: Calculate Swiss Ephemeris data
    const swissEphemeris = new SwissEphemerisEngine()
    const birthData = {
      year: validatedData.birthDate.getFullYear(),
      month: validatedData.birthDate.getMonth() + 1,
      day: validatedData.birthDate.getDate(),
      hour: parseInt(validatedData.birthTime.split(':')[0]),
      minute: parseInt(validatedData.birthTime.split(':')[1]),
      second: 0,
      latitude: validatedData.birthPlace.coordinates.latitude,
      longitude: validatedData.birthPlace.coordinates.longitude,
      timezone: parseFloat(validatedData.birthPlace.timezone)
    }

    const swissData = await SwissEphemerisEngine.generateBirthChart(birthData)

    // Step 5: Get LLM analysis
    const llmRequest = {
      birthDate: validatedData.birthDate.toISOString().split('T')[0],
      birthTime: validatedData.birthTime,
      birthPlace: {
        country: validatedData.birthPlace.country,
        city: validatedData.birthPlace.city,
        coordinates: {
          latitude: validatedData.birthPlace.coordinates.latitude,
          longitude: validatedData.birthPlace.coordinates.longitude,
          elevation: 0,
          timezone: validatedData.birthPlace.timezone,
          country: validatedData.birthPlace.country,
          city: validatedData.birthPlace.city
        }
      },
      system: 'western' as const,
      language: 'en',
      includeInterpretations: true,
      includePredictions: true
    }

    const llmAnalysis = await LLMAstrologyService.getAstrologyAnalysis(llmRequest)

    // Step 6: Combine all data for comprehensive analysis
    const completeAnalysis = {
      // Validation Results
      validation: {
        isValid: validatedData.isValid,
        errors: validatedData.errors,
        warnings: validatedData.warnings,
        astrologyValidation,
        numerologyValidation
      },

      // Birth Data
      birthData: {
        personal: {
          fullName: validatedData.fullName,
          email: validatedData.email
        },
        birth: {
          date: validatedData.birthDate.toISOString().split('T')[0],
          time: validatedData.birthTime,
          place: {
            country: validatedData.birthPlace.country,
            city: validatedData.birthPlace.city,
            coordinates: validatedData.birthPlace.coordinates,
            timezone: validatedData.birthPlace.timezone
          }
        },
        astronomical: {
          utcDateTime: validatedData.utcDateTime.toISOString(),
          localDateTime: validatedData.localDateTime.toISOString(),
          julianDay: validatedData.julianDay,
          siderealTime: validatedData.siderealTime
        }
      },

      // Zodiac Signs
      zodiacSigns: validatedData.zodiacSigns,

      // NASA Data
      nasaData: nasaData.success ? {
        planets: nasaData.data.planets,
        sun: nasaData.data.sun,
        moon: nasaData.data.moon,
        ephemeris: nasaData.data.ephemeris
      } : null,

      // Swiss Ephemeris Data
      swissData: {
        positions: swissData.positions,
        houses: swissData.houses,
        aspects: swissData.aspects,
        accuracy: swissData.accuracy,
        timestamp: swissData.timestamp
      },

      // LLM Analysis
      llmAnalysis: llmAnalysis.success ? {
        interpretations: llmAnalysis.data.interpretations,
        predictions: llmAnalysis.data.predictions,
        recommendations: llmAnalysis.data.recommendations
      } : null,

      // Data Quality Assessment
      dataQuality: {
        nasaAccuracy: nasaData.success ? 'high' : 'fallback',
        swissAccuracy: 'high',
        llmAccuracy: llmAnalysis.success ? 'high' : 'fallback',
        overallAccuracy: nasaData.success && llmAnalysis.success ? 'high' : 'medium'
      },

      // Recommendations
      recommendations: [
        ...astrologyValidation.recommendations,
        ...numerologyValidation.recommendations,
        ...(nasaData.success ? [] : ['NASA data unavailable, using Swiss Ephemeris fallback']),
        ...(llmAnalysis.success ? [] : ['LLM analysis unavailable, check API keys'])
      ]
    }

    return NextResponse.json({
      success: true,
      data: completeAnalysis,
      metadata: {
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - Date.now(), // Would calculate actual processing time
        dataSources: [
          'NASA JPL Horizons',
          'Swiss Ephemeris',
          'LLM Analysis',
          'Geographic Data'
        ],
        accuracy: completeAnalysis.dataQuality.overallAccuracy
      }
    })

  } catch (error) {
    console.error('Complete Analysis Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process complete analysis',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
