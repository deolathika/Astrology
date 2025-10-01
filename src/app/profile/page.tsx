'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  User, Calendar, Clock, MapPin, Star, Edit3, Settings, 
  Globe, Mail, Phone, Shield, Bell, Moon, Smartphone,
  ArrowLeft, CheckCircle, AlertTriangle
} from 'lucide-react'

interface ProfileData {
  id: string
  fullName: string
  email: string
  phone?: string
  birthDate: string
  birthTime: string
  birthPlace: {
    country: string
    city: string
    coordinates: {
      latitude: number
      longitude: number
    }
    timezone: string
  }
  zodiacSign: string
  system: string
  preferences: {
    language: string
    notifications: boolean
    darkMode: boolean
    hapticFeedback: boolean
  }
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      // Simulate loading profile data
      const mockProfile: ProfileData = {
        id: 'user123',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        birthDate: '1990-01-15',
        birthTime: '14:30',
        birthPlace: {
          country: 'US',
          city: 'New York',
          coordinates: { latitude: 40.7128, longitude: -74.0060 },
          timezone: 'America/New_York'
        },
        zodiacSign: 'Capricorn',
        system: 'western',
        preferences: {
          language: 'en',
          notifications: true,
          darkMode: false,
          hapticFeedback: true
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      }
      
      setProfileData(mockProfile)
    } catch (error) {
      console.error('Error loading profile:', error)
      setError('Failed to load profile data')
    } finally {
      setIsLoading(false)
    }
  }

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'si': 'Sinhala',
      'ta': 'Tamil',
      'hi': 'Hindi',
      'zh': 'Chinese'
    }
    return languages[code] || code
  }

  const getSystemName = (system: string) => {
    const systems: { [key: string]: string } = {
      'western': 'Western Astrology',
      'vedic': 'Vedic Astrology',
      'chinese': 'Chinese Astrology',
      'sri-lankan': 'Sri Lankan Astrology'
    }
    return systems[system] || system
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Profile</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">No Profile Found</h2>
          <p className="text-slate-600 mb-4">Please complete your profile setup</p>
          <button
            onClick={() => router.push('/onboarding')}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Complete Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                  <p className="text-sm text-slate-600">Your personal information</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/profile/edit')}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{profileData.fullName}</h2>
                <p className="text-slate-600">{profileData.email}</p>
                {profileData.phone && (
                  <p className="text-sm text-slate-500">{profileData.phone}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-slate-600">Profile Complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-slate-600">Joined {new Date(profileData.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-slate-600">Last updated {new Date(profileData.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-violet-600" />
                <span>Personal Information</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{profileData.email}</p>
                  </div>
                </div>
                
                {profileData.phone && (
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <Phone className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-sm text-slate-600">Phone</p>
                      <p className="font-medium text-slate-900">{profileData.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Birth Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Birth Information</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Birth Date</p>
                    <p className="font-medium text-slate-900">{new Date(profileData.birthDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Birth Time</p>
                    <p className="font-medium text-slate-900">{profileData.birthTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Birth Place</p>
                    <p className="font-medium text-slate-900">{profileData.birthPlace.city}, {profileData.birthPlace.country}</p>
                    <p className="text-xs text-slate-500">
                      {profileData.birthPlace.coordinates.latitude.toFixed(4)}°, {profileData.birthPlace.coordinates.longitude.toFixed(4)}°
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Globe className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Timezone</p>
                    <p className="font-medium text-slate-900">{profileData.birthPlace.timezone}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Astrology Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span>Astrology Information</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Star className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Zodiac Sign</p>
                    <p className="font-medium text-slate-900">{profileData.zodiacSign}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Astrology System</p>
                    <p className="font-medium text-slate-900">{getSystemName(profileData.system)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-green-600" />
                <span>Preferences</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Globe className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Language</p>
                    <p className="font-medium text-slate-900">{getLanguageName(profileData.preferences.language)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-700">Notifications</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      profileData.preferences.notifications 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profileData.preferences.notifications ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Moon className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-700">Dark Mode</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      profileData.preferences.darkMode 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profileData.preferences.darkMode ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-700">Haptic Feedback</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      profileData.preferences.hapticFeedback 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profileData.preferences.hapticFeedback ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-end"
          >
            <button
              onClick={() => router.push('/profile/edit')}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Edit3 className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
            
            <button
              onClick={() => router.push('/settings')}
              className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}