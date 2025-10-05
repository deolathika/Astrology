'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from './theme-provider'

interface RoleBasedRouteProps {
  children: React.ReactNode
  allowedRoles: ('user' | 'premium' | 'admin')[]
  fallbackRoute?: string
  requireAuth?: boolean
}

export function RoleBasedRoute({ 
  children, 
  allowedRoles, 
  fallbackRoute = '/',
  requireAuth = true 
}: RoleBasedRouteProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    
    // Load user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        
        // Set theme based on user role
        if (parsedUser.role === 'premium') {
          setTheme('premium')
        } else if (parsedUser.role === 'admin') {
          setTheme('admin')
        } else {
          setTheme('user')
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
        setUser(null)
      }
    }
    
    setLoading(false)
  }, [setTheme])

  useEffect(() => {
    if (!mounted || loading) return

    // Check authentication
    if (requireAuth && !user) {
      router.push('/auth/login')
      return
    }

    // Check role permissions
    if (user && !allowedRoles.includes(user.role)) {
      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/admin')
      } else if (user.role === 'premium') {
        router.push('/premium')
      } else {
        router.push('/main')
      }
      return
    }
  }, [user, allowedRoles, requireAuth, router, mounted, loading])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}

// Hook for role-based access control
export function useRoleAccess() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        setUser(null)
      }
    }
    
    setLoading(false)
  }, [])

  const hasRole = (role: 'user' | 'premium' | 'admin') => {
    return user?.role === role
  }

  const hasAnyRole = (roles: ('user' | 'premium' | 'admin')[]) => {
    return user && roles.includes(user.role)
  }

  const isAdmin = () => hasRole('admin')
  const isPremium = () => hasRole('premium') || hasRole('admin')
  const isUser = () => hasRole('user') || hasRole('premium') || hasRole('admin')

  return {
    user,
    loading: !mounted || loading,
    hasRole,
    hasAnyRole,
    isAdmin,
    isPremium,
    isUser
  }
}

// Component for conditional rendering based on role
interface RoleGateProps {
  children: React.ReactNode
  roles: ('user' | 'premium' | 'admin')[]
  fallback?: React.ReactNode
}

export function RoleGate({ children, roles, fallback = null }: RoleGateProps) {
  const { hasAnyRole, loading } = useRoleAccess()

  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded h-8 w-full"></div>
  }

  if (!hasAnyRole(roles)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Route definitions
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // User routes
  MAIN: '/main',
  PROFILE: '/profile',
  TODAY: '/today',
  NUMEROLOGY: '/numerology',
  ZODIAC: '/zodiac-systems',
  COMPATIBILITY: '/compatibility',
  COMMUNITY: '/community',
  DREAMS: '/dreams',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  
  // Premium routes
  PREMIUM: '/premium',
  PREMIUM_ASTROLOGY: '/premium/astrology',
  PREMIUM_NUMEROLOGY: '/premium/numerology',
  PREMIUM_DREAMS: '/premium/dreams',
  PREMIUM_COMPATIBILITY: '/premium/compatibility',
  PREMIUM_CALENDAR: '/premium/calendar',
  PREMIUM_EXPORT: '/premium/export',
  
  // Admin routes
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_CONTENT: '/admin/content',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_QA: '/admin/qa',
  ADMIN_ACCURACY: '/admin/accuracy'
} as const

