/**
 * User Flow Router Component
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Handles role-based routing and access control for different user types
 */

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { userFlowManager } from '@/lib/user-flow/UserFlowManager'
import { CosmicLayout } from '@/components/cosmic'

interface UserFlowRouterProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const UserFlowRouter: React.FC<UserFlowRouterProps> = ({ 
  children, 
  fallback 
}) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [userRole, setUserRole] = useState<string>('guest')

  useEffect(() => {
    if (status === 'loading') return

    // Determine user role
    const role = session?.user?.role || 'guest'
    setUserRole(role)

    // Check if user can access current route
    const canAccess = userFlowManager.canAccessRoute(role, pathname)
    
    if (!canAccess) {
      // Redirect to appropriate route based on role
      const redirectRoute = userFlowManager.getRedirectRoute(role)
      if (redirectRoute !== pathname) {
        router.push(redirectRoute)
        return
      }
    }

    setIsAuthorized(canAccess)
  }, [session, status, pathname, router])

  // Show loading state
  if (status === 'loading' || isAuthorized === null) {
    return (
      <CosmicLayout variant="nebula" size="lg">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cosmic-gold/30 border-t-cosmic-gold rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cosmic-text-secondary">Loading your cosmic journey...</p>
          </div>
        </div>
      </CosmicLayout>
    )
  }

  // Show unauthorized access
  if (!isAuthorized) {
    return (
      <CosmicLayout variant="nebula" size="lg">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-cosmic-gold mb-4">Access Restricted</h1>
            <p className="text-cosmic-text-secondary mb-6">
              You don't have permission to access this page.
            </p>
            <button
              onClick={() => router.push(userFlowManager.getRedirectRoute(userRole))}
              className="cosmic-button cosmic-button-primary"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </CosmicLayout>
    )
  }

  // Show fallback if provided
  if (fallback) {
    return <>{fallback}</>
  }

  // Render authorized content
  return <>{children}</>
}

export default UserFlowRouter
