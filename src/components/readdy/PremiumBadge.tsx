'use client'

import React from 'react'

interface PremiumBadgeProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function PremiumBadge({ className = '', size = 'md' }: PremiumBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  return (
    <span className={`
      inline-flex items-center space-x-1
      bg-gradient-to-r from-purple-500 to-pink-500
      text-white font-semibold rounded-full
      ${sizeClasses[size]}
      ${className}
    `}>
      <span>👑</span>
      <span>Premium</span>
    </span>
  )
}
