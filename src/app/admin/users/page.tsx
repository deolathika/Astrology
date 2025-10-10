'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Shield, 
  Crown,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  TrendingUp
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'premium' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastActive: string
  totalSessions: number
  subscriptionType?: 'free' | 'premium' | 'enterprise'
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        role: 'premium',
        status: 'active',
        joinDate: '2024-01-10',
        lastActive: '2024-01-15T10:30:00Z',
        totalSessions: 45,
        subscriptionType: 'premium'
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        email: 'marcus.j@example.com',
        role: 'user',
        status: 'active',
        joinDate: '2024-01-12',
        lastActive: '2024-01-15T09:15:00Z',
        totalSessions: 12,
        subscriptionType: 'free'
      },
      {
        id: '3',
        name: 'Elena Rodriguez',
        email: 'elena.rodriguez@example.com',
        role: 'admin',
        status: 'active',
        joinDate: '2024-01-05',
        lastActive: '2024-01-15T08:45:00Z',
        totalSessions: 89,
        subscriptionType: 'enterprise'
      },
      {
        id: '4',
        name: 'David Kim',
        email: 'david.kim@example.com',
        role: 'user',
        status: 'inactive',
        joinDate: '2024-01-08',
        lastActive: '2024-01-10T14:20:00Z',
        totalSessions: 3,
        subscriptionType: 'free'
      }
    ]

    setTimeout(() => {
      setUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }, [users, searchTerm, statusFilter, roleFilter])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-400" />
      case 'premium': return <Crown className="w-4 h-4 text-yellow-400" />
      default: return <Users className="w-4 h-4 text-blue-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20'
      case 'inactive': return 'text-gray-400 bg-gray-500/20'
      case 'suspended': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getSubscriptionColor = (type?: string) => {
    switch (type) {
      case 'enterprise': return 'text-purple-400 bg-purple-500/20'
      case 'premium': return 'text-yellow-400 bg-yellow-500/20'
      case 'free': return 'text-blue-400 bg-blue-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action: ${action} for user: ${userId}`)
    // Implement user actions here
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative main-content">
        <StarfieldBackground />
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative main-content">
      <StarfieldBackground />
      <Navigation />

      <main className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Manage users, roles, and subscriptions
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6 text-center cosmic-glow">
              <Users className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-2xl font-bold text-white mb-1">{users.length}</div>
              <div className="text-gray-300">Total Users</div>
            </Card>
            <Card className="p-6 text-center cosmic-glow">
              <UserCheck className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <div className="text-2xl font-bold text-white mb-1">
                {users.filter(u => u.status === 'active').length}
              </div>
              <div className="text-gray-300">Active Users</div>
            </Card>
            <Card className="p-6 text-center cosmic-glow">
              <Crown className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold text-white mb-1">
                {users.filter(u => u.role === 'premium').length}
              </div>
              <div className="text-gray-300">Premium Users</div>
            </Card>
            <Card className="p-6 text-center cosmic-glow">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-2xl font-bold text-white mb-1">
                {users.reduce((sum, user) => sum + user.totalSessions, 0)}
              </div>
              <div className="text-gray-300">Total Sessions</div>
            </Card>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-6 cosmic-glow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      className="w-full pl-10 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <select
                    className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="premium">Premium</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 cosmic-glow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-4 text-gray-300">User</th>
                      <th className="text-left p-4 text-gray-300">Role</th>
                      <th className="text-left p-4 text-gray-300">Status</th>
                      <th className="text-left p-4 text-gray-300">Subscription</th>
                      <th className="text-left p-4 text-gray-300">Last Active</th>
                      <th className="text-left p-4 text-gray-300">Sessions</th>
                      <th className="text-left p-4 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/10 hover:bg-white/5"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">{user.name}</div>
                              <div className="text-gray-400 text-sm">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getRoleIcon(user.role)}
                            <span className="text-white capitalize">{user.role}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(user.subscriptionType)}`}>
                            {user.subscriptionType || 'free'}
                          </span>
                        </td>
                        <td className="p-4 text-gray-300">
                          {new Date(user.lastActive).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-gray-300">
                          {user.totalSessions}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleUserAction(user.id, 'edit')}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleUserAction(user.id, 'suspend')}
                            >
                              <UserX className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleUserAction(user.id, 'delete')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
