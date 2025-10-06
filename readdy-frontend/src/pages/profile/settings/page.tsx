import { useState } from 'react';
import Navigation from '../../../components/feature/Navigation';
import StarfieldBackground from '../../../components/feature/StarfieldBackground';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function ProfileSettings() {
  const [userRole, setUserRole] = useState<'guest' | 'free' | 'premium' | 'admin'>('free');
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    marketingEmails: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    showBirthday: true,
    showLocation: false,
    allowMessages: true,
    
    // Cosmic Settings
    defaultAstrologySystem: 'western',
    autoCalculateCompatibility: true,
    dreamAnalysisReminders: true,
    dailyHoroscopeTime: '08:00',
    
    // Display Settings
    theme: 'dark',
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingsTabs = [
    { id: 'general', label: 'General', icon: 'ri-settings-4-line' },
    { id: 'privacy', label: 'Privacy', icon: 'ri-shield-user-line' },
    { id: 'cosmic', label: 'Cosmic', icon: 'ri-star-line' },
    { id: 'display', label: 'Display', icon: 'ri-palette-line' },
    { id: 'account', label: 'Account', icon: 'ri-user-settings-line' }
  ];

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Customize your cosmic experience and manage your preferences
              </p>
            </div>
          </div>
        </section>

        {/* Settings Navigation */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1 overflow-x-auto">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Settings Content */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* General Settings */}
            {activeTab === 'general' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Email Notifications</h3>
                      <p className="text-gray-400 text-sm">Receive important updates via email</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.emailNotifications ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Push Notifications</h3>
                      <p className="text-gray-400 text-sm">Get instant notifications on your device</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.pushNotifications ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Weekly Digest</h3>
                      <p className="text-gray-400 text-sm">Receive a summary of your cosmic week</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('weeklyDigest', !settings.weeklyDigest)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.weeklyDigest ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Marketing Emails</h3>
                      <p className="text-gray-400 text-sm">Receive promotional content and offers</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('marketingEmails', !settings.marketingEmails)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.marketingEmails ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-2">Profile Visibility</h3>
                    <p className="text-gray-400 text-sm mb-3">Control who can see your profile</p>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                    >
                      <option value="public" className="bg-gray-800">Public</option>
                      <option value="friends" className="bg-gray-800">Friends Only</option>
                      <option value="private" className="bg-gray-800">Private</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Show Birthday</h3>
                      <p className="text-gray-400 text-sm">Display your birthday on your profile</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('showBirthday', !settings.showBirthday)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.showBirthday ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showBirthday ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Show Location</h3>
                      <p className="text-gray-400 text-sm">Display your location on your profile</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('showLocation', !settings.showLocation)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.showLocation ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showLocation ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Allow Messages</h3>
                      <p className="text-gray-400 text-sm">Let other users send you messages</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('allowMessages', !settings.allowMessages)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.allowMessages ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.allowMessages ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Cosmic Settings */}
            {activeTab === 'cosmic' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Cosmic Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-2">Default Astrology System</h3>
                    <p className="text-gray-400 text-sm mb-3">Choose your preferred astrology system</p>
                    <select
                      value={settings.defaultAstrologySystem}
                      onChange={(e) => handleSettingChange('defaultAstrologySystem', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                    >
                      <option value="western" className="bg-gray-800">Western</option>
                      <option value="vedic" className="bg-gray-800">Vedic</option>
                      <option value="chinese" className="bg-gray-800">Chinese</option>
                      <option value="sri-lankan" className="bg-gray-800">Sri Lankan</option>
                      <option value="hybrid" className="bg-gray-800">Hybrid AI</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-2">Daily Horoscope Time</h3>
                    <p className="text-gray-400 text-sm mb-3">When to receive your daily horoscope</p>
                    <input
                      type="time"
                      value={settings.dailyHoroscopeTime}
                      onChange={(e) => handleSettingChange('dailyHoroscopeTime', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Auto Calculate Compatibility</h3>
                      <p className="text-gray-400 text-sm">Automatically check compatibility with new connections</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('autoCalculateCompatibility', !settings.autoCalculateCompatibility)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.autoCalculateCompatibility ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoCalculateCompatibility ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Dream Analysis Reminders</h3>
                      <p className="text-gray-400 text-sm">Get reminded to analyze your dreams</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('dreamAnalysisReminders', !settings.dreamAnalysisReminders)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.dreamAnalysisReminders ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.dreamAnalysisReminders ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Display Settings */}
            {activeTab === 'display' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Display Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-2">Theme</h3>
                    <p className="text-gray-400 text-sm mb-3">Choose your preferred theme</p>
                    <select
                      value={settings.theme}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                    >
                      <option value="dark" className="bg-gray-800">Dark</option>
                      <option value="light" className="bg-gray-800">Light</option>
                      <option value="auto" className="bg-gray-800">Auto</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-2">Language</h3>
                    <p className="text-gray-400 text-sm mb-3">Select your preferred language</p>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                    >
                      <option value="en" className="bg-gray-800">English</option>
                      <option value="es" className="bg-gray-800">Spanish</option>
                      <option value="fr" className="bg-gray-800">French</option>
                      <option value="de" className="bg-gray-800">German</option>
                      <option value="it" className="bg-gray-800">Italian</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-2">Timezone</h3>
                    <p className="text-gray-400 text-sm mb-3">Set your local timezone</p>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                    >
                      <option value="UTC-12" className="bg-gray-800">UTC-12</option>
                      <option value="UTC-8" className="bg-gray-800">UTC-8 (PST)</option>
                      <option value="UTC-5" className="bg-gray-800">UTC-5 (EST)</option>
                      <option value="UTC+0" className="bg-gray-800">UTC+0 (GMT)</option>
                      <option value="UTC+1" className="bg-gray-800">UTC+1 (CET)</option>
                      <option value="UTC+8" className="bg-gray-800">UTC+8 (CST)</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-2">Date Format</h3>
                    <p className="text-gray-400 text-sm mb-3">Choose how dates are displayed</p>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                    >
                      <option value="MM/DD/YYYY" className="bg-gray-800">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY" className="bg-gray-800">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD" className="bg-gray-800">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </Card>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-2">Change Password</h3>
                    <p className="text-gray-400 text-sm mb-4">Update your account password</p>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button variant="primary" size="sm">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-white font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                    <Button variant="secondary" size="sm">
                      <i className="ri-shield-check-line mr-2"></i>
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-red-400 font-medium mb-2">Danger Zone</h3>
                    <p className="text-gray-400 text-sm mb-4">Irreversible and destructive actions</p>
                    <div className="space-y-3">
                      <Button variant="ghost" size="sm" className="text-red-400 border-red-400 hover:bg-red-400/10">
                        <i className="ri-download-line mr-2"></i>
                        Export Data
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 border-red-400 hover:bg-red-400/10">
                        <i className="ri-delete-bin-line mr-2"></i>
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Save Button */}
            <div className="mt-8 text-center">
              <Button variant="cosmic" size="lg" className="px-12">
                <i className="ri-save-line mr-2"></i>
                Save All Changes
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}