'use client'

import { motion } from 'framer-motion'
import { CosmicNavigation } from '@/components/cosmic-navigation'
import { HelpCircle, ChevronUp, ChevronDown, MessageCircle } from 'lucide-react'

const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: HelpCircle,
    color: 'electric-violet'
  },
  {
    id: 'astrology',
    name: 'Astrology',
    icon: Star,
    color: 'supernova-gold'
  },
  {
    id: 'numerology',
    name: 'Numerology',
    icon: Zap,
    color: 'aurora-green'
  },
  {
    id: 'subscription',
    name: 'Subscription',
    icon: CreditCard,
    color: 'stellar-pink'
  },
  {
    id: 'experts',
    name: 'Experts',
    icon: Users,
    color: 'electric-violet'
  },
  {
    id: 'privacy',
    name: 'Privacy',
    icon: Shield,
    color: 'aurora-green'
  }
]

const faqData = {
  general: [
    {
      question: 'What is Daily Secrets?',
      answer: 'Daily Secrets is a comprehensive cosmic guidance platform that provides personalized astrology, numerology, and spiritual insights. We help you discover your cosmic potential through daily guidance, expert consultations, and community features.'
    },
    {
      question: 'How does Daily Secrets work?',
      answer: 'Simply create an account, provide your birth information, and our AI-powered system will generate personalized cosmic insights. You can also connect with certified astrologers and numerologists for deeper guidance.'
    },
    {
      question: 'Is Daily Secrets free to use?',
      answer: 'Yes! We offer a free tier with basic cosmic insights. For advanced features, expert consultations, and unlimited guidance, we have premium subscription plans starting at $9.99/month.'
    },
    {
      question: 'Do I need to provide my exact birth time?',
      answer: 'While exact birth time provides the most accurate readings, you can still get valuable insights with just your birth date and location. We\'ll let you know when more precise information would be helpful.'
    }
  ],
  astrology: [
    {
      question: 'What astrology systems do you support?',
      answer: 'We support both Western (Tropical) and Vedic (Sidereal) astrology systems. You can choose your preferred system or compare both to get a comprehensive understanding of your cosmic profile.'
    },
    {
      question: 'How accurate are the astrology readings?',
      answer: 'Our astrology readings are based on established astrological principles and calculations. While we strive for accuracy, astrology is an interpretive art, and results may vary based on individual interpretation and life circumstances.'
    },
    {
      question: 'Can I get a birth chart?',
      answer: 'Yes! Premium subscribers get access to detailed birth charts with planetary positions, houses, aspects, and interpretations. You can also download and share your birth chart.'
    },
    {
      question: 'What if I don\'t know my birth time?',
      answer: 'No problem! We can still provide valuable insights based on your birth date and location. For the most accurate readings, we recommend trying to find your exact birth time from official records.'
    }
  ],
  numerology: [
    {
      question: 'What numerology systems do you use?',
      answer: 'We use both Pythagorean and Chaldean numerology systems. Pythagorean is the most common system, while Chaldean is an ancient system that can provide different insights. You can choose your preferred system.'
    },
    {
      question: 'What numbers will I learn about?',
      answer: 'You\'ll discover your Life Path Number, Destiny Number, Soul Urge Number, Personality Number, Birthday Number, and more. Each number reveals different aspects of your personality and life purpose.'
    },
    {
      question: 'Are master numbers (11, 22, 33) special?',
      answer: 'Yes! Master numbers are considered powerful and carry special significance. They represent higher spiritual potential and are not reduced to single digits in most calculations.'
    },
    {
      question: 'Can numerology predict my future?',
      answer: 'Numerology provides insights into your personality, strengths, challenges, and life patterns. While it can offer guidance, it\'s not a predictive tool but rather a way to understand yourself better.'
    }
  ],
  subscription: [
    {
      question: 'What\'s included in the free plan?',
      answer: 'The free plan includes basic daily guidance, simple numerology calculations, basic astrology insights, community access, and limited dream interpretation. It\'s perfect for getting started with cosmic guidance.'
    },
    {
      question: 'What are the premium features?',
      answer: 'Premium features include unlimited daily guidance, advanced numerology (all systems), complete astrology charts, expert consultations, priority support, advanced compatibility, and personalized insights.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes! You can cancel your subscription at any time from your account settings. Your premium features will remain active until the end of your current billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for new subscribers. If you\'re not satisfied with your premium experience, contact our support team for a full refund.'
    }
  ],
  experts: [
    {
      question: 'How do I book a consultation?',
      answer: 'Simply browse our expert directory, choose an astrologer or numerologist, and book a consultation. You can choose from different consultation types and time slots that work for you.'
    },
    {
      question: 'Are the experts certified?',
      answer: 'Yes! All our experts are certified professionals with years of experience. We verify their credentials and maintain high standards for our expert network.'
    },
    {
      question: 'What types of consultations are available?',
      answer: 'We offer basic consultations (15 min), standard consultations (30 min), and premium consultations (60 min). Each includes different features like video calls, detailed reports, and follow-up sessions.'
    },
    {
      question: 'Can I message experts directly?',
      answer: 'Yes! You can send messages to experts for quick questions or to discuss your consultation needs. Premium subscribers get priority messaging and faster response times.'
    }
  ],
  privacy: [
    {
      question: 'Is my personal information safe?',
      answer: 'Absolutely! We use bank-level security to protect your data. We never sell your personal information and only use it to provide you with personalized cosmic guidance.'
    },
    {
      question: 'Can I delete my account?',
      answer: 'Yes! You can delete your account at any time from your account settings. This will permanently remove all your personal data from our systems.'
    },
    {
      question: 'Do you share my data with third parties?',
      answer: 'No! We do not sell, trade, or rent your personal information to third parties. We only share data when required by law or with your explicit consent.'
    },
    {
      question: 'How long do you keep my data?',
      answer: 'We retain your data for as long as your account is active. You can request data deletion at any time, and we\'ll remove your information within 30 days.'
    }
  ]
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  const currentFAQs = faqData[selectedCategory as keyof typeof faqData] || []

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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-electric-violet/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <HelpCircle className="w-10 h-10 text-electric-violet" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-cosmic-gradient-text mb-4"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-stellar-gray-light text-lg max-w-3xl mx-auto"
            >
              Find answers to common questions about Daily Secrets, our features, 
              and how to get the most out of your cosmic journey.
            </motion.p>
          </div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {faqCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-electric-violet text-white'
                      : 'bg-cosmic-navy/50 text-stellar-gray-light hover:bg-electric-violet/20 hover:text-electric-violet'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {currentFAQs.map((faq) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="cosmic-card"
              >
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-semibold text-starlight-white pr-4">
                    {faq.question}
                  </h3>
                  {expandedItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-electric-violet flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-electric-violet flex-shrink-0" />
                  )}
                </button>
                
                {expandedItems.has(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-stellar-gray-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="cosmic-card mt-12"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-electric-violet/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-electric-violet" />
              </div>
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Still Have Questions?
              </h2>
              <p className="text-stellar-gray-light mb-6">
                Can't find what you're looking for? Our support team is here to help with any questions about Daily Secrets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="cosmic-button px-6 py-3 flex items-center justify-center space-x-2"
                >
                  <span>Contact Support</span>
                </a>
                <a
                  href="mailto:support@dailysecrets.com"
                  className="bg-cosmic-navy border border-electric-violet/30 text-electric-violet rounded-xl px-6 py-3 hover:bg-electric-violet/10 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Email Us</span>
                </a>
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
