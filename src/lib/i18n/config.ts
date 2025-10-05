import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Supported locales
export const locales = ['en', 'si-LK', 'ta-IN', 'hi-IN', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Locale configuration
export const localeConfig = {
  'en': {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    region: 'Global',
    astrologySystem: 'western',
    numerologySystem: 'pythagorean'
  },
  'si-LK': {
    name: 'Sinhala',
    nativeName: 'සිංහල',
    flag: '🇱🇰',
    direction: 'ltr',
    region: 'Sri Lanka',
    astrologySystem: 'sri-lankan',
    numerologySystem: 'traditional'
  },
  'ta-IN': {
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    direction: 'ltr',
    region: 'India/Sri Lanka',
    astrologySystem: 'vedic',
    numerologySystem: 'chaldean'
  },
  'hi-IN': {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr',
    region: 'India',
    astrologySystem: 'vedic',
    numerologySystem: 'chaldean'
  },
  'zh-CN': {
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr',
    region: 'China',
    astrologySystem: 'chinese',
    numerologySystem: 'chinese'
  }
} as const;

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  
  if (locales.includes(locale)) {
    return locale;
  }
  
  return defaultLocale;
}

// Get pathname without locale
export function getPathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  
  if (locales.includes(locale)) {
    return '/' + segments.slice(2).join('/');
  }
  
  return pathname;
}

// Get localized pathname
export function getLocalizedPathname(pathname: string, locale: Locale): string {
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);
  
  if (locale === defaultLocale) {
    return pathWithoutLocale;
  }
  
  return `/${locale}${pathWithoutLocale}`;
}

// Next-intl configuration
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: getTimeZoneForLocale(locale as Locale),
    now: new Date()
  };
});

// Get timezone for locale
function getTimeZoneForLocale(locale: Locale): string {
  switch (locale) {
    case 'si-LK':
      return 'Asia/Colombo';
    case 'ta-IN':
    case 'hi-IN':
      return 'Asia/Kolkata';
    case 'zh-CN':
      return 'Asia/Shanghai';
    default:
      return 'UTC';
  }
}

// Get date/time format for locale
function getDateTimeFormat(locale: Locale) {
  switch (locale) {
    case 'si-LK':
      return {
        short: {
          date: 'dd/MM/yyyy',
          time: 'HH:mm'
        },
        long: {
          date: 'dd MMMM yyyy',
          time: 'HH:mm:ss'
        }
      };
    case 'ta-IN':
    case 'hi-IN':
      return {
        short: {
          date: 'dd/MM/yyyy',
          time: 'HH:mm'
        },
        long: {
          date: 'dd MMMM yyyy',
          time: 'HH:mm:ss'
        }
      };
    case 'zh-CN':
      return {
        short: {
          date: 'yyyy/MM/dd',
          time: 'HH:mm'
        },
        long: {
          date: 'yyyy年MM月dd日',
          time: 'HH:mm:ss'
        }
      };
    default:
      return {
        short: {
          date: 'MM/dd/yyyy',
          time: 'HH:mm'
        },
        long: {
          date: 'MMMM dd, yyyy',
          time: 'HH:mm:ss'
        }
      };
  }
}

// Get number format for locale
function getNumberFormat(locale: Locale) {
  switch (locale) {
    case 'si-LK':
      return {
        currency: {
          style: 'currency' as const,
          currency: 'LKR',
          minimumFractionDigits: 2
        },
        decimal: {
          style: 'decimal' as const,
          minimumFractionDigits: 2
        }
      };
    case 'ta-IN':
    case 'hi-IN':
      return {
        currency: {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 2
        },
        decimal: {
          style: 'decimal' as const,
          minimumFractionDigits: 2
        }
      };
    case 'zh-CN':
      return {
        currency: {
          style: 'currency',
          currency: 'CNY',
          minimumFractionDigits: 2
        },
        decimal: {
          style: 'decimal' as const,
          minimumFractionDigits: 2
        }
      };
    default:
      return {
        currency: {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
        },
        decimal: {
          style: 'decimal' as const,
          minimumFractionDigits: 2
        }
      };
  }
}

// Get list format for locale
function getListFormat(locale: Locale) {
  switch (locale) {
    case 'si-LK':
      return {
        style: 'long',
        type: 'conjunction'
      };
    case 'ta-IN':
    case 'hi-IN':
      return {
        style: 'long',
        type: 'conjunction'
      };
    case 'zh-CN':
      return {
        style: 'long',
        type: 'conjunction'
      };
    default:
      return {
        style: 'long',
        type: 'conjunction'
      };
  }
}
