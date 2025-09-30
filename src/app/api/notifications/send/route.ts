import { NextRequest, NextResponse } from 'next/server'
import { notificationSystem } from '@/lib/notifications/notification-system'

export async function POST(request: NextRequest) {
  try {
    const { userId, notification } = await request.json()

    if (!userId || !notification) {
      return NextResponse.json({ error: 'User ID and notification required' }, { status: 400 })
    }

    // Initialize notification system if needed
    if (!notificationSystem.getStatus().initialized) {
      await notificationSystem.initialize()
    }

    let success = false

    switch (notification.type) {
      case 'daily_guidance':
        success = await notificationSystem.sendDailyGuidance(userId, notification.body)
        break

      case 'transit_alert':
        success = await notificationSystem.sendTransitAlert(
          userId,
          notification.data?.planet,
          notification.data?.aspect,
          notification.body
        )
        break

      case 'community':
        success = await notificationSystem.sendCommunityNotification(
          userId,
          notification.data?.fromUser,
          notification.body
        )
        break

      case 'streak':
        success = await notificationSystem.sendStreakReminder(
          userId,
          notification.data?.streakDays || 1
        )
        break

      default:
        return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 })
    }

    return NextResponse.json({
      success,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Notification send failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const action = searchParams.get('action')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    switch (action) {
      case 'settings':
        const settings = notificationSystem.getSettings(userId)
        return NextResponse.json({ success: true, settings })

      case 'history':
        const history = await notificationSystem.getNotificationHistory(userId)
        return NextResponse.json({ success: true, history })

      case 'clear':
        await notificationSystem.clearNotifications(userId)
        return NextResponse.json({ success: true })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Notification operation failed' },
      { status: 500 }
    )
  }
}