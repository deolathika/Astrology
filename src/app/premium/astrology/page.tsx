'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import CosmicNebulaBackground from '@/components/cosmic/CosmicNebulaBackground'
import ComprehensiveAstrologySystem from '@/components/astrology/ComprehensiveAstrologySystem'

export default function PremiumAstrologyPage() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      // Allow all authenticated users to access premium astrology
      setUser(userData)
    } else {
      router.push('/')
    }
  }, [router])

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center cosmic-minimalist-modern-bg">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen cosmic-minimalist-modern-bg relative overflow-hidden">
      <CosmicNebulaBackground />

      {/* Minimalist Modern Navigation */}
      <nav className="cosmic-nav-minimalist-modern fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/premium" className="logo">
                Premium Astrology
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-minimal-text-primary">Welcome, {user.name || user.email}!</span>
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  router.push('/')
                }}
                className="cosmic-btn-minimalist-modern"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12 fade-in-minimalist-modern">
            <h1 className="cosmic-hero-title-minimalist-modern">
              Advanced
              <span className="block mt-4">
                Astrology System
              </span>
            </h1>
            <p className="cosmic-hero-subtitle-minimalist-modern">
              Comprehensive astrology with real NASA data, multiple zodiac systems, and advanced calculations
            </p>
          </div>

          {/* Comprehensive Astrology System */}
          <ComprehensiveAstrologySystem user={user} />
        </div>
      </div>

      {/* Footer */}
      <footer className="cosmic-footer-minimalist-modern relative z-20 mt-12">
        <p>&copy; {new Date().getFullYear()} Daily Secrets Premium Astrology. All rights reserved.</p>
      </footer>
    </div>
  )
}

