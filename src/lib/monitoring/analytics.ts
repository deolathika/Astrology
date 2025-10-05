/**
 * Analytics Configuration
 * User behavior tracking and business metrics
 */

import { Analytics } from '@vercel/analytics/react'

// Analytics events
export const trackEvent = (name: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, properties)
  }
}

// User actions tracking
export const trackUserAction = (action: string, category: string, value?: number) => {
  trackEvent('user_action', {
    action,
    category,
    value
  })
}

// Page views tracking
export const trackPageView = (page: string, title?: string) => {
  trackEvent('page_view', {
    page,
    title
  })
}

// Feature usage tracking
export const trackFeatureUsage = (feature: string, userId?: string) => {
  trackEvent('feature_usage', {
    feature,
    user_id: userId
  })
}

// Conversion tracking
export const trackConversion = (conversion: string, value?: number) => {
  trackEvent('conversion', {
    conversion,
    value
  })
}

// Error tracking
export const trackError = (error: string, context?: Record<string, any>) => {
  trackEvent('error', {
    error,
    context
  })
}

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit: string = 'ms') => {
  trackEvent('performance', {
    metric,
    value,
    unit
  })
}

// Business metrics
export const trackBusinessMetric = (metric: string, value: number, tags?: Record<string, string>) => {
  trackEvent('business_metric', {
    metric,
    value,
    tags
  })
}

// User journey tracking
export const trackUserJourney = (step: string, userId?: string) => {
  trackEvent('user_journey', {
    step,
    user_id: userId
  })
}

// A/B testing
export const trackExperiment = (experiment: string, variant: string, userId?: string) => {
  trackEvent('experiment', {
    experiment,
    variant,
    user_id: userId
  })
}

// Custom dimensions
export const setCustomDimension = (dimension: string, value: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      custom_map: {
        [dimension]: value
      }
    })
  }
}

// E-commerce tracking
export const trackPurchase = (transactionId: string, value: number, currency: string = 'USD') => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value,
    currency
  })
}

// Subscription tracking
export const trackSubscription = (plan: string, value: number, userId?: string) => {
  trackEvent('subscription', {
    plan,
    value,
    user_id: userId
  })
}

// Engagement tracking
export const trackEngagement = (type: string, duration: number, userId?: string) => {
  trackEvent('engagement', {
    type,
    duration,
    user_id: userId
  })
}

// Export analytics components
export { Analytics }
