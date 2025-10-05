#!/usr/bin/env node

/**
 * Create Test Users for Daily Secrets App
 * Creates users for all roles: user, premium, admin
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const testUsers = [
  {
    name: 'Test User',
    email: 'user@test.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Premium User',
    email: 'premium@test.com',
    password: 'password123',
    role: 'premium'
  },
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'password123',
    role: 'admin'
  }
]

async function createTestUsers() {
  try {
    console.log('🚀 Creating test users...')
    
    for (const userData of testUsers) {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      })
      
      if (existingUser) {
        console.log(`✅ User ${userData.email} already exists`)
        continue
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12)
      
      // Create user
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          emailVerified: new Date()
        }
      })
      
      // Create profile for each user
      await prisma.profile.create({
        data: {
          userId: user.id,
          name: userData.name,
          birthDate: new Date('1990-01-01'),
          birthTime: '12:00',
          placeLabel: 'Colombo, Sri Lanka',
          lat: 6.9271,
          lng: 79.8612,
          tzIana: 'Asia/Colombo',
          systemPref: 'western',
          localePref: 'en-US',
          privacy: JSON.stringify({
            shareData: false,
            publicProfile: false,
            analytics: true
          })
        }
      })
      
      // Create user settings
      await prisma.userSettings.create({
        data: {
          userId: user.id,
          language: 'en',
          theme: 'auto',
          timezone: 'Asia/Colombo',
          notifications: true,
          dailyInsights: true,
          dailyGuidance: true,
          dreamAlerts: true,
          compatibilityUpdates: false,
          cosmicEvents: true,
          pushNotifications: true,
          emailNotifications: false,
          profileVisibility: true,
          dataSharing: false,
          analytics: true,
          crashReports: true,
          astrologySystem: 'western',
          houseSystem: 'placidus',
          ayanamsa: 'lahiri',
          numerologySystem: 'pythagorean',
          includeMasterNumbers: true,
          includeKarmicDebt: false,
          includePinnacles: false,
          includeChallenges: false,
          showDegrees: true,
          showMinutes: false,
          showSeconds: false,
          showRetrograde: true,
          showAspects: true,
          showHouses: true,
          showElements: true,
          showModalities: true
        }
      })
      
      // Create subscription for premium and admin users
      if (userData.role === 'premium' || userData.role === 'admin') {
        await prisma.subscription.create({
          data: {
            userId: user.id,
            plan: userData.role === 'admin' ? 'cosmic' : 'premium',
            status: 'active',
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
            price: userData.role === 'admin' ? 99.99 : 19.99,
            currency: 'USD'
          }
        })
      }
      
      console.log(`✅ Created ${userData.role} user: ${userData.email}`)
    }
    
    console.log('\n🎉 All test users created successfully!')
    console.log('\n📋 Test User Credentials:')
    console.log('┌─────────────────┬─────────────────────┬──────────┬──────────┐')
    console.log('│ Role            │ Email               │ Password │ Features │')
    console.log('├─────────────────┼─────────────────────┼──────────┼──────────┤')
    console.log('│ User (Free)     │ user@test.com       │ password123 │ Basic   │')
    console.log('│ Premium         │ premium@test.com     │ password123 │ Advanced│')
    console.log('│ Admin           │ admin@test.com       │ password123 │ All     │')
    console.log('└─────────────────┴─────────────────────┴──────────┴──────────┘')
    
  } catch (error) {
    console.error('❌ Error creating test users:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUsers()

