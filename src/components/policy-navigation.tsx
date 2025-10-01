'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, Star, User, Users, Settings, ChevronLeft, 
  Menu, X, Bell, Search, Plus, ArrowLeft,
  Sparkles, Heart, Moon, Sun, Globe, Shield
} from 'lucide-react'
import { getUIPolicy, applyUIPolicy, type UIPolicy } from '@/lib/ui-policies'

interface PolicyNavigationProps {
  feature?: keyof typeof import('@/lib/ui-policies').featurePolicies
  showBreadcrumbs?: boolean
  showBackButton?: boolean
  showProgress?: boolean
  customTitle?: string
}

export function PolicyNavigation({ 
  feature = 'main',
  showBreadcrumbs = true,
  showBackButton = true,
  showProgress = false,
  customTitle
}: PolicyNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [uiPolicy, setUIPolicy] = useState<UIPolicy | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Apply UI policy
    const policy = getUIPolicy(feature)
    setUIPolicy(policy)
    applyUIPolicy(policy)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [feature])

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/home', color: 'text-indigo-600' },
    { id: 'today', label: 'Today', icon: Star, path: '/today', color: 'text-violet-600' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile', color: 'text-blue-600' },
    { id: 'community', label: 'Community', icon: Users, path: '/community', color: 'text-green-600' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings', color: 'text-gray-600' }
  ]

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
    let currentPath = ''
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === segments.length - 1
      
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: currentPath,
        isLast
      })
    })
    
    return breadcrumbs
  }

  const getPageTitle = () => {
    if (customTitle) return customTitle
    
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) return 'Daily Secrets'
    
    const lastSegment = segments[segments.length - 1]
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/home')
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  if (!uiPolicy) {
    return null
  }

  return (
    <>
      {/* Mobile Status Bar */}
      {isMobile && (
        <div className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-200 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <span>9:41</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {uiPolicy.navigation.backButton && pathname !== '/home' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </motion.button>
              )}
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    {getPageTitle()}
                  </h1>
                  {uiPolicy.navigation.breadcrumbs && showBreadcrumbs && (
                    <nav className="flex items-center space-x-1 text-sm text-gray-500">
                      <span>Daily Secrets</span>
                      {getBreadcrumbs().map((crumb, index) => (
                        <React.Fragment key={index}>
                          <span>/</span>
                          <span className={crumb.isLast ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                            {crumb.label}
                          </span>
                        </React.Fragment>
                      ))}
                    </nav>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              
              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-b border-gray-200 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                      pathname === item.path
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation - Mobile */}
      {isMobile && uiPolicy.mobile.bottomNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="flex items-center justify-around py-2">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                  pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </nav>
      )}

      {/* Progress Indicator */}
      {showProgress && uiPolicy.navigation.progressIndicators && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-violet-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Skip Options */}
      {uiPolicy.navigation.skipOptions && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">
                Need help? You can skip this step
              </span>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Feature-specific navigation components
export function OnboardingNavigation() {
  return (
    <PolicyNavigation 
      feature="onboarding"
      showBreadcrumbs={false}
      showBackButton={true}
      showProgress={true}
      customTitle="Setup"
    />
  )
}

export function HomeNavigation() {
  return (
    <PolicyNavigation 
      feature="home"
      showBreadcrumbs={false}
      showBackButton={false}
      showProgress={false}
      customTitle="Daily Secrets"
    />
  )
}

export function ProfileNavigation() {
  return (
    <PolicyNavigation 
      feature="profile"
      showBreadcrumbs={true}
      showBackButton={true}
      showProgress={false}
      customTitle="My Profile"
    />
  )
}

export function CommunityNavigation() {
  return (
    <PolicyNavigation 
      feature="community"
      showBreadcrumbs={true}
      showBackButton={true}
      showProgress={false}
      customTitle="Cosmic Community"
    />
  )
}


