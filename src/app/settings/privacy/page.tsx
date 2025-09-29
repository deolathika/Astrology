'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  Database,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'

const privacySettings = [
  {
    id: 'profile_visibility',
    name: 'Profile Visibility',
    description: 'Control who can see your cosmic profile',
    options: [
      { value: 'private', label: 'Private', description: 'Only you can see your profile' },
      { value: 'friends', label: 'Friends Only', description: 'Only your cosmic friends can see' },
      { value: 'public', label: 'Public', description: 'Everyone can see your profile' }
    ],
    current: 'private'
  },
  {
    id: 'data_sharing',
    name: 'Data Sharing',
    description: 'Allow anonymous data sharing for app improvement',
    enabled: false
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Help us improve with usage analytics',
    enabled: true
  },
  {
    id: 'crash_reports',
    name: 'Crash Reports',
    description: 'Send crash reports to help fix issues',
    enabled: true
  }
]

const dataTypes = [
  {
    name: 'Personal Information',
    description: 'Name, email, birth details',
    retention: 'Until account deletion',
    icon: Lock
  },
  {
    name: 'Astrology Data',
    description: 'Birth charts, readings, calculations',
    retention: 'Until account deletion',
    icon: Database
  },
  {
    name: 'Dream Records',
    description: 'Dream journals and interpretations',
    retention: 'Until account deletion',
    icon: Eye
  },
  {
    name: 'Usage Analytics',
    description: 'App usage patterns and preferences',
    retention: '2 years',
    icon: Settings
  }
]

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState(privacySettings)
  const [showDataExport, setShowDataExport] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)

  const handleSettingChange = (id: string, value: any) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, current: value, enabled: value }
          : setting
      )
    )
  }

  const handleDataExport = () => {
    setShowDataExport(true)
    // Implement data export logic
    console.log('Exporting user data...')
  }

  const handleDeleteAccount = () => {
    setShowDeleteAccount(true)
    // Implement account deletion logic
    console.log('Deleting account...')
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
              Privacy & Security
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light"
            >
              Control your data and privacy settings
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Privacy Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-aurora-green/20 rounded-2xl">
                  <Shield className="w-6 h-6 text-aurora-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Privacy Controls
                  </h2>
                  <p className="text-stellar-gray-light">
                    Manage your privacy and data sharing preferences
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {settings.map((setting, index) => (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="p-6 bg-cosmic-navy/50 rounded-xl border border-electric-violet/20"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-starlight-white mb-2">
                        {setting.name}
                      </h3>
                      <p className="text-stellar-gray-light text-sm">
                        {setting.description}
                      </p>
                    </div>

                    {setting.options ? (
                      <div className="grid md:grid-cols-3 gap-3">
                        {setting.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSettingChange(setting.id, option.value)}
                            className={`p-4 rounded-xl border transition-all text-left ${
                              setting.current === option.value
                                ? 'border-aurora-green bg-aurora-green/20 text-aurora-green'
                                : 'border-electric-violet/30 text-stellar-gray-light hover:border-electric-violet hover:text-electric-violet'
                            }`}
                          >
                            <div className="font-semibold text-sm mb-1">{option.label}</div>
                            <div className="text-xs opacity-75">{option.description}</div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-starlight-white">Enable</span>
                        <button
                          onClick={() => handleSettingChange(setting.id, !setting.enabled)}
                          className={`w-12 h-6 rounded-full transition-all ${
                            setting.enabled ? 'bg-aurora-green' : 'bg-cosmic-navy'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Data Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-electric-violet/20 rounded-2xl">
                  <Database className="w-6 h-6 text-electric-violet" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Your Data
                  </h2>
                  <p className="text-stellar-gray-light">
                    Information we collect and how long we keep it
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {dataTypes.map((dataType, index) => {
                  const Icon = dataType.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 bg-cosmic-navy/50 rounded-xl border border-electric-violet/20"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-electric-violet/20 rounded-lg">
                          <Icon className="w-5 h-5 text-electric-violet" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-starlight-white font-semibold">
                            {dataType.name}
                          </h3>
                          <p className="text-stellar-gray-light text-sm">
                            {dataType.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-stellar-gray-light text-sm">
                            Retention: {dataType.retention}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Data Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-supernova-gold/20 rounded-2xl">
                  <Download className="w-6 h-6 text-supernova-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Data Management
                  </h2>
                  <p className="text-stellar-gray-light">
                    Export or delete your cosmic data
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={handleDataExport}
                  className="p-6 bg-cosmic-navy/50 border border-supernova-gold/30 text-supernova-gold rounded-xl hover:bg-supernova-gold/10 transition-all text-left"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Download className="w-6 h-6" />
                    <h3 className="text-lg font-semibold">Export Data</h3>
                  </div>
                  <p className="text-stellar-gray-light text-sm">
                    Download all your cosmic data in a portable format
                  </p>
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className="p-6 bg-cosmic-navy/50 border border-nebula-red/30 text-nebula-red rounded-xl hover:bg-nebula-red/10 transition-all text-left"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Trash2 className="w-6 h-6" />
                    <h3 className="text-lg font-semibold">Delete Account</h3>
                  </div>
                  <p className="text-stellar-gray-light text-sm">
                    Permanently delete your account and all data
                  </p>
                </button>
              </div>
            </motion.div>

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="cosmic-card"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-stellar-pink/20 rounded-2xl">
                  <Lock className="w-6 h-6 text-stellar-pink" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-starlight-white">
                    Security Features
                  </h2>
                  <p className="text-stellar-gray-light">
                    Additional security measures for your account
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-cosmic-navy/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-aurora-green" />
                    <div>
                      <h3 className="text-starlight-white font-semibold">
                        End-to-End Encryption
                      </h3>
                      <p className="text-stellar-gray-light text-sm">
                        Your cosmic data is encrypted and secure
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-cosmic-navy/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-aurora-green" />
                    <div>
                      <h3 className="text-starlight-white font-semibold">
                        Secure Authentication
                      </h3>
                      <p className="text-stellar-gray-light text-sm">
                        Multi-factor authentication available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-cosmic-navy/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-aurora-green" />
                    <div>
                      <h3 className="text-starlight-white font-semibold">
                        Regular Security Audits
                      </h3>
                      <p className="text-stellar-gray-light text-sm">
                        We regularly audit our security measures
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <button className="cosmic-button px-8 py-4 text-lg">
                Save Privacy Settings
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
