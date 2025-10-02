/**
 * Admin User Management API
 * Allows admins to view and manage all users
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireRole, filterUserDataByRole } from '@/lib/auth/role-middleware'
import { prisma } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireRole(request, 'admin')
    
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const role = searchParams.get('role')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build query filters
    const where: any = {}
    
    if (role && role !== 'all') {
      where.role = role
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get users with profiles
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          profiles: true,
          _count: {
            select: {
              purchases: true,
              donations: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.user.count({ where })
    ])

    // Format user data for admin view
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profiles[0] ? {
        fullName: user.profiles[0].fullName,
        birthDate: user.profiles[0].birthDate,
        birthPlace: user.profiles[0].birthPlace,
        zodiacSign: user.profiles[0].zodiacSign,
        system: user.profiles[0].system
      } : null,
      stats: {
        totalPurchases: user._count.purchases,
        totalDonations: user._count.donations
      }
    }))

    return NextResponse.json({
      success: true,
      data: {
        users: formattedUsers,
        pagination: {
          page,
          limit,
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        }
      }
    })

  } catch (error) {
    console.error('Admin users fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireRole(request, 'admin')
    
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const body = await request.json()
    const { userId, updates } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Validate allowed updates
    const allowedUpdates = ['name', 'email', 'role']
    const validUpdates: any = {}

    for (const [key, value] of Object.entries(updates)) {
      if (allowedUpdates.includes(key)) {
        validUpdates[key] = value
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: validUpdates,
      include: { profiles: true }
    })

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          updatedAt: updatedUser.updatedAt
        }
      },
      message: 'User updated successfully'
    })

  } catch (error) {
    console.error('Admin user update error:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireRole(request, 'admin')
    
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Prevent admin from deleting themselves
    if (userId === authResult.session.user.id) {
      return NextResponse.json({ 
        error: 'Cannot delete your own account' 
      }, { status: 400 })
    }

    // Delete user and all related data (cascade)
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    })

  } catch (error) {
    console.error('Admin user delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
