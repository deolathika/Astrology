/**
 * User Flow Manager
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Manages user flow logic, role-based routing, and access control
 * for Daily Secrets application
 */

export interface UserFlowConfig {
  guest: GuestFlow
  premium: PremiumUserFlow
  admin: AdminUserFlow
}

export interface GuestFlow {
  allowedRoutes: string[]
  features: {
    dailyAstrology: boolean
    dailyNumerology: boolean
    dailyQuote: boolean
    basicCompatibility: boolean
    profileEdit: boolean
    communityAccess: boolean
  }
  restrictions: {
    contentLength: number
    dailyInsights: number
    premiumContent: 'blurred' | 'truncated' | 'hidden'
  }
}

export interface PremiumUserFlow {
  allowedRoutes: string[]
  features: {
    dailyAstrology: boolean
    dailyNumerology: boolean
    dailyQuote: boolean
    fullCompatibility: boolean
    dreamAnalysis: boolean
    aiChat: boolean
    profileEdit: boolean
    communityAccess: boolean
    premiumDashboard: boolean
    pdfExport: boolean
    socialStories: boolean
  }
  restrictions: {
    contentLength: number
    dailyInsights: number
    premiumContent: 'full'
  }
}

export interface AdminUserFlow {
  allowedRoutes: string[]
  features: {
    allUserFeatures: boolean
    userManagement: boolean
    contentManagement: boolean
    systemSettings: boolean
    analytics: boolean
    themeCustomization: boolean
    subscriptionManagement: boolean
  }
  restrictions: {
    contentLength: number
    dailyInsights: number
    premiumContent: 'full'
  }
}

export class UserFlowManager {
  private static instance: UserFlowManager
  private config: UserFlowConfig

  constructor() {
    this.config = {
      guest: {
        allowedRoutes: [
          '/',
          '/dashboard',
          '/profile',
          '/numerology',
          '/astrology',
          '/compatibility',
          '/community',
          '/settings',
          '/about',
          '/terms',
          '/privacy',
          '/faq',
          '/contact',
          '/vision',
          '/mission',
          '/dmca'
        ],
        features: {
          dailyAstrology: true,
          dailyNumerology: true,
          dailyQuote: true,
          basicCompatibility: true,
          profileEdit: true,
          communityAccess: true
        },
        restrictions: {
          contentLength: 400,
          dailyInsights: 5,
          premiumContent: 'blurred'
        }
      },
      premium: {
        allowedRoutes: [
          '/',
          '/dashboard',
          '/premium',
          '/profile',
          '/numerology',
          '/astrology',
          '/compatibility',
          '/dreams',
          '/ai-chat',
          '/community',
          '/settings',
          '/about',
          '/terms',
          '/privacy',
          '/faq',
          '/contact',
          '/vision',
          '/mission',
          '/dmca'
        ],
        features: {
          dailyAstrology: true,
          dailyNumerology: true,
          dailyQuote: true,
          fullCompatibility: true,
          dreamAnalysis: true,
          aiChat: true,
          profileEdit: true,
          communityAccess: true,
          premiumDashboard: true,
          pdfExport: true,
          socialStories: true
        },
        restrictions: {
          contentLength: 1000,
          dailyInsights: -1, // unlimited
          premiumContent: 'full'
        }
      },
      admin: {
        allowedRoutes: [
          '/',
          '/dashboard',
          '/premium',
          '/admin',
          '/profile',
          '/numerology',
          '/astrology',
          '/compatibility',
          '/dreams',
          '/ai-chat',
          '/community',
          '/settings',
          '/about',
          '/terms',
          '/privacy',
          '/faq',
          '/contact',
          '/vision',
          '/mission',
          '/dmca'
        ],
        features: {
          allUserFeatures: true,
          userManagement: true,
          contentManagement: true,
          systemSettings: true,
          analytics: true,
          themeCustomization: true,
          subscriptionManagement: true
        },
        restrictions: {
          contentLength: 1000,
          dailyInsights: -1, // unlimited
          premiumContent: 'full'
        }
      }
    }
  }

  static getInstance(): UserFlowManager {
    if (!UserFlowManager.instance) {
      UserFlowManager.instance = new UserFlowManager()
    }
    return UserFlowManager.instance
  }

  /**
   * Get user flow configuration based on role
   */
  getUserFlow(role: string): GuestFlow | PremiumUserFlow | AdminUserFlow {
    switch (role) {
      case 'admin':
        return this.config.admin
      case 'premium':
        return this.config.premium
      case 'guest':
      case 'user': // Legacy support for existing 'user' role
        return this.config.guest
      default:
        return this.config.guest
    }
  }

  /**
   * Check if user can access a route
   */
  canAccessRoute(role: string, route: string): boolean {
    const userFlow = this.getUserFlow(role)
    return userFlow.allowedRoutes.includes(route)
  }

