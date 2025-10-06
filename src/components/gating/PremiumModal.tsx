'use client'

import React, { useState } from 'react'
import { 
  X, 
  Crown, 
  Star, 
  Moon, 
  Calculator, 
  Heart, 
  Users,
  CheckCircle,
  Lock,
  Unlock
} from 'lucide-react'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  onStartTrial: () => void
  onMaybeLater: () => void
}

export default function PremiumModal({ 
  isOpen, 
  onClose, 
  onStartTrial, 
  onMaybeLater 
}: PremiumModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const premiumFeatures = [
    {
      icon: Star,
      title: 'Detailed daily horoscopes for all signs',
      description: 'Get comprehensive daily insights for all zodiac signs'
    },
    {
      icon: Moon,
      title: 'AI-powered dream analysis & interpretation',
      description: 'Advanced AI technology to decode your dreams'
    },
    {
      icon: Calculator,
      title: 'Complete numerology calculations',
      description: 'Full numerology reports with all core numbers'
    },
    {
      icon: Heart,
      title: 'Compatibility readings & insights',
      description: 'Deep relationship compatibility analysis'
    },
    {
      icon: Users,
      title: 'Personal cosmic journal & history',
      description: 'Track your cosmic journey over time'
    }
  ]

  const handleStartTrial = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    onStartTrial()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass-card p-8 max-w-md w-full mx-auto animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Unlock Premium Insights</h2>
          <p className="text-white/80">
            Get access to detailed cosmic readings, personalized guidance, and exclusive features that reveal the deeper mysteries of your destiny.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                <p className="text-white/70 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-white mb-1">$9.99<span className="text-lg text-white/70">/month</span></div>
          <p className="text-white/70 text-sm">Cancel anytime • 7-day free trial</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleStartTrial}
            disabled={isLoading}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Star className="w-5 h-5" />
            )}
            <span>{isLoading ? 'Processing...' : 'Start Free Trial'}</span>
          </button>
          
          <button
            onClick={onMaybeLater}
            className="w-full text-white/70 hover:text-white text-sm py-2 transition-colors"
          >
            Maybe Later
          </button>
        </div>

        {/* Legal */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-xs">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-white/80 hover:text-white underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-white/80 hover:text-white underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}