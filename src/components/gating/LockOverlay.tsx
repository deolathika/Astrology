'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Sparkles } from 'lucide-react'
import CosmicButton from '@/components/cosmic/CosmicButton'

interface LockOverlayProps {
  onUnlock: () => void
  title?: string
  description?: string
  className?: string
}

export default function LockOverlay({
  onUnlock,
  title = "Premium Feature",
  description = "Unlock this feature with Premium",
  className = ""
}: LockOverlayProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Blurred Content */}
      <div className="filter blur-sm pointer-events-none">
        {/* This will be the content that gets blurred */}
      </div>
      
      {/* Lock Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/80 to-purple-900/80 backdrop-blur-sm rounded-xl"
      >
        <div className="text-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-gold-400 to-silver-400 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Lock className="w-8 h-8 text-violet-900" />
          </motion.div>
          
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-violet-200 mb-6">{description}</p>
          
          <CosmicButton
            onClick={onUnlock}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Unlock Premium
          </CosmicButton>
        </div>
      </motion.div>
    </div>
  )
}
