/**
 * Personalized Dashboard API
 * Returns user-specific data based on their profile and role
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database-optimized'
import { handleApiError } from '@/lib/error-handler'

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, we'll accept a user ID from query params
    // In production, this would come from a proper session/token
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get user and profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profiles: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.profiles || user.profiles.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Get user's usage statistics
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Mock usage data - in production, this would come from actual usage tracking
    const usageStats = {
      dailyInsights: Math.floor(Math.random() * 10),
      compatibilityChecks: Math.floor(Math.random() * 5),
      expertConsultations: Math.floor(Math.random() * 3)
    }

    const profile = user.profiles[0]
    
    // Personalized content based on user's profile
    const personalizedContent = {
      greeting: `Welcome back, ${user.name || 'Cosmic Explorer'}!`,
      zodiacSign: profile.name || 'Unknown',
      system: profile.systemPref || 'western',
      birthPlace: profile.placeLabel || 'Unknown',
      
      // Today's personalized insights
      todaysInsight: generatePersonalizedInsight(profile),
      
      // Lucky elements based on user's data
      luckyNumbers: generateLuckyNumbers(profile),
      luckyColors: generateLuckyColors(profile.name),
      
      // Compatibility suggestions (for premium/admin users)
      compatibilitySuggestions: (user.role === 'premium' || user.role === 'admin')
        ? await getCompatibilitySuggestions(user.id, profile)
        : null
    }

    // Role-specific dashboard data
    const dashboardData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: {
          name: profile.name,
          birthDate: profile.birthDate,
          birthTime: profile.birthTime,
          placeLabel: profile.placeLabel,
          systemPref: profile.systemPref,
          localePref: profile.localePref
        }
      },
      
      usage: {
        current: usageStats,
        limits: {
          dailyInsights: user.role === 'user' ? 3 : -1,
          compatibilityChecks: user.role === 'user' ? 1 : -1,
          expertConsultations: user.role === 'user' ? 0 : -1
        }
      },
      
      personalizedContent,
      
      // Available features based on role
      availableFeatures: getAvailableFeatures(user.role),
      
      // Admin-specific data
      ...(user.role === 'admin' && {
        adminData: await getAdminDashboardData()
      })
    }

    return NextResponse.json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return handleApiError(error)
  }
}

function generatePersonalizedInsight(profile: any): string {
  if (!profile?.name) {
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

  return insights[profile.name as keyof typeof insights] || 
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

  return Array.from(new Set(numbers)).slice(0, 5).sort((a, b) => a - b)
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
  if (!profile?.name) {
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

  const compatible = compatibleSigns[profile.name as keyof typeof compatibleSigns] || []
  
  return {
    mostCompatible: compatible[0],
    compatibleSigns: compatible,
    suggestion: `As a ${profile.name}, you have natural harmony with ${compatible.join(', ')} signs.`
  }
}

function getAvailableFeatures(role: string) {
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
