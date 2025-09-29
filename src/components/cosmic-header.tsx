'use client'

import { motion } from 'framer-motion'
import { Star, Sparkles } from 'lucide-react'

interface User {
  id?: string
  fullName?: string
  email?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  latitude?: number
  longitude?: number
  timezone?: string
}

interface CosmicHeaderProps {
  user?: User | null
}

export function CosmicHeader({ user }: CosmicHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="cosmic-card cosmic-glow"
    >
      <div className="flex items-center space-x-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="p-3 bg-gradient-to-br from-electric-violet to-supernova-gold rounded-2xl"
        >
          <Star className="w-6 h-6 text-white" />
        </motion.div>
        
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-cosmic-gradient-text"
          >
            Welcome to Your Cosmic Journey
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-stellar-gray-light mt-1"
          >
            {user?.fullName || 'Cosmic Explorer'}
          </motion.p>
        </div>
        
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hidden sm:block"
        >
          <Sparkles className="w-8 h-8 text-supernova-gold" />
        </motion.div>
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center text-stellar-gray-light mt-4 leading-relaxed"
      >
        Discover the secrets of the universe through personalized astrology, numerology, and cosmic guidance.
      </motion.p>
    </motion.div>
  )
}
