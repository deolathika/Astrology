import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Always show the locale in the URL
  localePrefix: 'as-needed',
  
  // Redirect to the locale prefix
  localeDetection: true,
  
  // Custom locale detection
  alternateLinks: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(si-LK|ta-IN|hi-IN|zh-CN|en)/:path*']
};
