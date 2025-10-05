'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, MapPin, Clock, Star, Sparkles, Heart, Moon } from 'lucide-react'

interface CosmicProfileProps {
  user?: {
    name?: string
    email?: string
    birthDate?: string
    birthTime?: string
    birthPlace?: string
    zodiacSign?: string
    system?: string
  } | null
  onEdit?: () => void
}

export function CosmicProfile({ user, onEdit }: CosmicProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'astrology' | 'numerology'>('overview')

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No profile data available</p>
        <button
          onClick={onEdit}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Profile
        </button>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'astrology', label: 'Astrology', icon: Star },
    { id: 'numerology', label: 'Numerology', icon: Sparkles }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{user.name || 'Cosmic Explorer'}</h3>
            <p className="text-sm text-gray-600">Your Cosmic Profile</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-white text-purple-600 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-white/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <h4 className="font-medium text-gray-900">Birth Date</h4>
                </div>
                <p className="text-gray-600">{user.birthDate || 'Not set'}</p>
              </div>

              <div className="bg-white/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <h4 className="font-medium text-gray-900">Birth Time</h4>
                </div>
                <p className="text-gray-600">{user.birthTime || 'Not set'}</p>
              </div>

              <div className="bg-white/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <h4 className="font-medium text-gray-900">Birth Place</h4>
                </div>
                <p className="text-gray-600">{user.birthPlace || 'Not set'}</p>
              </div>

              <div className="bg-white/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-purple-500" />
                  <h4 className="font-medium text-gray-900">Zodiac Sign</h4>
                </div>
                <p className="text-gray-600">{user.zodiacSign || 'Not calculated'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'astrology' && (
          <div className="space-y-4">
            <div className="bg-white/50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Astrological Profile</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sun Sign:</span>
                  <span className="font-medium">{user.zodiacSign || 'Not calculated'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">System:</span>
                  <span className="font-medium">{user.system || 'Western'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Birth Chart:</span>
                  <span className="text-blue-600">View Chart</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'numerology' && (
          <div className="space-y-4">
            <div className="bg-white/50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Numerology Profile</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold">7</span>
                  </div>
                  <p className="text-sm text-gray-600">Life Path</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <p className="text-sm text-gray-600">Destiny</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold">5</span>
                  </div>
                  <p className="text-sm text-gray-600">Soul Urge</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <p className="text-sm text-gray-600">Personality</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}