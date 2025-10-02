'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TestOnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    // Test the onboarding flow
    console.log('Testing onboarding flow...')
    
    // Clear any existing onboarding data
    localStorage.removeItem('onboardingComplete')
    
    // Redirect to onboarding
    router.push('/onboarding')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-slate-600">Testing onboarding flow...</p>
        <p className="text-sm text-slate-500 mt-2">Redirecting to onboarding...</p>
      </div>
    </div>
  )
}
