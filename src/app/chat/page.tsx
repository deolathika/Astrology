'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, Send, Heart, Star, Smile, ThumbsUp, 
  Users, Search, Filter, MoreVertical, Phone, Video,
  ArrowLeft, Settings, Bell, Shield, Crown, Zap
} from 'lucide-react'

interface ChatUser {
  id: string
  name: string
  zodiacSign: string
  compatibility: number
  lastSeen: string
  isOnline: boolean
  avatar?: string
}

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: 'text' | 'emoji' | 'system'
  isRead: boolean
}

interface ChatRoom {
  id: string
  name: string
  participants: ChatUser[]
  lastMessage?: ChatMessage
  unreadCount: number
  isActive: boolean
}

export default function ChatPage() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const emojiOptions = ['❤️', '🌟', '✨', '🌙', '☀️', '🌺', '🌸', '💫', '🔥', '💎', '🎭', '🎨']

  useEffect(() => {
    loadChatData()
  }, [])

  const loadChatData = async () => {
    setIsLoading(true)
    
    // Mock chat rooms data
    const mockRooms: ChatRoom[] = [
      {
        id: '1',
        name: 'Cosmic Connections',
        participants: [
          { id: '1', name: 'You', zodiacSign: 'Leo', compatibility: 100, lastSeen: 'now', isOnline: true },
          { id: '2', name: 'Sarah', zodiacSign: 'Aries', compatibility: 92, lastSeen: '2 min ago', isOnline: true }
        ],
        lastMessage: {
          id: '1',
          senderId: '2',
          senderName: 'Sarah',
          content: '🌟✨ Your energy is amazing today!',
          timestamp: '2 min ago',
          type: 'emoji',
          isRead: false
        },
        unreadCount: 2,
        isActive: true
      },
      {
        id: '2',
        name: 'Star Gazers',
        participants: [
          { id: '1', name: 'You', zodiacSign: 'Leo', compatibility: 100, lastSeen: 'now', isOnline: true },
          { id: '3', name: 'Mike', zodiacSign: 'Sagittarius', compatibility: 88, lastSeen: '1 hour ago', isOnline: false }
        ],
        lastMessage: {
          id: '2',
          senderId: '3',
          senderName: 'Mike',
          content: 'The stars are aligning perfectly!',
          timestamp: '1 hour ago',
          type: 'text',
          isRead: true
        },
        unreadCount: 0,
        isActive: false
      }
    ]

    setChatRooms(mockRooms)
    setActiveRoom(mockRooms[0])
    setIsLoading(false)
  }

  const sendMessage = async (content: string, type: 'text' | 'emoji' = 'text') => {
    if (!content.trim() || !activeRoom) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current_user',
      senderName: 'You',
      content: content.trim(),
      timestamp: 'now',
      type,
      isRead: true
    }

    setMessages(prev => [...prev, newMessage])
    setNewMessage('')
    setShowEmojiPicker(false)
  }

  const sendEmoji = (emoji: string) => {
    sendMessage(emoji, 'emoji')
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-gray-600'
  }

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your cosmic connections...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Cosmic Chat</h1>
                <p className="text-slate-600">Connect with your cosmic soulmates</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Active Connections</p>
                <p className="font-semibold text-slate-900 text-2xl">{chatRooms.filter(r => r.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Rooms Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Your Connections</h3>
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search connections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              {/* Chat Rooms List */}
              <div className="space-y-3">
                {filteredRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setActiveRoom(room)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      activeRoom?.id === room.id
                        ? 'bg-violet-50 border-2 border-violet-200'
                        : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {room.participants.find(p => p.id !== 'current_user')?.name.charAt(0) || '?'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900">{room.name}</h4>
                          {room.unreadCount > 0 && (
                            <span className="bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
                              {room.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 truncate">
                          {room.lastMessage?.content || 'No messages yet'}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-slate-500">{room.lastMessage?.timestamp}</span>
                          {room.participants.find(p => p.id !== 'current_user')?.isOnline && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {activeRoom ? (
              <div className="bg-white rounded-2xl shadow-sm h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {activeRoom.participants.find(p => p.id !== 'current_user')?.name.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{activeRoom.name}</h3>
                        <p className="text-sm text-slate-600">
                          {activeRoom.participants.find(p => p.id !== 'current_user')?.zodiacSign} • 
                          <span className={getCompatibilityColor(activeRoom.participants.find(p => p.id !== 'current_user')?.compatibility || 0)}>
                            {' '}{activeRoom.participants.find(p => p.id !== 'current_user')?.compatibility}% compatibility
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600">Start your cosmic conversation!</p>
                        <p className="text-sm text-slate-500">Send an emoji or message to begin</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                            message.senderId === 'current_user'
                              ? 'bg-violet-600 text-white'
                              : 'bg-slate-100 text-slate-900'
                          }`}>
                            {message.type === 'emoji' ? (
                              <div className="text-2xl text-center">{message.content}</div>
                            ) : (
                              <p className="text-sm">{message.content}</p>
                            )}
                            <p className={`text-xs mt-1 ${
                              message.senderId === 'current_user' ? 'text-violet-200' : 'text-slate-500'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-slate-200">
                  {showEmojiPicker && (
                    <div className="mb-4 p-4 bg-slate-50 rounded-xl">
                      <div className="grid grid-cols-6 gap-2">
                        {emojiOptions.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => sendEmoji(emoji)}
                            className="p-2 text-2xl hover:bg-slate-200 rounded-lg transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Smile className="w-5 h-5" />
                    </button>
                    
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage)}
                      placeholder="Type your cosmic message..."
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                    
                    <button
                      onClick={() => sendMessage(newMessage)}
                      disabled={!newMessage.trim()}
                      className="p-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg hover:from-violet-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Select a Connection</h3>
                  <p className="text-slate-600">Choose a chat room to start your cosmic conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


