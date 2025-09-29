import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscription, notification } = body

    if (!subscription || !notification) {
      return NextResponse.json(
        { error: 'Subscription and notification data are required' },
        { status: 400 }
      )
    }

    // Send push notification via FCM
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: subscription.endpoint,
        notification: {
          title: notification.title,
          body: notification.body,
          icon: notification.icon || '/icon-192.png',
          badge: notification.badge || '/icon-192.png',
          image: notification.image,
          tag: notification.tag,
          data: notification.data,
          requireInteraction: notification.requireInteraction || false,
          silent: notification.silent || false
        }
      })
    })

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Push notification sent successfully'
      })
    } else {
      throw new Error(`FCM request failed: ${response.statusText}`)
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send push notification' },
      { status: 500 }
    )
  }
}
