'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'inline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LanguageSelector({ variant = 'dropdown', size = 'md', className = '' }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, languages } = useLanguage()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }

  const buttonSizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2 text-lg',
  }

  const dropdownClasses = `
    bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500
    ${buttonSizeClasses[size]}
    ${className}
  `

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {Object.entries(languages).map(([code, lang]) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${currentLanguage === code 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }
            `}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.nativeName}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center">
        <Globe className="w-4 h-4 mr-2 text-gray-400" />
        <select
          value={currentLanguage}
          onChange={handleLanguageChange}
          className={dropdownClasses}
        >
          {Object.entries(languages).map(([code, lang]) => (
            <option key={code} value={code} className="bg-gray-800 text-white">
              {lang.flag} {lang.nativeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

