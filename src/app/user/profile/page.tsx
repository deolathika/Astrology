'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import UserFeaturesDashboard from '@/components/user/UserFeaturesDashboard'
import UserFlowDashboard from '@/components/user-flows/UserFlowDashboard'

export default function UserProfile() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      // Allow all authenticated users to access profile
      setUser(userData)
    } else {
      router.push('/')
    }
  }, [router])

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center cosmic-minimalist-modern-bg">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'dashboard', name: 'Main', icon: '🏠' },
    { id: 'insights', name: 'Daily Insights', icon: '🌟' },
    { id: 'numerology', name: 'Numerology', icon: '🔢' },
    { id: 'zodiac', name: 'Zodiac', icon: '♈' },
    { id: 'compatibility', name: 'Compatibility', icon: '💕' },
    { id: 'community', name: 'Community', icon: '👥' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  return (
    <div className="min-h-screen cosmic-minimalist-modern-bg">
      {/* Navigation */}
      <nav className="cosmic-nav-minimalist-modern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/main" className="logo">
                Daily Secrets
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Welcome, {user.name || user.email}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  router.push('/')
                }}
                className="cosmic-btn-minimalist-modern"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name || 'User'}</h1>
                <p className="text-white/80">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    Free User
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="cosmic-card-minimalist-modern mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Welcome to Your Cosmic Dashboard</h2>
                
                {/* User Info Card */}
                <div className="cosmic-card-minimalist-modern max-w-2xl mx-auto mb-8">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.image || '/default-avatar.png'}
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full border-2 border-white/30"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{user.name || user.email}</h3>
                      <p className="text-white/80">Role: {user.role}</p>
                      {user.profile?.birthDate && (
                        <p className="text-white/60">
                          Born: {new Date(user.profile.birthDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role-specific Dashboard */}
                <UserFlowDashboard user={user} />
              </div>
            )}

            {activeTab === 'insights' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Daily Cosmic Insights</h2>
                <UserFeaturesDashboard user={user} />
              </div>
            )}

            {activeTab === 'numerology' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Numerology Analysis</h2>
                <UserFeaturesDashboard user={user} />
              </div>
            )}

            {activeTab === 'zodiac' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Zodiac Information</h2>
                <UserFeaturesDashboard user={user} />
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Compatibility Check</h2>
                <UserFeaturesDashboard user={user} />
              </div>
            )}

            {activeTab === 'community' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Community Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="cosmic-card-minimalist-modern">
                    <h3 className="card-title">Community Chat</h3>
                    <p className="card-text">Connect with other cosmic enthusiasts and share experiences.</p>
                    <Link href="/community" className="cosmic-btn-minimalist-modern w-full mt-4 inline-block text-center">
                      Join Community Chat
                    </Link>
                  </div>
                  <div className="cosmic-card-minimalist-modern">
                    <h3 className="card-title">Knowledge Base</h3>
                    <p className="card-text">Learn about astrology, numerology, and cosmic wisdom.</p>
                    <Link href="/knowledge" className="cosmic-btn-minimalist-modern w-full mt-4 inline-block text-center">
                      Explore Knowledge Base
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="cosmic-card-minimalist-modern">
                    <h3 className="card-title">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Name</label>
                        <input type="text" defaultValue={user.name} className="cosmic-input-minimalist-modern w-full" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Email</label>
                        <input type="email" defaultValue={user.email} className="cosmic-input-minimalist-modern w-full" />
                      </div>
                      <button className="cosmic-btn-minimalist-modern w-full">
                        Update Profile
                      </button>
                    </div>
                  </div>
                  <div className="cosmic-card-minimalist-modern">
                    <h3 className="card-title">Notification Settings</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-white/80">Daily insights notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-white/80">Community updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-white/80">Marketing emails</span>
                      </label>
                      <button className="cosmic-btn-minimalist-modern w-full">
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
