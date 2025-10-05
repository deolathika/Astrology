/**
 * Pricing Card Component
 * Displays subscription plans with Stripe integration
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/stripe/config'
import CosmicButton from '@/components/cosmic/CosmicButton'

interface PricingCardProps {
  plan: typeof PRICING_PLANS[0]
  onSelectPlan: (planId: string) => void
  isLoading?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  plan, 
  onSelectPlan, 
  isLoading = false 
}) => {
  const isPopular = plan.popular
  const isFree = plan.id === 'free'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`
        relative bg-white/80 backdrop-blur-lg border rounded-2xl p-8
        ${isPopular ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-white/20'}
        hover:bg-white/90 transition-all duration-300
      `}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Star className="w-4 h-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          {isFree ? (
            <Zap className="w-8 h-8 text-blue-500" />
          ) : (
            <Crown className="w-8 h-8 text-purple-500" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">
            ${plan.price}
          </span>
          <span className="text-gray-600">/{plan.interval}</span>
        </div>
        {plan.savings && (
          <p className="text-sm text-green-600 font-medium mt-2">{plan.savings}</p>
        )}
      </div>

      <div className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
        
        {plan.limitations && plan.limitations.map((limitation, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
            <span className="text-gray-500 line-through">{limitation}</span>
          </div>
        ))}
      </div>

      <CosmicButton
        onClick={() => onSelectPlan(plan.id)}
        variant={isPopular ? 'premium' : isFree ? 'secondary' : 'primary'}
        size="lg"
        className="w-full"
        disabled={isLoading}
        loading={isLoading}
      >
        {isFree ? 'Get Started Free' : `Subscribe to ${plan.name}`}
      </CosmicButton>
    </motion.div>
  )
}

export default PricingCard
