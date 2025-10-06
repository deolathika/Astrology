'use client'

import React, { useState, useEffect } from 'react'
import { useResponsive } from '@/hooks/useDevice'
import { Menu, X, Home, Star, Moon, Heart, Calculator, Users, Settings, Bell, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import OptimizedHeader from './OptimizedHeader'
import OptimizedFooter from './OptimizedFooter'

interface ResponsiveLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Zodiac', href: '/zodiac', icon: Star },
  { name: 'Dreams', href: '/dreams', icon: Moon },
  { name: 'Compatibility', href: '/compatibility', icon: Heart },
  { name: 'Numerology', href: '/numerology', icon: Calculator },
  { name: 'Community', href: '/community', icon: Users }
]

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const responsive = useResponsive()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
      <div className="flex flex-col flex-grow glass-card-strong h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-white/10">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-white">Daily Secrets</h1>
            <p className="text-white/60 text-xs">Cosmic Insights</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === item.href
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">JD</span>
            </div>
            <div>
              <div className="text-white font-medium text-sm">John Doe</div>
              <div className="text-white/60 text-xs">Premium User</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )

  // Mobile Header
  const MobileHeader = () => (
    <header className="lg:hidden glass-nav sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="glass-button p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">Daily Secrets</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="glass-button p-2"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
          <button className="glass-button p-2 relative">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="px-4 pb-4">
          <input
            type="text"
            placeholder="Search cosmic insights..."
            className="w-full glass-input px-4 py-3"
          />
        </div>
      )}
    </header>
  )

  // Mobile Menu
  const MobileMenu = () => (
    <>
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-80 glass-card-strong">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Daily Secrets</h1>
                  <p className="text-white/60 text-xs">Cosmic Insights</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="glass-button p-2"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">JD</span>
                </div>
                <div>
                  <div className="text-white font-medium">John Doe</div>
                  <div className="text-white/60 text-sm">Premium User</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )

  // Bottom Navigation (Mobile)
  const BottomNavigation = () => (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-white/10">
      <div className="flex items-center justify-around py-2">
        {navigationItems.slice(0, 5).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
              pathname === item.href
                ? 'text-white bg-white/20'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Optimized Header */}
      <OptimizedHeader />

      {/* Main Content */}
      <main className={`${responsive.shouldShowSidebar ? 'lg:pl-64' : ''} ${responsive.shouldShowBottomNav ? 'pb-20' : ''}`}>
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {children}
        </div>
      </main>

      {/* Optimized Footer */}
      <OptimizedFooter />
    </div>
  )
}
