'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'

interface OptimizedLoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export const OptimizedLoading = memo(function OptimizedLoading({ 
  message = 'Loading cosmic guidance...', 
  size = 'md' 
}: OptimizedLoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-electric-violet/20"></div>
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-supernova-gold/30"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-4 rounded-full bg-electric-violet"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
      
      <motion.p
        className="mt-4 text-stellar-gray-light text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {message}
      </motion.p>
    </div>
  )
})
