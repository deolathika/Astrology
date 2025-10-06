'use client'

import React from 'react'
import { useResponsive } from '@/hooks/useDevice'

interface ResponsiveGridProps {
  children: React.ReactNode
  mobileCols?: number
  tabletCols?: number
  desktopCols?: number
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ResponsiveGrid({ 
  children, 
  mobileCols = 1, 
  tabletCols = 2, 
  desktopCols = 3,
  gap = 'md',
  className = ''
}: ResponsiveGridProps) {
  const responsive = useResponsive()
  
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }

  const getGridCols = () => {
    if (responsive.isMobile) return `grid-cols-${mobileCols}`
    if (responsive.isTablet) return `grid-cols-${tabletCols}`
    return `grid-cols-${desktopCols}`
  }

  return (
    <div className={`grid ${getGridCols()} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

interface ResponsiveCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function ResponsiveCard({ children, className = '', onClick, href }: ResponsiveCardProps) {
  const responsive = useResponsive()
  
  const baseClasses = "glass-card transition-all duration-300"
  const interactiveClasses = onClick || href ? "cursor-pointer hover:glass-strong" : ""
  const mobileClasses = responsive.isMobile ? "p-4" : "p-6"
  
  const cardContent = (
    <div className={`${baseClasses} ${interactiveClasses} ${mobileClasses} ${className}`}>
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {cardContent}
      </a>
    )
  }

  if (onClick) {
    return (
      <div onClick={onClick}>
        {cardContent}
      </div>
    )
  }

  return cardContent
}

interface ResponsiveButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function ResponsiveButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  onClick,
  disabled = false
}: ResponsiveButtonProps) {
  const responsive = useResponsive()
  
  const baseClasses = "glass-button font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    outline: "border-2 border-white/20 hover:border-white/40 text-white",
    ghost: "text-white/70 hover:text-white hover:bg-white/10"
  }
  
  const sizeClasses = {
    sm: responsive.isMobile ? "px-3 py-2 text-sm" : "px-4 py-2 text-sm",
    md: responsive.isMobile ? "px-4 py-3 text-sm" : "px-6 py-3 text-base",
    lg: responsive.isMobile ? "px-6 py-4 text-base" : "px-8 py-4 text-lg"
  }
  
  const widthClasses = fullWidth ? "w-full" : ""
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}

interface ResponsiveTextProps {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'small'
  className?: string
}

export function ResponsiveText({ 
  children, 
  variant = 'body', 
  className = '' 
}: ResponsiveTextProps) {
  const responsive = useResponsive()
  
  const getResponsiveSize = (mobile: string, tablet: string, desktop: string) => {
    if (responsive.isMobile) return mobile
    if (responsive.isTablet) return tablet
    return desktop
  }
  
  const variantClasses = {
    h1: getResponsiveSize('text-3xl', 'text-4xl', 'text-5xl'),
    h2: getResponsiveSize('text-2xl', 'text-3xl', 'text-4xl'),
    h3: getResponsiveSize('text-xl', 'text-2xl', 'text-3xl'),
    h4: getResponsiveSize('text-lg', 'text-xl', 'text-2xl'),
    body: getResponsiveSize('text-sm', 'text-base', 'text-lg'),
    caption: getResponsiveSize('text-xs', 'text-sm', 'text-base'),
    small: getResponsiveSize('text-xs', 'text-xs', 'text-sm')
  }
  
  const baseClasses = {
    h1: 'font-bold',
    h2: 'font-bold',
    h3: 'font-semibold',
    h4: 'font-semibold',
    body: 'font-normal',
    caption: 'font-normal',
    small: 'font-normal'
  }
  
  return (
    <div className={`${variantClasses[variant]} ${baseClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}
