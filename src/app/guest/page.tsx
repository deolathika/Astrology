/**
 * Guest User Landing Page
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Minimalist UI for guest users with essential daily guidance
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import Input from '@/components/readdy/Input'
import { Sparkles, Star, Moon, Heart, ArrowRight, Crown, Zap } from 'lucide-react'

export default function GuestPage() {
  const router = useRouter()
  const [birthData, setBirthData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: 0,
    longitude: 0
  })
  const [dailyInsights, setDailyInsights] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load daily insights for guest user
    loadDailyInsights()
  }, [])

  const loadDailyInsights = async () => {
    try {
      setLoading(true)
      // Load basic daily insights without authentication
      const response = await fetch('/api/guest/daily-insights')
      const data = await response.json()
      setDailyInsights(data)
    } catch (error) {
      console.error('Error loading daily insights:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = () => {
    router.push('/auth/signup')
  }

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  const handleUpgrade = () => {
    router.push('/subscription')
  }

  return (
    <div variant="nebula" size="lg" background="nebula">
      <div className="cosmic-container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold cosmic-text-gradient mb-4 cosmic-animate-fade-in">
            Daily Secrets
          </h1>
          <p className="text-xl text-cosmic-text-secondary cosmic-animate-slide-up">
            Discover your cosmic destiny with personalized astrology and numerology
          </p>
        </div>

        {/* Daily Insights */}
        {dailyInsights && (
          <Card variant="glass" size="lg" className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-cosmic-gold mb-2">
                Today's Cosmic Guidance
              </h2>
              <p className="text-cosmic-text-secondary">
                Your personalized daily insights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-cosmic-gold" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                  Astrology
                </h3>
                <p className="text-sm text-cosmic-text-secondary">
                  {dailyInsights.astrology || 'Your daily astrological insights will appear here.'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-cosmic-blue" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-blue mb-2">
                  Numerology
                </h3>
                <p className="text-sm text-cosmic-text-secondary">
                  {dailyInsights.numerology || 'Your daily numerology insights will appear here.'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cosmic-silver/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-cosmic-silver" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-silver mb-2">
                  Guidance
                </h3>
                <p className="text-sm text-cosmic-text-secondary">
                  {dailyInsights.guidance || 'Your daily cosmic guidance will appear here.'}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Birth Information Form */}
        <Card variant="default" size="lg" className="mb-8">
          <h2 className="text-2xl font-semibold text-cosmic-gold mb-6 text-center">
            Get Your Personalized Reading
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              variant="default"
              size="md"
              label="Full Name"
              placeholder="Enter your full name"
              value={birthData.name}
              onChange={(e) => setBirthData({ ...birthData, name: e.target.value })}
            />
            
            <Input
              variant="default"
              size="md"
              label="Birth Date"
              type="date"
              value={birthData.birthDate}
              onChange={(e) => setBirthData({ ...birthData, birthDate: e.target.value })}
            />
            
            <Input
              variant="default"
              size="md"
              label="Birth Time"
              type="time"
              value={birthData.birthTime}
              onChange={(e) => setBirthData({ ...birthData, birthTime: e.target.value })}
            />
            
            <Input
              variant="default"
              size="md"
              label="Birth Place"
              placeholder="Enter your birth city"
              value={birthData.birthPlace}
              onChange={(e) => setBirthData({ ...birthData, birthPlace: e.target.value })}
            />
          </div>
          
          <div className="text-center mt-6">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSignUp}
              className="mr-4"
            >
              Get Free Reading
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        </Card>

        {/* Premium Features Teaser */}
        <Card variant="premium" size="lg" className="mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-cosmic-gold mb-4">
              Unlock Your Cosmic Potential
            </h2>
            <p className="text-cosmic-text-secondary mb-8">
              Get unlimited access to advanced astrology, numerology, and cosmic guidance
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-cosmic-gold" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                  Premium Dashboard
                </h3>
                <p className="text-sm text-cosmic-text-secondary">
                  Personalized cosmic command center
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-cosmic-blue" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-blue mb-2">
                  AI Dream Analysis
                </h3>
                <p className="text-sm text-cosmic-text-secondary">
                  Unlock the secrets of your dreams
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cosmic-silver/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-cosmic-silver" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-silver mb-2">
                  Full Compatibility
                </h3>
                <p className="text-sm text-cosmic-text-secondary">
                  Detailed relationship insights
                </p>
              </div>
            </div>
            
            <Button
              variant="premium"
              size="lg"
              onClick={handleUpgrade}
            >
              Upgrade to Premium
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-cosmic-text-muted">
            ✨ Start your cosmic journey today ✨
          </p>
        </div>
      </div>
    </div>
  )
}

