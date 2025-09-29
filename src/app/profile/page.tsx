'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/components/user-provider'
import { useTranslation } from '@/components/translation-provider'
import { Clock, Globe, Lock, User, Share2, Settings, Sun, Moon, Star, Download, Trash2, Save, X, Edit3 } from 'lucide-react'
interface CosmicProfileProps {
  user?: any
}

export default function CosmicProfilePage({ user: propUser }: CosmicProfileProps) {
  const { user: contextUser } = useUser()
  const { translate } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [profileData, setProfileData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: 0,
    longitude: 0,
    timezone: '',
    systemPreference: 'western',
    language: 'en',
    privacy: {
      showBirthTime: true,
      showLocation: true,
      anonymousMode: false
    }
  })

  const user = propUser || contextUser

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.fullName || '',
        birthDate: user.birthDate || '',
        birthTime: user.birthTime || '',
        birthPlace: user.birthPlace || '',
        latitude: user.latitude || 0,
        longitude: user.longitude || 0,
        timezone: user.timezone || '',
        systemPreference: 'western',
        language: user.language || 'en',
        privacy: {
          showBirthTime: true,
          showLocation: true,
          anonymousMode: false
        }
      })
    }
  }, [user])

  const sections = [
    {
      id: 'identity',
      title: 'Identity Header',
      icon: User,
      color: 'supernova-gold'
    },
    {
      id: 'birth-details',
      title: 'Birth Details & Map',
      icon: MapPin,
      color: 'electric-violet'
    },
    {
      id: 'astrology',
      title: 'Astrology Snapshot',
      icon: Star,
      color: 'celestial-blue'
    },
    {
      id: 'vedic',
      title: 'Vedic Details',
      icon: Moon,
      color: 'cosmic-orange'
    },
    {
      id: 'numerology',
      title: 'Numerology Core',
      icon: Calculator,
      color: 'stellar-pink'
    },
    {
      id: 'rectification',
      title: 'Rectification (Premium)',
      icon: Heart,
      color: 'nebula-red'
    },
    {
      id: 'rituals',
      title: 'Rituals & Reminders',
      icon: Zap,
      color: 'stellar-yellow'
    },
    {
      id: 'secrets',
      title: 'Saved Secrets & Dreams',
      icon: BookOpen,
      color: 'cosmic-silver'
    },
    {
      id: 'compatibility',
      title: 'Compatibility & Community',
      icon: Users,
      color: 'nebula-pink'
    },
    {
      id: 'privacy',
      title: 'Privacy & Safety',
      icon: Shield,
      color: 'stellar-gray'
    }
  ]

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'identity':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-supernova-gold to-stellar-yellow rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-deep-space" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-supernova-gold">{profileData.name || 'Cosmic Explorer'}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-3 py-1 bg-electric-violet/20 text-electric-violet rounded-full text-sm">
                      {profileData.systemPreference}
                    </span>
                    <span className="px-3 py-1 bg-celestial-blue/20 text-celestial-blue rounded-full text-sm">
                      {profileData.language}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-electric-violet/20 text-electric-violet rounded-lg hover:bg-electric-violet/30 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-cosmic-silver/20 text-cosmic-silver rounded-lg hover:bg-cosmic-silver/30 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )

      case 'birth-details':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stellar-gray-light mb-2">Birth Date</label>
                  <input
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                    className="w-full p-3 bg-cosmic-navy/50 border border-electric-violet/30 rounded-lg text-starlight-white focus:border-electric-violet focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stellar-gray-light mb-2">Birth Time</label>
                  <input
                    type="time"
                    value={profileData.birthTime}
                    onChange={(e) => setProfileData({...profileData, birthTime: e.target.value})}
                    className="w-full p-3 bg-cosmic-navy/50 border border-electric-violet/30 rounded-lg text-starlight-white focus:border-electric-violet focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stellar-gray-light mb-2">Birth Place</label>
                  <input
                    type="text"
                    value={profileData.birthPlace}
                    onChange={(e) => setProfileData({...profileData, birthPlace: e.target.value})}
                    placeholder="Search for your birth city..."
                    className="w-full p-3 bg-cosmic-navy/50 border border-electric-violet/30 rounded-lg text-starlight-white focus:border-electric-violet focus:outline-none"
                  />
                </div>
              </div>
              <div className="bg-cosmic-navy/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-electric-violet mb-3">Location Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Latitude:</span>
                    <span className="text-starlight-white">{profileData.latitude.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Longitude:</span>
                    <span className="text-starlight-white">{profileData.longitude.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Timezone:</span>
                    <span className="text-starlight-white">{profileData.timezone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'astrology':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-celestial-blue">Astrology Snapshot</h3>
              <select className="px-3 py-2 bg-cosmic-navy/50 border border-celestial-blue/30 rounded-lg text-starlight-white">
                <option value="western">Western</option>
                <option value="vedic">Vedic</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-cosmic-navy/30 rounded-lg">
                <Sun className="w-8 h-8 text-supernova-gold mx-auto mb-2" />
                <p className="text-sm text-stellar-gray-light">Sun</p>
                <p className="font-semibold text-starlight-white">Aries</p>
              </div>
              <div className="text-center p-4 bg-cosmic-navy/30 rounded-lg">
                <Moon className="w-8 h-8 text-celestial-blue mx-auto mb-2" />
                <p className="text-sm text-stellar-gray-light">Moon</p>
                <p className="font-semibold text-starlight-white">Cancer</p>
              </div>
              <div className="text-center p-4 bg-cosmic-navy/30 rounded-lg">
                <Star className="w-8 h-8 text-electric-violet mx-auto mb-2" />
                <p className="text-sm text-stellar-gray-light">Rising</p>
                <p className="font-semibold text-starlight-white">Leo</p>
              </div>
            </div>
            <div className="bg-cosmic-navy/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-celestial-blue mb-3">Elements Balance</h4>
              <div className="space-y-2">
                {['Fire', 'Water', 'Air', 'Earth'].map((element, index) => (
                  <div key={element} className="flex items-center justify-between">
                    <span className="text-sm text-stellar-gray-light">{element}</span>
                    <div className="flex-1 mx-3 bg-cosmic-navy rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-electric-violet to-celestial-blue h-2 rounded-full"
                        style={{ width: `${25 + index * 10}%` }}
                      />
                    </div>
                    <span className="text-sm text-starlight-white">{25 + index * 10}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'numerology':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stellar-pink">Numerology Core</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-stellar-gray-light">System:</span>
                <select className="px-3 py-2 bg-cosmic-navy/50 border border-stellar-pink/30 rounded-lg text-starlight-white">
                  <option value="pythagorean">Pythagorean</option>
                  <option value="chaldean">Chaldean</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Life Path', value: 7, color: 'supernova-gold' },
                { name: 'Expression', value: 11, color: 'electric-violet', master: true },
                { name: 'Soul Urge', value: 3, color: 'celestial-blue' },
                { name: 'Personality', value: 8, color: 'cosmic-orange' },
                { name: 'Birthday', value: 5, color: 'stellar-pink' },
                { name: 'Maturity', value: 9, color: 'nebula-red' }
              ].map((number, index) => (
                <div key={number.name} className="p-4 bg-cosmic-navy/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-stellar-gray-light">{number.name}</span>
                    {number.master && (
                      <span className="text-xs bg-supernova-gold/20 text-supernova-gold px-2 py-1 rounded">Master</span>
                    )}
                  </div>
                  <div className={`text-2xl font-bold text-${number.color}`}>
                    {number.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stellar-gray">Privacy & Safety</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cosmic-navy/30 rounded-lg">
                <div>
                  <h4 className="text-starlight-white">Show Birth Time</h4>
                  <p className="text-sm text-stellar-gray-light">Allow others to see your exact birth time</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-cosmic-navy peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-violet"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-cosmic-navy/30 rounded-lg">
                <div>
                  <h4 className="text-starlight-white">Show Location</h4>
                  <p className="text-sm text-stellar-gray-light">Display your birth city to others</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-cosmic-navy peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-violet"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-cosmic-navy/30 rounded-lg">
                <div>
                  <h4 className="text-starlight-white">Anonymous Mode</h4>
                  <p className="text-sm text-stellar-gray-light">Hide your identity in community features</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-cosmic-navy peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-violet"></div>
                </label>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-celestial-blue/20 text-celestial-blue rounded-lg hover:bg-celestial-blue/30 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-nebula-red/20 text-nebula-red rounded-lg hover:bg-nebula-red/30 transition-colors">
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <p className="text-stellar-gray-light">Section coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      
      {/* Cosmic pattern overlay */}
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-deep-space/90 backdrop-blur-lg border-b border-electric-violet/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-supernova-gold">Cosmic Profile</h1>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 bg-electric-violet/20 text-electric-violet rounded-lg hover:bg-electric-violet/30 transition-colors"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 bg-cosmic-silver/20 text-cosmic-silver rounded-lg hover:bg-cosmic-silver/30 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-electric-violet/20 text-electric-violet rounded-lg hover:bg-electric-violet/30 transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? `bg-${section.color}/20 border-${section.color}/50 border-2`
                    : 'bg-cosmic-navy/30 border border-cosmic-navy/50 hover:bg-cosmic-navy/50'
                }`}
              >
                <section.icon className={`w-6 h-6 mx-auto mb-2 ${
                  activeSection === section.id ? `text-${section.color}` : 'text-stellar-gray-light'
                }`} />
                <p className={`text-sm font-medium ${
                  activeSection === section.id ? `text-${section.color}` : 'text-stellar-gray-light'
                }`}>
                  {section.title}
                </p>
              </button>
            ))}
          </div>

          {/* Active Section Content */}
          <AnimatePresence>
            {activeSection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="cosmic-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(123, 79, 255, 0.1) 0%, rgba(63, 197, 255, 0.1) 100%)',
                  borderColor: 'rgba(123, 79, 255, 0.3)',
                }}
              >
                {renderSection(activeSection)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}