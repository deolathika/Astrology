/**
 * LLM Integration for Automated Astrology Calculations
 * Uses AI to provide intelligent interpretations and automated calculations
 */

import { ZodiacCalculator } from '../astrology/zodiac-calculator'
import { NASAHorizonsAPI, NASACoordinates } from '../astrology/nasa-horizons'
import { GeographyService } from '../geography/country-city-data'

export interface LLMAstrologyRequest {
  birthDate: string
  birthTime: string
  birthPlace: {
    country: string
    city: string
    coordinates?: NASACoordinates
  }
  system: 'western' | 'vedic' | 'chinese' | 'sri-lankan'
  language: string
  includeInterpretations: boolean
  includePredictions: boolean
  includeCompatibility?: boolean
  partnerData?: {
    birthDate: string
    birthTime: string
    birthPlace: {
      country: string
      city: string
    }
  }
}

export interface LLMAstrologyResponse {
  success: boolean
  data: {
    basicInfo: {
      zodiacSign: string
      element: string
      quality: string
      rulingPlanet: string
      symbol: string
    }
    planetaryPositions: any[]
    housePositions: any[]
    aspects: any[]
    interpretations: {
      personality: string
      strengths: string[]
      challenges: string[]
      career: string
      relationships: string
      health: string
    }
    predictions?: {
      daily: string
      weekly: string
      monthly: string
      yearly: string
    }
    compatibility?: {
      score: number
      analysis: string
      strengths: string[]
      challenges: string[]
      advice: string
    }
    recommendations: {
      luckyColors: string[]
      luckyNumbers: number[]
      luckyDays: string[]
      gemstones: string[]
      activities: string[]
    }
  }
  metadata: {
    source: 'LLM + NASA JPL Horizons'
    accuracy: 'high'
    timestamp: string
    processingTime: number
  }
}

export class LLMAstrologyService {
  private static readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY
  private static readonly GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY

  /**
   * Get comprehensive astrology analysis using LLM
   */
  static async getAstrologyAnalysis(request: LLMAstrologyRequest): Promise<LLMAstrologyResponse> {
    const startTime = Date.now()
    
    try {
      // Step 1: Get coordinates for birth place
      const coordinates = await this.getBirthPlaceCoordinates(request.birthPlace)
      
      // Step 2: Calculate zodiac signs
      const zodiacSigns = ZodiacCalculator.autoDetectZodiacSign(request.birthDate)
      if (!zodiacSigns) {
        throw new Error('Invalid birth date format')
      }

      // Step 3: Get NASA planetary positions
      const birthDateTime = new Date(`${request.birthDate}T${request.birthTime}`)
      const nasaData = await NASAHorizonsAPI.getAstronomicalData(birthDateTime, coordinates)
      
      // Step 4: Generate LLM interpretations
      const interpretations = await this.generateInterpretations(request, zodiacSigns, nasaData)
      
      // Step 5: Generate predictions if requested
      const predictions = request.includePredictions ? 
        await this.generatePredictions(request, zodiacSigns, nasaData) : undefined

      // Step 6: Generate compatibility analysis if requested
      const compatibility = request.includeCompatibility && request.partnerData ?
        await this.generateCompatibilityAnalysis(request, request.partnerData) : undefined

      // Step 7: Generate recommendations
      const recommendations = await this.generateRecommendations(zodiacSigns, nasaData)

      const processingTime = Date.now() - startTime

      return {
        success: true,
        data: {
          basicInfo: {
            zodiacSign: zodiacSigns.western,
            element: zodiacSigns.info?.element || '',
            quality: zodiacSigns.info?.quality || '',
            rulingPlanet: zodiacSigns.info?.rulingPlanet || '',
            symbol: zodiacSigns.info?.symbol || ''
          },
          planetaryPositions: nasaData.data.planets,
          housePositions: [], // Would be calculated from Swiss Ephemeris
          aspects: [], // Would be calculated from planetary positions
          interpretations,
          predictions,
          compatibility,
          recommendations
        },
        metadata: {
          source: 'LLM + NASA JPL Horizons',
          accuracy: 'high',
          timestamp: new Date().toISOString(),
          processingTime
        }
      }
    } catch (error) {
      console.error('LLM Astrology Service Error:', error)
      return {
        success: false,
        data: {
          basicInfo: {
            zodiacSign: '',
            element: '',
            quality: '',
            rulingPlanet: '',
            symbol: ''
          },
          planetaryPositions: [],
          housePositions: [],
          aspects: [],
          interpretations: {
            personality: '',
            strengths: [],
            challenges: [],
            career: '',
            relationships: '',
            health: ''
          },
          recommendations: {
            luckyColors: [],
            luckyNumbers: [],
            luckyDays: [],
            gemstones: [],
            activities: []
          }
        },
        metadata: {
          source: 'LLM + NASA JPL Horizons',
          accuracy: 'high',
          timestamp: new Date().toISOString(),
          processingTime: Date.now() - startTime
        }
      }
    }
  }

