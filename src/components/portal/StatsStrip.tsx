/**
 * Stats Strip Component
 * System statistics and achievements
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Star, 
  Globe, 
  Zap, 
  Shield, 
  Heart,
  Sparkles,
  TrendingUp
} from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Users',
    description: 'Growing cosmic community'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'User Rating',
    description: 'Based on 2,500+ reviews'
  },
  {
    icon: Globe,
    value: '5',
    label: 'Languages',
    description: 'English, Sinhala, Tamil, Hindi, Chinese'
  },
  {
    icon: Zap,
    value: '99.9%',
    label: 'Uptime',
    description: 'Reliable cosmic insights'
  },
  {
    icon: Shield,
    value: '100%',
    label: 'Privacy',
    description: 'Your data is protected'
  },
  {
    icon: Heart,
    value: '50,000+',
    label: 'Dreams Analyzed',
    description: 'AI-powered interpretations'
  }
]

export function StatsStrip() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 portal-gradient-violet rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              {/* Value */}
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-gray-700 mb-1">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-xs text-gray-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full portal-glass border border-violet-200">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">
              Trusted by thousands worldwide
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}