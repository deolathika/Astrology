'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import UserFlowRouter from '@/components/user-flow/UserFlowRouter'
import { 
  Settings, 
  Users, 
  User,
  BarChart3, 
  Crown, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Bell, 
  Target, 
  TrendingUp, 
  Download, 
  Share2, 
  RefreshCw, 
  Info, 
  Zap, 
  BookOpen, 
  Eye, 
  Lightbulb, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Check, 
  X, 
  AlertCircle, 
  Lock, 
  Unlock, 
  EyeOff, 
  Eye as EyeIcon,
  UserCheck,
  UserX,
  Activity,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Moon,
  Sun,
  Sparkles
} from 'lucide-react'
import { CosmicCard, CosmicButton, CosmicInput } from '@/components/cosmic'
import LoadingState from '@/components/ui/LoadingState'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  premiumUsers: number
  totalPosts: number
  totalDreams: number
  systemHealth: {
    database: 'healthy' | 'warning' | 'error'
    api: 'healthy' | 'warning' | 'error'
    storage: 'healthy' | 'warning' | 'error'
    performance: 'healthy' | 'warning' | 'error'
  }
  recentActivity: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    user: string
  }>
}

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  lastActive: string
  status: 'active' | 'inactive' | 'banned'
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'System overview and statistics' },
    { id: 'users', label: 'Users', icon: Users, description: 'User management and moderation' },
    { id: 'content', label: 'Content', icon: BookOpen, description: 'Content management and moderation' },
    { id: 'system', label: 'System', icon: Settings, description: 'System configuration and monitoring' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, description: 'Detailed analytics and insights' }
  ]

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      }
    } catch (err) {
      console.error('Failed to load users:', err)
    }
  }

  const handleUserAction = async (userId: string, action: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          action
        })
      })

      if (response.ok) {
        loadUsers()
      } else {
        setError('Failed to perform action')
      }
    } catch (err) {
      setError('Failed to perform action')
    } finally {
      setLoading(false)
    }
  }

  const handleSystemAction = async (action: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/system', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action })
      })

      if (response.ok) {
        loadStats()
      } else {
        setError('Failed to perform system action')
      }
    } catch (err) {
      setError('Failed to perform system action')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user && session.user.role === 'admin') {
      loadStats()
      loadUsers()
    }
  }, [session])

  if (!session?.user || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-violet-300 mb-6">You need admin privileges to access this page</p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <AppShell>
      <UserFlowRouter>
        <div className="min-h-screen cosmic-bg">
      {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-6"
          >
          <div className="flex items-center justify-between">
              <div>
              <h1 className="text-3xl font-bold cosmic-text-gradient">Admin Dashboard</h1>
              <p className="text-violet-300">System administration and management</p>
            </div>
            <div className="flex items-center space-x-4">
              <CosmicButton
                variant="ghost"
                onClick={() => loadStats()}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                Refresh
              </CosmicButton>
            </div>
          </div>
        </motion.header>

        <div className="container mx-auto px-4 pb-16">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gold-400/20 text-gold-400 border border-gold-400/50'
                      : 'bg-violet-800/30 text-violet-300 hover:bg-violet-700/30'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats && [
                  {
                    title: 'Total Users',
                    value: stats.totalUsers,
                    icon: Users,
                    color: 'from-blue-500 to-cyan-500',
                    change: '+12%'
                  },
                  {
                    title: 'Active Users',
                    value: stats.activeUsers,
                    icon: UserCheck,
                    color: 'from-green-500 to-emerald-500',
                    change: '+8%'
                  },
                  {
                    title: 'Premium Users',
                    value: stats.premiumUsers,
                    icon: Crown,
                    color: 'from-gold-400 to-yellow-500',
                    change: '+15%'
                  },
                  {
                    title: 'Total Posts',
                    value: stats.totalPosts,
                    icon: BookOpen,
                    color: 'from-purple-500 to-pink-500',
                    change: '+23%'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <CosmicCard variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" />
                  </div>
                        <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                      <p className="text-violet-300 text-sm">{stat.title}</p>
                    </CosmicCard>
                  </motion.div>
                ))}
              </div>

              {/* System Health */}
              {stats && (
                <CosmicCard variant="glass" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">System Health</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(stats.systemHealth).map(([key, status]) => (
                      <div key={key} className="bg-violet-800/20 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white capitalize">{key}</span>
                          <div className={`w-3 h-3 rounded-full ${
                            status === 'healthy' ? 'bg-green-400' :
                            status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                          }`} />
                  </div>
                        <p className="text-violet-300 text-sm capitalize">{status}</p>
                </div>
                    ))}
                  </div>
                </CosmicCard>
              )}

            {/* Recent Activity */}
              {stats && (
                <CosmicCard variant="glass" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
                  
              <div className="space-y-4">
                    {stats.recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-3 bg-violet-800/20 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                    <div className="flex-1">
                          <p className="text-white font-medium">{activity.description}</p>
                          <p className="text-violet-400 text-sm">{activity.user} • {activity.timestamp}</p>
                    </div>
                      </motion.div>
                    ))}
                  </div>
                </CosmicCard>
              )}
            </motion.section>
          )}

          {/* Users Tab */}
        {activeTab === 'users' && (
            <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <CosmicCard variant="glass" className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">User Management</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                      <tr className="border-b border-violet-600/30">
                        <th className="text-left py-3 px-4 text-violet-300">User</th>
                        <th className="text-left py-3 px-4 text-violet-300">Role</th>
                        <th className="text-left py-3 px-4 text-violet-300">Status</th>
                        <th className="text-left py-3 px-4 text-violet-300">Last Active</th>
                        <th className="text-left py-3 px-4 text-violet-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {users.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="border-b border-violet-600/20"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                          <div>
                                <p className="font-semibold text-white">{user.name}</p>
                                <p className="text-violet-400 text-sm">{user.email}</p>
                              </div>
                          </div>
                        </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                              user.role === 'premium' ? 'bg-gold-400/20 text-gold-400' :
                              'bg-violet-500/20 text-violet-400'
                            }`}>
                            {user.role}
                          </span>
                        </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              user.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                            {user.status}
                          </span>
                        </td>
                          <td className="py-4 px-4 text-violet-300 text-sm">{user.lastActive}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <CosmicButton
                                size="sm"
                                variant="ghost"
                              onClick={() => setSelectedUser(user)}
                                icon={<Edit className="w-3 h-3" />}
                              >
                                Edit
                              </CosmicButton>
                              <CosmicButton
                                size="sm"
                                variant="ghost"
                                onClick={() => handleUserAction(user.id, 'toggle-status')}
                                icon={user.status === 'active' ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                              >
                                {user.status === 'active' ? 'Deactivate' : 'Activate'}
                              </CosmicButton>
                          </div>
                        </td>
                        </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </CosmicCard>
            </motion.section>
        )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CosmicCard variant="glass" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">System Actions</h2>
                  
                  <div className="space-y-4">
                    <CosmicButton
                      onClick={() => handleSystemAction('clear-cache')}
                      loading={loading}
                      icon={<RefreshCw className="w-4 h-4" />}
                      className="w-full"
                    >
                      Clear Cache
                    </CosmicButton>
                    
                    <CosmicButton
                      onClick={() => handleSystemAction('restart-services')}
                      loading={loading}
                      icon={<Server className="w-4 h-4" />}
                      className="w-full"
                    >
                      Restart Services
                    </CosmicButton>
                    
                    <CosmicButton
                      onClick={() => handleSystemAction('backup-data')}
                      loading={loading}
                      icon={<Database className="w-4 h-4" />}
                      className="w-full"
                    >
                      Backup Data
                    </CosmicButton>
                  </div>
                </CosmicCard>

                <CosmicCard variant="glass" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">System Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-violet-300">Database Status</span>
                      <span className="text-green-400 font-semibold">Online</span>
                      </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-violet-300">API Status</span>
                      <span className="text-green-400 font-semibold">Healthy</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-violet-300">Storage Usage</span>
                      <span className="text-yellow-400 font-semibold">75%</span>
                      </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-violet-300">Memory Usage</span>
                      <span className="text-green-400 font-semibold">45%</span>
                    </div>
                  </div>
                </CosmicCard>
              </div>
            </motion.section>
          )}

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300"
            >
              {error}
          </motion.div>
        )}
      </div>
        </div>      </UserFlowRouter>
    </AppShell>
  )
}