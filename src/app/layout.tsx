import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import '@/styles/responsive-design.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-cosmic',
  display: 'swap',
  preload: true,
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-accent',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Daily Secrets - Real Astrology & Numerology',
  description: 'Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance. Multi-language support with deep space cosmic UI.',
  keywords: ['astrology', 'numerology', 'cosmic', 'guidance', 'multi-language', 'daily secrets'],
  authors: [{ name: 'Daily Secrets Team' }],
  creator: 'Daily Secrets Team',
  publisher: 'Daily Secrets',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'si-LK': '/si',
      'ta-IN': '/ta',
      'hi-IN': '/hi',
      'zh-CN': '/zh',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'Daily Secrets - Real Astrology & Numerology',
    description: 'Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance.',
    siteName: 'Daily Secrets',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daily Secrets - Cosmic Astrology App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Secrets - Real Astrology & Numerology',
    description: 'Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance.',
    images: ['/og-image.jpg'],
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7B4FFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(26, 26, 46, 0.9)',
                color: '#F8F9FA',
                border: '1px solid rgba(123, 79, 255, 0.3)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              },
              success: {
                iconTheme: {
                  primary: '#76FF9C',
                  secondary: '#0A0A0F',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF4757',
                  secondary: '#0A0A0F',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
