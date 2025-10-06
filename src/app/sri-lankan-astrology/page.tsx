'use client'

import React from 'react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import SriLankanHoroscopeChart from '@/components/astrology/SriLankanHoroscopeChart'

export default function SriLankanAstrologyPage() {
  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation />

      <main className="relative z-10 pt-16">
        <SriLankanHoroscopeChart />
      </main>
    </div>
  )
}
