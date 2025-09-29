'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, MapPin, Clock, Edit, Save, Star, Heart, Moon, Sun } from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'

interface UserProfile {
  fullName: string
  email: string
  birthDate: string
  birthTime: string
  birthPlace: string
  latitude: number
  longitude: number
  timezone: string
  preferences: {
    language: string
    zodiacSystem: string
    notifications: boolean
    theme: string
  }
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Cosmic Explorer',
    email: 'explorer@cosmic.com',
    birthDate: '1990-01-01',
    birthTime: '12:00',
    birthPlace: 'New York, NY',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York',
    preferences: {
      language: 'en',
      zodiacSystem: 'western',
      notifications: true,
      theme: 'cosmic'
    }
  })

  const [formData, setFormData] = useState(profile)

  const handleSave = () => {
    setProfile(formData)
    setIsEditing(false)
    // Save to backend/localStorage
    localStorage.setItem('daily-secrets-profile', JSON.stringify(formData))
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  const zodiacSystems = [
    { id: 'western', name: 'Western', icon: Sun },
    { id: 'vedic', name: 'Vedic', icon: Star },
    { id: 'chinese', name: 'Chinese', icon: Moon },
    { id: 'sri_lankan', name: 'Sri Lankan', icon: Heart }
  ]

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-cosmic-gradient-text mb-4"
            >
              Your Cosmic Profile
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light"
            >
              Manage your personal information and cosmic preferences
            </motion.p>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="cosmic-card max-w-4xl mx-auto mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-electric-violet/20 rounded-2xl">
                  <User className="w-8 h-8 text-electric-violet" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-starlight-white">
                    Personal Information
                  </h2>
                  <p className="text-stellar-gray-light">
                    Your cosmic journey details
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="cosmic-button flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="cosmic-input w-full"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-starlight-white text-lg">{profile.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="cosmic-input w-full"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <p className="text-starlight-white text-lg">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-2">
                    Birth Date
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      className="cosmic-input w-full"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-electric-violet" />
                      <p className="text-starlight-white text-lg">{profile.birthDate}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Birth Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-2">
                    Birth Time
                  </label>
                  {isEditing ? (
                    <input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                      className="cosmic-input w-full"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-electric-violet" />
                      <p className="text-starlight-white text-lg">{profile.birthTime}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-2">
                    Birth Place
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.birthPlace}
                      onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                      className="cosmic-input w-full"
                      placeholder="Enter your birth place"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-electric-violet" />
                      <p className="text-starlight-white text-lg">{profile.birthPlace}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-2">
                    Timezone
                  </label>
                  <p className="text-starlight-white text-lg">{profile.timezone}</p>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-electric-violet/20">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-cosmic-navy border border-electric-violet text-electric-violet rounded-xl hover:bg-electric-violet hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="cosmic-button flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="cosmic-card max-w-4xl mx-auto mb-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-supernova-gold/20 rounded-2xl">
                <Star className="w-8 h-8 text-supernova-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-starlight-white">
                  Cosmic Preferences
                </h2>
                <p className="text-stellar-gray-light">
                  Customize your cosmic experience
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Zodiac System */}
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-4">
                  Preferred Zodiac System
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {zodiacSystems.map((system) => {
                    const Icon = system.icon
                    return (
                      <button
                        key={system.id}
                        onClick={() => setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            zodiacSystem: system.id
                          }
                        })}
                        className={`p-4 rounded-xl border transition-all ${
                          formData.preferences.zodiacSystem === system.id
                            ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                            : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-semibold">{system.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-4">
                  Language
                </label>
                <select
                  value={formData.preferences.language}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      language: e.target.value
                    }
                  })}
                  className="cosmic-input w-full"
                >
                  <option value="en">English</option>
                  <option value="si">සිංහල</option>
                  <option value="ta">தமிழ்</option>
                  <option value="hi">हिन्दी</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              {/* Notifications */}
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-4">
                  Notifications
                </label>
                <button
                  onClick={() => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      notifications: !formData.preferences.notifications
                    }
                  })}
                  className={`w-full p-4 rounded-xl border transition-all ${
                    formData.preferences.notifications
                      ? 'border-aurora-green bg-aurora-green/20 text-aurora-green'
                      : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                  }`}
                >
                  {formData.preferences.notifications ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-4">
                  Theme
                </label>
                <select
                  value={formData.preferences.theme}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      theme: e.target.value
                    }
                  })}
                  className="cosmic-input w-full"
                >
                  <option value="cosmic">Cosmic</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Cosmic Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="cosmic-card max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-stellar-pink/20 rounded-2xl">
                <Moon className="w-8 h-8 text-stellar-pink" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-starlight-white">
                  Your Cosmic Journey
                </h2>
                <p className="text-stellar-gray-light">
                  Track your spiritual growth and insights
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-electric-violet mb-2">47</div>
                <div className="text-stellar-gray-light text-sm">Daily Readings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-supernova-gold mb-2">12</div>
                <div className="text-stellar-gray-light text-sm">Zodiac Insights</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-aurora-green mb-2">8</div>
                <div className="text-stellar-gray-light text-sm">Dream Interpretations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-stellar-pink mb-2">23</div>
                <div className="text-stellar-gray-light text-sm">Compatibility Checks</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
