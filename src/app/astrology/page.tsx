'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import PremiumGate from '@/components/readdy/PremiumGate'
import PremiumBadge from '@/components/readdy/PremiumBadge'

export default function AstrologyPage() {
  const [selectedSystem, setSelectedSystem] = useState('western')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthLocation, setBirthLocation] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [userRole, setUserRole] = useState<'guest' | 'premium'>('premium')

  const astrologySystems = [
    { 
      id: 'western', 
      name: 'Western Astrology', 
      description: 'Traditional Western astrology based on tropical zodiac',
      icon: '♈',
      status: 'active',
      accuracy: '94%',
      features: ['Tropical Zodiac', '12 Houses', 'Planetary Aspects', 'Transit Analysis', 'Solar Returns'],
      color: 'from-blue-500 to-purple-500'
    },
    { 
      id: 'vedic', 
      name: 'Vedic Astrology', 
      description: 'Ancient Indian astrology using sidereal zodiac',
      icon: '🕉️',
      status: 'active',
      accuracy: '96%',
      features: ['Sidereal Zodiac', '27 Nakshatras', 'Dasha System', 'Divisional Charts', 'Muhurta'],
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 'chinese', 
      name: 'Chinese Astrology', 
      description: '12-year cycle based on lunar calendar and 5 elements',
      icon: '🐉',
      status: 'active',
      accuracy: '92%',
      features: ['12 Animals', '5 Elements', 'Four Pillars', 'Lunar Calendar', 'Feng Shui'],
      color: 'from-yellow-500 to-red-500'
    },
    { 
      id: 'sri-lankan', 
      name: 'Sri Lankan Astrology', 
      description: 'Traditional Sri Lankan astrological system with local influences',
      icon: '🇱🇰',
      status: 'active',
      accuracy: '95%',
      features: ['Porondam Matching', 'Muhurtha Timing', 'Nakshatra Analysis', 'Ayurvedic Integration', 'Local Traditions'],
      color: 'from-green-500 to-teal-500'
    },
    { 
      id: 'arabic', 
      name: 'Arabic Astrology', 
      description: 'Medieval Arabic astrological traditions and techniques',
      icon: '☪️',
      status: 'active',
      accuracy: '93%',
      features: ['Arabic Parts', 'Lots', 'Fixed Stars', 'Lunar Mansions', 'Persian Techniques'],
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      id: 'mayan', 
      name: 'Mayan Astrology', 
      description: 'Ancient Mayan calendar and astrological system',
      icon: '🌙',
      status: 'active',
      accuracy: '91%',
      features: ['Tzolkin Calendar', 'Haab Calendar', 'Long Count', 'Sacred Animals', 'Day Signs'],
      color: 'from-emerald-500 to-green-500'
    },
    { 
      id: 'celtic', 
      name: 'Celtic Astrology', 
      description: 'Ancient Celtic tree astrology and seasonal cycles',
      icon: '🌳',
      status: 'active',
      accuracy: '89%',
      features: ['Tree Calendar', 'Seasonal Cycles', 'Ogham Script', 'Druid Wisdom', 'Nature Connection'],
      color: 'from-green-600 to-emerald-500'
    },
    { 
      id: 'hybrid', 
      name: 'Hybrid AI System', 
      description: 'AI-powered combination of all astrological systems',
      icon: '🤖',
      status: 'active',
      accuracy: '98%',
      features: ['Multi-System Synthesis', 'AI Predictions', 'Machine Learning', 'Personalized Insights', 'Advanced Analytics'],
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!birthDate || !birthLocation) return
    
    setShowResults(true)
  }

  const getSystemDetails = (systemId: string) => {
    return astrologySystems.find(s => s.id === systemId)
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic">
              Advanced Astrology Systems
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore multiple astrological traditions from around the world with our comprehensive system.
            </p>
          </div>
        </section>

        {/* Birth Details Form */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 cosmic-glow">
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
                  <label htmlFor="astrologySystem" className="block text-white text-sm font-medium mb-2">Select Astrology System</label>
                  <select
                    id="astrologySystem"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                  >
                    {astrologySystems.map((system) => (
                      <option key={system.id} value={system.id}>
                        {system.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 text-center mt-6">
                  <Button type="submit" variant="cosmic" size="lg" className="btn-cosmic">
                    Calculate My Astrological Profile
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>

        {/* Astrology Systems Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-cosmic">
              Available Astrology Systems
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {astrologySystems.map((system) => (
                <Card key={system.id} className="p-6 hover:scale-105 cosmic-glow">
                  <div className="text-center mb-4">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${system.color} flex items-center justify-center text-3xl`}>
                      {system.icon}
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
                  
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedSystem(system.id)}
                    >
                      Use {system.name}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Selected System Details */}
        {selectedSystem && (
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="p-8 cosmic-glow">
                <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">
                  {getSystemDetails(selectedSystem)?.name} Analysis
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-300">System Overview</h3>
                    <p className="text-gray-300 mb-6">
                      {getSystemDetails(selectedSystem)?.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy Rate:</span>
                        <span className="text-green-400 font-semibold">{getSystemDetails(selectedSystem)?.accuracy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">System Status:</span>
                        <span className="text-green-400 font-semibold capitalize">{getSystemDetails(selectedSystem)?.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-300">Key Features</h3>
                    <ul className="space-y-2">
                      {getSystemDetails(selectedSystem)?.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button variant="cosmic" size="lg" className="btn-cosmic">
                    Get Detailed Reading
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Results Section */}
        {showResults && (
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="p-8 cosmic-glow">
                <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">
                  Your Astrological Profile
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">♈</div>
                    <h3 className="text-xl font-semibold mb-2">Zodiac Sign</h3>
                    <p className="text-gray-300">Aries</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔥</div>
                    <h3 className="text-xl font-semibold mb-2">Element</h3>
                    <p className="text-gray-300">Fire</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚡</div>
                    <h3 className="text-xl font-semibold mb-2">Modality</h3>
                    <p className="text-gray-300">Cardinal</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-300 mb-6">
                    Based on {birthDate} at {birthTime} in {birthLocation} using {getSystemDetails(selectedSystem)?.name}.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="cosmic" size="lg">
                      Get Full Reading
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

        {/* System Comparison */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-cosmic">
              System Comparison
            </h2>
            
            <Card className="p-8 cosmic-glow">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 px-2">System</th>
                      <th className="text-left py-4 px-2">Accuracy</th>
                      <th className="text-left py-4 px-2">Features</th>
                      <th className="text-left py-4 px-2">Best For</th>
                      <th className="text-left py-4 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {astrologySystems.map((system) => (
                      <tr key={system.id} className="border-b border-white/10">
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{system.icon}</span>
                            <span className="font-semibold">{system.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-green-400 font-semibold">{system.accuracy}</td>
                        <td className="py-4 px-2 text-gray-300">{system.features.length} features</td>
                        <td className="py-4 px-2 text-gray-300">
                          {system.id === 'western' && 'General guidance'}
                          {system.id === 'vedic' && 'Spiritual growth'}
                          {system.id === 'chinese' && 'Life cycles'}
                          {system.id === 'sri-lankan' && 'Local traditions'}
                          {system.id === 'arabic' && 'Medieval techniques'}
                          {system.id === 'mayan' && 'Ancient wisdom'}
                          {system.id === 'celtic' && 'Nature connection'}
                          {system.id === 'hybrid' && 'AI-powered insights'}
                        </td>
                        <td className="py-4 px-2">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                            {system.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}