'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface TranslationContextType {
  language: string
  setLanguage: (language: string) => void
  translate: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations = {
  en: {
    'welcome_cosmic_journey': 'Welcome to Your Cosmic Journey',
    'cosmic_explorer': 'Cosmic Explorer',
    'discover_cosmic_secrets': 'Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance.',
    'daily_cosmic_guidance': 'Daily Cosmic Guidance',
    'daily_guidance_text': 'Today, the stars align in your favor. Trust your intuition and embrace the cosmic energy flowing through you.',
    'lucky_numbers': 'Lucky Numbers: 7, 14, 21',
    'cosmic_energy_high': 'Cosmic Energy: High',
    'your_cosmic_profile': 'Your Cosmic Profile',
    'explore_zodiac_systems': 'Explore Zodiac Systems',
    'numerology_insights': 'Numerology Insights',
    'quick_actions': 'Quick Actions',
    'home': 'Home',
    'community': 'Community',
    'compatibility': 'Compatibility',
    'dreams': 'Dreams',
    'settings': 'Settings',
    'language': 'Language',
    'loading_cosmic_journey': 'Loading Your Cosmic Journey...',
  },
  si: {
    'welcome_cosmic_journey': 'ඔබේ අභ්‍යවකාශ ගමනට සාදරයෙන් පිළිගනිමු',
    'cosmic_explorer': 'අභ්‍යවකාශ ගවේෂකයා',
    'discover_cosmic_secrets': 'පුද්ගලික ජ්‍යෝතිෂ්‍ය, සංඛ්‍යා විද්‍යාව සහ අභ්‍යවකාශ මගපෙන්වීම හරහා විශ්වයේ රහස් සොයා ගන්න.',
    'daily_cosmic_guidance': 'දිනපතා අභ්‍යවකාශ මගපෙන්වීම',
    'daily_guidance_text': 'අද, තරු ඔබේ පක්ෂයෙන් පෙළගසී. ඔබේ අභ්‍යාන්තර හඬ විශ්වාස කරන්න සහ ඔබ හරහා ගලා යන අභ්‍යවකාශ ශක්තිය ග්‍රහණය කරන්න.',
    'lucky_numbers': 'සුභ සංඛ්‍යා: 7, 14, 21',
    'cosmic_energy_high': 'අභ්‍යවකාශ ශක්තිය: ඉහළ',
    'your_cosmic_profile': 'ඔබේ අභ්‍යවකාශ පැතිකඩ',
    'explore_zodiac_systems': 'රාශි පද්ධති ගවේෂණය කරන්න',
    'numerology_insights': 'සංඛ්‍යා විද්‍යා තීක්ෂණ',
    'quick_actions': 'ක්‍රියාකාරී ක්‍රියා',
    'home': 'මුල් පිටුව',
    'community': 'ප්‍රජාව',
    'compatibility': 'ගැළපීම',
    'dreams': 'සිහින',
    'settings': 'සැකසුම්',
    'language': 'භාෂාව',
    'loading_cosmic_journey': 'ඔබේ අභ්‍යවකාශ ගමන පූරණය වෙමින්...',
  },
  ta: {
    'welcome_cosmic_journey': 'உங்கள் வானியல் பயணத்திற்கு வரவேற்கிறோம்',
    'cosmic_explorer': 'வானியல் ஆராய்ச்சியாளர்',
    'discover_cosmic_secrets': 'தனிப்பட்ட ஜோதிடம், எண் கணிதம் மற்றும் வானியல் வழிகாட்டுதல் மூலம் பிரபஞ்சத்தின் இரகசியங்களைக் கண்டறியுங்கள்.',
    'daily_cosmic_guidance': 'தினசரி வானியல் வழிகாட்டுதல்',
    'daily_guidance_text': 'இன்று, நட்சத்திரங்கள் உங்கள் சார்பில் வரிசையாகின்றன. உங்கள் உள்ளுணர்வை நம்புங்கள் மற்றும் உங்கள் வழியாக பாயும் வானியல் ஆற்றலை ஏற்றுக்கொள்ளுங்கள்.',
    'lucky_numbers': 'அதிர்ஷ்ட எண்கள்: 7, 14, 21',
    'cosmic_energy_high': 'வானியல் ஆற்றல்: உயர்',
    'your_cosmic_profile': 'உங்கள் வானியல் சுயவிவரம்',
    'explore_zodiac_systems': 'ராசி அமைப்புகளை ஆராயுங்கள்',
    'numerology_insights': 'எண் கணித நுண்ணறிவு',
    'quick_actions': 'விரைவு செயல்கள்',
    'home': 'முகப்பு',
    'community': 'சமூகம்',
    'compatibility': 'பொருத்தம்',
    'dreams': 'கனவுகள்',
    'settings': 'அமைப்புகள்',
    'language': 'மொழி',
    'loading_cosmic_journey': 'உங்கள் வானியல் பயணம் ஏற்றப்படுகிறது...',
  },
  hi: {
    'welcome_cosmic_journey': 'आपकी ब्रह्मांडीय यात्रा में आपका स्वागत है',
    'cosmic_explorer': 'ब्रह्मांडीय खोजकर्ता',
    'discover_cosmic_secrets': 'व्यक्तिगत ज्योतिष, अंक ज्योतिष और ब्रह्मांडीय मार्गदर्शन के माध्यम से ब्रह्मांड के रहस्यों की खोज करें।',
    'daily_cosmic_guidance': 'दैनिक ब्रह्मांडीय मार्गदर्शन',
    'daily_guidance_text': 'आज, तारे आपके पक्ष में हैं। अपनी अंतर्ज्ञान पर भरोसा करें और आपके माध्यम से बहने वाली ब्रह्मांडीय ऊर्जा को ग्रहण करें।',
    'lucky_numbers': 'भाग्यशाली संख्याएं: 7, 14, 21',
    'cosmic_energy_high': 'ब्रह्मांडीय ऊर्जा: उच्च',
    'your_cosmic_profile': 'आपका ब्रह्मांडीय प्रोफ़ाइल',
    'explore_zodiac_systems': 'राशि प्रणालियों का अन्वेषण करें',
    'numerology_insights': 'अंक ज्योतिष अंतर्दृष्टि',
    'quick_actions': 'त्वरित कार्य',
    'home': 'होम',
    'community': 'समुदाय',
    'compatibility': 'अनुकूलता',
    'dreams': 'सपने',
    'settings': 'सेटिंग्स',
    'language': 'भाषा',
    'loading_cosmic_journey': 'आपकी ब्रह्मांडीय यात्रा लोड हो रही है...',
  },
  zh: {
    'welcome_cosmic_journey': '欢迎来到您的宇宙之旅',
    'cosmic_explorer': '宇宙探索者',
    'discover_cosmic_secrets': '通过个性化占星术、数字学和宇宙指导发现宇宙的秘密。',
    'daily_cosmic_guidance': '每日宇宙指导',
    'daily_guidance_text': '今天，星星为您排列。相信您的直觉，拥抱流经您的宇宙能量。',
    'lucky_numbers': '幸运数字: 7, 14, 21',
    'cosmic_energy_high': '宇宙能量: 高',
    'your_cosmic_profile': '您的宇宙档案',
    'explore_zodiac_systems': '探索星座系统',
    'numerology_insights': '数字学洞察',
    'quick_actions': '快速操作',
    'home': '首页',
    'community': '社区',
    'compatibility': '兼容性',
    'dreams': '梦境',
    'settings': '设置',
    'language': '语言',
    'loading_cosmic_journey': '正在加载您的宇宙之旅...',
  },
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en')

  const translate = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.en
    return currentTranslations[key as keyof typeof currentTranslations] || key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  )
}
