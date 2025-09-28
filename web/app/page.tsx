'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, Moon, Sun, Zap, Heart } from 'lucide-react'
import CitySearch from '@/components/CitySearch'
import AstrologyChart from '@/components/AstrologyChart'
import NumerologyProfile from '@/components/NumerologyProfile'
import DailyGuidance from '@/components/DailyGuidance'

interface UserProfile {
  fullName: string
  birthDate: string
  birthTime: string
  birthPlace: string
  latitude: number
  longitude: number
  timezone: string
}

export default function HomePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [step, setStep] = useState<'onboarding' | 'chart' | 'guidance'>('onboarding')
  const [isLoading, setIsLoading] = useState(false)

  const handleProfileSubmit = async (profile: UserProfile) => {
    setIsLoading(true)
    setUserProfile(profile)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setStep('chart')
    setIsLoading(false)
  }

  const handleChartComplete = () => {
    setStep('guidance')
  }

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Header */}
      <header className="relative z-20 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-cosmic-gradient rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold cosmic-text">Daily Secrets</h1>
              <p className="text-white/70 text-sm">Real Astrology & Numerology</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-aurora-green rounded-full animate-pulse"></div>
            <span className="text-sm text-white/70">Cosmic Energy Active</span>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        {step === 'onboarding' && (
          <OnboardingStep onSubmit={handleProfileSubmit} isLoading={isLoading} />
        )}
        
        {step === 'chart' && userProfile && (
          <ChartStep 
            profile={userProfile} 
            onComplete={handleChartComplete}
            isLoading={isLoading}
          />
        )}
        
        {step === 'guidance' && userProfile && (
          <GuidanceStep profile={userProfile} />
        )}
      </main>

      {/* Floating Cosmic Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-electric-violet/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Onboarding Step Component
function OnboardingStep({ 
  onSubmit, 
  isLoading 
}: { 
  onSubmit: (profile: UserProfile) => void
  isLoading: boolean 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: 0,
    longitude: 0,
    timezone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-cosmic-gradient rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <Star className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-4xl font-bold cosmic-text mb-4">
          Discover Your Cosmic Profile
        </h2>
        <p className="text-white/70 text-lg">
          Enter your birth details to unlock real astrology and numerology insights
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="cosmic-card">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="cosmic-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Birth Date *
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="cosmic-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Birth Time (Optional)
                </label>
                <input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                  className="cosmic-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Birth Place *
              </label>
              <CitySearch
                onLocationSelect={(location) => {
                  setFormData({
                    ...formData,
                    birthPlace: location.city,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    timezone: location.timezone
                  })
                }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full cosmic-button disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Calculating Your Cosmic Profile...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Calculate My Chart</span>
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

// Chart Step Component
function ChartStep({ 
  profile, 
  onComplete, 
  isLoading 
}: { 
  profile: UserProfile
  onComplete: () => void
  isLoading: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold cosmic-text mb-4">
          Your Cosmic Analysis
        </h2>
        <p className="text-white/70">
          Real astrology and numerology calculations for {profile.fullName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AstrologyChart profile={profile} />
        <NumerologyProfile profile={profile} />
      </div>

      <div className="text-center mt-8">
        <motion.button
          onClick={onComplete}
          className="cosmic-button px-8 py-4 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>Get Daily Guidance</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  )
}

// Guidance Step Component
function GuidanceStep({ profile }: { profile: UserProfile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <DailyGuidance profile={profile} />
    </motion.div>
  )
}
