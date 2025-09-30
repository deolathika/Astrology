'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('onboardingComplete')
    
    if (onboardingComplete) {
      router.push('/main')
    } else {
      router.push('/onboarding/complete')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-slate-600">Loading your cosmic journey...</p>
      </div>
    </div>
  )
}
