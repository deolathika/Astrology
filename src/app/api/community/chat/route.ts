import { NextRequest, NextResponse } from 'next/server'
import { emojiChatSystem } from '@/lib/community/emoji-chat'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    switch (action) {
      case 'discover_connections':
        const userZodiac = searchParams.get('userZodiac') || 'Leo'
        const limit = parseInt(searchParams.get('limit') || '10')
        // Mock connections for now
        const connections = [
          { id: '1', name: 'Cosmic Soul', zodiac: 'Leo', compatibility: 85, lastSeen: '2 hours ago' },
          { id: '2', name: 'Star Gazer', zodiac: 'Aries', compatibility: 92, lastSeen: '1 hour ago' },
          { id: '3', name: 'Moon Child', zodiac: 'Cancer', compatibility: 78, lastSeen: '30 mins ago' }
        ]
        return NextResponse.json({ success: true, connections })

      case 'get_recent_messages':
        const messageLimit = parseInt(searchParams.get('limit') || '20')
        // Mock messages for now
        const messages = [
          { id: '1', user: 'Cosmic Soul', message: '🌟✨', timestamp: new Date().toISOString() },
          { id: '2', user: 'Star Gazer', message: '🌙💫', timestamp: new Date().toISOString() },
          { id: '3', user: 'Moon Child', message: '🌺🌸', timestamp: new Date().toISOString() }
        ]
        return NextResponse.json({ success: true, messages })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()

    switch (action) {
      case 'send_message':
        const message = await emojiChatSystem.sendMessage(
          data.fromId,
          data.toId,
          data.emoji,
          data.consentGiven
        )
        return NextResponse.json({ success: true, message })

      case 'add_reaction':
        const success = await emojiChatSystem.addReaction(
          data.messageId,
          data.userId,
          data.emoji
        )
        return NextResponse.json({ success })

      case 'update_consent':
        emojiChatSystem.updateConsent(data.userId, data.consent)
        return NextResponse.json({ success: true })

      case 'discover_connections':
        const connections = emojiChatSystem.discoverConnections(
          data.userId,
          data.preferences
        )
        return NextResponse.json({ success: true, connections })

      case 'moderate_messages':
        const moderated = emojiChatSystem.moderateMessages()
        return NextResponse.json({ success: true, moderated })

      case 'block_user':
        emojiChatSystem.blockUser(data.userId, data.blockedUserId)
        return NextResponse.json({ success: true })

      case 'report_message':
        emojiChatSystem.reportMessage(data.messageId, data.reason)
        return NextResponse.json({ success: true })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Chat operation failed' },
      { status: 500 }
    )
  }
}

