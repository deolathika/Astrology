/**
 * Settings Page
 * User preferences, profile management, and account settings
 */

'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/stores/app-store'
import { useUserSettings, useUpdateSettings } from '@/lib/hooks/use-api'
import Button from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Input } from '@/components/atoms/Input'
import Navigation from '@/components/organisms/Navigation'
import { trackFeatureUsage } from '@/lib/monitoring/analytics'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const user = useAppStore((state) => state.user)
  const profile = useAppStore((state) => state.profile)
  
  const { data: settings, isLoading } = useUserSettings(user?.id || '')
  const updateSettings = useUpdateSettings()

  useEffect(() => {
    if (user) {
      trackFeatureUsage('settings_page_view', user.id)
    }
  }, [user])

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'account', label: 'Account', icon: '🛡️' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access settings</h1>
          <Button onClick={() => window.location.href = '/auth/signin'}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="lg:pl-64">
        <div className="p-6">
          {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Settings ⚙️
          </h1>
            <p className="text-muted-foreground">
              Manage your account, preferences, and privacy settings.
            </p>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4">
              <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-6">
                {activeTab === 'profile' && (
                  <ProfileTab 
                    user={user} 
                    profile={profile} 
                    loading={isLoading}
                  />
                )}
                
                {activeTab === 'preferences' && (
                  <PreferencesTab 
                    settings={settings} 
                    loading={isLoading}
                    onUpdate={updateSettings.mutate}
                  />
                )}
                
                {activeTab === 'notifications' && (
                  <NotificationsTab 
                    settings={settings} 
                    loading={isLoading}
                    onUpdate={updateSettings.mutate}
                  />
                )}

                {activeTab === 'privacy' && (
                  <PrivacyTab 
                    settings={settings} 
                    loading={isLoading}
                    onUpdate={updateSettings.mutate}
                  />
                )}
                
                {activeTab === 'account' && (
                  <AccountTab 
                    user={user} 
                    loading={isLoading}
                  />
                )}
                          </div>
                      </div>
                    </div>
                  </div>
      </main>
    </div>
  )
}

function ProfileTab({ user, profile, loading }: any) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    birthDate: profile?.birthDate || '',
    birthTime: profile?.birthTime || '',
    placeLabel: profile?.placeLabel || '',
    systemPref: profile?.systemPref || 'western'
  })

  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
                      <div className="space-y-6">
                        <div>
        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
        <p className="text-muted-foreground mb-6">
          Update your personal information and cosmic preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
        />

        <Input
          label="Birth Date"
          type="date"
          value={formData.birthDate}
          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
        />

        <Input
          label="Birth Time"
          type="time"
          value={formData.birthTime}
          onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
        />

        <Input
          label="Birth Place"
          value={formData.placeLabel}
          onChange={(e) => setFormData({ ...formData, placeLabel: e.target.value })}
          placeholder="City, Country"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
                            Astrology System
                          </label>
                          <select
            value={formData.systemPref}
            onChange={(e) => setFormData({ ...formData, systemPref: e.target.value })}
            className="w-full p-2 border border-input rounded-md bg-background"
                          >
                            <option value="western">Western Astrology</option>
                            <option value="vedic">Vedic Astrology</option>
                            <option value="chinese">Chinese Astrology</option>
                            <option value="hybrid">Hybrid System</option>
                          </select>
                        </div>
      </div>

      <div className="flex gap-4">
        <Button>Save Changes</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}

function PreferencesTab({ settings, loading, onUpdate }: any) {
  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    units: 'imperial'
  })

  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        <p className="text-muted-foreground mb-6">
          Customize your experience and interface preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Theme
          </label>
          <select
            value={preferences.theme}
            onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
            className="w-full p-2 border border-input rounded-md bg-background"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Language
          </label>
          <select
            value={preferences.language}
            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
            className="w-full p-2 border border-input rounded-md bg-background"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

                        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Timezone
                          </label>
                          <select
            value={preferences.timezone}
            onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
            className="w-full p-2 border border-input rounded-md bg-background"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
                          </select>
                        </div>

                        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Date Format
                          </label>
                          <select
            value={preferences.dateFormat}
            onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
            className="w-full p-2 border border-input rounded-md bg-background"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>

      <div className="flex gap-4">
        <Button onClick={() => onUpdate(preferences)}>Save Preferences</Button>
        <Button variant="outline">Reset to Default</Button>
                    </div>
                  </div>
  )
}

