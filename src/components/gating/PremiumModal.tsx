'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Crown, 
  Sparkles, 
  Star, 
  Moon, 
  Heart, 
  Brain, 
  MessageCircle,
  Check,
  Zap
} from 'lucide-react'
import CosmicButton from '@/components/cosmic/CosmicButton'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
  title?: string
  description?: string
  features?: string[]
}

const defaultFeatures = [
  'Detailed daily horoscopes for all signs',
  'AI-powered dream interpretation',
  'Full numerology readings',
  'Compatibility insights',
  'Personal cosmic journal & history',
  'Unlimited daily insights',
  'Premium community access',
  'Advanced astrology charts'
]

export default function PremiumModal({
  isOpen,
  onClose,
  onUpgrade,
  title = "Unlock Premium Insights",
  description = "Discover your full cosmic potential with unlimited access to all features",
  features = defaultFeatures
}: PremiumModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-gold-400 to-silver-400 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Crown className="w-8 h-8 text-violet-900" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-violet-200">{description}</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-gold-400 to-silver-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-violet-900" />
                </div>
                <span className="text-violet-100">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$9.99<span className="text-sm text-violet-300">/month</span></div>
              <div className="text-violet-300 text-sm">Cancel anytime • 7-day free trial</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <CosmicButton
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Trial
            </CosmicButton>
            
            <button
              onClick={onClose}
              className="w-full text-violet-300 hover:text-white transition-colors py-2"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
