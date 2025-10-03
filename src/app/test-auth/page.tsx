'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'premium' | 'admin'
  image?: string
}

export default function TestAuthPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState<User[]>([])

  // Test credentials
  const testUsers = [
    { email: 'free@example.com', password: 'password', role: 'user' },
    { email: 'premium@example.com', password: 'password', role: 'premium' },
    { email: 'admin@example.com', password: 'password', role: 'admin' }
  ]

  const login = async (email: string, password: string) => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setUser(data.session.user)
        setMessage(`✅ Logged in as ${data.session.user.name} (${data.session.user.role})`)
      } else {
        setMessage(`❌ Login failed: ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'logout'
        })
      })

      if (response.ok) {
        setUser(null)
        setMessage('✅ Logged out successfully')
      } else {
        setMessage('❌ Logout failed')
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const checkSession = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/simple', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      
      if (response.ok) {
        setUser(data.user)
        setMessage(`✅ Session valid: ${data.user.name} (${data.user.role})`)
      } else {
        setUser(null)
        setMessage(`❌ No valid session: ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const getAllUsers = async () => {
    if (!user || user.role !== 'admin') {
      setMessage('❌ Admin access required')
      return
    }

    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getAllUsers'
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setUsers(data.users)
        setMessage(`✅ Retrieved ${data.users.length} users`)
      } else {
        setMessage(`❌ Failed to get users: ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            🔐 Authentication Test Page
          </h1>

          {/* Current User Status */}
          <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Current User Status</h2>
            {user ? (
              <div className="space-y-2">
                <p className="text-green-400">✅ Logged in</p>
                <p className="text-white">Name: {user.name}</p>
                <p className="text-white">Email: {user.email}</p>
                <p className="text-white">Role: <span className="font-semibold text-purple-400">{user.role}</span></p>
              </div>
            ) : (
              <p className="text-red-400">❌ Not logged in</p>
            )}
          </div>

          {/* Test Login Buttons */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Test Login</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testUsers.map((testUser, index) => (
                <button
                  key={index}
                  onClick={() => login(testUser.email, testUser.password)}
                  disabled={loading}
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 rounded-lg text-white font-semibold transition-all duration-200"
                >
                  Login as {testUser.role}
                  <br />
                  <span className="text-sm opacity-80">{testUser.email}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={checkSession}
                disabled={loading}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white font-semibold transition-colors"
              >
                Check Session
              </button>
              
              <button
                onClick={logout}
                disabled={loading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-white font-semibold transition-colors"
              >
                Logout
              </button>

              {user?.role === 'admin' && (
                <button
                  onClick={getAllUsers}
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg text-white font-semibold transition-colors"
                >
                  Get All Users
                </button>
              )}
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white">{message}</p>
            </div>
          )}

          {/* Users List (Admin Only) */}
          {users.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">All Users</h2>
              <div className="space-y-2">
                {users.map((u, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white">Name: {u.name}</p>
                    <p className="text-white">Email: {u.email}</p>
                    <p className="text-white">Role: <span className="font-semibold text-purple-400">{u.role}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-white mt-2">Loading...</p>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Test Instructions</h3>
            <ul className="text-white space-y-1 text-sm">
              <li>• Click any login button to test different user roles</li>
              <li>• Use "Check Session" to verify session persistence</li>
              <li>• Admin users can view all users</li>
              <li>• Test the authentication flow before setting up database</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
