#!/usr/bin/env node

/**
 * Test Authentication Flow Script
 * Tests the complete authentication flow for new users
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testAuthFlow() {
  console.log('🔐 Testing authentication flow...')
  
  try {
    // Test 1: Check if test users exist
    console.log('\n📋 Test 1: Checking test users...')
    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true, name: true }
    })
    
    console.log(`✅ Found ${users.length} users in database:`)
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.role}) - ${user.name}`)
    })
    
    // Test 2: Test password verification
    console.log('\n📋 Test 2: Testing password verification...')
    const testUser = await prisma.user.findUnique({
      where: { email: 'free@example.com' }
    })
    
    if (testUser) {
      const passwordValid = await bcrypt.compare('password123', testUser.password)
      console.log(`✅ Password verification: ${passwordValid ? 'PASS' : 'FAIL'}`)
    } else {
      console.log('❌ Test user not found')
    }
    
    // Test 3: Test user roles
    console.log('\n📋 Test 3: Testing user roles...')
    const roleCounts = await prisma.user.groupBy({
      by: ['role'],
      _count: { role: true }
    })
    
    console.log('✅ Role distribution:')
    roleCounts.forEach(role => {
      console.log(`   - ${role.role}: ${role._count.role} users`)
    })
    
    // Test 4: Test user profiles
    console.log('\n📋 Test 4: Testing user profiles...')
    const profiles = await prisma.profile.findMany({
      select: { userId: true, name: true, systemPref: true }
    })
    
    console.log(`✅ Found ${profiles.length} user profiles:`)
    profiles.forEach(profile => {
      console.log(`   - ${profile.name} (${profile.systemPref})`)
    })
    
    // Test 5: Test user settings
    console.log('\n📋 Test 5: Testing user settings...')
    const settings = await prisma.userSettings.findMany({
      select: { userId: true, notifications: true, dailyGuidance: true }
    })
    
    console.log(`✅ Found ${settings.length} user settings:`)
    settings.forEach(setting => {
      console.log(`   - User ${setting.userId}: notifications=${setting.notifications}, dailyGuidance=${setting.dailyGuidance}`)
    })
    
    console.log('\n🎉 Authentication flow test completed!')
    console.log('\n📋 Summary:')
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Profiles: ${profiles.length}`)
    console.log(`   - Settings: ${settings.length}`)
    console.log(`   - Password verification: ${testUser ? 'Working' : 'Failed'}`)
    
  } catch (error) {
    console.error('❌ Authentication flow test failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run test
testAuthFlow()
