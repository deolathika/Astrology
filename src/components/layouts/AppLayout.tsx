'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Star, 
  User, 
  Calculator, 
  Moon, 
  Heart, 
  Users, 
  Bell, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Crown,
  Sparkles,
  BarChart3,
  Calendar,
  FileText,
  FlaskConical,
  Zap,
  Globe,
  Smartphone,
  ChevronDown,
  Search,
  Plus
} from 'lucide-react'

interface AppLayoutProps {
  children: React.ReactNode
  user?: any
}

export function AppLayout({ children, user }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userData')
    localStorage.removeItem('userSubscription')
    router.push('/')
  }

  const getNavigationItems = () => {
    const baseItems = [
      { label: 'Dashboard', href: '/main', icon: Home, description: 'Your cosmic overview' },
      { label: 'Today', href: '/today', icon: Star, description: 'Daily insights' },
      { label: 'Profile', href: '/profile', icon: User, description: 'Your cosmic profile' },
      { label: 'Numerology', href: '/numerology', icon: Calculator, description: 'Number meanings' },
      { label: 'Zodiac', href: '/zodiac', icon: Moon, description: 'Astrological insights' },
      { label: 'Compatibility', href: '/compatibility', icon: Heart, description: 'Relationship insights' },
      { label: 'Community', href: '/community', icon: Users, description: 'Connect with others' },
      { label: 'Dreams', href: '/dreams', icon: Moon, description: 'Dream analysis' },
      { label: 'Notifications', href: '/notifications', icon: Bell, description: 'Stay updated' },
      { label: 'Settings', href: '/settings', icon: Settings, description: 'Preferences' }
    ]

    if (userData?.role === 'premium' || userData?.role === 'admin') {
      baseItems.push(
        { label: 'Premium', href: '/premium', icon: Crown, description: 'Premium features' },
        { label: 'Advanced Astrology', href: '/premium/astrology', icon: Sparkles, description: 'Deep cosmic insights' },
        { label: 'AI Dream Analysis', href: '/premium/dreams', icon: Moon, description: 'AI-powered dreams' },
        { label: 'Cosmic Calendar', href: '/premium/calendar', icon: Calendar, description: 'Astrological calendar' },
        { label: 'Data Export', href: '/premium/export', icon: FileText, description: 'Export your data' }
      )
    }

    if (userData?.role === 'admin') {
      baseItems.push(
        { label: 'Admin Panel', href: '/admin', icon: Settings, description: 'System administration' },
        { label: 'User Management', href: '/admin/users', icon: Users, description: 'Manage users' },
        { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, description: 'System analytics' },
        { label: 'Content Management', href: '/admin/content', icon: FileText, description: 'Manage content' },
        { label: 'QA Testing', href: '/admin/qa', icon: FlaskConical, description: 'Quality assurance' }
      )
    }

    return baseItems
  }

  const getThemeClasses = () => {
    if (!userData) return 'bg-gradient-to-br from-slate-50 to-gray-100'
    
    switch (userData.role) {
      case 'premium':
        return 'bg-gradient-to-br from-amber-50 to-orange-100'
      case 'admin':
        return 'bg-gradient-to-br from-slate-900 to-gray-900'
      default:
        return 'bg-gradient-to-br from-slate-50 to-gray-100'
    }
  }

  const getCardClasses = () => {
    if (!userData) return 'bg-white border border-gray-200'
    
    switch (userData.role) {
      case 'premium':
        return 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200'
      case 'admin':
        return 'bg-gradient-to-br from-slate-800 to-gray-800 border-2 border-pink-500'
      default:
        return 'bg-white border border-gray-200'
    }
  }

  const getTextClasses = () => {
    if (!userData) return 'text-gray-900'
    
    switch (userData.role) {
      case 'premium':
        return 'text-amber-900'
      case 'admin':
        return 'text-slate-100'
      default:
        return 'text-gray-900'
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-all duration-300`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 ${getCardClasses()} shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Daily Secrets</h1>
                <p className="text-sm text-gray-500 capitalize">{userData?.role || 'Guest'}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          {userData && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {userData.name?.charAt(0) || userData.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userData.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData.email}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      userData.role === 'admin' ? 'bg-pink-100 text-pink-800' :
                      userData.role === 'premium' ? 'bg-amber-100 text-amber-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {userData.role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                      {userData.role === 'premium' && <Star className="w-3 h-3 mr-1" />}
                      {userData.role?.charAt(0).toUpperCase() + userData.role?.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {getNavigationItems().map((item, index) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-500' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <span className="font-medium">{item.label}</span>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {userData && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  {pathname === '/main' ? 'Dashboard' :
                   pathname === '/premium' ? 'Premium Features' :
                   pathname === '/admin' ? 'Admin Panel' :
                   'Daily Secrets'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search cosmic insights..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu */}
              {userData && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {userData.name?.charAt(0) || userData.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
