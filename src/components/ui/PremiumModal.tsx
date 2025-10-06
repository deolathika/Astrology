'use client'

import React from 'react'
import { X, Star, Crown, Zap, Shield, Users } from 'lucide-react'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  if (!isOpen) return null

  const features = [
    { icon: Star, text: "Unlimited daily horoscopes" },
    { icon: Crown, text: "Advanced birth chart analysis" },
    { icon: Zap, text: "AI-powered dream interpretations" },
    { icon: Shield, text: "Premium numerology reports" },
    { icon: Users, text: "Exclusive community access" }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="cosmic-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="cosmic-title text-2xl">Upgrade to Premium</h2>
              <p className="cosmic-text">Unlock the full cosmic experience</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="cosmic-card p-6 border-2 border-white/20">
              <div className="text-center">
                <h3 className="cosmic-subtitle text-xl mb-2">Monthly</h3>
                <div className="text-4xl font-bold mb-4">
                  $9.99<span className="text-lg text-muted">/month</span>
                </div>
                <button className="cosmic-button w-full">
                  Choose Monthly
                </button>
              </div>
            </div>
            
            <div className="cosmic-card p-6 border-2 border-purple-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Best Value
                </span>
              </div>
              <div className="text-center">
                <h3 className="cosmic-subtitle text-xl mb-2">Annual</h3>
                <div className="text-4xl font-bold mb-4">
                  $79.99<span className="text-lg text-muted">/year</span>
                </div>
                <div className="text-green-400 text-sm mb-4">Save 33%</div>
                <button className="cosmic-button w-full">
                  Choose Annual
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="cosmic-subtitle text-xl mb-6">Premium Features</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="cosmic-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white/5 rounded-xl p-6">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="cosmic-subtitle mb-1">Secure</h4>
                <p className="cosmic-text text-sm">Your data is protected</p>
              </div>
              <div>
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h4 className="cosmic-subtitle mb-1">Instant</h4>
                <p className="cosmic-text text-sm">Access immediately</p>
              </div>
              <div>
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="cosmic-subtitle mb-1">Community</h4>
                <p className="cosmic-text text-sm">Join thousands of users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

