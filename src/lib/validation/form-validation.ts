'use client'

import { z } from 'zod'

// Common validation schemas
export const emailSchema = z.string().email('Please enter a valid email address')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')

export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine((date) => {
    const parsedDate = new Date(date)
    const now = new Date()
    const minDate = new Date('1900-01-01')
    return parsedDate <= now && parsedDate >= minDate
  }, 'Date must be between 1900 and today')

export const timeSchema = z
  .string()
  .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format')

export const latitudeSchema = z
  .number()
  .min(-90, 'Latitude must be between -90 and 90')
  .max(90, 'Latitude must be between -90 and 90')

export const longitudeSchema = z
  .number()
  .min(-180, 'Longitude must be between -180 and 180')
  .max(180, 'Longitude must be between -180 and 180')

// Birth data validation
export const birthDataSchema = z.object({
  name: nameSchema,
  birthDate: dateSchema,
  birthTime: timeSchema.optional(),
  birthPlace: z.string().min(2, 'Birth place is required'),
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  timezone: z.string().min(1, 'Timezone is required')
})

// Numerology validation
export const numerologyDataSchema = z.object({
  name: nameSchema,
  birthDate: dateSchema,
  system: z.enum(['pythagorean', 'chaldean']).default('pythagorean')
})

// Compatibility validation
export const compatibilityDataSchema = z.object({
  person1: birthDataSchema,
  person2: birthDataSchema
})

// Dream analysis validation
export const dreamAnalysisSchema = z.object({
  dream: z
    .string()
    .min(10, 'Dream description must be at least 10 characters')
    .max(1000, 'Dream description must be less than 1000 characters'),
  emotionalTone: z.enum(['positive', 'negative', 'neutral', 'mixed']).optional(),
  symbols: z.array(z.string()).optional()
})

// Community post validation
export const communityPostSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(500, 'Content must be less than 500 characters'),
  emoji: z.string().emoji('Please select a valid emoji').optional(),
  tags: z.array(z.string()).optional()
})

// Profile validation
export const profileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  birthDate: dateSchema,
  birthTime: timeSchema.optional(),
  birthPlace: z.string().min(2, 'Birth place is required'),
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  timezone: z.string().min(1, 'Timezone is required'),
  astrologySystem: z.enum(['western', 'vedic', 'chinese', 'sri-lankan', 'hybrid']).default('western'),
  numerologySystem: z.enum(['pythagorean', 'chaldean']).default('pythagorean')
})

// Validation helper functions
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean
  data?: T
  errors?: Record<string, string[]>
} => {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(err.message)
      })
      return { success: false, errors }
    }
    return { success: false, errors: { general: ['Validation failed'] } }
  }
}

export const validateField = <T>(schema: z.ZodSchema<T>, value: unknown): {
  success: boolean
  error?: string
} => {
  try {
    schema.parse(value)
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message }
    }
    return { success: false, error: 'Validation failed' }
  }
}

// Real-time validation hook
export const useFormValidation = <T>(schema: z.ZodSchema<T>) => {
  const [errors, setErrors] = React.useState<Record<string, string[]>>({})
  const [isValid, setIsValid] = React.useState(false)

  const validate = (data: unknown) => {
    const result = validateForm(schema, data)
    setErrors(result.errors || {})
    setIsValid(result.success)
    return result
  }

  const validateField = (field: string, value: unknown, data: unknown) => {
    try {
      // Validate the entire form with just this field updated
      const currentData = { ...(data as Record<string, unknown>), [field]: value }
      const result = validateForm(schema, currentData)
      
      if (result.success) {
        setErrors(prev => ({ ...prev, [field]: [] }))
        return { success: true }
      } else {
        const fieldError = result.errors?.[field]
        setErrors(prev => ({ ...prev, [field]: fieldError || ['Invalid'] }))
        return { success: false, error: fieldError?.[0] || 'Invalid' }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: [error.errors[0]?.message || 'Invalid'] }))
        return { success: false, error: error.errors[0]?.message }
      }
    }
    return { success: false, error: 'Validation failed' }
  }

  return {
    errors,
    isValid,
    validate,
    validateField,
    clearErrors: () => setErrors({})
  }
}

// Import React for the hook
import React from 'react'
