'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    icon, 
    variant = 'default', 
    size = 'md',
    className,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const baseClasses = `
      w-full
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-primary/20
      disabled:opacity-50 disabled:cursor-not-allowed
      placeholder:text-text-light
    `

    const variantClasses = {
      default: `
        bg-bg border border-gray-200
        focus:border-primary focus:ring-primary/20
        hover:border-gray-300
      `,
      filled: `
        bg-surface border border-transparent
        focus:border-primary focus:ring-primary/20
        hover:bg-gray-50
      `,
      outline: `
        bg-transparent border-2 border-gray-200
        focus:border-primary focus:ring-primary/20
        hover:border-gray-300
      `
    }

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm h-8 rounded-lg',
      md: 'px-4 py-3 text-base h-10 rounded-xl',
      lg: 'px-5 py-4 text-lg h-12 rounded-xl'
    }

    const iconClasses = icon ? 'pl-10' : ''

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-text"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light">
              {icon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            id={inputId}
            className={cn(
              baseClasses,
              variantClasses[variant],
              sizeClasses[size],
              iconClasses,
              error && 'border-error focus:border-error focus:ring-error/20',
              className
            )}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-error"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
export { Input }
