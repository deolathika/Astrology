'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Star, 
  Moon, 
  Heart, 
  Users, 
  Bell, 
  Settings, 
  Crown, 
  Zap, 
  Globe, 
  Smartphone, 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Database, 
  BarChart, 
  Play, 
  BookOpen, 
  MessageCircle, 
  Calculator, 
  Target,
  Sun,
  Compass,
  Eye,
  Brain,
  Gem,
  Flame,
  Waves,
  Mountain,
  Wind
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'

export default function HomePage() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const quotes = [
    "The stars are the land-marks of the universe.",
    "Your destiny is written in the stars.",
    "Every dream is a message from your soul.",
    "Numbers hold the secrets of your life path.",
    "The cosmos speaks through your dreams."
  ]

  useEffect(() => {
    setIsLoading(false)
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Star,
      title: "Astrology",
      description: "Discover your cosmic blueprint with personalized birth chart analysis",
      color: "from-purple-500 to-pink-500",
      href: "/zodiac",
      systems: ["Western", "Vedic", "Chinese", "Sri Lankan"]
    },
    {
      icon: Calculator,
      title: "Numerology",
      description: "Unlock the hidden meanings in your numbers and life path",
      color: "from-blue-500 to-cyan-500",
      href: "/numerology",
      systems: ["Pythagorean", "Chaldean", "Master Numbers"]
    },
    {
      icon: Moon,
      title: "Dream Analysis",
      description: "Decode your dreams with AI-powered interpretation",
      color: "from-indigo-500 to-purple-500",
      href: "/dreams",
      systems: ["AI Analysis", "Symbol Interpretation", "Dream Journal"]
    },
    {
      icon: Heart,
      title: "Compatibility",
      description: "Find your cosmic match with relationship insights",
      color: "from-pink-500 to-rose-500",
      href: "/compatibility",
      systems: ["Love Compatibility", "Friendship Analysis", "Business Partnerships"]
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with like-minded souls on your journey",
      color: "from-green-500 to-emerald-500",
      href: "/community",
      systems: ["Discussion Forums", "Expert Guidance", "Shared Experiences"]
    },
    {
      icon: Crown,
      title: "Premium",
      description: "Unlock exclusive features and deeper insights",
      color: "from-yellow-500 to-orange-500",
      href: "/premium",
      systems: ["Advanced Readings", "Personalized Reports", "Priority Support"]
    }
  ]

  const zodiacSigns = [
    { name: "Aries", element: "Fire", icon: Flame, color: "from-red-500 to-orange-500" },
    { name: "Taurus", element: "Earth", icon: Mountain, color: "from-green-500 to-emerald-500" },
    { name: "Gemini", element: "Air", icon: Wind, color: "from-blue-500 to-cyan-500" },
    { name: "Cancer", element: "Water", icon: Waves, color: "from-blue-600 to-indigo-600" },
    { name: "Leo", element: "Fire", icon: Sun, color: "from-yellow-500 to-orange-500" },
    { name: "Virgo", element: "Earth", icon: Gem, color: "from-green-600 to-teal-600" },
    { name: "Libra", element: "Air", icon: Compass, color: "from-pink-500 to-purple-500" },
    { name: "Scorpio", element: "Water", icon: Eye, color: "from-red-600 to-pink-600" },
    { name: "Sagittarius", element: "Fire", icon: Target, color: "from-purple-500 to-indigo-500" },
    { name: "Capricorn", element: "Earth", icon: Mountain, color: "from-gray-600 to-slate-600" },
    { name: "Aquarius", element: "Air", icon: Brain, color: "from-cyan-500 to-blue-500" },
    { name: "Pisces", element: "Water", icon: Waves, color: "from-blue-500 to-purple-500" }
  ]

  if (isLoading) {
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
          />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-300 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-purple-600 mr-4" />
              </motion.div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Daily Secrets
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Unlock the mysteries of the cosmos with personalized astrology, numerology, and dream analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/zodiac">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Your Destiny ✨
                </motion.button>
              </Link>
              <Link href="/portal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-400 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
              >
                <Link href={feature.href}>
                  <div className="cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.systems.map((system, i) => (
                        <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Zodiac Signs Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Explore All Zodiac Signs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {zodiacSigns.map((sign, index) => (
                <motion.div
                  key={sign.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl p-4 text-center hover:bg-white/90 transition-all duration-300"
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${sign.color} flex items-center justify-center mx-auto mb-2`}>
                    <sign.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{sign.name}</h3>
                  <p className="text-xs text-gray-600">{sign.element}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Daily Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-16"
          >
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-medium text-gray-900 mb-4"
              >
                "{quotes[currentQuote]}"
              </motion.blockquote>
            </AnimatePresence>
            <cite className="text-gray-600">— Daily Secrets</cite>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-gray-600 mb-8">Join thousands of users discovering their cosmic destiny</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/zodiac">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-12 py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Cosmic Journey ✨
                </motion.button>
              </Link>
              <Link href="/portal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-400 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300"
                >
                  Try Free Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  )
}