'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

export default function ZodiacPage() {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthLocation, setBirthLocation] = useState('')
  const [selectedSystem, setSelectedSystem] = useState('western')
  const [showDetails, setShowDetails] = useState(false)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Calculating astrology for:', { birthDate, birthTime, birthLocation, selectedSystem })
    setShowDetails(true)
  }

  const astrologySystems = [
    { 
      id: 'western', 
      name: 'Western', 
      description: 'Traditional Western astrology based on tropical zodiac',
      status: 'active',
      accuracy: '94%',
      features: ['Tropical Zodiac', '12 Houses', 'Planetary Aspects', 'Transit Analysis']
    },
    { 
      id: 'vedic', 
      name: 'Vedic', 
      description: 'Ancient Indian astrology using sidereal zodiac',
      status: 'active',
      accuracy: '96%',
      features: ['Sidereal Zodiac', '27 Nakshatras', 'Dasha System', 'Divisional Charts']
    },
    { 
      id: 'chinese', 
      name: 'Chinese', 
      description: '12-year cycle based on lunar calendar',
      status: 'active',
      accuracy: '92%',
      features: ['12 Animals', '5 Elements', 'Four Pillars', 'Lunar Calendar']
    },
    { 
      id: 'sri-lankan', 
      name: 'Sri Lankan', 
      description: 'Traditional Sri Lankan astrological system',
      status: 'active',
      accuracy: '95%',
      features: ['Porondam Matching', 'Muhurtha Timing', 'Nakshatra Analysis', 'Ayurvedic Integration']
    },
    { 
      id: 'hybrid', 
      name: 'Hybrid AI', 
      description: 'AI-powered combination of all systems',
      status: 'active',
      accuracy: '98%',
      features: ['Multi-System Synthesis', 'AI Predictions', 'Machine Learning', 'Personalized Insights']
    }
  ]

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic">
              Zodiac Insights
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover your astrological blueprint across various systems and unlock the secrets of the cosmos.
            </p>
          </div>
        </section>

        {/* Birth Details Form */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">Enter Your Birth Details</h2>
              <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="birthDate" className="block text-white text-sm font-medium mb-2">Birth Date</label>
                  <input
                    type="date"
                    id="birthDate"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthTime" className="block text-white text-sm font-medium mb-2">Birth Time (Optional)</label>
                  <input
                    type="time"
                    id="birthTime"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="birthLocation" className="block text-white text-sm font-medium mb-2">Birth Location</label>
                  <input
                    type="text"
                    id="birthLocation"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Colombo, Sri Lanka"
                    value={birthLocation}
                    onChange={(e) => setBirthLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="astrologySystem" className="block text-white text-sm font-medium mb-2">Astrology System</label>
                  <select
                    id="astrologySystem"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                  >
                    <option value="western">Western Astrology</option>
                    <option value="vedic">Vedic / Indian Astrology</option>
                    <option value="chinese">Chinese Astrology</option>
                    <option value="sriLanka">Sri Lankan Astrology</option>
                    <option value="hybrid">Hybrid Analysis</option>
                  </select>
                </div>
                <div className="md:col-span-2 text-center mt-6">
                  <Button type="submit" variant="cosmic" size="lg" className="btn-cosmic">
                    Get My Zodiac Reading
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>

        {/* Astrology Systems */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-cosmic">
              Available Astrology Systems
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {astrologySystems.map((system) => (
                <Card key={system.id} className="p-6 hover:scale-105 cosmic-glow">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                      {system.id === 'western' && '♈'}
                      {system.id === 'vedic' && '🕉️'}
                      {system.id === 'chinese' && '🐉'}
                      {system.id === 'sri-lankan' && '🇱🇰'}
                      {system.id === 'hybrid' && '🤖'}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{system.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{system.description}</p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Accuracy</span>
                      <span className="text-sm font-semibold text-green-400">{system.accuracy}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Status</span>
                      <span className="text-sm font-semibold text-green-400 capitalize">{system.status}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2 text-purple-300">Features:</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {system.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button variant="primary" size="sm" className="w-full">
                    Use {system.name}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showDetails && (
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 cosmic-glow">
                <h2 className="text-3xl font-bold mb-6 text-center text-cosmic">Your Zodiac Details</h2>
                <div className="text-center">
                  <p className="text-gray-300 mb-4">
                    Details for {birthDate} at {birthTime} in {birthLocation} using {selectedSystem} system.
                  </p>
                  <p className="text-gray-300 mb-8">
                    This is a placeholder for your detailed zodiac reading.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="cosmic" size="lg">
                      Get Detailed Reading
                    </Button>
                    <Button variant="secondary" size="lg">
                      Save to Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}