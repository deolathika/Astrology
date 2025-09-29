'use client'

import { motion } from 'framer-motion'
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

interface CosmicProfileProps {
  user?: User | null
}

export function CosmicProfile({ user }: CosmicProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="cosmic-card"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 215, 90, 0.1) 0%, rgba(255, 224, 102, 0.1) 100%)',
        borderColor: 'rgba(255, 215, 90, 0.3)',
      }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-supernova-gold/20 rounded-lg">
          <User className="w-5 h-5 text-supernova-gold" />
        </div>
        <h3 className="text-xl font-bold text-supernova-gold">
          Your Cosmic Profile
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cosmic-card p-4 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(123, 79, 255, 0.1) 0%, rgba(123, 79, 255, 0.05) 100%)',
            borderColor: 'rgba(123, 79, 255, 0.3)',
          }}
        >
          <div className="text-2xl mb-2">♈</div>
          <p className="text-sm text-electric-violet font-semibold">Western</p>
          <p className="text-starlight-white font-bold">Aries</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cosmic-card p-4 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.1) 0%, rgba(255, 140, 66, 0.05) 100%)',
            borderColor: 'rgba(255, 140, 66, 0.3)',
          }}
        >
          <div className="text-2xl mb-2">🐉</div>
          <p className="text-sm text-cosmic-orange font-semibold">Chinese</p>
          <p className="text-starlight-white font-bold">Dragon</p>
        </motion.div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full cosmic-button"
      >
        <div className="flex items-center justify-center space-x-2">
          <Star className="w-5 h-5" />
          <span className="font-semibold">Full Analysis</span>
        </div>
      </motion.button>
    </motion.div>
  )
}
