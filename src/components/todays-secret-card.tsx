'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Heart, 
  Star, 
  Share2, 
  ThumbsUp, 
  Smile, 
  Pray, 
  Heart as HeartIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { SocialShare } from './social-share'

interface TodaysSecretCardProps {
  user?: any
}

export function TodaysSecretCard({ user }: TodaysSecretCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [reactions, setReactions] = useState({
    sparkles: 0,
    heart: 0,
    pray: 0,
    love: 0
  })
  const [userReaction, setUserReaction] = useState<string | null>(null)

  const todaysGuidance = {
    longText: `Today, the cosmic energies align in your favor as the stars weave a tapestry of opportunity and growth. The universe whispers secrets of transformation through the gentle dance of celestial bodies, guiding you toward your highest potential. Trust in the ancient wisdom that flows through your veins, for you are a child of the cosmos, destined for greatness. The planetary influences today favor introspection and spiritual growth, while the numerological vibrations suggest a time of new beginnings and fresh perspectives. Embrace the cosmic flow and let your inner light shine brightly.`,
    luckyNumbers: [7, 14, 21, 28],
    cosmicEnergy: 'High',
    shareCaption: 'Today the stars align in my favor! ✨🌟 #DailySecrets #CosmicGuidance',
    hashtags: ['#DailySecrets', '#CosmicGuidance', '#Astrology', '#Numerology']
  }

  const handleReaction = (reaction: string) => {
    if (userReaction === reaction) {
      setUserReaction(null)
      setReactions(prev => ({
        ...prev,
        [reaction]: Math.max(0, prev[reaction as keyof typeof prev] - 1)
      }))
    } else {
      if (userReaction) {
        setReactions(prev => ({
          ...prev,
          [userReaction]: Math.max(0, prev[userReaction as keyof typeof prev] - 1)
        }))
      }
      setUserReaction(reaction)
      setReactions(prev => ({
        ...prev,
        [reaction]: prev[reaction as keyof typeof prev] + 1
      }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="cosmic-card"
      style={{
        background: 'linear-gradient(135deg, rgba(63, 197, 255, 0.1) 0%, rgba(123, 79, 255, 0.1) 100%)',
        borderColor: 'rgba(63, 197, 255, 0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-celestial-blue/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-celestial-blue" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-celestial-blue">Today's Secret</h3>
            <p className="text-sm text-stellar-gray-light">Your cosmic guidance for today</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 bg-cosmic-navy/30 text-stellar-gray-light rounded-lg hover:bg-cosmic-navy/50 transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-starlight-white leading-relaxed mb-6"
          >
            {isExpanded ? todaysGuidance.longText : `${todaysGuidance.longText.substring(0, 150)}...`}
          </motion.p>

          {/* Lucky Numbers & Energy */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-supernova-gold" />
                <span className="text-sm text-stellar-gray-light">Lucky Numbers:</span>
                <div className="flex space-x-1">
                  {todaysGuidance.luckyNumbers.map((num, index) => (
                    <span key={index} className="px-2 py-1 bg-supernova-gold/20 text-supernova-gold rounded text-sm font-semibold">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-celestial-blue rounded-full animate-pulse" />
              <span className="text-sm text-stellar-gray-light">Energy: {todaysGuidance.cosmicEnergy}</span>
            </div>
          </div>

          {/* Reactions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleReaction('sparkles')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  userReaction === 'sparkles'
                    ? 'bg-celestial-blue/20 text-celestial-blue'
                    : 'bg-cosmic-navy/30 text-stellar-gray-light hover:bg-cosmic-navy/50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">{reactions.sparkles}</span>
              </button>
              <button
                onClick={() => handleReaction('heart')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  userReaction === 'heart'
                    ? 'bg-nebula-pink/20 text-nebula-pink'
                    : 'bg-cosmic-navy/30 text-stellar-gray-light hover:bg-cosmic-navy/50'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm">{reactions.heart}</span>
              </button>
              <button
                onClick={() => handleReaction('pray')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  userReaction === 'pray'
                    ? 'bg-stellar-yellow/20 text-stellar-yellow'
                    : 'bg-cosmic-navy/30 text-stellar-gray-light hover:bg-cosmic-navy/50'
                }`}
              >
                <Pray className="w-4 h-4" />
                <span className="text-sm">{reactions.pray}</span>
              </button>
              <button
                onClick={() => handleReaction('love')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  userReaction === 'love'
                    ? 'bg-nebula-red/20 text-nebula-red'
                    : 'bg-cosmic-navy/30 text-stellar-gray-light hover:bg-cosmic-navy/50'
                }`}
              >
                <HeartIcon className="w-4 h-4" />
                <span className="text-sm">{reactions.love}</span>
              </button>
            </div>

            <SocialShare
              title="Today's Secret"
              text={todaysGuidance.shareCaption}
              url={typeof window !== 'undefined' ? window.location.href : ''}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
