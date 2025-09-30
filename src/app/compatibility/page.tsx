'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, Star, Zap, Shield, ChevronRight, Plus, Search, Filter, Sun } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CompatibilityProfile {
  id: string
  name: string
  birthDate: string
  zodiacSign: string
  lifePathNumber: number
  avatar: string
  isOnline: boolean
  lastSeen: string
}

interface CompatibilityResult {
  overall: number
  romantic: number
  friendship: number
  business: number
  strengths: string[]
  frictions: string[]
  tips: string[]
  weeklyRitual: string
}

const countryDefaults = {
  'IN': 'vedic',
  'LK': 'vedic', 
  'CN': 'chinese',
  'JP': 'hybrid',
  'KR': 'hybrid',
  'US': 'western',
  'EU': 'western'
}

export default function CompatibilityPage() {
  const [profiles, setProfiles] = useState<CompatibilityProfile[]>([])
  const [selectedProfile, setSelectedProfile] = useState<CompatibilityProfile | null>(null)
  const [compatibilityResult, setCompatibilityResult] = useState<CompatibilityResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSystem, setFilterSystem] = useState('all')

  useEffect(() => {
    // Load user's profile and discover potential matches
    loadUserProfile()
    discoverMatches()
  }, [])

  const loadUserProfile = () => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      const profile = JSON.parse(userData)
      // Set user's profile for compatibility calculations
    }
  }

  const discoverMatches = async () => {
    try {
      const response = await fetch('/api/community/chat?action=discover_connections&userId=current', {
        method: 'GET'
      })
      if (response.ok) {
        const data = await response.json()
        setProfiles(data.connections || [])
      }
    } catch (error) {
      // Mock data for development
      setProfiles([
        {
          id: '1',
          name: 'Alex Johnson',
          birthDate: '1990-06-15',
          zodiacSign: 'Gemini',
          lifePathNumber: 7,
          avatar: 'AJ',
          isOnline: true,
          lastSeen: 'now'
        },
        {
          id: '2', 
          name: 'Sarah Chen',
          birthDate: '1988-12-03',
          zodiacSign: 'Sagittarius',
          lifePathNumber: 3,
          avatar: 'SC',
          isOnline: false,
          lastSeen: '2 hours ago'
        }
      ])
    }
  }

  const calculateCompatibility = async (profile: CompatibilityProfile) => {
    setIsCalculating(true)
    setSelectedProfile(profile)

    try {
      // Simulate compatibility calculation
      await new Promise(resolve => setTimeout(resolve, 2000))

      const result: CompatibilityResult = {
        overall: Math.floor(Math.random() * 40) + 60, // 60-100
        romantic: Math.floor(Math.random() * 40) + 60,
        friendship: Math.floor(Math.random() * 40) + 60,
        business: Math.floor(Math.random() * 40) + 60,
        strengths: [
          'Great communication chemistry',
          'Complementary life paths',
          'Shared values and goals',
          'Emotional understanding'
        ],
        frictions: [
          'Different communication styles',
          'Varying energy levels',
          'Different approaches to conflict'
        ],
        tips: [
          'Focus on active listening',
          'Plan regular check-ins',
          'Celebrate each other\'s differences',
          'Practice patience and understanding'
        ],
        weeklyRitual: 'Meditation together every Sunday morning'
      }

      setCompatibilityResult(result)
    } catch (error) {
      toast.error('Failed to calculate compatibility')
    } finally {
      setIsCalculating(false)
    }
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCompatibilityLabel = (score: number) => {
    if (score >= 90) return 'Exceptional'
    if (score >= 80) return 'Very Good'
    if (score >= 70) return 'Good'
    if (score >= 60) return 'Moderate'
    return 'Challenging'
  }

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary flex items-center">
              <Heart className="w-8 h-8 mr-3" />
              Compatibility
            </h1>
            <p className="text-gray-600 mt-2">Discover your cosmic connections</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <button className="btn btn-secondary flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profiles List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Discover Matches</h2>
            <div className="space-y-4">
              {filteredProfiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  whileHover={{ scale: 1.02 }}
                  className="card p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => calculateCompatibility(profile)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-violet-500 text-white flex items-center justify-center font-semibold">
                      {profile.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                      <p className="text-sm text-gray-600">{profile.zodiacSign} • Life Path {profile.lifePathNumber}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${profile.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className="text-xs text-gray-500">
                          {profile.isOnline ? 'Online' : profile.lastSeen}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compatibility Results */}
          <div className="lg:col-span-2">
            {!selectedProfile ? (
              <div className="card p-8 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Profile</h3>
                <p className="text-gray-500">Choose someone from the list to see your compatibility</p>
              </div>
            ) : isCalculating ? (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Calculating Compatibility</h3>
                <p className="text-gray-500">Analyzing your cosmic connection...</p>
              </div>
            ) : compatibilityResult ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="card p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-violet-500 text-white flex items-center justify-center font-semibold text-xl">
                      {selectedProfile.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">{selectedProfile.name}</h2>
                      <p className="text-gray-600">{selectedProfile.zodiacSign} • Life Path {selectedProfile.lifePathNumber}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getCompatibilityColor(compatibilityResult.overall)}`}>
                      {compatibilityResult.overall}%
                    </div>
                    <p className="text-lg text-gray-600">{getCompatibilityLabel(compatibilityResult.overall)} Compatibility</p>
                  </div>
                </div>

                {/* Compatibility Scores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card p-4 text-center">
                    <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                    <div className={`text-2xl font-bold ${getCompatibilityColor(compatibilityResult.romantic)}`}>
                      {compatibilityResult.romantic}%
                    </div>
                    <p className="text-sm text-gray-600">Romantic</p>
                  </div>
                  
                  <div className="card p-4 text-center">
                    <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className={`text-2xl font-bold ${getCompatibilityColor(compatibilityResult.friendship)}`}>
                      {compatibilityResult.friendship}%
                    </div>
                    <p className="text-sm text-gray-600">Friendship</p>
                  </div>
                  
                  <div className="card p-4 text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className={`text-2xl font-bold ${getCompatibilityColor(compatibilityResult.business)}`}>
                      {compatibilityResult.business}%
                    </div>
                    <p className="text-sm text-gray-600">Business</p>
                  </div>
                </div>

                {/* Strengths */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-500" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {compatibilityResult.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Frictions */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-500" />
                    Areas to Work On
                  </h3>
                  <ul className="space-y-2">
                    {compatibilityResult.frictions.map((friction, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                        {friction}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Relationship Tips</h3>
                  <ul className="space-y-2">
                    {compatibilityResult.tips.map((tip, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <div className="w-2 h-2 bg-violet-500 rounded-full mr-3 mt-2" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weekly Ritual */}
                <div className="card p-6 bg-gradient-to-r from-violet-50 to-purple-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Ritual</h3>
                  <p className="text-gray-700">{compatibilityResult.weeklyRitual}</p>
                  <button className="mt-4 btn btn-primary">
                    Set Reminder
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  )
}