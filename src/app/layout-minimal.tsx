/**
 * Root Layout - Backup
 * Minimal layout for testing
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daily Secrets - Your Personal Journey',
  description: 'Discover your secrets with personalized astrology, numerology, and dream analysis. Your journey to self-discovery starts here.',
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
        <meta name="theme-color" content="#7B4FFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} h-full text-white antialiased`}>
        <div className="min-h-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
