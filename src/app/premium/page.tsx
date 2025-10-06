'use client'

import React, { useState } from 'react'

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: '$9.99',
      period: '/month',
      features: [
        'Unlimited daily horoscopes',
        'AI-powered dream analysis',
        'Complete numerology reports',
        'Compatibility readings',
        'Personal cosmic journal',
        'Priority support'
      ],
      popular: false
    },
    {
      id: 'yearly',
      name: 'Annual Plan',
      price: '$99.99',
      period: '/year',
      features: [
        'Everything in Monthly Plan',
        'Save 20% with annual billing',
        'Exclusive premium content',
        'Advanced astrological charts',
        'Personalized cosmic calendar',
        'VIP community access'
      ],
      popular: true
    }
  ]

  const handleSubscribe = () => {
    console.log('Subscribing to plan:', selectedPlan)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Go Premium</h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock unlimited cosmic insights and exclusive features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-white border-2 rounded-lg p-8 ${
                plan.popular
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-md font-semibold transition-colors ${
                  selectedPlan === plan.id
                    ? 'bg-blue-600 text-white'
                    : plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        <div className="text-center">
          <button
            onClick={handleSubscribe}
            className="btn btn-primary px-12 py-4 text-lg"
          >
            Subscribe to {plans.find(p => p.id === selectedPlan)?.name}
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Insights</h3>
              <p className="text-gray-600">Get detailed, personalized cosmic guidance tailored to your unique profile.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">Powered by advanced AI to provide accurate and meaningful interpretations.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Access</h3>
              <p className="text-gray-600">Join our exclusive community of cosmic seekers and share experiences.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, we offer a 7-day free trial for new subscribers. No credit card required to start.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and other secure payment methods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}