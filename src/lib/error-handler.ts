import { NextResponse } from 'next/server'

// Custom error classes
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
    public code?: string
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400, true, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, true, 'AUTHENTICATION_ERROR')
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, true, 'AUTHORIZATION_ERROR')
    this.name = 'AuthorizationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, true, 'NOT_FOUND_ERROR')
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409, true, 'CONFLICT_ERROR')
    this.name = 'ConflictError'
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, true, 'RATE_LIMIT_ERROR')
    this.name = 'RateLimitError'
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, true, 'DATABASE_ERROR')
    this.name = 'DatabaseError'
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = 'External service unavailable') {
    super(message, 502, true, 'EXTERNAL_SERVICE_ERROR')
    this.name = 'ExternalServiceError'
  }
}

// Error handling utilities
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error)
  
  // Handle known error types
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        statusCode: error.statusCode,
        isOperational: error.isOperational,
        timestamp: new Date().toISOString(),
      },
      { status: error.statusCode }
    )
  }
  
  // Handle Prisma errors
  if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
    return handlePrismaError(error)
  }
  
  // Handle validation errors
  if (error instanceof Error && error.name === 'ZodError') {
    return NextResponse.json(
      {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    )
  }
  
  // Handle unknown errors
  return NextResponse.json(
    {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
      isOperational: false,
      timestamp: new Date().toISOString(),
    },
    { status: 500 }
  )
}

// Prisma error handler
function handlePrismaError(error: any): NextResponse {
  const { code, meta } = error
  
  switch (code) {
    case 'P2002': // Unique constraint violation
      return NextResponse.json(
        {
          error: 'Resource already exists',
          code: 'UNIQUE_CONSTRAINT_ERROR',
          field: meta?.target?.[0],
          timestamp: new Date().toISOString(),
        },
        { status: 409 }
      )
    
    case 'P2025': // Record not found
      return NextResponse.json(
        {
          error: 'Record not found',
          code: 'RECORD_NOT_FOUND_ERROR',
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      )
    
    case 'P2003': // Foreign key constraint violation
      return NextResponse.json(
        {
          error: 'Invalid reference',
          code: 'FOREIGN_KEY_ERROR',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    
    case 'P2014': // Required relation violation
      return NextResponse.json(
        {
          error: 'Required relation missing',
          code: 'RELATION_ERROR',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    
    default:
      return NextResponse.json(
        {
          error: 'Database operation failed',
          code: 'DATABASE_ERROR',
          details: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      )
  }
}

// Error logging
export function logError(error: unknown, context?: Record<string, any>) {
  const errorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    name: error instanceof Error ? error.name : 'Unknown',
    context,
    timestamp: new Date().toISOString(),
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorInfo)
  }
  
  // In production, you would send to external logging service
  // Example: Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement production logging
    console.error('Production error:', errorInfo)
  }
}

// Error recovery utilities
export function isOperationalError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.isOperational
  }
  return false
}

export function shouldRestart(error: unknown): boolean {
  if (error instanceof Error) {
    const restartSignals = [
      'ECONNRESET',
      'ECONNREFUSED',
      'ENOTFOUND',
      'ETIMEDOUT',
    ]
    
    return restartSignals.some(signal => error.message.includes(signal))
  }
  
  return false
}

// Error monitoring
export class ErrorMonitor {
  private static instance: ErrorMonitor
  private errorCounts: Map<string, number> = new Map()
  private errorThresholds: Map<string, number> = new Map()
  
  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor()
    }
    return ErrorMonitor.instance
  }
  
  recordError(error: AppError) {
    const key = `${error.name}:${error.statusCode}`
    const count = this.errorCounts.get(key) || 0
    this.errorCounts.set(key, count + 1)
    
    // Check if error threshold exceeded
    const threshold = this.errorThresholds.get(key) || 10
    if (count + 1 >= threshold) {
      this.handleThresholdExceeded(key, count + 1)
    }
  }
  
  setThreshold(errorType: string, threshold: number) {
    this.errorThresholds.set(errorType, threshold)
  }
  
  getErrorStats() {
    return {
      counts: Object.fromEntries(this.errorCounts),
      thresholds: Object.fromEntries(this.errorThresholds),
    }
  }
  
  private handleThresholdExceeded(errorType: string, count: number) {
    console.warn(`Error threshold exceeded for ${errorType}: ${count} occurrences`)
    // TODO: Implement alerting (email, Slack, etc.)
  }
}

// Global error handler for unhandled rejections
export function setupGlobalErrorHandlers() {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
    logError(reason, { type: 'unhandledRejection' })
  })
  
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
    logError(error, { type: 'uncaughtException' })
    
    // Exit process after logging
    process.exit(1)
  })
}

// Error response helpers
export function createErrorResponse(
  message: string,
  statusCode: number = 500,
  code?: string
): NextResponse {
  return NextResponse.json(
    {
      error: message,
      code,
      statusCode,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  )
}

export function createSuccessResponse(data: any, message?: string): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}

// Validation error helpers
export function createValidationErrorResponse(
  errors: Record<string, string[]>
): NextResponse {
  return NextResponse.json(
    {
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors,
      timestamp: new Date().toISOString(),
    },
    { status: 400 }
  )
}

// Rate limiting error response
export function createRateLimitResponse(
  retryAfter?: number
): NextResponse {
  const response = NextResponse.json(
    {
      error: 'Rate limit exceeded',
      code: 'RATE_LIMIT_ERROR',
      timestamp: new Date().toISOString(),
    },
    { status: 429 }
  )
  
  if (retryAfter) {
    response.headers.set('Retry-After', retryAfter.toString())
  }
  
  return response
}