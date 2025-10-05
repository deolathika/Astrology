/**
 * PostgreSQL Setup Script
 * Sets up PostgreSQL database for production
 */

const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

// Database configuration
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'daily_secrets'
}

async function setupPostgreSQL() {
  console.log('🐘 Setting up PostgreSQL database...')
  
  const client = new Client(config)
  
  try {
    await client.connect()
    console.log('✅ Connected to PostgreSQL')
    
    // Create database if it doesn't exist
    const createDbQuery = `CREATE DATABASE ${config.database}`
    try {
      await client.query(createDbQuery)
      console.log(`✅ Database '${config.database}' created`)
    } catch (error) {
      if (error.code === '42P04') {
        console.log(`ℹ️  Database '${config.database}' already exists`)
      } else {
        throw error
      }
    }
    
    // Create extensions
    const extensions = [
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
      'CREATE EXTENSION IF NOT EXISTS "pg_trgm"',
      'CREATE EXTENSION IF NOT EXISTS "btree_gin"'
    ]
    
    for (const extension of extensions) {
      try {
        await client.query(extension)
        console.log(`✅ Extension created: ${extension.split('"')[1]}`)
      } catch (error) {
        console.log(`⚠️  Extension warning: ${error.message}`)
      }
    }
    
    // Create indexes for performance
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email)',
      'CREATE INDEX IF NOT EXISTS idx_user_role ON "User"(role)',
      'CREATE INDEX IF NOT EXISTS idx_user_created_at ON "User"("createdAt")',
      'CREATE INDEX IF NOT EXISTS idx_profile_user_id ON profiles("userId")',
      'CREATE INDEX IF NOT EXISTS idx_profile_system ON profiles("systemPref")',
      'CREATE INDEX IF NOT EXISTS idx_profile_birth_date ON profiles("birthDate")',
      'CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON "Analytics"("userId")',
      'CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON "Analytics"(timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_notification_user_id ON notifications("userId")',
      'CREATE INDEX IF NOT EXISTS idx_notification_read ON notifications(read)',
      'CREATE INDEX IF NOT EXISTS idx_dream_user_id ON dreams("userId")',
      'CREATE INDEX IF NOT EXISTS idx_dream_created_at ON dreams("createdAt")',
      'CREATE INDEX IF NOT EXISTS idx_match_user_a ON matches("aId")',
      'CREATE INDEX IF NOT EXISTS idx_match_user_b ON matches("bId")',
      'CREATE INDEX IF NOT EXISTS idx_chat_from_user ON chat_messages("fromId")',
      'CREATE INDEX IF NOT EXISTS idx_chat_to_user ON chat_messages("toId")',
      'CREATE INDEX IF NOT EXISTS idx_chat_created_at ON chat_messages("createdAt")'
    ]
    
    for (const index of indexes) {
      try {
        await client.query(index)
        console.log(`✅ Index created: ${index.split('idx_')[1]?.split(' ')[0]}`)
      } catch (error) {
        console.log(`⚠️  Index warning: ${error.message}`)
      }
    }
    
    console.log('🎉 PostgreSQL setup completed successfully!')
    
  } catch (error) {
    console.error('❌ PostgreSQL setup failed:', error.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

// Run setup if called directly
if (require.main === module) {
  setupPostgreSQL()
}

module.exports = { setupPostgreSQL }
