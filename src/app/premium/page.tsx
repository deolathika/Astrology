'use client'

import { motion } from 'framer-motion'
import { CosmicNavigation } from '@/components/cosmic-navigation'
const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Basic cosmic insights',
    features: [
      'Daily guidance (basic)',
      'Basic numerology',
      'Simple astrology',
      'Community access',
      'Limited dream interpretation'
    ],
    limitations: [
      'Limited daily readings',
      'Basic numerology only',
      'No expert consultations',
      'Limited community features'
    ],
    popular: false,
    color: 'stellar-gray'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    period: 'month',
    description: 'Enhanced cosmic experience',
    features: [
      'Unlimited daily guidance',
      'Advanced numerology (all systems)',
      'Complete astrology charts',
      'Dream interpretation AI',
      'Expert consultations (2/month)',
      'Priority support',
      'Advanced compatibility',
      'Personalized insights'
    ],
    limitations: [],
    popular: true,
    color: 'electric-violet'
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    price: 19.99,
    period: 'month',
    description: 'Ultimate cosmic journey',
    features: [
      'Everything in Premium',
      'Unlimited expert consultations',
      'Personal astrologer',
      'Custom birth charts',
      'Advanced dream analysis',
      'Exclusive cosmic events',
      'Priority booking',
      'White-label reports',
      'API access'
    ],
    limitations: [],
    popular: false,
    color: 'supernova-gold'
  }
]

const expertConsultations = [
  {
    id: 'basic',
    name: 'Basic Consultation',
    price: 25,
    duration: '15 minutes',
    features: [
      'Quick cosmic guidance',
      'Basic numerology reading',
      'Simple astrology insight',
      'Email follow-up'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Consultation',
    price: 50,
    duration: '30 minutes',
    features: [
      'Comprehensive birth chart',
      'Full numerology analysis',
      'Life path guidance',
      'Relationship compatibility',
      'Video call included'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Consultation',
    price: 100,
    duration: '60 minutes',
    features: [
      'Complete cosmic profile',
      'Advanced astrology techniques',
      'Numerology master analysis',
      'Dream interpretation',
      'Personalized action plan',
      'Follow-up session included'
    ]
  }
]

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [selectedConsultation, setSelectedConsultation] = useState('standard')
  const [billingCycle, setBillingCycle] = useState('monthly')

  const handleSubscribe = (planId: string) => {
    // Implement subscription logic
    // Redirect to payment or show payment modal
  }

  const handleBookConsultation = (consultationId: string) => {
    // Implement booking logic
    // Redirect to booking page
  }

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-cosmic-gradient-text mb-4"
            >
              Unlock Your Cosmic Potential
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light text-lg max-w-2xl mx-auto"
            >
              Choose the perfect plan to enhance your cosmic journey with personalized insights, expert consultations, and advanced features.
            </motion.p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-cosmic-navy/50 rounded-xl p-1 border border-electric-violet/20">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-electric-violet text-white'
                    : 'text-stellar-gray-light hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-lg transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-electric-violet text-white'
                    : 'text-stellar-gray-light hover:text-white'
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`cosmic-card relative ${
                  plan.popular ? 'ring-2 ring-electric-violet' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-electric-violet text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Crown className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.color === 'electric-violet' ? 'bg-electric-violet/20' :
                    plan.color === 'supernova-gold' ? 'bg-supernova-gold/20' :
                    'bg-stellar-gray/20'
                  }`}>
                    {plan.color === 'electric-violet' ? <Crown className="w-8 h-8 text-electric-violet" /> :
                     plan.color === 'supernova-gold' ? <Star className="w-8 h-8 text-supernova-gold" /> :
                     <Zap className="w-8 h-8 text-stellar-gray" />}
                  </div>
                  <h3 className="text-2xl font-bold text-starlight-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-cosmic-gradient-text mb-2">
                    ${billingCycle === 'yearly' ? Math.round(plan.price * 12 * 0.8) : plan.price}
                    <span className="text-lg text-stellar-gray-light">
                      /{billingCycle === 'yearly' ? 'year' : plan.period}
                    </span>
                  </div>
                  <p className="text-stellar-gray-light">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-aurora-green flex-shrink-0" />
                      <span className="text-stellar-gray-light">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-nebula-red flex-shrink-0" />
                      <span className="text-stellar-gray-light opacity-60">{limitation}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'cosmic-button'
                      : 'bg-cosmic-navy border border-electric-violet/30 text-electric-violet hover:bg-electric-violet/10'
                  }`}
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Expert Consultations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="cosmic-card mb-16"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-supernova-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-supernova-gold" />
              </div>
              <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-4">
                Expert Consultations
              </h2>
              <p className="text-stellar-gray-light text-lg">
                Connect with certified astrologers and numerologists for personalized guidance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {expertConsultations.map((consultation, index) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-cosmic-navy/50 rounded-xl p-6 border border-electric-violet/20"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-starlight-white mb-2">
                      {consultation.name}
                    </h3>
                    <div className="text-3xl font-bold text-supernova-gold mb-2">
                      ${consultation.price}
                    </div>
                    <div className="text-stellar-gray-light">
                      {consultation.duration}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {consultation.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-aurora-green flex-shrink-0" />
                        <span className="text-stellar-gray-light text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleBookConsultation(consultation.id)}
                    className="w-full bg-supernova-gold/20 text-supernova-gold border border-supernova-gold/30 rounded-xl py-3 px-4 hover:bg-supernova-gold/30 transition-all"
                  >
                    Book Now
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="cosmic-card"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-aurora-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-aurora-green" />
              </div>
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Secure Payment
              </h2>
              <p className="text-stellar-gray-light">
                We accept all major payment methods with bank-level security
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-cosmic-navy/50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">💳</div>
                <div className="text-stellar-gray-light text-sm">Credit Cards</div>
              </div>
              <div className="bg-cosmic-navy/50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🏦</div>
                <div className="text-stellar-gray-light text-sm">Bank Transfer</div>
              </div>
              <div className="bg-cosmic-navy/50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">📱</div>
                <div className="text-stellar-gray-light text-sm">Mobile Pay</div>
              </div>
              <div className="bg-cosmic-navy/50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🌐</div>
                <div className="text-stellar-gray-light text-sm">Crypto</div>
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
