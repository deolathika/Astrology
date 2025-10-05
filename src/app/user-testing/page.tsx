'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Crown, Shield, 
  CheckCircle, XCircle, Star,
  Settings, Users, BarChart3,
  Heart, Zap, Lock
} from 'lucide-react'

interface UserAccount {
  id: string
  name: string
  email: string
  password: string
  role: 'user' | 'premium' | 'admin'
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  features: string[]
  limitations: string[]
  capabilities: {
    dailyInsights: number
    compatibilityChecks: number
    expertConsultations: number
    advancedFeatures: boolean
    adminAccess: boolean
  }
}

const userAccounts: UserAccount[] = [
  {
    id: 'free',
    name: 'Free User',
    email: 'free@example.com',
    password: 'password',
    role: 'user',
    icon: Heart,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    features: [
      'Daily cosmic insights (3 per day)',
      'Basic numerology readings',
      'Simple astrology charts',
      'Community access',
      'Basic compatibility check (1 per day)',
      'Basic dream interpretation'
    ],
    limitations: [
      'Limited to 3 readings per day',
      'Basic chart only',
      'No expert consultations',
      'No advanced features'
    ],
    capabilities: {
      dailyInsights: 3,
      compatibilityChecks: 1,
      expertConsultations: 0,
      advancedFeatures: false,
      adminAccess: false
    }
  },
  {
    id: 'premium',
    name: 'Premium User',
    email: 'premium@example.com',
    password: 'password',
    role: 'premium',
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      'Unlimited daily insights',
      'Advanced numerology analysis',
      'Detailed astrology charts',
      'Expert consultations (5/month)',
      'Advanced compatibility analysis',
      'AI-powered dream interpretations',
      'Personalized cosmic calendar',
      'Vedic astrology features',
      'Priority customer support'
    ],
    limitations: [],
    capabilities: {
      dailyInsights: -1, // Unlimited
      compatibilityChecks: -1, // Unlimited
      expertConsultations: 5,
      advancedFeatures: true,
      adminAccess: false
    }
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
    icon: Shield,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    features: [
      'All premium features',
      'Unlimited expert consultations',
      'User management tools',
      'System administration',
      'Analytics dashboard',
      'Content management',
      'Zodiac system corrections',
      'UI/UX customization',
      'About Us page management',
      'Contact Us page management',
      'Terms & Conditions management',
      'User profile management'
    ],
    limitations: [],
    capabilities: {
      dailyInsights: -1, // Unlimited
      compatibilityChecks: -1, // Unlimited
      expertConsultations: -1, // Unlimited
      advancedFeatures: true,
      adminAccess: true
    }
  }
]

export default function UserTestingPage() {
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null)
  const [testingResults, setTestingResults] = useState<any>(null)

  const testUserLogin = async (user: UserAccount) => {
    try {
      const response = await fetch('/api/auth/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email: user.email,
          password: user.password
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setTestingResults({
          success: true,
          user: data.session.user,
          message: `✅ Successfully logged in as ${data.session.user.name} (${data.session.user.role})`
        })
        setSelectedUser(user)
      } else {
        setTestingResults({
          success: false,
          message: `❌ Login failed: ${data.error}`
        })
      }
    } catch (error) {
      setTestingResults({
        success: false,
        message: `❌ Error: ${error}`
      })
    }
  }

  const testUserFeatures = async (user: UserAccount) => {
    const features = [
      { name: 'Dashboard Access', url: '/main', test: 'GET' },
      { name: 'Today\'s Insights', url: '/today', test: 'GET' },
      { name: 'Numerology', url: '/numerology', test: 'GET' },
      { name: 'Cosmic Profile', url: '/cosmic-profile', test: 'GET' },
      { name: 'Compatibility', url: '/compatibility', test: 'GET' },
      { name: 'Dreams', url: '/dreams', test: 'GET' },
      { name: 'Community', url: '/community', test: 'GET' }
    ]

    if (user.role === 'admin') {
      features.push(
        { name: 'Admin Dashboard', url: '/admin', test: 'GET' },
        { name: 'Control Panel', url: '/admin/control-panel', test: 'GET' }
      )
    }

    const results = []
    for (const feature of features) {
      try {
        const response = await fetch(feature.url, { method: feature.test })
        results.push({
          name: feature.name,
          url: feature.url,
          status: response.ok ? 'success' : 'error',
          statusCode: response.status
        })
      } catch (error) {
        results.push({
          name: feature.name,
          url: feature.url,
          status: 'error',
          error: error
        })
      }
    }

    setTestingResults({
      success: true,
      user: user,
      features: results,
      message: `✅ Feature testing completed for ${user.name}`
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            👥 User Account Testing Dashboard
          </h1>

          {/* User Account Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {userAccounts.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedUser?.id === user.id 
                    ? 'border-purple-400 bg-purple-50/20' 
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center mb-4">
                  <user.icon className={`w-8 h-8 ${user.color} mr-3`} />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-white">Daily Insights: {user.capabilities.dailyInsights === -1 ? 'Unlimited' : user.capabilities.dailyInsights}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-white">Compatibility: {user.capabilities.compatibilityChecks === -1 ? 'Unlimited' : user.capabilities.compatibilityChecks}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Crown className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-white">Consultations: {user.capabilities.expertConsultations === -1 ? 'Unlimited' : user.capabilities.expertConsultations}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      testUserLogin(user)
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      testUserFeatures(user)
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-semibold transition-colors"
                  >
                    Test Features
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected User Details */}
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                {selectedUser.name} Account Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
                  <ul className="space-y-1">
                    {selectedUser.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Capabilities</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Daily Insights:</span>
                      <span className="text-purple-400 font-semibold">
                        {selectedUser.capabilities.dailyInsights === -1 ? 'Unlimited' : selectedUser.capabilities.dailyInsights}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Compatibility:</span>
                      <span className="text-blue-400 font-semibold">
                        {selectedUser.capabilities.compatibilityChecks === -1 ? 'Unlimited' : selectedUser.capabilities.compatibilityChecks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Consultations:</span>
                      <span className="text-yellow-400 font-semibold">
                        {selectedUser.capabilities.expertConsultations === -1 ? 'Unlimited' : selectedUser.capabilities.expertConsultations}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Advanced Features:</span>
                      <span className={selectedUser.capabilities.advancedFeatures ? 'text-green-400' : 'text-red-400'}>
                        {selectedUser.capabilities.advancedFeatures ? '✅ Yes' : '❌ No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Admin Access:</span>
                      <span className={selectedUser.capabilities.adminAccess ? 'text-green-400' : 'text-red-400'}>
                        {selectedUser.capabilities.adminAccess ? '✅ Yes' : '❌ No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Testing Results */}
          {testingResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Testing Results</h3>
              
              <div className="mb-4">
                <p className={`text-lg ${testingResults.success ? 'text-green-400' : 'text-red-400'}`}>
                  {testingResults.message}
                </p>
              </div>

              {testingResults.features && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Feature Test Results</h4>
                  <div className="space-y-2">
                    {testingResults.features.map((feature: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white">{feature.name}</span>
                        <span className={`text-sm ${
                          feature.status === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {feature.status === 'success' ? '✅ Success' : '❌ Failed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Quick Test Instructions */}
          <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Quick Testing Instructions</h3>
            <ul className="text-white space-y-1 text-sm">
              <li>• Click "Login" to test authentication for each user type</li>
              <li>• Click "Test Features" to verify all accessible features</li>
              <li>• Test user workflows: Free → Premium → Admin</li>
              <li>• Verify role-based access control</li>
              <li>• Test mobile responsiveness on different devices</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
