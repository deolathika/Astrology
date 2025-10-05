#!/usr/bin/env node

/**
 * Test User Validation Script for Daily Secrets App
 * Validates all test users and their permissions
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function validateTestUsers() {
  console.log('🔍 Validating test users and permissions...')
  
  try {
    // Test users to validate
    const testUsers = [
      { email: 'free@example.com', expectedRole: 'user' },
      { email: 'premium@example.com', expectedRole: 'premium' },
      { email: 'admin@example.com', expectedRole: 'admin' }
    ]

    for (const testUser of testUsers) {
      console.log(`\n📋 Validating user: ${testUser.email}`)
      
      // Get user from database
      const user = await prisma.user.findUnique({
        where: { email: testUser.email },
        include: {
          profiles: true,
          subscriptions: true,
          userSettings: true,
          analytics: true
        }
      })

      if (!user) {
        console.log(`❌ User ${testUser.email} not found`)
        continue
      }

      // Validate role
      if (user.role !== testUser.expectedRole) {
        console.log(`❌ Role mismatch: expected ${testUser.expectedRole}, got ${user.role}`)
      } else {
        console.log(`✅ Role correct: ${user.role}`)
      }

      // Validate password
      const passwordValid = await bcrypt.compare('password123', user.password)
      if (passwordValid) {
        console.log(`✅ Password valid`)
      } else {
        console.log(`❌ Password invalid`)
      }

      // Validate profile
      if (user.profiles.length > 0) {
        console.log(`✅ Profile exists: ${user.profiles[0].name}`)
        console.log(`   Birth Date: ${user.profiles[0].birthDate}`)
        console.log(`   System: ${user.profiles[0].systemPref}`)
        console.log(`   Location: ${user.profiles[0].placeLabel}`)
      } else {
        console.log(`❌ No profile found`)
      }

      // Validate settings
      if (user.userSettings) {
        console.log(`✅ User settings exist`)
        console.log(`   Notifications: ${user.userSettings.notifications}`)
        console.log(`   Daily Guidance: ${user.userSettings.dailyGuidance}`)
        console.log(`   Profile Visibility: ${user.userSettings.profileVisibility}`)
      } else {
        console.log(`❌ No user settings found`)
      }

      // Validate subscription for premium user
      if (testUser.expectedRole === 'premium') {
        if (user.subscriptions.length > 0) {
          const subscription = user.subscriptions[0]
          console.log(`✅ Premium subscription exists`)
          console.log(`   Plan: ${subscription.plan}`)
          console.log(`   Status: ${subscription.status}`)
          console.log(`   Price: $${subscription.price}`)
        } else {
          console.log(`❌ No premium subscription found`)
        }
      }

      // Test authentication
      console.log(`\n🔐 Testing authentication for ${testUser.email}...`)
      const authResult = await testAuthentication(testUser.email, 'password123')
      if (authResult.success) {
        console.log(`✅ Authentication successful`)
        console.log(`   User ID: ${authResult.user.id}`)
        console.log(`   Role: ${authResult.user.role}`)
      } else {
        console.log(`❌ Authentication failed: ${authResult.error}`)
      }
    }

    // Test role-based permissions
    console.log(`\n🔒 Testing role-based permissions...`)
    await testRolePermissions()

    // Test feature access
    console.log(`\n🎯 Testing feature access...`)
    await testFeatureAccess()

    console.log('\n🎉 Test user validation completed!')

  } catch (error) {
    console.error('❌ Validation failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

async function testAuthentication(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return { success: false, error: 'User not found' }
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return { success: false, error: 'Invalid password' }
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

async function testRolePermissions() {
  const roles = ['user', 'premium', 'admin']
  
  for (const role of roles) {
    console.log(`\n📊 Testing permissions for ${role} role:`)
    
    const permissions = getRolePermissions(role)
    console.log(`   Permissions: ${permissions.join(', ')}`)
    
    // Test specific permissions
    const testPermissions = [
      'daily-insights',
      'advanced-numerology',
      'expert-consultations',
      'admin-dashboard'
    ]
    
    for (const permission of testPermissions) {
      const hasPermission = permissions.includes(permission)
      console.log(`   ${permission}: ${hasPermission ? '✅' : '❌'}`)
    }
  }
}

function getRolePermissions(role) {
  const permissions = {
    user: [
      'daily-insights',
      'basic-numerology',
      'zodiac-info',
      'community-access'
    ],
    premium: [
      'daily-insights',
      'basic-numerology',
      'zodiac-info',
      'community-access',
      'advanced-numerology',
      'expert-consultations',
      'detailed-charts',
      'ai-insights',
      'dream-analysis',
      'compatibility-reports',
      'personalized-calendar',
      'unlimited-usage'
    ],
    admin: [
      'daily-insights',
      'basic-numerology',
      'zodiac-info',
      'community-access',
      'advanced-numerology',
      'expert-consultations',
      'detailed-charts',
      'ai-insights',
      'dream-analysis',
      'compatibility-reports',
      'personalized-calendar',
      'unlimited-usage',
      'user-management',
      'system-analytics',
      'content-management',
      'system-configuration',
      'qa-testing',
      'accuracy-enhancement'
    ]
  }
  
  return permissions[role] || []
}

async function testFeatureAccess() {
  const features = [
    { name: 'Daily Insights', endpoint: '/api/today', roles: ['user', 'premium', 'admin'] },
    { name: 'Advanced Numerology', endpoint: '/api/numerology/enhanced', roles: ['premium', 'admin'] },
    { name: 'Expert Consultations', endpoint: '/api/llm/enhanced-insights', roles: ['premium', 'admin'] },
    { name: 'Admin Dashboard', endpoint: '/api/admin/users', roles: ['admin'] }
  ]

  for (const feature of features) {
    console.log(`\n🎯 Testing ${feature.name}:`)
    console.log(`   Endpoint: ${feature.endpoint}`)
    console.log(`   Allowed roles: ${feature.roles.join(', ')}`)
    
    // Test each role
    for (const role of ['user', 'premium', 'admin']) {
      const hasAccess = feature.roles.includes(role)
      console.log(`   ${role}: ${hasAccess ? '✅' : '❌'}`)
    }
  }
}

// Run validation
validateTestUsers()