// Route permissions
export const ROUTE_PERMISSIONS = {
  [ROUTES.HOME]: [],
  [ROUTES.LOGIN]: [],
  [ROUTES.SIGNUP]: [],
  [ROUTES.ABOUT]: [],
  [ROUTES.CONTACT]: [],
  
  [ROUTES.MAIN]: ['user', 'premium', 'admin'],
  [ROUTES.PROFILE]: ['user', 'premium', 'admin'],
  [ROUTES.TODAY]: ['user', 'premium', 'admin'],
  [ROUTES.NUMEROLOGY]: ['user', 'premium', 'admin'],
  [ROUTES.ZODIAC]: ['user', 'premium', 'admin'],
  [ROUTES.COMPATIBILITY]: ['user', 'premium', 'admin'],
  [ROUTES.COMMUNITY]: ['user', 'premium', 'admin'],
  [ROUTES.DREAMS]: ['user', 'premium', 'admin'],
  [ROUTES.NOTIFICATIONS]: ['user', 'premium', 'admin'],
  [ROUTES.SETTINGS]: ['user', 'premium', 'admin'],
  
  [ROUTES.PREMIUM]: ['premium', 'admin'],
  [ROUTES.PREMIUM_ASTROLOGY]: ['premium', 'admin'],
  [ROUTES.PREMIUM_NUMEROLOGY]: ['premium', 'admin'],
  [ROUTES.PREMIUM_DREAMS]: ['premium', 'admin'],
  [ROUTES.PREMIUM_COMPATIBILITY]: ['premium', 'admin'],
  [ROUTES.PREMIUM_CALENDAR]: ['premium', 'admin'],
  [ROUTES.PREMIUM_EXPORT]: ['premium', 'admin'],
  
  [ROUTES.ADMIN]: ['admin'],
  [ROUTES.ADMIN_USERS]: ['admin'],
  [ROUTES.ADMIN_ANALYTICS]: ['admin'],
  [ROUTES.ADMIN_CONTENT]: ['admin'],
  [ROUTES.ADMIN_SETTINGS]: ['admin'],
  [ROUTES.ADMIN_QA]: ['admin'],
  [ROUTES.ADMIN_ACCURACY]: ['admin']
} as const

// Navigation items based on role
export const getNavigationItems = (role: 'user' | 'premium' | 'admin') => {
  const baseItems = [
    { label: 'Home', href: ROUTES.MAIN, icon: '🏠' },
    { label: 'Today', href: ROUTES.TODAY, icon: '🌟' },
    { label: 'Profile', href: ROUTES.PROFILE, icon: '👤' },
    { label: 'Numerology', href: ROUTES.NUMEROLOGY, icon: '🔢' },
    { label: 'Zodiac', href: ROUTES.ZODIAC, icon: '♈' },
    { label: 'Compatibility', href: ROUTES.COMPATIBILITY, icon: '💕' },
    { label: 'Community', href: ROUTES.COMMUNITY, icon: '👥' },
    { label: 'Dreams', href: ROUTES.DREAMS, icon: '💭' },
    { label: 'Notifications', href: ROUTES.NOTIFICATIONS, icon: '🔔' },
    { label: 'Settings', href: ROUTES.SETTINGS, icon: '⚙️' }
  ]

  if (role === 'premium' || role === 'admin') {
    baseItems.push(
      { label: 'Premium', href: '/premium' as any, icon: '⭐' },
      { label: 'Advanced Astrology', href: ROUTES.PREMIUM_ASTROLOGY as any, icon: '🔮' },
      { label: 'Advanced Numerology', href: ROUTES.PREMIUM_NUMEROLOGY as any, icon: '🔢' },
      { label: 'Dream Analysis', href: ROUTES.PREMIUM_DREAMS as any, icon: '💭' },
      { label: 'Compatibility Reports', href: ROUTES.PREMIUM_COMPATIBILITY as any, icon: '💕' },
      { label: 'Cosmic Calendar', href: ROUTES.PREMIUM_CALENDAR as any, icon: '📅' },
      { label: 'Data Export', href: ROUTES.PREMIUM_EXPORT as any, icon: '📊' }
    )
  }

  if (role === 'admin') {
    baseItems.push(
      { label: 'Admin Dashboard', href: '/admin' as any, icon: '👑' },
      { label: 'User Management', href: ROUTES.ADMIN_USERS as any, icon: '👥' },
      { label: 'Analytics', href: ROUTES.ADMIN_ANALYTICS as any, icon: '📈' },
      { label: 'Content Management', href: ROUTES.ADMIN_CONTENT as any, icon: '📝' },
      { label: 'System Settings', href: ROUTES.ADMIN_SETTINGS as any, icon: '⚙️' },
      { label: 'QA Testing', href: ROUTES.ADMIN_QA as any, icon: '🧪' },
      { label: 'Accuracy Enhancement', href: ROUTES.ADMIN_ACCURACY as any, icon: '✨' }
    )
  }

  return baseItems
}

// Redirect logic based on role
export const getRedirectRoute = (role: 'user' | 'premium' | 'admin') => {
  switch (role) {
    case 'admin':
      return ROUTES.ADMIN
    case 'premium':
      return ROUTES.PREMIUM
    case 'user':
    default:
      return ROUTES.MAIN
  }
}
