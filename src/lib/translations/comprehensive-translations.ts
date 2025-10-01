/**
 * Comprehensive Translation System
 * Multi-language support for Daily Secrets app
 * Includes English, Sinhala, Tamil, Hindi, and Chinese
 */

export interface TranslationData {
  [key: string]: string
}

export interface LanguageConfig {
  code: string
  name: string
  nativeName: string
  direction: 'ltr' | 'rtl'
  flag: string
}

export const supportedLanguages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇺🇸'
  },
  {
    code: 'si',
    name: 'Sinhala',
    nativeName: 'සිංහල',
    direction: 'ltr',
    flag: '🇱🇰'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    direction: 'ltr',
    flag: '🇱🇰'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    flag: '🇮🇳'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    direction: 'ltr',
    flag: '🇨🇳'
  }
]

export const translations: Record<string, TranslationData> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.today': 'Today\'s Guidance',
    'nav.profile': 'Cosmic Profile',
    'nav.zodiac': 'Zodiac Systems',
    'nav.numerology': 'Numerology',
    'nav.compatibility': 'Compatibility',
    'nav.community': 'Community',
    'nav.dreams': 'Dream Analysis',
    'nav.settings': 'Settings',
    'nav.admin': 'Admin Panel',
    'nav.subscription': 'Subscription',
    
    // Zodiac Systems
    'zodiac.western': 'Western Zodiac',
    'zodiac.vedic': 'Vedic Zodiac',
    'zodiac.chinese': 'Chinese Zodiac',
    'zodiac.sri_lankan': 'Sri Lankan Zodiac',
    
    // Numerology
    'numerology.life_path': 'Life Path Number',
    'numerology.expression': 'Expression Number',
    'numerology.soul_urge': 'Soul Urge Number',
    'numerology.personality': 'Personality Number',
    'numerology.master': 'Master Numbers',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
    'common.continue': 'Continue',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    
    // User Interface
    'ui.welcome': 'Welcome to Your Cosmic Journey',
    'ui.cosmic_explorer': 'Cosmic Explorer',
    'ui.discover_secrets': 'Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance.',
    'ui.daily_guidance': 'Daily Cosmic Guidance',
    'ui.today_stars_align': 'Today, the stars align in your favor. Trust your intuition and embrace the cosmic energy flowing through you.',
    'ui.lucky_numbers': 'Lucky Numbers: 7, 14, 21',
    'ui.cosmic_energy': 'Cosmic Energy: High',
    'ui.your_profile': 'Your Cosmic Profile',
    'ui.explore_zodiac': 'Explore Zodiac Systems',
    'ui.numerology_insights': 'Numerology Insights',
    'ui.quick_actions': 'Quick Actions',
    
    // Sri Lankan Astrology
    'sri_lankan.zodiac_signs': 'Sri Lankan Zodiac Signs',
    'sri_lankan.traditional': 'Traditional Sri Lankan Astrology',
    'sri_lankan.cultural_elements': 'Cultural Elements',
    'sri_lankan.lucky_colors': 'Lucky Colors',
    'sri_lankan.lucky_numbers': 'Lucky Numbers',
    'sri_lankan.lucky_days': 'Lucky Days',
    'sri_lankan.lucky_stones': 'Lucky Stones',
    'sri_lankan.lucky_flowers': 'Lucky Flowers',
    'sri_lankan.lucky_metals': 'Lucky Metals',
    
    // Zodiac Signs (Sri Lankan)
    'sign.aries': 'Aries (මේෂ)',
    'sign.taurus': 'Taurus (වෘෂභ)',
    'sign.gemini': 'Gemini (මිථුන)',
    'sign.cancer': 'Cancer (කර්කටක)',
    'sign.leo': 'Leo (සිංහ)',
    'sign.virgo': 'Virgo (කන්‍යා)',
    'sign.libra': 'Libra (තුලා)',
    'sign.scorpio': 'Scorpio (වෘශ්චික)',
    'sign.sagittarius': 'Sagittarius (ධනු)',
    'sign.capricorn': 'Capricorn (මකර)',
    'sign.aquarius': 'Aquarius (කුම්භ)',
    'sign.pisces': 'Pisces (මීන)',
    
    // Elements
    'element.fire': 'Fire',
    'element.earth': 'Earth',
    'element.air': 'Air',
    'element.water': 'Water',
    
    // Qualities
    'quality.cardinal': 'Cardinal',
    'quality.fixed': 'Fixed',
    'quality.mutable': 'Mutable',
    
    // Personality Traits
    'trait.bold': 'Bold',
    'trait.courageous': 'Courageous',
    'trait.independent': 'Independent',
    'trait.leadership': 'Leadership',
    'trait.pioneering': 'Pioneering',
    'trait.stable': 'Stable',
    'trait.reliable': 'Reliable',
    'trait.patient': 'Patient',
    'trait.sensual': 'Sensual',
    'trait.practical': 'Practical',
    'trait.curious': 'Curious',
    'trait.adaptable': 'Adaptable',
    'trait.communicative': 'Communicative',
    'trait.intelligent': 'Intelligent',
    'trait.versatile': 'Versatile',
    'trait.nurturing': 'Nurturing',
    'trait.intuitive': 'Intuitive',
    'trait.protective': 'Protective',
    'trait.emotional': 'Emotional',
    'trait.caring': 'Caring',
    'trait.confident': 'Confident',
    'trait.generous': 'Generous',
    'trait.dramatic': 'Dramatic',
    'trait.loyal': 'Loyal',
    'trait.creative': 'Creative',
    'trait.analytical': 'Analytical',
    'trait.perfectionist': 'Perfectionist',
    'trait.helpful': 'Helpful',
    'trait.modest': 'Modest',
    'trait.diplomatic': 'Diplomatic',
    'trait.charming': 'Charming',
    'trait.fair': 'Fair',
    'trait.social': 'Social',
    'trait.artistic': 'Artistic',
    'trait.intense': 'Intense',
    'trait.passionate': 'Passionate',
    'trait.mysterious': 'Mysterious',
    'trait.transformative': 'Transformative',
    'trait.adventurous': 'Adventurous',
    'trait.optimistic': 'Optimistic',
    'trait.philosophical': 'Philosophical',
    'trait.honest': 'Honest',
    'trait.ambitious': 'Ambitious',
    'trait.disciplined': 'Disciplined',
    'trait.responsible': 'Responsible',
    'trait.innovative': 'Innovative',
    'trait.humanitarian': 'Humanitarian',
    'trait.eccentric': 'Eccentric',
    'trait.progressive': 'Progressive',
    'trait.compassionate': 'Compassionate',
    'trait.empathetic': 'Empathetic',
    'trait.spiritual': 'Spiritual'
  },
  
  si: {
    // Navigation
    'nav.home': 'මුල් පිටුව',
    'nav.today': 'අදේ මගපෙන්වීම',
    'nav.profile': 'අභ්‍යවකාශ පැතිකඩ',
    'nav.zodiac': 'රාශි පද්ධති',
    'nav.numerology': 'සංඛ්‍යා විද්‍යාව',
    'nav.compatibility': 'ගැළපීම',
    'nav.community': 'ප්‍රජාව',
    'nav.dreams': 'සිහින විශ්ලේෂණය',
    'nav.settings': 'සැකසුම්',
    'nav.admin': 'පරිපාලන පැනලය',
    'nav.subscription': 'දායකත්වය',
    
    // Zodiac Systems
    'zodiac.western': 'බටහිර රාශි',
    'zodiac.vedic': 'වෛදික රාශි',
    'zodiac.chinese': 'චීන රාශි',
    'zodiac.sri_lankan': 'ශ්‍රී ලාංකික රාශි',
    
    // Numerology
    'numerology.life_path': 'ජීවන මාර්ග අංකය',
    'numerology.expression': 'ප්‍රකාශ අංකය',
    'numerology.soul_urge': 'ආත්ම ආශා අංකය',
    'numerology.personality': 'පුද්ගලිකත්ව අංකය',
    'numerology.master': 'මහා අංක',
    
    // Common
    'common.loading': 'පූරණය වෙමින්...',
    'common.error': 'දෝෂය',
    'common.success': 'සාර්ථක',
    'common.save': 'සුරකින්න',
    'common.cancel': 'අවලංගු කරන්න',
    'common.close': 'වසන්න',
    'common.back': 'ආපසු',
    'common.next': 'ඊළඟ',
    'common.previous': 'පෙර',
    'common.finish': 'අවසන්',
    'common.continue': 'ඉදිරියට',
    'common.yes': 'ඔව්',
    'common.no': 'නැහැ',
    'common.ok': 'හරි',
    
    // User Interface
    'ui.welcome': 'ඔබේ අභ්‍යවකාශ ගමනට සාදරයෙන් පිළිගනිමු',
    'ui.cosmic_explorer': 'අභ්‍යවකාශ ගවේෂකයා',
    'ui.discover_secrets': 'පුද්ගලික ජ්‍යෝතිෂ්‍ය, සංඛ්‍යා විද්‍යාව සහ අභ්‍යවකාශ මගපෙන්වීම හරහා විශ්වයේ රහස් සොයා ගන්න.',
    'ui.daily_guidance': 'දිනපතා අභ්‍යවකාශ මගපෙන්වීම',
    'ui.today_stars_align': 'අද, තරු ඔබේ පක්ෂයෙන් පෙළගසී. ඔබේ අභ්‍යාන්තර හඬ විශ්වාස කරන්න සහ ඔබ හරහා ගලා යන අභ්‍යවකාශ ශක්තිය ග්‍රහණය කරන්න.',
    'ui.lucky_numbers': 'සුභ සංඛ්‍යා: 7, 14, 21',
    'ui.cosmic_energy': 'අභ්‍යවකාශ ශක්තිය: ඉහළ',
    'ui.your_profile': 'ඔබේ අභ්‍යවකාශ පැතිකඩ',
    'ui.explore_zodiac': 'රාශි පද්ධති ගවේෂණය කරන්න',
    'ui.numerology_insights': 'සංඛ්‍යා විද්‍යා තීක්ෂණ',
    'ui.quick_actions': 'ක්‍රියාකාරී ක්‍රියා',
    
    // Sri Lankan Astrology
    'sri_lankan.zodiac_signs': 'ශ්‍රී ලාංකික රාශි ලකුණු',
    'sri_lankan.traditional': 'සම්ප්‍රදායික ශ්‍රී ලාංකික ජ්‍යෝතිෂ්‍ය',
    'sri_lankan.cultural_elements': 'සංස්කෘතික මූලද්‍රව්‍ය',
    'sri_lankan.lucky_colors': 'සුභ වර්ණ',
    'sri_lankan.lucky_numbers': 'සුභ සංඛ්‍යා',
    'sri_lankan.lucky_days': 'සුභ දින',
    'sri_lankan.lucky_stones': 'සුභ ගල්',
    'sri_lankan.lucky_flowers': 'සුභ මල්',
    'sri_lankan.lucky_metals': 'සුභ ලෝහ',
    
    // Zodiac Signs (Sri Lankan)
    'sign.aries': 'මේෂ',
    'sign.taurus': 'වෘෂභ',
    'sign.gemini': 'මිථුන',
    'sign.cancer': 'කර්කටක',
    'sign.leo': 'සිංහ',
    'sign.virgo': 'කන්‍යා',
    'sign.libra': 'තුලා',
    'sign.scorpio': 'වෘශ්චික',
    'sign.sagittarius': 'ධනු',
    'sign.capricorn': 'මකර',
    'sign.aquarius': 'කුම්භ',
    'sign.pisces': 'මීන',
    
    // Elements
    'element.fire': 'ගින්න',
    'element.earth': 'පස',
    'element.air': 'ගුවන',
    'element.water': 'ජලය',
    
    // Qualities
    'quality.cardinal': 'මූලික',
    'quality.fixed': 'ස්ථාවර',
    'quality.mutable': 'වෙනස්වන',
    
    // Personality Traits
    'trait.bold': 'දර්ශන',
    'trait.courageous': 'ධෛර්යවත්',
    'trait.independent': 'ස්වාධීන',
    'trait.leadership': 'නායකත්වය',
    'trait.pioneering': 'ප්‍රථම',
    'trait.stable': 'ස්ථාවර',
    'trait.reliable': 'විශ්වසනීය',
    'trait.patient': 'ඉවසිලිවන්ත',
    'trait.sensual': 'ඉන්ද්‍රිය',
    'trait.practical': 'ප්‍රායෝගික',
    'trait.curious': 'කුතුහලය',
    'trait.adaptable': 'විධිමත්',
    'trait.communicative': 'සන්නිවේදන',
    'trait.intelligent': 'බුද්ධිමත්',
    'trait.versatile': 'බහුකාර්ය',
    'trait.nurturing': 'පෝෂණ',
    'trait.intuitive': 'අභ්‍යාන්තර',
    'trait.protective': 'රක්ෂණ',
    'trait.emotional': 'චිත්ත',
    'trait.caring': 'සැලකිලිමත්',
    'trait.confident': 'විශ්වාස',
    'trait.generous': 'උදාර',
    'trait.dramatic': 'නාට්‍ය',
    'trait.loyal': 'විශ්වසනීය',
    'trait.creative': 'නිර්මාණ',
    'trait.analytical': 'විශ්ලේෂණ',
    'trait.perfectionist': 'පරිපූර්ණ',
    'trait.helpful': 'උපකාර',
    'trait.modest': 'නිර්භීත',
    'trait.diplomatic': 'දූත',
    'trait.charming': 'මනාල',
    'trait.fair': 'නිර්භීත',
    'trait.social': 'සමාජ',
    'trait.artistic': 'කලා',
    'trait.intense': 'තීව්‍ර',
    'trait.passionate': 'ආශාවන්ත',
    'trait.mysterious': 'ගුප්ත',
    'trait.transformative': 'පරිවර්තන',
    'trait.adventurous': 'සාහසික',
    'trait.optimistic': 'ආශාවන්ත',
    'trait.philosophical': 'දර්ශන',
    'trait.honest': 'සත්‍ය',
    'trait.ambitious': 'අභිලාෂ',
    'trait.disciplined': 'විනය',
    'trait.responsible': 'දැඩි',
    'trait.innovative': 'නව',
    'trait.humanitarian': 'මානව',
    'trait.eccentric': 'විශේෂ',
    'trait.progressive': 'ප්‍රගති',
    'trait.compassionate': 'කරුණා',
    'trait.empathetic': 'සහානුභූත',
    'trait.spiritual': 'ආත්ම'
  }
}

