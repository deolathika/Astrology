import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'
import { validateAndSanitize, emailSchema, nameSchema } from '@/lib/input-validation'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profiles: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        createdAt: user.createdAt,
        profiles: user.profiles
      }
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, email, birthDate, birthTime, birthPlace, latitude, longitude, timezone, zodiacSign, system } = body

    // Validate input
    const emailValidation = validateAndSanitize(emailSchema, email)
    if (!emailValidation.success) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: nameValidation.data,
        email: emailValidation.data
      }
    })

    // Update or create profile
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        fullName: nameValidation.data,
        birthDate: birthDate ? new Date(birthDate) : null,
        birthTime: birthTime,
        birthPlace: birthPlace,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
        timezone: timezone,
        zodiacSign: zodiacSign,
        system: system
      },
      create: {
        userId: session.user.id,
        fullName: nameValidation.data,
        birthDate: birthDate ? new Date(birthDate) : null,
        birthTime: birthTime,
        birthPlace: birthPlace,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
        timezone: timezone,
        zodiacSign: zodiacSign,
        system: system
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profile: profile
      }
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}


