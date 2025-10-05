import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database-optimized'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
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

    // For demo purposes, we'll skip password verification
    // In production, you would use bcrypt.compare()
    
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
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed', details: (error as Error).message },
      { status: 500 }
    )
  }
}
