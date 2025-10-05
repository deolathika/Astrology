/**
 * Premium User Dashboard
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Full-featured dashboard for premium users with all unlocked features
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CosmicLayout, CosmicCard, CosmicButton } from '@/components/cosmic'
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
  MessageCircle,
  Download,
  Share2,
  BarChart3,
  Settings,
  FileText,
  Image
} from 'lucide-react'

export default function PremiumDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [premiumInsights, setPremiumInsights] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      loadPremiumInsights()
    }
  }, [session])

  const loadPremiumInsights = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/premium/insights')
      const data = await response.json()
      setPremiumInsights(data)
    } catch (error) {
      console.error('Error loading premium insights:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeatureClick = (feature: string) => {
    router.push(`/${feature}`)
  }

  const handleExportPDF = () => {
    // Handle PDF export
    router.push('/premium/export')
  }

  const handleCreateStory = () => {
    // Handle social story creation
    router.push('/premium/stories')
  }

  return (
    <UserFlowRouter>
      <CosmicLayout variant="nebula" size="lg" background="nebula">
        <div className="cosmic-container max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-cosmic-gold mr-3" />
              <h1 className="text-4xl font-bold cosmic-text-gradient">
                Premium Dashboard
              </h1>
            </div>
            <p className="text-cosmic-text-secondary">
              Welcome to your cosmic command center, {session?.user?.name || 'Cosmic Soul'}!
            </p>
          </div>

          {/* Premium Insights */}
          <CosmicCard variant="premium" size="lg" className="mb-8">
            <h2 className="text-2xl font-semibold text-cosmic-gold mb-6">
              Your Premium Cosmic Insights
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-cosmic-gold/30 border-t-cosmic-gold rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-cosmic-text-secondary">Loading your premium insights...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                    Advanced Astrology
                  </h3>
                  <p className="text-sm text-cosmic-text-secondary">
                    {premiumInsights?.astrology || 'Detailed astrological analysis with transits and aspects.'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-cosmic-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-blue mb-2">
                    Master Numerology
                  </h3>
                  <p className="text-sm text-cosmic-text-secondary">
                    {premiumInsights?.numerology || 'Complete numerology profile with master numbers and pinnacles.'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-cosmic-silver/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Moon className="w-8 h-8 text-cosmic-silver" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-silver mb-2">
                    Dream Analysis
                  </h3>
                  <p className="text-sm text-cosmic-text-secondary">
                    {premiumInsights?.dreams || 'AI-powered dream interpretation and symbolism analysis.'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                    Full Compatibility
                  </h3>
                  <p className="text-sm text-cosmic-text-secondary">
                    {premiumInsights?.compatibility || 'Detailed relationship compatibility reports.'}
                  </p>
                </div>
              </div>
            )}
          </CosmicCard>

          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Core Features */}
            <CosmicCard variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('numerology')}>
                <div className="w-12 h-12 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-cosmic-gold" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                  Advanced Numerology
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  Master numbers, pinnacles, and challenges
                </p>
                <CosmicButton variant="ghost" size="sm">
                  Explore
                </CosmicButton>
              </div>
            </CosmicCard>

            <CosmicCard variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('astrology')}>
                <div className="w-12 h-12 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-cosmic-blue" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-blue mb-2">
                  Complete Astrology
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  Birth charts, transits, and progressions
                </p>
                <CosmicButton variant="ghost" size="sm">
                  Explore
                </CosmicButton>
              </div>
            </CosmicCard>

            <CosmicCard variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('dreams')}>
                <div className="w-12 h-12 bg-cosmic-silver/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-6 h-6 text-cosmic-silver" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-silver mb-2">
                  Dream Analysis
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  AI-powered dream interpretation
                </p>
                <CosmicButton variant="ghost" size="sm">
                  Explore
                </CosmicButton>
              </div>
            </CosmicCard>

            <CosmicCard variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('ai-chat')}>
                <div className="w-12 h-12 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-cosmic-gold" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                  AI Cosmic Chat
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  Unlimited cosmic guidance
                </p>
                <CosmicButton variant="ghost" size="sm">
                  Explore
                </CosmicButton>
              </div>
            </CosmicCard>

            <CosmicCard variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('compatibility')}>
                <div className="w-12 h-12 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-cosmic-blue" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-blue mb-2">
                  Full Compatibility
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  Detailed relationship insights
                </p>
                <CosmicButton variant="ghost" size="sm">
                  Explore
                </CosmicButton>
              </div>
            </CosmicCard>

            <CosmicCard variant="default" size="md" className="cursor-pointer hover:scale-105 transition-transform">
              <div className="text-center" onClick={() => handleFeatureClick('community')}>
                <div className="w-12 h-12 bg-cosmic-silver/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-cosmic-silver" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-silver mb-2">
                  Cosmic Community
                </h3>
                <p className="text-sm text-cosmic-text-secondary mb-4">
                  Connect with like-minded souls
                </p>
                <CosmicButton variant="ghost" size="sm">
                  Explore
                </CosmicButton>
              </div>
            </CosmicCard>
          </div>

          {/* Premium Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CosmicCard variant="premium" size="lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-cosmic-gold" />
                </div>
                <h3 className="text-xl font-semibold text-cosmic-gold mb-2">
                  Personal Report Generator
                </h3>
                <p className="text-cosmic-text-secondary mb-6">
                  Generate comprehensive PDF reports of your cosmic profile
                </p>
                <CosmicButton
                  variant="premium"
                  size="lg"
                  onClick={handleExportPDF}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF Report
                </CosmicButton>
              </div>
            </CosmicCard>

            <CosmicCard variant="premium" size="lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="w-8 h-8 text-cosmic-blue" />
                </div>
                <h3 className="text-xl font-semibold text-cosmic-blue mb-2">
                  Social Story Creator
                </h3>
                <p className="text-cosmic-text-secondary mb-6">
                  Create beautiful cosmic stories for social media
                </p>
                <CosmicButton
                  variant="premium"
                  size="lg"
                  onClick={handleCreateStory}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Create Story
                </CosmicButton>
              </div>
            </CosmicCard>
          </div>

          {/* Analytics Dashboard */}
          <CosmicCard variant="glass" size="lg" className="mb-8">
            <h2 className="text-2xl font-semibold text-cosmic-gold mb-6">
              Your Cosmic Analytics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-cosmic-gold" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-gold mb-2">
                  Daily Insights
                </h3>
                <p className="text-2xl font-bold text-cosmic-text-primary">
                  {premiumInsights?.dailyInsights || '0'}
                </p>
                <p className="text-sm text-cosmic-text-secondary">
                  This month
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-cosmic-blue" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-blue mb-2">
                  Accuracy Rate
                </h3>
                <p className="text-2xl font-bold text-cosmic-text-primary">
                  {premiumInsights?.accuracy || '95'}%
                </p>
                <p className="text-sm text-cosmic-text-secondary">
                  Prediction accuracy
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-cosmic-silver/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-cosmic-silver" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-silver mb-2">
                  Cosmic Score
                </h3>
                <p className="text-2xl font-bold text-cosmic-text-primary">
                  {premiumInsights?.cosmicScore || '8.7'}
                </p>
                <p className="text-sm text-cosmic-text-secondary">
                  Overall alignment
                </p>
              </div>
            </div>
          </CosmicCard>

          {/* Settings */}
          <CosmicCard variant="default" size="lg" className="text-center">
            <h2 className="text-2xl font-semibold text-cosmic-gold mb-4">
              Premium Settings
            </h2>
            <p className="text-cosmic-text-secondary mb-6">
              Customize your premium experience
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <CosmicButton
                variant="secondary"
                size="md"
                onClick={() => handleFeatureClick('settings')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </CosmicButton>
              
              <CosmicButton
                variant="secondary"
                size="md"
                onClick={() => handleFeatureClick('subscription')}
              >
                <Crown className="w-4 h-4 mr-2" />
                Manage Subscription
              </CosmicButton>
            </div>
          </CosmicCard>
        </div>
      </CosmicLayout>
    </UserFlowRouter>
  )
}