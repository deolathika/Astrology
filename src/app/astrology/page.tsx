'use client'

import React from 'react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import AdvancedAstrologySystem from '@/components/astrology/AdvancedAstrologySystem'

export default function AstrologyPage() {
  return (
    <div className="min-h-screen relative main-content">
      <StarfieldBackground />
      <Navigation />

      <main className="relative z-10 pt-16">
        <AdvancedAstrologySystem />
      </main>
    </div>
  )
}