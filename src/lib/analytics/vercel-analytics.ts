import { Analytics } from '@vercel/analytics/react'

export const VercelAnalytics = () => {
  return <Analytics />
}

export const trackEvent = (name: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', name, properties)
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', 'page_view', { url })
  }
}

// Extend Window interface for Vercel Analytics
declare global {
  interface Window {
    va: (action: string, eventName: string, properties?: Record<string, any>) => void
  }
}
