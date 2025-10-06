'use client'

import React from 'react'
import AdvancedDreamAnalysis from '@/components/features/AdvancedDreamAnalysis'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

export default function DreamAnalysisPage() {
  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation />
      
      <main className="relative z-10 pt-16">
        <AdvancedDreamAnalysis />
      </main>
    </div>
  )
}
