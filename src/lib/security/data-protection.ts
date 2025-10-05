/**
 * Data Protection and PII Masking
 * Implements data sanitization and PII protection
 */

import { NextRequest, NextResponse } from 'next/server'

interface PIIField {
  field: string
  mask: (value: any) => string
  required: boolean
}

interface DataProtectionConfig {
  maskEmail: boolean
  maskPhone: boolean
  maskSSN: boolean
  maskCreditCard: boolean
  maskIP: boolean
  allowedRoles: string[]
}

const defaultConfig: DataProtectionConfig = {
  maskEmail: true,
  maskPhone: true,
  maskSSN: true,
  maskCreditCard: true,
  maskIP: true,
  allowedRoles: ['admin']
}

export class DataProtector {
  private config: DataProtectionConfig

  constructor(config: Partial<DataProtectionConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
  }

  /**
   * Mask email address
   */
  maskEmail(email: string): string {
    if (!email || !this.config.maskEmail) return email
    
    const [local, domain] = email.split('@')
    if (!local || !domain) return email
    
    const maskedLocal = local.length > 2 
      ? `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}`
      : local
    
    return `${maskedLocal}@${domain}`
  }

  /**
   * Mask phone number
   */
  maskPhone(phone: string): string {
    if (!phone || !this.config.maskPhone) return phone
    
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 4) return phone
    
    const lastFour = digits.slice(-4)
    const masked = '*'.repeat(digits.length - 4)
    
    return `${masked}${lastFour}`
  }

  /**
   * Mask SSN
   */
  maskSSN(ssn: string): string {
    if (!ssn || !this.config.maskSSN) return ssn
    
    const digits = ssn.replace(/\D/g, '')
    if (digits.length !== 9) return ssn
    
    return `***-**-${digits.slice(-4)}`
  }

  /**
   * Mask credit card number
   */
  maskCreditCard(card: string): string {
    if (!card || !this.config.maskCreditCard) return card
    
    const digits = card.replace(/\D/g, '')
    if (digits.length < 4) return card
    
    const lastFour = digits.slice(-4)
    const masked = '*'.repeat(digits.length - 4)
    
    return `${masked}${lastFour}`
  }

  /**
   * Mask IP address
   */
  maskIP(ip: string): string {
    if (!ip || !this.config.maskIP) return ip
    
    const parts = ip.split('.')
    if (parts.length !== 4) return ip
    
    return `${parts[0]}.${parts[1]}.xxx.xxx`
  }

  /**
   * Mask user data based on role
   */
  maskUserData(userData: any, viewerRole: string, isOwnData: boolean = false): any {
    // Admin can see all data
    if (this.config.allowedRoles.includes(viewerRole)) {
      return userData
    }

    // Users can see their own data
    if (isOwnData) {
      return userData
    }

    // Mask sensitive fields for other users
    const masked = { ...userData }

    if (masked.email) {
      masked.email = this.maskEmail(masked.email)
    }

    if (masked.phone) {
      masked.phone = this.maskPhone(masked.phone)
    }

    if (masked.ssn) {
      masked.ssn = this.maskSSN(masked.ssn)
    }

    if (masked.creditCard) {
      masked.creditCard = this.maskCreditCard(masked.creditCard)
    }

    if (masked.ip) {
      masked.ip = this.maskIP(masked.ip)
    }

    // Remove sensitive fields entirely
    delete masked.password
    delete masked.passwordHash
    delete masked.twoFactorSecret
    delete masked.refreshToken
    delete masked.accessToken

    return masked
  }

  /**
   * Sanitize request data
   */
  sanitizeRequestData(data: any): any {
    if (!data || typeof data !== 'object') return data

    const sanitized = { ...data }

    // Remove potentially dangerous fields
    const dangerousFields = [
      'password', 'passwordHash', 'token', 'secret', 'key',
      'ssn', 'creditCard', 'bankAccount', 'routingNumber'
    ]

    dangerousFields.forEach(field => {
      if (sanitized[field]) {
        delete sanitized[field]
      }
    })

    // Sanitize string fields
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = this.sanitizeString(sanitized[key])
      }
    })

    return sanitized
  }

  /**
   * Sanitize string input
   */
  sanitizeString(input: string): string {
    if (!input) return input

    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim()
  }

  /**
   * Validate data access permissions
   */
  validateDataAccess(
    requestUserId: string,
    targetUserId: string,
    viewerRole: string,
    dataType: 'profile' | 'admin' | 'sensitive'
  ): { allowed: boolean; reason?: string } {
    // Admin can access all data
    if (this.config.allowedRoles.includes(viewerRole)) {
      return { allowed: true }
    }

    // Users can access their own data
    if (requestUserId === targetUserId) {
      return { allowed: true }
    }

    // Check data type permissions
    switch (dataType) {
      case 'profile':
        return { allowed: true } // Public profile data
      case 'admin':
        return { allowed: false, reason: 'Admin access required' }
      case 'sensitive':
        return { allowed: false, reason: 'Sensitive data access denied' }
      default:
        return { allowed: false, reason: 'Unknown data type' }
    }
  }
}

// Export singleton instance
export const dataProtector = new DataProtector()

/**
 * Middleware to protect sensitive data in API responses
 */
export function withDataProtection(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: { 
    dataType: 'profile' | 'admin' | 'sensitive'
    requireOwnership?: boolean
  }
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const response = await handler(request)
    
    // Get user role from request (implement based on your auth system)
    const userRole = request.headers.get('x-user-role') || 'user'
    const userId = request.headers.get('x-user-id') || ''
    
    // Parse response data
    const data = await response.json()
    
    // Apply data protection
    if (data && typeof data === 'object') {
      const protectedData = dataProtector.maskUserData(
        data,
        userRole,
        options.requireOwnership || false
      )
      
      return NextResponse.json(protectedData, {
        status: response.status,
        headers: response.headers
      })
    }
    
    return response
  }
}

/**
 * Audit logging for data access
 */
export function logDataAccess(
  userId: string,
  action: string,
  dataType: string,
  targetUserId?: string
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    userId,
    action,
    dataType,
    targetUserId,
    ip: 'unknown', // Implement IP extraction
    userAgent: 'unknown' // Implement user agent extraction
  }
  
  // In production, send to logging service
  console.log('DATA_ACCESS_AUDIT:', JSON.stringify(logEntry))
}

/**
 * Get data protection status
 */
export function getDataProtectionStatus(): {
  config: DataProtectionConfig
  activeProtections: string[]
} {
  const activeProtections = []
  
  if (defaultConfig.maskEmail) activeProtections.push('email-masking')
  if (defaultConfig.maskPhone) activeProtections.push('phone-masking')
  if (defaultConfig.maskSSN) activeProtections.push('ssn-masking')
  if (defaultConfig.maskCreditCard) activeProtections.push('credit-card-masking')
  if (defaultConfig.maskIP) activeProtections.push('ip-masking')
  
  return {
    config: defaultConfig,
    activeProtections
  }
}
