'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, Moon, Heart, Users, Bell, Settings, Crown, Zap, Globe, Smartphone, ArrowRight, CheckCircle, Shield, Database, BarChart, Play, BookOpen, MessageCircle, Calculator, Target } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'

export default function HomePageSimple() {
  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
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
              <Sparkles className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Daily Secrets
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Unlock the mysteries of the cosmos with personalized astrology, numerology, and dream analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Your Destiny ✨
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-400 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: Star,
                title: "Astrology",
                description: "Discover your cosmic blueprint with personalized birth chart analysis",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Calculator,
                title: "Numerology",
                description: "Unlock the hidden meanings in your numbers and life path",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Moon,
                title: "Dream Analysis",
                description: "Decode your dreams with AI-powered interpretation",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Heart,
                title: "Compatibility",
                description: "Find your cosmic match with relationship insights",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: Users,
                title: "Community",
                description: "Connect with like-minded souls on your journey",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Crown,
                title: "Premium",
                description: "Unlock exclusive features and deeper insights",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Daily Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-16"
          >
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <blockquote className="text-2xl font-medium text-gray-900 mb-4">
              "The stars are the land-marks of the universe."
            </blockquote>
            <cite className="text-gray-600">— Sir John Frederick William Herschel</cite>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-gray-600 mb-8">Join thousands of users discovering their cosmic destiny</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-12 py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Cosmic Journey ✨
            </motion.button>
          </motion.div>
        </div>
      </div>
    </AppShell>
  )
}
