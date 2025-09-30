'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Crown, 
  Zap, 
  Check, 
  X, 
  CreditCard, 
  Shield, 
  Users, 
  Calendar,
  Heart,
  Globe,
  Sparkles
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Cosmic Explorer',
    price: 0,
    period: 'forever',
    icon: Star,
    color: 'electric-violet',
    features: [
      'Daily cosmic guidance',
      'Basic numerology analysis',
      'Western zodiac insights',
      'Community access',
      'Basic dream interpretation'
    ],
    limitations: [
      'Limited to 3 readings per day',
      'Basic chart analysis only',
      'Standard support'
    ]
  },
  {
    id: 'premium',
    name: 'Stellar Navigator',
    price: 9.99,
    period: 'month',
    icon: Crown,
    color: 'supernova-gold',
    features: [
      'Unlimited daily guidance',
      'Complete numerology analysis',
      'All zodiac systems (Western, Vedic, Chinese, Sri Lankan)',
      'Advanced astrology charts',
      'Personalized cosmic insights',
      'Priority support',
      'Premium community features',
      'Advanced dream interpretation',
      'Compatibility analysis',
      'Transit predictions'
    ],
    popular: true
  },
  {
    id: 'cosmic',
    name: 'Cosmic Master',
    price: 19.99,
    period: 'month',
    icon: Sparkles,
    color: 'stellar-pink',
    features: [
      'Everything in Stellar Navigator',
      'AI-powered cosmic guidance',
      'Personal astrologer consultation',
      'Custom birth chart reports',
      'Advanced transit analysis',
      'Relationship compatibility deep dive',
      'Career and life path guidance',
      'Exclusive cosmic content',
      'Priority customer support',
      'Early access to new features'
    ]
  }
]

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [billingCycle, setBillingCycle] = useState('monthly')

  const handleSubscribe = (planId: string) => {
    // Add subscription logic here
  }

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-cosmic-gradient-text mb-4"
            >
              Choose Your Cosmic Journey
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light text-lg max-w-2xl mx-auto"
            >
              Unlock the full potential of your cosmic journey with our premium plans. 
              Discover deeper insights, personalized guidance, and exclusive features.
            </motion.p>
          </div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <div className="cosmic-card p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-electric-violet text-white'
                      : 'text-stellar-gray-light hover:text-electric-violet'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    billingCycle === 'yearly'
                      ? 'bg-electric-violet text-white'
                      : 'text-stellar-gray-light hover:text-electric-violet'
                  }`}
                >
                  Yearly
                  <span className="ml-2 text-xs bg-supernova-gold text-deep-space px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan, index) => {
              const Icon = plan.icon
              const isPopular = plan.popular
              const isSelected = selectedPlan === plan.id
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`relative cosmic-card ${
                    isPopular ? 'ring-2 ring-supernova-gold' : ''
                  } ${isSelected ? 'ring-2 ring-electric-violet' : ''}`}
                  style={{
                    background: isPopular 
                      ? 'linear-gradient(135deg, rgba(255, 215, 90, 0.1) 0%, rgba(255, 224, 102, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(26, 26, 46, 0.5) 0%, rgba(22, 33, 62, 0.3) 100%)',
                    borderColor: isPopular ? 'rgba(255, 215, 90, 0.3)' : 'rgba(123, 79, 255, 0.3)'
                  }}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-supernova-gold text-deep-space px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                      plan.color === 'electric-violet' ? 'bg-electric-violet/20' :
                      plan.color === 'supernova-gold' ? 'bg-supernova-gold/20' :
                      'bg-stellar-pink/20'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        plan.color === 'electric-violet' ? 'text-electric-violet' :
                        plan.color === 'supernova-gold' ? 'text-supernova-gold' :
                        'text-stellar-pink'
                      }`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-starlight-white mb-2">
                      {plan.name}
                    </h3>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-cosmic-gradient-text">
                        ${billingCycle === 'yearly' ? (plan.price * 12 * 0.8).toFixed(0) : plan.price}
                      </span>
                      <span className="text-stellar-gray-light ml-2">
                        /{billingCycle === 'yearly' ? 'year' : plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                        className="flex items-center space-x-3"
                      >
                        <Check className="w-5 h-5 text-aurora-green flex-shrink-0" />
                        <span className="text-starlight-white">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Limitations for free plan */}
                  {plan.id === 'free' && (
                    <div className="space-y-2 mb-8">
                      <h4 className="text-stellar-gray-light text-sm font-semibold mb-2">
                        Limitations:
                      </h4>
                      {plan.limitations?.map((limitation, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-nebula-red rounded-full flex-shrink-0" />
                          <span className="text-stellar-gray-light text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subscribe Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full py-4 rounded-xl font-semibold transition-all ${
                      plan.id === 'free'
                        ? 'bg-cosmic-navy border border-electric-violet text-electric-violet hover:bg-electric-violet hover:text-white'
                        : isPopular
                        ? 'bg-supernova-gold text-deep-space hover:bg-stellar-yellow'
                        : 'bg-electric-violet text-white hover:bg-cosmic-purple'
                    }`}
                  >
                    {plan.id === 'free' ? 'Get Started Free' : `Subscribe to ${plan.name}`}
                  </motion.button>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="cosmic-card max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-aurora-green mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-starlight-white mb-2">
                    Secure Payment
                  </h3>
                  <p className="text-stellar-gray-light text-sm">
                    Your payment information is encrypted and secure
                  </p>
                </div>
                
                <div className="text-center">
                  <Zap className="w-8 h-8 text-electric-violet mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-starlight-white mb-2">
                    Instant Access
                  </h3>
                  <p className="text-stellar-gray-light text-sm">
                    Unlock premium features immediately after subscription
                  </p>
                </div>
                
                <div className="text-center">
                  <Sparkles className="w-8 h-8 text-stellar-pink mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-starlight-white mb-2">
                    Cancel Anytime
                  </h3>
                  <p className="text-stellar-gray-light text-sm">
                    No long-term commitments, cancel whenever you want
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