function NotificationsTab({ settings, loading, onUpdate }: any) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    dailyInsights: true,
    newMatches: true,
    dreamReminders: false,
    astroEvents: true
  })

  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Notifications</h3>
        <p className="text-muted-foreground mb-6">
          Choose how you want to be notified about updates and insights.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-muted-foreground">Receive updates via email</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
            className="w-4 h-4"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Push Notifications</h4>
            <p className="text-sm text-muted-foreground">Get notified on your device</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.push}
            onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
            className="w-4 h-4"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">SMS Notifications</h4>
            <p className="text-sm text-muted-foreground">Receive text messages</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.sms}
            onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
            className="w-4 h-4"
          />
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-medium mb-4">Notification Types</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Daily Insights</h5>
                <p className="text-sm text-muted-foreground">Your daily horoscope and numerology</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.dailyInsights}
                onChange={(e) => setNotifications({ ...notifications, dailyInsights: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">New Matches</h5>
                <p className="text-sm text-muted-foreground">When someone compatible joins</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.newMatches}
                onChange={(e) => setNotifications({ ...notifications, newMatches: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Dream Reminders</h5>
                <p className="text-sm text-muted-foreground">Reminders to record your dreams</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.dreamReminders}
                onChange={(e) => setNotifications({ ...notifications, dreamReminders: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Astrological Events</h5>
                <p className="text-sm text-muted-foreground">Important planetary transits and events</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.astroEvents}
                onChange={(e) => setNotifications({ ...notifications, astroEvents: e.target.checked })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => onUpdate(notifications)}>Save Notifications</Button>
        <Button variant="outline">Test Notifications</Button>
      </div>
    </div>
  )
}

function PrivacyTab({ settings, loading, onUpdate }: any) {
  const [privacy, setPrivacy] = useState({
    profile: 'private',
    analytics: true,
    marketing: false,
    dataSharing: false,
    searchable: false
  })

  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
                  <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
        <p className="text-muted-foreground mb-6">
          Control your privacy and data sharing preferences.
        </p>
      </div>
                      
                      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-4">Profile Visibility</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                          <div>
                <h5 className="font-medium">Profile Privacy</h5>
                <p className="text-sm text-muted-foreground">Who can see your profile</p>
                          </div>
              <select
                value={privacy.profile}
                onChange={(e) => setPrivacy({ ...privacy, profile: e.target.value })}
                className="p-2 border border-input rounded-md bg-background"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Searchable Profile</h5>
                <p className="text-sm text-muted-foreground">Allow others to find you in searches</p>
              </div>
              <input
                type="checkbox"
                checked={privacy.searchable}
                onChange={(e) => setPrivacy({ ...privacy, searchable: e.target.checked })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="font-medium mb-4">Data & Analytics</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Analytics Tracking</h5>
                <p className="text-sm text-muted-foreground">Help improve our service with usage data</p>
              </div>
              <input
                type="checkbox"
                checked={privacy.analytics}
                onChange={(e) => setPrivacy({ ...privacy, analytics: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Marketing Communications</h5>
                <p className="text-sm text-muted-foreground">Receive promotional emails and updates</p>
              </div>
              <input
                type="checkbox"
                checked={privacy.marketing}
                onChange={(e) => setPrivacy({ ...privacy, marketing: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Data Sharing</h5>
                <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
              </div>
              <input
                type="checkbox"
                checked={privacy.dataSharing}
                onChange={(e) => setPrivacy({ ...privacy, dataSharing: e.target.checked })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => onUpdate(privacy)}>Save Privacy Settings</Button>
        <Button variant="outline">Download My Data</Button>
      </div>
    </div>
  )
}

function AccountTab({ user, loading }: any) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (loading) {
    return <div className="skeleton h-64 rounded-lg" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Account Management</h3>
        <p className="text-muted-foreground mb-6">
          Manage your account security and data.
        </p>
                        </div>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold mb-4">Account Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-2">
                <Input value={user?.email} disabled />
                <Button variant="outline" size="sm">Change</Button>
              </div>
                          </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Account Status
              </label>
              <div className="flex items-center gap-2">
                <Badge variant="success">Active</Badge>
                <span className="text-sm text-muted-foreground">
                  Member since {new Date(user?.createdAt).toLocaleDateString()}
                </span>
                        </div>
                      </div>
                    </div>
                  </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold mb-4">Security</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Password</h5>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Two-Factor Authentication</h5>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold mb-4">Data & Privacy</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Download My Data</h5>
                <p className="text-sm text-muted-foreground">Get a copy of all your data</p>
              </div>
              <Button variant="outline">Download</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Delete Account</h5>
                <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Delete Account</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <Button variant="destructive">Yes, Delete</Button>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                    Cancel
              </Button>
            </div>
          </div>
                </div>
          )}
    </div>
  )
}