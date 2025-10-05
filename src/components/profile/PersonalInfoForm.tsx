'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Mail, MapPin, Save, Sparkles } from 'lucide-react'
import { getZodiacSign, getZodiacInfo, getAllZodiacSigns, type ZodiacSign } from '@/lib/zodiacUtils'
import ZodiacAvatar from './ZodiacAvatar'
import CosmicButton from '@/components/cosmic/CosmicButton'

interface PersonalInfoFormProps {
  user?: any
  onSave?: (data: any) => void
  isGuest?: boolean
}

export default function PersonalInfoForm({ 
  user, 
  onSave,
  isGuest = false 
}: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    birthDate: user?.birthDate || '',
    location: user?.location || '',
    zodiacSign: user?.zodiacSign || 'aries'
  })
  
  const [detectedSign, setDetectedSign] = useState<ZodiacSign | null>(null)
  const [showZodiacDropdown, setShowZodiacDropdown] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Auto-detect zodiac sign when birth date changes
  useEffect(() => {
    if (formData.birthDate) {
      const detected = getZodiacSign(formData.birthDate)
      setDetectedSign(detected)
      setFormData(prev => ({ ...prev, zodiacSign: detected }))
    }
  }, [formData.birthDate])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    if (isGuest) {
      // Save to localStorage for guest users
      localStorage.setItem('guestProfile', JSON.stringify(formData))
      // Show success message
      alert('Your data is saved locally. Upgrade to Premium to sync across devices.')
    } else {
      // Save to backend for premium users
      if (onSave) {
        await onSave(formData)
      }
    }
    
    setIsSaving(false)
  }

  const zodiacInfo = getZodiacInfo(formData.zodiacSign as ZodiacSign)
  const allZodiacSigns = getAllZodiacSigns()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
        <p className="text-violet-300">
          {isGuest ? 'Your data is saved locally' : 'Your profile information'}
        </p>
      </div>

      {/* Zodiac Detection Section */}
      {formData.birthDate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Your Zodiac Sign</h3>
              <p className="text-violet-300 text-sm">
                {detectedSign ? 'Auto-detected from your birth date' : 'Select your zodiac sign'}
              </p>
            </div>
            <ZodiacAvatar sign={formData.zodiacSign as ZodiacSign} size="lg" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-violet-200 text-sm font-medium mb-2">
                Birth Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-400" />
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-violet-200 text-sm font-medium mb-2">
                Zodiac Sign
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowZodiacDropdown(!showZodiacDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{zodiacInfo.symbol}</span>
                    <span>{zodiacInfo.name}</span>
                  </div>
                  <Sparkles className="w-5 h-5 text-gold-400" />
                </button>
                
                {showZodiacDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-violet-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto"
                  >
                    {allZodiacSigns.map((sign) => (
                      <button
                        key={sign.sign}
                        onClick={() => {
                          handleInputChange('zodiacSign', sign.sign)
                          setShowZodiacDropdown(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                      >
                        <span className="text-xl">{sign.symbol}</span>
                        <div>
                          <div className="text-white font-medium">{sign.name}</div>
                          <div className="text-violet-300 text-sm">{sign.dates}</div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {detectedSign && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-white/5 rounded-lg"
            >
              <p className="text-violet-200 text-sm">
                <strong>{zodiacInfo.name}</strong> - {zodiacInfo.description}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-violet-200 text-sm font-medium mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Enter your full name"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-violet-200 text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Enter your email"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-violet-200 text-sm font-medium mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Enter your location"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <CosmicButton
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Save className="w-5 h-5" />
              <span>{isGuest ? 'Save Locally' : 'Save Profile'}</span>
            </div>
          )}
        </CosmicButton>
      </div>
    </motion.div>
  )
}
