import { subscriptionPlans } from './subscription-plans'

export interface UserSubscription {
  userId: string
  planId: string
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  startDate: string
  endDate: string
  autoRenew: boolean
  features: string[]
  usage: {
    dailyInsights: number
    expertConsultations: number
    compatibilityChecks: number
  }
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  period: string
  features: string[]
  limitations: string[]
  maxUsage: {
    dailyInsights: number
    expertConsultations: number
    compatibilityChecks: number
  }
}

export class SubscriptionService {
  private static instance: SubscriptionService
  private subscriptions: Map<string, UserSubscription> = new Map()

  static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService()
    }
    return SubscriptionService.instance
  }

  /**
   * Get user's current subscription
   */
  async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    // In production, this would fetch from database
    const subscription = this.subscriptions.get(userId)
    if (subscription) {
      return subscription
    }

    // Default to free plan for new users
    const freePlan = subscriptionPlans.free
    const defaultSubscription: UserSubscription = {
      userId,
      planId: 'free',
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      autoRenew: false,
      features: [...freePlan.features],
      usage: {
        dailyInsights: 0,
        expertConsultations: 0,
        compatibilityChecks: 0
      }
    }

    this.subscriptions.set(userId, defaultSubscription)
    return defaultSubscription
  }

  /**
   * Check if user has access to a feature
   */
  async hasFeatureAccess(userId: string, feature: string): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId)
    if (!subscription) return false

    return subscription.features.includes(feature)
  }

  /**
   * Check if user can use a feature (considering usage limits)
   */
  async canUseFeature(userId: string, feature: string): Promise<{ canUse: boolean; reason?: string }> {
    const subscription = await this.getUserSubscription(userId)
    if (!subscription) {
      return { canUse: false, reason: 'No subscription found' }
    }

    const plan = subscriptionPlans[subscription.planId as keyof typeof subscriptionPlans]
    if (!plan) {
      return { canUse: false, reason: 'Invalid plan' }
    }

    // Check if feature is included in plan
    if (!subscription.features.includes(feature)) {
      return { canUse: false, reason: 'Feature not included in your plan' }
    }

    // Check usage limits
    switch (feature) {
      case 'daily_insights':
        if (subscription.usage.dailyInsights >= plan.maxUsage.dailyInsights) {
          return { canUse: false, reason: 'Daily insights limit reached' }
        }
        break
      case 'expert_consultations':
        if (subscription.usage.expertConsultations >= plan.maxUsage.expertConsultations) {
          return { canUse: false, reason: 'Expert consultations limit reached' }
        }
        break
      case 'compatibility_checks':
        if (subscription.usage.compatibilityChecks >= plan.maxUsage.compatibilityChecks) {
          return { canUse: false, reason: 'Compatibility checks limit reached' }
        }
        break
    }

    return { canUse: true }
  }

  /**
   * Update usage for a feature
   */
  async updateUsage(userId: string, feature: string, increment: number = 1): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId)
    if (!subscription) return false

    const canUse = await this.canUseFeature(userId, feature)
    if (!canUse.canUse) return false

    // Update usage
    switch (feature) {
      case 'daily_insights':
        subscription.usage.dailyInsights += increment
        break
      case 'expert_consultations':
        subscription.usage.expertConsultations += increment
        break
      case 'compatibility_checks':
        subscription.usage.compatibilityChecks += increment
        break
    }

    this.subscriptions.set(userId, subscription)
    return true
  }

  /**
   * Subscribe user to a plan
   */
  async subscribe(userId: string, planId: string, paymentMethod?: string): Promise<UserSubscription> {
    const plan = subscriptionPlans[planId as keyof typeof subscriptionPlans]
    if (!plan) {
      throw new Error('Invalid plan ID')
    }

    const newSubscription: UserSubscription = {
      userId,
      planId,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      autoRenew: true,
      features: [...plan.features],
      usage: {
        dailyInsights: 0,
        expertConsultations: 0,
        compatibilityChecks: 0
      }
    }

    this.subscriptions.set(userId, newSubscription)
    return newSubscription
  }

  /**
   * Cancel user's subscription
   */
  async cancelSubscription(userId: string): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId)
    if (!subscription) return false

    subscription.status = 'cancelled'
    subscription.autoRenew = false
    this.subscriptions.set(userId, subscription)
    return true
  }

  /**
   * Get subscription plans
   */
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Object.values(subscriptionPlans).map(plan => ({
      ...plan,
      features: [...plan.features],
      limitations: [...plan.limitations]
    }))
  }

  /**
   * Reset daily usage (called by cron job)
   */
  async resetDailyUsage(): Promise<void> {
    for (const [userId, subscription] of Array.from(this.subscriptions.entries())) {
      subscription.usage.dailyInsights = 0
      this.subscriptions.set(userId, subscription)
    }
  }

  /**
   * Get user's usage statistics
   */
  async getUserUsage(userId: string): Promise<{
    current: UserSubscription['usage']
    limits: SubscriptionPlan['maxUsage']
    resetDate: string
  } | null> {
    const subscription = await this.getUserSubscription(userId)
    if (!subscription) return null

    const plan = subscriptionPlans[subscription.planId as keyof typeof subscriptionPlans]
    if (!plan) return null

    return {
      current: subscription.usage,
      limits: plan.maxUsage,
      resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Next day
    }
  }
}

export const subscriptionService = SubscriptionService.getInstance()


