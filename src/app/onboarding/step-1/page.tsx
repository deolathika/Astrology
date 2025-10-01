'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, MapPin, Star, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'

export default function OnboardingStep1() {
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: '',
    longitude: '',
    timezone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required'
    if (!formData.birthTime) newErrors.birthTime = 'Birth time is required'
    if (!formData.birthPlace) newErrors.birthPlace = 'Birth place is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      // Save to localStorage
      localStorage.setItem('onboardingStep1', JSON.stringify(formData))
      router.push('/onboarding/step-2')
    }
  }

  const handleBack = () => {
    router.push('/auth/signup')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-600">Step 1 of 6</span>
            <span className="text-sm font-medium text-slate-600">17%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '17%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Birth Information</h1>
          <p className="text-slate-600">Tell us about your birth to create your cosmic profile</p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form className="space-y-6">
            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                Birth Date
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
            </div>

            {/* Birth Time */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                Birth Time
              </label>
              <input
                type="time"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.birthTime && <p className="text-red-500 text-sm mt-1">{errors.birthTime}</p>}
            </div>

            {/* Birth Place */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                Birth Place
              </label>
              <input
                type="text"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your birth place (city, country)"
              />
              {errors.birthPlace && <p className="text-red-500 text-sm mt-1">{errors.birthPlace}</p>}
            </div>

            {/* Hidden fields for coordinates and timezone */}
            <input type="hidden" name="latitude" value={formData.latitude} />
            <input type="hidden" name="longitude" value={formData.longitude} />
            <input type="hidden" name="timezone" value={formData.timezone} />

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </motion.button>

              <motion.button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            This information helps us create accurate astrological and numerological readings for you.
          </p>
        </div>
      </motion.div>
    </div>
  )
}


