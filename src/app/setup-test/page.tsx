'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SetupTestPage() {
  useEffect(() => {
    // Set up test data in localStorage
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
    
    // Redirect to home page
    window.location.href = '/'
  }, [])

  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-electric-violet/20"></div>
          <div className="absolute inset-2 rounded-full border-4 border-supernova-gold/30"></div>
          <div className="absolute inset-4 flex items-center justify-center">
            <div className="w-8 h-8 text-electric-violet animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
          Setting up test data...
        </h2>
        <p className="text-stellar-gray-light">
          Redirecting to main application...
        </p>
      </motion.div>
    </div>
  )
}
