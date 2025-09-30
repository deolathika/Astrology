'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, User, Star, Heart, Moon, Calculator, Users, Bell, 
  Wallet, Settings, Menu, X, ChevronUp, ChevronDown,
  Smartphone, Tablet, Monitor, Wifi, Battery, Volume2,
  Sparkles, Globe, Target, BookOpen, Compass, Crown
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  href: string
  badge?: string
  mobileOptimized?: boolean
  category?: string
}

export function CosmicNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: '/home',
      mobileOptimized: true,
      category: 'main'
    },
    {
      id: 'today',
      label: "Today's Secret",
      icon: Sparkles,
      href: '/today',
      badge: 'New',
      mobileOptimized: true,
      category: 'daily'
    },
    {
      id: 'profile',
      label: 'Cosmic Profile',
      icon: User,
      href: '/profile',
      mobileOptimized: true,
      category: 'profile'
    },
    {
      id: 'zodiac',
      label: 'Zodiac Systems',
      icon: Globe,
      href: '/zodiac-systems',
      mobileOptimized: true,
      category: 'astrology'
    },
    {
      id: 'numerology',
      label: 'Numerology',
      icon: Calculator,
      href: '/numerology',
      mobileOptimized: true,
      category: 'numerology'
    },
    {
      id: 'compatibility',
      label: 'Compatibility',
      icon: Heart,
      href: '/compatibility',
      mobileOptimized: true,
      category: 'relationships'
    },
    {
      id: 'dreams',
      label: 'Dream Journal',
      icon: Moon,
      href: '/dreams',
      mobileOptimized: true,
      category: 'insights'
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      href: '/community',
      mobileOptimized: true,
      category: 'social'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      href: '/notifications',
      mobileOptimized: true,
      category: 'alerts'
    },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: Wallet,
      href: '/wallet',
      mobileOptimized: true,
      category: 'premium'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      mobileOptimized: true,
      category: 'system'
    }
  ]

  const categories = {
    main: { label: 'Main', icon: Home },
    daily: { label: 'Daily', icon: Sparkles },
    profile: { label: 'Profile', icon: User },
    astrology: { label: 'Astrology', icon: Globe },
    numerology: { label: 'Numerology', icon: Calculator },
    relationships: { label: 'Relationships', icon: Heart },
    insights: { label: 'Insights', icon: Moon },
    social: { label: 'Social', icon: Users },
    alerts: { label: 'Alerts', icon: Bell },
    premium: { label: 'Premium', icon: Wallet },
    system: { label: 'System', icon: Settings }
  }

  const groupedItems = navigationItems.reduce((acc, item) => {
    const category = item.category || 'main'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {} as Record<string, NavigationItem[]>)

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Navigation */}
      {isMobile ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg">
          {/* Mobile Status Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-3 h-3" />
                <span>Mobile Mode</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Wifi className="w-3 h-3" />
                  <span>Connected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Battery className="w-3 h-3" />
                  <span>85%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Volume2 className="w-3 h-3" />
                  <span>70%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide">
            {navigationItems.slice(0, 5).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-3 min-w-0 flex-1 transition-colors ${
                    isActive(item.href)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                  <span className="text-xs font-medium mt-1 truncate">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="border-t border-slate-200 p-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center space-x-2 p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span className="text-xs font-medium">More</span>
            </button>
          </div>
        </div>
      ) : (
        /* Desktop Navigation */
        <div className="fixed top-0 right-0 z-50 p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 bg-white border border-slate-200 rounded-lg shadow-lg hover:bg-slate-50 transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      )}

      {/* Mobile/Desktop Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: isMobile ? '100%' : 'auto', y: isMobile ? 0 : 'auto' }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: isMobile ? '100%' : 'auto', y: isMobile ? 0 : 'auto' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`bg-white shadow-xl ${
                isMobile 
                  ? 'fixed right-0 top-0 h-full w-80 max-w-sm' 
                  : 'absolute top-4 right-4 w-80 max-w-sm rounded-xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Navigation</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {Object.entries(groupedItems).map(([categoryKey, items]) => {
                  const category = categories[categoryKey as keyof typeof categories]
                  const CategoryIcon = category.icon
                  const isCategoryOpen = activeCategory === categoryKey
                  
                  return (
                    <div key={categoryKey} className="mb-4">
                      <button
                        onClick={() => setActiveCategory(isCategoryOpen ? null : categoryKey)}
                        className="flex items-center justify-between w-full p-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <CategoryIcon className="w-4 h-4" />
                          <span>{category.label}</span>
                        </div>
                        {isCategoryOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {isCategoryOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 space-y-1"
                          >
                            {items.map((item) => {
                              const Icon = item.icon
                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                                    isActive(item.href)
                                      ? 'bg-indigo-50 text-indigo-700'
                                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span className="text-sm">{item.label}</span>
                                  {item.badge && (
                                    <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Menu Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <div className="text-xs text-slate-500 text-center">
                  Daily Secrets v1.0.0
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}