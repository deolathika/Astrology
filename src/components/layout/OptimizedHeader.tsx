'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { 
  Sparkles, 
  Star, 
  Moon, 
  Heart, 
  Calculator,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Sun,
  ChevronDown,
  User,
  Crown,
  LogOut,
  Shield,
  Zap,
  Target,
  BookOpen,
  Calendar,
  TrendingUp,
  Activity,
  Globe,
  MapPin,
  Clock,
  RefreshCw,
  Filter,
  Plus,
  ChevronRight,
  Lock,
  Unlock
} from 'lucide-react'
import { useResponsive } from '@/hooks/useDevice'
import { useUser } from '@/contexts/UserContext'

export default function OptimizedHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const responsive = useResponsive()
  const { user, logout } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(3)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const navigationItems = [
    { name: 'Home', href: '/', icon: Star, description: 'Your cosmic dashboard' },
    { name: 'Zodiac', href: '/zodiac', icon: Star, description: 'Daily horoscopes & insights' },
    { name: 'Dreams', href: '/dreams', icon: Moon, description: 'AI dream analysis' },
    { name: 'Love', href: '/compatibility', icon: Heart, description: 'Relationship compatibility' },
    { name: 'Numbers', href: '/numerology', icon: Calculator, description: 'Numerology insights' },
    { name: 'Community', href: '/community', icon: Users, description: 'Connect with others' }
  ]

  const quickActions = [
    { name: 'Get Horoscope', href: '/zodiac', icon: Star, color: 'from-purple-500 to-blue-500' },
    { name: 'Dream Analysis', href: '/dreams', icon: Moon, color: 'from-indigo-500 to-purple-500' },
    { name: 'Love Check', href: '/compatibility', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { name: 'Lucky Numbers', href: '/numerology', icon: Calculator, color: 'from-blue-500 to-cyan-500' }
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    router.push('/')
  }

  // Mobile Header
  if (responsive.isMobile) {
    return (
      <header className="glass-nav sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Daily Secrets</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="glass-button p-2"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="glass-button p-2 relative">
              <Bell className="w-5 h-5 text-white" />
              {notifications > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{notifications}</span>
                </div>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass-button p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="px-4 pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Search cosmic insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-3"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="glass-card-strong mx-4 mb-4 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-white/60">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* User Section */}
            <div className="border-t border-white/10 mt-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{user?.name || 'Guest User'}</div>
                  <div className="text-white/60 text-sm">
                    {user?.subscription === 'premium' ? 'Premium User' : 'Free User'}
                  </div>
                </div>
                {user?.subscription === 'premium' && (
                  <Crown className="w-5 h-5 text-yellow-400" />
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    )
  }

  // Desktop Header
  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gradient">Daily Secrets</span>
              <div className="text-white/60 text-sm">Cosmic Insights</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  pathname === item.href
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                <div className="absolute top-full left-0 mt-2 w-48 glass-card p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="text-white text-sm">{item.description}</div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="glass-button p-2"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 glass-card-strong p-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search cosmic insights..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full glass-input pl-10 pr-4 py-3"
                      autoFocus
                    />
                  </form>
                  
                  {/* Quick Actions */}
                  <div className="mt-4">
                    <div className="text-white/70 text-sm mb-2">Quick Actions</div>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => (
                        <Link
                          key={index}
                          href={action.href}
                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <div className={`w-6 h-6 bg-gradient-to-r ${action.color} rounded flex items-center justify-center`}>
                            <action.icon className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white text-sm">{action.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="glass-button p-2"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
            </button>

            {/* Notifications */}
            <button className="glass-button p-2 relative">
              <Bell className="w-5 h-5 text-white" />
              {notifications > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{notifications}</span>
                </div>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 px-4 py-2 glass-button"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">{user?.name || 'Guest User'}</div>
                  <div className="text-white/60 text-xs">
                    {user?.subscription === 'premium' ? 'Premium' : 'Free'}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-card-strong py-2 z-50">
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{user?.name || 'Guest User'}</div>
                        <div className="text-white/60 text-sm">
                          {user?.subscription === 'premium' ? 'Premium User' : 'Free User'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    
                    <Link
                      href="/settings"
                      className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    
                    {user?.subscription === 'premium' ? (
                      <Link
                        href="/premium"
                        className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Crown className="w-4 h-4" />
                        <span>Premium Dashboard</span>
                      </Link>
                    ) : (
                      <Link
                        href="/premium"
                        className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Crown className="w-4 h-4" />
                        <span>Upgrade to Premium</span>
                      </Link>
                    )}
                  </div>
                  
                  <div className="border-t border-white/10 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
