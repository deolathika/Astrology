'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import UserFlowRouter from '@/components/user-flow/UserFlowRouter'
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Crown,
  Calendar,
  Target,
  Download,
  Info,
  Save,
  Check,
  X,
  Lock,
  Sparkles
} from 'lucide-react'
import { CosmicCard, CosmicButton } from '@/components/cosmic'
import LoadingState from '@/components/ui/LoadingState'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import PersonalInfoForm from '@/components/profile/PersonalInfoForm'
import PremiumModal from '@/components/gating/PremiumModal'

interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  image?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  astrologySystem?: string
  numerologySystem?: string
  language?: string
  theme?: string
  timezone?: string
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Personal information and preferences' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'App preferences and notifications' },
    { id: 'subscription', label: 'Subscription', icon: Crown, description: 'Manage your subscription' },
    { id: 'legal', label: 'Legal', icon: Shield, description: 'Terms, privacy, and legal information' }
  ]

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    setLoading(true)
    try {
      if (session?.user) {
        // Load from backend for authenticated users
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
        }
      } else {
        // Load from localStorage for guest users
        const guestProfile = localStorage.getItem('guestProfile')
        if (guestProfile) {
          setProfile(JSON.parse(guestProfile))
        } else {
          // Create default guest profile
          setProfile({
            id: 'guest',
            name: '',
            email: '',
            role: 'guest'
          })
        }
      }
    } catch (err) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (data: any) => {
    setLoading(true)
    try {
      if (session?.user) {
        // Save to backend for authenticated users
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          setProfile(data)
        }
      } else {
        // Save to localStorage for guest users
        localStorage.setItem('guestProfile', JSON.stringify(data))
        setProfile(data)
      }
    } catch (err) {
      setError('Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AppShell>
        <LoadingState message="Loading profile..." />
      </AppShell>
    )
  }

  if (error) {
    return (
      <AppShell>
        <ErrorState
          title="Failed to load profile"
          description="We couldn't load your profile information. Please try again."
          error={error}
          onRetry={loadProfile}
        />
      </AppShell>
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
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 py-6"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Profile & Settings</h1>
              <p className="text-violet-300">Manage your personal information and preferences</p>
            </div>
          </motion.header>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="container mx-auto px-4 mb-8"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/10 text-violet-300 hover:bg-white/20'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4 space-y-6"
            >
              <PersonalInfoForm 
                user={profile}
                onSave={handleUpdateProfile}
                isGuest={!session?.user}
              />
              
              {/* Guest user premium upgrade prompt */}
              {!session?.user && (
                <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-xl p-6 border border-white/10">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Unlock Full Personalization</h3>
                    <p className="text-violet-300 mb-4">Save your data across devices and access premium features</p>
                    <CosmicButton
                      onClick={() => setShowPremiumModal(true)}
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Upgrade to Premium
                    </CosmicButton>
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4 space-y-6"
            >
              <CosmicCard variant="glass" className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>
                <div className="space-y-4">
                  <div className="text-center text-violet-300">
                    Settings panel coming soon...
                  </div>
                </div>
              </CosmicCard>
            </motion.section>
          )}

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4 space-y-6"
            >
              <CosmicCard variant="glass" className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Subscription</h2>
                <div className="text-center text-violet-300">
                  Subscription management coming soon...
                </div>
              </CosmicCard>
            </motion.section>
          )}

          {/* Legal Tab */}
          {activeTab === 'legal' && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4 space-y-6"
            >
              <CosmicCard variant="glass" className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Legal Information</h2>
                <div className="text-center text-violet-300">
                  Legal information coming soon...
                </div>
              </CosmicCard>
            </motion.section>
          )}
        </div>
        
        {/* Premium Modal */}
        <PremiumModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          onUpgrade={() => {
            // Handle upgrade logic
            console.log('Upgrade to Premium')
          }}
        />
      </UserFlowRouter>
    </AppShell>
  )
}