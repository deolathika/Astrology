/**
 * Subscription Upgrade API
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Handles user role upgrades from free to premium
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'
import { z } from 'zod'

const upgradeSchema = z.object({
  plan: z.enum(['premium', 'cosmic']),
  paymentMethod: z.string().optional(),
  stripeId: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { plan, paymentMethod, stripeId } = upgradeSchema.parse(body)
    
    const userId = session.user.id
    const currentRole = session.user.role
    
    // Check if user is already premium or admin
    if (currentRole === 'premium' || currentRole === 'admin') {
      return NextResponse.json(
        { success: false, error: 'User already has premium access' },
        { status: 400 }
      )
    }
    
    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: 'premium' }
    })
    
    // Create subscription record
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        price: plan === 'premium' ? 99.99 : 199.99,
        currency: 'USD',
        stripeId: stripeId || null
      }
    })
    
    // Update user settings for premium features
    await prisma.userSettings.update({
      where: { userId },
      data: {
        dreamAlerts: true,
        compatibilityUpdates: true,
        emailNotifications: true,
        dataSharing: true
      }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Successfully upgraded to premium',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      },
      subscription: {
        id: subscription.id,
        plan: subscription.plan,
        status: subscription.status,
        startDate: subscription.startDate,
        endDate: subscription.endDate
      }
    })
    
  } catch (error) {
    console.error('Upgrade error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to upgrade subscription' },
      { status: 500 }
    )
  }
}

