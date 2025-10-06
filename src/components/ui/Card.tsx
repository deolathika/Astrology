'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outline' | 'glass-strong' | 'premium'
  hover?: boolean
  children: React.ReactNode
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = true, children, className, ...props }, ref) => {
    const baseClasses = `
      rounded-2xl
      transition-all duration-300
      relative
      overflow-hidden
    `

    const variantClasses = {
      default: `
        bg-white/10 backdrop-blur-sm
        border border-white/20
        shadow-lg
      `,
      glass: `
        bg-white/10 backdrop-blur-md
        border border-white/20
        shadow-lg
      `,
      'glass-strong': `
        bg-white/20 backdrop-blur-lg
        border border-white/30
        shadow-xl
      `,
      elevated: `
        bg-white/5 backdrop-blur-sm
        border border-white/10
        shadow-md
      `,
      outline: `
        bg-transparent border-2 border-white/30
        hover:border-white/50
      `,
      premium: `
        bg-gradient-to-br from-white/20 to-white/10
        backdrop-blur-lg
        border border-white/30
        shadow-2xl
      `
    }

    const hoverClasses = hover ? `
      hover:shadow-2xl hover:-translate-y-2
      hover:bg-white/15
      hover:scale-[1.02]
    ` : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hoverClasses,
          className
        )}
        {...props}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%]"></div>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter }

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-white/70', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight text-white', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export default Card