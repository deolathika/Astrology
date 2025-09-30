'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Star, 
  Calculator, 
  Calendar, 
  Heart, 
  Users, 
  Bell, 
  Settings, 
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Moon,
  Sun,
  Compass,
  Target,
  Gift,
  BookOpen,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Wifi,
  Lock,
  User,
  Clock,
  MapPin
} from 'lucide-react'

interface NavigationItem {
  label: string
  route: string
  icon: React.ComponentType<{ className?: string }>
  category?: string
  description?: string
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', route: '/home', icon: Home, category: 'main' },
  { label: 'Today', route: '/today', icon: Star, category: 'main' },
  { label: 'Profile', route: '/profile', icon: User, category: 'main' },
  { label: 'Numerology', route: '/numerology', icon: Calculator, category: 'main' },
  { label: 'Zodiac', route: '/zodiac-systems', icon: Moon, category: 'main' },
  { label: 'Compatibility', route: '/compatibility', icon: Heart, category: 'features' },
  { label: 'Community', route: '/community', icon: Users, category: 'features' },
  { label: 'Dreams', route: '/dreams', icon: Moon, category: 'features' },
  { label: 'Notifications', route: '/notifications', icon: Bell, category: 'features' },
  { label: 'Settings', route: '/settings', icon: Settings, category: 'settings' },
  { label: 'Privacy', route: '/legal/privacy', icon: Shield, category: 'legal' },
  { label: 'Terms', route: '/legal/terms', icon: BookOpen, category: 'legal' },
  { label: 'Contact', route: '/contact', icon: Globe, category: 'support' },
  { label: 'Help', route: '/help', icon: Target, category: 'support' },
  { label: 'Premium', route: '/premium', icon: Gift, category: 'premium' },
  { label: 'Donations', route: '/donations', icon: Heart, category: 'premium' }
]

const mainItems = navigationItems.filter(item => item.category === 'main')
const featureItems = navigationItems.filter(item => item.category === 'features')
const settingsItems = navigationItems.filter(item => item.category === 'settings')
const legalItems = navigationItems.filter(item => item.category === 'legal')
const supportItems = navigationItems.filter(item => item.category === 'support')
const premiumItems = navigationItems.filter(item => item.category === 'premium')

export function ComprehensiveNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState('')
  const [showMore, setShowMore] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Set active item based on current path
    const currentItem = navigationItems.find(item => item.route === pathname)
    if (currentItem) {
      setActiveItem(currentItem.label)
    }
  }, [pathname])

  const handleNavigation = (label: string, route: string) => {
    setActiveItem(label)
    router.push(route)
  }

  const renderNavigationItem = (item: NavigationItem, index: number) => {
    const Icon = item.icon
    const isActive = activeItem === item.label
    
    return (
      <motion.button
        key={item.label}
        onClick={() => handleNavigation(item.label, item.route)}
        className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 ${
          isActive 
            ? 'bg-electric-violet/20 text-electric-violet' 
            : 'text-cosmic-silver hover:text-electric-violet'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Icon className="w-6 h-6" />
        <span className="text-xs font-medium">{item.label}</span>
        {isActive && (
          <motion.div
            className="w-1 h-1 bg-electric-violet rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    )
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-deep-space/95 backdrop-blur-md border-t border-cosmic-silver/20"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-2">
        {/* Main Navigation */}
        <div className="flex items-center justify-center space-x-1">
          {mainItems.map((item, index) => renderNavigationItem(item, index))}
          
          {/* More Button */}
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 ${
              showMore 
                ? 'bg-electric-violet/20 text-electric-violet' 
                : 'text-cosmic-silver hover:text-electric-violet'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">More</span>
          </motion.button>
        </div>

        {/* Expanded Navigation */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t border-cosmic-silver/20 pt-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-cosmic-silver/70 uppercase tracking-wider">Features</h4>
                  {featureItems.map((item, index) => renderNavigationItem(item, index))}
                </div>

                {/* Settings */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-cosmic-silver/70 uppercase tracking-wider">Settings</h4>
                  {settingsItems.map((item, index) => renderNavigationItem(item, index))}
                </div>

                {/* Legal */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-cosmic-silver/70 uppercase tracking-wider">Legal</h4>
                  {legalItems.map((item, index) => renderNavigationItem(item, index))}
                </div>

                {/* Support */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-cosmic-silver/70 uppercase tracking-wider">Support</h4>
                  {supportItems.map((item, index) => renderNavigationItem(item, index))}
                </div>

                {/* Premium */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-cosmic-silver/70 uppercase tracking-wider">Premium</h4>
                  {premiumItems.map((item, index) => renderNavigationItem(item, index))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}