'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'glass-primary' | 'glass-secondary' | 'glass-outline' | 'glass-ghost' | 'premium' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'glass-primary', 
    size = 'md', 
    loading = false, 
    icon, 
    children, 
    className,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = `
      relative overflow-hidden
      font-semibold
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white/20
      disabled:opacity-50 disabled:cursor-not-allowed
      inline-flex items-center justify-center gap-2
      rounded-xl
      group
    `

    const variantClasses = {
      'glass-primary': `
        bg-white/20 backdrop-blur-md
        border border-white/30
        text-white
        hover:bg-white/30 hover:shadow-xl
        shadow-lg
      `,
      'glass-secondary': `
        bg-white/10 backdrop-blur-sm
        border border-white/20
        text-white
        hover:bg-white/20 hover:shadow-lg
      `,
      'glass-outline': `
        bg-transparent
        border-2 border-white/30
        text-white
        hover:bg-white/10 hover:border-white/50
      `,
      'glass-ghost': `
        bg-transparent
        text-white/80
        hover:bg-white/10 hover:text-white
      `,
      'premium': `
        bg-gradient-to-r from-amber-500 via-orange-500 to-red-500
        border border-amber-400/30
        text-white
        hover:shadow-2xl hover:scale-105
        shadow-xl
      `,
      'gradient': `
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        border border-white/30
        text-white
        hover:shadow-2xl hover:scale-105
        shadow-xl
      `
    }

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-12 py-5 text-xl'
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
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">
          {loading && (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          {!loading && icon && (
            <span className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{icon}</span>
          )}
          <span className="group-hover:translate-x-0.5 transition-transform duration-300">{children}</span>
        </div>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button