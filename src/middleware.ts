/**
 * Next.js Middleware for User Flow Management
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Handles role-based routing and access control
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get token for authentication
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  const userRole = token?.role || 'guest'
  
  // Define route access rules
  const routeAccess = {
    // Public routes (no authentication required)
    public: [
      '/',
      '/about',
      '/terms',
      '/privacy',
      '/faq',
      '/contact',
      '/vision',
      '/mission',
      '/dmca',
      '/auth/signin',
      '/auth/signup',
      '/auth/forgot-password',
      '/auth/reset-password',
      '/public-test',
      '/dev-dashboard',
      '/test-auth'
    ],
    
    // Free user routes
    free: [
      '/dashboard',
      '/profile',
      '/numerology',
      '/astrology',
      '/compatibility',
      '/community',
      '/settings'
    ],
    
    // Premium user routes
    premium: [
      '/premium',
      '/dreams',
      '/ai-chat',
      '/premium/export',
      '/premium/stories',
      '/premium/analytics'
    ],
    
    // Admin routes
    admin: [
      '/admin',
      '/admin/users',
      '/admin/content',
      '/admin/settings',
      '/admin/analytics',
      '/admin/theme'
    ]
  }
  
  // Check if route requires authentication
  const requiresAuth = !routeAccess.public.includes(pathname)
  
  // TEMPORARILY DISABLED FOR DEVELOPMENT
  // if (requiresAuth && !token) {
  //   // Redirect to sign in for protected routes
  //   return NextResponse.redirect(new URL('/auth/signin', request.url))
  // }
  
  // Check role-based access
  // TEMPORARILY DISABLED FOR DEVELOPMENT
  // if (token) {
  //   // Free users cannot access premium routes
  //   if (userRole === 'user' && routeAccess.premium.includes(pathname)) {
  //     return NextResponse.redirect(new URL('/subscription', request.url))
  //   }
    
  //   // Free users cannot access admin routes
  //   if (userRole === 'user' && routeAccess.admin.includes(pathname)) {
  //     return NextResponse.redirect(new URL('/dashboard', request.url))
  //   }
    
  //   // Premium users cannot access admin routes
  //   if (userRole === 'premium' && routeAccess.admin.includes(pathname)) {
  //     return NextResponse.redirect(new URL('/premium', request.url))
  //   }
    
  //   // Admin users can access all routes
  //   if (userRole === 'admin') {
  //     return NextResponse.next()
  //   }
  // }
  
  // Redirect based on user role for root path
  // TEMPORARILY DISABLED FOR DEVELOPMENT
  // if (pathname === '/' && token) {
  //   const redirectMap = {
  //     'admin': '/admin',
  //     'premium': '/premium',
  //     'user': '/dashboard'
  //   }
    
  //   const redirectPath = redirectMap[userRole as keyof typeof redirectMap]
  //   if (redirectPath) {
  //     return NextResponse.redirect(new URL(redirectPath, request.url))
  //   }
  // }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}