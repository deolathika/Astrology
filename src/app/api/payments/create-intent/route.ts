import { NextRequest, NextResponse } from 'next/server'
import { stripePaymentSystem } from '@/lib/payments/stripe-system'

export async function POST(request: NextRequest) {
  try {
    const { productId, userId, amount, currency, metadata } = await request.json()

    if (!productId || !userId || !amount) {
      return NextResponse.json({ error: 'Product ID, User ID, and amount required' }, { status: 400 })
    }

    // Initialize Stripe if needed
    if (!stripePaymentSystem.getStatus().initialized) {
      await stripePaymentSystem.initialize()
    }

    // Create payment intent
    const paymentIntent = await stripePaymentSystem.createPaymentIntent(
      productId,
      userId,
      metadata
    )

    return NextResponse.json({
      success: true,
      paymentIntent,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Payment intent creation failed' },
      { status: 500 }
    )
  }
}

