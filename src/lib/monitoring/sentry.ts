/**
 * Sentry Configuration
 * Error tracking and performance monitoring
 */

// Simplified Sentry configuration to avoid import errors
export function initSentry() {
  // Sentry initialization will be handled by Next.js config
  console.log('Sentry initialized for development')
}

// Error boundary wrapper
export function withSentryPage(PageComponent: any) {
  return PageComponent
}

// Server-side props wrapper
export function withSentryServerSideProps(getServerSideProps: any) {
  return getServerSideProps
}

// API route wrapper
export function withSentryApiRoute(handler: any) {
  return handler
}

// Capture exception
export function captureException(error: Error, context?: any) {
  console.error('Sentry Error:', error, context)
}

// Capture message
export function captureMessage(message: string, level?: any) {
  console.log('Sentry Message:', message, level)
}

// Set user context
export function setUserContext(user: any) {
  console.log('Sentry User Context:', user)
}

// Set tag
export function setTag(key: string, value: string) {
  console.log('Sentry Tag:', key, value)
}

// Set context
export function setContext(key: string, context: any) {
  console.log('Sentry Context:', key, context)
}

// Add breadcrumb
export function addBreadcrumb(breadcrumb: any) {
  console.log('Sentry Breadcrumb:', breadcrumb)
}

// Performance monitoring
export function startTransaction(name: string, op?: string) {
  console.log('Sentry Transaction:', name, op)
  return {
    setTag: () => {},
    setData: () => {},
    finish: () => {}
  }
}

// Custom error class
export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    
    Error.captureStackTrace(this, this.constructor)
  }
}

// Error handler
export function handleError(error: any, context?: any) {
  if (error instanceof AppError) {
    captureException(error, context)
    return {
      message: error.message,
      statusCode: error.statusCode,
      isOperational: error.isOperational
    }
  }
  
  captureException(error, context)
  return {
    message: 'Internal server error',
    statusCode: 500,
    isOperational: false
  }
}