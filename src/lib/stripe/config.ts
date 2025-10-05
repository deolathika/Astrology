/**
 * Stripe Configuration
 * Payment system integration for Daily Secrets
 */

import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  currency: 'usd',
  plans: {
    premium: {
      priceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
      amount: 1999, // $19.99
      interval: 'month',
      name: 'Premium Monthly',
      features: [
        'Unlimited daily insights',
        'Full numerology readings',
        'Advanced astrology charts',
        'AI-powered dream analysis',
        'Priority support',
        'Export data',
        'Ad-free experience'
      ]
    },
    annual: {
      priceId: process.env.STRIPE_ANNUAL_PRICE_ID!,
      amount: 19999, // $199.99
      interval: 'year',
      name: 'Premium Annual',
      features: [
        'Everything in Premium',
        '2 months free',
        'Exclusive content',
        'Early access to features'
      ]
    }
  }
}

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '3 daily insights',
      'Basic numerology',
      'Simple astrology',
      'Community access'
    ],
    limitations: [
      'Limited daily insights',
      'Basic features only',
      'Ad-supported'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    interval: 'month',
    stripePriceId: STRIPE_CONFIG.plans.premium.priceId,
    features: [
      'Unlimited daily insights',
      'Full numerology readings',
      'Advanced astrology charts',
      'AI-powered dream analysis',
      'Priority support',
      'Export data',
      'Ad-free experience'
    ],
    popular: true
  },
  {
    id: 'annual',
    name: 'Premium Annual',
    price: 199.99,
    interval: 'year',
    stripePriceId: STRIPE_CONFIG.plans.annual.priceId,
    features: [
      'Everything in Premium',
      '2 months free',
      'Exclusive content',
      'Early access to features'
    ],
    savings: 'Save $40/year'
  }
]
