'use client'

import { motion } from 'framer-motion'
import { Languages, ChevronDown } from 'lucide-react'
interface TranslationBarProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
]

export function TranslationBar({ currentLanguage, onLanguageChange }: TranslationBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="cosmic-card max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-electric-violet/20 rounded-lg">
                <Languages className="w-5 h-5 text-electric-violet" />
              </div>
              <div>
                <p className="text-sm text-stellar-gray-light">Language</p>
                <p className="font-semibold text-starlight-white">Language Settings</p>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-cosmic-navy/50 border border-electric-violet/30 rounded-lg hover:bg-electric-violet/10 transition-colors"
              >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="text-starlight-white font-medium">{currentLang.name}</span>
                <ChevronDown className={`w-4 h-4 text-electric-violet transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-cosmic-navy/90 backdrop-blur-md border border-electric-violet/30 rounded-lg shadow-2xl z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code)
                        setIsOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-electric-violet/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        currentLanguage === lang.code ? 'bg-electric-violet/20' : ''
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-starlight-white font-medium">{lang.name}</span>
                      {currentLanguage === lang.code && (
                        <div className="ml-auto w-2 h-2 bg-electric-violet rounded-full" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
