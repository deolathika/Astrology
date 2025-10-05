/**
 * User Sign Up API
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Handles user registration with role assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['user', 'premium', 'admin']).optional().default('user')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role = 'user' } = signupSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists with this email' },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        emailVerified: new Date() // Auto-verify for now
      }
    })
    
    // Create user profile
    await prisma.profile.create({
      data: {
        userId: user.id,
        name: user.name || '',
        birthDate: new Date('1990-01-01'), // Default birth date
        birthTime: '12:00',
        placeLabel: 'Unknown',
        lat: 0,
        lng: 0,
        tzIana: 'UTC',
        systemPref: 'western',
        localePref: 'en',
        privacy: '{}'
      }
    })
    
    // Create user settings
    await prisma.userSettings.create({
      data: {
        userId: user.id,
        language: 'en',
        theme: 'auto',
        timezone: 'UTC',
        notifications: true,
        dailyInsights: true,
        dailyGuidance: true,
        dreamAlerts: false,
        compatibilityUpdates: false,
        cosmicEvents: true,
        pushNotifications: true,
        emailNotifications: false,
        profileVisibility: true,
        dataSharing: false,
        analytics: true,
        crashReports: true
      }
    })
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
    
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}