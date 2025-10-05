/**
 * User Flow Hooks
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Custom hooks for user flow management
 */

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { userFlowManager } from '@/lib/user-flow/UserFlowManager'

export function useUserFlow() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userFlow, setUserFlow] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    const role = session?.user?.role || 'guest'
    const flow = userFlowManager.getUserFlow(role)
    setUserFlow(flow)
    setLoading(false)
  }, [session, status])

  const canAccessRoute = (route: string) => {
    if (!session?.user) return false
    return userFlowManager.canAccessRoute(session.user.role, route)
  }

  const canAccessFeature = (feature: string) => {
    if (!session?.user) return false
    return userFlowManager.canAccessFeature(session.user.role, feature)
  }

  const needsUpgrade = (feature: string) => {
    if (!session?.user) return false
    return userFlowManager.needsUpgrade(session.user.role, feature)
  }

  const getUpgradePrompt = (feature: string) => {
    return userFlowManager.getUpgradePrompt(feature)
  }

  const getFeatureTeaser = (feature: string) => {
    return userFlowManager.getFeatureTeaser(feature)
  }

  const redirectToAppropriateRoute = () => {
    if (!session?.user) {
      router.push('/')
      return
    }

    const redirectRoute = userFlowManager.getRedirectRoute(session.user.role)
    router.push(redirectRoute)
  }

  return {
    userFlow,
    loading,
    canAccessRoute,
    canAccessFeature,
    needsUpgrade,
    getUpgradePrompt,
    getFeatureTeaser,
    redirectToAppropriateRoute
  }
}

export function useFeatureGate(feature: string) {
  const { canAccessFeature, needsUpgrade, getUpgradePrompt, getFeatureTeaser } = useUserFlow()
  
  const canAccess = canAccessFeature(feature)
  const needsUpgradeForFeature = needsUpgrade(feature)
  const upgradePrompt = getUpgradePrompt(feature)
  const teaser = getFeatureTeaser(feature)

  return {
    canAccess,
    needsUpgrade: needsUpgradeForFeature,
    upgradePrompt,
    teaser
  }
}

export function useRoleRedirect() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const redirectBasedOnRole = (fallbackRoute: string = '/') => {
    if (!session?.user) {
      router.push(fallbackRoute)
      return
    }

    const redirectRoute = userFlowManager.getRedirectRoute(session.user.role)
    router.push(redirectRoute)
  }

  return { redirectBasedOnRole }
}

export function useAnalytics() {
  const { data: session } = useSession()
  
  const trackFeatureUsage = async (feature: string, action: string, metadata?: any) => {
    if (!session?.user) return

    try {
      await fetch('/api/analytics/usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feature,
          action,
          metadata
        })
      })
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }

  const trackPageView = async (page: string) => {
    await trackFeatureUsage('navigation', 'page_view', { page })
  }

  const trackFeatureAccess = async (feature: string, accessed: boolean) => {
    await trackFeatureUsage('feature_access', accessed ? 'granted' : 'denied', { feature })
  }

  const trackUpgradePrompt = async (feature: string, action: 'shown' | 'clicked' | 'dismissed') => {
    await trackFeatureUsage('upgrade_prompt', action, { feature })
  }

  return {
    trackFeatureUsage,
    trackPageView,
    trackFeatureAccess,
    trackUpgradePrompt
  }
}