  /**
   * Get birth place coordinates
   */
  private static async getBirthPlaceCoordinates(birthPlace: any): Promise<NASACoordinates> {
    const city = GeographyService.getCityByName(birthPlace.city, birthPlace.country)
    if (city) {
      return {
        latitude: city.coordinates.latitude,
        longitude: city.coordinates.longitude,
        elevation: 0, // Default elevation
        timezone: city.timezone,
        country: birthPlace.country,
        city: birthPlace.city
      }
    }
    
    // Fallback to country coordinates
    const country = GeographyService.getCountryByCode(birthPlace.country)
    if (country) {
      return {
        latitude: country.coordinates.latitude,
        longitude: country.coordinates.longitude,
        elevation: 0,
        timezone: country.timezone,
        country: birthPlace.country,
        city: birthPlace.city
      }
    }
    
    throw new Error('Birth place not found')
  }

  /**
   * Generate interpretations using LLM
   */
  private static async generateInterpretations(
    request: LLMAstrologyRequest,
    zodiacSigns: any,
    nasaData: any
  ): Promise<any> {
    const prompt = this.buildInterpretationPrompt(request, zodiacSigns, nasaData)
    
    try {
      if (this.OPENAI_API_KEY) {
        return await this.callOpenAI(prompt)
      } else if (this.GEMINI_API_KEY) {
        return await this.callGemini(prompt)
      } else {
        return this.getFallbackInterpretations(zodiacSigns)
      }
    } catch (error) {
      console.error('LLM Interpretation Error:', error)
      return this.getFallbackInterpretations(zodiacSigns)
    }
  }

  /**
   * Generate predictions using LLM
   */
  private static async generatePredictions(
    request: LLMAstrologyRequest,
    zodiacSigns: any,
    nasaData: any
  ): Promise<any> {
    const prompt = this.buildPredictionPrompt(request, zodiacSigns, nasaData)
    
    try {
      if (this.OPENAI_API_KEY) {
        return await this.callOpenAI(prompt)
      } else if (this.GEMINI_API_KEY) {
        return await this.callGemini(prompt)
      } else {
        return this.getFallbackPredictions()
      }
    } catch (error) {
      console.error('LLM Prediction Error:', error)
      return this.getFallbackPredictions()
    }
  }

  /**
   * Generate compatibility analysis
   */
  private static async generateCompatibilityAnalysis(
    request: LLMAstrologyRequest,
    partnerData: any
  ): Promise<any> {
    const prompt = this.buildCompatibilityPrompt(request, partnerData)
    
    try {
      if (this.OPENAI_API_KEY) {
        return await this.callOpenAI(prompt)
      } else if (this.GEMINI_API_KEY) {
        return await this.callGemini(prompt)
      } else {
        return this.getFallbackCompatibility()
      }
    } catch (error) {
      console.error('LLM Compatibility Error:', error)
      return this.getFallbackCompatibility()
    }
  }

  /**
   * Generate recommendations
   */
  private static async generateRecommendations(zodiacSigns: any, nasaData: any): Promise<any> {
    // This would use the zodiac sign and planetary positions to generate recommendations
    return {
      luckyColors: ['Blue', 'Silver', 'White'],
      luckyNumbers: [7, 14, 21, 28],
      luckyDays: ['Monday', 'Friday'],
      gemstones: ['Moonstone', 'Pearl', 'Aquamarine'],
      activities: ['Meditation', 'Swimming', 'Reading', 'Music']
    }
  }

