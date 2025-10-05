'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: 'user' | 'premium' | 'admin'
  setTheme: (theme: 'user' | 'premium' | 'admin') => void
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'user' | 'premium' | 'admin'>('user')
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('daily-secrets-theme')
    const savedDark = localStorage.getItem('daily-secrets-dark') === 'true'
    
    if (savedTheme && ['user', 'premium', 'admin'].includes(savedTheme)) {
      setTheme(savedTheme as 'user' | 'premium' | 'admin')
    }
    
    setIsDark(savedDark)
    
    // Load user role from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        if (user.role === 'premium') {
          setTheme('premium')
        } else if (user.role === 'admin') {
          setTheme('admin')
        } else {
          setTheme('user')
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Apply theme to document
      document.documentElement.className = `${theme}-theme ${isDark ? 'dark' : ''}`
      
      // Save to localStorage
      localStorage.setItem('daily-secrets-theme', theme)
      localStorage.setItem('daily-secrets-dark', isDark.toString())
    }
  }, [theme, isDark, mounted])

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme utility functions
export function getThemeClasses(theme: 'user' | 'premium' | 'admin') {
  const baseClasses = 'min-h-screen transition-all duration-300'
  
  switch (theme) {
    case 'premium':
      return `${baseClasses} premium-theme bg-gradient-to-br from-amber-50 to-orange-100`
    case 'admin':
      return `${baseClasses} admin-theme bg-gradient-to-br from-slate-900 to-gray-900`
    default:
      return `${baseClasses} user-theme bg-gradient-to-br from-slate-50 to-gray-100`
  }
}

export function getCardClasses(theme: 'user' | 'premium' | 'admin') {
  const baseClasses = 'role-card rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl'
  
  switch (theme) {
    case 'premium':
      return `${baseClasses} bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300`
    case 'admin':
      return `${baseClasses} bg-gradient-to-br from-slate-800 to-gray-800 border-2 border-pink-500 hover:border-pink-400`
    default:
      return `${baseClasses} bg-white border border-gray-200 hover:border-gray-300`
  }
}

export function getButtonClasses(theme: 'user' | 'premium' | 'admin') {
  const baseClasses = 'role-button px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105'
  
  switch (theme) {
    case 'premium':
      return `${baseClasses} bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl`
    case 'admin':
      return `${baseClasses} bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl`
    default:
      return `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700`
  }
}

export function getTextClasses(theme: 'user' | 'premium' | 'admin') {
  const baseClasses = 'role-text'
  
  switch (theme) {
    case 'premium':
      return `${baseClasses} text-amber-800`
    case 'admin':
      return `${baseClasses} text-slate-200`
    default:
      return `${baseClasses} text-gray-700`
  }
}

export function getHeadingClasses(theme: 'user' | 'premium' | 'admin') {
  const baseClasses = 'role-heading font-bold'
  
  switch (theme) {
    case 'premium':
      return `${baseClasses} text-3xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent`
    case 'admin':
      return `${baseClasses} text-3xl bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent`
    default:
      return `${baseClasses} text-3xl text-indigo-600`
  }
}

