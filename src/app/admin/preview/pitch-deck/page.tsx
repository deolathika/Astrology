'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Users, 
  TrendingUp, 
  Globe, 
  Shield, 
  Zap, 
  Target, 
  Award,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  CheckCircle
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

interface Slide {
  id: number
  title: string
  content: React.ReactNode
  type: 'title' | 'content' | 'stats' | 'vision'
}

export default function PitchDeckPreview() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: Slide[] = [
    {
      id: 1,
      title: "Daily Secrets",
      content: (
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Daily Secrets
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Your Personal Cosmic Journey
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <Star className="w-6 h-6" />
            <span className="text-lg">Personalized Astrology & Numerology</span>
            <Globe className="w-6 h-6 ml-4" />
            <span className="text-lg">Global Reach</span>
          </div>
        </div>
      ),
      type: 'title'
    },
    {
      id: 2,
      title: "The Problem",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-400">The Problem We Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Fragmented Experience</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Multiple apps for different services</li>
                <li>• Inconsistent user experience</li>
                <li>• No personalized insights</li>
                <li>• Limited integration</li>
              </ul>
            </Card>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Generic Solutions</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• One-size-fits-all approach</li>
                <li>• No personal data integration</li>
                <li>• Limited customization</li>
                <li>• Poor user engagement</li>
              </ul>
            </Card>
          </div>
        </div>
      ),
      type: 'content'
    },
    {
      id: 3,
      title: "Our Solution",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Our Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 cosmic-glow text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-3 text-white">Unified Platform</h3>
              <p className="text-gray-300">All cosmic services in one place</p>
            </Card>
            <Card className="p-6 cosmic-glow text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-3 text-white">Personalized</h3>
              <p className="text-gray-300">Tailored to your unique profile</p>
            </Card>
            <Card className="p-6 cosmic-glow text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-3 text-white">Secure & Private</h3>
              <p className="text-gray-300">Your data is protected</p>
            </Card>
          </div>
        </div>
      ),
      type: 'content'
    },
    {
      id: 4,
      title: "Market Opportunity",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Market Opportunity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 cosmic-glow">
              <h3 className="text-2xl font-bold mb-4 text-white">Market Size</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Global Astrology Market</span>
                  <span className="text-2xl font-bold text-green-400">$2.2B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Numerology Market</span>
                  <span className="text-2xl font-bold text-blue-400">$1.8B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Digital Wellness</span>
                  <span className="text-2xl font-bold text-purple-400">$4.4B</span>
                </div>
              </div>
            </Card>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-2xl font-bold mb-4 text-white">Growth Trends</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Mobile App Usage</span>
                  <span className="text-2xl font-bold text-green-400">+25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Personalization Demand</span>
                  <span className="text-2xl font-bold text-blue-400">+40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Wellness Spending</span>
                  <span className="text-2xl font-bold text-purple-400">+30%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ),
      type: 'stats'
    },
    {
      id: 5,
      title: "Product Features",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">Product Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Core Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-purple-400" />
                  Advanced Astrology System
                </li>
                <li className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-blue-400" />
                  Numerology Analysis
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-400" />
                  Compatibility Matching
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-orange-400" />
                  Dream Analysis
                </li>
              </ul>
            </Card>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Advanced Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Privacy Protection
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Global Location Support
                </li>
                <li className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-green-400" />
                  Premium Analytics
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  Progress Tracking
                </li>
              </ul>
            </Card>
          </div>
        </div>
      ),
      type: 'content'
    },
    {
      id: 6,
      title: "Revenue Model",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Revenue Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 cosmic-glow text-center">
              <h3 className="text-xl font-semibold mb-3 text-white">Freemium</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">$0</div>
              <p className="text-gray-300 text-sm">Basic features, limited access</p>
            </Card>
            <Card className="p-6 cosmic-glow text-center">
              <h3 className="text-xl font-semibold mb-3 text-white">Premium</h3>
              <div className="text-3xl font-bold text-blue-400 mb-2">$9.99/mo</div>
              <p className="text-gray-300 text-sm">Full access, advanced features</p>
            </Card>
            <Card className="p-6 cosmic-glow text-center">
              <h3 className="text-xl font-semibold mb-3 text-white">Pro</h3>
              <div className="text-3xl font-bold text-purple-400 mb-2">$19.99/mo</div>
              <p className="text-gray-300 text-sm">Professional tools, API access</p>
            </Card>
          </div>
          <div className="text-center mt-8">
            <div className="text-2xl font-bold text-white mb-2">Projected Revenue</div>
            <div className="text-4xl font-bold text-green-400">$2.5M ARR</div>
            <div className="text-gray-300">Year 2 Target</div>
          </div>
        </div>
      ),
      type: 'stats'
    },
    {
      id: 7,
      title: "Competitive Advantage",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">Competitive Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Our Strengths</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Unified Platform
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Advanced AI Integration
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Privacy-First Approach
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Global Accessibility
                </li>
              </ul>
            </Card>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Market Position</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">User Experience</span>
                  <span className="text-lg font-bold text-green-400">Superior</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Feature Completeness</span>
                  <span className="text-lg font-bold text-blue-400">Comprehensive</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Privacy & Security</span>
                  <span className="text-lg font-bold text-purple-400">Industry Leading</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pricing</span>
                  <span className="text-lg font-bold text-orange-400">Competitive</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ),
      type: 'content'
    },
    {
      id: 8,
      title: "Financial Projections",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Financial Projections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 cosmic-glow">
              <h3 className="text-2xl font-bold mb-6 text-white">Revenue Growth</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Year 1</span>
                  <span className="text-xl font-bold text-green-400">$500K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Year 2</span>
                  <span className="text-xl font-bold text-blue-400">$2.5M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Year 3</span>
                  <span className="text-xl font-bold text-purple-400">$8M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Year 5</span>
                  <span className="text-xl font-bold text-orange-400">$25M</span>
                </div>
              </div>
            </Card>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-2xl font-bold mb-6 text-white">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Customer Acquisition Cost</span>
                  <span className="text-lg font-bold text-green-400">$15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Lifetime Value</span>
                  <span className="text-lg font-bold text-blue-400">$180</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Churn Rate</span>
                  <span className="text-lg font-bold text-purple-400">5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Gross Margin</span>
                  <span className="text-lg font-bold text-orange-400">85%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ),
      type: 'stats'
    },
    {
      id: 9,
      title: "Team & Vision",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">Our Vision</h2>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-6">
              "To democratize cosmic wisdom and make personalized spiritual guidance accessible to everyone"
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="p-6 cosmic-glow text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">Mission</h3>
                <p className="text-gray-300">Empower individuals with personalized cosmic insights</p>
              </Card>
              <Card className="p-6 cosmic-glow text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">Values</h3>
                <p className="text-gray-300">Privacy, authenticity, and user empowerment</p>
              </Card>
              <Card className="p-6 cosmic-glow text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">Impact</h3>
                <p className="text-gray-300">Transforming how people connect with cosmic wisdom</p>
              </Card>
            </div>
          </div>
        </div>
      ),
      type: 'vision'
    },
    {
      id: 10,
      title: "Call to Action",
      content: (
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold mb-6 text-white">Join Our Journey</h2>
          <div className="text-2xl text-gray-300 mb-8">
            Be part of the cosmic revolution
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="cosmic"
              size="lg"
              className="px-8 py-4"
              onClick={() => window.open('/admin/documents/pitch-deck.pdf', '_blank')}
            >
              <Download className="w-6 h-6 mr-3" />
              Download Full Deck
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="px-8 py-4"
              onClick={() => window.open('mailto:contact@dailysecrets.app', '_blank')}
            >
              <ExternalLink className="w-6 h-6 mr-3" />
              Contact Us
            </Button>
          </div>
          <div className="text-gray-400 text-sm">
            Ready to explore the cosmic possibilities together?
          </div>
        </div>
      ),
      type: 'title'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen relative main-content">
      <StarfieldBackground />
      {/* Floating cosmic particles */}
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <Navigation />

      <main className="relative z-10 pt-16">
        <div className="max-w-6xl mx-auto p-6">
          {/* Slide Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="secondary"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-300">
                {currentSlide + 1} of {slides.length}
              </span>
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-purple-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Current Slide */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-12 cosmic-glow min-h-[600px] flex items-center justify-center">
              {slides[currentSlide].content}
            </Card>
          </motion.div>

          {/* Slide Thumbnails */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-white">All Slides</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`p-4 rounded-lg border transition-colors ${
                    index === currentSlide
                      ? 'border-purple-400 bg-purple-500/20'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <div className="text-sm font-medium text-white mb-1">
                    {slide.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    Slide {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
