'use client'

import React, { useState } from 'react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/ui/LanguageSelector'

interface UserProfile {
  name: string
  email: string
  zodiacSign: string
  lifePathNumber: number
  birthDate: string
  birthTime: string
  birthLocation: string
  interests: string[]
  readingHistory: any[]
  preferences: {
    theme: string
    notifications: boolean
    privacy: string
    language: string
  }
}

export default function ProfilePage() {
  const { personalInfo, zodiacInfo, isPersonalized, updatePersonalInfo } = usePersonalInfo()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [infoContent, setInfoContent] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const userProfile: UserProfile = {
    name: personalInfo?.name || 'Guest User',
    email: 'user@dailysecrets.app',
    zodiacSign: zodiacInfo?.name || 'Not Set',
    lifePathNumber: 7,
    birthDate: personalInfo?.birthDate || 'Not Set',
    birthTime: personalInfo?.birthTime || 'Not Set',
    birthLocation: personalInfo?.birthLocation || 'Not Set',
    interests: ['Astrology', 'Meditation', 'Crystals', 'Dream Analysis'],
    readingHistory: [
      { date: '2024-01-15', type: 'Daily Horoscope', rating: 5 },
      { date: '2024-01-14', type: 'Dream Analysis', rating: 4 },
      { date: '2024-01-13', type: 'Compatibility Reading', rating: 5 },
      { date: '2024-01-12', type: 'Numerology Reading', rating: 4 },
      { date: '2024-01-11', type: 'Astrology Reading', rating: 5 }
    ],
    preferences: {
      theme: 'Cosmic',
      notifications: true,
      privacy: 'Public',
      language: 'English'
    }
  }

  const [profile, setProfile] = useState(userProfile)

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  const showInfo = (content: string) => {
    setInfoContent(content)
    setShowInfoModal(true)
  }

  return (
    <div className="min-h-screen relative main-content">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-cosmic animate-float">
              Your Profile
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Manage your cosmic profile, reading history, and personal preferences.
            </p>
            
            {/* Personalized Welcome Message */}
            {isPersonalized && personalInfo && zodiacInfo && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30 backdrop-blur-sm max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-2xl">✨</span>
                  <h2 className="text-2xl font-bold text-white">
                    Welcome back, {personalInfo.name}!
                  </h2>
                  <span className="text-2xl">✨</span>
                </div>
                <p className="text-lg text-purple-200">
                  Your {zodiacInfo.name} profile is ready for personalized insights
                </p>
                <div className="mt-3 text-sm text-gray-300">
                  Born: {personalInfo.birthDate} • {personalInfo.birthLocation}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Profile Navigation */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6 cosmic-glow">
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { id: 'overview', name: t('personalInfo'), icon: '👤' },
                  { id: 'readings', name: t('readingHistory'), icon: '📚' },
                  { id: 'preferences', name: t('preferences'), icon: '⚙️' },
                  { id: 'privacy', name: t('privacy'), icon: '🔒' },
                  { id: 'notifications', name: t('notifications'), icon: '🔔' },
                  { id: 'language', name: t('language'), icon: '🌐' }
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'cosmic' : 'secondary'}
                    size="lg"
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                  <Card className="p-6 cosmic-glow">
                    <div className="text-center">
                      <div className="text-6xl mb-4">👤</div>
                      <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
                      <p className="text-gray-400 mb-4">{profile.email}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-300">{t('zodiacSign')}:</span>
                          <span className="text-purple-300 font-semibold">{profile.zodiacSign}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">{t('lifePathNumber')}:</span>
                          <span className="text-purple-300 font-semibold">{profile.lifePathNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">{t('birthDate')}:</span>
                          <span className="text-gray-300">{profile.birthDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">{t('birthLocation')}:</span>
                          <span className="text-gray-300">{profile.birthLocation}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="cosmic" 
                        size="lg" 
                        className="w-full"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? t('save') : t('edit')}
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2">
                  <Card className="p-6 cosmic-glow">
                    <h3 className="text-2xl font-bold mb-6 text-cosmic">Profile Information</h3>
                    
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                          <input
                            type="text"
                            className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-medium mb-2">Birth Date</label>
                          <input
                            type="date"
                            className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={profile.birthDate}
                            onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-medium mb-2">Birth Time</label>
                          <input
                            type="time"
                            className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={profile.birthTime}
                            onChange={(e) => setProfile({...profile, birthTime: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-medium mb-2">Birth Location</label>
                          <input
                            type="text"
                            className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={profile.birthLocation}
                            onChange={(e) => setProfile({...profile, birthLocation: e.target.value})}
                          />
                        </div>
                        <div className="flex space-x-4">
                          <Button variant="cosmic" size="lg" onClick={handleSaveProfile}>
                            Save Changes
                          </Button>
                          <Button variant="secondary" size="lg" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold mb-2 text-purple-300">Personal Information</h4>
                          <p className="text-gray-300">Name: {profile.name}</p>
                          <p className="text-gray-300">Email: {profile.email}</p>
                          <p className="text-gray-300">Birth Date: {profile.birthDate}</p>
                          <p className="text-gray-300">Birth Time: {profile.birthTime}</p>
                          <p className="text-gray-300">Birth Location: {profile.birthLocation}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-2 text-purple-300">Cosmic Profile</h4>
                          <p className="text-gray-300">Zodiac Sign: {profile.zodiacSign}</p>
                          <p className="text-gray-300">Life Path Number: {profile.lifePathNumber}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-2 text-purple-300">Interests</h4>
                          <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest, index) => (
                              <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Readings Tab */}
        {activeTab === 'readings' && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Your Reading History</h2>
              
              <div className="space-y-6">
                {profile.readingHistory.map((reading, index) => (
                  <Card key={index} className="p-6 cosmic-glow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">
                          {reading.type === 'Daily Horoscope' && '♈'}
                          {reading.type === 'Dream Analysis' && '🌙'}
                          {reading.type === 'Compatibility Reading' && '💕'}
                          {reading.type === 'Numerology Reading' && '🔢'}
                          {reading.type === 'Astrology Reading' && '⭐'}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{reading.type}</h3>
                          <p className="text-gray-400">{reading.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < reading.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <Button variant="secondary" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Preferences</h2>
              
              <Card className="p-8 cosmic-glow">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Theme</label>
                    <select className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="cosmic">Cosmic</option>
                      <option value="minimal">Minimal</option>
                      <option value="ocean">Ocean</option>
                      <option value="forest">Forest</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Language</label>
                    <select className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email Notifications</span>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Push Notifications</span>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">SMS Notifications</span>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="pt-6">
                    <Button variant="cosmic" size="lg" className="w-full">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Privacy Settings</h2>
              
              <Card className="p-8 cosmic-glow">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Profile Visibility</label>
                    <select className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Show Birth Information</span>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Show Reading History</span>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Allow Friend Requests</span>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Data Sharing for Analytics</span>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="pt-6">
                    <Button variant="cosmic" size="lg" className="w-full">
                      Save Privacy Settings
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Notification Settings</h2>
              
              <Card className="p-8 cosmic-glow">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-300">Daily Horoscope</h4>
                      <p className="text-gray-300 text-sm">Get your daily cosmic guidance</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-300">Dream Analysis</h4>
                      <p className="text-gray-300 text-sm">Notifications for dream interpretation</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-300">Community Updates</h4>
                      <p className="text-gray-300 text-sm">New posts and community activity</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-300">Compatibility Matches</h4>
                      <p className="text-gray-300 text-sm">New cosmic matches and connections</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Toggle
                    </Button>
                  </div>
                  
                  <div className="pt-6">
                    <Button variant="cosmic" size="lg" className="w-full">
                      Save Notification Settings
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Language Tab */}
        {activeTab === 'language' && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">{t('language')} {t('settings')}</h2>
              
              <Card className="p-8 cosmic-glow">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🌐</div>
                  <h3 className="text-2xl font-bold mb-4">{t('language')} {t('preferences')}</h3>
                  <p className="text-gray-300 mb-6">
                    Choose your preferred language for the best spiritual experience
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4 text-purple-300">Select Language</h4>
                    <LanguageSelector variant="inline" size="md" className="justify-center" />
                  </div>

                  <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-lg font-semibold mb-4 text-purple-300">Supported Languages</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span>🇺🇸</span>
                        <span>English</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇮🇳</span>
                        <span>हिन्दी (Hindi)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇮🇳</span>
                        <span>தமிழ் (Tamil)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇱🇰</span>
                        <span>සිංහල (Sinhala)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇮🇳</span>
                        <span>తెలుగు (Telugu)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇮🇳</span>
                        <span>বাংলা (Bengali)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇮🇳</span>
                        <span>मराठी (Marathi)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇮🇳</span>
                        <span>ગુજરાતી (Gujarati)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇮🇳</span>
                        <span>ಕನ್ನಡ (Kannada)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🇮🇳</span>
                        <span>മലയാളം (Malayalam)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="cosmic" size="lg" className="px-8">
                      {t('save')} {t('preferences')}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Billing & Subscription</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Current Plan</h3>
                  <div className="text-center">
                    <div className="text-4xl mb-4">👑</div>
                    <h4 className="text-2xl font-bold mb-2">Premium Plan</h4>
                    <p className="text-gray-300 mb-4">$9.99/month</p>
                    <p className="text-gray-400 text-sm mb-6">All features unlocked</p>
                    <Button variant="secondary" size="sm">
                      Manage Subscription
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Payment History</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">January 2024</span>
                      <span className="text-green-400">$9.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">December 2023</span>
                      <span className="text-green-400">$9.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">November 2023</span>
                      <span className="text-green-400">$9.99</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="p-8 max-w-md mx-auto cosmic-glow">
              <h2 className="text-2xl font-bold mb-4 text-cosmic">Information</h2>
              <p className="text-gray-300 mb-6">{infoContent}</p>
              <Button 
                variant="cosmic" 
                size="lg" 
                className="w-full"
                onClick={() => setShowInfoModal(false)}
              >
                Close
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}