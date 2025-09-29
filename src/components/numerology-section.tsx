'use client'

import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

export function NumerologySection() {
  const numerologyNumbers = [
    { label: 'Life Path', number: '7', color: 'aurora-green' },
    { label: 'Destiny', number: '3', color: 'stellar-teal' },
    { label: 'Soul Urge', number: '9', color: 'cosmic-cyan' },
    { label: 'Personality', number: '5', color: 'celestial-blue' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="cosmic-card"
      style={{
        background: 'linear-gradient(135deg, rgba(118, 255, 156, 0.1) 0%, rgba(0, 245, 255, 0.1) 100%)',
        borderColor: 'rgba(118, 255, 156, 0.3)',
      }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-aurora-green/20 rounded-lg">
          <Calculator className="w-5 h-5 text-aurora-green" />
        </div>
        <h3 className="text-xl font-bold text-aurora-green">
          Numerology Insights
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {numerologyNumbers.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="cosmic-card p-4 text-center"
            style={{
              background: `linear-gradient(135deg, rgba(118, 255, 156, 0.1) 0%, rgba(118, 255, 156, 0.05) 100%)`,
              borderColor: 'rgba(118, 255, 156, 0.3)',
            }}
          >
            <div className="text-3xl font-bold text-aurora-green mb-2">
              {item.number}
            </div>
            <p className="text-starlight-white font-semibold text-sm">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full cosmic-button"
        style={{
          background: 'linear-gradient(135deg, #76FF9C 0%, #00F5FF 100%)',
        }}
      >
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="w-5 h-5" />
          <span className="font-semibold">Complete Numerology Analysis</span>
        </div>
      </motion.button>
    </motion.div>
  )
}
