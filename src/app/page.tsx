'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'
import { Clock, Star, Moon, Heart, User, Sparkles, Zap, Target } from 'lucide-react'

export default function HomePage() {
  const { personalInfo, zodiacInfo, isPersonalized } = usePersonalInfo()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Most essential features based on vision and user needs
  const essentialFeatures = [
    {
      title: 'Daily Horoscope',
      description: 'Your personalized cosmic forecast',
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      link: '/astrology',
      color: 'from-yellow-500/20 to-orange-500/20',
      priority: true
    },
    {
      title: 'Numerology',
      description: 'Discover your life path',
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      link: '/numerology',
      color: 'from-blue-500/20 to-cyan-500/20',
      priority: true
    },
    {
      title: 'Dream Analysis',
      description: 'Interpret your dreams',
      icon: <Moon className="w-6 h-6 text-purple-400" />,
      link: '/dreams',
      color: 'from-purple-500/20 to-indigo-500/20'
    },
    {
      title: 'Compatibility',
      description: 'Check relationship harmony',
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      link: '/compatibility',
      color: 'from-pink-500/20 to-rose-500/20'
    }
  ]

  const quickInsights = [
    {
      title: 'Today\'s Energy',
      value: 'High',
      description: 'Perfect for new beginnings',
      color: 'text-green-400'
    },
    {
      title: 'Lucky Number',
      value: '7',
      description: 'Trust your intuition',
      color: 'text-blue-400'
    },
    {
      title: 'Best Time',
      value: '2:00 PM',
      description: 'Optimal for decisions',
      color: 'text-purple-400'
    }
  ]

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
        {/* Hero Section - Clean & Focused */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Daily Secrets
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your personalized cosmic journey starts here. Discover your unique spiritual blueprint.
            </p>
            
            {/* Personalized Welcome */}
            {isPersonalized && (
              <Card className="p-6 max-w-lg mx-auto mb-8 glow">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-purple-300">
                      Welcome back, {personalInfo?.name}!
                    </h2>
                    {zodiacInfo && (
                      <p className="text-gray-300">
                        {zodiacInfo.name} • {zodiacInfo.element}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Cosmic Time */}
            <Card className="p-4 max-w-sm mx-auto mb-8 glow">
              <div className="flex items-center justify-center space-x-4">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-lg font-mono text-white">
                  {currentTime.toLocaleTimeString()}
                </span>
                <span className="text-lg text-white">
                  {currentTime.toLocaleDateString()}
                </span>
              </div>
            </Card>

            {/* New User CTA */}
            {!isPersonalized && (
              <div className="mb-8">
                <p className="text-gray-300 mb-6">
                  Get personalized cosmic guidance by setting up your profile
                </p>
                <Link href="/welcome">
                  <Button variant="cosmic" size="lg" className="btn-cosmic">
                    <User className="w-5 h-5 mr-2" />
                    Set Up Profile
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Essential Features - Most Needed */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Your Cosmic Toolkit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {essentialFeatures.map((feature, index) => (
                <Link key={index} href={feature.link}>
                  <Card className={`p-6 text-center hover:scale-105 transition-all duration-300 glow ${feature.priority ? 'ring-2 ring-yellow-400/50' : ''}`}>
                    {feature.priority && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        Essential
                      </div>
                    )}
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Insights - Daily Value */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">
              Today's Cosmic Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickInsights.map((insight, index) => (
                <Card key={index} className="p-6 text-center glow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-300">
                    {insight.title}
                  </h3>
                  <p className={`text-3xl font-bold mb-2 ${insight.color}`}>
                    {insight.value}
                  </p>
                  <p className="text-sm text-gray-400">
                    {insight.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Personalized Dashboard - Only for returning users */}
        {isPersonalized && (
          <section className="py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8 text-white">
                Your Spiritual Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 glow">
                  <h3 className="text-lg font-semibold mb-4 text-purple-300">
                    Your Cosmic Identity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Zodiac Sign:</span>
                      <span className="text-white">{zodiacInfo?.name || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Birth Date:</span>
                      <span className="text-white">{personalInfo?.birthDate || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Birth Location:</span>
                      <span className="text-white">{personalInfo?.birthLocation || 'Not set'}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 glow">
                  <h3 className="text-lg font-semibold mb-4 text-purple-300">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Link href="/astrology">
                      <Button variant="primary" size="sm" className="w-full">
                        <Star className="w-4 h-4 mr-2" />
                        View Horoscope
                      </Button>
                    </Link>
                    <Link href="/numerology">
                      <Button variant="secondary" size="sm" className="w-full">
                        <Zap className="w-4 h-4 mr-2" />
                        Numerology Reading
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="ghost" size="sm" className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Vision Section - Brief & Inspiring */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 glow text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Our Vision
              </h2>
              <p className="text-gray-300 mb-6">
                To democratize cosmic wisdom and make spiritual guidance accessible to everyone, 
                regardless of background, culture, or technical expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!isPersonalized && (
                  <Link href="/welcome">
                    <Button variant="cosmic" size="lg">
                      Start Your Journey
                    </Button>
                  </Link>
                )}
                <Link href="/vision">
                  <Button variant="secondary" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}