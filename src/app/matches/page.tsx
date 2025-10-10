/**
 * Matches Page
 * Compatibility matching and relationship insights
 */

'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/stores/app-store'
import { useMatches, useCompatibility } from '@/lib/hooks/use-api'
import Button from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Navigation from '@/components/organisms/Navigation'
import { trackFeatureUsage } from '@/lib/monitoring/analytics'

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState('discover')
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const user = useAppStore((state) => state.user)
  
  const { data: matches, isLoading } = useMatches(user?.id || '')
  const { data: compatibility } = useCompatibility(user?.id || '', selectedMatch?.id || '')

  useEffect(() => {
    if (user) {
      trackFeatureUsage('matches_page_view', user.id)
    }
  }, [user])

  const tabs = [
    { id: 'discover', label: 'Discover', icon: '🔍' },
    { id: 'matches', label: 'My Matches', icon: '💕' },
    { id: 'compatibility', label: 'Compatibility', icon: '⭐' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access matching features</h1>
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
              Cosmic Matches 💕
            </h1>
            <p className="text-muted-foreground">
              Find your perfect cosmic match based on astrological and numerological compatibility.
            </p>
          </div>

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
            {activeTab === 'discover' && (
              <DiscoverTab onSelectMatch={setSelectedMatch} />
            )}
            
            {activeTab === 'matches' && (
              <MatchesTab 
                matches={matches} 
                loading={isLoading}
                onSelectMatch={setSelectedMatch}
              />
            )}
            
            {activeTab === 'compatibility' && selectedMatch && (
              <CompatibilityTab 
                match={selectedMatch}
                compatibility={compatibility}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function DiscoverTab({ onSelectMatch }: any) {
  const [filters, setFilters] = useState({
    ageRange: [25, 35],
    location: 'any',
    interests: [] as string[]
  })

  const mockProfiles = [
    {
      id: '1',
      name: 'Sarah',
      age: 28,
      location: 'New York, NY',
      zodiac: 'Leo',
      lifePath: 5,
      compatibility: 95,
      image: 'https://via.placeholder.com/150',
      bio: 'Passionate about astrology and spiritual growth. Love hiking and stargazing.',
      interests: ['Astrology', 'Meditation', 'Hiking', 'Photography']
    },
    {
      id: '2',
      name: 'Michael',
      age: 32,
      location: 'Los Angeles, CA',
      zodiac: 'Gemini',
      lifePath: 3,
      compatibility: 87,
      image: 'https://via.placeholder.com/150',
      bio: 'Numerology enthusiast and dream interpreter. Enjoy creative writing and music.',
      interests: ['Numerology', 'Dreams', 'Writing', 'Music']
    },
    {
      id: '3',
      name: 'Emma',
      age: 26,
      location: 'Chicago, IL',
      zodiac: 'Libra',
      lifePath: 7,
      compatibility: 82,
      image: 'https://via.placeholder.com/150',
      bio: 'Tarot reader and energy healer. Love yoga and crystal collecting.',
      interests: ['Tarot', 'Healing', 'Yoga', 'Crystals']
    }
  ]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Discover Your Perfect Match</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
            </label>
            <input
              type="range"
              min="18"
              max="65"
              value={filters.ageRange[1]}
              onChange={(e) => setFilters({ ...filters, ageRange: [filters.ageRange[0], parseInt(e.target.value)] })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              <option value="any">Anywhere</option>
              <option value="nearby">Nearby</option>
              <option value="same-city">Same City</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {['Astrology', 'Numerology', 'Dreams', 'Meditation', 'Yoga', 'Tarot'].map((interest) => (
                <Badge
                  key={interest}
                  variant={filters.interests.includes(interest) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    const newInterests = filters.interests.includes(interest)
                      ? filters.interests.filter(i => i !== interest)
                      : [...filters.interests, interest]
                    setFilters({ ...filters, interests: newInterests })
                  }}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProfiles.map((profile) => (
          <div key={profile.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{profile.name}, {profile.age}</h4>
                <p className="text-sm text-muted-foreground">{profile.location}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline">{profile.zodiac}</Badge>
                  <Badge variant="secondary">Life Path {profile.lifePath}</Badge>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {profile.interests.map((interest) => (
                <Badge key={interest} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{profile.compatibility}%</div>
                <div className="text-xs text-muted-foreground">Compatibility</div>
              </div>
              <Button 
                size="sm"
                onClick={() => onSelectMatch(profile)}
              >
                View Match
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchesTab({ matches, loading, onSelectMatch }: any) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-64 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Your Matches</h3>
        <Badge variant="default">{matches?.length || 0} matches</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches?.map((match: any) => (
          <div key={match.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={match.image}
                alt={match.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{match.name}</h4>
                <p className="text-sm text-muted-foreground">{match.location}</p>
                <Badge variant="success">{match.compatibility}% Match</Badge>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{match.bio}</p>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Matched {new Date(match.matchedAt).toLocaleDateString()}
              </div>
              <Button 
                size="sm"
                onClick={() => onSelectMatch(match)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompatibilityTab({ match, compatibility }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={match.image}
            alt={match.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-2xl font-bold">{match.name}</h3>
            <p className="text-muted-foreground">{match.location}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">{match.zodiac}</Badge>
              <Badge variant="secondary">Life Path {match.lifePath}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{match.compatibility}%</div>
            <div className="text-sm text-muted-foreground">Overall Compatibility</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">92%</div>
            <div className="text-sm text-muted-foreground">Astrological Match</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">88%</div>
            <div className="text-sm text-muted-foreground">Numerological Match</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold mb-4">Astrological Compatibility</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Sun Signs</span>
              <Badge variant="success">Excellent</Badge>
            </div>
            <div className="flex justify-between">
              <span>Moon Signs</span>
              <Badge variant="success">Very Good</Badge>
            </div>
            <div className="flex justify-between">
              <span>Rising Signs</span>
              <Badge variant="warning">Good</Badge>
            </div>
            <div className="flex justify-between">
              <span>Venus Signs</span>
              <Badge variant="success">Excellent</Badge>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold mb-4">Numerological Compatibility</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Life Path Numbers</span>
              <Badge variant="success">Compatible</Badge>
            </div>
            <div className="flex justify-between">
              <span>Destiny Numbers</span>
              <Badge variant="success">Harmonious</Badge>
            </div>
            <div className="flex justify-between">
              <span>Soul Urge Numbers</span>
              <Badge variant="warning">Moderate</Badge>
            </div>
            <div className="flex justify-between">
              <span>Expression Numbers</span>
              <Badge variant="success">Compatible</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold mb-4">Compatibility Analysis</h4>
        <div className="prose max-w-none">
          <p className="text-muted-foreground mb-4">
            You and {match.name} share a strong cosmic connection. Your astrological charts show excellent compatibility, 
            with complementary elements that create a harmonious balance. Your numerological profiles suggest shared values 
            and life goals that will support a meaningful relationship.
          </p>
          <p className="text-muted-foreground">
            The combination of your {match.zodiac} energy with their {match.zodiac} nature creates a dynamic partnership 
            that encourages growth and mutual understanding. Your life path numbers indicate a shared journey toward 
            spiritual development and personal fulfillment.
          </p>
        </div>
      </div>
    </div>
  )
}
