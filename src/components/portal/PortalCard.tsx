'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PortalCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  gradient?: boolean
  onClick?: () => void
}

export default function PortalCard({ 
  children, 
  className, 
  hover = true, 
  glass = false, 
  gradient = false,
  onClick 
}: PortalCardProps) {
  const baseClasses = "rounded-xl transition-all duration-300"
  
  const cardClasses = cn(
    baseClasses,
    {
      "portal-card": !glass && !gradient,
      "portal-card-glass": glass,
      "portal-gradient-bg": gradient,
      "cursor-pointer": onClick,
      "hover:shadow-lg hover:-translate-y-1": hover,
    },
    className
  )

  const MotionCard = motion.div

  return (
    <MotionCard
      className={cardClasses}
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </MotionCard>
  )
}
