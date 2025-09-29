import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'si', 'ta', 'hi', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(si|ta|hi|zh)/:path*']
}
