/**
 * Role-Based Access Control Middleware for Daily Secrets App
 * Implements comprehensive RBAC for API endpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth-config'
import { prisma } from '../database'

export interface AuthenticatedUser {
  id: string
  email: string
  name: string
  role: 'user' | 'premium' | 'admin'
  image?: string
}

/**
 * Get authenticated user from session
 */
export async function getAuthenticatedUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return null
    }
    
    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role as 'user' | 'premium' | 'admin',
      image: session.user.image
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

/**
 * Require authentication for endpoint
 */
export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser | NextResponse> {
  const user = await getAuthenticatedUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
  
  return user
}

/**
 * Require specific role for endpoint
 */
export async function requireRole(
  request: NextRequest,
  requiredRole: 'user' | 'premium' | 'admin' | string[]
): Promise<AuthenticatedUser | NextResponse> {
  const user = await requireAuth(request)
  
  if (user instanceof NextResponse) {
    return user
  }
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  
  if (!roles.includes(user.role)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    )
  }
  
  return user
}

/**
 * Require premium access
 */
export async function requirePremium(request: NextRequest): Promise<AuthenticatedUser | NextResponse> {
  return requireRole(request, ['premium', 'admin'])
}

/**
 * Require admin access
 */
export async function requireAdmin(request: NextRequest): Promise<AuthenticatedUser | NextResponse> {
  return requireRole(request, 'admin')
}

/**
 * Check if user can access feature
 */
export function canAccessFeature(user: AuthenticatedUser, feature: string): boolean {
  const featurePermissions = {
    // Free user features
    'daily-insights': ['user', 'premium', 'admin'],
    'basic-numerology': ['user', 'premium', 'admin'],
    'zodiac-info': ['user', 'premium', 'admin'],
    'community-access': ['user', 'premium', 'admin'],
    
    // Premium user features
    'advanced-numerology': ['premium', 'admin'],
    'expert-consultations': ['premium', 'admin'],
    'detailed-charts': ['premium', 'admin'],
    'ai-insights': ['premium', 'admin'],
    'dream-analysis': ['premium', 'admin'],
    'compatibility-reports': ['premium', 'admin'],
    'personalized-calendar': ['premium', 'admin'],
    'unlimited-usage': ['premium', 'admin'],
    
    // Admin features
    'user-management': ['admin'],
    'system-analytics': ['admin'],
    'content-management': ['admin'],
    'system-configuration': ['admin'],
    'qa-testing': ['admin'],
    'accuracy-enhancement': ['admin']
  }
  
  const allowedRoles = featurePermissions[feature as keyof typeof featurePermissions] || []
  return allowedRoles.includes(user.role)
}

/**
 * Middleware to check feature access
 */
export function requireFeatureAccess(feature: string) {
  return async (request: NextRequest): Promise<AuthenticatedUser | NextResponse> => {
    const user = await requireAuth(request)
    
    if (user instanceof NextResponse) {
      return user
    }
    
    if (!canAccessFeature(user, feature)) {
      return NextResponse.json(
        { error: `Access denied. Feature '${feature}' requires premium or admin access.` },
        { status: 403 }
      )
    }
    
    return user
  }
}

/**
 * Filter user data based on role
 */
export function filterUserDataByRole(
  userData: any,
  viewerRole: string,
  isOwnData: boolean = false
): any {
  // Admin can see all data
  if (viewerRole === 'admin') {
    return userData
  }
  
  // Users can see their own data
  if (isOwnData) {
    return userData
  }
  
  // Filter sensitive data for other users
  const filtered = { ...userData }
  
  // Remove sensitive fields
  delete filtered.password
  delete filtered.passwordHash
  delete filtered.twoFactorSecret
  delete filtered.refreshToken
  delete filtered.accessToken
  delete filtered.creditCard
  delete filtered.ssn
  delete filtered.bankAccount
  
  // Mask email for non-admin users
  if (filtered.email && viewerRole !== 'admin') {
    const [local, domain] = filtered.email.split('@')
    if (local && domain) {
      filtered.email = `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`
    }
  }
  
  return filtered
}

/**
 * Get user permissions
 */
export function getUserPermissions(user: AuthenticatedUser): string[] {
  const permissions = []
  
  // Base permissions for all users
  permissions.push('daily-insights', 'basic-numerology', 'zodiac-info', 'community-access')
  
  // Premium user permissions
  if (user.role === 'premium' || user.role === 'admin') {
    permissions.push(
      'advanced-numerology',
      'expert-consultations',
      'detailed-charts',
      'ai-insights',
      'dream-analysis',
      'compatibility-reports',
      'personalized-calendar',
      'unlimited-usage'
    )
  }
  
  // Admin permissions
  if (user.role === 'admin') {
    permissions.push(
      'user-management',
      'system-analytics',
      'content-management',
      'system-configuration',
      'qa-testing',
      'accuracy-enhancement'
    )
  }
  
  return permissions
}

/**
 * Check if user has permission
 */
export function hasPermission(user: AuthenticatedUser, permission: string): boolean {
  const permissions = getUserPermissions(user)
  return permissions.includes(permission)
}

/**
 * Get user with permissions
 */
export async function getUserWithPermissions(request: NextRequest): Promise<AuthenticatedUser | NextResponse> {
  const user = await requireAuth(request)
  
  if (user instanceof NextResponse) {
    return user
  }
  
  return user
}

export function checkPermission(user: AuthenticatedUser, feature: string): boolean {
  const featurePermissions = {
    'daily-insights': ['user', 'premium', 'admin'],
    'basic-numerology': ['user', 'premium', 'admin'],
    'zodiac-info': ['user', 'premium', 'admin'],
    'community-access': ['user', 'premium', 'admin'],
    'advanced-numerology': ['premium', 'admin'],
    'expert-consultations': ['premium', 'admin'],
    'detailed-charts': ['premium', 'admin'],
    'ai-insights': ['premium', 'admin'],
    'compatibility-check': ['premium', 'admin'],
    'dream-analysis': ['premium', 'admin'],
    'transit-alerts': ['premium', 'admin'],
    'personalized-guidance': ['premium', 'admin'],
    'data-export': ['premium', 'admin'],
    'priority-support': ['premium', 'admin'],
    'system-configuration': ['admin'],
    'qa-testing': ['admin'],
    'accuracy-enhancement': ['admin']
  }
  
  const allowedRoles = featurePermissions[feature as keyof typeof featurePermissions] || []
  return allowedRoles.includes(user.role)
}

/**
 * Get user subscription status
 */
export async function getUserSubscriptionStatus(userId: string): Promise<{
  isActive: boolean
  plan: string
  expiresAt?: Date
}> {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'active'
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    if (!subscription) {
      return { isActive: false, plan: 'free' }
    }
    
    return {
      isActive: true,
      plan: subscription.plan,
      expiresAt: subscription.endDate || undefined
    }
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return { isActive: false, plan: 'free' }
  }
}

/**
 * Middleware to check subscription status
 */
export function requireActiveSubscription() {
  return async (request: NextRequest): Promise<AuthenticatedUser | NextResponse> => {
    const user = await requireAuth(request)
    
    if (user instanceof NextResponse) {
      return user
    }
    
    const subscription = await getUserSubscriptionStatus(user.id)
    
    if (!subscription.isActive && user.role === 'user') {
      return NextResponse.json(
        { error: 'Active subscription required for this feature' },
        { status: 403 }
      )
    }
    
    return user
  }
}