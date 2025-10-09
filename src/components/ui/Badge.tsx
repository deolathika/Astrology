'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center
      font-medium
      rounded-full
      transition-colors
      focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
    `

    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      success: 'bg-green-500 text-white hover:bg-green-600',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600'
    }

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
