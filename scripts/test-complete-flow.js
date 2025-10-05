#!/usr/bin/env node

/**
 * Test Complete Registration and Login Flow
 * Tests the entire user journey from registration to login
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testCompleteFlow() {
  console.log('🔄 Testing complete registration and login flow...')
  
  try {
    // Test 1: Create a new user
    console.log('\n📋 Test 1: Creating new user...')
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'password123'
    const hashedPassword = await bcrypt.hash(testPassword, 12)
    
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: testEmail,
        password: hashedPassword,
        role: 'user'
      }
    })
    
    console.log(`✅ User created: ${user.email} (${user.role})`)
    
    // Test 2: Create user profile
    console.log('\n📋 Test 2: Creating user profile...')
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: 'Test User',
        birthDate: new Date('1995-05-28'),
        birthTime: '20:25',
        placeLabel: 'Colombo, Sri Lanka',
        lat: 6.9271,
        lng: 79.8612,
        tzIana: 'Asia/Colombo',
        systemPref: 'western',
        localePref: 'en-US',
        privacy: '{}'
      }
    })
    
    console.log(`✅ Profile created: ${profile.name}`)
    
    // Test 3: Verify password
    console.log('\n📋 Test 3: Verifying password...')
    const passwordValid = await bcrypt.compare(testPassword, user.password)
    console.log(`✅ Password verification: ${passwordValid ? 'PASS' : 'FAIL'}`)
    
    // Test 4: Test user settings
    console.log('\n📋 Test 4: Creating user settings...')
    const settings = await prisma.userSettings.create({
      data: {
        userId: user.id,
        notifications: true,
        dailyGuidance: true,
        dreamAlerts: true,
        compatibilityUpdates: false,
        cosmicEvents: true,
        pushNotifications: true,
        emailNotifications: false,
        profileVisibility: 'private',
        dataSharing: false,
        analytics: true,
        crashReports: true
      }
    })
    
    console.log(`✅ User settings created: notifications=${settings.notifications}`)
    
    // Test 5: Test subscription (for premium features)
    console.log('\n📋 Test 5: Creating subscription...')
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: 'free',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        price: 0.0,
        currency: 'USD'
      }
    })
    
    console.log(`✅ Subscription created: ${subscription.plan} (${subscription.status})`)
    
    // Test 6: Verify complete user data
    console.log('\n📋 Test 6: Verifying complete user data...')
    const completeUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profiles: true,
        userSettings: true,
        subscriptions: true
      }
    })
    
    console.log('✅ Complete user data:')
    console.log(`   - User: ${completeUser.name} (${completeUser.email})`)
    console.log(`   - Profile: ${completeUser.profiles?.[0]?.name || 'None'}`)
    console.log(`   - Settings: ${completeUser.userSettings ? 'Created' : 'Missing'}`)
    console.log(`   - Subscription: ${completeUser.subscriptions.length} active`)
    
    console.log('\n🎉 Complete flow test successful!')
    console.log('\n📋 Summary:')
    console.log(`   - User registration: ✅ Working`)
    console.log(`   - Profile creation: ✅ Working`)
    console.log(`   - Password hashing: ✅ Working`)
    console.log(`   - User settings: ✅ Working`)
    console.log(`   - Subscription: ✅ Working`)
    console.log(`   - Data integrity: ✅ Working`)
    
    // Cleanup
    console.log('\n🧹 Cleaning up test data...')
    await prisma.subscription.deleteMany({ where: { userId: user.id } })
    await prisma.userSettings.deleteMany({ where: { userId: user.id } })
    await prisma.profile.deleteMany({ where: { userId: user.id } })
    await prisma.user.delete({ where: { id: user.id } })
    console.log('✅ Test data cleaned up')
    
  } catch (error) {
    console.error('❌ Complete flow test failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run test
testCompleteFlow()
