'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const adminStats = {
    totalUsers: 1247,
    premiumUsers: 342,
    totalRevenue: 12847,
    monthlyRevenue: 3247,
    activeSystems: 8,
    totalReadings: 15623
  }

  const recentUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', signupDate: '2024-01-15', status: 'Premium' },
    { id: 2, name: 'Mike Chen', email: 'mike@example.com', signupDate: '2024-01-14', status: 'Guest' },
    { id: 3, name: 'Emma Wilson', email: 'emma@example.com', signupDate: '2024-01-13', status: 'Premium' },
    { id: 4, name: 'David Brown', email: 'david@example.com', signupDate: '2024-01-12', status: 'Guest' },
    { id: 5, name: 'Lisa Garcia', email: 'lisa@example.com', signupDate: '2024-01-11', status: 'Premium' }
  ]

  const systemStatus = [
    { name: 'Western Astrology', status: 'Active', accuracy: '94%', users: 1247 },
    { name: 'Vedic Astrology', status: 'Active', accuracy: '96%', users: 892 },
    { name: 'Chinese Astrology', status: 'Active', accuracy: '92%', users: 654 },
    { name: 'Sri Lankan Astrology', status: 'Active', accuracy: '95%', users: 423 },
    { name: 'Arabic Astrology', status: 'Active', accuracy: '93%', users: 312 },
    { name: 'Mayan Astrology', status: 'Active', accuracy: '91%', users: 287 },
    { name: 'Celtic Astrology', status: 'Active', accuracy: '89%', users: 198 },
    { name: 'Hybrid AI System', status: 'Active', accuracy: '98%', users: 156 }
  ]

  return (
    <div className="min-h-screen relative main-content">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic">
              Admin Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Manage your Daily Secrets application with comprehensive admin tools.
            </p>
          </div>
        </section>

        {/* Admin Navigation */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6 cosmic-glow">
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                  { id: 'users', name: 'Users', icon: '👥' },
                  { id: 'systems', name: 'Systems', icon: '⚙️' },
                  { id: 'analytics', name: 'Analytics', icon: '📈' },
                  { id: 'settings', name: 'Settings', icon: '⚙️' },
                  { id: 'theme', name: 'Theme', icon: '🎨' }
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'cosmic' : 'secondary'}
                    size="lg"
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-2xl font-bold mb-2 text-cosmic">{adminStats.totalUsers.toLocaleString()}</h3>
                  <p className="text-gray-300">Total Users</p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-4xl mb-4">👑</div>
                  <h3 className="text-2xl font-bold mb-2 text-cosmic">{adminStats.premiumUsers.toLocaleString()}</h3>
                  <p className="text-gray-300">Premium Users</p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-2xl font-bold mb-2 text-cosmic">${adminStats.totalRevenue.toLocaleString()}</h3>
                  <p className="text-gray-300">Total Revenue</p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-2xl font-bold mb-2 text-cosmic">${adminStats.monthlyRevenue.toLocaleString()}</h3>
                  <p className="text-gray-300">Monthly Revenue</p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-4xl mb-4">⚙️</div>
                  <h3 className="text-2xl font-bold mb-2 text-cosmic">{adminStats.activeSystems}</h3>
                  <p className="text-gray-300">Active Systems</p>
                </Card>

                <Card className="p-6 text-center cosmic-glow">
                  <div className="text-4xl mb-4">🔮</div>
                  <h3 className="text-2xl font-bold mb-2 text-cosmic">{adminStats.totalReadings.toLocaleString()}</h3>
                  <p className="text-gray-300">Total Readings</p>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">User Management</h2>
              
              <Card className="p-8 cosmic-glow">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-4 px-2">Name</th>
                        <th className="text-left py-4 px-2">Email</th>
                        <th className="text-left py-4 px-2">Signup Date</th>
                        <th className="text-left py-4 px-2">Status</th>
                        <th className="text-left py-4 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-white/10">
                          <td className="py-4 px-2 font-semibold">{user.name}</td>
                          <td className="py-4 px-2 text-gray-300">{user.email}</td>
                          <td className="py-4 px-2 text-gray-300">{user.signupDate}</td>
                          <td className="py-4 px-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'Premium' 
                                ? 'bg-purple-500/20 text-purple-400' 
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Systems Tab */}
        {activeTab === 'systems' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">System Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {systemStatus.map((system, index) => (
                  <Card key={index} className="p-6 cosmic-glow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{system.name}</h3>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        {system.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="text-green-400 font-semibold">{system.accuracy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Users:</span>
                        <span className="text-white font-semibold">{system.users.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button variant="primary" size="sm">
                        Configure
                      </Button>
                      <Button variant="secondary" size="sm">
                        Analytics
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-semibold mb-4">User Growth</h3>
                  <div className="h-64 bg-white/10 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Chart Placeholder</p>
                  </div>
                </Card>

                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-semibold mb-4">Revenue Trends</h3>
                  <div className="h-64 bg-white/10 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Chart Placeholder</p>
                  </div>
                </Card>

                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-semibold mb-4">System Usage</h3>
                  <div className="h-64 bg-white/10 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Chart Placeholder</p>
                  </div>
                </Card>

                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-semibold mb-4">Geographic Distribution</h3>
                  <div className="h-64 bg-white/10 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Map Placeholder</p>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">System Settings</h2>
              
              <Card className="p-8 cosmic-glow">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Maintenance Mode</span>
                        <Button variant="secondary" size="sm">Toggle</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto Updates</span>
                        <Button variant="secondary" size="sm">Toggle</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Email Notifications</span>
                        <Button variant="secondary" size="sm">Toggle</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Two-Factor Authentication</span>
                        <Button variant="secondary" size="sm">Enable</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">API Rate Limiting</span>
                        <Button variant="secondary" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Theme Management</h2>
              
              <Card className="p-8 cosmic-glow">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Current Theme</h3>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg">
                      <p className="text-white font-semibold">Cosmic Theme (Active)</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Available Themes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: 'Cosmic', status: 'Active', color: 'from-purple-500 to-pink-500' },
                        { name: 'Minimal', status: 'Available', color: 'from-gray-500 to-gray-700' },
                        { name: 'Ocean', status: 'Available', color: 'from-blue-500 to-cyan-500' },
                        { name: 'Forest', status: 'Available', color: 'from-green-500 to-emerald-500' }
                      ].map((theme, index) => (
                        <div key={index} className={`p-4 rounded-lg bg-gradient-to-r ${theme.color}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">{theme.name}</span>
                            <span className="text-white/80 text-sm">{theme.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}