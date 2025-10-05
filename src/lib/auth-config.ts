/**
 * NextAuth Configuration for Daily Secrets App
 * Handles authentication with role-based access control
 */

import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './database'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || '',
            role: user.role,
            image: user.image || undefined
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects after sign in
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET
}

// Role-based access control
export const requireRole = (userRole: string, requiredRole: string | string[]): boolean => {
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  return roles.includes(userRole)
}

// User type definitions
export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'premium' | 'admin'
  image?: string
}

export interface Session {
  user: User
  expires: string
}

// Authentication helpers
export const authHelpers = {
  isAuthenticated: (session: Session | null): boolean => {
    return !!session?.user
  },
  
  isPremium: (session: Session | null): boolean => {
    return session?.user?.role === 'premium' || session?.user?.role === 'admin'
  },
  
  isAdmin: (session: Session | null): boolean => {
    return session?.user?.role === 'admin'
  },
  
  canAccessFeature: (session: Session | null, feature: string): boolean => {
    if (!session?.user) return false
    
    const featurePermissions = {
      'daily-insights': ['user', 'premium', 'admin'],
      'advanced-numerology': ['premium', 'admin'],
      'expert-consultations': ['premium', 'admin'],
      'admin-dashboard': ['admin'],
      'user-management': ['admin']
    }
    
    const allowedRoles = featurePermissions[feature as keyof typeof featurePermissions] || []
    return allowedRoles.includes(session.user.role)
  }
}