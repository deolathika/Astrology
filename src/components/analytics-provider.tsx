'use client'

interface AnalyticsContextType {
  track: (event: string, properties?: Record<string, any>) => void
  identify: (userId: string, traits?: Record<string, any>) => void
  page: (name: string, properties?: Record<string, any>) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const track = (event: string, properties?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      }
    
    // Add your analytics tracking here (Google Analytics, Mixpanel, etc.)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties)
    }
  }

  const identify = (userId: string, traits?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      }
    
    // Add your user identification here
  }

  const page = (name: string, properties?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      }
    
    // Add your page tracking here
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID || '', {
        page_title: name,
        page_location: window.location.href,
        ...properties
      })
    }
  }

  useEffect(() => {
    // Initialize analytics
    if (typeof window !== 'undefined') {
      // Track page view
      page('Home', {
        app_name: 'Daily Secrets',
        app_version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'
      })
    }
  }, [])

  return (
    <AnalyticsContext.Provider value={{ track, identify, page }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
