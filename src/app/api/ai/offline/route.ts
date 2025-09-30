import { NextRequest, NextResponse } from 'next/server'
import { OfflineLLMClient } from '@/lib/ai/offline-llm-client'

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    if (!type || !data) {
      return NextResponse.json({ error: 'Type and data required' }, { status: 400 })
    }

    let result
    const client = new OfflineLLMClient()

    switch (type) {
      case 'today_guidance':
        result = await client.generateGuidance(
          `Generate today's guidance for user: ${JSON.stringify(data.userProfile)}`
        )
        break

      case 'dream_interpretation':
        result = await client.generateGuidance(
          `Interpret this dream: ${data.dreamText}`
        )
        break

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString(),
      source: 'offline_ai'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'AI processing failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const client = new OfflineLLMClient()
    const status = { status: 'ready', model: 'offline' }
    
    return NextResponse.json({
      success: true,
      status,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Status check failed' },
      { status: 500 }
    )
  }
}
