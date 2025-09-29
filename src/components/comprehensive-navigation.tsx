'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  User,
  Heart,
  Moon,
  Star,
  Settings,
  Search,
  Plus,
  Calendar,
  MessageCircle,
  Share2,
  Bell,
  Shield,
  Zap,
  Sparkles,
  Calculator,
  Users,
  TrendingUp,
  Filter,
  HelpCircle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface NavigationItem {
  label: string
  route: string
  icon: React.ComponentType<any>
  description?: string
}

interface ComprehensiveNavigationProps {
  activeItem?: string
  onNavigate?: (route: string) => void
}

export function ComprehensiveNavigation({ 
  activeItem = 'Home', 
  onNavigate 
}: ComprehensiveNavigationProps) {
  const [showMore, setShowMore] = useState(false)

  const mainNavigation: NavigationItem[] = [
    { label: 'Home', route: '/', icon: Home, description: 'Your cosmic dashboard' },
    { label: 'Profile', route: '/profile', icon: User, description: 'Your cosmic profile' },
    { label: 'Today', route: '/today', icon: Star, description: 'Daily guidance' },
    { label: 'Dreams', route: '/dreams', icon: Moon, description: 'Dream journal' },
    { label: 'Community', route: '/community', icon: Users, description: 'Connect with others' },
    { label: 'Settings', route: '/settings', icon: Settings, description: 'App preferences' }
  ]

  const additionalPages: NavigationItem[] = [
    { label: 'Compatibility', route: '/compatibility', icon: Heart, description: 'Relationship insights' },
    { label: 'Experts', route: '/experts', icon: Star, description: 'Consult with experts' },
    { label: 'Premium', route: '/premium', icon: Zap, description: 'Unlock premium features' },
    { label: 'FAQ', route: '/faq', icon: HelpCircle, description: 'Frequently asked questions' },
    { label: 'Contact', route: '/contact', icon: MessageCircle, description: 'Get in touch' },
    { label: 'About', route: '/about', icon: Info, description: 'Learn about the app' }
  ]

  const handleNavigation = (label: string, route: string) => {
    onNavigate?.(route)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-cosmic-navy/95 backdrop-blur-md border-t border-electric-violet/20"
    >
      <div className="max-w-md mx-auto px-4 py-2">
        {/* Main Navigation */}
        <div className="flex items-center justify-between">
          {mainNavigation.map((item, index) => {
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
                    layoutId="activeIndicator"
                    className="w-1 h-1 bg-electric-violet rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.button>
            )
          })}
          
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

        {/* Additional Pages Dropdown */}
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 border-t border-electric-violet/20 pt-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {additionalPages.map((item, index) => {
                const Icon = item.icon
                const isActive = activeItem === item.label
                
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => {
                      handleNavigation(item.label, item.route)
                      setShowMore(false)
                    }}
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-electric-violet/20 text-electric-violet' 
                        : 'text-cosmic-silver hover:text-electric-violet hover:bg-electric-violet/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-cosmic-silver/70">{item.description}</div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
