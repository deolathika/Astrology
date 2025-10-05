'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Menu, X, Bell, User, Settings } from 'lucide-react'
import { TranslationBar } from './translation-bar'

interface CosmicHeaderProps {
  user?: {
    name?: string
    email?: string
    role?: string
  } | null
  onMenuToggle?: () => void
  isMenuOpen?: boolean
}

export function CosmicHeader({ 
  user, 
  onMenuToggle, 
  isMenuOpen = false 
}: CosmicHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Daily Secrets</h1>
              <p className="text-xs text-blue-200">Cosmic Guidance</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <TranslationBar />
            
            {user && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-white hover:text-blue-200 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="flex items-center space-x-2 text-white">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name || 'User'}</p>
                    <p className="text-xs text-blue-200 capitalize">{user.role || 'user'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <TranslationBar />
            <button
              onClick={onMenuToggle}
              className="p-2 text-white hover:text-blue-200 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Notifications</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">New cosmic insight available</p>
                <p className="text-xs text-blue-600">2 minutes ago</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">Your numerology reading is ready</p>
                <p className="text-xs text-green-600">1 hour ago</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">Dream analysis completed</p>
                <p className="text-xs text-purple-600">3 hours ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}