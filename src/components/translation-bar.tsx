'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, ChevronDown, Check } from 'lucide-react'

interface TranslationBarProps {
  currentLanguage?: string
  onLanguageChange?: (language: string) => void
}

export function TranslationBar({ 
  currentLanguage = 'en', 
  onLanguageChange 
}: TranslationBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
      >
        <Globe className="w-4 h-4 text-white" />
        <span className="text-white text-sm">{currentLang.flag}</span>
        <span className="text-white text-sm">{currentLang.name}</span>
        <ChevronDown className="w-4 h-4 text-white" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange?.(language.code)
                setIsOpen(false)
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-gray-700">{language.name}</span>
              {language.code === currentLanguage && (
                <Check className="w-4 h-4 text-green-500 ml-auto" />
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}