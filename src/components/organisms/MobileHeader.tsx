'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button'
import { useAppStore, useUser, useSidebarOpen, useUIActions } from '@/lib/stores/app-store'
import { cn } from '@/lib/utils'

interface MobileHeaderProps {
  className?: string
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
  const user = useUser()
  const sidebarOpen = useSidebarOpen()
  const { setSidebarOpen } = useUIActions()

  return (
    <header className={cn('lg:hidden bg-background border-b border-border sticky top-0 z-40', className)}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          <h1 className="text-lg font-bold text-foreground">Daily Secrets</h1>
        </div>
        
        {user ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                {user.name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export { MobileHeader }
export type { MobileHeaderProps }