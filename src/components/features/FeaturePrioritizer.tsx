'use client'

import React, { useState, useEffect } from 'react'
import { 
  Star, 
  Moon, 
  Heart, 
  Calculator,
  Clock,
  TrendingUp,
  Award,
  Activity,
  Target,
  Zap,
  Crown,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  Users,
  BookOpen,
  Sparkles
} from 'lucide-react'

interface FeaturePrioritizerProps {
  user?: any
  onTrackEvent?: (event: string, properties?: any) => void
}

export default function FeaturePrioritizer({ user, onTrackEvent }: FeaturePrioritizerProps) {
  const [prioritizedFeatures, setPrioritizedFeatures] = useState<any[]>([])
  const [userPreferences, setUserPreferences] = useState<any>({})

  useEffect(() => {
    // Analyze user behavior and preferences to prioritize features
    const analyzeUserPreferences = () => {
      const hour = new Date().getHours()
      const dayOfWeek = new Date().getDay()
      const userLevel = user?.achievements?.level || 1
      const subscription = user?.subscription || 'free'
      
      // Base features with priority scoring
      const features = [
        {
          id: 'daily_horoscope',
          title: 'Daily Horoscope',
          description: 'Personalized daily insights based on your zodiac sign',
          icon: Star,
          category: 'astrology',
          priority: 10,
          usage: 'daily',
          isPremium: false,
          timeRelevant: true,
          userLevel: 1
        },
        {
          id: 'moon_phase',
          title: 'Moon Phase',
          description: 'Current lunar energy and its impact on your day',
          icon: Moon,
          category: 'astrology',
          priority: 9,
          usage: 'daily',
          isPremium: false,
          timeRelevant: true,
          userLevel: 1
        },
        {
          id: 'lucky_numbers',
          title: 'Lucky Numbers',
          description: 'Your personal lucky numbers for today',
          icon: Calculator,
          category: 'numerology',
          priority: 8,
          usage: 'daily',
          isPremium: false,
          timeRelevant: true,
          userLevel: 1
        },
        {
          id: 'energy_level',
          title: 'Energy Level',
          description: 'Your cosmic energy level for optimal timing',
          icon: Zap,
          category: 'wellness',
          priority: 9,
          usage: 'daily',
          isPremium: false,
          timeRelevant: true,
          userLevel: 1
        },
        {
          id: 'love_compatibility',
          title: 'Love Compatibility',
          description: 'Check compatibility with your partner',
          icon: Heart,
          category: 'relationships',
          priority: 7,
          usage: 'weekly',
          isPremium: true,
          timeRelevant: false,
          userLevel: 2
        },
        {
          id: 'dream_analysis',
          title: 'Dream Analysis',
          description: 'AI-powered interpretation of your dreams',
          icon: Moon,
          category: 'psychology',
          priority: 6,
          usage: 'as_needed',
          isPremium: true,
          timeRelevant: false,
          userLevel: 2
        },
        {
          id: 'goal_setting',
          title: 'Goal Setting',
          description: 'Align your goals with cosmic energies',
          icon: Target,
          category: 'productivity',
          priority: 5,
          usage: 'weekly',
          isPremium: true,
          timeRelevant: false,
          userLevel: 3
        },
        {
          id: 'community',
          title: 'Community',
          description: 'Connect with fellow cosmic seekers',
          icon: Users,
          category: 'social',
          priority: 4,
          usage: 'daily',
          isPremium: false,
          timeRelevant: false,
          userLevel: 2
        },
        {
          id: 'premium_insights',
          title: 'Premium Insights',
          description: 'Advanced cosmic guidance and predictions',
          icon: Crown,
          category: 'premium',
          priority: 8,
          usage: 'daily',
          isPremium: true,
          timeRelevant: true,
          userLevel: 1
        }
      ]

      // Calculate priority scores based on user context
      const scoredFeatures = features.map(feature => {
        let score = feature.priority
        
        // Time-based adjustments
        if (feature.timeRelevant) {
          if (hour >= 6 && hour <= 10) score += 2 // Morning boost
          if (hour >= 18 && hour <= 22) score += 1 // Evening boost
        }
        
        // User level adjustments
        if (feature.userLevel <= userLevel) score += 1
        
        // Subscription adjustments
        if (feature.isPremium && subscription === 'premium') score += 2
        if (feature.isPremium && subscription === 'free') score -= 1
        
        // Usage frequency adjustments
        if (feature.usage === 'daily') score += 2
        if (feature.usage === 'weekly') score += 1
        
        return { ...feature, calculatedScore: score }
      })

      // Sort by calculated score
      const sortedFeatures = scoredFeatures.sort((a, b) => b.calculatedScore - a.calculatedScore)
      
      setPrioritizedFeatures(sortedFeatures)
    }

    analyzeUserPreferences()
  }, [user])

  const getPriorityColor = (score: number) => {
    if (score >= 12) return 'text-green-400'
    if (score >= 10) return 'text-blue-400'
    if (score >= 8) return 'text-yellow-400'
    return 'text-gray-400'
  }

  const getPriorityLabel = (score: number) => {
    if (score >= 12) return 'Essential'
    if (score >= 10) return 'High Priority'
    if (score >= 8) return 'Recommended'
    return 'Optional'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Your Personalized Features</h2>
        <p className="text-white/70 text-sm">
          Based on your usage patterns and preferences
        </p>
      </div>

      {/* Priority Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {prioritizedFeatures.filter(f => f.calculatedScore >= 12).length}
          </div>
          <div className="text-white/70 text-sm">Essential Features</div>
        </div>
        
        <div className="glass-card p-4 text-center">
          <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {prioritizedFeatures.filter(f => f.calculatedScore >= 10 && f.calculatedScore < 12).length}
          </div>
          <div className="text-white/70 text-sm">High Priority</div>
        </div>
        
        <div className="glass-card p-4 text-center">
          <Info className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {prioritizedFeatures.filter(f => f.calculatedScore >= 8 && f.calculatedScore < 10).length}
          </div>
          <div className="text-white/70 text-sm">Recommended</div>
        </div>
      </div>

      {/* Feature List */}
      <div className="space-y-4">
        {prioritizedFeatures.map((feature, index) => (
          <div key={feature.id} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${
                  feature.isPremium ? 'from-amber-500 to-orange-500' : 'from-blue-500 to-purple-500'
                } rounded-lg flex items-center justify-center`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`text-sm font-medium ${getPriorityColor(feature.calculatedScore)}`}>
                    {getPriorityLabel(feature.calculatedScore)}
                  </div>
                  <div className="text-white/60 text-xs">
                    Score: {feature.calculatedScore}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {feature.isPremium ? (
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Lock className="w-4 h-4" />
                      <span className="text-xs font-medium">Premium</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-green-400">
                      <Unlock className="w-4 h-4" />
                      <span className="text-xs font-medium">Free</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <span>Category: {feature.category}</span>
                <span>Usage: {feature.usage}</span>
                <span>Level: {feature.userLevel}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  feature.calculatedScore >= 12 ? 'bg-green-500/20 text-green-300' :
                  feature.calculatedScore >= 10 ? 'bg-blue-500/20 text-blue-300' :
                  feature.calculatedScore >= 8 ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  Priority {index + 1}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
        <div className="space-y-3">
          {prioritizedFeatures.slice(0, 3).map((feature, index) => (
            <div key={feature.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{feature.title}</div>
                <div className="text-white/70 text-sm">{feature.description}</div>
              </div>
              <div className="text-blue-400 text-sm">
                {feature.isPremium ? 'Premium' : 'Free'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
