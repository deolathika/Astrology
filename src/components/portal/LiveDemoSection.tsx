/**
 * Live Demo Section Component
 * Interactive demos for key features
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ZodiacPreview } from './LiveDemo/ZodiacPreview'
import { NumerologyPreview } from './LiveDemo/NumerologyPreview'
import { CompatibilityPreview } from './LiveDemo/CompatibilityPreview'
import { DreamsPreview } from './LiveDemo/DreamsPreview'
import { ArrowRight, Sparkles } from 'lucide-react'

const demos = [
  {
    title: 'Zodiac Sign Detection',
    description: 'Enter your birth date to discover your zodiac sign and get a personalized daily insight.',
    component: ZodiacPreview,
    href: '/portal/zodiac'
  },
  {
    title: 'Life Path Numerology',
    description: 'Calculate your life path number and discover what it reveals about your journey.',
    component: NumerologyPreview,
    href: '/portal/numerology'
  },
  {
    title: 'Compatibility Check',
    description: 'See how compatible two zodiac signs are and get relationship insights.',
    component: CompatibilityPreview,
    href: '/portal/compatibility'
  },
  {
    title: 'Dream Interpretation',
    description: 'Share a dream and get AI-powered symbolic interpretation and guidance.',
    component: DreamsPreview,
    href: '/portal/dreams'
  }
]

export function LiveDemoSection() {
  return (
    <section id="demos" className="py-20 bg-gradient-to-br from-violet-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full portal-glass border border-violet-200 mb-6"
          >
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">
              Try It Now
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Interactive Demos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Experience the power of cosmic insights with our interactive demonstrations. 
            No sign-up required - try them right now!
          </motion.p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="portal-card p-8"
            >
              {/* Demo Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {demo.title}
                </h3>
                <p className="text-gray-600">
                  {demo.description}
                </p>
              </div>

              {/* Demo Component */}
              <div className="mb-6">
                <demo.component />
              </div>

              {/* Learn More Link */}
              <Link
                href={demo.href}
                className="inline-flex items-center space-x-2 text-violet-600 font-medium hover:text-violet-700 transition-colors"
              >
                <span>Explore {demo.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="portal-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready for the Full Experience?
            </h3>
            <p className="text-gray-600 mb-6">
              Unlock unlimited insights, personalized birth charts, AI-powered guidance, 
              and access to our complete cosmic community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/"
                className="portal-btn portal-btn-primary text-lg px-8 py-4"
              >
                Open Full App
              </Link>
              <Link
                href="/portal/pricing"
                className="portal-btn portal-btn-secondary text-lg px-8 py-4"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
