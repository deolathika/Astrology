'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function ZodiacSystems() {
  const zodiacSystems = [
    { name: 'Western', symbols: '♈♉♊♋♌♍', color: 'electric-violet' },
    { name: 'Vedic', symbols: '♈♉♊♋♌♍', color: 'nebula-pink' },
    { name: 'Chinese', symbols: '🐀🐂🐅🐇🐉🐍', color: 'cosmic-orange' },
    { name: 'Sri Lankan', symbols: '♈♉♊♋♌♍', color: 'aurora-green' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="cosmic-card"
      style={{
        background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.1) 0%, rgba(255, 110, 199, 0.1) 100%)',
        borderColor: 'rgba(157, 78, 221, 0.3)',
      }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-cosmic-purple/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-cosmic-purple" />
        </div>
        <h3 className="text-xl font-bold text-cosmic-purple">
          Explore Zodiac Systems
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {zodiacSystems.map((system, index) => (
          <motion.div
            key={system.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            className="cosmic-card p-4 text-center cursor-pointer"
            style={{
              background: `linear-gradient(135deg, rgba(123, 79, 255, 0.1) 0%, rgba(123, 79, 255, 0.05) 100%)`,
              borderColor: 'rgba(123, 79, 255, 0.3)',
            }}
          >
            <div className="text-2xl mb-2">{system.symbols}</div>
            <p className="text-starlight-white font-bold">{system.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
