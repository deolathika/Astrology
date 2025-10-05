'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface ComprehensiveAstrologySystemProps {
  user: any
}

const birthDataSchema = z.object({
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  second: z.number().int().min(0).max(59),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timezone: z.number(),
  country: z.string().min(1),
  city: z.string().min(1),
  zodiacSystem: z.enum(['western', 'vedic', 'chinese', 'sri-lanka', 'hybrid']).default('western'),
})

export default function ComprehensiveAstrologySystem({ user }: ComprehensiveAstrologySystemProps) {
  const [activeSystem, setActiveSystem] = useState('western')
  const [activeFeature, setActiveFeature] = useState('natal')
  const [astrologyResult, setAstrologyResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof birthDataSchema>>({
    resolver: zodResolver(birthDataSchema),
    defaultValues: {
      year: 1990,
      month: 1,
      day: 1,
      hour: 12,
      minute: 0,
      second: 0,
      latitude: 6.9271, // Colombo, Sri Lanka
      longitude: 79.8612, // Colombo, Sri Lanka
      timezone: 5.5, // Sri Lanka Standard Time
      country: 'Sri Lanka',
      city: 'Colombo',
      zodiacSystem: 'western',
    },
  })

  // Fetch existing astrology data if available
  const { data: existingData } = useQuery({
    queryKey: ['existing-astrology', user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/zodiac`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          birthDate: user.profile?.birthDate || '1990-01-01',
          birthTime: user.profile?.birthTime || '12:00',
          latitude: user.profile?.lat || 6.9271,
          longitude: user.profile?.lng || 79.8612
        })
      })
      if (!response.ok) throw new Error('Failed to fetch existing data')
      return response.json()
    },
    enabled: !!user?.id
  })

  const onSubmit = async (values: z.infer<typeof birthDataSchema>) => {
    setLoading(true)
    setError(null)
    setAstrologyResult(null)

    try {
      const response = await fetch('/api/astrology/premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch astrology data')
      }

      setAstrologyResult(data.data)
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const astrologySystems = [
    {
      id: 'western',
      name: 'Western Astrology',
      icon: '♈',
      description: 'Tropical zodiac system with 12 signs, houses, and planetary aspects',
      features: ['Natal Chart', 'Transits', 'Progressions', 'Compatibility', 'Houses', 'Aspects']
    },
    {
      id: 'vedic',
      name: 'Vedic Astrology',
      icon: '🕉️',
      description: 'Sidereal zodiac with 27 Nakshatras, Dasha system, and Yogas',
      features: ['Rashi Chart', 'Nakshatras', 'Dasha System', 'Yogas', 'Divisional Charts', 'Remedies']
    },
    {
      id: 'chinese',
      name: 'Chinese Astrology',
      icon: '🐉',
      description: '12 animal signs with 5 elements and Yin/Yang balance',
      features: ['Animal Signs', 'Elements', 'Yin/Yang', 'Compatibility', 'Lucky Numbers', 'Colors']
    },
    {
      id: 'sri-lanka',
      name: 'Sri Lankan Astrology',
      icon: '🇱🇰',
      description: 'Traditional Sinhala astrology with cultural insights and remedies',
      features: ['Sinhala Signs', 'Cultural Insights', 'Health Advice', 'Spiritual Guidance', 'Lucky Stones', 'Colors']
    },
    {
      id: 'hybrid',
      name: 'Hybrid System',
      icon: '🌟',
      description: 'Combined analysis from multiple systems for comprehensive insights',
      features: ['Multi-System Analysis', 'Cross-Validation', 'Comprehensive Reports', 'Advanced Calculations']
    }
  ]

  const astrologyFeatures = [
    {
      id: 'natal',
      name: 'Natal Chart',
      icon: '🔮',
      description: 'Complete birth chart analysis with planetary positions and aspects'
    },
    {
      id: 'transits',
      name: 'Transits',
      icon: '🌙',
      description: 'Current planetary influences and their effects on your life'
    },
    {
      id: 'progressions',
      name: 'Progressions',
      icon: '📈',
      description: 'Secondary progressions showing your personal development timeline'
    },
    {
      id: 'compatibility',
      name: 'Compatibility',
      icon: '💕',
      description: 'Relationship analysis and compatibility reports'
    },
    {
      id: 'houses',
      name: 'Houses',
      icon: '🏠',
      description: 'Detailed house analysis and planetary placements'
    },
    {
      id: 'aspects',
      name: 'Aspects',
      icon: '⚡',
      description: 'Planetary aspects and their influences on your personality'
    }
  ]

  return (
    <div className="space-y-8">
      {/* System Selection */}
      <div className="cosmic-card-minimalist-modern">
        <h2 className="card-title mb-6">Choose Your Astrology System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {astrologySystems.map((system) => (
            <button
              key={system.id}
              onClick={() => setActiveSystem(system.id)}
              className={`p-6 text-left rounded-lg transition-all duration-300 ${
                activeSystem === system.id
                  ? 'bg-blue-500/20 border-2 border-blue-500/50'
                  : 'bg-white/5 hover:bg-white/10 border border-white/20'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-3xl">{system.icon}</div>
                <h3 className="text-xl font-semibold text-white">{system.name}</h3>
              </div>
              <p className="text-white/80 text-sm mb-3">{system.description}</p>
              <div className="flex flex-wrap gap-1">
                {system.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs">
                    {feature}
                  </span>
                ))}
                {system.features.length > 3 && (
                  <span className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs">
                    +{system.features.length - 3} more
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Selection */}
      <div className="cosmic-card-minimalist-modern">
        <h2 className="card-title mb-6">Choose Your Analysis Feature</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {astrologyFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`p-4 text-center rounded-lg transition-all duration-300 ${
                activeFeature === feature.id
                  ? 'bg-purple-500/20 border-2 border-purple-500/50'
                  : 'bg-white/5 hover:bg-white/10 border border-white/20'
              }`}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="font-semibold text-white text-sm">{feature.name}</div>
              <div className="text-white/60 text-xs mt-1">{feature.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Birth Data Form */}
      <div className="cosmic-card-minimalist-modern">
        <h2 className="card-title mb-6">Enter Your Birth Information</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Year</label>
              <input
                type="number"
                {...form.register('year', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1990"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Month</label>
              <input
                type="number"
                {...form.register('month', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Day</label>
              <input
                type="number"
                {...form.register('day', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Hour (24h)</label>
              <input
                type="number"
                {...form.register('hour', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Minute</label>
              <input
                type="number"
                {...form.register('minute', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Second</label>
              <input
                type="number"
                {...form.register('second', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Latitude</label>
              <input
                type="number"
                step="0.0001"
                {...form.register('latitude', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="6.9271"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Longitude</label>
              <input
                type="number"
                step="0.0001"
                {...form.register('longitude', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="79.8612"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Timezone (UTC Offset)</label>
              <input
                type="number"
                step="0.5"
                {...form.register('timezone', { valueAsNumber: true })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Country</label>
              <input
                {...form.register('country')}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sri Lanka"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">City</label>
            <input
              {...form.register('city')}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Colombo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Zodiac System</label>
            <select
              {...form.register('zodiacSystem')}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="western">Western Astrology</option>
              <option value="vedic">Vedic Astrology</option>
              <option value="chinese">Chinese Astrology</option>
              <option value="sri-lanka">Sri Lankan Astrology</option>
              <option value="hybrid">Hybrid System</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cosmic-btn-minimalist-modern w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Calculating...' : 'Get Advanced Astrology Analysis'}
          </button>

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </form>
      </div>

      {/* Results Display */}
      {astrologyResult && (
        <div className="space-y-6">
          {/* System Overview */}
          <div className="cosmic-card-minimalist-modern">
            <h3 className="card-title mb-4">Analysis Results - {astrologyResult.meta?.zodiacSystem || 'Western'} System</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Birth Data</h4>
                <p className="text-white/80 text-sm">
                  {astrologyResult.meta?.birthData?.year}/{astrologyResult.meta?.birthData?.month}/{astrologyResult.meta?.birthData?.day}
                </p>
                <p className="text-white/80 text-sm">
                  {astrologyResult.meta?.birthData?.city}, {astrologyResult.meta?.birthData?.country}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Engine</h4>
                <p className="text-white/80 text-sm">{astrologyResult.meta?.engine || 'Hybrid NASA Swiss'}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Analysis Date</h4>
                <p className="text-white/80 text-sm">
                  {new Date(astrologyResult.meta?.utcDateTime || Date.now()).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Western Astrology Results */}
          {astrologyResult.western && (
            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">Western Astrology Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Planetary Positions</h4>
                  <div className="space-y-2">
                    {astrologyResult.western.planets?.map((planet: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="text-white/80">{planet.name}</span>
                        <span className="text-white">{planet.sign} {planet.degree}°</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Houses</h4>
                  <div className="space-y-2">
                    {astrologyResult.western.houses?.slice(0, 6).map((house: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="text-white/80">House {house.number}</span>
                        <span className="text-white">{house.sign} {house.cusp}°</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vedic Astrology Results */}
          {astrologyResult.vedic && (
            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">Vedic Astrology Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Planetary Positions (Sidereal)</h4>
                  <div className="space-y-2">
                    {astrologyResult.vedic.planets?.map((planet: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="text-white/80">{planet.name}</span>
                        <span className="text-white">{planet.sign} {planet.degree}°</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Nakshatras</h4>
                  <div className="space-y-2">
                    {astrologyResult.vedic.nakshatras?.map((nakshatra: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                        <span className="text-white/80">{nakshatra.planet}</span>
                        <span className="text-white">{nakshatra.nakshatra} Pada {nakshatra.pada}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chinese Astrology Results */}
          {astrologyResult.chinese && (
            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">Chinese Astrology Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Animal Sign</h4>
                  <div className="text-2xl font-bold text-orange-400">{astrologyResult.chinese.animalSign}</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Element</h4>
                  <div className="text-2xl font-bold text-blue-400">{astrologyResult.chinese.element}</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Yin/Yang</h4>
                  <div className="text-2xl font-bold text-purple-400">{astrologyResult.chinese.yinYang}</div>
                </div>
              </div>
            </div>
          )}

          {/* Sri Lankan Astrology Results */}
          {astrologyResult.sriLankan && (
            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">Sri Lankan Astrology Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Cultural Insights</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/80">Lucky Color:</span>
                      <span className="text-white">{astrologyResult.sriLankan.culturalInsights?.luckyColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Lucky Stone:</span>
                      <span className="text-white">{astrologyResult.sriLankan.culturalInsights?.luckyStone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Lucky Flower:</span>
                      <span className="text-white">{astrologyResult.sriLankan.culturalInsights?.luckyFlower}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Guidance</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-white/80 text-sm">Health:</span>
                      <p className="text-white text-sm">{astrologyResult.sriLankan.culturalInsights?.healthAdvice}</p>
                    </div>
                    <div>
                      <span className="text-white/80 text-sm">Spiritual:</span>
                      <p className="text-white text-sm">{astrologyResult.sriLankan.culturalInsights?.spiritualGuidance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NASA Data */}
          {astrologyResult.nasa && (
            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">NASA Astronomical Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Lunar Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/80">Phase:</span>
                      <span className="text-white">{astrologyResult.nasa.moon?.phase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Illumination:</span>
                      <span className="text-white">{astrologyResult.nasa.moon?.illumination}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Age:</span>
                      <span className="text-white">{astrologyResult.nasa.moon?.ageDays} days</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Solar Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/80">Sunrise:</span>
                      <span className="text-white">{astrologyResult.nasa.sun?.rise}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Sunset:</span>
                      <span className="text-white">{astrologyResult.nasa.sun?.set}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Numerology Integration */}
          {astrologyResult.numerology && (
            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">Numerology Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Life Path</h4>
                  <div className="text-2xl font-bold text-blue-400">{astrologyResult.numerology.lifePath}</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Destiny</h4>
                  <div className="text-2xl font-bold text-purple-400">{astrologyResult.numerology.destiny}</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Soul Urge</h4>
                  <div className="text-2xl font-bold text-green-400">{astrologyResult.numerology.soulUrge}</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Personality</h4>
                  <div className="text-2xl font-bold text-yellow-400">{astrologyResult.numerology.personality}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Existing Data Display */}
      {existingData && !astrologyResult && (
        <div className="cosmic-card-minimalist-modern">
          <h3 className="card-title mb-4">Your Current Astrology Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Sun Sign</h4>
              <div className="text-2xl font-bold text-orange-400 mb-2">
                {existingData.data?.natal?.tropical?.planets?.sun?.sign || 'Aries'}
              </div>
              <p className="text-white/80 text-sm">
                {existingData.data?.natal?.tropical?.planets?.sun?.description || 'Your core personality and identity'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Moon Sign</h4>
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {existingData.data?.natal?.tropical?.planets?.moon?.sign || 'Cancer'}
              </div>
              <p className="text-white/80 text-sm">
                {existingData.data?.natal?.tropical?.planets?.moon?.description || 'Your emotional nature and instincts'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

