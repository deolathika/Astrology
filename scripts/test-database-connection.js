#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')
    
    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `
    
    console.log('📋 Existing tables:', tables)
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found. Running schema push...')
      
      // Try to create a simple table
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS test_table (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL
        )
      `
      
      console.log('✅ Test table created')
      
      // Check tables again
      const tablesAfter = await prisma.$queryRaw`
        SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'
      `
      
      console.log('📋 Tables after creation:', tablesAfter)
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseConnection()
