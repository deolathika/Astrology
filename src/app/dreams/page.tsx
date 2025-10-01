'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Star, Sparkles, ArrowRight, ArrowLeft, Calculator, Heart, Zap, Shield, Globe, Target, Crown, Diamond, Sun, Calendar, CheckCircle, User, Users, Search, Filter, BookOpen, Brain, Eye, Lightbulb } from 'lucide-react'

export default function DreamsPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [dreams, setDreams] = useState<any[]>([])
  const [newDream, setNewDream] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedDream, setSelectedDream] = useState<any>(null)

  const dreamSymbols = [
    { symbol: 'Water', meaning: 'Emotions, cleansing, renewal', category: 'Elements' },
    { symbol: 'Fire', meaning: 'Passion, transformation, energy', category: 'Elements' },
    { symbol: 'Earth', meaning: 'Stability, grounding, material world', category: 'Elements' },
    { symbol: 'Air', meaning: 'Thoughts, communication, freedom', category: 'Elements' },
    { symbol: 'Snake', meaning: 'Transformation, healing, wisdom', category: 'Animals' },
    { symbol: 'Bird', meaning: 'Freedom, spirituality, messages', category: 'Animals' },
    { symbol: 'Cat', meaning: 'Independence, mystery, intuition', category: 'Animals' },
    { symbol: 'Dog', meaning: 'Loyalty, friendship, protection', category: 'Animals' },
    { symbol: 'House', meaning: 'Self, security, family', category: 'Places' },
    { symbol: 'Car', meaning: 'Life journey, control, direction', category: 'Objects' },
    { symbol: 'Money', meaning: 'Value, self-worth, abundance', category: 'Objects' },
    { symbol: 'Death', meaning: 'Endings, transformation, new beginnings', category: 'Concepts' }
  ]

  const dreamTypes = [
    {
      type: 'Lucid Dreams',
      description: 'Dreams where you are aware you are dreaming',
      benefits: ['Enhanced creativity', 'Problem solving', 'Overcoming fears'],
      techniques: ['Reality checks', 'Dream journaling', 'Mnemonic induction']
    },
    {
      type: 'Recurring Dreams',
      description: 'Dreams that repeat with similar themes or content',
      benefits: ['Pattern recognition', 'Unresolved issues', 'Personal growth'],
      techniques: ['Dream analysis', 'Symbol interpretation', 'Therapy integration']
    },
    {
      type: 'Nightmares',
      description: 'Disturbing dreams that cause fear or anxiety',
      benefits: ['Emotional processing', 'Fear confrontation', 'Healing'],
      techniques: ['Dream rehearsal', 'Positive imagery', 'Professional help']
    },
    {
      type: 'Prophetic Dreams',
      description: 'Dreams that seem to predict future events',
      benefits: ['Intuition development', 'Guidance', 'Preparedness'],
      techniques: ['Dream recording', 'Pattern analysis', 'Meditation']
    }
  ]

  useEffect(() => {
    // Load user profile and dreams
    const profile = localStorage.getItem('userData')
    if (profile) {
      const userData = JSON.parse(profile)
      setUserProfile(userData)
    }

    const savedDreams = localStorage.getItem('dreams')
    if (savedDreams) {
      setDreams(JSON.parse(savedDreams))
    }
  }, [])

  const analyzeDream = async (dreamText: string) => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = {
        id: Date.now(),
        text: dreamText,
        date: new Date().toISOString(),
        symbols: extractSymbols(dreamText),
        emotions: extractEmotions(dreamText),
        interpretation: generateInterpretation(dreamText),
        advice: generateAdvice(dreamText)
      }
      
      const updatedDreams = [analysis, ...dreams]
      setDreams(updatedDreams)
      localStorage.setItem('dreams', JSON.stringify(updatedDreams))
      setNewDream('')
      setIsAnalyzing(false)
    }, 3000)
  }

  const extractSymbols = (text: string) => {
    const foundSymbols = dreamSymbols.filter(symbol => 
      text.toLowerCase().includes(symbol.symbol.toLowerCase())
    )
    return foundSymbols.slice(0, 3) // Return top 3 symbols
  }

  const extractEmotions = (text: string) => {
    const emotions = ['fear', 'joy', 'sadness', 'anger', 'love', 'anxiety', 'peace', 'excitement']
    return emotions.filter(emotion => text.toLowerCase().includes(emotion))
  }

  const generateInterpretation = (text: string) => {
    const interpretations = [
      'This dream suggests you are processing recent changes in your life. The symbols indicate a need for emotional balance and self-reflection.',
      'Your dream reveals hidden desires and aspirations. The imagery points to opportunities for personal growth and transformation.',
      'This dream reflects your subconscious mind working through daily stresses. The symbols suggest a need for rest and rejuvenation.',
      'Your dream indicates a spiritual awakening or heightened intuition. The imagery suggests you are receiving guidance from your higher self.'
    ]
    return interpretations[Math.floor(Math.random() * interpretations.length)]
  }

  const generateAdvice = (text: string) => {
    const advice = [
      'Consider keeping a dream journal to track patterns and recurring themes.',
      'Practice meditation before bed to enhance dream recall and clarity.',
      'Pay attention to your emotions upon waking - they often hold important messages.',
      'Share your dreams with trusted friends or a therapist for deeper insights.'
    ]
    return advice[Math.floor(Math.random() * advice.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Dream Journal</h1>
              <p className="text-slate-600">Record and interpret your dreams with AI-powered analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Total Dreams</p>
                <p className="font-semibold text-slate-900 text-2xl">{dreams.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Dream Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Record Your Dream</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Dream Description</label>
              <textarea
                value={newDream}
                onChange={(e) => setNewDream(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent h-32"
                placeholder="Describe your dream in detail... What happened? Who was there? How did you feel?"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => analyzeDream(newDream)}
                disabled={!newDream.trim() || isAnalyzing}
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Dream'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dream Types Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Types of Dreams</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dreamTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-50 rounded-xl"
              >
                <h4 className="text-xl font-semibold text-slate-900 mb-2">{type.type}</h4>
                <p className="text-slate-600 mb-4">{type.description}</p>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-slate-900">Benefits:</h5>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dream Symbols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Common Dream Symbols</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dreamSymbols.map((symbol, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">{symbol.symbol}</h4>
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                    {symbol.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{symbol.meaning}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dream History */}
        {dreams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Dream History</h3>
            
            <div className="space-y-6">
              {dreams.map((dream, index) => (
                <motion.div
                  key={dream.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => setSelectedDream(selectedDream?.id === dream.id ? null : dream)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">
                      Dream #{dreams.length - index}
                    </h4>
                    <span className="text-sm text-slate-500">
                      {new Date(dream.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-3 line-clamp-2">
                    {dream.text}
                  </p>
                  
                  {selectedDream?.id === dream.id && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h5 className="font-medium text-slate-900 mb-2">Symbols Found:</h5>
                        <div className="flex flex-wrap gap-2">
                          {dream.symbols.map((symbol, symbolIndex) => (
                            <span
                              key={symbolIndex}
                              className="px-3 py-1 text-sm bg-violet-100 text-violet-700 rounded-full"
                            >
                              {symbol.symbol}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-slate-900 mb-2">Interpretation:</h5>
                        <p className="text-slate-600">{dream.interpretation}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-slate-900 mb-2">Advice:</h5>
                        <p className="text-slate-600">{dream.advice}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}