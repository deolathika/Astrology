/**
 * Comprehensive Astrology Data Validator
 * Ensures all birth data is properly validated and combined for accurate calculations
 */

import { z } from 'zod'
import { GeographyService } from '../geography/country-city-data'

export interface ValidatedBirthData {
  fullName: string
  email: string
  birthDate: Date
  birthTime: string
  birthPlace: {
    country: string
    city: string
    coordinates: {
      latitude: number
      longitude: number
    }
    timezone: string
  }
  utcDateTime: Date
  localDateTime: Date
  julianDay: number
  siderealTime: number
  zodiacSigns: {
    western: string
    vedic: string
    chinese: string
    sriLankan: string
  }
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export class AstrologyValidator {
  private static readonly birthDataSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
    email: z.string().email('Invalid email format'),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    birthTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
    birthPlace: z.object({
      country: z.string().min(2, 'Country code required'),
      city: z.string().min(1, 'City name required')
    })
  })

  static async validateBirthData(rawData: any): Promise<ValidatedBirthData> {
    const errors: string[] = []
    const warnings: string[] = []
    
    try {
      const validation = this.birthDataSchema.safeParse(rawData)
      if (!validation.success) {
        validation.error.errors.forEach(error => {
          errors.push(`${error.path.join('.')}: ${error.message}`)
        })
        return this.createInvalidResult(errors, warnings)
      }

      const data = validation.data
      const birthDate = new Date(data.birthDate)
      
      if (isNaN(birthDate.getTime())) {
        errors.push('Invalid birth date')
        return this.createInvalidResult(errors, warnings)
      }

      if (birthDate > new Date()) {
        errors.push('Birth date cannot be in the future')
        return this.createInvalidResult(errors, warnings)
      }

      if (birthDate.getFullYear() < 1900) {
        warnings.push('Birth date is very old, calculations may be less accurate')
      }

      const [hours, minutes] = data.birthTime.split(':').map(Number)
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        errors.push('Invalid birth time')
        return this.createInvalidResult(errors, warnings)
      }

      const country = GeographyService.getCountryByCode(data.birthPlace.country)
      if (!country) {
        errors.push('Invalid country code')
        return this.createInvalidResult(errors, warnings)
      }

      const city = GeographyService.getCityByName(data.birthPlace.city, data.birthPlace.country)
      if (!city) {
        errors.push('City not found in selected country')
        return this.createInvalidResult(errors, warnings)
      }

      const localDateTime = new Date(
        birthDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate(),
        hours,
        minutes,
        0
      )

      const utcDateTime = this.convertToUTC(localDateTime, city.timezone)
      const julianDay = this.calculateJulianDay(utcDateTime)
      const siderealTime = this.calculateSiderealTime(julianDay, city.coordinates.longitude)

      const zodiacSigns = await this.calculateZodiacSigns(birthDate, city.coordinates)

      return {
        fullName: data.fullName,
        email: data.email,
        birthDate,
        birthTime: data.birthTime,
        birthPlace: {
          country: data.birthPlace.country,
          city: data.birthPlace.city,
          coordinates: city.coordinates,
          timezone: city.timezone
        },
        utcDateTime,
        localDateTime,
        julianDay,
        siderealTime,
        zodiacSigns,
        isValid: true,
        errors: [],
        warnings
      }

    } catch (error) {
      errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return this.createInvalidResult(errors, warnings)
    }
  }

  private static convertToUTC(localDateTime: Date, timezone: string): Date {
    const timezoneOffset = this.getTimezoneOffset(timezone)
    const utcTime = new Date(localDateTime.getTime() - (timezoneOffset * 60 * 60 * 1000))
    return utcTime
  }

  private static getTimezoneOffset(timezone: string): number {
    const timezoneOffsets: { [key: string]: number } = {
      'UTC': 0,
      'Asia/Colombo': 5.5,
      'Asia/Kolkata': 5.5,
      'America/New_York': -5,
      'America/Los_Angeles': -8,
      'Europe/London': 0,
      'Europe/Berlin': 1,
      'Asia/Tokyo': 9,
      'Asia/Shanghai': 8,
      'Australia/Sydney': 10
    }
    
    return timezoneOffsets[timezone] || 0
  }

  private static calculateJulianDay(date: Date): number {
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    const hour = date.getUTCHours()
    const minute = date.getUTCMinutes()
    const second = date.getUTCSeconds()

    const a = Math.floor((14 - month) / 12)
    const y = year + 4800 - a
    const m = month + 12 * a - 3

    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 
           Math.floor(y / 100) + Math.floor(y / 400) - 32045 + 
           (hour + minute / 60 + second / 3600) / 24
  }

  private static calculateSiderealTime(julianDay: number, longitude: number): number {
    const T = (julianDay - 2451545.0) / 36525.0
    const sidereal = 280.46061837 + 360.98564736629 * (julianDay - 2451545.0) + 
                     0.000387933 * T * T - T * T * T / 38710000.0 + longitude
    return sidereal % 360
  }

  private static async calculateZodiacSigns(birthDate: Date, coordinates: { latitude: number; longitude: number }) {
    const { ZodiacCalculator } = await import('./zodiac-calculator')
    
    const zodiacResult = ZodiacCalculator.autoDetectZodiacSign(birthDate.toISOString().split('T')[0])
    
    return {
      western: zodiacResult?.western || 'Unknown',
      vedic: zodiacResult?.vedic || 'Unknown',
      chinese: zodiacResult?.chinese || 'Unknown',
      sriLankan: zodiacResult?.sriLankan || 'Unknown'
    }
  }

  private static createInvalidResult(errors: string[], warnings: string[]): ValidatedBirthData {
    return {
      fullName: '',
      email: '',
      birthDate: new Date(),
      birthTime: '',
      birthPlace: {
        country: '',
        city: '',
        coordinates: { latitude: 0, longitude: 0 },
        timezone: 'UTC'
      },
      utcDateTime: new Date(),
      localDateTime: new Date(),
      julianDay: 0,
      siderealTime: 0,
      zodiacSigns: {
        western: 'Unknown',
        vedic: 'Unknown',
        chinese: 'Unknown',
        sriLankan: 'Unknown'
      },
      isValid: false,
      errors,
      warnings
    }
  }

  static validateAstrologyConcepts(validatedData: ValidatedBirthData): {
    isComplete: boolean
    missingElements: string[]
    recommendations: string[]
  } {
    const missingElements: string[] = []
    const recommendations: string[] = []

    if (!validatedData.birthDate) {
      missingElements.push('Birth date')
    }

    if (!validatedData.birthTime) {
      missingElements.push('Birth time')
      recommendations.push('Birth time is crucial for accurate house calculations and rising sign')
    }

    if (!validatedData.birthPlace.coordinates.latitude || !validatedData.birthPlace.coordinates.longitude) {
      missingElements.push('Birth place coordinates')
      recommendations.push('Exact birth place coordinates are essential for accurate calculations')
    }

    if (!validatedData.birthPlace.timezone) {
      missingElements.push('Timezone information')
      recommendations.push('Timezone is required for proper time conversion')
    }

    if (validatedData.birthTime === '00:00' || validatedData.birthTime === '12:00') {
      recommendations.push('Consider providing more precise birth time for better accuracy')
    }

    if (Math.abs(validatedData.birthPlace.coordinates.latitude) > 66.5) {
      recommendations.push('High latitude birth places may require special house system calculations')
    }

    return {
      isComplete: missingElements.length === 0,
      missingElements,
      recommendations
    }
  }

  static validateNumerologyConcepts(validatedData: ValidatedBirthData): {
    isComplete: boolean
    missingElements: string[]
    recommendations: string[]
  } {
    const missingElements: string[] = []
    const recommendations: string[] = []

    if (!validatedData.fullName || validatedData.fullName.length < 2) {
      missingElements.push('Full name for numerology calculations')
    }

    if (!validatedData.birthDate) {
      missingElements.push('Birth date for life path number')
    }

    const nameParts = validatedData.fullName.trim().split(' ')
    if (nameParts.length < 2) {
      recommendations.push('Full name (first and last) recommended for complete numerology analysis')
    }

    return {
      isComplete: missingElements.length === 0,
      missingElements,
      recommendations
    }
  }
}
