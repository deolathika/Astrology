/**
 * Premium Subscription Page
 * Displays pricing plans and subscription options
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Star, Zap, Shield, Sparkles } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import PricingCard from '@/components/pricing/PricingCard'
import { PRICING_PLANS } from '@/lib/stripe/config'

export default function PremiumPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'free') {
      // Redirect to free features
      window.location.href = '/zodiac'
      return
    }

    setIsLoading(true)
    setSelectedPlan(planId)

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: PRICING_PLANS.find(p => p.id === planId)?.stripePriceId,
          successUrl: `${window.location.origin}/profile?success=true`,
          cancelUrl: `${window.location.origin}/premium?canceled=true`,
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-16 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Crown className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Unlock Your Cosmic Potential
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users discovering their destiny with personalized astrology, 
              numerology, and AI-powered insights.
            </p>
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 pb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PricingCard
                  plan={plan}
                  onSelectPlan={handleSelectPlan}
                  isLoading={isLoading && selectedPlan === plan.id}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl mx-4 mb-16 p-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Compare Features
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Premium</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Daily Insights</td>
                  <td className="text-center py-4 px-6">3 per day</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">Unlimited</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Numerology</td>
                  <td className="text-center py-4 px-6">Basic</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">Full Suite</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">Full Suite</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Astrology Charts</td>
                  <td className="text-center py-4 px-6">Simple</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">Advanced</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Dream Analysis</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">AI Powered</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">AI Powered</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Support</td>
                  <td className="text-center py-4 px-6">Community</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">Priority</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">Priority</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Ads</td>
                  <td className="text-center py-4 px-6">Yes</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">No</td>
                  <td className="text-center py-4 px-6 text-green-600 font-semibold">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center py-16 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Trusted by Thousands of Users
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600 text-center">
                  Your payment information is encrypted and secure with Stripe
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <Zap className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Access</h3>
                <p className="text-gray-600 text-center">
                  Get immediate access to all premium features after payment
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <Sparkles className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cancel Anytime</h3>
                <p className="text-gray-600 text-center">
                  No long-term commitments. Cancel your subscription anytime
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AppShell>
  )
}