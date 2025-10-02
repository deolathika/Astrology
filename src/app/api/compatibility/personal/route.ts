/**
 * Personal Compatibility API
 * Returns compatibility analysis based on user's actual profile data
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, getUserWithPermissions, checkPermission } from '@/lib/auth/role-middleware'
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

    const profile = userWithPermissions.profiles[0]
    
    if (!profile) {
      return NextResponse.json({ 
        error: 'Profile not found. Please complete your profile first.' 
      }, { status: 404 })
    }

    // Check if user has permission for compatibility checks
    if (!checkPermission(userWithPermissions.role as any, 'canAccessPremiumFeatures') && 
        userWithPermissions.role !== 'admin') {
      
      // Free users get limited compatibility info
      const basicCompatibility = getBasicCompatibility(profile.zodiacSign)
      
      return NextResponse.json({
        success: true,
        data: {
          userProfile: {
            name: profile.fullName,
            zodiacSign: profile.zodiacSign,
            system: profile.system
          },
          basicCompatibility,
          upgradeRequired: true,
          message: 'Upgrade to Premium for detailed compatibility analysis and partner matching.'
        }
      })
    }

    // Get detailed compatibility analysis for premium/admin users
    const { searchParams } = new URL(request.url)
    const partnerZodiacSign = searchParams.get('partnerSign')
    const analysisType = searchParams.get('type') || 'romantic'

    let compatibilityAnalysis

    if (partnerZodiacSign) {
      // Analyze compatibility with specific partner
      compatibilityAnalysis = await analyzeCompatibilityWithPartner(profile, partnerZodiacSign, analysisType)
    } else {
      // Get general compatibility overview
      compatibilityAnalysis = await getGeneralCompatibilityAnalysis(profile)
    }

    return NextResponse.json({
      success: true,
      data: {
        userProfile: {
          name: profile.fullName,
          zodiacSign: profile.zodiacSign,
          system: profile.system,
          birthDate: profile.birthDate,
          birthPlace: profile.birthPlace
        },
        compatibility: compatibilityAnalysis,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Compatibility analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze compatibility' },
      { status: 500 }
    )
  }
}

function getBasicCompatibility(zodiacSign?: string) {
  if (!zodiacSign) {
    return {
      message: 'Complete your profile to see compatibility information.',
      compatibleSigns: [],
      incompatibleSigns: []
    }
  }

  const compatibilityMap = {
    'Aries': {
      mostCompatible: ['Leo', 'Sagittarius'],
      compatible: ['Gemini', 'Aquarius'],
      challenging: ['Cancer', 'Capricorn'],
      leastCompatible: ['Virgo', 'Scorpio']
    },
    'Taurus': {
      mostCompatible: ['Virgo', 'Capricorn'],
      compatible: ['Cancer', 'Pisces'],
      challenging: ['Leo', 'Aquarius'],
      leastCompatible: ['Aries', 'Sagittarius']
    },
    'Gemini': {
      mostCompatible: ['Libra', 'Aquarius'],
      compatible: ['Aries', 'Leo'],
      challenging: ['Virgo', 'Pisces'],
      leastCompatible: ['Taurus', 'Scorpio']
    },
    'Cancer': {
      mostCompatible: ['Scorpio', 'Pisces'],
      compatible: ['Taurus', 'Virgo'],
      challenging: ['Aries', 'Libra'],
      leastCompatible: ['Gemini', 'Sagittarius']
    },
    'Leo': {
      mostCompatible: ['Aries', 'Sagittarius'],
      compatible: ['Gemini', 'Libra'],
      challenging: ['Taurus', 'Scorpio'],
      leastCompatible: ['Cancer', 'Capricorn']
    },
    'Virgo': {
      mostCompatible: ['Taurus', 'Capricorn'],
      compatible: ['Cancer', 'Scorpio'],
      challenging: ['Gemini', 'Sagittarius'],
      leastCompatible: ['Aries', 'Leo']
    },
    'Libra': {
      mostCompatible: ['Gemini', 'Aquarius'],
      compatible: ['Leo', 'Sagittarius'],
      challenging: ['Cancer', 'Capricorn'],
      leastCompatible: ['Virgo', 'Pisces']
    },
    'Scorpio': {
      mostCompatible: ['Cancer', 'Pisces'],
      compatible: ['Virgo', 'Capricorn'],
      challenging: ['Leo', 'Aquarius'],
      leastCompatible: ['Gemini', 'Libra']
    },
    'Sagittarius': {
      mostCompatible: ['Aries', 'Leo'],
      compatible: ['Libra', 'Aquarius'],
      challenging: ['Virgo', 'Pisces'],
      leastCompatible: ['Taurus', 'Cancer']
    },
    'Capricorn': {
      mostCompatible: ['Taurus', 'Virgo'],
      compatible: ['Scorpio', 'Pisces'],
      challenging: ['Aries', 'Libra'],
      leastCompatible: ['Gemini', 'Leo']
    },
    'Aquarius': {
      mostCompatible: ['Gemini', 'Libra'],
      compatible: ['Aries', 'Sagittarius'],
      challenging: ['Taurus', 'Scorpio'],
      leastCompatible: ['Cancer', 'Virgo']
    },
    'Pisces': {
      mostCompatible: ['Cancer', 'Scorpio'],
      compatible: ['Taurus', 'Capricorn'],
      challenging: ['Gemini', 'Sagittarius'],
      leastCompatible: ['Aries', 'Libra']
    }
  }

  const compatibility = compatibilityMap[zodiacSign as keyof typeof compatibilityMap]
  
  if (!compatibility) {
    return {
      message: 'Zodiac sign not recognized.',
      compatibleSigns: [],
      incompatibleSigns: []
    }
  }

  return {
    yourSign: zodiacSign,
    mostCompatible: compatibility.mostCompatible,
    compatible: compatibility.compatible,
    challenging: compatibility.challenging,
    leastCompatible: compatibility.leastCompatible,
    summary: `As a ${zodiacSign}, you're most compatible with ${compatibility.mostCompatible.join(' and ')} signs.`
  }
}

async function analyzeCompatibilityWithPartner(userProfile: any, partnerSign: string, analysisType: string) {
  const userSign = userProfile.zodiacSign
  
  if (!userSign) {
    throw new Error('User zodiac sign not found')
  }

  // Calculate compatibility score (0-100)
  const compatibilityScore = calculateCompatibilityScore(userSign, partnerSign)
  
  // Get detailed analysis
  const analysis = getDetailedCompatibilityAnalysis(userSign, partnerSign, analysisType)
  
  // Get element and modality compatibility
  const elementCompatibility = getElementCompatibility(userSign, partnerSign)
  const modalityCompatibility = getModalityCompatibility(userSign, partnerSign)

  return {
    partnerSign,
    analysisType,
    compatibilityScore,
    rating: getCompatibilityRating(compatibilityScore),
    analysis,
    elementCompatibility,
    modalityCompatibility,
    strengths: getRelationshipStrengths(userSign, partnerSign),
    challenges: getRelationshipChallenges(userSign, partnerSign),
    advice: getRelationshipAdvice(userSign, partnerSign, analysisType)
  }
}

async function getGeneralCompatibilityAnalysis(userProfile: any) {
  const userSign = userProfile.zodiacSign
  
  if (!userSign) {
    throw new Error('User zodiac sign not found')
  }

  const basicCompatibility = getBasicCompatibility(userSign)
  
  // Get potential matches from database (mock for now)
  const potentialMatches = await findPotentialMatches(userProfile)
  
  return {
    overview: basicCompatibility,
    potentialMatches,
    recommendations: getCompatibilityRecommendations(userSign),
    insights: getPersonalityInsights(userSign)
  }
}

function calculateCompatibilityScore(sign1: string, sign2: string): number {
  // Simplified compatibility scoring based on traditional astrology
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    'Aries': { 'Leo': 95, 'Sagittarius': 90, 'Gemini': 85, 'Aquarius': 80, 'Libra': 75, 'Aries': 70, 'Scorpio': 65, 'Pisces': 60, 'Taurus': 55, 'Virgo': 50, 'Cancer': 45, 'Capricorn': 40 },
    'Taurus': { 'Virgo': 95, 'Capricorn': 90, 'Cancer': 85, 'Pisces': 80, 'Scorpio': 75, 'Taurus': 70, 'Leo': 65, 'Aquarius': 60, 'Gemini': 55, 'Sagittarius': 50, 'Aries': 45, 'Libra': 40 },
    // Add more combinations as needed...
  }

  return compatibilityMatrix[sign1]?.[sign2] || 
         compatibilityMatrix[sign2]?.[sign1] || 
         Math.floor(Math.random() * 40) + 40 // Fallback random score between 40-80
}

function getCompatibilityRating(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Fair'
  if (score >= 50) return 'Challenging'
  return 'Difficult'
}

function getDetailedCompatibilityAnalysis(userSign: string, partnerSign: string, analysisType: string): string {
  // This would be much more detailed in a real implementation
  const analyses = {
    romantic: `The romantic connection between ${userSign} and ${partnerSign} brings unique dynamics to your relationship.`,
    friendship: `As friends, ${userSign} and ${partnerSign} can create a meaningful and supportive bond.`,
    business: `In business partnerships, ${userSign} and ${partnerSign} can complement each other's strengths.`
  }
  
  return analyses[analysisType as keyof typeof analyses] || analyses.romantic
}

function getElementCompatibility(sign1: string, sign2: string) {
  const elements = {
    'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
    'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
    'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
    'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
  }
  
  const element1 = elements[sign1 as keyof typeof elements]
  const element2 = elements[sign2 as keyof typeof elements]
  
  return {
    userElement: element1,
    partnerElement: element2,
    compatibility: element1 === element2 ? 'Same Element - Natural Understanding' : 'Different Elements - Complementary Energy'
  }
}

function getModalityCompatibility(sign1: string, sign2: string) {
  const modalities = {
    'Aries': 'Cardinal', 'Cancer': 'Cardinal', 'Libra': 'Cardinal', 'Capricorn': 'Cardinal',
    'Taurus': 'Fixed', 'Leo': 'Fixed', 'Scorpio': 'Fixed', 'Aquarius': 'Fixed',
    'Gemini': 'Mutable', 'Virgo': 'Mutable', 'Sagittarius': 'Mutable', 'Pisces': 'Mutable'
  }
  
  const modality1 = modalities[sign1 as keyof typeof modalities]
  const modality2 = modalities[sign2 as keyof typeof modalities]
  
  return {
    userModality: modality1,
    partnerModality: modality2,
    compatibility: modality1 === modality2 ? 'Same Modality - Similar Approach' : 'Different Modalities - Balanced Dynamic'
  }
}

function getRelationshipStrengths(sign1: string, sign2: string): string[] {
  // Simplified - would be more comprehensive in real implementation
  return [
    'Strong emotional connection',
    'Complementary communication styles',
    'Shared values and goals',
    'Mutual respect and understanding'
  ]
}

function getRelationshipChallenges(sign1: string, sign2: string): string[] {
  // Simplified - would be more comprehensive in real implementation
  return [
    'Different approaches to conflict resolution',
    'Varying needs for independence vs. togetherness',
    'Communication style differences'
  ]
}

function getRelationshipAdvice(sign1: string, sign2: string, analysisType: string): string {
  return `Focus on open communication and understanding each other's unique perspectives. Embrace your differences as opportunities for growth.`
}

async function findPotentialMatches(userProfile: any) {
  // Mock potential matches - in production, this would query actual users
  const compatibleSigns = getBasicCompatibility(userProfile.zodiacSign).mostCompatible
  
  return compatibleSigns.map(sign => ({
    zodiacSign: sign,
    compatibility: calculateCompatibilityScore(userProfile.zodiacSign, sign),
    matchType: 'High Compatibility'
  }))
}

function getCompatibilityRecommendations(zodiacSign: string): string[] {
  return [
    'Focus on building emotional intelligence',
    'Practice active listening in relationships',
    'Be open to different perspectives',
    'Communicate your needs clearly'
  ]
}

function getPersonalityInsights(zodiacSign: string): string {
  const insights = {
    'Aries': 'You bring passion and energy to relationships, but remember to balance independence with partnership.',
    'Taurus': 'Your stability and loyalty are your greatest relationship assets. Stay open to change and growth.',
    'Gemini': 'Your communication skills and adaptability make you an engaging partner. Focus on emotional depth.',
    // Add more as needed...
  }
  
  return insights[zodiacSign as keyof typeof insights] || 'You have unique qualities that make you a special partner.'
}
