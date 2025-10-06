'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Crown } from 'lucide-react'

interface LockOverlayProps {
  children: React.ReactNode
  onUnlock: () => void
  feature?: string
}

export default function LockOverlay({ children, onUnlock, feature = 'this feature' }: LockOverlayProps) {
  return (
    <div className="relative group">
      {/* Blurred Content */}
      <div className="filter blur-sm pointer-events-none">
        {children}
      </div>
      
      {/* Lock Overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Unlock Premium
          </h3>
          <p className="text-gray-600 mb-6 max-w-sm">
            Get full access to {feature} and unlock unlimited cosmic insights
          </p>
          
          <button
            onClick={onUnlock}
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-[0_8px_30px_rgba(17,24,39,0.1)] hover:shadow-[0_12px_40px_rgba(17,24,39,0.15)] transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Crown className="w-5 h-5" />
            <span>Upgrade Now</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}