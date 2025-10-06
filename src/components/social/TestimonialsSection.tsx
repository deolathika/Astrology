'use client'

import React, { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  content: string
  verified: boolean
  subscription: 'free' | 'premium'
  location: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Premium User',
    avatar: '👩‍💼',
    rating: 5,
    content: 'Daily Secrets has completely transformed my understanding of myself. The AI-powered insights are incredibly accurate and the personalized horoscopes feel like they were written just for me!',
    verified: true,
    subscription: 'premium',
    location: 'New York, NY'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Community Member',
    avatar: '👨‍💻',
    rating: 5,
    content: 'The dream analysis feature is mind-blowing. I never understood my dreams until I started using this app. The AI interpretations are spot-on and have helped me understand my subconscious better.',
    verified: true,
    subscription: 'premium',
    location: 'San Francisco, CA'
  },
  {
    id: '3',
    name: 'Emma Davis',
    role: 'Astrology Enthusiast',
    avatar: '👩‍🎨',
    rating: 5,
    content: 'The numerology insights are incredible! I discovered my life path number and it explained so much about my personality. The compatibility feature helped me understand my relationships better.',
    verified: true,
    subscription: 'premium',
    location: 'Los Angeles, CA'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    role: 'Free User',
    avatar: '👨‍🎓',
    rating: 5,
    content: 'Even the free features are amazing! The daily horoscopes are so detailed and accurate. I can\'t wait to upgrade to premium to unlock all the advanced features.',
    verified: true,
    subscription: 'free',
    location: 'Miami, FL'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    role: 'Premium User',
    avatar: '👩‍⚕️',
    rating: 5,
    content: 'The community features are fantastic. I\'ve connected with so many like-minded people and learned so much about astrology. The app has become an essential part of my daily routine.',
    verified: true,
    subscription: 'premium',
    location: 'Seattle, WA'
  },
  {
    id: '6',
    name: 'James Thompson',
    role: 'New User',
    avatar: '👨‍🔬',
    rating: 5,
    content: 'I was skeptical about astrology apps, but Daily Secrets changed my mind completely. The scientific approach combined with traditional wisdom is perfect. Highly recommended!',
    verified: true,
    subscription: 'free',
    location: 'Boston, MA'
  }
]

const stats = [
  { icon: Users, value: '50K+', label: 'Active Users', color: 'text-blue-400' },
  { icon: Star, value: '4.9', label: 'App Rating', color: 'text-yellow-400' },
  { icon: Award, value: '98%', label: 'Accuracy Rate', color: 'text-green-400' },
  { icon: TrendingUp, value: '1M+', label: 'Readings Given', color: 'text-purple-400' }
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonialData = testimonials[currentTestimonial]

  return (
    <div className="glass-card-strong p-8 mb-8">
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 ${stat.color} bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their lives with Daily Secrets
        </p>
      </div>

      {/* Featured Testimonial */}
      <div className="glass-card p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
              {currentTestimonialData.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-white font-semibold text-lg">{currentTestimonialData.name}</h3>
                {currentTestimonialData.verified && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/70 text-sm">{currentTestimonialData.role}</span>
                <span className="text-white/50">•</span>
                <span className="text-white/70 text-sm">{currentTestimonialData.location}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentTestimonialData.subscription === 'premium' 
                    ? 'bg-yellow-500/20 text-yellow-300' 
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {currentTestimonialData.subscription === 'premium' ? 'Premium' : 'Free'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(currentTestimonialData.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        <div className="relative">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/20" />
          <blockquote className="text-white/90 text-lg leading-relaxed pl-6">
            "{currentTestimonialData.content}"
          </blockquote>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            onClick={prevTestimonial}
            className="glass-button p-2 hover:glass-strong transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentTestimonial(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="glass-button p-2 hover:glass-strong transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* All Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 6).map((testimonial) => (
          <div key={testimonial.id} className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-lg">
                {testimonial.avatar}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                  {testimonial.verified && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white/70 text-xs">{testimonial.role}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    testimonial.subscription === 'premium' 
                      ? 'bg-yellow-500/20 text-yellow-300' 
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {testimonial.subscription === 'premium' ? 'Premium' : 'Free'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-white/80 text-sm leading-relaxed">
              "{testimonial.content}"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
