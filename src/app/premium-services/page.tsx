'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Crown, Star, Zap, Shield, Users, Calendar, 
  Sparkles, Target, Gift, CheckCircle, ArrowRight,
  Heart, Globe, Award, BookOpen, Clock
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'

const subscriptionTiers = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with cosmic guidance',
    features: [
      'Daily cosmic insights',
      'Basic numerology readings',
      'Simple astrology charts',
      'Community access',
      'Basic compatibility check',
      'Limited dream interpretations'
    ],
    limitations: [
      '3 readings per day',
      'Basic chart only',
      'No expert consultations',
      'Limited historical data'
    ],
    color: 'from-slate-500 to-slate-600',
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19.99',
    period: 'per month',
    description: 'Complete cosmic guidance for your daily life',
    features: [
      'Unlimited daily insights',
      'Advanced numerology analysis',
      'Detailed astrology charts',
      'Expert consultations (2/month)',
      'Advanced compatibility analysis',
      'AI-powered dream interpretations',
      'Personalized cosmic calendar',
      'Priority customer support',
      'Historical data access',
      'Custom cosmic reports'
    ],
    limitations: [],
    color: 'from-violet-500 to-purple-600',
    popular: true
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$49.99',
    period: 'per month',
    description: 'Ultimate cosmic experience with exclusive features',
    features: [
      'Everything in Premium',
      'Unlimited expert consultations',
      'Personal astrologer assigned',
      'Advanced Vedic astrology',
      'Nakshatra analysis',
      'Dasha predictions',
      'Custom cosmic rituals',
      'Exclusive community access',
      'Priority feature requests',
      'White-label reports',
      'API access for developers',
      'Custom integrations'
    ],
    limitations: [],
    color: 'from-amber-500 to-orange-600',
    popular: false
  }
]

const premiumFeatures = [
  {
    icon: Crown,
    title: 'Expert Consultations',
    description: 'Get personalized readings from certified astrologers and numerologists',
    benefits: ['One-on-one sessions', 'Detailed birth chart analysis', 'Life guidance', 'Follow-up support']
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    description: 'Advanced AI analyzes your cosmic data for personalized daily guidance',
    benefits: ['Machine learning algorithms', 'Pattern recognition', 'Predictive analytics', 'Personalized recommendations']
  },
  {
    icon: Calendar,
    title: 'Cosmic Calendar',
    description: 'Never miss important cosmic events with your personalized calendar',
    benefits: ['Planetary transits', 'Lunar phases', 'Personal auspicious dates', 'Reminder notifications']
  },
  {
    icon: Users,
    title: 'Advanced Compatibility',
    description: 'Deep relationship analysis using multiple astrological systems',
    benefits: ['Synastry charts', 'Composite analysis', 'Timing predictions', 'Relationship guidance']
  },
  {
    icon: Target,
    title: 'Goal Setting & Manifestation',
    description: 'Align your goals with cosmic energies for better success',
    benefits: ['Cosmic timing', 'Manifestation rituals', 'Progress tracking', 'Success optimization']
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Enterprise-grade security for your personal cosmic data',
    benefits: ['End-to-end encryption', 'Data anonymization', 'Secure storage', 'Privacy controls']
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Premium User',
    content: 'Daily Secrets Premium has transformed my understanding of myself. The expert consultations are incredibly insightful.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Elite User',
    content: 'The personalized cosmic calendar helps me plan my life around the most auspicious times. Worth every penny!',
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Premium User',
    content: 'The AI insights are surprisingly accurate. It feels like having a personal astrologer available 24/7.',
    rating: 5
  }
]

export default function PremiumServicesPage() {
  const [selectedTier, setSelectedTier] = useState('premium')
  const [billingCycle, setBillingCycle] = useState('monthly')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs />
          <div className="flex items-center space-x-4 mt-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Premium Services</h1>
              <p className="text-slate-600 mt-1">Unlock the full potential of your cosmic journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Choose Your Cosmic Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            From free daily insights to unlimited cosmic guidance, find the perfect plan 
            that aligns with your spiritual and personal growth goals.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-violet-600 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Save 20%
              </span>
            )}
          </div>
        </motion.section>

        {/* Pricing Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                  tier.popular 
                    ? 'border-violet-500 scale-105' 
                    : 'border-slate-200 hover:border-violet-300'
                } transition-all cursor-pointer`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                  <p className="text-slate-600 mb-4">{tier.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    <span className="text-slate-600">/{tier.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-slate-900">Features:</h4>
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {tier.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold text-slate-900 mt-6">Limitations:</h4>
                      {tier.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-start space-x-3">
                          <div className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0">×</div>
                          <span className="text-slate-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tier.id === 'free' ? 'Get Started' : 'Choose Plan'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Premium Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Premium Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to premium features until the end of your current billing period.'
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 30-day money-back guarantee for all premium subscriptions. If you\'re not satisfied, contact our support team for a full refund.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.'
              },
              {
                question: 'Is my data secure?',
                answer: 'Absolutely. We use enterprise-grade encryption and never share your personal information. Your cosmic data is protected with the highest security standards.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Unlock Your Cosmic Potential?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have transformed their lives with Daily Secrets Premium.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center space-x-2 mx-auto"
          >
            <span>Start Your Premium Journey</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.section>
      </div>

      <CosmicNavigation />
    </div>
  )
}
