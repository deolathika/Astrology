'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CosmicHomeScreen } from '@/components/cosmic-home-screen'
import { LoadingScreen } from '@/components/loading-screen'
import { useTranslation } from '@/components/translation-provider'
import { useUser } from '@/components/user-provider'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
  const { language, setLanguage } = useTranslation()
  const { user, loadUser } = useUser()

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('onboardingComplete')
    const profile = localStorage.getItem('userData')
    
    if (!onboardingComplete) {
      // Redirect to onboarding if not completed
      window.location.href = '/onboarding/signup'
      return
    }

    if (profile) {
      const parsedProfile = JSON.parse(profile)
      setUserProfile(parsedProfile)
      setLanguage(parsedProfile.language || 'en')
    }

    // Simulate loading time for cosmic journey
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Load user data
    loadUser()

    return () => clearTimeout(timer)
  }, [loadUser, setLanguage])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <CosmicHomeScreen 
          user={userProfile || user}
          language={language}
          onLanguageChange={setLanguage}
        />
      </motion.div>
    </AnimatePresence>
  )
}
