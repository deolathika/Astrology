'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from '@/lib/theme-provider'
import { useRoleAccess, getNavigationItems, getRedirectRoute } from '@/lib/role-based-routing'
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
  Sparkles
} from 'lucide-react'

interface ModernLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function ModernLayout({ children, title, description }: ModernLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, loading, isAdmin, isPremium } = useRoleAccess()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userData')
    localStorage.removeItem('userSubscription')
    router.push('/')
  }

  const navigationItems = user ? getNavigationItems(user.role) : []

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme}-theme transition-all duration-300`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
        ${theme === 'premium' ? 'bg-gradient-to-b from-amber-50 to-orange-100' : ''}
        ${theme === 'admin' ? 'bg-gradient-to-b from-slate-900 to-gray-900' : ''}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Daily Secrets
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user.role} {user.role === 'premium' && '⭐'} {user.role === 'admin' && '👑'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = getIcon(item.icon)
            
            return (
              <Link
                key={index}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-500' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                  ${theme === 'premium' && isActive ? 'bg-amber-100 text-amber-700 border-amber-500' : ''}
                  ${theme === 'admin' && isActive ? 'bg-pink-100 text-pink-700 border-pink-500' : ''}
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout button */}
        {user && (
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 ml-4 lg:ml-0">
                {title || 'Daily Secrets'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme indicator */}
              <div className="flex items-center space-x-2">
                {theme === 'premium' && (
                  <div className="flex items-center space-x-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Crown className="w-4 h-4" />
                    <span>Premium</span>
                  </div>
                )}
                {theme === 'admin' && (
                  <div className="flex items-center space-x-1 bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Crown className="w-4 h-4" />
                    <span>Admin</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {description && (
              <p className="text-gray-600 mb-6">{description}</p>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

// Icon mapping function
function getIcon(iconName: string) {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    '🏠': Home,
    '🌟': Star,
    '👤': User,
    '🔢': Calculator,
    '♈': Moon,
    '💕': Heart,
    '👥': Users,
    '🔔': Bell,
    '⚙️': Settings,
    '⭐': Crown,
    '🔮': Sparkles,
    '💭': Moon,
    '📅': Calendar,
    '📊': BarChart,
    '👑': Crown,
    '📝': FileText,
    '🧪': FlaskConical
  }
  
  return iconMap[iconName] || Home
}

// Additional icons
import { Calendar, BarChart, FileText, FlaskConical } from 'lucide-react'

