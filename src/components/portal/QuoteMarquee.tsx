/**
 * Quote Marquee Component
 * Slow marquee of motivational quotes
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Sparkles } from 'lucide-react'

const quotes = [
  "The stars whisper secrets to those who listen with their hearts.",
  "Your cosmic journey begins with a single step into the unknown.",
  "In the dance of the universe, you are both the dancer and the dance.",
  "The universe speaks through the language of numbers and stars.",
  "Your birth chart is a map of your soul's journey through this lifetime.",
  "Dreams are the universe's way of communicating with your soul.",
  "Every number holds a story, every star tells a tale of your destiny.",
  "The cosmos within you mirrors the cosmos around you.",
  "Your spiritual path is written in the stars and numbers of your birth.",
  "Trust the cosmic timing of your life's unfolding journey.",
  "The universe conspires to help those who dare to dream.",
  "Your soul chose this time and place for a reason beyond understanding.",
  "In the silence between thoughts, the universe speaks loudest.",
  "Your cosmic fingerprint is as unique as your physical one.",
  "The ancient wisdom of the stars guides your modern journey.",
  "Every ending is a beginning in the cosmic cycle of life.",
  "Your intuition is the universe's direct line to your soul.",
  "The patterns in the sky reflect the patterns in your life.",
  "Your spiritual awakening is written in the stars above.",
  "The cosmos celebrates your existence with every breath you take."
]

export function QuoteMarquee() {
  return (
    <section className="py-16 bg-gradient-to-r from-violet-50 via-white to-sky-50 overflow-hidden">
      <div className="relative">
        {/* Animated Marquee */}
        <motion.div
          className="flex space-x-8"
          animate={{
            x: [0, -100 * quotes.length]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear"
            }
          }}
        >
          {[...quotes, ...quotes].map((quote, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center space-x-4 px-6 py-4 portal-glass rounded-lg"
            >
              <div className="flex-shrink-0">
                <Quote className="w-5 h-5 text-violet-600" />
              </div>
              <p className="text-lg font-medium text-gray-800 whitespace-nowrap">
                {quote}
              </p>
              <div className="flex-shrink-0">
                <Sparkles className="w-4 h-4 text-violet-400" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-violet-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-sky-50 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}