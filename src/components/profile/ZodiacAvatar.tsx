'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { getZodiacInfo, type ZodiacSign } from '@/lib/zodiacUtils'

interface ZodiacAvatarProps {
  sign: ZodiacSign
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-2xl'
}

export default function ZodiacAvatar({ 
  sign, 
  size = 'md', 
  showName = false,
  className = ''
}: ZodiacAvatarProps) {
  const zodiacInfo = getZodiacInfo(sign)
  
  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'from-red-500 to-orange-500'
      case 'earth': return 'from-green-500 to-yellow-500'
      case 'air': return 'from-blue-500 to-cyan-500'
      case 'water': return 'from-blue-600 to-purple-600'
      default: return 'from-violet-500 to-purple-500'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-2 ${className}`}
    >
      <div className={`${sizeClasses[size]} bg-gradient-to-r ${getElementColor(zodiacInfo.element)} rounded-full flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold">
          {zodiacInfo.symbol}
        </span>
      </div>
      
      {showName && (
        <div className="text-violet-200">
          <div className="font-semibold">{zodiacInfo.name}</div>
          <div className="text-xs text-violet-400 capitalize">{zodiacInfo.element}</div>
        </div>
      )}
    </motion.div>
  )
}
