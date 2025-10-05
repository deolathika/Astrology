import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database-optimized'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { handleApiError } from '@/lib/error-handler'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        profiles: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check password
    if (!user.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    const isValidPassword = await bcrypt.compare(validatedData.password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return user data (without password)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profiles?.[0] || null
      },
      message: 'Login successful'
    })

  } catch (error) {
    return handleApiError(error)
  }
}
