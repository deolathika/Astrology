'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, Star } from 'lucide-react'

export function DailyGuidance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="cosmic-card"
      style={{
        background: 'linear-gradient(135deg, rgba(63, 197, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
        borderColor: 'rgba(63, 197, 255, 0.3)',
      }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-celestial-blue/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-celestial-blue" />
        </div>
        <h3 className="text-xl font-bold text-celestial-blue">
          Daily Cosmic Guidance
        </h3>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-starlight-white leading-relaxed mb-4"
      >
        Today, the stars align in your favor. Trust your intuition and embrace the cosmic energy flowing through you. 
        Your spiritual journey continues to unfold with grace and wisdom.
      </motion.p>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-nebula-pink" />
          <span className="text-stellar-gray-light">Lucky Numbers: 7, 14, 21</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-supernova-gold" />
          <span className="text-stellar-gray-light">Cosmic Energy: High</span>
        </div>
      </div>
    </motion.div>
  )
}
