/**
 * Numerology Page
 * Comprehensive numerology features with life path, destiny, and daily numbers
 */

'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/stores/app-store'
import { useNumerologyCore, useNumerologyReadings } from '@/lib/hooks/use-api'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Navigation } from '@/components/organisms/Navigation'
import { trackFeatureUsage } from '@/lib/monitoring/analytics'

export default function NumerologyPage() {
  const [activeTab, setActiveTab] = useState('core')
  const user = useAppStore((state) => state.user)
  const profile = useAppStore((state) => state.profile)
  
  const { data: coreNumbers, isLoading: coreLoading } = useNumerologyCore(user?.id || '')
  const { data: readings, isLoading: readingsLoading } = useNumerologyReadings(user?.id || '')

  useEffect(() => {
    if (user) {
      trackFeatureUsage('numerology_page_view', user.id)
    }
  }, [user])

  const tabs = [
    { id: 'core', label: 'Core Numbers', icon: '🔢' },
    { id: 'life-path', label: 'Life Path', icon: '🛤️' },
    { id: 'destiny', label: 'Destiny', icon: '⭐' },
    { id: 'daily', label: 'Daily Numbers', icon: '📅' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access numerology features</h1>
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
              Numerology Center 🔢
            </h1>
            <p className="text-muted-foreground">
              Discover the hidden meanings in your numbers and unlock your life's purpose.
            </p>
          </div>

          {/* Profile Summary */}
          {profile && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <p className="text-muted-foreground">
                    Born {new Date(profile.birthDate).toLocaleDateString()}
                  </p>
                  <Badge variant="default" className="mt-2">
                    {profile.systemPref} System
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">9</div>
                  <div className="text-sm text-muted-foreground">Life Path</div>
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
            {activeTab === 'core' && (
              <CoreNumbersTab 
                data={coreNumbers} 
                loading={coreLoading} 
                profile={profile}
              />
            )}
            
            {activeTab === 'life-path' && (
              <LifePathTab 
                data={coreNumbers} 
                loading={coreLoading} 
                profile={profile}
              />
            )}
            
            {activeTab === 'destiny' && (
              <DestinyTab 
                data={coreNumbers} 
                loading={coreLoading} 
                profile={profile}
              />
            )}
            
            {activeTab === 'daily' && (
              <DailyNumbersTab 
                data={readings} 
                loading={readingsLoading} 
                profile={profile}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function CoreNumbersTab({ data, loading, profile }: any) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-48 rounded-lg" />
        ))}
      </div>
    )
  }

  const coreNumbers = [
    { name: 'Life Path', number: 9, description: 'The path you are meant to walk in this lifetime' },
    { name: 'Destiny', number: 5, description: 'Your soul\'s purpose and ultimate goal' },
    { name: 'Soul Urge', number: 3, description: 'Your inner desires and motivations' },
    { name: 'Personality', number: 6, description: 'How others perceive you' },
    { name: 'Birthday', number: 7, description: 'Your natural talents and abilities' },
    { name: 'Expression', number: 1, description: 'How you express yourself to the world' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coreNumbers.map((number) => (
        <div key={number.name} className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {number.number}
          </div>
          <h3 className="text-lg font-semibold mb-2">{number.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{number.description}</p>
          <Button variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      ))}
    </div>
  )
}

function LifePathTab({ data, loading, profile }: any) {
  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold">
            9
          </div>
          <div>
            <h3 className="text-2xl font-bold">Life Path Number 9</h3>
            <p className="text-muted-foreground">The Humanitarian</p>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-muted-foreground mb-4">
            You are a natural humanitarian with a deep desire to help others and make the world a better place. 
            Your life path is about service, compassion, and spiritual growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Strengths</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Compassionate and empathetic</li>
                <li>• Natural leader and teacher</li>
                <li>• Creative and artistic</li>
                <li>• Wise and intuitive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Challenges</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Can be overly idealistic</li>
                <li>• May struggle with boundaries</li>
                <li>• Tendency to be self-sacrificing</li>
                <li>• Need to balance giving and receiving</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold mb-4">Career Paths</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Teacher', 'Healer', 'Artist', 'Counselor', 'Writer', 'Activist', 'Therapist', 'Social Worker'].map((career) => (
            <Badge key={career} variant="outline" className="text-center p-2">
              {career}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

function DestinyTab({ data, loading, profile }: any) {
  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold">
          5
        </div>
        <div>
          <h3 className="text-2xl font-bold">Destiny Number 5</h3>
          <p className="text-muted-foreground">The Adventurer</p>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <p className="text-muted-foreground mb-4">
          Your destiny is to embrace change, seek freedom, and experience life to the fullest. 
          You are meant to be a bridge between different worlds and cultures.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Life Purpose</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Embrace change and transformation</li>
              <li>• Seek freedom and independence</li>
              <li>• Experience diverse cultures</li>
              <li>• Communicate and connect with others</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Soul Mission</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Break down barriers and limitations</li>
              <li>• Inspire others to seek freedom</li>
              <li>• Share knowledge and wisdom</li>
              <li>• Create positive change in the world</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function DailyNumbersTab({ data, loading, profile }: any) {
  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Today's Numbers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
              7
            </div>
            <h4 className="font-semibold">Personal Day</h4>
            <p className="text-sm text-muted-foreground">Spiritual growth and introspection</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
              3
            </div>
            <h4 className="font-semibold">Universal Day</h4>
            <p className="text-sm text-muted-foreground">Creativity and self-expression</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
              1
            </div>
            <h4 className="font-semibold">Lucky Number</h4>
            <p className="text-sm text-muted-foreground">New beginnings and leadership</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold mb-4">Numerology Forecast</h4>
        <p className="text-muted-foreground">
          Today's energy is perfect for spiritual reflection and creative projects. 
          The number 7 brings wisdom and intuition, while 3 encourages self-expression. 
          This is an ideal day for meditation, writing, or artistic pursuits.
        </p>
      </div>
    </div>
  )
}