import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/database'
import { validateAndSanitize, emailSchema, passwordSchema, nameSchema } from '@/lib/input-validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, birthDate, birthTime, birthPlace, latitude, longitude, timezone, zodiacSign, system } = body

    // Validate input
    const emailValidation = validateAndSanitize(emailSchema, email)
    if (!emailValidation.success) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const passwordValidation = validateAndSanitize(passwordSchema, password)
    if (!passwordValidation.success) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const nameValidation = validateAndSanitize(nameSchema, name)
    if (!nameValidation.success) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: emailValidation.data }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(passwordValidation.data, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: nameValidation.data,
        email: emailValidation.data,
        password: hashedPassword,
        role: 'user'
      }
    })

    // Create user profile
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: nameValidation.data,
        birthDate: new Date(birthDate),
        birthTime: birthTime,
        placeLabel: birthPlace,
        lat: parseFloat(latitude) || 0,
        lng: parseFloat(longitude) || 0,
        tzIana: timezone || 'UTC',
        systemPref: system || 'western',
        localePref: 'en-US',
        privacy: '{}'
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
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to create user account' },
      { status: 500 }
    )
  }
}


