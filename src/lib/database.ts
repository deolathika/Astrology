/**
 * Database Connection and Prisma Client
 * Centralized database access for the Daily Secrets app
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty'
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

// Database initialization
export async function initializeDatabase(): Promise<void> {
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Run any necessary migrations or setup
    await prisma.$executeRaw`PRAGMA foreign_keys = ON`
    console.log('✅ Database initialized')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}

// Graceful shutdown
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await prisma.$disconnect()
    console.log('✅ Database connection closed')
  } catch (error) {
    console.error('❌ Error closing database connection:', error)
  }
}

// Database utilities
export const dbUtils = {
  // Get user with profile
  async getUserWithProfile(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profiles: true,
        subscriptions: true,
        analytics: true
      }
    })
  },
  
  // Get user by email
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        profiles: true,
        subscriptions: true
      }
    })
  },
  
  // Create user profile
  async createUserProfile(userId: string, profileData: any) {
    return await prisma.profile.create({
      data: {
        userId,
        ...profileData
      }
    })
  },
  
  // Update user profile
  async updateUserProfile(userId: string, profileData: any) {
    return await prisma.profile.updateMany({
      where: { userId },
      data: profileData
    })
  },
  
  // Get user settings
  async getUserSettings(userId: string) {
    return await prisma.userSettings.findUnique({
      where: { userId }
    })
  },
  
  // Update user settings
  async updateUserSettings(userId: string, settingsData: any) {
    return await prisma.userSettings.upsert({
      where: { userId },
      update: settingsData,
      create: {
        userId,
        ...settingsData
      }
    })
  },
  
  // Get user role
  async getUserRole(userId: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })
    return user?.role || 'user'
  },
  
  // Check if user is premium
  async isUserPremium(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })
    return user?.role === 'premium' || user?.role === 'admin'
  },
  
  // Check if user is admin
  async isUserAdmin(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })
    return user?.role === 'admin'
  }
}

export default prisma