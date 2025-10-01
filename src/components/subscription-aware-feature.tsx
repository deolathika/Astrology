'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Lock, Crown, Star, Heart, Zap, Shield, 
  ArrowRight, Sparkles, Gift, AlertCircle
} from 'lucide-react'

interface SubscriptionAwareFeatureProps {
  feature: string
  children: React.ReactNode
  fallback?: React.ReactNode
  showUpgrade?: boolean
  className?: string
}

interface UserSubscription {
  planId: string
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  features: string[]
  usage: {
    dailyInsights: number
    expertConsultations: number
    compatibilityChecks: number
  }
}

const featureRequirements: { [key: string]: { plans: string[], usage?: string } } = {
  'unlimited_insights': { plans: ['premium', 'admin'] },
  'expert_consultations': { plans: ['premium', 'admin'], usage: 'expertConsultations' },
  'advanced_astrology': { plans: ['premium', 'admin'] },
  'ai_dreams': { plans: ['premium', 'admin'] },
  'admin_dashboard': { plans: ['admin'] },
  'api_access': { plans: ['admin'] },
  'unlimited_compatibility': { plans: ['premium', 'admin'] },
  'vedic_astrology': { plans: ['premium', 'admin'] },
  'custom_rituals': { plans: ['premium', 'admin'] }
}

const planIcons: { [key: string]: React.ComponentType<any> } = {
  free: Heart,
  premium: Crown,
  admin: Shield
}

const planColors: { [key: string]: string } = {
  free: 'text-slate-600',
  premium: 'text-purple-600',
  admin: 'text-amber-600'
}

const planBgColors: { [key: string]: string } = {
  free: 'bg-slate-50',
  premium: 'bg-purple-50',
  admin: 'bg-amber-50'
}

export default function SubscriptionAwareFeature({ 
  feature, 
  children, 
  fallback, 
  showUpgrade = true,
  className = ''
}: SubscriptionAwareFeatureProps) {
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [canUse, setCanUse] = useState(false)
  const [usageInfo, setUsageInfo] = useState<{ current: number; limit: number; resetDate: string } | null>(null)

  useEffect(() => {
    loadSubscriptionData()
  }, [])

  const loadSubscriptionData = async () => {
    try {
      // Load user subscription from localStorage
      const subscription = localStorage.getItem('userSubscription')
      if (subscription) {
        const subData = JSON.parse(subscription)
        setUserSubscription(subData)
        
        // Check feature access
        const requirements = featureRequirements[feature]
        if (requirements) {
          const hasPlanAccess = requirements.plans.includes(subData.planId)
          setHasAccess(hasPlanAccess)
          
          if (hasPlanAccess && requirements.usage) {
            // Check usage limits
            const usage = subData.usage[requirements.usage as keyof typeof subData.usage]
            const limit = getUsageLimit(subData.planId, requirements.usage)
            setCanUse(limit === -1 || usage < limit)
            setUsageInfo({
              current: usage,
              limit: limit,
              resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            })
          } else {
            setCanUse(true)
          }
        } else {
          setHasAccess(true)
          setCanUse(true)
        }
      } else {
        // Default to free plan
        setUserSubscription({
          planId: 'free',
          status: 'active',
          features: ['Daily cosmic insights (3 per day)', 'Basic numerology readings'],
          usage: { dailyInsights: 0, expertConsultations: 0, compatibilityChecks: 0 }
        })
        setHasAccess(false)
        setCanUse(false)
      }
    } catch (error) {
      console.error('Error loading subscription data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getUsageLimit = (planId: string, usageType: string): number => {
    const limits: { [key: string]: { [key: string]: number } } = {
      free: { dailyInsights: 3, expertConsultations: 0, compatibilityChecks: 5 },
      premium: { dailyInsights: -1, expertConsultations: 2, compatibilityChecks: -1 },
      admin: { dailyInsights: -1, expertConsultations: -1, compatibilityChecks: -1 }
    }
    return limits[planId]?.[usageType] || 0
  }

  const getRequiredPlan = (): string => {
    const requirements = featureRequirements[feature]
    if (!requirements) return 'free'
    
    if (requirements.plans.includes('premium')) return 'premium'
    if (requirements.plans.includes('admin')) return 'admin'
    return 'free'
  }

  const getPlanName = (planId: string): string => {
    const names: { [key: string]: string } = {
      free: 'Free',
      premium: 'Premium',
      admin: 'Admin'
    }
    return names[planId] || 'Unknown'
  }

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-32 bg-slate-200 rounded-lg"></div>
      </div>
    )
  }

  if (!hasAccess) {
    const requiredPlan = getRequiredPlan()
    const requiredPlanName = getPlanName(requiredPlan)
    const IconComponent = planIcons[requiredPlan] || Crown
    
    return (
      <div className={`relative ${className}`}>
        {/* Blurred content */}
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-center p-6">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${planBgColors[requiredPlan]} flex items-center justify-center`}>
              <IconComponent className={`w-8 h-8 ${planColors[requiredPlan]}`} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {requiredPlanName} Feature
            </h3>
            <p className="text-slate-600 mb-4">
              This feature requires a {requiredPlanName} subscription
            </p>
            {showUpgrade && (
              <button
                onClick={() => window.location.href = '/subscription'}
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200"
              >
                Upgrade to {requiredPlanName}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!canUse && usageInfo) {
    return (
      <div className={`relative ${className}`}>
        {/* Blurred content */}
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        
        {/* Usage limit overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-center p-6">
            <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Usage Limit Reached
            </h3>
            <p className="text-slate-600 mb-4">
              You've used {usageInfo.current} of {usageInfo.limit === -1 ? 'unlimited' : usageInfo.limit} this period
            </p>
            <p className="text-sm text-slate-500">
              Resets on {new Date(usageInfo.resetDate).toLocaleDateString()}
            </p>
            {showUpgrade && (
              <button
                onClick={() => window.location.href = '/subscription'}
                className="mt-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200"
              >
                Upgrade for Unlimited Access
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Hook for checking subscription access
export function useSubscriptionAccess(feature: string) {
  const [hasAccess, setHasAccess] = useState(false)
  const [canUse, setCanUse] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const subscription = localStorage.getItem('userSubscription')
        if (subscription) {
          const subData = JSON.parse(subscription)
          const requirements = featureRequirements[feature]
          
          if (requirements) {
            const hasPlanAccess = requirements.plans.includes(subData.planId)
            setHasAccess(hasPlanAccess)
            
            if (hasPlanAccess && requirements.usage) {
              const usage = subData.usage[requirements.usage as keyof typeof subData.usage]
              const limit = getUsageLimit(subData.planId, requirements.usage)
              setCanUse(limit === -1 || usage < limit)
            } else {
              setCanUse(true)
            }
          } else {
            setHasAccess(true)
            setCanUse(true)
          }
        } else {
          setHasAccess(false)
          setCanUse(false)
        }
      } catch (error) {
        console.error('Error checking subscription access:', error)
        setHasAccess(false)
        setCanUse(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [feature])

  const getUsageLimit = (planId: string, usageType: string): number => {
    const limits: { [key: string]: { [key: string]: number } } = {
      free: { dailyInsights: 3, expertConsultations: 0, compatibilityChecks: 5 },
      premium: { dailyInsights: -1, expertConsultations: 2, compatibilityChecks: -1 },
      admin: { dailyInsights: -1, expertConsultations: -1, compatibilityChecks: -1 }
    }
    return limits[planId]?.[usageType] || 0
  }

  return { hasAccess, canUse, isLoading }
}


