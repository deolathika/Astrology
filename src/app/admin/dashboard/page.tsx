/**
 * Admin Dashboard
 * Complete admin interface for content management
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Activity,
  DollarSign,
  MessageSquare,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import Button from '@/components/readdy/Button'

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  premiumSubscribers: number
  monthlyRevenue: number
  totalPosts: number
  totalComments: number
  systemHealth: 'healthy' | 'warning' | 'critical'
}

interface RecentActivity {
  id: string
  type: 'user_signup' | 'premium_upgrade' | 'post_created' | 'comment_added' | 'payment_received'
  user: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    premiumSubscribers: 0,
    monthlyRevenue: 0,
    totalPosts: 0,
    totalComments: 0,
    systemHealth: 'healthy'
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockStats: DashboardStats = {
      totalUsers: 2847,
      activeUsers: 1923,
      premiumSubscribers: 456,
      monthlyRevenue: 9120.50,
      totalPosts: 3421,
      totalComments: 12847,
      systemHealth: 'healthy'
    }

    const mockActivity: RecentActivity[] = [
      {
        id: '1',
        type: 'premium_upgrade',
        user: 'Sarah Chen',
        description: 'Upgraded to Premium subscription',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'success'
      },
      {
        id: '2',
        type: 'user_signup',
        user: 'Marcus Johnson',
        description: 'New user registered',
        timestamp: '2024-01-15T09:15:00Z',
        status: 'success'
      },
      {
        id: '3',
        type: 'post_created',
        user: 'Elena Rodriguez',
        description: 'Created new community post',
        timestamp: '2024-01-15T08:45:00Z',
        status: 'success'
      },
      {
        id: '4',
        type: 'payment_received',
        user: 'System',
        description: 'Payment processed for Premium subscription',
        timestamp: '2024-01-15T08:30:00Z',
        status: 'success'
      }
    ]

    setTimeout(() => {
      setStats(mockStats)
      setRecentActivity(mockActivity)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup': return <Users className="w-4 h-4" />
      case 'premium_upgrade': return <Star className="w-4 h-4" />
      case 'post_created': return <MessageSquare className="w-4 h-4" />
      case 'comment_added': return <MessageSquare className="w-4 h-4" />
      case 'payment_received': return <DollarSign className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'error': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'critical': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  if (isLoading) {
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
          />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor and manage your Daily Secrets platform
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getHealthColor(stats.systemHealth)}`} />
                <span className="text-sm font-medium capitalize">
                  System {stats.systemHealth}
                </span>
              </div>
              
              <Button
                variant="premium"
                size="lg"
                icon={<Settings className="w-5 h-5" />}
              >
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% from last month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8% from last month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Premium Subscribers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.premiumSubscribers.toLocaleString()}</p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15% from last month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +22% from last month
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-lg"
                  >
                    <div className={`p-2 rounded-full ${getStatusColor(activity.status)} bg-current/10`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-600">by {activity.user}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full justify-start" icon={<Users className="w-4 h-4" />}>
                  Manage Users
                </Button>
                <Button variant="secondary" size="lg" className="w-full justify-start" icon={<MessageSquare className="w-4 h-4" />}>
                  Moderate Content
                </Button>
                <Button variant="secondary" size="lg" className="w-full justify-start" icon={<BarChart3 className="w-4 h-4" />}>
                  View Analytics
                </Button>
                <Button variant="secondary" size="lg" className="w-full justify-start" icon={<Settings className="w-4 h-4" />}>
                  System Settings
                </Button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Services</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Processing</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-yellow-600">Warning</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  )
}
