/**
 * Cosmic Card Component
 * Front-end Design System Expert + UI/UX Engineer
 * 
 * Modern cosmic-themed card with glassmorphism and glow effects
 * Preserves 100% of existing functionality while enhancing visual appeal
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface CosmicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'premium' | 'nebula'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  floating?: boolean
  children: React.ReactNode
  className?: string
}

const CosmicCard = React.forwardRef<HTMLDivElement, CosmicCardProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    glow = false, 
    floating = false,
    children, 
    className,
    ...props 
  }, ref) => {
    const baseClasses = `
      cosmic-card
      relative overflow-hidden
      transition-all duration-300 ease-in-out
      backdrop-blur-sm
    `

    const variantClasses = {
      default: `
        cosmic-card
        bg-cosmic-card
        border border-white/10
        shadow-card
        hover:shadow-cosmic
        hover:scale-105
      `,
      glass: `
        cosmic-card-glass
        bg-cosmic-glass
        border border-white/20
        shadow-glass
        hover:shadow-cosmicGlow
      `,
      premium: `
        cosmic-card-premium
        bg-gradient-to-br from-cosmic-gold/10 to-cosmic-silver/10
        border border-cosmic-gold/30
        shadow-cosmicGlow
        hover:shadow-nebula
      `,
      nebula: `
        cosmic-bg-nebula
        border border-cosmic-blue/30
        shadow-nebula
        hover:shadow-cosmicGlow
      `
    }

    const sizeClasses = {
      sm: 'p-4 rounded-lg',
      md: 'p-6 rounded-xl',
      lg: 'p-8 rounded-2xl'
    }

    const glowClasses = glow ? 'cosmic-animate-glow' : ''
    const floatingClasses = floating ? 'cosmic-animate-float' : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          glowClasses,
          floatingClasses,
          className
        )}
        {...props}
      >
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-violet/5 via-cosmic-blue/5 to-cosmic-gold/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-cosmic-gold/10 to-cosmic-silver/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cosmic-gold/20 to-transparent rounded-bl-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
    )
  }
)

CosmicCard.displayName = 'CosmicCard'

export default CosmicCard
