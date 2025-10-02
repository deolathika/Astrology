/**
 * Personalized Dashboard API
 * Returns user-specific data based on their profile and role
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, getUserWithPermissions, UserRole } from '@/lib/auth/role-middleware'
import { prisma } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request)
    
    if (session instanceof NextResponse) {
      return session
    }

    const userWithPermissions = await getUserWithPermissions(session.user.id)
    
    if (!userWithPermissions) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userRole = userWithPermissions.role as UserRole
    const permissions = userWithPermissions.permissions
    const profile = userWithPermissions.profiles[0]

    // Get user's usage statistics
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Mock usage data - in production, this would come from actual usage tracking
    const usageStats = {
      dailyInsights: Math.floor(Math.random() * (permissions.dailyInsightLimit === -1 ? 10 : permissions.dailyInsightLimit)),
      compatibilityChecks: Math.floor(Math.random() * (permissions.compatibilityChecksLimit === -1 ? 5 : permissions.compatibilityChecksLimit)),
      expertConsultations: Math.floor(Math.random() * (permissions.expertConsultationsLimit === -1 ? 3 : permissions.expertConsultationsLimit))
    }

    // Personalized content based on user's profile
    const personalizedContent = {
      greeting: `Welcome back, ${userWithPermissions.name || 'Cosmic Explorer'}!`,
      zodiacSign: profile?.zodiacSign || 'Unknown',
      system: profile?.system || 'western',
      birthPlace: profile?.birthPlace || 'Unknown',
      
      // Today's personalized insights
      todaysInsight: generatePersonalizedInsight(profile),
      
      // Lucky elements based on user's data
      luckyNumbers: generateLuckyNumbers(profile),
      luckyColors: generateLuckyColors(profile?.zodiacSign),
      
      // Compatibility suggestions (for premium/admin users)
      compatibilitySuggestions: permissions.canAccessPremiumFeatures 
        ? await getCompatibilitySuggestions(userWithPermissions.id, profile)
        : null
    }

    // Role-specific dashboard data
    const dashboardData = {
      user: {
        id: userWithPermissions.id,
        name: userWithPermissions.name,
        email: userWithPermissions.email,
        role: userRole,
        createdAt: userWithPermissions.createdAt,
        profile: profile ? {
          fullName: profile.fullName,
          birthDate: profile.birthDate,
          birthTime: profile.birthTime,
          birthPlace: profile.birthPlace,
          zodiacSign: profile.zodiacSign,
          system: profile.system,
          language: profile.language
        } : null
      },
      
      permissions,
      
      usage: {
        current: usageStats,
        limits: {
          dailyInsights: permissions.dailyInsightLimit,
          compatibilityChecks: permissions.compatibilityChecksLimit,
          expertConsultations: permissions.expertConsultationsLimit
        }
      },
      
      personalizedContent,
      
      // Available features based on role
      availableFeatures: getAvailableFeatures(userRole),
      
      // Admin-specific data
      ...(userRole === 'admin' && {
        adminData: await getAdminDashboardData()
      })
    }

    return NextResponse.json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Personalized dashboard error:', error)
    return NextResponse.json(
      { error: 'Failed to load personalized dashboard' },
      { status: 500 }
    )
  }
}

function generatePersonalizedInsight(profile: any): string {
  if (!profile?.zodiacSign) {
    return "Welcome to your cosmic journey! Complete your profile to receive personalized insights."
  }

  const insights = {
    'Aries': "Your fiery energy is particularly strong today. Channel it into creative projects.",
    'Taurus': "Stability and patience will serve you well. Focus on building lasting foundations.",
    'Gemini': "Communication flows easily today. Share your ideas with others.",
    'Cancer': "Trust your intuition. Your emotional intelligence guides you to the right path.",
    'Leo': "Your natural leadership shines bright. Inspire others with your confidence.",
    'Virgo': "Attention to detail brings success. Perfect your craft with methodical precision.",
    'Libra': "Harmony and balance are your superpowers. Mediate conflicts with grace.",
    'Scorpio': "Deep transformation is possible. Embrace change and personal growth.",
    'Sagittarius': "Adventure calls to you. Expand your horizons through learning and travel.",
    'Capricorn': "Discipline and ambition lead to achievement. Climb your mountain steadily.",
    'Aquarius': "Innovation and originality set you apart. Think outside the box.",
    'Pisces': "Compassion and creativity flow through you. Help others with your gifts."
  }

  return insights[profile.zodiacSign as keyof typeof insights] || 
         "The stars have a special message for you today. Stay open to cosmic guidance."
}

function generateLuckyNumbers(profile: any): number[] {
  if (!profile?.birthDate) {
    return [7, 14, 21] // Default lucky numbers
  }

  const birthDate = new Date(profile.birthDate)
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()

  // Generate numbers based on birth date
  const numbers = [
    day,
    month,
    (day + month) % 31 + 1,
    (year % 100) % 31 + 1,
    ((day * month) % 31) + 1
  ]

  return [...new Set(numbers)].slice(0, 5).sort((a, b) => a - b)
}

function generateLuckyColors(zodiacSign?: string): string[] {
  const colorMap = {
    'Aries': ['Red', 'Orange', 'Gold'],
    'Taurus': ['Green', 'Pink', 'Earth tones'],
    'Gemini': ['Yellow', 'Silver', 'Light Blue'],
    'Cancer': ['White', 'Silver', 'Sea Blue'],
    'Leo': ['Gold', 'Orange', 'Royal Purple'],
    'Virgo': ['Navy Blue', 'Grey', 'Brown'],
    'Libra': ['Pink', 'Light Blue', 'Lavender'],
    'Scorpio': ['Deep Red', 'Black', 'Maroon'],
    'Sagittarius': ['Purple', 'Turquoise', 'Orange'],
    'Capricorn': ['Black', 'Brown', 'Dark Green'],
    'Aquarius': ['Electric Blue', 'Silver', 'Violet'],
    'Pisces': ['Sea Green', 'Lavender', 'White']
  }

  return colorMap[zodiacSign as keyof typeof colorMap] || ['Blue', 'Green', 'Purple']
}

async function getCompatibilitySuggestions(userId: string, profile: any) {
  if (!profile?.zodiacSign) {
    return null
  }

  // Mock compatibility data - in production, this would be more sophisticated
  const compatibleSigns = {
    'Aries': ['Leo', 'Sagittarius', 'Gemini'],
    'Taurus': ['Virgo', 'Capricorn', 'Cancer'],
    'Gemini': ['Libra', 'Aquarius', 'Aries'],
    'Cancer': ['Scorpio', 'Pisces', 'Taurus'],
    'Leo': ['Aries', 'Sagittarius', 'Gemini'],
    'Virgo': ['Taurus', 'Capricorn', 'Cancer'],
    'Libra': ['Gemini', 'Aquarius', 'Leo'],
    'Scorpio': ['Cancer', 'Pisces', 'Virgo'],
    'Sagittarius': ['Aries', 'Leo', 'Libra'],
    'Capricorn': ['Taurus', 'Virgo', 'Scorpio'],
    'Aquarius': ['Gemini', 'Libra', 'Sagittarius'],
    'Pisces': ['Cancer', 'Scorpio', 'Capricorn']
  }

  const compatible = compatibleSigns[profile.zodiacSign as keyof typeof compatibleSigns] || []
  
  return {
    mostCompatible: compatible[0],
    compatibleSigns: compatible,
    suggestion: `As a ${profile.zodiacSign}, you have natural harmony with ${compatible.join(', ')} signs.`
  }
}

function getAvailableFeatures(role: UserRole) {
  const baseFeatures = [
    'Daily Cosmic Insights',
    'Basic Numerology',
    'Zodiac Information',
    'Profile Management'
  ]

  const premiumFeatures = [
    'Unlimited Insights',
    'Advanced Numerology',
    'Compatibility Analysis',
    'Expert Consultations',
    'Detailed Charts'
  ]

  const adminFeatures = [
    'User Management',
    'System Administration',
    'Analytics Dashboard',
    'Content Management',
    'System Configuration'
  ]

  switch (role) {
    case 'admin':
      return [...baseFeatures, ...premiumFeatures, ...adminFeatures]
    case 'premium':
      return [...baseFeatures, ...premiumFeatures]
    case 'user':
    default:
      return baseFeatures
  }
}

async function getAdminDashboardData() {
  // Mock admin data - in production, this would come from actual system metrics
  return {
    systemStats: {
      totalUsers: 1250,
      activeUsers: 780,
      premiumUsers: 340,
      newUsersToday: 23,
      systemHealth: 'Good',
      serverLoad: 45
    },
    recentActivity: [
      { action: 'User Registration', count: 12, timestamp: new Date() },
      { action: 'Premium Upgrades', count: 3, timestamp: new Date() },
      { action: 'API Calls', count: 1543, timestamp: new Date() }
    ]
  }
}
