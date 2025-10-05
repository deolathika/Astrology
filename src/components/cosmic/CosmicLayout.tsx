/**
 * Cosmic Layout Component
 * Front-end Design System Expert + UI/UX Engineer
 * 
 * Modern cosmic-themed layout with responsive design and cosmic effects
 * Preserves 100% of existing functionality while enhancing visual appeal
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface CosmicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'nebula' | 'glass' | 'premium'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'solid' | 'gradient' | 'nebula' | 'stars'
  children: React.ReactNode
  className?: string
}

const CosmicLayout = React.forwardRef<HTMLDivElement, CosmicLayoutProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    background = 'gradient',
    children, 
    className,
    ...props 
  }, ref) => {
    const baseClasses = `
      cosmic-layout
      min-h-screen
      relative overflow-hidden
    `

    const variantClasses = {
      default: `
        bg-cosmic-background-primary
        text-cosmic-text-primary
      `,
      nebula: `
        cosmic-bg-nebula
        text-cosmic-text-primary
      `,
      glass: `
        bg-cosmic-glass
        backdrop-blur-md
        text-cosmic-text-primary
      `,
      premium: `
        bg-gradient-to-br from-cosmic-violet via-cosmic-blue to-cosmic-gold
        text-cosmic-text-primary
      `
    }

    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12'
    }

    const backgroundClasses = {
      solid: 'bg-cosmic-background-primary',
      gradient: 'bg-gradient-to-br from-cosmic-violet via-cosmic-blue to-cosmic-gold',
      nebula: 'cosmic-bg-nebula',
      stars: 'bg-cosmic-background-primary cosmic-stars'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        {/* Cosmic Background Effects */}
        {background === 'nebula' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-violet/20 via-cosmic-blue/20 to-cosmic-gold/20" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cosmic-gold/5 to-transparent animate-shimmer" />
          </>
        )}
        
        {background === 'stars' && (
          <div className="absolute inset-0 cosmic-stars">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cosmic-gold rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Cosmic Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cosmic-gold/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    )
  }
)

CosmicLayout.displayName = 'CosmicLayout'

export default CosmicLayout
