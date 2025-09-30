/**
 * Stripe Payment System for Daily Secrets
 * Handles subscriptions, one-time payments, and donations
 */

export interface PaymentProduct {
  id: string
  name: string
  description: string
  price: number
  currency: string
  type: 'subscription' | 'one_time' | 'donation'
  features: string[]
  popular?: boolean
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
  clientSecret: string
  metadata: Record<string, any>
}

export interface Subscription {
  id: string
  userId: string
  productId: string
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  price: number
  currency: string
}

export interface Donation {
  id: string
  userId: string
  amount: number
  currency: string
  toPool: string
  message?: string
  anonymous: boolean
  createdAt: string
}

export class StripePaymentSystem {
  private stripe: any = null
  private isInitialized = false
  private products: PaymentProduct[] = []

  /**
   * Initialize Stripe system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Load Stripe.js
      const { loadStripe } = await import('@stripe/stripe-js')
      this.stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      
      if (!this.stripe) {
        throw new Error('Failed to load Stripe')
      }

      // Initialize products
      this.initializeProducts()
      
      this.isInitialized = true
      } catch (error) {
      throw new Error('Stripe initialization failed')
    }
  }

  /**
   * Create payment intent for one-time payment
   */
  async createPaymentIntent(
    productId: string,
    userId: string,
    metadata: Record<string, any> = {}
  ): Promise<PaymentIntent> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    const product = this.products.find(p => p.id === productId)
    if (!product) {
      throw new Error('Product not found')
    }

    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          userId,
          amount: product.price,
          currency: product.currency,
          metadata
        })
      })

      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Payment intent creation failed')
    }
  }

  /**
   * Create subscription
   */
  async createSubscription(
    productId: string,
    userId: string,
    paymentMethodId: string
  ): Promise<Subscription> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          userId,
          paymentMethodId
        })
      })

      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Subscription creation failed')
    }
  }

  /**
   * Process donation
   */
  async processDonation(
    amount: number,
    userId: string,
    toPool: string,
    message?: string,
    anonymous: boolean = false
  ): Promise<Donation> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      const response = await fetch('/api/payments/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          userId,
          toPool,
          message,
          anonymous
        })
      })

      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Donation processing failed')
    }
  }

  /**
   * Confirm payment
   */
  async confirmPayment(clientSecret: string): Promise<{ success: boolean; error?: string }> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized')
    }

    try {
      const { error } = await this.stripe.confirmPayment({
        clientSecret
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Payment confirmation failed' }
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/payments/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId
        })
      })

      return response.ok
    } catch (error) {
      return false
    }
  }

  /**
   * Get user subscriptions
   */
  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    try {
      const response = await fetch(`/api/payments/subscriptions?userId=${userId}`)
      const data = await response.json()
      return data.subscriptions || []
    } catch (error) {
      return []
    }
  }

  /**
   * Get donation history
   */
  async getDonationHistory(userId: string): Promise<Donation[]> {
    try {
      const response = await fetch(`/api/payments/donations?userId=${userId}`)
      const data = await response.json()
      return data.donations || []
    } catch (error) {
      return []
    }
  }

  /**
   * Get available products
   */
  getProducts(): PaymentProduct[] {
    return this.products
  }

  /**
   * Get product by ID
   */
  getProduct(productId: string): PaymentProduct | null {
    return this.products.find(p => p.id === productId) || null
  }

  /**
   * Initialize products
   */
  private initializeProducts(): void {
    this.products = [
      {
        id: 'premium_unlock',
        name: 'Premium Unlock',
        description: 'Unlock all premium features',
        price: 1000, // $10.00 in cents
        currency: 'usd',
        type: 'one_time',
        features: [
          'Advanced astrology readings',
          'Detailed numerology analysis',
          'Dream interpretation',
          'Compatibility reports',
          'Priority support'
        ],
        popular: true
      },
      {
        id: 'rectification_premium',
        name: 'Birth Time Rectification',
        description: 'Professional birth time rectification service',
        price: 5000, // $50.00 in cents
        currency: 'usd',
        type: 'one_time',
        features: [
          'Professional astrologer consultation',
          'Detailed birth time analysis',
          'Personalized report',
          'Follow-up support'
        ]
      },
      {
        id: 'compatibility_report',
        name: 'Compatibility Report',
        description: 'Detailed relationship compatibility analysis',
        price: 1000, // $10.00 in cents
        currency: 'usd',
        type: 'one_time',
        features: [
          'Comprehensive compatibility analysis',
          'Relationship insights',
          'Communication tips',
          'Long-term potential'
        ]
      },
      {
        id: 'yearly_pdf',
        name: 'Yearly Cosmic Report',
        description: 'Comprehensive yearly astrology report',
        price: 1500, // $15.00 in cents
        currency: 'usd',
        type: 'one_time',
        features: [
          'Complete yearly forecast',
          'Monthly breakdowns',
          'Important dates',
          'Personalized insights'
        ]
      },
      {
        id: 'meditation_pack',
        name: 'Meditation Pack',
        description: 'Guided meditation collection',
        price: 500, // $5.00 in cents
        currency: 'usd',
        type: 'one_time',
        features: [
          '10 guided meditations',
          'Chakra balancing',
          'Stress relief',
          'Sleep enhancement'
        ]
      },
      {
        id: 'cosmic_premium',
        name: 'Cosmic Premium',
        description: 'Monthly premium subscription',
        price: 999, // $9.99 in cents
        currency: 'usd',
        type: 'subscription',
        features: [
          'All premium features',
          'Daily personalized guidance',
          'Priority support',
          'Exclusive content',
          'Community access'
        ],
        popular: true
      }
    ]
  }

  /**
   * Format price for display
   */
  formatPrice(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100)
  }

  /**
   * Get system status
   */
  getStatus(): {
    initialized: boolean
    stripeLoaded: boolean
    productsCount: number
  } {
    return {
      initialized: this.isInitialized,
      stripeLoaded: this.stripe !== null,
      productsCount: this.products.length
    }
  }
}

// Export singleton instance
export const stripePaymentSystem = new StripePaymentSystem()

