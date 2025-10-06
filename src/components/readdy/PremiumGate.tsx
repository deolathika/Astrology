'use client'

import React, { useState } from 'react'
import Card from './Card'
import Button from './Button'

interface PremiumGateProps {
  children: React.ReactNode
  feature: string
  description?: string
  className?: string
}

export default function PremiumGate({ children, feature, description, className = '' }: PremiumGateProps) {
  const [showUpgrade, setShowUpgrade] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
        <Card className="p-6 text-center max-w-sm mx-auto cosmic-glow">
          <div className="text-4xl mb-4">👑</div>
          <h3 className="text-xl font-bold mb-2 text-cosmic">Premium Feature</h3>
          <p className="text-gray-300 mb-4 text-sm">
            {description || `Unlock ${feature} with Premium access`}
          </p>
          <div className="flex flex-col space-y-2">
            <Button 
              variant="cosmic" 
              size="sm" 
              className="btn-cosmic"
              onClick={() => setShowUpgrade(true)}
            >
              Upgrade to Premium
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowUpgrade(false)}
            >
              Maybe Later
            </Button>
          </div>
        </Card>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="p-8 max-w-md mx-auto cosmic-glow">
            <h2 className="text-2xl font-bold mb-6 text-center text-cosmic">
              Unlock Premium Features
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">All Astrology Systems</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Advanced Numerology</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Detailed Compatibility</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">AI Dream Analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Community Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold text-cosmic">$9.99</div>
                <div className="text-sm text-gray-400">Monthly</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg border-2 border-purple-400">
                <div className="text-2xl font-bold text-cosmic">$99.99</div>
                <div className="text-sm text-gray-400">Yearly (Save 17%)</div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Button variant="cosmic" size="lg" className="btn-cosmic">
                Start Premium Trial
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowUpgrade(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
