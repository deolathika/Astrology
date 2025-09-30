'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Heart, MessageCircle, Shield, Smile, Search, Filter, Plus, Send, ThumbsUp, Share2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CommunityUser {
  id: string
  name: string
  zodiacSign: string
  lifePathNumber: number
  avatar: string
  isOnline: boolean
  lastSeen: string
  compatibilityScore: number
}

interface ChatMessage {
  id: string
  fromId: string
  fromName: string
  emoji: string
  timestamp: string
  isModerated: boolean
}

const emojiOptions = [
  '✨', '🌟', '💫', '🌙', '☀️', '🌺', '🌸', '🌼', '🌻', '🌷',
  '💖', '💕', '💗', '💝', '💎', '🔮', '🎭', '🎨', '🎪', '🎯',
  '🌈', '☁️', '🌊', '🔥', '🌍', '🌎', '🌏', '🌌', '⭐', '🌟'
]

export default function CommunityPage() {
  const [users, setUsers] = useState<CommunityUser[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedUser, setSelectedUser] = useState<CommunityUser | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [hasConsented, setHasConsented] = useState(false)
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    loadCommunityData()
    checkConsent()
  }, [])

  const loadCommunityData = async () => {
    try {
      // Load discovered users
      const response = await fetch('/api/community/chat?action=discover_connections&userZodiac=Leo&limit=10')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.connections || [])
      }

      // Load recent messages
      const messagesResponse = await fetch('/api/community/chat?action=getRecentMessages&limit=20')
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json()
        setMessages(messagesData.messages || [])
      }
    } catch (error) {
      // Mock data for development
      setUsers([
        {
          id: '1',
          name: 'Alex Johnson',
          zodiacSign: 'Gemini',
          lifePathNumber: 7,
          avatar: 'AJ',
          isOnline: true,
          lastSeen: 'now',
          compatibilityScore: 85
        },
        {
          id: '2',
          name: 'Sarah Chen',
          zodiacSign: 'Sagittarius',
          lifePathNumber: 3,
          avatar: 'SC',
          isOnline: false,
          lastSeen: '2 hours ago',
          compatibilityScore: 92
        },
        {
          id: '3',
          name: 'Maya Patel',
          zodiacSign: 'Cancer',
          lifePathNumber: 9,
          avatar: 'MP',
          isOnline: true,
          lastSeen: 'now',
          compatibilityScore: 78
        }
      ])

      setMessages([
        {
          id: '1',
          fromId: '1',
          fromName: 'Alex Johnson',
          emoji: '✨',
          timestamp: new Date().toISOString(),
          isModerated: false
        },
        {
          id: '2',
          fromId: '2',
          fromName: 'Sarah Chen',
          emoji: '🌟',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isModerated: false
        }
      ])
    }
  }

  const checkConsent = () => {
    const consent = localStorage.getItem('communityConsent')
    setHasConsented(consent === 'true')
    if (!consent) {
      setShowConsentModal(true)
    }
  }

  const handleConsent = (consent: boolean) => {
    setHasConsented(consent)
    localStorage.setItem('communityConsent', consent.toString())
    setShowConsentModal(false)
    
    if (consent) {
      toast.success('Welcome to the community!')
    } else {
      toast('You can join the community anytime in settings')
    }
  }

  const sendMessage = async (emoji: string) => {
    if (!hasConsented) {
      toast.error('Please consent to community participation first')
      return
    }

    try {
      const response = await fetch('/api/community/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          payload: {
            senderId: 'current_user',
            senderName: 'You',
            emoji: emoji
          }
        })
      })

      if (response.ok) {
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          fromId: 'current_user',
          fromName: 'You',
          emoji: emoji,
          timestamp: new Date().toISOString(),
          isModerated: false
        }
        setMessages(prev => [newMsg, ...prev])
        toast.success('Message sent!')
      }
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-gray-600'
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.zodiacSign.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Community
            </h1>
            <p className="text-gray-600 mt-2">Connect with like-minded cosmic souls</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <button className="btn btn-secondary flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Discover Users */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Discover Connections</h2>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ scale: 1.02 }}
                  className="card p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-violet-500 text-white flex items-center justify-center font-semibold">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.zodiacSign} • Life Path {user.lifePathNumber}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className="text-xs text-gray-500">
                          {user.isOnline ? 'Online' : user.lastSeen}
                        </span>
                        <span className={`text-xs font-medium ${getCompatibilityColor(user.compatibilityScore)}`}>
                          {user.compatibilityScore}% match
                        </span>
                      </div>
                    </div>
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="lg:col-span-2">
            <div className="card p-6 h-96 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Community Chat
                </h2>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm text-gray-500">
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-500">Be the first to share a cosmic emoji!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center space-x-3 ${
                        message.fromId === 'current_user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.fromId !== 'current_user' && (
                        <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold">
                          {message.fromName.charAt(0)}
                        </div>
                      )}
                      <div className={`flex items-center space-x-2 ${
                        message.fromId === 'current_user' ? 'flex-row-reverse' : ''
                      }`}>
                        <div className="text-2xl">{message.emoji}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      {message.fromId === 'current_user' && (
                        <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold">
                          Y
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>

              {/* Emoji Picker */}
              {hasConsented ? (
                <div className="border-t pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => sendMessage(emoji)}
                        className="w-10 h-10 text-2xl hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Click an emoji to send it to the community
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Consent required to participate</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Consent Modal */}
        <AnimatePresence>
          {showConsentModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="card p-6 max-w-md w-full mx-4"
              >
                <div className="text-center mb-6">
                  <Shield className="w-16 h-16 text-violet-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Join the Community
                  </h3>
                  <p className="text-gray-600">
                    Connect with other cosmic souls through emoji-only chat. Your privacy is protected.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Smile className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Safe Communication</h4>
                      <p className="text-sm text-gray-600">Only emojis allowed - no text messages</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Privacy Protected</h4>
                      <p className="text-sm text-gray-600">Your personal data stays private</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-pink-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Cosmic Connections</h4>
                      <p className="text-sm text-gray-600">Find your astrological soulmates</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleConsent(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={() => handleConsent(true)}
                    className="btn btn-primary flex-1"
                  >
                    Join Community
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}