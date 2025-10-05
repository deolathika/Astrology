'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Lock, Sparkles, Star, Zap, Gift, ArrowRight, X } from 'lucide-react'

interface PremiumGateProps {
  children: React.ReactNode
  feature: string
  description: string
  userRole: 'user' | 'premium' | 'admin'
  onUpgrade?: () => void
  className?: string
}

export function PremiumGate({ 
  children, 
  feature, 
  description, 
  userRole, 
  onUpgrade,
  className = ''
}: PremiumGateProps) {
  const [showModal, setShowModal] = useState(false)

  // If user is premium or admin, show the content
  if (userRole === 'premium' || userRole === 'admin') {
    return <>{children}</>
  }

  // For free users, show blurred content with upgrade prompt
  return (
    <div className={`relative ${className}`}>
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none select-none">
        {children}
      </div>
      
      {/* Overlay with upgrade prompt */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            Premium Feature
          </h3>
          
          <p className="text-white/80 mb-4 max-w-sm">
            {description}
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 flex items-center mx-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Upgrade to Premium
          </button>
        </div>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Unlock Premium Features
                </h2>
                
                <p className="text-gray-600">
                  Get access to {feature} and many more premium features
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Advanced Astrology Charts</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">AI Dream Analysis</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Gift className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Exclusive Content</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    $9.99
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Cancel anytime • 30-day money-back guarantee
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    onUpgrade?.()
                    setShowModal(false)
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PremiumGate

