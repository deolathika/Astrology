import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-cosmic',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cosmic-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Daily Secrets - Real Astrology & Numerology',
  description: 'Discover your cosmic destiny with real astrology calculations and advanced numerology insights.',
  keywords: ['astrology', 'numerology', 'horoscope', 'cosmic', 'spiritual', 'guidance'],
  authors: [{ name: 'Daily Secrets Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#7B4FFF',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-cosmic bg-deep-space text-white antialiased">
        <div className="min-h-screen bg-deep-space bg-nebula-gradient">
          {/* Cosmic Background Effects */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-deep-space opacity-90"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-electric-violet/10 via-celestial-blue/5 to-supernova-gold/10 animate-nebula-shift"></div>
            {/* Floating Stars */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-star-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
