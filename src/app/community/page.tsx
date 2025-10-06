'use client'

import React, { useState } from 'react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

interface CommunityMember {
  id: number
  name: string
  zodiacSign: string
  location: string
  interests: string[]
  lastActive: string
  avatar: string
}

interface CommunityPost {
  id: number
  author: string
  title: string
  content: string
  likes: number
  comments: number
  timestamp: string
  category: string
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discover')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [infoContent, setInfoContent] = useState('')

  const communityMembers: CommunityMember[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      zodiacSign: 'Leo',
      location: 'New York, USA',
      interests: ['Astrology', 'Meditation', 'Crystals'],
      lastActive: '2 hours ago',
      avatar: '👩‍🦰'
    },
    {
      id: 2,
      name: 'Mike Chen',
      zodiacSign: 'Scorpio',
      location: 'Tokyo, Japan',
      interests: ['Numerology', 'Dream Analysis', 'Spirituality'],
      lastActive: '1 hour ago',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      zodiacSign: 'Pisces',
      location: 'London, UK',
      interests: ['Tarot', 'Moon Phases', 'Healing'],
      lastActive: '30 minutes ago',
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'David Brown',
      zodiacSign: 'Aries',
      location: 'Sydney, Australia',
      interests: ['Astrology', 'Compatibility', 'Relationships'],
      lastActive: '3 hours ago',
      avatar: '👨‍🚀'
    },
    {
      id: 5,
      name: 'Lisa Garcia',
      zodiacSign: 'Libra',
      location: 'Madrid, Spain',
      interests: ['Feng Shui', 'Chakras', 'Energy Healing'],
      lastActive: '1 hour ago',
      avatar: '👩‍⚕️'
    }
  ]

  const communityPosts: CommunityPost[] = [
    {
      id: 1,
      author: 'Sarah Johnson',
      title: 'Full Moon Energy - How to Harness It',
      content: 'The full moon is a powerful time for manifestation and release. Here are my favorite rituals...',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      category: 'Astrology'
    },
    {
      id: 2,
      author: 'Mike Chen',
      title: 'Understanding Your Life Path Number',
      content: 'Your life path number reveals your soul\'s purpose. Let me break down the calculation...',
      likes: 18,
      comments: 12,
      timestamp: '4 hours ago',
      category: 'Numerology'
    },
    {
      id: 3,
      author: 'Emma Wilson',
      title: 'Dream Symbols and Their Meanings',
      content: 'Last night I had the most vivid dream about water. Here\'s what it means...',
      likes: 31,
      comments: 15,
      timestamp: '6 hours ago',
      category: 'Dreams'
    },
    {
      id: 4,
      author: 'David Brown',
      title: 'Zodiac Compatibility Guide',
      content: 'Wondering if you and your partner are astrologically compatible? Here\'s the complete guide...',
      likes: 42,
      comments: 23,
      timestamp: '8 hours ago',
      category: 'Compatibility'
    }
  ]

  const cosmicMatch = {
    yourSign: 'Leo',
    compatibleSigns: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    incompatibleSigns: ['Taurus', 'Scorpio', 'Aquarius'],
    bestMatches: [
      { name: 'Sarah Johnson', sign: 'Leo', compatibility: 95, location: 'New York, USA' },
      { name: 'Alex Thompson', sign: 'Aries', compatibility: 92, location: 'Los Angeles, USA' },
      { name: 'Maya Patel', sign: 'Sagittarius', compatibility: 88, location: 'Mumbai, India' }
    ]
  }

  const showInfo = (content: string) => {
    setInfoContent(content)
    setShowInfoModal(true)
  }

  return (
    <div className="min-h-screen relative">
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
              Cosmic Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with like-minded cosmic seekers, share experiences, and discover your spiritual tribe.
            </p>
          </div>
        </section>

        {/* Community Navigation */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6 cosmic-glow">
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { id: 'discover', name: 'Discover', icon: '🔍' },
                  { id: 'cosmic-match', name: 'Cosmic Match', icon: '💕' },
                  { id: 'connections', name: 'Connections', icon: '🤝' },
                  { id: 'chat', name: 'Chat', icon: '💬' },
                  { id: 'forums', name: 'Forums', icon: '📝' },
                  { id: 'events', name: 'Events', icon: '📅' }
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

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Discover Community Members</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityMembers.map((member) => (
                  <Card key={member.id} className="p-6 cosmic-glow hover:scale-105">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{member.avatar}</div>
                      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                      <p className="text-purple-300 mb-2">{member.zodiacSign}</p>
                      <p className="text-gray-400 text-sm mb-4">{member.location}</p>
                      
                      <div className="mb-4">
                        <p className="text-gray-300 text-sm mb-2">Interests:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.interests.map((interest, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-xs mb-4">Last active: {member.lastActive}</p>
                      
                      <div className="flex space-x-2">
                        <Button variant="primary" size="sm" className="flex-1">
                          Connect
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          Message
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cosmic Match Tab */}
        {activeTab === 'cosmic-match' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Cosmic Match</h2>
              
              <Card className="p-8 cosmic-glow mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-cosmic">Your Astrological Profile</h3>
                <div className="text-center">
                  <div className="text-6xl mb-4">♌</div>
                  <h4 className="text-2xl font-bold mb-2">{cosmicMatch.yourSign}</h4>
                  <p className="text-gray-300 mb-6">Your cosmic energy and compatibility profile</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-lg font-semibold mb-3 text-green-300">Compatible Signs</h5>
                      <div className="flex flex-wrap gap-2">
                        {cosmicMatch.compatibleSigns.map((sign, index) => (
                          <span key={index} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full">
                            {sign}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold mb-3 text-red-300">Challenging Signs</h5>
                      <div className="flex flex-wrap gap-2">
                        {cosmicMatch.incompatibleSigns.map((sign, index) => (
                          <span key={index} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full">
                            {sign}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <h3 className="text-2xl font-bold text-center mb-8 text-cosmic">Your Best Matches</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cosmicMatch.bestMatches.map((match, index) => (
                  <Card key={index} className="p-6 cosmic-glow">
                    <div className="text-center">
                      <div className="text-4xl mb-4">👤</div>
                      <h4 className="text-xl font-semibold mb-2">{match.name}</h4>
                      <p className="text-purple-300 mb-2">{match.sign}</p>
                      <p className="text-gray-400 text-sm mb-4">{match.location}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Compatibility</span>
                          <span className="text-cosmic font-bold">{match.compatibility}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${match.compatibility}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <Button variant="cosmic" size="sm" className="w-full">
                        Connect
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Your Connections</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Sarah Johnson', status: 'Online', lastMessage: 'Thanks for the dream interpretation!', time: '2 min ago' },
                  { name: 'Mike Chen', status: 'Away', lastMessage: 'The numerology reading was spot on', time: '1 hour ago' },
                  { name: 'Emma Wilson', status: 'Online', lastMessage: 'Can you help with my birth chart?', time: '5 min ago' },
                  { name: 'David Brown', status: 'Offline', lastMessage: 'Great compatibility analysis', time: '3 hours ago' }
                ].map((connection, index) => (
                  <Card key={index} className="p-6 cosmic-glow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-2xl">👤</div>
                      <div>
                        <h4 className="font-semibold">{connection.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          connection.status === 'Online' ? 'bg-green-500/20 text-green-300' :
                          connection.status === 'Away' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {connection.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{connection.lastMessage}</p>
                    <p className="text-gray-400 text-xs">{connection.time}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Community Chat</h2>
              
              <Card className="p-6 cosmic-glow">
                <div className="h-96 bg-white/5 rounded-lg p-4 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    {[
                      { user: 'Sarah Johnson', message: 'Anyone else feeling the full moon energy tonight?', time: '2:30 PM' },
                      { user: 'Mike Chen', message: 'Yes! It\'s so intense. Perfect for manifestation rituals', time: '2:32 PM' },
                      { user: 'Emma Wilson', message: 'I\'ve been having the most vivid dreams lately', time: '2:35 PM' },
                      { user: 'David Brown', message: 'Same here! The dream analysis feature is amazing', time: '2:37 PM' }
                    ].map((chat, index) => (
                      <div key={index} className="flex space-x-3">
                        <div className="text-2xl">👤</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-purple-300">{chat.user}</span>
                            <span className="text-gray-400 text-xs">{chat.time}</span>
                          </div>
                          <p className="text-gray-300">{chat.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Button variant="cosmic" size="lg">
                    Send
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Community Forums</h2>
              
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <Card key={post.id} className="p-6 cosmic-glow">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">👤</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-purple-300">{post.author}</span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-400 text-sm">{post.timestamp}</span>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-300 mb-4">{post.content}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-300">
                            <span>👍</span>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-300">
                            <span>💬</span>
                            <span>{post.comments}</span>
                          </button>
                          <Button variant="secondary" size="sm">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Community Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Full Moon Meditation Circle',
                    date: 'Tomorrow, 8:00 PM',
                    description: 'Join us for a guided meditation under the full moon energy',
                    attendees: 24,
                    type: 'Meditation'
                  },
                  {
                    title: 'Astrology Workshop',
                    date: 'Saturday, 2:00 PM',
                    description: 'Learn the basics of reading birth charts and planetary aspects',
                    attendees: 18,
                    type: 'Workshop'
                  },
                  {
                    title: 'Dream Sharing Circle',
                    date: 'Sunday, 7:00 PM',
                    description: 'Share and interpret dreams with the community',
                    attendees: 12,
                    type: 'Discussion'
                  }
                ].map((event, index) => (
                  <Card key={index} className="p-6 cosmic-glow">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📅</div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-purple-300 mb-2">{event.date}</p>
                      <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">{event.attendees} attendees</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                          {event.type}
                        </span>
                      </div>
                      <Button variant="cosmic" size="sm" className="w-full">
                        Join Event
                      </Button>
                    </div>
                  </Card>
                ))}
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