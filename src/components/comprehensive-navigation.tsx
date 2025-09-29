'use client'

import { motion } from 'framer-motion'
import { 
  Home, 
  Users, 
  Heart, 
  Moon, 
  Settings, 
  User,
  Star,
  HelpCircle,
  Info,
  MessageCircle,
  FileText,
  Shield,
  CreditCard,
  Calendar,
  Search
} from 'lucide-react'
import { useState } from 'react'

const mainNavigationItems = [
  { icon: Home, label: 'Home', active: true, route: '/' },
  { icon: Users, label: 'Community', active: false, route: '/community' },
  { icon: Heart, label: 'Compatibility', active: false, route: '/compatibility' },
  { icon: Moon, label: 'Dreams', active: false, route: '/dreams' },
  { icon: User, label: 'Profile', active: false, route: '/profile' },
]

const additionalPages = [
  { icon: Star, label: 'Premium', route: '/premium' },
  { icon: Users, label: 'Experts', route: '/experts' },
  { icon: HelpCircle, label: 'FAQ', route: '/faq' },
  { icon: Info, label: 'About', route: '/about' },
  { icon: MessageCircle, label: 'Contact', route: '/contact' },
  { icon: Settings, label: 'Settings', route: '/settings' },
]

const legalPages = [
  { icon: FileText, label: 'Terms', route: '/legal/terms' },
  { icon: Shield, label: 'Privacy', route: '/legal/privacy' },
  { icon: CreditCard, label: 'Billing', route: '/billing' },
]

export function ComprehensiveNavigation() {
  const [activeItem, setActiveItem] = useState('Home')
  const [showMore, setShowMore] = useState(false)

  const handleNavigation = (label: string, route: string) => {
    setActiveItem(label)
    if (typeof window !== 'undefined') {
      window.location.href = route
    }
    console.log(`Navigating to: ${label} (${route})`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 cosmic-nav"
    >
      <div className="container mx-auto px-4 py-2">
        {/* Main Navigation */}
        <div className="flex items-center justify-around mb-2">
          {mainNavigationItems.map((item, index) => {
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
                    transition={{ duration: 0.2 }}
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
            className="cosmic-card mb-2"
          >
            <div className="grid grid-cols-3 gap-2 p-4">
              {additionalPages.map((page, index) => {
                const Icon = page.icon
                return (
                  <motion.button
                    key={page.label}
                    onClick={() => handleNavigation(page.label, page.route)}
                    className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-electric-violet/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon className="w-5 h-5 text-electric-violet" />
                    <span className="text-xs text-stellar-gray-light">{page.label}</span>
                  </motion.button>
                )
              })}
            </div>
            
            {/* Legal Pages */}
            <div className="border-t border-electric-violet/20 p-4">
              <div className="text-xs text-stellar-gray-light mb-2">Legal & Support</div>
              <div className="flex space-x-4">
                {legalPages.map((page, index) => {
                  const Icon = page.icon
                  return (
                    <motion.button
                      key={page.label}
                      onClick={() => handleNavigation(page.label, page.route)}
                      className="flex items-center space-x-2 text-xs text-stellar-gray-light hover:text-electric-violet transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{page.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
