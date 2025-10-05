'use client'

import React, { useState } from 'react'

interface PremiumInteractiveFeaturesProps {
  user: any
}

export default function PremiumInteractiveFeatures({ user }: PremiumInteractiveFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [dreamInput, setDreamInput] = useState('')
  const [compatibilityData, setCompatibilityData] = useState<any>(null)
  const [dreamAnalysis, setDreamAnalysis] = useState<any>(null)

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

  return (
    <div className="space-y-8">
      {/* Interactive Dream Analysis */}
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

      {/* Interactive Compatibility Check */}
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

      {/* Premium Calendar */}
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

      {/* Expert Consultation Booking */}
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
  )
}
