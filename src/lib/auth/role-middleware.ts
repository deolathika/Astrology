/**
 * Role-based Access Control Middleware
 * Ensures users only access data and features appropriate to their role
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'

export type UserRole = 'user' | 'premium' | 'admin'

export interface RolePermissions {
  canViewAllUsers: boolean
  canEditAllUsers: boolean
  canAccessAdminPanel: boolean
  canViewSystemMetrics: boolean
  canModifySystemSettings: boolean
  dailyInsightLimit: number
  compatibilityChecksLimit: number
  expertConsultationsLimit: number
  canAccessPremiumFeatures: boolean
}

export const rolePermissions: Record<UserRole, RolePermissions> = {
  user: {
    canViewAllUsers: false,
    canEditAllUsers: false,
    canAccessAdminPanel: false,
    canViewSystemMetrics: false,
    canModifySystemSettings: false,
    dailyInsightLimit: 3,
    compatibilityChecksLimit: 1,
    expertConsultationsLimit: 0,
    canAccessPremiumFeatures: false
  },
  premium: {
    canViewAllUsers: false,
    canEditAllUsers: false,
    canAccessAdminPanel: false,
    canViewSystemMetrics: false,
    canModifySystemSettings: false,
    dailyInsightLimit: -1, // Unlimited
    compatibilityChecksLimit: -1, // Unlimited
    expertConsultationsLimit: 5,
    canAccessPremiumFeatures: true
  },
  admin: {
    canViewAllUsers: true,
    canEditAllUsers: true,
    canAccessAdminPanel: true,
    canViewSystemMetrics: true,
    canModifySystemSettings: true,
    dailyInsightLimit: -1, // Unlimited
    compatibilityChecksLimit: -1, // Unlimited
    expertConsultationsLimit: -1, // Unlimited
    canAccessPremiumFeatures: true
  }
}

export async function requireAuth(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return session
}

export async function requireRole(request: NextRequest, requiredRole: UserRole | UserRole[]) {
  const session = await requireAuth(request)
  
  if (session instanceof NextResponse) {
    return session // Return the error response
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const userRole = user.role as UserRole
  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

  if (!allowedRoles.includes(userRole)) {
    return NextResponse.json({ 
      error: 'Insufficient permissions',
      required: allowedRoles,
      current: userRole
    }, { status: 403 })
  }

  return { session, user: { ...session.user, role: userRole } }
}

export async function getUserWithPermissions(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profiles: true }
  })

  if (!user) {
    return null
  }

  const userRole = user.role as UserRole
  const permissions = rolePermissions[userRole]

  return {
    ...user,
    permissions
  }
}

export function checkPermission(userRole: UserRole, permission: keyof RolePermissions): boolean {
  return rolePermissions[userRole][permission] as boolean
}

export function getUsageLimit(userRole: UserRole, feature: 'dailyInsightLimit' | 'compatibilityChecksLimit' | 'expertConsultationsLimit'): number {
  return rolePermissions[userRole][feature]
}

export async function validateUserAccess(sessionUserId: string, targetUserId: string, userRole: UserRole): Promise<boolean> {
  // Admin can access any user
  if (userRole === 'admin') {
    return true
  }
  
  // Users can only access their own data
  return sessionUserId === targetUserId
}

export function filterUserDataByRole(userData: any, viewerRole: UserRole, isOwnData: boolean) {
  // Admin sees everything
  if (viewerRole === 'admin') {
    return userData
  }

  // Users can only see their own full data
  if (isOwnData) {
    return userData
  }

  // For other users' data, show limited public info
  return {
    id: userData.id,
    name: userData.name,
    zodiacSign: userData.profiles?.[0]?.zodiacSign,
    system: userData.profiles?.[0]?.system,
    // Hide sensitive information
    email: undefined,
    birthDate: undefined,
    birthTime: undefined,
    birthPlace: undefined,
    latitude: undefined,
    longitude: undefined
  }
}
