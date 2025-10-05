'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Sparkles, Star, Moon, Heart, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
  message?: string
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  icon,
  size = 'md',
  className
}) => {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6'
      case 'lg':
        return 'w-12 h-12'
      default:
        return 'w-8 h-8'
    }
  }

  const getTextSize = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-sm'
      case 'lg':
        return 'text-lg'
      default:
        return 'text-base'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center p-8 space-y-4",
        className
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        {icon ? (
          <div className={cn(
            "text-gold-400",
            getSizeClasses(size)
          )}>
            {icon}
          </div>
        ) : (
          <Loader2 className={cn(
            "text-gold-400",
            getSizeClasses(size)
          )} />
        )}
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={cn(
          "text-violet-300 font-medium",
          getTextSize(size)
        )}
      >
        {message}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex space-x-1"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-2 h-2 bg-gold-400 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default LoadingState
