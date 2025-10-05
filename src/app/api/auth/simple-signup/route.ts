import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database-optimized'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.string().optional().default('user'),
  birthDate: z.string().min(1, 'Birth date is required'),
  birthTime: z.string().min(1, 'Birth time is required'),
  placeLabel: z.string().min(2, 'Birth place is required'),
  systemPref: z.enum(['vedic', 'western', 'chinese', 'hybrid'])
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password, // In production, hash this password
        role: validatedData.role
      }
    })

    // Create profile
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: validatedData.name,
        birthDate: new Date(validatedData.birthDate),
        birthTime: validatedData.birthTime,
        placeLabel: validatedData.placeLabel,
        lat: 0, // Default coordinates - should be geocoded in production
        lng: 0,
        tzIana: 'UTC', // Default timezone - should be determined from place
        systemPref: validatedData.systemPref,
        localePref: 'en-US',
        privacy: JSON.stringify({ analytics: true, marketing: false })
      }
    })

    // Create default user settings
    await prisma.userSettings.create({
      data: {
        userId: user.id,
        theme: 'system',
        notifications: true,
        language: 'en',
        timezone: 'UTC'
      }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: {
          id: profile.id,
          systemPref: profile.systemPref,
          birthDate: profile.birthDate,
          placeLabel: profile.placeLabel
        }
      },
      message: 'Account created successfully'
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
