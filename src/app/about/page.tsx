'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Shield, Globe, Sparkles, Users, Star, Moon, Sun } from 'lucide-react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen relative main-content">
      <StarfieldBackground />
      <Navigation />

      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              Our Mission
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Daily Secrets is more than an app - it's a movement towards inner peace, 
              self-discovery, and spiritual growth. We believe everyone deserves to feel 
              connected to their true self and manifest their dreams.
            </motion.p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 cosmic-glow">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-pink-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-cosmic">Our Vision</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To create a spiritual sanctuary where people can find peace, clarity, and hope. 
                    We believe in empowering individuals to trust their intuition, manifest their dreams, 
                    and connect with their true selves through the wisdom of the cosmos.
                  </p>
                </div>
              </Card>

              <Card className="p-8 cosmic-glow">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-cosmic">Our Purpose</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To provide free, accessible spiritual guidance that helps people navigate life's 
                    challenges with wisdom, hope, and inner strength. We focus on making people happy 
                    and giving hope for their hard life, not making money.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
                <p className="text-gray-300">Your spiritual journey is private. We protect your personal information and never share your data.</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Global Wisdom</h3>
                <p className="text-gray-300">We integrate multiple astrological systems and global sources to provide comprehensive guidance.</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Free Access</h3>
                <p className="text-gray-300">Most features are free because everyone deserves access to spiritual guidance and self-discovery tools.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Astrology</h3>
                <p className="text-gray-300 text-sm">Multiple astrological systems including Western, Vedic, Chinese, and Sri Lankan traditions.</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Moon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Dream Analysis</h3>
                <p className="text-gray-300 text-sm">Comprehensive dream interpretation using multiple analysis methods and LLM integration.</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Sun className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Numerology</h3>
                <p className="text-gray-300 text-sm">Advanced numerology systems including Pythagorean, Chaldean, and Vedic calculations.</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-gray-300 text-sm">Connect with like-minded individuals on their spiritual journey.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-3xl font-bold mb-6 text-cosmic">Begin Your Spiritual Journey</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of people who have found peace, clarity, and hope through Daily Secrets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cosmic" size="lg">
                  Start Your Journey
                </Button>
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}