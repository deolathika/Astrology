import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Delete all user data in correct order (respecting foreign key constraints)
    await prisma.$transaction(async (tx) => {
      // Delete analytics first
      await tx.analytics.deleteMany({
        where: { userId: session.user.id }
      })

      // Delete chat messages
      await tx.chatMessage.deleteMany({
        where: { fromUser: { id: session.user.id } }
      })

      // Delete matches
      await tx.match.deleteMany({
        where: {
          OR: [
            { userA: { id: session.user.id } },
            { userB: { id: session.user.id } }
          ]
        }
      })

      // Delete community posts
      await tx.communityPost.deleteMany({
        where: { userId: session.user.id }
      })

      // Delete dreams
      await tx.dream.deleteMany({
        where: { userId: session.user.id }
      })

      // Delete numerology readings
      await tx.numerologyReading.deleteMany({
        where: { userId: session.user.id }
      })

      // Delete astrology readings
      await tx.astrologyReading.deleteMany({
        where: { userId: session.user.id }
      })

      // Delete subscriptions
      await tx.subscription.deleteMany({
        where: { userId: session.user.id }
      })

      // Delete user settings
      await tx.userSettings.deleteMany({
        where: { userId: session.user.id }
      })

      // Delete profiles
      await tx.profile.deleteMany({
        where: { userId: session.user.id }
      })

      // Delete notifications
      await tx.notification.deleteMany({
        where: { userId: session.user.id }
      })

      // Finally delete the user
      await tx.user.delete({
        where: { id: session.user.id }
      })
    })

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully'
    })

  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}
