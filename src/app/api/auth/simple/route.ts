/**
 * Simplified Authentication API
 * For development and testing without database dependency
 */

import { NextRequest, NextResponse } from 'next/server'
import { simpleAuth } from '@/lib/auth-simple'
import { applyRateLimit, rateLimiters } from '@/lib/security/rate-limiting'
import { applySecurityHeaders } from '@/lib/security/security-headers'
import { dataProtector } from '@/lib/security/data-protection'

export const POST = applyRateLimit(
  rateLimiters.auth,
  async (request: NextRequest) => {
    try {
      const { action, email, password, userId, newRole } = await request.json()

    switch (action) {
      case 'login':
        if (!email || !password) {
          return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
        }

        const user = simpleAuth.authenticate(email, password)
        if (!user) {
          return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const session = simpleAuth.createSession(user)
        const loginResponse = simpleAuth.createSessionResponse(session)
        return applySecurityHeaders(loginResponse)

      case 'logout':
        const sessionId = request.headers.get('x-session-id')
        if (sessionId) {
          simpleAuth.clearSession(sessionId)
        }
        const logoutResponse = NextResponse.json({ success: true, message: 'Logged out' })
        return applySecurityHeaders(logoutResponse)

      case 'getUser':
        const sessionId2 = request.headers.get('x-session-id')
        if (!sessionId2) {
          return NextResponse.json({ error: 'No session' }, { status: 401 })
        }

        const session2 = simpleAuth.getSession(sessionId2)
        if (!session2) {
          return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
        }

        const maskedUser = dataProtector.maskUserData(session2.user, 'user', true)
        const userResponse = NextResponse.json({ user: maskedUser })
        return applySecurityHeaders(userResponse)

      case 'getAllUsers':
        const sessionId3 = request.headers.get('x-session-id')
        if (!sessionId3) {
          return NextResponse.json({ error: 'No session' }, { status: 401 })
        }

        const session3 = simpleAuth.getSession(sessionId3)
        if (!session3 || !simpleAuth.hasRole(session3.user, 'admin')) {
          return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
        }

        const allUsers = simpleAuth.getAllUsers()
        const maskedUsers = allUsers.map(user => dataProtector.maskUserData(user, 'admin', false))
        const usersResponse = NextResponse.json({ users: maskedUsers })
        return applySecurityHeaders(usersResponse)

      case 'updateRole':
        if (!userId || !newRole) {
          return NextResponse.json({ error: 'User ID and new role required' }, { status: 400 })
        }

        const sessionId4 = request.headers.get('x-session-id')
        if (!sessionId4) {
          return NextResponse.json({ error: 'No session' }, { status: 401 })
        }

        const session4 = simpleAuth.getSession(sessionId4)
        if (!session4 || !simpleAuth.hasRole(session4.user, 'admin')) {
          return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
        }

        const success = simpleAuth.updateUserRole(userId, newRole)
        if (!success) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const roleResponse = NextResponse.json({ success: true, message: 'Role updated' })
        return applySecurityHeaders(roleResponse)

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
    } catch (error) {
      console.error('Authentication error:', error)
      const errorResponse = NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      return applySecurityHeaders(errorResponse)
    }
  }
)

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-session-id')
    if (!sessionId) {
      return NextResponse.json({ error: 'No session' }, { status: 401 })
    }

    const session = simpleAuth.getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    return NextResponse.json({ 
      user: session.user,
      expires: session.expires
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
