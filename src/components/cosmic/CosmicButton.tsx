/**
 * Cosmic Button Component
 * Front-end Design System Expert + UI/UX Engineer
 * 
 * Modern cosmic-themed button with animations and effects
 * Preserves 100% of existing functionality while enhancing visual appeal
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface CosmicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'premium'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

const CosmicButton = React.forwardRef<HTMLButtonElement, CosmicButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    icon, 
    children, 
    className,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = `
      cosmic-button
      relative overflow-hidden
      font-medium
      transition-all duration-300 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      inline-flex items-center justify-center gap-2
    `

    const variantClasses = {
      primary: `
        cosmic-button-primary
        bg-gradient-to-r from-cosmic-gold to-cosmic-silver
        text-cosmic-violet-dark
        shadow-button
        hover:shadow-cosmicGlow
        hover:scale-105
        active:scale-95
      `,
      secondary: `
        cosmic-button-secondary
        bg-cosmic-glass
        text-cosmic-gold
        border border-cosmic-gold/30
        backdrop-blur-sm
        hover:border-cosmic-gold
        hover:bg-cosmic-gold/10
      `,
      ghost: `
        cosmic-button-ghost
        text-cosmic-gold
        hover:bg-cosmic-gold/10
        hover:text-cosmic-gold-light
      `,
      premium: `
        cosmic-button-premium
        bg-gradient-to-r from-cosmic-gold via-cosmic-silver to-cosmic-blue
        text-cosmic-violet-dark
        shadow-cosmicGlow
        hover:shadow-nebula
        hover:scale-105
        active:scale-95
        cosmic-animate-glow
      `
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-2xl'
    }

    const loadingClasses = loading ? 'opacity-75 cursor-not-allowed' : ''
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          loadingClasses,
          disabledClasses,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 animate-shimmer" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">
          {loading && (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          {!loading && icon && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          <span>{children}</span>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-cosmic-gold/20 to-cosmic-silver/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </button>
    )
  }
)

CosmicButton.displayName = 'CosmicButton'

export default CosmicButton
export { CosmicButton }

