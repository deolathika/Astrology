/**
 * Cosmic Input Component
 * Front-end Design System Expert + UI/UX Engineer
 * 
 * Modern cosmic-themed input with glassmorphism and focus effects
 * Preserves 100% of existing functionality while enhancing visual appeal
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface CosmicInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'glass' | 'premium'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  icon?: React.ReactNode
  label?: string
  helperText?: string
  errorMessage?: string
  className?: string
}

const CosmicInput = React.forwardRef<HTMLInputElement, CosmicInputProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    error = false, 
    icon,
    label,
    helperText,
    errorMessage,
    className,
    ...props 
  }, ref) => {
    const baseClasses = `
      cosmic-input
      w-full
      transition-all duration-300 ease-in-out
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variantClasses = {
      default: `
        bg-cosmic-glass
        border border-white/20
        text-white
        placeholder-white/60
        focus:border-cosmic-gold
        focus:ring-2 focus:ring-cosmic-gold/20
        backdrop-blur-sm
      `,
      glass: `
        bg-cosmic-glass
        border border-white/30
        text-white
        placeholder-white/70
        focus:border-cosmic-blue
        focus:ring-2 focus:ring-cosmic-blue/20
        backdrop-blur-md
      `,
      premium: `
        bg-gradient-to-r from-cosmic-gold/10 to-cosmic-silver/10
        border border-cosmic-gold/30
        text-cosmic-gold
        placeholder-cosmic-gold/60
        focus:border-cosmic-gold
        focus:ring-2 focus:ring-cosmic-gold/30
        backdrop-blur-sm
      `
    }

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-3 text-base rounded-xl',
      lg: 'px-6 py-4 text-lg rounded-2xl'
    }

    const errorClasses = error ? `
      border-red-500
      focus:border-red-500
      focus:ring-red-500/20
    ` : ''

    const iconClasses = icon ? 'pl-10' : ''

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-cosmic-gold mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-gold/60">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              baseClasses,
              variantClasses[variant],
              sizeClasses[size],
              errorClasses,
              iconClasses,
              className
            )}
            {...props}
          />
          
          {/* Focus Glow Effect */}
          <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-cosmic-gold/10 to-cosmic-silver/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        
        {error && errorMessage && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </p>
        )}
        
        {!error && helperText && (
          <p className="mt-2 text-sm text-cosmic-text-muted">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

CosmicInput.displayName = 'CosmicInput'

export default CosmicInput
