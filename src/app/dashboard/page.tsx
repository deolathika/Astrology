/**
 * Free User Dashboard
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Dashboard for free users with basic features and upgrade prompts
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import { FeatureGate } from '@/components/user-flow/FeatureGate'
import { UserFlowRouter } from '@/components/user-flow/UserFlowRouter'
import { 
  Star, 
  Sparkles, 
  Moon, 
  Heart, 
  Users, 
  Crown, 
  Zap, 
  ArrowRight,
  Calendar,
  TrendingUp,
  MessageCircle
} from 'lucide-react'

export default function FreeUserDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [dailyInsights, setDailyInsights] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      loadDailyInsights()
    }
  }, [session])

  const loadDailyInsights = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/daily-insights')
      const data = await response.json()
      setDailyInsights(data)
    } catch (error) {
      console.error('Error loading daily insights:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = () => {
    router.push('/subscription')
  }

  const handleFeatureClick = (feature: string) => {
    if (feature === 'premium') {
      router.push('/subscription')
    } else {
      router.push(`/${feature}`)
    }
  }

  return (
    <UserFlowRouter>
      <div variant="nebula" size="lg" background="nebula">
        <div className="cosmic-container max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold cosmic-text-gradient mb-2">
              Welcome back, {session?.user?.name || 'Cosmic Soul'}!
            </h1>
            <p className="text-cosmic-text-secondary">
              Your personalized cosmic dashboard
            </p>
          </div>

          {/* Daily Insights */}
          <Card variant="glass" size="lg" className="mb-8">
            <h2 className="text-2xl font-semibold text-cosmic-gold mb-6">
              Today's Cosmic Insights
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-cosmic-gold/30 border-t-cosmic-gold rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-cosmic-text-secondary">Loading your cosmic insights...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                    Astrology
                  </h3>
                  <p className="text-sm text-cosmic-text-secondary">
                    {dailyInsights?.astrology || 'Your daily astrological insights will appear here.'}
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
                    {dailyInsights?.numerology || 'Your daily numerology insights will appear here.'}
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
                    {dailyInsights?.guidance || 'Your daily cosmic guidance will appear here.'}
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Basic Features */}
            <Card variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('numerology')}>
                <div className="w-12 h-12 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-cosmic-gold" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                  Numerology
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  Discover your life path and destiny numbers
                </p>
                <Button variant="ghost" size="sm">
                  Explore
                </Button>
              </div>
            </Card>

            <Card variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('astrology')}>
                <div className="w-12 h-12 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-cosmic-blue" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-blue mb-2">
                  Astrology
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  Your personalized birth chart and insights
                </p>
                <Button variant="ghost" size="sm">
                  Explore
                </Button>
              </div>
            </Card>

            <Card variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('compatibility')}>
                <div className="w-12 h-12 bg-cosmic-silver/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-cosmic-silver" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-silver mb-2">
                  Compatibility
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  Basic relationship compatibility check
                </p>
                <Button variant="ghost" size="sm">
                  Explore
                </Button>
              </div>
            </Card>

            {/* Premium Features with Gates */}
            <FeatureGate feature="dreamAnalysis">
              <Card variant="premium" size="md" className="cursor-pointer hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="w-12 h-12 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Moon className="w-6 h-6 text-cosmic-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                    Dream Analysis
                  </h3>
                  <p className="text-sm text-cosmic-text-secondary mb-4">
                    AI-powered dream interpretation
                  </p>
                  <Button variant="premium" size="sm">
                    Unlock
                  </Button>
                </div>
              </Card>
            </FeatureGate>

            <FeatureGate feature="aiChat">
              <Card variant="premium" size="md" className="cursor-pointer hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="w-12 h-12 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-cosmic-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-blue mb-2">
                    AI Chat
                  </h3>
                  <p className="text-sm text-cosmic-text-secondary mb-4">
                    Unlimited cosmic guidance
                  </p>
                  <Button variant="premium" size="sm">
                    Unlock
                  </Button>
                </div>
              </Card>
            </FeatureGate>

            <FeatureGate feature="premiumDashboard">
              <Card variant="premium" size="md" className="cursor-pointer hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="w-12 h-12 bg-cosmic-silver/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6 text-cosmic-silver" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-silver mb-2">
                    Premium Dashboard
                  </h3>
                  <p className="text-sm text-cosmic-text-secondary mb-4">
                    Advanced insights and reports
                  </p>
                  <Button variant="premium" size="sm">
                    Unlock
                  </Button>
                </div>
              </Card>
            </FeatureGate>
          </div>

          {/* Upgrade Prompt */}
          <Card variant="premium" size="lg" className="text-center">
            <h2 className="text-2xl font-bold text-cosmic-gold mb-4">
              Ready to Unlock Your Full Cosmic Potential?
            </h2>
            <p className="text-cosmic-text-secondary mb-6">
              Get unlimited access to all premium features and advanced cosmic insights
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center text-sm text-cosmic-text-secondary">
                <Crown className="w-4 h-4 text-cosmic-gold mr-2" />
                Premium Dashboard
              </div>
              <div className="flex items-center text-sm text-cosmic-text-secondary">
                <Zap className="w-4 h-4 text-cosmic-gold mr-2" />
                AI Dream Analysis
              </div>
              <div className="flex items-center text-sm text-cosmic-text-secondary">
                <MessageCircle className="w-4 h-4 text-cosmic-gold mr-2" />
                Unlimited AI Chat
              </div>
              <div className="flex items-center text-sm text-cosmic-text-secondary">
                <Heart className="w-4 h-4 text-cosmic-gold mr-2" />
                Full Compatibility
              </div>
            </div>
            
            <Button
              variant="premium"
              size="lg"
              onClick={handleUpgrade}
            >
              Upgrade to Premium
            </Button>
          </Card>
        </div>
      </div>
    </UserFlowRouter>
  )
}