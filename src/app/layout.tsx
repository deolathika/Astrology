/**
 * Root Layout
 * Main layout component with providers and global styles
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryProvider } from '@/lib/providers/query-provider'
import { AuthProvider } from '@/lib/contexts/auth-context'
import { ThemeProvider } from '@/lib/theme-provider'
import { SessionProviderWrapper } from '@/components/providers/SessionProviderWrapper'
import { Analytics } from '@/lib/monitoring/analytics'
import { initSentry } from '@/lib/monitoring/sentry'
import './globals.css'

// Initialize Sentry
initSentry()

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daily Secrets - Your Personal Journey',
  description: 'Discover your secrets with personalized astrology, numerology, and dream analysis. Your journey to self-discovery starts here.',
  keywords: ['astrology', 'numerology', 'dreams', 'personal', 'journey', 'insights'],
  authors: [{ name: 'Daily Secrets Team' }],
  creator: 'Daily Secrets',
  publisher: 'Daily Secrets',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://daily-secrets.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://daily-secrets.app',
    title: 'Daily Secrets - Your Personal Journey',
    description: 'Discover your secrets with personalized astrology, numerology, and dream analysis.',
    siteName: 'Daily Secrets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Secrets - Your Personal Journey',
    description: 'Discover your secrets with personalized astrology, numerology, and dream analysis.',
    creator: '@dailysecrets',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7B4FFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Daily Secrets" />
      </head>
          <body className={`${inter.className} h-full text-white antialiased`}>
            <SessionProviderWrapper>
              <QueryProvider>
                <AuthProvider>
                  <ThemeProvider>
                    <div className="min-h-full flex flex-col">
                      {children}
                    </div>
                  </ThemeProvider>
                </AuthProvider>
              </QueryProvider>
            </SessionProviderWrapper>
            <Analytics />
          </body>
    </html>
  )
}