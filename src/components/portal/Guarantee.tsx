/**
 * Guarantee Component
 * Trust and guarantee section
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Heart, 
  Star,
  CheckCircle,
  Sparkles
} from 'lucide-react'

const guarantees = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your personal data is encrypted and never shared. We follow strict privacy protocols.',
    features: ['End-to-end encryption', 'GDPR compliant', 'No data selling', 'Secure storage']
  },
  {
    icon: Lock,
    title: 'Secure Platform',
    description: 'Bank-level security protects your cosmic journey and personal information.',
    features: ['SSL encryption', 'Secure servers', 'Regular audits', 'Data protection']
  },
  {
    icon: Heart,
    title: 'Authentic Insights',
    description: 'Our interpretations are based on ancient wisdom combined with modern understanding.',
    features: ['Traditional methods', 'AI enhancement', 'Cultural accuracy', 'Personal relevance']
  },
  {
    icon: Star,
    title: 'Quality Assured',
    description: 'Every insight is crafted with care and backed by our satisfaction guarantee.',
    features: ['Expert reviewed', 'Quality tested', 'User feedback', 'Continuous improvement']
  }
]

const testimonials = [
  {
    text: "Daily Secrets has transformed my understanding of myself and my relationships. The insights are incredibly accurate and helpful.",
    author: "Sarah M.",
    rating: 5
  },
  {
    text: "The dream analysis feature is amazing! It helped me understand patterns I never noticed before.",
    author: "David L.",
    rating: 5
  },
  {
    text: "I love how the app combines different astrological systems. It gives me a complete picture of my cosmic profile.",
    author: "Priya K.",
    rating: 5
  }
]

export function Guarantee() {
  return (
    <section className="py-20 bg-gradient-to-br from-violet-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full portal-glass border border-violet-200 mb-6"
          >
            <Shield className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">
              Your Trust, Our Promise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            We Guarantee Your Satisfaction
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Your cosmic journey is sacred to us. We're committed to providing authentic, 
            helpful, and secure insights that truly serve your spiritual growth.
          </motion.p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="portal-card p-6 text-center"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 portal-gradient-violet rounded-xl mb-4">
                <guarantee.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {guarantee.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-sm">
                {guarantee.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {guarantee.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            What Our Users Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="portal-card p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="text-sm font-medium text-gray-900">
                  — {testimonial.author}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="portal-card p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-violet-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Ready to Begin Your Journey?
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Join thousands of users who have discovered their cosmic secrets and 
              transformed their lives with personalized astrological insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/"
                className="portal-btn portal-btn-primary text-lg px-8 py-4"
              >
                Start Your Journey
              </a>
              <a
                href="/portal/pricing"
                className="portal-btn portal-btn-secondary text-lg px-8 py-4"
              >
                View Plans
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
