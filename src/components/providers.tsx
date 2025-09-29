'use client'

import { ReactNode } from 'react'
import { TranslationProvider } from './translation-provider'
import { UserProvider } from './user-provider'
import { ThemeProvider } from './theme-provider'
import { AnalyticsProvider } from './analytics-provider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <UserProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </UserProvider>
      </TranslationProvider>
    </ThemeProvider>
  )
}
