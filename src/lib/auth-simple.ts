/**
 * Simplified Authentication System
 * For development and testing without database dependency
 */

import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export interface SimpleUser {
  id: string
  name: string
  email: string
  role: 'user' | 'premium' | 'admin'
  image?: string
}

export interface SimpleSession {
  user: SimpleUser
  expires: string
}

// Mock user data for development
const mockUsers: SimpleUser[] = [
  {
    id: 'user-1',
    name: 'Free User',
    email: 'free@example.com',
    role: 'user',
    image: undefined
  },
  {
    id: 'user-2',
    name: 'Premium User',
    email: 'premium@example.com',
    role: 'premium',
    image: undefined
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    image: undefined
  }
]

// In-memory session storage (for development only)
const sessions = new Map<string, SimpleSession>()

export class SimpleAuth {
  /**
   * Create a new session for a user
   */
  static createSession(user: SimpleUser): SimpleSession {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const session: SimpleSession = {
      user,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    }
    sessions.set(sessionId, session)
    return session
  }

  /**
   * Get session by ID
   */
  static getSession(sessionId: string): SimpleSession | null {
    const session = sessions.get(sessionId)
    if (!session) return null
    
    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      sessions.delete(sessionId)
      return null
    }
    
    return session
  }

  /**
   * Authenticate user by email and password (simplified)
   */
  static authenticate(email: string, password: string): SimpleUser | null {
    // For development, accept any password
    const user = mockUsers.find(u => u.email === email)
    return user || null
  }

  /**
   * Get user by ID
   */
  static getUserById(id: string): SimpleUser | null {
    return mockUsers.find(u => u.id === id) || null
  }

  /**
   * Get user by email
   */
  static getUserByEmail(email: string): SimpleUser | null {
    return mockUsers.find(u => u.email === email) || null
  }

  /**
   * Check if user has required role
   */
  static hasRole(user: SimpleUser, requiredRole: string | string[]): boolean {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    return roles.includes(user.role)
  }

  /**
   * Get session from request headers
   */
  static getSessionFromRequest(request: NextRequest): SimpleSession | null {
    const sessionId = request.headers.get('x-session-id')
    if (!sessionId) return null
    
    return this.getSession(sessionId)
  }

  /**
   * Create session response with headers
   */
  static createSessionResponse(session: SimpleSession): NextResponse {
    const response = NextResponse.json({ 
      success: true, 
      session: {
        user: session.user,
        expires: session.expires
      }
    })
    
    // Set session cookie
    response.cookies.set('session-id', `session_${Date.now()}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })
    
    return response
  }

  /**
   * Clear session
   */
  static clearSession(sessionId: string): void {
    sessions.delete(sessionId)
  }

  /**
   * Get all users (admin only)
   */
  static getAllUsers(): SimpleUser[] {
    return mockUsers
  }

  /**
   * Update user role (admin only)
   */
  static updateUserRole(userId: string, newRole: 'user' | 'premium' | 'admin'): boolean {
    const user = mockUsers.find(u => u.id === userId)
    if (!user) return false
    
    user.role = newRole
    return true
  }
}

// Export convenience functions
export const simpleAuth = {
  createSession: SimpleAuth.createSession,
  getSession: SimpleAuth.getSession,
  authenticate: SimpleAuth.authenticate,
  getUserById: SimpleAuth.getUserById,
  getUserByEmail: SimpleAuth.getUserByEmail,
  hasRole: SimpleAuth.hasRole,
  getSessionFromRequest: SimpleAuth.getSessionFromRequest,
  createSessionResponse: SimpleAuth.createSessionResponse,
  clearSession: SimpleAuth.clearSession,
  getAllUsers: SimpleAuth.getAllUsers,
  updateUserRole: SimpleAuth.updateUserRole
}
