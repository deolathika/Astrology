'use client'

import React from 'react'
import { Lock, Star } from 'lucide-react'

interface LockOverlayProps {
  isVisible: boolean
  onUnlock: () => void
  message?: string
  children?: React.ReactNode
}

export default function LockOverlay({ 
  isVisible, 
  onUnlock, 
  message = "Unlock Premium to access this feature",
  children 
}: LockOverlayProps) {
  if (!isVisible) return <>{children}</>

  return (
    <div className="relative">
      {/* Blurred Content */}
      <div className="filter blur-sm pointer-events-none">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
        <div className="cosmic-card p-8 text-center max-w-sm mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="cosmic-title text-xl mb-2">Premium Feature</h3>
          <p className="cosmic-text mb-6">{message}</p>
          
          <button 
            onClick={onUnlock}
            className="cosmic-button w-full flex items-center justify-center gap-2"
          >
            <Star className="w-5 h-5" />
            Unlock Premium
          </button>
        </div>
      </div>
    </div>
  )
}

