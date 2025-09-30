'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LoadingScreen } from '@/components/loading-screen'
import { OptimizedErrorBoundary } from '@/components/optimized-error-boundary'

function SimpleHomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    // Set up test data for development
    const testUserData = {
      fullName: 'Test User',
      email: 'test@example.com',
      birthDate: '1990-01-01',
      birthTime: '12:00',
      birthPlace: 'New York, NY',
      latitude: 40.7128,
      longitude: -74.0060,
      timezone: 'America/New_York',
      zodiacSign: 'Capricorn',
      system: 'western',
      language: 'en'
    }
    
    localStorage.setItem('userData', JSON.stringify(testUserData))
    localStorage.setItem('onboardingComplete', 'true')
    setUserProfile(testUserData)

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <OptimizedErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-deep-space flex items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-cosmic-gradient-text mb-4">
              Welcome to Daily Secrets!
            </h1>
            <p className="text-stellar-gray-light mb-6">
              Hello, {userProfile?.fullName || 'User'}!
            </p>
            <div className="space-y-4">
              <div className="bg-cosmic-navy/30 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-stellar-yellow mb-2">Your Profile</h2>
                <p className="text-stellar-gray-light">Birth Date: {userProfile?.birthDate}</p>
                <p className="text-stellar-gray-light">Zodiac Sign: {userProfile?.zodiacSign}</p>
                <p className="text-stellar-gray-light">System: {userProfile?.system}</p>
              </div>
              <div className="bg-cosmic-navy/30 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-stellar-yellow mb-2">Features</h2>
                <p className="text-stellar-gray-light">✅ Astrology Readings</p>
                <p className="text-stellar-gray-light">✅ Numerology Analysis</p>
                <p className="text-stellar-gray-light">✅ Daily Guidance</p>
                <p className="text-stellar-gray-light">✅ Cosmic Navigation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </OptimizedErrorBoundary>
  )
}

export default SimpleHomePage

