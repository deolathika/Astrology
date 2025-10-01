import { z } from 'zod'

// Common validation schemas
export const emailSchema = z.string().email('Invalid email format')
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters')
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long')
export const phoneSchema = z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format')

// API request validation
export const profileIdSchema = z.string().uuid('Invalid profile ID format')
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
export const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')

// Location validation
export const latitudeSchema = z.number().min(-90).max(90, 'Invalid latitude')
export const longitudeSchema = z.number().min(-180).max(180, 'Invalid longitude')
export const timezoneSchema = z.string().min(1, 'Timezone is required')

// Birth data validation
export const birthDataSchema = z.object({
  fullName: nameSchema,
  birthDate: dateSchema,
  birthTime: timeSchema,
  birthPlace: z.string().min(1, 'Birth place is required'),
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  timezone: timezoneSchema
})

// API response validation
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  meta: z.object({
    schemaVersion: z.string().optional(),
    timestamp: z.string().optional()
  }).optional()
})

// Rate limiting validation
export const rateLimitSchema = z.object({
  remaining: z.number().min(0),
  resetTime: z.number(),
  limit: z.number()
})

// CSRF token validation
export const csrfTokenSchema = z.string().length(64, 'Invalid CSRF token format')

// Sanitization functions
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}

export function validateAndSanitize<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    return { success: false, error: 'Validation failed' }
  }
}

// SSRF protection - allowlist for external calls
export const allowedDomains = [
  'api.openai.com',
  'maps.googleapis.com',
  'timezoneapi.io',
  'api.astrologyapi.com',
  'swisseph.com'
]

export function validateExternalUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return allowedDomains.includes(parsedUrl.hostname)
  } catch {
    return false
  }
}


