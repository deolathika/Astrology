'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button'
import { useAppStore } from '@/lib/stores/app-store'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function MobileMenu({ isOpen, onClose, className }: MobileMenuProps) {
  const { user, logout } = useAppStore()
  const isAuthenticated = !!user

  const menuItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Astrology', href: '/astrology', icon: '🔮', requiresAuth: true },
    { label: 'Numerology', href: '/numerology', icon: '🔢', requiresAuth: true },
    { label: 'Dreams', href: '/dreams', icon: '🌙', requiresAuth: true },
    { label: 'Matches', href: '/matches', icon: '💫', requiresAuth: true },
    { label: 'Settings', href: '/settings', icon: '⚙️', requiresAuth: true },
    ...(user?.role === 'admin' ? [{ label: 'Admin', href: '/admin', icon: '👑', requiresAuth: true }] : [])
  ]

  if (!isOpen) return null

  return (
    <div className={cn('fixed inset-0 z-50 lg:hidden', className)}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* User Info */}
          {isAuthenticated && user && (
            <div className="p-4 border-b border-border bg-muted/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const showItem = !item.requiresAuth || isAuthenticated
              return showItem ? (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start h-12 text-left"
                  onClick={() => {
                    if (item.href) {
                      window.location.href = item.href
                    }
                    onClose()
                  }}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  {item.label}
                </Button>
              ) : null
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-2">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  logout()
                  onClose()
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    window.location.href = '/auth/signin'
                    onClose()
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-electric-violet hover:bg-cosmic-purple"
                  onClick={() => {
                    window.location.href = '/auth/signup'
                    onClose()
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
