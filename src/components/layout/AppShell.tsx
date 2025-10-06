'use client'

import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { applyTheme, getStoredTheme } from '@/styles/presets'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export default function AppShell({ children, className = '' }: AppShellProps) {
  // Apply theme on mount
  useEffect(() => {
    const theme = getStoredTheme()
    applyTheme(theme)
  }, [])

  return (
    <div className={`min-h-screen ${className}`}>
      <Navbar />
      <main className="pt-20">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}