export const subscriptionPlans = {
  free: {
    id: 'free',
    name: 'Free User',
    description: 'Perfect for getting started with cosmic guidance',
    price: 0,
    period: 'forever',
    features: [
      'Daily cosmic insights (3 per day)',
      'Basic numerology readings',
      'Simple astrology charts',
      'Community access',
      'Basic compatibility check',
      'Basic dream interpretation'
    ],
    limitations: [
      'Limited to 3 readings per day',
      'Basic chart only',
      'No expert consultations',
      'No advanced features'
    ],
    maxUsage: {
      dailyInsights: 3,
      expertConsultations: 0,
      compatibilityChecks: 5
    }
  },
  premium: {
    id: 'premium',
    name: 'Premium User',
    description: 'Complete cosmic guidance for your daily life',
    price: 19.99,
    period: 'month',
    features: [
      'Unlimited daily insights',
      'Advanced numerology analysis',
      'Detailed astrology charts',
      'Expert consultations (2/month)',
      'Advanced compatibility analysis',
      'AI-powered dream interpretations',
      'Personalized cosmic calendar',
      'Priority customer support',
      'Advanced Vedic astrology',
      'Custom cosmic rituals'
    ],
    limitations: [],
    maxUsage: {
      dailyInsights: -1, // Unlimited
      expertConsultations: 2,
      compatibilityChecks: -1 // Unlimited
    }
  },
  admin: {
    id: 'admin',
    name: 'Admin Account',
    description: 'Full control and customization for the entire application',
    price: 99.99,
    period: 'month',
    features: [
      'All premium features',
      'Unlimited expert consultations',
      'Personal astrologer assigned',
      'Advanced Vedic astrology',
      'Custom cosmic rituals',
      'Admin dashboard access',
      'User management tools',
      'Content moderation',
      'Analytics and insights',
      'Custom integrations',
      'API access',
      'White-label options'
    ],
    limitations: [],
    maxUsage: {
      dailyInsights: -1, // Unlimited
      expertConsultations: -1, // Unlimited
      compatibilityChecks: -1 // Unlimited
    }
  }
} as const

export type SubscriptionPlanId = keyof typeof subscriptionPlans
export type SubscriptionPlan = typeof subscriptionPlans[SubscriptionPlanId]


