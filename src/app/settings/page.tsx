'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Bell, 
  Globe, 
  Palette, 
  Shield, 
  HelpCircle, 
  Info, 
  LogOut,
  User,
  CreditCard,
  Star,
  Moon,
  Sun
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    dailyGuidance: true,
    dreamAlerts: true,
    compatibilityUpdates: false,
    cosmicEvents: true,
    pushNotifications: true,
    emailNotifications: false
  })

  const [preferences, setPreferences] = useState({
    language: 'en',
    theme: 'cosmic',
    zodiacSystem: 'western',
    timeFormat: '12h',
    dateFormat: 'MM/DD/YYYY'
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    dataSharing: false,
    analytics: true,
    crashReports: true
  })

  const languages = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { id: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { id: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { id: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  const themes = [
    { id: 'cosmic', name: 'Cosmic', icon: Star, description: 'Deep space theme' },
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Dark mode' },
    { id: 'light', name: 'Light', icon: Sun, description: 'Light mode' }
  ]

  const handleLogout = () => {
    localStorage.removeItem('daily-secrets-profile')
    localStorage.removeItem('daily-secrets-onboarding-complete')
    window.location.href = '/onboarding'
  }

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
              Settings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light"
            >
              Customize your cosmic experience
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-electric-violet/20 rounded-2xl">
                  <Bell className="w-6 h-6 text-electric-violet" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Notifications
                  </h2>
                  <p className="text-stellar-gray-light">
                    Manage your notification preferences
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="text-starlight-white font-semibold capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-stellar-gray-light text-sm">
                        {key === 'dailyGuidance' && 'Get daily cosmic insights'}
                        {key === 'dreamAlerts' && 'Dream interpretation alerts'}
                        {key === 'compatibilityUpdates' && 'Relationship compatibility updates'}
                        {key === 'cosmicEvents' && 'Special cosmic events and transits'}
                        {key === 'pushNotifications' && 'Push notifications on your device'}
                        {key === 'emailNotifications' && 'Email notifications'}
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications({
                        ...notifications,
                        [key]: !value
                      })}
                      className={`w-12 h-6 rounded-full transition-all ${
                        value ? 'bg-electric-violet' : 'bg-cosmic-navy'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-supernova-gold/20 rounded-2xl">
                  <Globe className="w-6 h-6 text-supernova-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Preferences
                  </h2>
                  <p className="text-stellar-gray-light">
                    Customize your app experience
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Language */}
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      language: e.target.value
                    })}
                    className="cosmic-input w-full"
                  >
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Theme */}
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {themes.map((theme) => {
                      const Icon = theme.icon
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setPreferences({
                            ...preferences,
                            theme: theme.id
                          })}
                          className={`p-3 rounded-xl border transition-all text-center ${
                            preferences.theme === theme.id
                              ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                              : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-2" />
                          <div className="text-xs font-semibold">{theme.name}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Format */}
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Time Format
                  </label>
                  <select
                    value={preferences.timeFormat}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      timeFormat: e.target.value
                    })}
                    className="cosmic-input w-full"
                  >
                    <option value="12h">12 Hour (AM/PM)</option>
                    <option value="24h">24 Hour</option>
                  </select>
                </div>

                {/* Date Format */}
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Date Format
                  </label>
                  <select
                    value={preferences.dateFormat}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      dateFormat: e.target.value
                    })}
                    className="cosmic-input w-full"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Privacy & Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-aurora-green/20 rounded-2xl">
                  <Shield className="w-6 h-6 text-aurora-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Privacy & Security
                  </h2>
                  <p className="text-stellar-gray-light">
                    Control your data and privacy settings
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Profile Visibility
                  </label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => setPrivacy({
                      ...privacy,
                      profileVisibility: e.target.value
                    })}
                    className="cosmic-input w-full"
                  >
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                    <option value="public">Public</option>
                  </select>
                </div>

                {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="text-starlight-white font-semibold capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-stellar-gray-light text-sm">
                        {key === 'dataSharing' && 'Share anonymous data for app improvement'}
                        {key === 'analytics' && 'Help us improve with usage analytics'}
                        {key === 'crashReports' && 'Send crash reports to help fix issues'}
                      </div>
                    </div>
                    <button
                      onClick={() => setPrivacy({
                        ...privacy,
                        [key]: !value
                      })}
                      className={`w-12 h-6 rounded-full transition-all ${
                        value ? 'bg-aurora-green' : 'bg-cosmic-navy'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Account Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-stellar-pink/20 rounded-2xl">
                  <User className="w-6 h-6 text-stellar-pink" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Account
                  </h2>
                  <p className="text-stellar-gray-light">
                    Manage your account settings
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full p-4 bg-cosmic-navy border border-electric-violet text-electric-violet rounded-xl hover:bg-electric-violet hover:text-white transition-all flex items-center space-x-3">
                  <User className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>

                <button className="w-full p-4 bg-cosmic-navy border border-supernova-gold text-supernova-gold rounded-xl hover:bg-supernova-gold hover:text-deep-space transition-all flex items-center space-x-3">
                  <CreditCard className="w-5 h-5" />
                  <span>Manage Subscription</span>
                </button>

                <button className="w-full p-4 bg-cosmic-navy border border-nebula-red text-nebula-red rounded-xl hover:bg-nebula-red hover:text-white transition-all flex items-center space-x-3">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>

            {/* Help & Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-celestial-blue/20 rounded-2xl">
                  <HelpCircle className="w-6 h-6 text-celestial-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Help & Support
                  </h2>
                  <p className="text-stellar-gray-light">
                    Get help and learn more about the app
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full p-4 bg-cosmic-navy border border-celestial-blue text-celestial-blue rounded-xl hover:bg-celestial-blue hover:text-deep-space transition-all flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5" />
                  <span>Help Center</span>
                </button>

                <button className="w-full p-4 bg-cosmic-navy border border-electric-violet text-electric-violet rounded-xl hover:bg-electric-violet hover:text-white transition-all flex items-center space-x-3">
                  <Info className="w-5 h-5" />
                  <span>About Daily Secrets</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
