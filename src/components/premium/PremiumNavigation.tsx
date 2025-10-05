'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PremiumNavigationProps {
  user: any
  currentPage?: string
}

export default function PremiumNavigation({ user, currentPage = 'dashboard' }: PremiumNavigationProps) {
  const router = useRouter()

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/premium', icon: '🏠' },
    { id: 'insights', label: 'Daily Insights', href: '/premium/insights', icon: '🌟' },
    { id: 'astrology', label: 'Advanced Astrology', href: '/premium/astrology', icon: '🔮' },
    { id: 'numerology', label: 'Numerology', href: '/premium/numerology', icon: '🔢' },
    { id: 'dreams', label: 'Dream Analysis', href: '/premium/dreams', icon: '💭' },
    { id: 'compatibility', label: 'Compatibility', href: '/premium/compatibility', icon: '❤️' },
    { id: 'calendar', label: 'Cosmic Calendar', href: '/premium/calendar', icon: '🗓️' },
    { id: 'consultations', label: 'Expert Consultations', href: '/premium/consultations', icon: '🧑‍🏫' }
  ]

  return (
    <div className="cosmic-card-minimalist-modern">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="card-title">Premium Navigation</h3>
          <p className="text-white/60 text-sm">Access all your premium features</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Premium Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`p-4 rounded-lg text-center transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
                : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
            }`}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-sm font-medium">{item.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/60">
            Welcome back, {user.name || user.email}
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('user')
              router.push('/')
            }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

