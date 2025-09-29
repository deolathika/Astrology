'use client'

import { motion } from 'framer-motion'
import { Home, Users, Heart, Moon, Settings } from 'lucide-react'
import { useState } from 'react'

const navigationItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Users, label: 'Community', active: false },
  { icon: Heart, label: 'Compatibility', active: false },
  { icon: Moon, label: 'Dreams', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

export function CosmicNavigation() {
  const [activeItem, setActiveItem] = useState('Home')

  const handleNavigation = (label: string) => {
    setActiveItem(label)
    // Add navigation logic here
    console.log(`Navigating to: ${label}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 cosmic-nav"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeItem === item.label
            
            return (
              <motion.button
                key={item.label}
                onClick={() => handleNavigation(item.label)}
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
        </div>
      </div>
    </motion.div>
  )
}
