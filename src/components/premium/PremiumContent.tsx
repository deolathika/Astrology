'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Crown, Sparkles, Star, Zap, Gift, Shield, Globe, Brain } from 'lucide-react'

interface PremiumContentProps {
  children: React.ReactNode
  userRole: 'user' | 'premium' | 'admin'
  feature: string
  className?: string
}

export function PremiumContent({ 
  children, 
  userRole, 
  feature,
  className = ''
}: PremiumContentProps) {
  // If user is not premium, don't show the content
  if (userRole === 'user') {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
    >
      {/* Premium badge */}
      <div className="absolute -top-2 -right-2 z-10">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </div>
      </div>

      {/* Content with premium styling */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 shadow-lg">
        {children}
      </div>
    </motion.div>
  )
}

interface PremiumFeatureListProps {
  userRole: 'user' | 'premium' | 'admin'
}

export function PremiumFeatureList({ userRole }: PremiumFeatureListProps) {
  const features = [
    {
      icon: Star,
      title: 'Advanced Astrology Charts',
      description: 'Detailed natal charts with multiple house systems and aspects',
      available: userRole === 'premium' || userRole === 'admin'
    },
    {
      icon: Brain,
      title: 'AI Dream Analysis',
      description: 'AI-powered dream interpretation with cultural context',
      available: userRole === 'premium' || userRole === 'admin'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Access to content in 5 languages with cultural astrology',
      available: userRole === 'premium' || userRole === 'admin'
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 premium support with dedicated cosmic experts',
      available: userRole === 'premium' || userRole === 'admin'
    },
    {
      icon: Zap,
      title: 'Real-time Transits',
      description: 'Live planetary transits with NASA data validation',
      available: userRole === 'premium' || userRole === 'admin'
    },
    {
      icon: Gift,
      title: 'Exclusive Content',
      description: 'Premium cosmic insights and personalized guidance',
      available: userRole === 'premium' || userRole === 'admin'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`p-6 rounded-xl border-2 transition-all duration-200 ${
            feature.available
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              feature.available
                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                : 'bg-gray-300'
            }`}>
              <feature.icon className={`w-6 h-6 ${
                feature.available ? 'text-white' : 'text-gray-500'
              }`} />
            </div>
            
            <div className="flex-1">
              <h3 className={`font-semibold ${
                feature.available ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {feature.title}
              </h3>
              
              {feature.available && (
                <div className="flex items-center space-x-1 mt-1">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-600 font-medium">Premium</span>
                </div>
              )}
            </div>
          </div>
          
          <p className={`text-sm ${
            feature.available ? 'text-gray-700' : 'text-gray-500'
          }`}>
            {feature.description}
          </p>
          
          {feature.available && (
            <div className="mt-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 font-medium">Active</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default PremiumContent
