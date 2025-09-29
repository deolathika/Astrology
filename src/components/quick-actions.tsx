'use client'

import { motion } from 'framer-motion'
import { Zap, Moon, Heart, User, Settings } from 'lucide-react'

export function QuickActions() {
  const actions = [
    { icon: Moon, label: 'Dreams', color: 'nebula-red' },
    { icon: Heart, label: 'Compatibility', color: 'cosmic-orange' },
    { icon: User, label: 'Profile', color: 'stellar-yellow' },
    { icon: Settings, label: 'Settings', color: 'cosmic-silver' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="cosmic-card"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.1) 0%, rgba(255, 140, 66, 0.1) 100%)',
        borderColor: 'rgba(255, 71, 87, 0.3)',
      }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-nebula-red/20 rounded-lg">
          <Zap className="w-5 h-5 text-nebula-red" />
        </div>
        <h3 className="text-xl font-bold text-nebula-red">
          Quick Actions
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cosmic-card p-4 text-center cursor-pointer"
              style={{
                background: `linear-gradient(135deg, rgba(123, 79, 255, 0.1) 0%, rgba(123, 79, 255, 0.05) 100%)`,
                borderColor: 'rgba(123, 79, 255, 0.3)',
              }}
            >
              <Icon className="w-6 h-6 mx-auto mb-2 text-electric-violet" />
              <p className="text-starlight-white font-semibold text-sm">
                {action.label}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
