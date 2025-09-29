'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Star, 
  Users, 
  Plus, 
  Search,
  Calendar,
  MapPin,
  Sparkles,
  Zap,
  Shield,
  Flame
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'

const zodiacSigns = [
  { id: 'aries', name: 'Aries', symbol: '♈', element: 'Fire', color: 'nebula-red' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', element: 'Earth', color: 'aurora-green' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', element: 'Air', color: 'celestial-blue' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', element: 'Water', color: 'stellar-teal' },
  { id: 'leo', name: 'Leo', symbol: '♌', element: 'Fire', color: 'supernova-gold' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', element: 'Earth', color: 'cosmic-cyan' },
  { id: 'libra', name: 'Libra', symbol: '♎', element: 'Air', color: 'stellar-pink' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', element: 'Water', color: 'electric-violet' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', element: 'Fire', color: 'cosmic-orange' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', element: 'Earth', color: 'stellar-gray' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', element: 'Air', color: 'celestial-blue' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', element: 'Water', color: 'stellar-teal' }
]

const compatibilityResults = [
  {
    id: 1,
    person1: { name: 'Alex', sign: 'Leo', avatar: '🦁' },
    person2: { name: 'Sam', sign: 'Aquarius', avatar: '♒' },
    compatibility: 85,
    strengths: ['Intellectual connection', 'Shared values', 'Mutual respect'],
    challenges: ['Different communication styles', 'Need for space'],
    advice: 'Focus on your shared love for innovation and humanitarian causes. Give each other space to pursue individual interests.',
    date: '2 days ago'
  },
  {
    id: 2,
    person1: { name: 'Maya', sign: 'Scorpio', avatar: '♏' },
    person2: { name: 'Jordan', sign: 'Taurus', avatar: '♉' },
    compatibility: 92,
    strengths: ['Deep emotional bond', 'Physical chemistry', 'Loyalty'],
    challenges: ['Stubbornness', 'Possessiveness'],
    advice: 'Your connection is incredibly strong. Work on communication during conflicts and trust each other completely.',
    date: '1 week ago'
  }
]

export default function CompatibilityPage() {
  const [selectedSign1, setSelectedSign1] = useState('')
  const [selectedSign2, setSelectedSign2] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [compatibilityScore, setCompatibilityScore] = useState(0)

  const handleCompatibilityCheck = () => {
    if (selectedSign1 && selectedSign2) {
      // Simulate compatibility calculation
      const score = Math.floor(Math.random() * 40) + 60 // 60-100 range
      setCompatibilityScore(score)
      setShowResults(true)
    }
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-aurora-green'
    if (score >= 80) return 'text-supernova-gold'
    if (score >= 70) return 'text-electric-violet'
    if (score >= 60) return 'text-cosmic-orange'
    return 'text-nebula-red'
  }

  const getCompatibilityMessage = (score: number) => {
    if (score >= 90) return 'Cosmic Soulmates! Your connection is written in the stars.'
    if (score >= 80) return 'Excellent compatibility! You have a strong cosmic bond.'
    if (score >= 70) return 'Good compatibility with potential for growth.'
    if (score >= 60) return 'Moderate compatibility. Communication is key.'
    return 'Challenging but not impossible. Focus on understanding each other.'
  }

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-cosmic-gradient-text mb-4"
            >
              Cosmic Compatibility
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light"
            >
              Discover the cosmic connection between two souls
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Compatibility Checker */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="cosmic-card mb-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-stellar-pink/20 rounded-2xl">
                    <Heart className="w-6 h-6 text-stellar-pink" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-starlight-white">
                      Check Compatibility
                    </h2>
                    <p className="text-stellar-gray-light">
                      Select two zodiac signs to analyze their cosmic connection
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* First Person */}
                  <div>
                    <label className="block text-stellar-gray-light text-sm font-semibold mb-4">
                      First Person
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {zodiacSigns.map((sign) => (
                        <button
                          key={sign.id}
                          onClick={() => setSelectedSign1(sign.id)}
                          className={`p-3 rounded-xl border transition-all text-center ${
                            selectedSign1 === sign.id
                              ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                              : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                          }`}
                        >
                          <div className="text-2xl mb-1">{sign.symbol}</div>
                          <div className="text-xs font-semibold">{sign.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Second Person */}
                  <div>
                    <label className="block text-stellar-gray-light text-sm font-semibold mb-4">
                      Second Person
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {zodiacSigns.map((sign) => (
                        <button
                          key={sign.id}
                          onClick={() => setSelectedSign2(sign.id)}
                          className={`p-3 rounded-xl border transition-all text-center ${
                            selectedSign2 === sign.id
                              ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                              : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                          }`}
                        >
                          <div className="text-2xl mb-1">{sign.symbol}</div>
                          <div className="text-xs font-semibold">{sign.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCompatibilityCheck}
                  disabled={!selectedSign1 || !selectedSign2}
                  className="w-full cosmic-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Check Compatibility</span>
                  </div>
                </button>
              </motion.div>

              {/* Results */}
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="cosmic-card"
                >
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold mb-4">
                      <span className={getCompatibilityColor(compatibilityScore)}>
                        {compatibilityScore}%
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-starlight-white mb-2">
                      Compatibility Score
                    </h3>
                    <p className="text-stellar-gray-light">
                      {getCompatibilityMessage(compatibilityScore)}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-aurora-green mb-3 flex items-center space-x-2">
                        <Zap className="w-5 h-5" />
                        <span>Strengths</span>
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2 text-starlight-white">
                          <div className="w-2 h-2 bg-aurora-green rounded-full" />
                          <span>Strong emotional connection</span>
                        </li>
                        <li className="flex items-center space-x-2 text-starlight-white">
                          <div className="w-2 h-2 bg-aurora-green rounded-full" />
                          <span>Complementary personalities</span>
                        </li>
                        <li className="flex items-center space-x-2 text-starlight-white">
                          <div className="w-2 h-2 bg-aurora-green rounded-full" />
                          <span>Shared values and goals</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-nebula-red mb-3 flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Challenges</span>
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2 text-starlight-white">
                          <div className="w-2 h-2 bg-nebula-red rounded-full" />
                          <span>Different communication styles</span>
                        </li>
                        <li className="flex items-center space-x-2 text-starlight-white">
                          <div className="w-2 h-2 bg-nebula-red rounded-full" />
                          <span>Need for personal space</span>
                        </li>
                        <li className="flex items-center space-x-2 text-starlight-white">
                          <div className="w-2 h-2 bg-nebula-red rounded-full" />
                          <span>Different approaches to conflict</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-electric-violet/10 rounded-xl border border-electric-violet/30">
                    <h4 className="text-lg font-semibold text-electric-violet mb-2">
                      Cosmic Advice
                    </h4>
                    <p className="text-starlight-white">
                      Your cosmic connection is strong, but requires understanding and patience. 
                      Focus on open communication and respect each other's differences. 
                      The stars suggest that compromise and mutual support will strengthen your bond.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Recent Checks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="cosmic-card mt-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="w-6 h-6 text-electric-violet" />
                  <h3 className="text-lg font-bold text-starlight-white">
                    Recent Compatibility Checks
                  </h3>
                </div>

                <div className="space-y-4">
                  {compatibilityResults.map((result) => (
                    <div key={result.id} className="p-4 bg-cosmic-navy/50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{result.person1.avatar}</span>
                            <span className="text-starlight-white font-semibold">
                              {result.person1.name}
                            </span>
                            <span className="text-stellar-gray-light">
                              ({result.person1.sign})
                            </span>
                          </div>
                          <Heart className="w-4 h-4 text-stellar-pink" />
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{result.person2.avatar}</span>
                            <span className="text-starlight-white font-semibold">
                              {result.person2.name}
                            </span>
                            <span className="text-stellar-gray-light">
                              ({result.person2.sign})
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getCompatibilityColor(result.compatibility)}`}>
                            {result.compatibility}%
                          </div>
                          <div className="text-stellar-gray-light text-sm">
                            {result.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="cosmic-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="w-6 h-6 text-supernova-gold" />
                  <h3 className="text-lg font-bold text-starlight-white">
                    Compatibility Stats
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Checks Today</span>
                    <span className="text-starlight-white font-semibold">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Average Score</span>
                    <span className="text-aurora-green font-semibold">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Perfect Matches</span>
                    <span className="text-supernova-gold font-semibold">12</span>
                  </div>
                </div>
              </motion.div>

              {/* Element Compatibility */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="cosmic-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Flame className="w-6 h-6 text-cosmic-orange" />
                  <h3 className="text-lg font-bold text-starlight-white">
                    Element Compatibility
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-stellar-gray-light">Fire + Fire</span>
                    <span className="text-nebula-red font-semibold">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stellar-gray-light">Water + Water</span>
                    <span className="text-stellar-teal font-semibold">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stellar-gray-light">Air + Air</span>
                    <span className="text-celestial-blue font-semibold">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stellar-gray-light">Earth + Earth</span>
                    <span className="text-aurora-green font-semibold">High</span>
                  </div>
                </div>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="cosmic-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="w-6 h-6 text-electric-violet" />
                  <h3 className="text-lg font-bold text-starlight-white">
                    Compatibility Tips
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-electric-violet/10 rounded-lg">
                    <div className="text-electric-violet font-semibold mb-1">
                      Communication
                    </div>
                    <div className="text-stellar-gray-light">
                      Open and honest communication is key to any relationship.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-supernova-gold/10 rounded-lg">
                    <div className="text-supernova-gold font-semibold mb-1">
                      Understanding
                    </div>
                    <div className="text-stellar-gray-light">
                      Respect each other's differences and unique qualities.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-aurora-green/10 rounded-lg">
                    <div className="text-aurora-green font-semibold mb-1">
                      Growth
                    </div>
                    <div className="text-stellar-gray-light">
                      Support each other's personal and spiritual growth.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
