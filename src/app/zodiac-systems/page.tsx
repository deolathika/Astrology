'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, Globe, Circle, Scale, ChevronDown, ChevronUp, Info, 
  BookOpen, Calendar, Clock, MapPin, Sparkles, Zap, Shield, CircleDot
} from 'lucide-react'

// Use Circle as YinYang since YinYang doesn't exist in lucide-react
const YinYang = Circle
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CosmicNavigation } from '@/components/cosmic-navigation'

interface ZodiacSystem {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  origin: string
  elements: string[]
  signs: Array<{
    name: string
    dates: string
    element: string
    quality: string
    ruler: string
    symbol: string
  }>
  features: string[]
  calculations: string[]
  benefits: string[]
}

export default function ZodiacSystemsPage() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)
  const [expandedSign, setExpandedSign] = useState<string | null>(null)

  const zodiacSystems: ZodiacSystem[] = [
    {
      id: 'western',
      name: 'Western Astrology',
      description: 'Tropical zodiac based on seasons and Sun\'s position',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      origin: 'Ancient Greece and Babylon',
      elements: ['Fire', 'Earth', 'Air', 'Water'],
      signs: [
        { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire', quality: 'Cardinal', ruler: 'Mars', symbol: '♈' },
        { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth', quality: 'Fixed', ruler: 'Venus', symbol: '♉' },
        { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air', quality: 'Mutable', ruler: 'Mercury', symbol: '♊' },
        { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water', quality: 'Cardinal', ruler: 'Moon', symbol: '♋' },
        { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire', quality: 'Fixed', ruler: 'Sun', symbol: '♌' },
        { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth', quality: 'Mutable', ruler: 'Mercury', symbol: '♍' },
        { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air', quality: 'Cardinal', ruler: 'Venus', symbol: '♎' },
        { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water', quality: 'Fixed', ruler: 'Pluto', symbol: '♏' },
        { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter', symbol: '♐' },
        { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn', symbol: '♑' },
        { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air', quality: 'Fixed', ruler: 'Uranus', symbol: '♒' },
        { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water', quality: 'Mutable', ruler: 'Neptune', symbol: '♓' }
      ],
      features: [
        '12 signs based on Sun\'s position',
        '4 elements: Fire, Earth, Air, Water',
        '3 qualities: Cardinal, Fixed, Mutable',
        'Planetary rulers for each sign',
        'House system for life areas',
        'Aspect patterns and orbs'
      ],
      calculations: [
        'Tropical zodiac (0° Aries = Spring Equinox)',
        'Planetary positions in signs and houses',
        'Aspects between planets',
        'House cusps and rulers',
        'Transits and progressions'
      ],
      benefits: [
        'Easy to understand and popular',
        'Great for personality analysis',
        'Excellent for relationship compatibility',
        'Good for timing events',
        'Widely accepted and studied'
      ]
    },
    {
      id: 'vedic',
      name: 'Vedic Astrology',
      description: 'Sidereal zodiac based on fixed stars and constellations',
      icon: Globe,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      origin: 'Ancient India (Jyotish)',
      elements: ['Fire', 'Earth', 'Air', 'Water'],
      signs: [
        { name: 'Mesha (Aries)', dates: 'Apr 14 - May 14', element: 'Fire', quality: 'Cardinal', ruler: 'Mars', symbol: '♈' },
        { name: 'Vrishabha (Taurus)', dates: 'May 15 - Jun 14', element: 'Earth', quality: 'Fixed', ruler: 'Venus', symbol: '♉' },
        { name: 'Mithuna (Gemini)', dates: 'Jun 15 - Jul 14', element: 'Air', quality: 'Mutable', ruler: 'Mercury', symbol: '♊' },
        { name: 'Karka (Cancer)', dates: 'Jul 15 - Aug 14', element: 'Water', quality: 'Cardinal', ruler: 'Moon', symbol: '♋' },
        { name: 'Simha (Leo)', dates: 'Aug 15 - Sep 14', element: 'Fire', quality: 'Fixed', ruler: 'Sun', symbol: '♌' },
        { name: 'Kanya (Virgo)', dates: 'Sep 15 - Oct 14', element: 'Earth', quality: 'Mutable', ruler: 'Mercury', symbol: '♍' },
        { name: 'Tula (Libra)', dates: 'Oct 15 - Nov 14', element: 'Air', quality: 'Cardinal', ruler: 'Venus', symbol: '♎' },
        { name: 'Vrishchika (Scorpio)', dates: 'Nov 15 - Dec 14', element: 'Water', quality: 'Fixed', ruler: 'Mars', symbol: '♏' },
        { name: 'Dhanu (Sagittarius)', dates: 'Dec 15 - Jan 13', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter', symbol: '♐' },
        { name: 'Makara (Capricorn)', dates: 'Jan 14 - Feb 12', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn', symbol: '♑' },
        { name: 'Kumbha (Aquarius)', dates: 'Feb 13 - Mar 13', element: 'Air', quality: 'Fixed', ruler: 'Saturn', symbol: '♒' },
        { name: 'Meena (Pisces)', dates: 'Mar 14 - Apr 13', element: 'Water', quality: 'Mutable', ruler: 'Jupiter', symbol: '♓' }
      ],
      features: [
        '27 Nakshatras (lunar mansions)',
        'Dasha system for timing',
        'Ayanamsa correction (Lahiri)',
        'Planetary periods and sub-periods',
        'Yogas and combinations',
        'Remedial measures and gemstones'
      ],
      calculations: [
        'Sidereal zodiac (fixed star positions)',
        'Ayanamsa correction for precession',
        'Nakshatra calculations',
        'Dasha periods (Vimshottari)',
        'Planetary strengths and weaknesses'
      ],
      benefits: [
        'More accurate for predictions',
        'Excellent for timing events',
        'Detailed personality analysis',
        'Karma and spiritual insights',
        'Remedial measures available'
      ]
    },
    {
      id: 'chinese',
      name: 'Chinese Astrology',
      description: '12-year animal cycle with 5 elements and yin-yang',
      icon: Circle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      origin: 'Ancient China',
      elements: ['Wood', 'Fire', 'Earth', 'Metal', 'Water'],
      signs: [
        { name: 'Rat', dates: '1924, 1936, 1948...', element: 'Water', quality: 'Yang', ruler: 'Mercury', symbol: '🐀' },
        { name: 'Ox', dates: '1925, 1937, 1949...', element: 'Earth', quality: 'Yin', ruler: 'Venus', symbol: '🐂' },
        { name: 'Tiger', dates: '1926, 1938, 1950...', element: 'Wood', quality: 'Yang', ruler: 'Jupiter', symbol: '🐅' },
        { name: 'Rabbit', dates: '1927, 1939, 1951...', element: 'Wood', quality: 'Yin', ruler: 'Moon', symbol: '🐰' },
        { name: 'Dragon', dates: '1928, 1940, 1952...', element: 'Earth', quality: 'Yang', ruler: 'Sun', symbol: '🐉' },
        { name: 'Snake', dates: '1929, 1941, 1953...', element: 'Fire', quality: 'Yin', ruler: 'Mercury', symbol: '🐍' },
        { name: 'Horse', dates: '1930, 1942, 1954...', element: 'Fire', quality: 'Yang', ruler: 'Sun', symbol: '🐴' },
        { name: 'Goat', dates: '1931, 1943, 1955...', element: 'Earth', quality: 'Yin', ruler: 'Moon', symbol: '🐐' },
        { name: 'Monkey', dates: '1932, 1944, 1956...', element: 'Metal', quality: 'Yang', ruler: 'Mercury', symbol: '🐒' },
        { name: 'Rooster', dates: '1933, 1945, 1957...', element: 'Metal', quality: 'Yin', ruler: 'Venus', symbol: '🐓' },
        { name: 'Dog', dates: '1934, 1946, 1958...', element: 'Earth', quality: 'Yang', ruler: 'Mars', symbol: '🐕' },
        { name: 'Pig', dates: '1935, 1947, 1959...', element: 'Water', quality: 'Yin', ruler: 'Jupiter', symbol: '🐷' }
      ],
      features: [
        '12-year animal cycle',
        '5 elements: Wood, Fire, Earth, Metal, Water',
        'Yin and Yang qualities',
        'Hour, day, month, year pillars',
        'Compatibility based on elements',
        'Feng Shui applications'
      ],
      calculations: [
        'Birth year determines animal sign',
        'Element based on birth year ending',
        'Yin-Yang based on birth year',
        'Four Pillars of Destiny',
        'Compatibility calculations'
      ],
      benefits: [
        'Simple and easy to understand',
        'Great for compatibility',
        'Cultural and traditional insights',
        'Feng Shui applications',
        'Yearly predictions'
      ]
    },
    {
      id: 'hybrid',
      name: 'Hybrid System',
      description: 'Combines best features from multiple astrological traditions',
      icon: Scale,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      origin: 'Modern synthesis',
      elements: ['Fire', 'Earth', 'Air', 'Water', 'Spirit'],
      signs: [
        { name: 'Western + Vedic', dates: 'Combined analysis', element: 'Multiple', quality: 'Synthesized', ruler: 'Contextual', symbol: '⚖️' },
        { name: 'Chinese Integration', dates: 'Animal + Element', element: '5 Elements', quality: 'Yin-Yang', ruler: 'Traditional', symbol: '☯️' },
        { name: 'Modern Synthesis', dates: 'Contemporary', element: 'Adaptive', quality: 'Flexible', ruler: 'Personal', symbol: '🔮' }
      ],
      features: [
        'Combines Western and Vedic insights',
        'Integrates Chinese elements',
        'Modern psychological approach',
        'Cultural sensitivity',
        'Personalized interpretations',
        'Adaptive to individual needs'
      ],
      calculations: [
        'Multiple calculation methods',
        'Cross-cultural validation',
        'Personalized weighting',
        'Contextual interpretation',
        'Cultural adaptation'
      ],
      benefits: [
        'Most comprehensive analysis',
        'Cultural inclusivity',
        'Personalized approach',
        'Modern and relevant',
        'Best of all traditions'
      ]
    }
  ]

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Fire': return 'text-red-500'
      case 'Earth': return 'text-green-500'
      case 'Air': return 'text-blue-500'
      case 'Water': return 'text-purple-500'
      case 'Wood': return 'text-green-600'
      case 'Metal': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Cardinal': return 'text-red-600'
      case 'Fixed': return 'text-blue-600'
      case 'Mutable': return 'text-green-600'
      case 'Yang': return 'text-orange-600'
      case 'Yin': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Breadcrumbs />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
            Explore Zodiac Systems
          </h1>
          <p className="text-gray-600">
            Discover different astrological traditions and their unique insights
          </p>
        </motion.div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {zodiacSystems.map((system, index) => {
            const Icon = system.icon
            return (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedSystem(selectedSystem === system.id ? null : system.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 ${system.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${system.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{system.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{system.description}</p>
                  <div className="text-xs text-gray-500">Origin: {system.origin}</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Detailed System Information */}
        <AnimatePresence>
          {selectedSystem && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card p-6 mb-8"
            >
              {zodiacSystems
                .filter(system => system.id === selectedSystem)
                .map((system) => {
                  const Icon = system.icon
                  return (
                    <div key={system.id}>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`w-12 h-12 ${system.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${system.color}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900">{system.name}</h2>
                          <p className="text-gray-600">{system.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Features */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2" />
                            Key Features
                          </h3>
                          <ul className="space-y-2">
                            {system.features.map((feature, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-600">
                                <Zap className="w-3 h-3 text-violet-500 mr-2 mt-1 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Calculations */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Calculations
                          </h3>
                          <ul className="space-y-2">
                            {system.calculations.map((calc, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-600">
                                <Shield className="w-3 h-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                                {calc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Info className="w-5 h-5 mr-2" />
                            Benefits
                          </h3>
                          <ul className="space-y-2">
                            {system.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-600">
                                <Zap className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Signs */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Signs & Characteristics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {system.signs.map((sign, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="card p-4 hover:shadow-lg transition-all cursor-pointer"
                              onClick={() => setExpandedSign(expandedSign === `${system.id}-${index}` ? null : `${system.id}-${index}`)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="text-2xl">{sign.symbol}</span>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{sign.name}</h4>
                                    <p className="text-xs text-gray-500">{sign.dates}</p>
                                  </div>
                                </div>
                                {expandedSign === `${system.id}-${index}` ? 
                                  <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                }
                              </div>

                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${getElementColor(sign.element)} bg-gray-100`}>
                                  {sign.element}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full ${getQualityColor(sign.quality)} bg-gray-100`}>
                                  {sign.quality}
                                </span>
                              </div>

                              <div className="text-xs text-gray-500">
                                Ruler: {sign.ruler}
                              </div>

                              <AnimatePresence>
                                {expandedSign === `${system.id}-${index}` && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 pt-3 border-t"
                                  >
                                    <div className="text-sm text-gray-600">
                                      <p className="mb-2">
                                        <strong>Element:</strong> {sign.element} - {sign.element === 'Fire' ? 'Passionate and energetic' : 
                                        sign.element === 'Earth' ? 'Practical and grounded' :
                                        sign.element === 'Air' ? 'Intellectual and communicative' :
                                        sign.element === 'Water' ? 'Emotional and intuitive' :
                                        sign.element === 'Wood' ? 'Growth and expansion' :
                                        sign.element === 'Metal' ? 'Structure and refinement' : 'Balanced and adaptable'}
                                      </p>
                                      <p className="mb-2">
                                        <strong>Quality:</strong> {sign.quality} - {sign.quality === 'Cardinal' ? 'Initiating and leading' :
                                        sign.quality === 'Fixed' ? 'Stable and determined' :
                                        sign.quality === 'Mutable' ? 'Adaptable and flexible' :
                                        sign.quality === 'Yang' ? 'Active and outward' :
                                        sign.quality === 'Yin' ? 'Receptive and inward' : 'Balanced energy'}
                                      </p>
                                      <p>
                                        <strong>Ruler:</strong> {sign.ruler} influences this sign's characteristics and behavior patterns.
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">System Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  {zodiacSystems.map((system) => (
                    <th key={system.id} className="text-center py-3 px-4">{system.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Zodiac Type</td>
                  <td className="py-3 px-4 text-center">Tropical</td>
                  <td className="py-3 px-4 text-center">Sidereal</td>
                  <td className="py-3 px-4 text-center">Animal Cycle</td>
                  <td className="py-3 px-4 text-center">Hybrid</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Elements</td>
                  <td className="py-3 px-4 text-center">4</td>
                  <td className="py-4 text-center">4</td>
                  <td className="py-3 px-4 text-center">5</td>
                  <td className="py-3 px-4 text-center">5</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Signs</td>
                  <td className="py-3 px-4 text-center">12</td>
                  <td className="py-3 px-4 text-center">12 + 27 Nakshatras</td>
                  <td className="py-3 px-4 text-center">12 Animals</td>
                  <td className="py-3 px-4 text-center">Variable</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Timing System</td>
                  <td className="py-3 px-4 text-center">Transits</td>
                  <td className="py-3 px-4 text-center">Dasha</td>
                  <td className="py-3 px-4 text-center">Yearly Cycle</td>
                  <td className="py-3 px-4 text-center">Multiple</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Best For</td>
                  <td className="py-3 px-4 text-center">Personality</td>
                  <td className="py-3 px-4 text-center">Predictions</td>
                  <td className="py-3 px-4 text-center">Compatibility</td>
                  <td className="py-3 px-4 text-center">Comprehensive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <CosmicNavigation />
    </div>
  )
}
