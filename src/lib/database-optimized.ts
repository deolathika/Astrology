import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Connection pooling configuration
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
  // Performance optimizations
  errorFormat: 'pretty',
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database indexes for performance optimization
export const DATABASE_INDEXES = {
  // User indexes
  user_email: 'CREATE INDEX IF NOT EXISTS idx_user_email ON User(email)',
  user_role: 'CREATE INDEX IF NOT EXISTS idx_user_role ON User(role)',
  user_created_at: 'CREATE INDEX IF NOT EXISTS idx_user_created_at ON User(createdAt)',
  
  // Profile indexes
  profile_user_id: 'CREATE INDEX IF NOT EXISTS idx_profile_user_id ON profiles(userId)',
  profile_system: 'CREATE INDEX IF NOT EXISTS idx_profile_system ON profiles(systemPref)',
  profile_birth_date: 'CREATE INDEX IF NOT EXISTS idx_profile_birth_date ON profiles(birthDate)',
  profile_place: 'CREATE INDEX IF NOT EXISTS idx_profile_place ON profiles(placeLabel)',
  
  // Subscription indexes
  subscription_user_id: 'CREATE INDEX IF NOT EXISTS idx_subscription_user_id ON subscriptions(userId)',
  subscription_status: 'CREATE INDEX IF NOT EXISTS idx_subscription_status ON subscriptions(status)',
  subscription_plan: 'CREATE INDEX IF NOT EXISTS idx_subscription_plan ON subscriptions(plan)',
  
  // User settings indexes
  user_settings_user_id: 'CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(userId)',
  
  // Analytics indexes
  analytics_event: 'CREATE INDEX IF NOT EXISTS idx_analytics_event ON Analytics(event)',
  analytics_user_id: 'CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON Analytics(userId)',
  analytics_timestamp: 'CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON Analytics(timestamp)',
  
  // Notification indexes
  notification_user_id: 'CREATE INDEX IF NOT EXISTS idx_notification_user_id ON notifications(userId)',
  notification_type: 'CREATE INDEX IF NOT EXISTS idx_notification_type ON notifications(type)',
  notification_read: 'CREATE INDEX IF NOT EXISTS idx_notification_read ON notifications(read)',
  
  // Astrology reading indexes
  astrology_user_id: 'CREATE INDEX IF NOT EXISTS idx_astrology_user_id ON astrology_readings(userId)',
  astrology_type: 'CREATE INDEX IF NOT EXISTS idx_astrology_type ON astrology_readings(type)',
  astrology_system: 'CREATE INDEX IF NOT EXISTS idx_astrology_system ON astrology_readings(system)',
  
  // Numerology reading indexes
  numerology_user_id: 'CREATE INDEX IF NOT EXISTS idx_numerology_user_id ON numerology_readings(userId)',
  numerology_type: 'CREATE INDEX IF NOT EXISTS idx_numerology_type ON numerology_readings(type)',
  numerology_system: 'CREATE INDEX IF NOT EXISTS idx_numerology_system ON numerology_readings(system)',
  
  // Dream indexes
  dream_user_id: 'CREATE INDEX IF NOT EXISTS idx_dream_user_id ON dreams(userId)',
  dream_created_at: 'CREATE INDEX IF NOT EXISTS idx_dream_created_at ON dreams(createdAt)',
  
  // Match indexes
  match_user_a: 'CREATE INDEX IF NOT EXISTS idx_match_user_a ON matches(aId)',
  match_user_b: 'CREATE INDEX IF NOT EXISTS idx_match_user_b ON matches(bId)',
  match_score: 'CREATE INDEX IF NOT EXISTS idx_match_score ON matches(score)',
  
  // Chat message indexes
  chat_from_user: 'CREATE INDEX IF NOT EXISTS idx_chat_from_user ON chat_messages(fromId)',
  chat_to_user: 'CREATE INDEX IF NOT EXISTS idx_chat_to_user ON chat_messages(toId)',
  chat_created_at: 'CREATE INDEX IF NOT EXISTS idx_chat_created_at ON chat_messages(createdAt)',
}

// Initialize database indexes
export async function initializeDatabaseIndexes() {
  try {
    console.log('Initializing database indexes...')
    
    for (const [name, query] of Object.entries(DATABASE_INDEXES)) {
      await prisma.$executeRawUnsafe(query)
      console.log(`✓ Created index: ${name}`)
    }
    
    console.log('✅ All database indexes initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing database indexes:', error)
    throw error
  }
}

