'use client'

export const VercelAnalytics = () => {
  return null
}

export const trackEvent = (name: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', name, properties)
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', 'page_view', { url })
  }
}
