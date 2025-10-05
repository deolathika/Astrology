'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import PremiumInteractiveFeatures from './PremiumInteractiveFeatures'

interface PremiumFeaturesDashboardProps {
  user: any
}

export default function PremiumFeaturesDashboard({ user }: PremiumFeaturesDashboardProps) {
  const [premiumFeatures, setPremiumFeatures] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Fetch premium insights (unlimited)
  const { data: insightsData, isLoading: insightsLoading } = useQuery({
    queryKey: ['premium-insights', user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/insights?userId=${user.id}`)
      if (!response.ok) throw new Error('Failed to fetch insights')
      return response.json()
    },
    enabled: !!user?.id
  })

  // Fetch advanced numerology
  const { data: numerologyData, isLoading: numerologyLoading } = useQuery({
    queryKey: ['premium-numerology', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/numerology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          fullName: user.name || 'User',
          birthDate: user.profile?.birthDate || '1990-01-01'
        })
      })
      if (!response.ok) throw new Error('Failed to fetch numerology')
      return response.json()
    },
    enabled: !!user?.id
  })

  // Fetch advanced zodiac
  const { data: zodiacData, isLoading: zodiacLoading } = useQuery({
    queryKey: ['premium-zodiac', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/zodiac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          birthDate: user.profile?.birthDate || '1990-01-01',
          birthTime: user.profile?.birthTime || '12:00',
          latitude: user.profile?.lat || 0,
          longitude: user.profile?.lng || 0
        })
      })
      if (!response.ok) throw new Error('Failed to fetch zodiac')
      return response.json()
    },
    enabled: !!user?.id
  })

  // Fetch premium astrology data
  const { data: astrologyData, isLoading: astrologyLoading } = useQuery({
    queryKey: ['premium-astrology', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/astrology/premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: new Date(user.profile?.birthDate || '1990-01-01').getFullYear(),
          month: new Date(user.profile?.birthDate || '1990-01-01').getMonth() + 1,
          day: new Date(user.profile?.birthDate || '1990-01-01').getDate(),
          hour: parseInt(user.profile?.birthTime?.split(':')[0] || '12'),
          minute: parseInt(user.profile?.birthTime?.split(':')[1] || '0'),
          second: 0,
          latitude: user.profile?.lat || 0,
          longitude: user.profile?.lng || 0,
          timezone: 0,
          country: 'USA',
          city: user.profile?.placeLabel || 'New York',
          zodiacSystem: 'hybrid'
        })
      })
      if (!response.ok) throw new Error('Failed to fetch astrology')
      return response.json()
    },
    enabled: !!user?.id && user.role === 'premium'
  })

  return (
    <div className="space-y-8">
      {/* Premium Status */}
      <div className="cosmic-card-minimalist-modern">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title">Premium Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">Active Premium</span>
          </div>
        </div>
        <p className="card-text">
          You have unlimited access to all cosmic features and advanced insights.
        </p>
      </div>

      {/* Unlimited Daily Insights */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Unlimited Daily Insights</h3>
        {insightsLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insightsData?.data?.map((insight: any, index: number) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">{insight.icon}</div>
                <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
                <p className="text-sm text-white/80">{insight.description}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-center">
          <span className="text-green-400 font-semibold">Unlimited Access</span>
        </div>
      </div>

      {/* Advanced Numerology */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Advanced Numerology Analysis</h3>
        {numerologyLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </div>
        ) : numerologyData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Life Path</h4>
              <div className="text-3xl font-bold text-blue-400 mb-2">{numerologyData.data.lifePath.number}</div>
              <p className="text-sm text-white/80">{numerologyData.data.lifePath.meaning}</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Destiny</h4>
              <div className="text-3xl font-bold text-purple-400 mb-2">{numerologyData.data.destiny.number}</div>
              <p className="text-sm text-white/80">{numerologyData.data.destiny.meaning}</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Soul Urge</h4>
              <div className="text-3xl font-bold text-green-400 mb-2">{numerologyData.data.soulUrge.number}</div>
              <p className="text-sm text-white/80">{numerologyData.data.soulUrge.meaning}</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Personality</h4>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{numerologyData.data.personality.number}</div>
              <p className="text-sm text-white/80">{numerologyData.data.personality.meaning}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <button className="cosmic-btn-minimalist-modern">
              Calculate Advanced Numerology
            </button>
          </div>
        )}
      </div>

      {/* Advanced Zodiac */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Advanced Zodiac Analysis</h3>
        {zodiacLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </div>
        ) : zodiacData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Sun Sign</h4>
              <div className="text-2xl font-bold text-orange-400 mb-2">{zodiacData.data.sunSign.sign}</div>
              <p className="text-sm text-white/80 mb-2">{zodiacData.data.sunSign.description}</p>
              <div className="flex flex-wrap gap-2">
                {zodiacData.data.sunSign.traits.map((trait: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Moon Sign</h4>
              <div className="text-2xl font-bold text-blue-400 mb-2">{zodiacData.data.moonSign.sign}</div>
              <p className="text-sm text-white/80 mb-2">{zodiacData.data.moonSign.description}</p>
              <div className="flex flex-wrap gap-2">
                {zodiacData.data.moonSign.traits.map((trait: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Ascendant</h4>
              <div className="text-2xl font-bold text-purple-400 mb-2">{zodiacData.data.ascendant.sign}</div>
              <p className="text-sm text-white/80 mb-2">{zodiacData.data.ascendant.description}</p>
              <div className="flex flex-wrap gap-2">
                {zodiacData.data.ascendant.traits.map((trait: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Compatibility</h4>
              <div className="text-sm text-white/80 mb-2">Compatible Signs:</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {zodiacData.data.compatibility.compatibleSigns.map((sign: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                    {sign}
                  </span>
                ))}
              </div>
              <div className="text-sm text-white/80 mb-2">Challenging Signs:</div>
              <div className="flex flex-wrap gap-2">
                {zodiacData.data.compatibility.challengingSigns.map((sign: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
                    {sign}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <button className="cosmic-btn-minimalist-modern">
              Get Advanced Zodiac Reading
            </button>
          </div>
        )}
      </div>

      {/* Premium Astrology */}
      {user.role === 'premium' && (
        <div className="cosmic-card-minimalist-modern">
          <h3 className="card-title mb-4">Premium Astrology Analysis</h3>
          {astrologyLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            </div>
          ) : astrologyData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Western Astrology</h4>
                  <p className="text-sm text-white/80">Complete natal chart with planetary positions</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Vedic Astrology</h4>
                  <p className="text-sm text-white/80">Traditional Indian astrology with nakshatras</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Chinese Astrology</h4>
                  <p className="text-sm text-white/80">Animal signs and elemental analysis</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Sri Lankan Astrology</h4>
                  <p className="text-sm text-white/80">Cultural insights and traditional practices</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <button className="cosmic-btn-minimalist-modern">
                Get Premium Astrology Analysis
              </button>
            </div>
          )}
        </div>
      )}

      {/* AI Dream Analysis */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">AI Dream Analysis</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">💭</div>
          <p className="text-white/80 mb-4">Advanced AI-powered dream interpretation and subconscious insights</p>
          <button className="cosmic-btn-minimalist-modern">
            Analyze My Dreams
          </button>
        </div>
      </div>

      {/* Compatibility Reports */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Advanced Compatibility Reports</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">❤️</div>
          <p className="text-white/80 mb-4">Detailed relationship and compatibility analysis for deeper connections</p>
          <button className="cosmic-btn-minimalist-modern">
            Check Compatibility
          </button>
        </div>
      </div>

      {/* Personalized Calendar */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Personalized Cosmic Calendar</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🗓️</div>
          <p className="text-white/80 mb-4">Custom cosmic calendar with personalized insights and auspicious dates</p>
          <button className="cosmic-btn-minimalist-modern">
            View My Calendar
          </button>
        </div>
      </div>

      {/* Expert Consultations */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Expert Consultations</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🧑‍🏫</div>
          <p className="text-white/80 mb-4">One-on-one sessions with certified cosmic experts for personalized guidance</p>
          <button className="cosmic-btn-minimalist-modern">
            Book Consultation
          </button>
        </div>
      </div>

      {/* Interactive Premium Features */}
      <PremiumInteractiveFeatures user={user} />

      {/* Premium Benefits */}
      <div className="cosmic-card-minimalist-modern">
        <h3 className="card-title mb-4">Premium Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Unlimited Features</h4>
            <div className="space-y-2 text-sm text-white/80">
              <div>• Unlimited daily insights</div>
              <div>• Advanced astrology charts</div>
              <div>• AI-powered dream analysis</div>
              <div>• Expert consultations</div>
              <div>• Detailed compatibility reports</div>
              <div>• Personalized cosmic calendar</div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Premium Support</h4>
            <div className="space-y-2 text-sm text-white/80">
              <div>• Priority support</div>
              <div>• Exclusive content</div>
              <div>• Advanced calculations</div>
              <div>• Data export</div>
              <div>• Expert guidance</div>
              <div>• No daily limits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
