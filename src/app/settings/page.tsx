'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, User, Globe, Bell, Shield, Download, Trash2, Moon, Sun, Languages, Palette, Database, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface UserSettings {
  language: string
  theme: 'light' | 'dark' | 'auto'
  notifications: {
    daily: boolean
    transits: boolean
    community: boolean
    system: boolean
  }
  privacy: {
    profileVisible: boolean
    dataSharing: boolean
    analytics: boolean
  }
  astrology: {
    system: 'western' | 'vedic' | 'chinese' | 'hybrid'
    houseSystem: 'whole' | 'placidus' | 'equal'
    ayanamsa: 'lahiri' | 'raman' | 'krishnamurti'
  }
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    language: 'en',
    theme: 'auto',
    notifications: {
      daily: true,
      transits: true,
      community: true,
      system: true
    },
    privacy: {
      profileVisible: true,
      dataSharing: false,
      analytics: true
    },
    astrology: {
      system: 'western',
      houseSystem: 'whole',
      ayanamsa: 'lahiri'
    }
  })

  const [activeTab, setActiveTab] = useState<'general' | 'privacy' | 'astrology' | 'data'>('general')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }

  const saveSettings = (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem('userSettings', JSON.stringify(updatedSettings))
    toast.success('Settings saved')
  }

  const handleDataExport = async () => {
    try {
      const userData = localStorage.getItem('userData')
      const dreams = localStorage.getItem('dreams')
      const settings = localStorage.getItem('userSettings')
      
      const exportData = {
        userData: userData ? JSON.parse(userData) : null,
        dreams: dreams ? JSON.parse(dreams) : [],
        settings: settings ? JSON.parse(settings) : null,
        exportDate: new Date().toISOString()
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `daily-secrets-data-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      
      toast.success('Data exported successfully')
    } catch (error) {
      toast.error('Failed to export data')
    }
  }

  const handleDataDelete = async () => {
    try {
      // Clear all user data
      localStorage.removeItem('userData')
      localStorage.removeItem('dreams')
      localStorage.removeItem('userSettings')
      localStorage.removeItem('onboardingComplete')
      localStorage.removeItem('walletBalance')
      
      toast.success('All data deleted successfully')
      window.location.href = '/onboarding'
    } catch (error) {
      toast.error('Failed to delete data')
    }
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'astrology', label: 'Astrology', icon: Globe },
    { id: 'data', label: 'Data', icon: Database }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-8"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-primary flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            Settings
          </h1>
          <p className="text-gray-600 mt-2">Customize your cosmic experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-violet-100 text-violet-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        General Settings
                      </h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select
                            value={settings.language}
                            onChange={(e) => saveSettings({ language: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                          >
                            {languages.map((lang) => (
                              <option key={lang.code} value={lang.code}>
                                {lang.flag} {lang.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Theme
                          </label>
                          <div className="flex space-x-4">
                            {[
                              { value: 'light', label: 'Light', icon: Sun },
                              { value: 'dark', label: 'Dark', icon: Moon },
                              { value: 'auto', label: 'Auto', icon: Palette }
                            ].map((theme) => {
                              const Icon = theme.icon
                              return (
                                <button
                                  key={theme.value}
                                  onClick={() => saveSettings({ theme: theme.value as any })}
                                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                                    settings.theme === theme.value
                                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span>{theme.label}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notifications
                      </h2>
                      
                      <div className="space-y-4">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, ' $1')}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {key === 'daily' && 'Get your daily cosmic insights'}
                                {key === 'transits' && 'Important planetary transits'}
                                {key === 'community' && 'Messages and connections'}
                                {key === 'system' && 'App updates and reminders'}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => saveSettings({
                                  notifications: {
                                    ...settings.notifications,
                                    [key]: e.target.checked
                                  }
                                })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Privacy & Security
                      </h2>
                      
                      <div className="space-y-4">
                        {Object.entries(settings.privacy).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, ' $1')}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {key === 'profileVisible' && 'Make your profile discoverable by others'}
                                {key === 'dataSharing' && 'Share anonymous data to improve the app'}
                                {key === 'analytics' && 'Help us understand how you use the app'}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => saveSettings({
                                  privacy: {
                                    ...settings.privacy,
                                    [key]: e.target.checked
                                  }
                                })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'astrology' && (
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Astrology Preferences
                      </h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Astrology System
                          </label>
                          <select
                            value={settings.astrology.system}
                            onChange={(e) => saveSettings({
                              astrology: {
                                ...settings.astrology,
                                system: e.target.value as any
                              }
                            })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                          >
                            <option value="western">Western Astrology</option>
                            <option value="vedic">Vedic Astrology</option>
                            <option value="chinese">Chinese Astrology</option>
                            <option value="hybrid">Hybrid System</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            House System
                          </label>
                          <select
                            value={settings.astrology.houseSystem}
                            onChange={(e) => saveSettings({
                              astrology: {
                                ...settings.astrology,
                                houseSystem: e.target.value as any
                              }
                            })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                          >
                            <option value="whole">Whole Sign</option>
                            <option value="placidus">Placidus</option>
                            <option value="equal">Equal House</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ayanamsa (Sidereal)
                          </label>
                          <select
                            value={settings.astrology.ayanamsa}
                            onChange={(e) => saveSettings({
                              astrology: {
                                ...settings.astrology,
                                ayanamsa: e.target.value as any
                              }
                            })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                          >
                            <option value="lahiri">Lahiri</option>
                            <option value="raman">Raman</option>
                            <option value="krishnamurti">Krishnamurti</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'data' && (
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2" />
                        Data Management
                      </h2>
                      
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Export Your Data</h4>
                            <p className="text-sm text-gray-600">Download all your data in JSON format</p>
                          </div>
                          <button
                            onClick={handleDataExport}
                            className="btn btn-secondary flex items-center"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Delete All Data</h4>
                            <p className="text-sm text-gray-600">Permanently delete all your data and start over</p>
                          </div>
                          <button
                            onClick={() => setShowDeleteModal(true)}
                            className="btn btn-danger flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && (
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Delete All Data
                </h3>
                <p className="text-gray-600 mb-6">
                  This action cannot be undone. All your data including dreams, settings, and profile will be permanently deleted.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false)
                      handleDataDelete()
                    }}
                    className="btn btn-danger flex-1"
                  >
                    Delete All Data
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