// Optimized query helpers
export class OptimizedQueries {
  // Get user with profile and settings in one query
  static async getUserWithProfile(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profiles: {
          select: {
            id: true,
            name: true,
            birthDate: true,
            birthTime: true,
            placeLabel: true,
            lat: true,
            lng: true,
            tzIana: true,
            systemPref: true,
            localePref: true,
            privacy: true,
            natalCache: true,
            numerology: true,
            todayCache: true,
            createdAt: true,
            updatedAt: true,
          }
        },
        userSettings: {
          select: {
            id: true,
            language: true,
            theme: true,
            timezone: true,
            notifications: true,
            dailyInsights: true,
            dailyGuidance: true,
            dreamAlerts: true,
            compatibilityUpdates: true,
            cosmicEvents: true,
            pushNotifications: true,
            emailNotifications: true,
            profileVisibility: true,
            dataSharing: true,
            analytics: true,
            crashReports: true,
            astrologySystem: true,
            houseSystem: true,
            ayanamsa: true,
            aspectOrbs: true,
            planetSelection: true,
            aspectTypes: true,
            numerologySystem: true,
            includeMasterNumbers: true,
            includeKarmicDebt: true,
            includePinnacles: true,
            includeChallenges: true,
            showDegrees: true,
            showMinutes: true,
            showSeconds: true,
            showRetrograde: true,
            showAspects: true,
            showHouses: true,
            showElements: true,
            showModalities: true,
            createdAt: true,
            updatedAt: true,
          }
        },
        subscriptions: {
          where: {
            status: 'active'
          },
          select: {
            id: true,
            plan: true,
            status: true,
            startDate: true,
            endDate: true,
            price: true,
            currency: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    })
  }

  // Get user's recent activity
  static async getUserRecentActivity(userId: string, limit: number = 10) {
    return await prisma.analytics.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      select: {
        id: true,
        event: true,
        metadata: true,
        timestamp: true,
      }
    })
  }

  // Get user's notifications
  static async getUserNotifications(userId: string, limit: number = 20) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        type: true,
        title: true,
        message: true,
        read: true,
        sent: true,
        createdAt: true,
      }
    })
  }

  // Get user's astrology readings
  static async getUserAstrologyReadings(userId: string, type?: string, system?: string) {
    return await prisma.astrologyReading.findMany({
      where: {
        userId,
        ...(type && { type }),
        ...(system && { system }),
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        system: true,
        data: true,
        insights: true,
        createdAt: true,
        updatedAt: true,
      }
    })
  }

  // Get user's numerology readings
  static async getUserNumerologyReadings(userId: string, type?: string, system?: string) {
    return await prisma.numerologyReading.findMany({
      where: {
        userId,
        ...(type && { type }),
        ...(system && { system }),
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        system: true,
        number: true,
        meaning: true,
        insights: true,
        createdAt: true,
        updatedAt: true,
      }
    })
  }

  // Get user's dreams
  static async getUserDreams(userId: string, limit: number = 20) {
    return await prisma.dream.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        symbols: true,
        interpretation: true,
        emotionalTone: true,
        significance: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      }
    })
  }

  // Get user's matches
  static async getUserMatches(userId: string) {
    return await prisma.match.findMany({
      where: {
        OR: [
          { aId: userId },
          { bId: userId }
        ]
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        aId: true,
        bId: true,
        score: true,
        summary: true,
        createdAt: true,
      }
    })
  }

  // Get user's chat messages
  static async getUserChatMessages(userId: string, limit: number = 50) {
    return await prisma.chatMessage.findMany({
      where: {
        OR: [
          { fromId: userId },
          { toId: userId }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        fromId: true,
        toId: true,
        body: true,
        emojiOnly: true,
        queued: true,
        createdAt: true,
      }
    })
  }
}

// Database health check
export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'healthy', timestamp: new Date().toISOString() }
  } catch (error) {
    return { status: 'unhealthy', error: (error as Error).message, timestamp: new Date().toISOString() }
  }
}

// Close database connection
export async function closeDatabaseConnection() {
  await prisma.$disconnect()
}