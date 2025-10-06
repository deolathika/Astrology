'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import PremiumGate from '@/components/readdy/PremiumGate'
import PremiumBadge from '@/components/readdy/PremiumBadge'

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentQuote, setCurrentQuote] = useState(0)
  const [selectedAstrologySystem, setSelectedAstrologySystem] = useState('western')
  const [selectedNumerologySystem, setSelectedNumerologySystem] = useState('pythagorean')
  const [userRole, setUserRole] = useState<'guest' | 'premium'>('premium')

  const astrologyQuotes = [
    "The stars align to guide your path today.",
    "Your cosmic energy is at its peak this moment.",
    "Trust the universe's timing in all things.",
    "Your destiny unfolds with each passing day.",
    "The cosmos whispers secrets to those who listen."
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % astrologyQuotes.length)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(quoteTimer)
    }
  }, [])

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', element: 'Fire', color: 'from-red-500 to-orange-500' },
    { name: 'Taurus', symbol: '♉', element: 'Earth', color: 'from-green-500 to-emerald-500' },
    { name: 'Gemini', symbol: '♊', element: 'Air', color: 'from-yellow-500 to-amber-500' },
    { name: 'Cancer', symbol: '♋', element: 'Water', color: 'from-blue-500 to-cyan-500' },
    { name: 'Leo', symbol: '♌', element: 'Fire', color: 'from-orange-500 to-yellow-500' },
    { name: 'Virgo', symbol: '♍', element: 'Earth', color: 'from-green-600 to-lime-500' },
    { name: 'Libra', symbol: '♎', element: 'Air', color: 'from-pink-500 to-rose-500' },
    { name: 'Scorpio', symbol: '♏', element: 'Water', color: 'from-purple-500 to-violet-500' },
    { name: 'Sagittarius', symbol: '♐', element: 'Fire', color: 'from-indigo-500 to-blue-500' },
    { name: 'Capricorn', symbol: '♑', element: 'Earth', color: 'from-gray-600 to-slate-500' },
    { name: 'Aquarius', symbol: '♒', element: 'Air', color: 'from-cyan-500 to-teal-500' },
    { name: 'Pisces', symbol: '♓', element: 'Water', color: 'from-blue-400 to-indigo-500' }
  ]

  const cosmicGuidance = [
    { title: 'Love', icon: '💕', preview: 'Venus brings harmony to relationships today', detail: 'Your romantic connections are blessed with understanding and compassion. Single? Your soulmate energy is strong.' },
    { title: 'Career', icon: '💼', preview: 'Mercury favors communication and networking', detail: 'Present your ideas with confidence. A new opportunity may arise through professional connections.' },
    { title: 'Finance', icon: '💰', preview: 'Jupiter\'s influence brings financial opportunities', detail: 'This is an excellent time for investments and financial planning. Trust your instincts on money matters.' },
    { title: 'Health', icon: '🏥', preview: 'Focus on mental and physical wellness', detail: 'Balance is key. Consider meditation or yoga. Your body is asking for gentle care and attention.' },
    { title: 'Travel', icon: '✈️', preview: 'Adventure calls from distant horizons', detail: 'Travel plans are favored. Whether business or pleasure, journeys will bring growth and new perspectives.' }
  ]

  const todaysRules = {
    dos: [
      'Trust your intuition in decision-making',
      'Express gratitude for small blessings',
      'Take time for self-reflection',
      'Connect with nature or loved ones'
    ],
    donts: [
      'Avoid making hasty financial decisions',
      'Don\'t ignore your body\'s signals',
      'Avoid confrontational conversations',
      'Don\'t suppress your creative impulses'
    ]
  }

  const handleShare = async (platform: string) => {
    const shareText = `Discover your cosmic secrets with Daily Secrets! 🌟 ${window.location.href}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Secrets',
          text: shareText,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback for platforms
      const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        instagram: `https://www.instagram.com/`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`
      }
      window.open(urls[platform as keyof typeof urls], '_blank')
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-cosmic animate-float">
              Daily Secrets
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {astrologyQuotes[currentQuote]}
            </p>
            
            {/* Current Time Display */}
            <div className="glass-card p-6 max-w-md mx-auto mb-12">
              <h3 className="text-lg font-semibold mb-2">Cosmic Time</h3>
              <p className="text-2xl font-mono">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </section>

        {/* Your Cosmic Profile Strip */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">Your Cosmic Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Astrology System Selector */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-300">Astrology System</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'sri-lanka', name: 'Sri Lanka', flag: '🇱🇰' },
                      { id: 'vedic', name: 'India/Vedic', flag: '🕉️' },
                      { id: 'western', name: 'Western', flag: '♈' },
                      { id: 'chinese', name: 'Chinese', flag: '🐉' }
                    ].map((system) => (
                      <button
                        key={system.id}
                        onClick={() => setSelectedAstrologySystem(system.id)}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedAstrologySystem === system.id
                            ? 'bg-purple-500/20 border-purple-400 text-white'
                            : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        <div className="text-2xl mb-1">{system.flag}</div>
                        <div className="text-sm font-medium">{system.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Numerology System Selector */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-300">Numerology System</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'pythagorean', name: 'Pythagorean' },
                      { id: 'chaldean', name: 'Chaldean' },
                      { id: 'kabbalistic', name: 'Kabbalistic' }
                    ].map((system) => (
                      <button
                        key={system.id}
                        onClick={() => setSelectedNumerologySystem(system.id)}
                        className={`w-full p-3 rounded-lg border transition-all ${
                          selectedNumerologySystem === system.id
                            ? 'bg-purple-500/20 border-purple-400 text-white'
                            : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        <div className="text-sm font-medium">{system.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Daily Cosmic Guidance */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-2xl font-bold mb-6 text-center text-cosmic">Daily Cosmic Guidance</h2>
              <div className="text-center">
                <div className="text-6xl mb-4">♈</div>
                <h3 className="text-xl font-semibold mb-4">Aries - Today's Energy</h3>
                <p className="text-gray-300 mb-6">
                  Your fiery energy is at its peak today. Take initiative on projects you've been putting off. 
                  The universe supports bold moves and new beginnings.
                </p>
                <Button variant="cosmic" size="lg" className="btn-cosmic">
                  Get Full Reading
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Today's Cosmic Rules */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Today's Cosmic Rules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dos */}
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                  <span className="text-2xl mr-2">✅</span>
                  Do's
                </h3>
                <ul className="space-y-3">
                  {todaysRules.dos.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Don'ts */}
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-red-400 flex items-center">
                  <span className="text-2xl mr-2">❌</span>
                  Don'ts
                </h3>
                <ul className="space-y-3">
                  {todaysRules.donts.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

            {/* Enhanced Features Section */}
            <section className="py-12 px-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Enhanced Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link href="/insights">
                    <Card className="p-6 hover:scale-105 cosmic-glow cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🌟</div>
                        <h3 className="text-xl font-semibold mb-3">Daily Insights</h3>
                        <p className="text-gray-300 mb-4 text-sm">Personalized cosmic guidance with real-time energy tracking</p>
                        <Button variant="primary" size="sm" className="w-full">
                          Explore Insights
                        </Button>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/compatibility-calculator">
                    <Card className="p-6 hover:scale-105 cosmic-glow cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-4">💕</div>
                        <h3 className="text-xl font-semibold mb-3">Compatibility Calculator</h3>
                        <p className="text-gray-300 mb-4 text-sm">Advanced relationship analysis with cosmic alignment</p>
                        <Button variant="primary" size="sm" className="w-full">
                          Calculate Compatibility
                        </Button>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/dream-analysis">
                    <Card className="p-6 hover:scale-105 cosmic-glow cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🌙</div>
                        <h3 className="text-xl font-semibold mb-3">Dream Analysis</h3>
                        <p className="text-gray-300 mb-4 text-sm">Multi-method dream interpretation with spiritual guidance</p>
                        <Button variant="primary" size="sm" className="w-full">
                          Analyze Dreams
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </div>
              </div>
            </section>

            {/* Cosmic Guidance Section */}
            <section className="py-12 px-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Cosmic Guidance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cosmicGuidance.map((guidance, index) => (
                    <Card key={index} className="p-6 hover:scale-105 cosmic-glow">
                      <div className="text-center">
                        <div className="text-4xl mb-4">{guidance.icon}</div>
                        <h3 className="text-xl font-semibold mb-3">{guidance.title}</h3>
                        <p className="text-gray-300 mb-4 text-sm">{guidance.preview}</p>
                        
                        <div className="mb-4">
                          <p className="text-gray-300 text-sm">{guidance.detail}</p>
                        </div>
                        
                        <Button variant="primary" size="sm" className="w-full">
                          Read More
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

        {/* Share Your Daily Secrets */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-2xl font-bold mb-6 text-center text-cosmic">Share Your Daily Secrets</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { platform: 'twitter', icon: '🐦', name: 'X' },
                  { platform: 'facebook', icon: '📘', name: 'Facebook' },
                  { platform: 'instagram', icon: '📷', name: 'Instagram' },
                  { platform: 'whatsapp', icon: '💬', name: 'WhatsApp' }
                ].map((social) => (
                  <Button
                    key={social.platform}
                    variant="secondary"
                    size="lg"
                    onClick={() => handleShare(social.platform)}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-xl">{social.icon}</span>
                    <span>{social.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Cosmic Community Teaser */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Cosmic Community</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:scale-105 cosmic-glow">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-2">Discover</h3>
                <p className="text-gray-300 text-sm mb-4">Find like-minded cosmic seekers</p>
                <Button variant="primary" size="sm" className="w-full">
                  Explore
                </Button>
              </Card>

              <Card className="p-6 text-center hover:scale-105 cosmic-glow">
                <div className="text-4xl mb-4">💕</div>
                <h3 className="text-lg font-semibold mb-2">Cosmic Match</h3>
                <p className="text-gray-300 text-sm mb-4">Find your astrological soulmate</p>
                <Button variant="primary" size="sm" className="w-full">
                  Match
                </Button>
              </Card>

              <Card className="p-6 text-center hover:scale-105 cosmic-glow">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold mb-2">Connections</h3>
                <p className="text-gray-300 text-sm mb-4">Build meaningful relationships</p>
                <Button variant="primary" size="sm" className="w-full">
                  Connect
                </Button>
              </Card>

              <Card className="p-6 text-center hover:scale-105 cosmic-glow">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-semibold mb-2">Chat</h3>
                <p className="text-gray-300 text-sm mb-4">Join cosmic conversations</p>
                <Button variant="primary" size="sm" className="w-full">
                  Chat
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* 12 Signs Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">The Zodiac Wheel</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {zodiacSigns.map((sign, index) => (
                <Card key={sign.name} className="p-6 text-center hover:scale-105 cosmic-glow">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${sign.color} flex items-center justify-center text-2xl`}>
                    {sign.symbol}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{sign.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{sign.element}</p>
                  <Button variant="cosmic" size="sm" className="w-full">
                    Unlock Full Reading
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-lg font-semibold mb-2">Privacy Protected</h3>
                  <p className="text-gray-300 text-sm">Your personal information is secure and never shared</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🚫</div>
                  <h3 className="text-lg font-semibold mb-2">No Spam</h3>
                  <p className="text-gray-300 text-sm">We respect your inbox and only send meaningful updates</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-lg font-semibold mb-2">Transparent Pricing</h3>
                  <p className="text-gray-300 text-sm">Clear, honest pricing with no hidden fees</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}