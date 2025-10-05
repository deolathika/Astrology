/**
 * Feature Grid Component
 * Showcase cards for all Daily Secrets features
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Star, 
  Calculator, 
  Heart, 
  Moon, 
  Globe, 
  Sparkles,
  Users,
  Zap,
  Shield
} from 'lucide-react'

const features = [
  {
    icon: Star,
    title: 'Astrology',
    description: 'Western, Vedic, Chinese, and Sri Lankan astrology systems with accurate birth chart calculations.',
    href: '/portal/zodiac',
    gradient: 'portal-gradient-violet',
    features: ['Birth Charts', 'Daily Horoscopes', 'Transit Analysis', 'Multiple Systems']
  },
  {
    icon: Calculator,
    title: 'Numerology',
    description: 'Pythagorean and Chaldean numerology with life path, soul urge, and expression number analysis.',
    href: '/portal/numerology',
    gradient: 'portal-gradient-sky',
    features: ['Life Path Numbers', 'Soul Urge', 'Expression Numbers', 'Daily Insights']
  },
  {
    icon: Heart,
    title: 'Compatibility',
    description: 'Comprehensive compatibility analysis between zodiac signs with detailed relationship insights.',
    href: '/portal/compatibility',
    gradient: 'portal-gradient-amber',
    features: ['Sign Compatibility', 'Relationship Analysis', 'Love Matches', 'Friendship Insights']
  },
  {
    icon: Moon,
    title: 'Dream Analysis',
    description: 'AI-powered dream interpretation with symbolic meanings and spiritual guidance.',
    href: '/portal/dreams',
    gradient: 'portal-gradient-emerald',
    features: ['Dream Symbols', 'Spiritual Guidance', 'AI Interpretation', 'Dream Journal']
  },
  {
    icon: Globe,
    title: 'Sri Lankan Astrology',
    description: 'Traditional Sri Lankan astrology with unique chart systems and cultural interpretations.',
    href: '/portal/sri-lanka-astrology',
    gradient: 'portal-gradient-violet',
    features: ['Traditional Charts', 'Cultural Context', 'Local Interpretations', 'Regional Systems']
  },
  {
    icon: Sparkles,
    title: 'AI Guidance',
    description: 'Personalized cosmic guidance powered by advanced AI and astrological algorithms.',
    href: '/portal/features',
    gradient: 'portal-gradient-sky',
    features: ['Personalized Insights', 'AI Chat', 'Daily Guidance', 'Smart Recommendations']
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with like-minded individuals in our supportive cosmic community.',
    href: '/portal/community',
    gradient: 'portal-gradient-amber',
    features: ['Discussion Forums', 'Expert Insights', 'Community Events', 'Shared Experiences']
  },
  {
    icon: Zap,
    title: 'Offline Mode',
    description: 'Access your insights anywhere with our offline-capable progressive web app.',
    href: '/portal/features',
    gradient: 'portal-gradient-emerald',
    features: ['Offline Access', 'PWA Support', 'Sync Capabilities', 'Mobile Optimized']
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is protected with end-to-end encryption and privacy-first design.',
    href: '/portal/about',
    gradient: 'portal-gradient-violet',
    features: ['Data Encryption', 'Privacy Controls', 'Secure Storage', 'GDPR Compliant']
  }
]

export function FeatureGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Discover All Our Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From ancient wisdom to modern AI, explore the full spectrum of cosmic insights 
            designed to guide your journey.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="portal-card p-6 group"
            >
              <Link href={feature.href} className="block">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="mt-4 text-violet-600 font-medium text-sm group-hover:text-violet-700 transition-colors">
                  Learn more →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/portal/features"
            className="portal-btn portal-btn-primary text-lg px-8 py-4"
          >
            Explore All Features
          </Link>
        </motion.div>
      </div>
    </section>
  )
}