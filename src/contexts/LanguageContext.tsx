'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Most useful Indian languages for spiritual/astrology apps
const languages = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  si: { name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
  te: { name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  mr: { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  ml: { name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' }
}

// Simple translations - focusing on key terms
const translations = {
  en: {
    // Navigation
    home: 'Home',
    profile: 'Profile',
    astrology: 'Astrology',
    numerology: 'Numerology',
    dreams: 'Dreams',
    compatibility: 'Compatibility',
    community: 'Community',
    insights: 'Insights',
    
    // Profile
    personalInfo: 'Personal Information',
    preferences: 'Preferences',
    readingHistory: 'Reading History',
    achievements: 'Achievements',
    language: 'Language',
    theme: 'Theme',
    notifications: 'Notifications',
    privacy: 'Privacy',
    save: 'Save',
    edit: 'Edit',
    cancel: 'Cancel',
    
    // Common
    name: 'Name',
    email: 'Email',
    birthDate: 'Birth Date',
    birthTime: 'Birth Time',
    birthLocation: 'Birth Location',
    zodiacSign: 'Zodiac Sign',
    lifePathNumber: 'Life Path Number',
    interests: 'Interests',
    settings: 'Settings',
    logout: 'Logout'
  },
  hi: {
    // Navigation
    home: 'होम',
    profile: 'प्रोफ़ाइल',
    astrology: 'ज्योतिष',
    numerology: 'अंक ज्योतिष',
    dreams: 'सपने',
    compatibility: 'अनुकूलता',
    community: 'समुदाय',
    insights: 'अंतर्दृष्टि',
    
    // Profile
    personalInfo: 'व्यक्तिगत जानकारी',
    preferences: 'प्राथमिकताएं',
    readingHistory: 'पढ़ने का इतिहास',
    achievements: 'उपलब्धियां',
    language: 'भाषा',
    theme: 'थीम',
    notifications: 'सूचनाएं',
    privacy: 'गोपनीयता',
    save: 'सहेजें',
    edit: 'संपादित करें',
    cancel: 'रद्द करें',
    
    // Common
    name: 'नाम',
    email: 'ईमेल',
    birthDate: 'जन्म तिथि',
    birthTime: 'जन्म समय',
    birthLocation: 'जन्म स्थान',
    zodiacSign: 'राशि चिन्ह',
    lifePathNumber: 'जीवन पथ संख्या',
    interests: 'रुचियां',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट'
  },
  ta: {
    // Navigation
    home: 'வீடு',
    profile: 'சுயவிவரம்',
    astrology: 'ஜோதிடம்',
    numerology: 'எண் ஜோதிடம்',
    dreams: 'கனவுகள்',
    compatibility: 'இணக்கத்தன்மை',
    community: 'சமூகம்',
    insights: 'நுண்ணறிவு',
    
    // Profile
    personalInfo: 'தனிப்பட்ட தகவல்',
    preferences: 'விருப்பத்தேர்வுகள்',
    readingHistory: 'படிப்பு வரலாறு',
    achievements: 'சாதனைகள்',
    language: 'மொழி',
    theme: 'தீம்',
    notifications: 'அறிவிப்புகள்',
    privacy: 'தனியுரிமை',
    save: 'சேமி',
    edit: 'திருத்து',
    cancel: 'ரத்து செய்',
    
    // Common
    name: 'பெயர்',
    email: 'மின்னஞ்சல்',
    birthDate: 'பிறந்த தேதி',
    birthTime: 'பிறந்த நேரம்',
    birthLocation: 'பிறந்த இடம்',
    zodiacSign: 'ராசி அடையாளம்',
    lifePathNumber: 'வாழ்க்கை பாதை எண்',
    interests: 'ஆர்வங்கள்',
    settings: 'அமைப்புகள்',
    logout: 'வெளியேறு'
  },
  si: {
    // Navigation
    home: 'මුල් පිටුව',
    profile: 'පැතිකඩ',
    astrology: 'ජ්යෝතිෂ්‍ය',
    numerology: 'අංක ජ්යෝතිෂ්‍ය',
    dreams: 'සිහින',
    compatibility: 'ගැළපුම',
    community: 'ප්‍රජාව',
    insights: 'අවබෝධය',
    
    // Profile
    personalInfo: 'පුද්ගලික තොරතුරු',
    preferences: 'කැමති තේරීම්',
    readingHistory: 'කියවීමේ ඉතිහාසය',
    achievements: 'සාක්ෂි',
    language: 'භාෂාව',
    theme: 'තේමාව',
    notifications: 'දැනුම්දීම්',
    privacy: 'පෞද්ගලිකත්වය',
    save: 'සුරකින්න',
    edit: 'සංස්කරණය',
    cancel: 'අවලංගු කරන්න',
    
    // Common
    name: 'නම',
    email: 'විද්‍යුත් තැපෑල',
    birthDate: 'උපන් දිනය',
    birthTime: 'උපන් වේලාව',
    birthLocation: 'උපන් ස්ථානය',
    zodiacSign: 'රාශි ලකුණ',
    lifePathNumber: 'ජීවිත මාර්ග අංකය',
    interests: 'උනන්දුව',
    settings: 'සැකසුම්',
    logout: 'පිටව යන්න'
  }
}

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
  languages: typeof languages
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('daily-secrets-language')
    if (savedLanguage && languages[savedLanguage as keyof typeof languages]) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    localStorage.setItem('daily-secrets-language', lang)
  }

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage as keyof typeof translations] || translations.en
    return currentTranslations[key as keyof typeof currentTranslations] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

