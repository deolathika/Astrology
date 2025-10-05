/**
 * Astrology Page
 * Comprehensive astrology features with natal chart, transits, and daily insights
 */

'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/stores/app-store'
import { useNatalChart, useTransits, useAstrologyReadings } from '@/lib/hooks/use-api'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Navigation } from '@/components/organisms/Navigation'
import { trackFeatureUsage } from '@/lib/monitoring/analytics'

export default function AstrologyPage() {
  const [activeTab, setActiveTab] = useState('natal')
  const user = useAppStore((state) => state.user)
  const profile = useAppStore((state) => state.profile)
  
  const { data: natalChart, isLoading: natalLoading } = useNatalChart(user?.id || '')
  const { data: transits, isLoading: transitsLoading } = useTransits(user?.id || '')
  const { data: readings, isLoading: readingsLoading } = useAstrologyReadings(user?.id || '')

  useEffect(() => {
    if (user) {
      trackFeatureUsage('astrology_page_view', user.id)
    }
  }, [user])

  const tabs = [
    { id: 'natal', label: 'Natal Chart', icon: '🌟' },
    { id: 'transits', label: 'Transits', icon: '🔄' },
    { id: 'daily', label: 'Daily Insights', icon: '📅' },
    { id: 'compatibility', label: 'Compatibility', icon: '💕' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access astrology features</h1>
          <Button onClick={() => window.location.href = '/auth/signin'}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="lg:pl-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Astrology Center 🌟
            </h1>
            <p className="text-muted-foreground">
              Explore your cosmic blueprint and discover the secrets of the stars.
            </p>
          </div>

          {/* Profile Summary */}
          {profile && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <p className="text-muted-foreground">
                    Born {new Date(profile.birthDate).toLocaleDateString()} at {profile.birthTime} in {profile.placeLabel}
                  </p>
                  <Badge variant="default" className="mt-2">
                    {profile.systemPref} System
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">♈</div>
                  <div className="text-sm text-muted-foreground">Aries</div>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <span>{tab.icon}</span>
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'natal' && (
              <NatalChartTab 
                data={natalChart} 
                loading={natalLoading} 
                profile={profile}
              />
            )}
            
            {activeTab === 'transits' && (
              <TransitsTab 
                data={transits} 
                loading={transitsLoading} 
                profile={profile}
              />
            )}
            
            {activeTab === 'daily' && (
              <DailyInsightsTab 
                data={readings} 
                loading={readingsLoading} 
                profile={profile}
              />
            )}
            
            {activeTab === 'compatibility' && (
              <CompatibilityTab profile={profile} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function NatalChartTab({ data, loading, profile }: any) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="skeleton h-96 rounded-lg" />
        <div className="skeleton h-96 rounded-lg" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart Visualization */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Your Natal Chart</h3>
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🌌</div>
            <p className="text-muted-foreground">Interactive natal chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Chart Data */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Planetary Positions</h3>
        <div className="space-y-4">
          {[
            { planet: 'Sun', sign: 'Aries', degree: '15° 23\'' },
            { planet: 'Moon', sign: 'Cancer', degree: '8° 45\'' },
            { planet: 'Mercury', sign: 'Pisces', degree: '22° 10\'' },
            { planet: 'Venus', sign: 'Taurus', degree: '3° 55\'' },
            { planet: 'Mars', sign: 'Leo', degree: '18° 30\'' },
            { planet: 'Jupiter', sign: 'Sagittarius', degree: '12° 15\'' },
            { planet: 'Saturn', sign: 'Capricorn', degree: '25° 40\'' }
          ].map((planet) => (
            <div key={planet.planet} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                  {planet.planet[0]}
                </div>
                <span className="font-medium">{planet.planet}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{planet.sign}</div>
                <div className="text-sm text-muted-foreground">{planet.degree}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TransitsTab({ data, loading, profile }: any) {
  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Current Transits</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { planet: 'Jupiter', aspect: 'Trine', influence: 'Positive growth and expansion' },
          { planet: 'Saturn', aspect: 'Square', influence: 'Challenges and lessons' },
          { planet: 'Mars', aspect: 'Conjunction', influence: 'Energy and motivation' }
        ].map((transit) => (
          <div key={transit.planet} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{transit.planet}</h4>
              <Badge variant={transit.aspect === 'Trine' ? 'success' : 'warning'}>
                {transit.aspect}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{transit.influence}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DailyInsightsTab({ data, loading, profile }: any) {
  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Today's Horoscope</h3>
        <div className="prose max-w-none">
          <p className="text-muted-foreground">
            Today brings opportunities for growth and self-discovery. The stars align in your favor, 
            offering a chance to connect with your inner wisdom and make meaningful progress toward your goals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold mb-3">Lucky Numbers</h4>
          <div className="flex gap-2">
            {[7, 14, 21, 28, 35].map((num) => (
              <div key={num} className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold mb-3">Lucky Colors</h4>
          <div className="flex gap-2">
            {['Red', 'Gold', 'Orange'].map((color) => (
              <Badge key={color} variant="outline">{color}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CompatibilityTab({ profile }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Find Your Cosmic Match</h3>
        <p className="text-muted-foreground mb-6">
          Discover compatibility with other users based on astrological analysis.
        </p>
        <Button>Find Matches</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Sarah', compatibility: 95, sign: 'Leo' },
          { name: 'Michael', compatibility: 87, sign: 'Gemini' },
          { name: 'Emma', compatibility: 82, sign: 'Libra' }
        ].map((match) => (
          <div key={match.name} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{match.name}</h4>
              <Badge variant="success">{match.compatibility}%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{match.sign}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