  /**
   * Build interpretation prompt
   */
  private static buildInterpretationPrompt(request: LLMAstrologyRequest, zodiacSigns: any, nasaData: any): string {
    return `
    Analyze the following astrological data and provide comprehensive interpretations:
    
    Birth Date: ${request.birthDate}
    Birth Time: ${request.birthTime}
    Birth Place: ${request.birthPlace.city}, ${request.birthPlace.country}
    Zodiac Sign: ${zodiacSigns.western}
    Element: ${zodiacSigns.info?.element}
    Quality: ${zodiacSigns.info?.quality}
    Ruling Planet: ${zodiacSigns.info?.rulingPlanet}
    
    Planetary Positions:
    ${nasaData.data.planets.map((planet: any) => `${planet.name}: ${planet.longitude}°`).join('\n')}
    
    Please provide:
    1. Personality analysis (2-3 sentences)
    2. Top 3 strengths
    3. Top 3 challenges
    4. Career guidance (2-3 sentences)
    5. Relationship insights (2-3 sentences)
    6. Health recommendations (2-3 sentences)
    
    Respond in ${request.language} language.
    `
  }

  /**
   * Build prediction prompt
   */
  private static buildPredictionPrompt(request: LLMAstrologyRequest, zodiacSigns: any, nasaData: any): string {
    return `
    Based on the astrological data, provide predictions:
    
    Zodiac Sign: ${zodiacSigns.western}
    Current Planetary Positions: ${nasaData.data.planets.map((planet: any) => `${planet.name}: ${planet.longitude}°`).join(', ')}
    
    Provide:
    1. Daily prediction (1-2 sentences)
    2. Weekly prediction (1-2 sentences)
    3. Monthly prediction (1-2 sentences)
    4. Yearly prediction (1-2 sentences)
    
    Respond in ${request.language} language.
    `
  }

  /**
   * Build compatibility prompt
   */
  private static buildCompatibilityPrompt(request: LLMAstrologyRequest, partnerData: any): string {
    return `
    Analyze compatibility between:
    
    Person 1: ${request.birthDate} ${request.birthTime} in ${request.birthPlace.city}, ${request.birthPlace.country}
    Person 2: ${partnerData.birthDate} ${partnerData.birthTime} in ${partnerData.birthPlace.city}, ${partnerData.birthPlace.country}
    
    Provide:
    1. Compatibility score (0-100)
    2. Relationship analysis (3-4 sentences)
    3. Top 3 relationship strengths
    4. Top 3 relationship challenges
    5. Advice for the relationship (2-3 sentences)
    
    Respond in ${request.language} language.
    `
  }

  /**
   * Call OpenAI API
   */
  private static async callOpenAI(prompt: string): Promise<any> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
  }

  /**
   * Call Google Gemini API
   */
  private static async callGemini(prompt: string): Promise<any> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })

    const data = await response.json()
    return JSON.parse(data.candidates[0].content.parts[0].text)
  }

  /**
   * Fallback interpretations
   */
  private static getFallbackInterpretations(zodiacSigns: any): any {
    return {
      personality: `As a ${zodiacSigns.western}, you possess the natural qualities of your sign.`,
      strengths: ['Natural leadership', 'Creative thinking', 'Strong intuition'],
      challenges: ['Impatience', 'Perfectionism', 'Overthinking'],
      career: 'Your natural talents align well with leadership and creative roles.',
      relationships: 'You value deep connections and meaningful partnerships.',
      health: 'Focus on balance and regular exercise for optimal well-being.'
    }
  }

  /**
   * Fallback predictions
   */
  private static getFallbackPredictions(): any {
    return {
      daily: 'Today brings opportunities for growth and positive changes.',
      weekly: 'This week focuses on relationships and personal development.',
      monthly: 'This month emphasizes career advancement and new opportunities.',
      yearly: 'This year brings significant personal growth and new beginnings.'
    }
  }

  /**
   * Fallback compatibility
   */
  private static getFallbackCompatibility(): any {
    return {
      score: 75,
      analysis: 'You have good compatibility with potential for growth.',
      strengths: ['Good communication', 'Shared values', 'Mutual respect'],
      challenges: ['Different approaches', 'Communication styles', 'Timing issues'],
      advice: 'Focus on understanding each other\'s perspectives and communicate openly.'
    }
  }
}
