'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, Users, Settings, BarChart3, Eye, Edit, Trash2, 
  Crown, Star, Heart, Zap, Globe, Database, Server, 
  Activity, TrendingUp, AlertTriangle, CheckCircle, XCircle,
  UserPlus, UserMinus, Ban, Unlock, Mail, Bell, CreditCard
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  premiumUsers: number
  freeUsers: number
  adminUsers: number
  totalRevenue: number
  monthlyRevenue: number
  activeUsers: number
  newUsersToday: number
}

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'premium' | 'user'
  createdAt: string
  lastActive: string
  status: 'active' | 'suspended' | 'banned'
  subscriptionStatus?: string
  totalSpent: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    premiumUsers: 0,
    freeUsers: 0,
    adminUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeUsers: 0,
    newUsersToday: 0
  })
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics' | 'settings'>('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    setIsLoading(true)
    
    // Mock data for demonstration
    const mockStats: AdminStats = {
      totalUsers: 1250,
      premiumUsers: 340,
      freeUsers: 890,
      adminUsers: 20,
      totalRevenue: 45600,
      monthlyRevenue: 8900,
      activeUsers: 780,
      newUsersToday: 23
    }

    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'premium',
        createdAt: '2024-01-15',
        lastActive: '2024-01-20',
        status: 'active',
        subscriptionStatus: 'active',
        totalSpent: 199.99
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        createdAt: '2024-01-10',
        lastActive: '2024-01-19',
        status: 'active',
        totalSpent: 0
      },
      {
        id: '3',
        name: 'Admin User',
        email: 'admin@dailysecrets.com',
        role: 'admin',
        createdAt: '2024-01-01',
        lastActive: '2024-01-20',
        status: 'active',
        totalSpent: 0
      }
    ]

    setStats(mockStats)
    setUsers(mockUsers)
    setIsLoading(false)
  }

  const handleUserAction = async (userId: string, action: string) => {
    // Implement user actions
    console.log(`Action: ${action} for user: ${userId}`)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-600 bg-red-50'
      case 'premium': return 'text-purple-600 bg-purple-50'
      case 'user': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'suspended': return 'text-yellow-600 bg-yellow-50'
      case 'banned': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600">Manage your Daily Secrets application</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Total Users</p>
                <p className="font-semibold text-slate-900 text-2xl">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-violet-600 text-violet-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{stats.totalUsers}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Total Users</h3>
                <p className="text-sm text-slate-600">+{stats.newUsersToday} today</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{stats.premiumUsers}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Premium Users</h3>
                <p className="text-sm text-slate-600">{Math.round((stats.premiumUsers / stats.totalUsers) * 100)}% of total</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">${stats.monthlyRevenue.toLocaleString()}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Monthly Revenue</h3>
                <p className="text-sm text-slate-600">+12% from last month</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{stats.activeUsers}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Active Users</h3>
                <p className="text-sm text-slate-600">Last 30 days</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New user registered', user: 'Sarah Johnson', time: '2 minutes ago', type: 'success' },
                  { action: 'Premium subscription activated', user: 'Mike Chen', time: '15 minutes ago', type: 'success' },
                  { action: 'User reported content', user: 'Admin', time: '1 hour ago', type: 'warning' },
                  { action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'info' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{activity.action}</p>
                      <p className="text-sm text-slate-600">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* User Management */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">User Management</h3>
                <button className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200">
                  <UserPlus className="w-5 h-5 mr-2 inline" />
                  Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-2 font-semibold text-slate-900">User</th>
                      <th className="text-left py-4 px-2 font-semibold text-slate-900">Role</th>
                      <th className="text-left py-4 px-2 font-semibold text-slate-900">Status</th>
                      <th className="text-left py-4 px-2 font-semibold text-slate-900">Revenue</th>
                      <th className="text-left py-4 px-2 font-semibold text-slate-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-medium text-slate-900">{user.name}</p>
                            <p className="text-sm text-slate-600">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <span className={`px-3 py-1 text-sm rounded-full ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <p className="font-medium text-slate-900">${user.totalSpent}</p>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'edit')}
                              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'suspend')}
                              className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Analytics Dashboard</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">User Growth</h4>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                    <p className="text-slate-600">Chart placeholder</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trends</h4>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                    <p className="text-slate-600">Chart placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">System Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Application Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Maintenance Mode</p>
                        <p className="text-sm text-slate-600">Enable maintenance mode for updates</p>
                      </div>
                      <button className="w-12 h-6 bg-slate-300 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Email Notifications</p>
                        <p className="text-sm text-slate-600">Send email notifications to users</p>
                      </div>
                      <button className="w-12 h-6 bg-violet-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}


