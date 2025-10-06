'use client'

import React from 'react'
import DailyInsightsDashboard from '@/components/features/DailyInsightsDashboard'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

export default function InsightsPage() {
  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation />
      
      <main className="relative z-10 pt-16">
        <DailyInsightsDashboard />
      </main>
    </div>
  )
}
