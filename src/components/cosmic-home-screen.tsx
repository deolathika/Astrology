'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Users, 
  Heart, 
  Moon, 
  Settings,
  Translate,
  Sparkles,
  Zap,
  Calculator,
  User
} from 'lucide-react'
import { TranslationBar } from './translation-bar'
import { CosmicHeader } from './cosmic-header'
import { DailyGuidance } from './daily-guidance'
import { CosmicProfile } from './cosmic-profile'
import { ZodiacSystems } from './zodiac-systems'
import { NumerologySection } from './numerology-section'
import { QuickActions } from './quick-actions'
import { CosmicNavigation } from './cosmic-navigation'
import { TodaysSecretCard } from './todays-secret-card'
import { LuckyTrioCard } from './lucky-trio-card'
import { DayRulesCard } from './day-rules-card'

interface User {
  id?: string
  fullName?: string
  email?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  latitude?: number
  longitude?: number
  timezone?: string
}

interface CosmicHomeScreenProps {
  user?: User | null
  language: string
  onLanguageChange: (language: string) => void
}

export function CosmicHomeScreen({ 
  user, 
  language, 
  onLanguageChange 
}: CosmicHomeScreenProps) {
  const [currentLanguage, setCurrentLanguage] = useState(language)

  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage)
    onLanguageChange(newLanguage)
  }

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      
      {/* Cosmic pattern overlay */}
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        {/* Translation Bar */}
        <TranslationBar 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-6 space-y-6"
        >
          {/* Cosmic Header */}
          <CosmicHeader user={user} />

          {/* Today's Secret - Main Feature */}
          <TodaysSecretCard user={user} />

          {/* Lucky Trio */}
          <LuckyTrioCard user={user} />

          {/* Day Rules */}
          <DayRulesCard user={user} />

          {/* Daily Guidance */}
          <DailyGuidance />

          {/* Cosmic Profile */}
          <CosmicProfile user={user} />

          {/* Zodiac Systems */}
          <ZodiacSystems />

          {/* Numerology Section */}
          <NumerologySection />

          {/* Quick Actions */}
          <QuickActions />

          {/* Bottom spacing for navigation */}
          <div className="h-24" />
        </motion.div>

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