export class TranslationService {
  private static currentLanguage: string = 'en'
  
  /**
   * Set the current language
   */
  static setLanguage(language: string): void {
    if (supportedLanguages.find(lang => lang.code === language)) {
      this.currentLanguage = language
      if (typeof window !== 'undefined') {
        localStorage.setItem('daily-secrets-language', language)
      }
    }
  }
  
  /**
   * Get the current language
   */
  static getCurrentLanguage(): string {
    return this.currentLanguage
  }
  
  /**
   * Get all supported languages
   */
  static getSupportedLanguages(): LanguageConfig[] {
    return supportedLanguages
  }
  
  /**
   * Translate a key to the current language
   */
  static translate(key: string, fallback?: string): string {
    const currentTranslations = translations[this.currentLanguage] || translations['en']
    return currentTranslations[key] || fallback || key
  }
  
  /**
   * Get all translations for a specific language
   */
  static getTranslations(language: string): TranslationData {
    return translations[language] || translations['en']
  }
  
  /**
   * Check if a language is RTL
   */
  static isRTL(language: string): boolean {
    const lang = supportedLanguages.find(l => l.code === language)
    return lang?.direction === 'rtl' || false
  }
  
  /**
   * Initialize language from localStorage
   */
  static initializeLanguage(): void {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('daily-secrets-language')
      if (savedLanguage && supportedLanguages.find(lang => lang.code === savedLanguage)) {
        this.currentLanguage = savedLanguage
      }
    }
  }
}

