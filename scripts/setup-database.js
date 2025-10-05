#!/usr/bin/env node

/**
 * Database Setup Script for Daily Secrets App
 * This script sets up the database and creates test users
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupDatabase() {
  console.log('🚀 Setting up Daily Secrets database...')
  
  try {
    // Create test users
    const testUsers = [
      {
        id: 'test-user-1',
        name: 'Free User',
        email: 'free@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        emailVerified: new Date()
      },
      {
        id: 'test-user-2',
        name: 'Premium User',
        email: 'premium@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'premium',
        emailVerified: new Date()
      },
      {
        id: 'test-user-3',
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
        emailVerified: new Date()
      }
    ]

    // Create users
    for (const userData of testUsers) {
      try {
        await prisma.user.upsert({
          where: { email: userData.email },
          update: userData,
          create: userData
        })
        console.log(`✅ Created user: ${userData.email} (${userData.role})`)
      } catch (error) {
        console.log(`⚠️  User ${userData.email} already exists or error:`, error.message)
      }
    }

    // Create test profiles
    const profiles = [
      {
        userId: 'test-user-1',
        name: 'Free User Profile',
        birthDate: new Date('1990-01-15'),
        birthTime: '10:30',
        placeLabel: 'Colombo, Sri Lanka',
        lat: 6.9271,
        lng: 79.8612,
        tzIana: 'Asia/Colombo',
        systemPref: 'western',
        localePref: 'en-US',
        privacy: { shareData: false, publicProfile: false }
      },
      {
        userId: 'test-user-2',
        name: 'Premium User Profile',
        birthDate: new Date('1985-06-20'),
        birthTime: '14:45',
        placeLabel: 'New York, USA',
        lat: 40.7128,
        lng: -74.0060,
        tzIana: 'America/New_York',
        systemPref: 'vedic',
        localePref: 'en-US',
        privacy: { shareData: true, publicProfile: true }
      },
      {
        userId: 'test-user-3',
        name: 'Admin User Profile',
        birthDate: new Date('1980-12-10'),
        birthTime: '08:15',
        placeLabel: 'London, UK',
        lat: 51.5074,
        lng: -0.1278,
        tzIana: 'Europe/London',
        systemPref: 'hybrid',
        localePref: 'en-GB',
        privacy: { shareData: true, publicProfile: true }
      }
    ]

    for (const profileData of profiles) {
      try {
        await prisma.profile.upsert({
          where: { userId: profileData.userId },
          update: profileData,
          create: profileData
        })
        console.log(`✅ Created profile for: ${profileData.name}`)
      } catch (error) {
        console.log(`⚠️  Profile for ${profileData.name} already exists or error:`, error.message)
      }
    }

    // Create test subscriptions
    const subscriptions = [
      {
        userId: 'test-user-2',
        plan: 'premium',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        price: 29.99,
        currency: 'USD'
      }
    ]

    for (const subData of subscriptions) {
      try {
        await prisma.subscription.upsert({
          where: { userId: subData.userId },
          update: subData,
          create: subData
        })
        console.log(`✅ Created subscription for: ${subData.userId}`)
      } catch (error) {
        console.log(`⚠️  Subscription for ${subData.userId} already exists or error:`, error.message)
      }
    }

    // Create test user settings
    const settings = [
      {
        userId: 'test-user-1',
        notifications: true,
        dailyGuidance: true,
        dreamAlerts: false,
        compatibilityUpdates: false,
        cosmicEvents: true,
        pushNotifications: false,
        emailNotifications: false,
        profileVisibility: 'private',
        dataSharing: false,
        analytics: true,
        crashReports: true
      },
      {
        userId: 'test-user-2',
        notifications: true,
        dailyGuidance: true,
        dreamAlerts: true,
        compatibilityUpdates: true,
        cosmicEvents: true,
        pushNotifications: true,
        emailNotifications: true,
        profileVisibility: 'public',
        dataSharing: true,
        analytics: true,
        crashReports: true
      },
      {
        userId: 'test-user-3',
        notifications: true,
        dailyGuidance: true,
        dreamAlerts: true,
        compatibilityUpdates: true,
        cosmicEvents: true,
        pushNotifications: true,
        emailNotifications: true,
        profileVisibility: 'public',
        dataSharing: true,
        analytics: true,
        crashReports: true
      }
    ]

    for (const settingData of settings) {
      try {
        await prisma.userSettings.upsert({
          where: { userId: settingData.userId },
          update: settingData,
          create: settingData
        })
        console.log(`✅ Created settings for: ${settingData.userId}`)
      } catch (error) {
        console.log(`⚠️  Settings for ${settingData.userId} already exists or error:`, error.message)
      }
    }

    console.log('\n🎉 Database setup completed successfully!')
    console.log('\n📋 Test Users Created:')
    console.log('   Free User:    free@example.com / password123')
    console.log('   Premium User: premium@example.com / password123')
    console.log('   Admin User:   admin@example.com / password123')
    console.log('\n🔗 You can now start the development server with: npm run dev')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the setup
setupDatabase()
