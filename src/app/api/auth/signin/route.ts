import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database-optimized'
import { handleApiError } from '@/lib/error-handler'
import { enhancedRateLimit } from '@/lib/security/enhanced-rate-limiting'
import { ResponseOptimizer } from '@/lib/api/response-optimizer'
import { z } from 'zod'

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = enhancedRateLimit(request, 10, 15 * 60 * 1000) // 10 requests per 15 minutes
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many signin attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = signinSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        profiles: true,
        userSettings: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // In production, verify password hash
    if (user.password !== validatedData.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() }
    })

    return ResponseOptimizer.createOptimizedResponse({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.updatedAt,
        profile: user.profiles?.[0] || null,
        settings: user.userSettings
      },
      message: 'Sign in successful'
    })

  } catch (error) {
    return handleApiError(error)
  }
}
