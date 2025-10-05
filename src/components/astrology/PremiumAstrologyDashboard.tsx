'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

interface PremiumAstrologyDashboardProps {
  user: any
  profileId: string
}

export default function PremiumAstrologyDashboard({ user, profileId }: PremiumAstrologyDashboardProps) {
  const [selectedSystem, setSelectedSystem] = useState('western')
  const [selectedFeature, setSelectedFeature] = useState('natal')

  // Fetch comprehensive astrology data
  const { data: astrologyData, isLoading, error } = useQuery({
    queryKey: ['premium-astrology', profileId],
    queryFn: async () => {
      const response = await fetch(`/api/astrology/premium?profileId=${profileId}&features=all`)
      if (!response.ok) throw new Error('Failed to fetch astrology data')
      return response.json()
    },
    enabled: !!profileId
  })

  // Fetch Sri Lankan astrology data
  const { data: sriLankanData } = useQuery({
    queryKey: ['sri-lankan-astrology', profileId],
    queryFn: async () => {
      const response = await fetch(`/api/astrology/sri-lanka?profileId=${profileId}`)
      if (!response.ok) throw new Error('Failed to fetch Sri Lankan astrology data')
      return response.json()
    },
    enabled: !!profileId
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading astrology data</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen cosmic-minimalist-modern-bg">
      {/* Navigation */}
      <nav className="cosmic-nav-minimalist-modern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="logo">Premium Astrology Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Premium User: {user.name || user.email}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* System Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Choose Astrology System</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'western', name: 'Western', icon: '♈' },
                { id: 'vedic', name: 'Vedic', icon: '🕉️' },
                { id: 'chinese', name: 'Chinese', icon: '🐉' },
                { id: 'sriLankan', name: 'Sri Lankan', icon: '🇱🇰' }
              ].map((system) => (
                <button
                  key={system.id}
                  onClick={() => setSelectedSystem(system.id)}
                  className={`cosmic-card-minimalist-modern p-4 text-center transition-all duration-300 ${
                    selectedSystem === system.id ? 'border-blue-500 bg-blue-500/20' : ''
                  }`}
                >
                  <div className="text-2xl mb-2">{system.icon}</div>
                  <div className="font-semibold text-white">{system.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Feature Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Choose Feature</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'natal', name: 'Natal Chart', icon: '🔮' },
                { id: 'transits', name: 'Transits', icon: '🌙' },
                { id: 'compatibility', name: 'Compatibility', icon: '💕' },
                { id: 'progressions', name: 'Progressions', icon: '📈' }
              ].map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  className={`cosmic-card-minimalist-modern p-4 text-center transition-all duration-300 ${
                    selectedFeature === feature.id ? 'border-blue-500 bg-blue-500/20' : ''
                  }`}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="font-semibold text-white">{feature.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Astrology Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Western Astrology */}
            {selectedSystem === 'western' && astrologyData?.data?.western && (
              <div className="cosmic-card-minimalist-modern">
                <h3 className="card-title mb-4">Western Astrology</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Sun Sign</h4>
                    <p className="text-white/80">{astrologyData.data.western.sunSign}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Moon Sign</h4>
                    <p className="text-white/80">{astrologyData.data.western.moonSign}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Ascendant</h4>
                    <p className="text-white/80">{astrologyData.data.western.ascendant}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Elements</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-white/80">Fire: {astrologyData.data.western.elements?.fire || 0}</div>
                      <div className="text-sm text-white/80">Earth: {astrologyData.data.western.elements?.earth || 0}</div>
                      <div className="text-sm text-white/80">Air: {astrologyData.data.western.elements?.air || 0}</div>
                      <div className="text-sm text-white/80">Water: {astrologyData.data.western.elements?.water || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vedic Astrology */}
            {selectedSystem === 'vedic' && astrologyData?.data?.vedic && (
              <div className="cosmic-card-minimalist-modern">
                <h3 className="card-title mb-4">Vedic Astrology</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Rashi</h4>
                    <p className="text-white/80">{astrologyData.data.vedic.rashi}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Nakshatra</h4>
                    <p className="text-white/80">{astrologyData.data.vedic.nakshatra}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Pada</h4>
                    <p className="text-white/80">{astrologyData.data.vedic.pada}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Dasha</h4>
                    <div className="space-y-2">
                      {astrologyData.data.vedic.dasha?.map((dasha: any, index: number) => (
                        <div key={index} className="text-sm text-white/80">
                          {dasha.planet}: {dasha.startDate} - {dasha.endDate}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chinese Astrology */}
            {selectedSystem === 'chinese' && astrologyData?.data?.chinese && (
              <div className="cosmic-card-minimalist-modern">
                <h3 className="card-title mb-4">Chinese Astrology</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Animal Sign</h4>
                    <p className="text-white/80">{astrologyData.data.chinese.animalSign}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Element</h4>
                    <p className="text-white/80">{astrologyData.data.chinese.element}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Yin/Yang</h4>
                    <p className="text-white/80">{astrologyData.data.chinese.yinYang}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Lucky Numbers</h4>
                    <p className="text-white/80">{astrologyData.data.chinese.luckyNumbers?.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Lucky Colors</h4>
                    <p className="text-white/80">{astrologyData.data.chinese.luckyColors?.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sri Lankan Astrology */}
            {selectedSystem === 'sriLankan' && sriLankanData?.data?.sinhala && (
              <div className="cosmic-card-minimalist-modern">
                <h3 className="card-title mb-4">Sri Lankan Astrology</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Sinhala Sign</h4>
                    <p className="text-white/80">{sriLankanData.data.sinhala.sinhalaSign}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Sinhala Name</h4>
                    <p className="text-white/80">{sriLankanData.data.sinhala.sinhalaName}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Lucky Stone</h4>
                    <p className="text-white/80">{sriLankanData.data.sinhala.luckyStone}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Lucky Color</h4>
                    <p className="text-white/80">{sriLankanData.data.sinhala.luckyColor}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Health Advice</h4>
                    <p className="text-white/80 text-sm">{sriLankanData.data.sinhala.healthAdvice}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Spiritual Guidance</h4>
                    <p className="text-white/80 text-sm">{sriLankanData.data.sinhala.spiritualGuidance}</p>
                  </div>
                </div>
              </div>
            )}

            {/* NASA Data */}
            {astrologyData?.data?.nasa && (
              <div className="cosmic-card-minimalist-modern">
                <h3 className="card-title mb-4">NASA Astronomical Data</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Lunar Phase</h4>
                    <p className="text-white/80">{astrologyData.data.nasa.lunar?.phase}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Illumination</h4>
                    <p className="text-white/80">{astrologyData.data.nasa.lunar?.illumination}%</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Sunrise</h4>
                    <p className="text-white/80">{new Date(astrologyData.data.nasa.solar?.sunrise).toLocaleTimeString()}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Sunset</h4>
                    <p className="text-white/80">{new Date(astrologyData.data.nasa.solar?.sunset).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Premium Features */}
            {astrologyData?.data?.premium && (
              <div className="cosmic-card-minimalist-modern">
                <h3 className="card-title mb-4">Premium Features</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Detailed Houses</h4>
                    <p className="text-white/80 text-sm">
                      {astrologyData.data.premium.detailedHouses?.length || 0} houses analyzed
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Planetary Dignities</h4>
                    <p className="text-white/80 text-sm">
                      {astrologyData.data.premium.planetaryDignities?.length || 0} planets analyzed
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Midpoints</h4>
                    <p className="text-white/80 text-sm">
                      {astrologyData.data.premium.midpoints?.length || 0} midpoints calculated
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Progressions</h4>
                    <p className="text-white/80 text-sm">
                      {astrologyData.data.premium.progressions?.length || 0} progressions calculated
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
