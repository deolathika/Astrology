import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, disable i18n middleware to fix routing issues
  // We'll implement proper i18n later
  return NextResponse.next()
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico).*)',
  ]
}
