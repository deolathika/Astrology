import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/database'
import { requireAuth } from '@/lib/auth/role-middleware'
import { applyRateLimit, rateLimiters } from '@/lib/security/rate-limiting'
import { applySecurityHeaders } from '@/lib/security/security-headers'
import { withCSRF } from '@/lib/security/csrf-protection'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    
    if (user instanceof NextResponse) {
      return user
    }

    // Get user settings from database
    const userSettings = await prisma.userSettings.findUnique({
      where: { userId: user.id }
    })

    // Get user profile for astrology settings
    const profile = await prisma.profile.findFirst({
      where: { userId: user.id }
    })

    const settings = {
      // General settings
      language: userSettings?.language || 'en',
      theme: userSettings?.theme || 'auto',
      timezone: userSettings?.timezone || 'UTC',
      
      // Notification settings
      notifications: {
        daily: userSettings?.dailyInsights || true,
        transits: userSettings?.cosmicEvents || true,
        community: userSettings?.compatibilityUpdates || true,
        system: userSettings?.pushNotifications || true,
        email: userSettings?.emailNotifications || true
      },
      
      // Privacy settings
      privacy: {
        profileVisible: userSettings?.profileVisibility || true,
        dataSharing: userSettings?.dataSharing || false,
        analytics: userSettings?.analytics || true,
        crashReports: userSettings?.crashReports || true
      },
      
      // Astrology settings
      astrology: {
        system: userSettings?.astrologySystem || profile?.systemPref || 'western',
        houseSystem: userSettings?.houseSystem || 'placidus',
        ayanamsa: userSettings?.ayanamsa || 'lahiri',
        orbs: userSettings?.aspectOrbs ? JSON.parse(userSettings.aspectOrbs) : {
          conjunction: 8,
          opposition: 8,
          trine: 6,
          square: 6,
          sextile: 4,
          quincunx: 3
        },
        aspects: userSettings?.aspectTypes ? JSON.parse(userSettings.aspectTypes) : {
          major: true,
          minor: false,
          quincunx: true,
          semisextile: false
        },
        planets: userSettings?.planetSelection ? JSON.parse(userSettings.planetSelection) : {
          sun: true,
          moon: true,
          mercury: true,
          venus: true,
          mars: true,
          jupiter: true,
          saturn: true,
          uranus: false,
          neptune: false,
          pluto: false,
          chiron: false,
          northNode: true,
          southNode: true
        }
      },
      
      // Numerology settings
      numerology: {
        system: userSettings?.numerologySystem || 'pythagorean',
        includeMasterNumbers: userSettings?.includeMasterNumbers ?? true,
        includeKarmicDebt: userSettings?.includeKarmicDebt ?? false,
        includePinnacles: userSettings?.includePinnacles ?? false,
        includeChallenges: userSettings?.includeChallenges ?? false
      },
      
      // Display settings
      display: {
        showDegrees: userSettings?.showDegrees ?? true,
        showMinutes: userSettings?.showMinutes ?? false,
        showSeconds: userSettings?.showSeconds ?? false,
        showRetrograde: userSettings?.showRetrograde ?? true,
        showAspects: userSettings?.showAspects ?? true,
        showHouses: userSettings?.showHouses ?? true,
        showElements: userSettings?.showElements ?? true,
        showModalities: userSettings?.showModalities ?? true
      }
    }

    return NextResponse.json({
      success: true,
      settings,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    
    if (user instanceof NextResponse) {
      return user
    }

    const body = await request.json()
    const { 
      language, 
      theme, 
      timezone,
      notifications,
      privacy,
      astrology,
      numerology,
      display
    } = body

    // Update user settings
    const updatedSettings = await prisma.userSettings.upsert({
      where: { userId: user.id },
      update: {
        language: language,
        theme: theme,
        timezone: timezone,
        dailyInsights: notifications?.daily,
        cosmicEvents: notifications?.transits,
        compatibilityUpdates: notifications?.community,
        pushNotifications: notifications?.system,
        emailNotifications: notifications?.email,
        profileVisibility: privacy?.profileVisible,
        dataSharing: privacy?.dataSharing,
        analytics: privacy?.analytics,
        crashReports: privacy?.crashReports,
        // Astrology settings
        astrologySystem: astrology?.system,
        houseSystem: astrology?.houseSystem,
        ayanamsa: astrology?.ayanamsa,
        aspectOrbs: astrology?.orbs ? JSON.stringify(astrology.orbs) : undefined,
        planetSelection: astrology?.planets ? JSON.stringify(astrology.planets) : undefined,
        aspectTypes: astrology?.aspects ? JSON.stringify(astrology.aspects) : undefined,
        // Numerology settings
        numerologySystem: numerology?.system,
        includeMasterNumbers: numerology?.includeMasterNumbers,
        includeKarmicDebt: numerology?.includeKarmicDebt,
        includePinnacles: numerology?.includePinnacles,
        includeChallenges: numerology?.includeChallenges,
        // Display settings
        showDegrees: display?.showDegrees,
        showMinutes: display?.showMinutes,
        showSeconds: display?.showSeconds,
        showRetrograde: display?.showRetrograde,
        showAspects: display?.showAspects,
        showHouses: display?.showHouses,
        showElements: display?.showElements,
        showModalities: display?.showModalities
      },
      create: {
        userId: user.id,
        language: language || 'en',
        theme: theme || 'auto',
        timezone: timezone || 'UTC',
        dailyInsights: notifications?.daily ?? true,
        cosmicEvents: notifications?.transits ?? true,
        compatibilityUpdates: notifications?.community ?? true,
        pushNotifications: notifications?.system ?? true,
        emailNotifications: notifications?.email ?? false,
        profileVisibility: privacy?.profileVisible ?? true,
        dataSharing: privacy?.dataSharing ?? false,
        analytics: privacy?.analytics ?? true,
        crashReports: privacy?.crashReports ?? true,
        // Astrology settings
        astrologySystem: astrology?.system || 'western',
        houseSystem: astrology?.houseSystem || 'placidus',
        ayanamsa: astrology?.ayanamsa || 'lahiri',
        aspectOrbs: astrology?.orbs ? JSON.stringify(astrology.orbs) : JSON.stringify({
          conjunction: 8, opposition: 8, trine: 6, square: 6, sextile: 4, quincunx: 3
        }),
        planetSelection: astrology?.planets ? JSON.stringify(astrology.planets) : JSON.stringify({
          sun: true, moon: true, mercury: true, venus: true, mars: true, jupiter: true,
          saturn: true, uranus: false, neptune: false, pluto: false, chiron: false,
          northNode: true, southNode: true
        }),
        aspectTypes: astrology?.aspects ? JSON.stringify(astrology.aspects) : JSON.stringify({
          major: true, minor: false, quincunx: true, semisextile: false
        }),
        // Numerology settings
        numerologySystem: numerology?.system || 'pythagorean',
        includeMasterNumbers: numerology?.includeMasterNumbers ?? true,
        includeKarmicDebt: numerology?.includeKarmicDebt ?? false,
        includePinnacles: numerology?.includePinnacles ?? false,
        includeChallenges: numerology?.includeChallenges ?? false,
        // Display settings
        showDegrees: display?.showDegrees ?? true,
        showMinutes: display?.showMinutes ?? false,
        showSeconds: display?.showSeconds ?? false,
        showRetrograde: display?.showRetrograde ?? true,
        showAspects: display?.showAspects ?? true,
        showHouses: display?.showHouses ?? true,
        showElements: display?.showElements ?? true,
        showModalities: display?.showModalities ?? true
      }
    })

    // Update profile with astrology settings
    if (astrology?.system) {
      await prisma.profile.updateMany({
        where: { userId: user.id },
        data: {
          systemPref: astrology.system
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      settings: updatedSettings,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
