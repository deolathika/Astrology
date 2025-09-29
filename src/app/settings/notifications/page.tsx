'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CosmicNavigation } from '@/components/cosmic-navigation'
import { BellOff, Shield, Bell, Calendar, Settings } from 'lucide-react'
const notificationTypes = [
  {
    id: 'daily_guidance',
    name: 'Daily Guidance',
    description: 'Get your personalized cosmic insights every day',
    icon: Star,
    enabled: true,
    frequency: 'daily'
  },
  {
    id: 'dream_alerts',
    name: 'Dream Alerts',
    description: 'Notifications about dream interpretation insights',
    icon: Moon,
    enabled: true,
    frequency: 'as_needed'
  },
  {
    id: 'compatibility_updates',
    name: 'Compatibility Updates',
    description: 'Relationship compatibility insights and updates',
    icon: Heart,
    enabled: false,
    frequency: 'weekly'
  },
  {
    id: 'cosmic_events',
    name: 'Cosmic Events',
    description: 'Special cosmic events, transits, and planetary movements',
    icon: Zap,
    enabled: true,
    frequency: 'as_needed'
  },
  {
    id: 'push_notifications',
    name: 'Push Notifications',
    description: 'Real-time notifications on your device',
    icon: Smartphone,
    enabled: true,
    frequency: 'immediate'
  },
  {
    id: 'email_notifications',
    name: 'Email Notifications',
    description: 'Weekly digest and important updates via email',
    icon: Mail,
    enabled: false,
    frequency: 'weekly'
  }
]

const frequencyOptions = [
  { value: 'immediate', label: 'Immediate', description: 'Get notified right away' },
  { value: 'daily', label: 'Daily', description: 'Once per day' },
  { value: 'weekly', label: 'Weekly', description: 'Once per week' },
  { value: 'as_needed', label: 'As Needed', description: 'Only for important updates' }
]

export default function NotificationsSettingsPage() {
  const [notifications, setNotifications] = useState(notificationTypes)
  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: '22:00',
    end: '08:00'
  })

  const handleToggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, enabled: !notif.enabled }
          : notif
      )
    )
  }

  const handleFrequencyChange = (id: string, frequency: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, frequency }
          : notif
      )
    )
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
              Notification Settings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light"
            >
              Customize how and when you receive cosmic insights
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Notification Types */}
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
                    Notification Types
                  </h2>
                  <p className="text-stellar-gray-light">
                    Choose which notifications you want to receive
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {notifications.map((notification, index) => {
                  const Icon = notification.icon
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-6 bg-cosmic-navy/50 rounded-xl border border-electric-violet/20"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl ${
                            notification.enabled 
                              ? 'bg-electric-violet/20' 
                              : 'bg-stellar-gray/20'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              notification.enabled 
                                ? 'text-electric-violet' 
                                : 'text-stellar-gray'
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-starlight-white">
                              {notification.name}
                            </h3>
                            <p className="text-stellar-gray-light text-sm">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleToggleNotification(notification.id)}
                          className={`w-12 h-6 rounded-full transition-all ${
                            notification.enabled ? 'bg-electric-violet' : 'bg-cosmic-navy'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            notification.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      {notification.enabled && (
                        <div className="mt-4">
                          <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                            Frequency
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {frequencyOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleFrequencyChange(notification.id, option.value)}
                                className={`p-3 rounded-xl border transition-all text-left ${
                                  notification.frequency === option.value
                                    ? 'border-electric-violet bg-electric-violet/20 text-electric-violet'
                                    : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                                }`}
                              >
                                <div className="font-semibold text-sm">{option.label}</div>
                                <div className="text-xs opacity-75">{option.description}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Quiet Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-supernova-gold/20 rounded-2xl">
                  <Calendar className="w-6 h-6 text-supernova-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Quiet Hours
                  </h2>
                  <p className="text-stellar-gray-light">
                    Set times when you don't want to receive notifications
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-starlight-white">
                      Enable Quiet Hours
                    </h3>
                    <p className="text-stellar-gray-light text-sm">
                      Pause notifications during your sleep time
                    </p>
                  </div>
                  <button
                    onClick={() => setQuietHours({...quietHours, enabled: !quietHours.enabled})}
                    className={`w-12 h-6 rounded-full transition-all ${
                      quietHours.enabled ? 'bg-supernova-gold' : 'bg-cosmic-navy'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      quietHours.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {quietHours.enabled && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={quietHours.start}
                        onChange={(e) => setQuietHours({...quietHours, start: e.target.value})}
                        className="cosmic-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={quietHours.end}
                        onChange={(e) => setQuietHours({...quietHours, end: e.target.value})}
                        className="cosmic-input w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-aurora-green/20 rounded-2xl">
                  <Settings className="w-6 h-6 text-aurora-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Advanced Settings
                  </h2>
                  <p className="text-stellar-gray-light">
                    Fine-tune your notification experience
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-starlight-white">
                      Sound Notifications
                    </h3>
                    <p className="text-stellar-gray-light text-sm">
                      Play sounds for notifications
                    </p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-electric-violet">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-starlight-white">
                      Vibration
                    </h3>
                    <p className="text-stellar-gray-light text-sm">
                      Vibrate for mobile notifications
                    </p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-electric-violet">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-starlight-white">
                      Badge Count
                    </h3>
                    <p className="text-stellar-gray-light text-sm">
                      Show notification count on app icon
                    </p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-electric-violet">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-center"
            >
              <button className="cosmic-button px-8 py-4 text-lg">
                Save Notification Settings
              </button>
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
