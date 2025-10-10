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
    },
    {
      title: 'Numerology Reading',
      description: 'Unlock your life path',
      icon: <Target className="w-6 h-6 text-green-400" />,
      link: '/numerology',
      color: 'from-green-500/20 to-teal-500/20',
    },
    {
      title: 'Dream Analysis',
      description: 'Interpret your subconscious',
      icon: <Moon className="w-6 h-6 text-blue-400" />,
      link: '/dreams',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'Compatibility Report',
      description: 'Understand your relationships',
      icon: <Heart className="w-6 h-6 text-red-400" />,
      link: '/compatibility',
      color: 'from-red-500/20 to-pink-500/20',
    },
    {
      title: 'Community Forum',
      description: 'Connect with like-minded souls',
      icon: <User className="w-6 h-6 text-indigo-400" />,
      link: '/community',
      color: 'from-indigo-500/20 to-purple-500/20',
    },
    {
      title: 'Daily Insights',
      description: 'Personalized guidance for today',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      link: '/insights',
      color: 'from-purple-500/20 to-fuchsia-500/20',
    },
  ]

  const dailyCosmicData = {
    energyLevel: 'High & Vibrant',
    focusArea: 'Manifestation',
    cosmicMessage: 'Trust your intuition',
    luckyMoments: '10:00 AM - 11:30 AM',
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
                  Unlock your personalized journey
                </p>
                <Link href="/welcome" passHref>
                  <Button variant="cosmic" size="lg" className="animate-pulse">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Daily Cosmic Insights */}
        <section className="py-16 px-4 bg-black/10 backdrop-blur-sm border-t border-b border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10 text-cosmic">
              Daily Cosmic Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-5 glow">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Energy Level</h3>
                <p className="text-white text-xl">{dailyCosmicData.energyLevel}</p>
              </Card>
              <Card className="p-5 glow">
                <h3 className="text-lg font-semibold text-pink-300 mb-2">Focus Area</h3>
                <p className="text-white text-xl">{dailyCosmicData.focusArea}</p>
              </Card>
              <Card className="p-5 glow">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Cosmic Message</h3>
                <p className="text-white text-xl">{dailyCosmicData.cosmicMessage}</p>
              </Card>
              <Card className="p-5 glow">
                <h3 className="text-lg font-semibold text-green-300 mb-2">Lucky Moments</h3>
                <p className="text-white text-xl">{dailyCosmicData.luckyMoments}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Actions / Essential Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10 text-cosmic">
              Explore Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {essentialFeatures.map((feature, index) => (
                <Link href={feature.link} key={index} passHref>
                  <Card
                    className={`p-6 text-left transform transition-all duration-300 hover:scale-105 cursor-pointer
                      bg-gradient-to-br ${feature.color} border border-white/10 hover:border-purple-500/50`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      {feature.icon}
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-300">{feature.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 text-center bg-black/10 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-cosmic">
              Start Your Spiritual Journey Today
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Experience personalized insights and guidance
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/welcome" passHref>
                <Button variant="cosmic" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}