  /**
   * Check if user can access a feature
   */
  canAccessFeature(role: string, feature: string): boolean {
    const userFlow = this.getUserFlow(role)
    
    switch (feature) {
      case 'dailyAstrology':
        return 'dailyAstrology' in userFlow.features ? userFlow.features.dailyAstrology : false
      case 'dailyNumerology':
        return 'dailyNumerology' in userFlow.features ? userFlow.features.dailyNumerology : false
      case 'dailyQuote':
        return 'dailyQuote' in userFlow.features ? userFlow.features.dailyQuote : false
      case 'compatibility':
        return 'basicCompatibility' in userFlow.features || 'fullCompatibility' in userFlow.features
      case 'dreamAnalysis':
        return 'dreamAnalysis' in userFlow.features && userFlow.features.dreamAnalysis
      case 'aiChat':
        return 'aiChat' in userFlow.features && userFlow.features.aiChat
      case 'profileEdit':
        return 'profileEdit' in userFlow.features ? userFlow.features.profileEdit : false
      case 'communityAccess':
        return 'communityAccess' in userFlow.features && userFlow.features.communityAccess
      case 'premiumDashboard':
        return 'premiumDashboard' in userFlow.features && userFlow.features.premiumDashboard
      case 'pdfExport':
        return 'pdfExport' in userFlow.features && userFlow.features.pdfExport
      case 'socialStories':
        return 'socialStories' in userFlow.features && userFlow.features.socialStories
      default:
        return false
    }
  }

  /**
   * Get content restrictions for user
   */
  getContentRestrictions(role: string): {
    contentLength: number
    dailyInsights: number
    premiumContent: 'blurred' | 'truncated' | 'hidden' | 'full'
  } {
    const userFlow = this.getUserFlow(role)
    return userFlow.restrictions
  }

  /**
   * Get redirect route for user after login
   */
  getRedirectRoute(role: string): string {
    switch (role) {
      case 'admin':
        return '/admin'
      case 'premium':
        return '/premium'
      case 'guest':
        return '/dashboard'
      default:
        return '/'
    }
  }

  /**
   * Check if user needs upgrade for feature
   */
  needsUpgrade(role: string, feature: string): boolean {
    if (role === 'admin' || role === 'premium') {
      return false
    }
    
    const premiumFeatures = [
      'dreamAnalysis',
      'aiChat',
      'premiumDashboard',
      'pdfExport',
      'socialStories',
      'fullCompatibility'
    ]
    
    return premiumFeatures.includes(feature)
  }

  /**
   * Get upgrade prompt message
   */
  getUpgradePrompt(feature: string): string {
    const prompts = {
      dreamAnalysis: 'Unlock AI-powered dream analysis with premium subscription',
      aiChat: 'Access unlimited AI cosmic guidance with premium subscription',
      premiumDashboard: 'Get your personalized premium dashboard with premium subscription',
      pdfExport: 'Export your cosmic reports as PDF with premium subscription',
      socialStories: 'Create beautiful cosmic social stories with premium subscription',
      fullCompatibility: 'Get detailed compatibility reports with premium subscription'
    }
    
    return prompts[feature as keyof typeof prompts] || 'Upgrade to premium for this feature'
  }

  /**
   * Get zodiac system based on user location
   */
  getZodiacSystem(country: string, locale: string): string {
    // Auto-detect zodiac system based on country/locale
    const systemMap: { [key: string]: string } = {
      'LK': 'sri_lankan', // Sri Lanka
      'IN': 'vedic',      // India
      'CN': 'chinese',    // China
      'KR': 'chinese',    // South Korea
      'JP': 'chinese',    // Japan
      'TH': 'chinese',    // Thailand
      'VN': 'chinese',    // Vietnam
      'US': 'western',    // United States
      'CA': 'western',    // Canada
      'GB': 'western',    // United Kingdom
      'AU': 'western',    // Australia
      'DE': 'western',    // Germany
      'FR': 'western',    // France
      'IT': 'western',    // Italy
      'ES': 'western',    // Spain
      'BR': 'western',    // Brazil
      'MX': 'western',    // Mexico
      'AR': 'western',    // Argentina
      'RU': 'western',    // Russia
      'ZA': 'western'     // South Africa
    }
    
    return systemMap[country] || 'western'
  }

  /**
   * Get user onboarding steps
   */
  getOnboardingSteps(role: string): string[] {
    const baseSteps = [
      'welcome',
      'personal_info',
      'birth_details',
      'preferences',
      'complete'
    ]
    
    if (role === 'premium' || role === 'admin') {
      return [...baseSteps, 'premium_features', 'dashboard_tour']
    }
    
    return baseSteps
  }

  /**
   * Get feature teaser content for free users
   */
  getFeatureTeaser(feature: string): {
    title: string
    description: string
    benefits: string[]
    cta: string
  } {
    const teasers = {
      dreamAnalysis: {
        title: 'AI Dream Analysis',
        description: 'Unlock the secrets of your dreams with our advanced AI interpretation system.',
        benefits: [
          'Symbol recognition and interpretation',
          'Emotional tone analysis',
          'Recurring dream patterns',
          'Personalized dream journal'
        ],
        cta: 'Upgrade to Premium'
      },
      aiChat: {
        title: 'Cosmic AI Chat',
        description: 'Get personalized cosmic guidance from our advanced AI assistant.',
        benefits: [
          '24/7 cosmic guidance',
          'Personalized insights',
          'Real-time astrological updates',
          'Unlimited questions'
        ],
        cta: 'Upgrade to Premium'
      },
      premiumDashboard: {
        title: 'Premium Dashboard',
        description: 'Access your personalized cosmic command center with advanced insights.',
        benefits: [
          'Finance & career insights',
          'Relationship compatibility',
          'Personal report generator',
          'PDF export capabilities'
        ],
        cta: 'Upgrade to Premium'
      }
    }
    
    return teasers[feature as keyof typeof teasers] || {
      title: 'Premium Feature',
      description: 'This feature is available with premium subscription.',
      benefits: ['Enhanced experience', 'Advanced features', 'Priority support'],
      cta: 'Upgrade to Premium'
    }
  }
}

export const userFlowManager = UserFlowManager.getInstance()
