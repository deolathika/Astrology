'use client'

import { motion } from 'framer-motion'
import { Star, Sparkles } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="text-center">
        {/* Cosmic Loading Animation */}
        <motion.div
          className="relative mb-8"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-20 h-20 mx-auto relative">
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-electric-violet/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner glow ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-supernova-gold/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Center star */}
            <div className="absolute inset-4 flex items-center justify-center">
              <Star className="w-8 h-8 text-electric-violet animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-cosmic-gradient-text">
            Loading Your Cosmic Journey...
          </h2>
          
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-electric-violet rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.div
              className="w-2 h-2 bg-supernova-gold rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.2
              }}
            />
            <motion.div
              className="w-2 h-2 bg-stellar-pink rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.4
              }}
            />
          </div>
        </motion.div>

        {/* Floating sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Sparkles className="w-4 h-4 text-supernova-gold" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
