'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

interface ComprehensivePremiumDashboardProps {
  user: any
}

export default function ComprehensivePremiumDashboard({ user }: ComprehensivePremiumDashboardProps) {
  const [dreamInput, setDreamInput] = useState('')
  const [compatibilityData, setCompatibilityData] = useState<any>(null)
  const [dreamAnalysis, setDreamAnalysis] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  // Fetch all premium data
  const { data: insightsData, isLoading: insightsLoading } = useQuery({
    queryKey: ['premium-insights', user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/insights?userId=${user.id}`)
      if (!response.ok) throw new Error('Failed to fetch insights')
      return response.json()
    },
    enabled: !!user?.id
  })

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

  const { data: premiumFeatures } = useQuery({
    queryKey: ['premium-features', user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/premium/features?userId=${user.id}`)
      if (!response.ok) throw new Error('Failed to fetch premium features')
      return response.json()
    },
    enabled: !!user?.id
  })

  const handleDreamAnalysis = async () => {
    if (!dreamInput.trim()) return

    try {
      const response = await fetch('/api/premium/dream-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          dreamDescription: dreamInput,
          dreamDate: new Date().toISOString().split('T')[0],
          emotions: ['curious', 'hopeful'],
          symbols: ['light', 'path']
        })
      })

      const data = await response.json()
      if (data.success) {
        setDreamAnalysis(data.data)
      }
    } catch (error) {
      console.error('Dream analysis error:', error)
    }
  }

  const handleCompatibilityCheck = async () => {
    try {
      const response = await fetch('/api/premium/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          partnerName: 'Sample Partner',
          partnerBirthDate: '1992-05-15',
          partnerBirthTime: '14:30',
          relationshipType: 'romantic'
        })
      })

      const data = await response.json()
      if (data.success) {
        setCompatibilityData(data.data)
      }
    } catch (error) {
      console.error('Compatibility check error:', error)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'insights', label: 'Daily Insights', icon: '🌟' },
    { id: 'astrology', label: 'Astrology', icon: '🔮' },
    { id: 'numerology', label: 'Numerology', icon: '🔢' },
    { id: 'dreams', label: 'Dream Analysis', icon: '💭' },
    { id: 'compatibility', label: 'Compatibility', icon: '❤️' },
    { id: 'calendar', label: 'Calendar', icon: '🗓️' },
    { id: 'consultations', label: 'Consultations', icon: '🧑‍🏫' }
  ]

  return (
    <div className="space-y-8">
      {/* Premium Status Header */}
      <div className="cosmic-card-minimalist-modern">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Premium Cosmic Dashboard</h2>
            <p className="text-white/80">Unlimited access to all cosmic features and insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">Premium Active</span>
          </div>
        </div>
        
        {premiumFeatures && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <div className="text-sm text-white/80">Daily Insights</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-white/80">Astrology</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-green-400">∞</div>
              <div className="text-sm text-white/80">Dream Analysis</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">∞</div>
              <div className="text-sm text-white/80">Compatibility</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="cosmic-card-minimalist-modern">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">Today's Cosmic Energy</h3>
              <div className="text-center">
                <div className="text-4xl mb-2">🌟</div>
                <div className="text-lg font-semibold text-white mb-2">High Vibrational Day</div>
                <p className="text-white/80 text-sm">The cosmic energies are strongly supporting your spiritual growth and personal transformation.</p>
              </div>
            </div>

            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">Lucky Numbers</h3>
              <div className="text-center">
                <div className="text-4xl mb-2">🔢</div>
                <div className="text-2xl font-bold text-green-400 mb-2">7, 14, 21</div>
                <p className="text-white/80 text-sm">These numbers carry special cosmic significance today.</p>
              </div>
            </div>

            <div className="cosmic-card-minimalist-modern">
              <h3 className="card-title mb-4">Auspicious Time</h3>
              <div className="text-center">
                <div className="text-4xl mb-2">⏰</div>
                <div className="text-lg font-semibold text-white mb-2">2:00 PM - 4:00 PM</div>
                <p className="text-white/80 text-sm">Best time for important decisions and spiritual practices.</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="cosmic-card-minimalist-modern">
            <h3 className="card-title mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="text-2xl">🔮</div>
                <div>
                  <div className="font-semibold text-white">Advanced Astrology Analysis</div>
                  <div className="text-sm text-white/60">Completed 2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="text-2xl">💭</div>
                <div>
                  <div className="font-semibold text-white">Dream Analysis</div>
                  <div className="text-sm text-white/60">Completed 1 day ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="text-2xl">❤️</div>
                <div>
                  <div className="font-semibold text-white">Compatibility Report</div>
                  <div className="text-sm text-white/60">Completed 3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
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
        </div>
      )}

      {/* Astrology Tab */}
      {activeTab === 'astrology' && (
        <div className="space-y-6">
          <div className="cosmic-card-minimalist-modern">
            <h3 className="card-title mb-4">Advanced Astrology Analysis</h3>
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
        </div>
      )}

      {/* Numerology Tab */}
      {activeTab === 'numerology' && (
        <div className="space-y-6">
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
        </div>
      )}

      {/* Dream Analysis Tab */}
      {activeTab === 'dreams' && (
        <div className="space-y-6">
          <div className="cosmic-card-minimalist-modern">
            <h3 className="card-title mb-4">AI Dream Analysis</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Describe your dream:
                </label>
                <textarea
                  value={dreamInput}
                  onChange={(e) => setDreamInput(e.target.value)}
                  placeholder="I was flying over a beautiful landscape with golden light everywhere..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
              <button
                onClick={handleDreamAnalysis}
                disabled={!dreamInput.trim()}
                className="cosmic-btn-minimalist-modern disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze My Dream
              </button>
            </div>

            {dreamAnalysis && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Dream Analysis Results</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-blue-400 font-medium">Theme: </span>
                    <span className="text-white/80">{dreamAnalysis.summary.theme}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-medium">Emotional Tone: </span>
                    <span className="text-white/80">{dreamAnalysis.summary.emotionalTone}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Significance: </span>
                    <span className="text-white/80">{dreamAnalysis.summary.significance}</span>
                  </div>
                  <div>
                    <span className="text-yellow-400 font-medium">Primary Symbols: </span>
                    <span className="text-white/80">{dreamAnalysis.symbols.primary.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compatibility Tab */}
      {activeTab === 'compatibility' && (
        <div className="space-y-6">
          <div className="cosmic-card-minimalist-modern">
            <h3 className="card-title mb-4">Advanced Compatibility Report</h3>
            <div className="space-y-4">
              <p className="text-white/80">
                Get a detailed compatibility analysis with someone special in your life.
              </p>
              <button
                onClick={handleCompatibilityCheck}
                className="cosmic-btn-minimalist-modern"
              >
                Generate Compatibility Report
              </button>
            </div>

            {compatibilityData && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Compatibility Overview</h4>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-green-400">
                      {compatibilityData.overview.compatibilityScore}%
                    </div>
                    <div>
                      <div className="text-white/80">Overall Compatibility</div>
                      <div className="text-sm text-white/60">
                        {compatibilityData.overview.relationshipType} relationship
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">Astrological Compatibility</h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-orange-400">Sun Signs: </span>
                        <span className="text-white/80">
                          {compatibilityData.astrological.sunSignCompatibility.userSign} & {compatibilityData.astrological.sunSignCompatibility.partnerSign}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-400">Moon Signs: </span>
                        <span className="text-white/80">
                          {compatibilityData.astrological.moonSignCompatibility.userSign} & {compatibilityData.astrological.moonSignCompatibility.partnerSign}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">Emotional Connection</h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-green-400">Communication: </span>
                        <span className="text-white/80">{compatibilityData.emotional.communication.score}%</span>
                      </div>
                      <div>
                        <span className="text-purple-400">Emotional Bond: </span>
                        <span className="text-white/80">{compatibilityData.emotional.emotionalBond.score}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <h5 className="font-semibold text-white mb-2">Relationship Strengths</h5>
                  <div className="flex flex-wrap gap-2">
                    {compatibilityData.recommendations.strengths.map((strength: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="cosmic-card-minimalist-modern">
            <h3 className="card-title mb-4">Personalized Cosmic Calendar</h3>
            <div className="space-y-4">
              <p className="text-white/80">
                Your personalized calendar with cosmic insights and auspicious dates.
              </p>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`p-2 text-center rounded-lg text-sm ${
                      day % 7 === 0 ? 'bg-blue-500/20 text-blue-300' :
                      day % 5 === 0 ? 'bg-green-500/20 text-green-300' :
                      'bg-white/10 text-white/80'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500/20 rounded"></div>
                  <span className="text-white/80">Auspicious Days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500/20 rounded"></div>
                  <span className="text-white/80">Lucky Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consultations Tab */}
      {activeTab === 'consultations' && (
        <div className="space-y-6">
          <div className="cosmic-card-minimalist-modern">
            <h3 className="card-title mb-4">Book Expert Consultation</h3>
            <div className="space-y-4">
              <p className="text-white/80">
                Schedule a one-on-one session with our certified cosmic experts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h5 className="font-semibold text-white mb-2">Available Experts</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/80">Dr. Sarah Chen - Astrology</span>
                      <span className="text-green-400">Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Master Raj - Numerology</span>
                      <span className="text-green-400">Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Luna Williams - Dream Analysis</span>
                      <span className="text-yellow-400">Limited</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h5 className="font-semibold text-white mb-2">Session Types</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/80">30 min - $50</span>
                      <span className="text-white/60">Quick guidance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">60 min - $90</span>
                      <span className="text-white/60">Deep analysis</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">90 min - $120</span>
                      <span className="text-white/60">Comprehensive session</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="cosmic-btn-minimalist-modern w-full">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
