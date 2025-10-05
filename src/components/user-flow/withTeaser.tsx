'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Crown, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  X,
  Star,
  Moon,
  Heart,
  Brain,
  MessageCircle
} from 'lucide-react'
import CosmicButton from '@/components/cosmic/CosmicButton'
import CosmicCard from '@/components/cosmic/CosmicCard'

interface TeaserProps {
  featureKey: string
  children: React.ReactNode
  fallback?: React.ReactNode
  showTeaser?: boolean
}

interface PremiumTeaserModalProps {
  isOpen: boolean
  onClose: () => void
  featureKey: string
  onUpgrade: () => void
}

const PremiumTeaserModal: React.FC<PremiumTeaserModalProps> = ({
  isOpen,
  onClose,
  featureKey,
  onUpgrade
}) => {
  const getFeatureInfo = (key: string) => {
    const features = {
      'dreams': {
        title: 'AI Dream Analysis',
        description: 'Unlock the power of AI to interpret your dreams and discover hidden meanings.',
        icon: Moon,
        benefits: [
          'AI-powered dream interpretation',
          'Symbol analysis and meanings',
          'Dream journal with insights',
          'Personalized dream guidance'
        ]
      },
      'community': {
        title: 'Cosmic Community',
        description: 'Connect with like-minded souls and share your cosmic journey.',
        icon: Heart,
        benefits: [
          'Connect with cosmic souls',
          'Share experiences and insights',
          'Join discussion groups',
          'Get expert guidance'
        ]
      },
      'ai-chat': {
        title: 'AI Cosmic Chat',
        description: 'Chat with our AI cosmic advisor for personalized guidance.',
        icon: Brain,
        benefits: [
          '24/7 AI cosmic advisor',
          'Personalized guidance',
          'Instant answers to questions',
          'Advanced cosmic insights'
        ]
      },
      'premium-insights': {
        title: 'Premium Insights',
        description: 'Unlock deeper cosmic insights and personalized guidance.',
        icon: Star,
        benefits: [
          'Advanced astrology calculations',
          'Detailed compatibility analysis',
          'Personalized daily guidance',
          'Exclusive cosmic content'
        ]
      }
    }
    
    return features[key as keyof typeof features] || {
      title: 'Premium Feature',
      description: 'Unlock this premium feature to enhance your cosmic journey.',
      icon: Crown,
      benefits: [
        'Exclusive premium content',
        'Advanced features',
        'Personalized experience',
        'Priority support'
      ]
    }
  }

  const feature = getFeatureInfo(featureKey)
  const Icon = feature.icon

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <CosmicCard variant="glass" size="lg" className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-violet-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gold-400">{feature.title}</h3>
                  <p className="text-sm text-violet-400">Premium Feature</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg bg-violet-800/50 hover:bg-violet-700/50 transition-colors"
              >
                <X className="w-5 h-5 text-violet-400" />
              </motion.button>
            </div>

            {/* Description */}
            <p className="text-violet-300 mb-6">{feature.description}</p>

            {/* Benefits */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-gold-400">What you'll get:</h4>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 text-sm text-violet-300"
                  >
                    <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-3">
              <CosmicButton
                onClick={onUpgrade}
                variant="premium"
                size="md"
                icon={<Crown className="w-4 h-4" />}
                className="flex-1"
              >
                Upgrade to Premium
              </CosmicButton>
              <CosmicButton
                onClick={onClose}
                variant="ghost"
                size="md"
                className="flex-1"
              >
                Maybe Later
              </CosmicButton>
            </div>
          </CosmicCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export const withTeaser = (featureKey: string) => {
  return function TeaserWrapper({ children, fallback, showTeaser = true }: Omit<TeaserProps, 'featureKey'>) {
    const { data: session } = useSession()
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const userRole = session?.user?.role
    const isPremium = userRole === 'premium' || userRole === 'admin'
    const isGuest = !session

    const handleUpgrade = () => {
      setShowModal(false)
      router.push('/auth/signup')
    }

    const handleTeaserClick = () => {
      if (showTeaser && !isPremium) {
        setShowModal(true)
      }
    }

    // If user is premium or admin, show full content
    if (isPremium) {
      return <>{children}</>
    }

    // If user is guest, show teaser with blur
    if (isGuest) {
      return (
        <div className="relative">
          <div className="blur-sm pointer-events-none">
            {children}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-violet-900/80 backdrop-blur-sm rounded-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-violet-900" />
              </div>
              <h3 className="text-lg font-semibold text-gold-400 mb-2">Premium Feature</h3>
              <p className="text-violet-300 mb-4">Sign up to unlock this feature</p>
              <CosmicButton
                onClick={() => router.push('/auth/signup')}
                variant="premium"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Get Started
              </CosmicButton>
            </motion.div>
          </div>
        </div>
      )
    }

    // If user is free, show teaser with upgrade prompt
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-violet-900/80 backdrop-blur-sm rounded-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-violet-900" />
            </div>
            <h3 className="text-lg font-semibold text-gold-400 mb-2">Premium Feature</h3>
            <p className="text-violet-300 mb-4">Upgrade to unlock this feature</p>
            <div className="flex space-x-3">
              <CosmicButton
                onClick={handleTeaserClick}
                variant="premium"
                size="md"
                icon={<Crown className="w-4 h-4" />}
              >
                Upgrade Now
              </CosmicButton>
              <CosmicButton
                onClick={() => setShowModal(true)}
                variant="ghost"
                size="md"
              >
                Learn More
              </CosmicButton>
            </div>
          </motion.div>
        </div>

        <PremiumTeaserModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          featureKey={featureKey}
          onUpgrade={handleUpgrade}
        />
      </div>
    )
  }
}

export default withTeaser
