'use client'

import React from 'react'
import CosmicCompatibilityCalculator from '@/components/features/CosmicCompatibilityCalculator'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

export default function CompatibilityCalculatorPage() {
  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation />
      
      <main className="relative z-10 pt-16">
        <CosmicCompatibilityCalculator />
      </main>
    </div>
  )
}
