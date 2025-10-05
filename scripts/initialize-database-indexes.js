#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Database indexes for performance optimization
const DATABASE_INDEXES = {
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

async function initializeDatabaseIndexes() {
  console.log('🚀 Initializing database indexes for performance optimization...')
  
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')
    
    // Create indexes
    let successCount = 0
    let errorCount = 0
    
    for (const [name, query] of Object.entries(DATABASE_INDEXES)) {
      try {
        await prisma.$executeRawUnsafe(query)
        console.log(`✅ Created index: ${name}`)
        successCount++
      } catch (error) {
        console.error(`❌ Failed to create index ${name}:`, error.message)
        errorCount++
      }
    }
    
    console.log(`\n📊 Index creation summary:`)
    console.log(`✅ Successful: ${successCount}`)
    console.log(`❌ Failed: ${errorCount}`)
    console.log(`📈 Total: ${Object.keys(DATABASE_INDEXES).length}`)
    
    if (errorCount === 0) {
      console.log('\n🎉 All database indexes initialized successfully!')
    } else {
      console.log('\n⚠️  Some indexes failed to create. Check the errors above.')
    }
    
  } catch (error) {
    console.error('❌ Error initializing database indexes:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabaseIndexes()
    .then(() => {
      console.log('✅ Database index initialization completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Database index initialization failed:', error)
      process.exit(1)
    })
}

module.exports = { initializeDatabaseIndexes, DATABASE_INDEXES }
