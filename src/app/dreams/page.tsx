'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Moon, 
  Brain, 
  Eye, 
  Heart, 
  Star, 
  Zap, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  Save,
  Share,
  Download,
  Plus,
  Trash2,
  Edit,
  Lock,
  Unlock
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'

export default function DreamsPage() {
  const [dreamText, setDreamText] = useState('')
  const [dreamTitle, setDreamTitle] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [dreamHistory, setDreamHistory] = useState<any[]>([])
  const [isPremium, setIsPremium] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('general')

  const dreamCategories = [
    { id: 'general', name: 'General Dreams', icon: Moon, color: 'from-blue-500 to-purple-500' },
    { id: 'lucid', name: 'Lucid Dreams', icon: Eye, color: 'from-green-500 to-emerald-500' },
    { id: 'nightmare', name: 'Nightmares', icon: Zap, color: 'from-red-500 to-pink-500' },
    { id: 'recurring', name: 'Recurring Dreams', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { id: 'prophetic', name: 'Prophetic Dreams', icon: Brain, color: 'from-indigo-500 to-purple-500' }
  ]

  const commonSymbols = [
    { symbol: 'Water', meaning: 'Emotions, cleansing, renewal', frequency: 'Very Common' },
    { symbol: 'Flying', meaning: 'Freedom, ambition, escape', frequency: 'Common' },
    { symbol: 'Falling', meaning: 'Loss of control, anxiety', frequency: 'Common' },
    { symbol: 'Teeth', meaning: 'Communication, self-image', frequency: 'Common' },
    { symbol: 'House', meaning: 'Self, security, family', frequency: 'Very Common' },
    { symbol: 'Car', meaning: 'Life direction, control', frequency: 'Common' },
    { symbol: 'Death', meaning: 'Transformation, change', frequency: 'Uncommon' },
    { symbol: 'Snake', meaning: 'Transformation, healing', frequency: 'Uncommon' }
  ]

  const handleAnalyze = async () => {
    if (!dreamText.trim()) return
    
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const mockAnalysis = {
      title: dreamTitle || 'Dream Analysis',
      summary: 'Your dream reveals deep insights about your subconscious mind and current life situation.',
      symbols: [
        { symbol: 'Water', meaning: 'Emotions and cleansing', significance: 'High' },
        { symbol: 'Light', meaning: 'Hope and guidance', significance: 'Medium' }
      ],
      emotions: ['Hope', 'Anxiety', 'Curiosity'],
      interpretation: 'This dream suggests you are going through a period of emotional cleansing and renewal. The presence of water indicates deep emotional processing, while the light represents hope and guidance for your path forward.',
      advice: 'Pay attention to your emotions and allow yourself to process any unresolved feelings. This is a time for renewal and positive change.',
      keywords: ['transformation', 'emotions', 'renewal', 'guidance']
    }
    
    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  const handleSaveDream = () => {
    if (!dreamText.trim()) return
    
    const newDream = {
      id: Date.now(),
      title: dreamTitle || 'Untitled Dream',
      text: dreamText,
      date: new Date().toISOString(),
      analysis: analysis
    }
    
    setDreamHistory(prev => [newDream, ...prev])
    setDreamText('')
    setDreamTitle('')
    setAnalysis(null)
  }

  const handleUpgrade = () => {
    setIsPremium(true)
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Moon className="w-12 h-12 text-purple-600 mr-4" />
              </motion.div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Dream Analysis
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Unlock the secrets of your dreams with AI-powered analysis. Discover the hidden meanings, symbols, and messages from your subconscious mind.
            </p>
          </motion.div>

          {/* Dream Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Dream Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {dreamCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`cursor-pointer bg-white/80 backdrop-blur-lg border-2 rounded-xl p-4 text-center transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-white/20 hover:border-purple-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-2`}>
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{category.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dream Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Describe Your Dream</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dream Title (Optional)</label>
                  <input
                    type="text"
                    value={dreamTitle}
                    onChange={(e) => setDreamTitle(e.target.value)}
                    placeholder="Give your dream a title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dream Description</label>
                  <textarea
                    value={dreamText}
                    onChange={(e) => setDreamText(e.target.value)}
                    placeholder="Describe your dream in detail. Include emotions, colors, people, places, and any symbols you remember..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !dreamText.trim()}
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Analyzing...
                      </div>
                    ) : (
                      'Analyze My Dream'
                    )}
                  </motion.button>
                  {dreamText.trim() && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveDream}
                      className="border-2 border-purple-400 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300"
                    >
                      <Save className="w-5 h-5 inline mr-2" />
                      Save Dream
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analysis Results */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{analysis.title}</h3>
                
                {/* Summary */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Summary</h4>
                  <p className="text-gray-600">{analysis.summary}</p>
                </div>

                {/* Symbols */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Symbols</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.symbols.map((symbol, index) => (
                      <div key={index} className="bg-purple-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900">{symbol.symbol}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            symbol.significance === 'High' ? 'bg-red-100 text-red-700' :
                            symbol.significance === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {symbol.significance}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{symbol.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotions */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Emotions Detected</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.emotions.map((emotion, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interpretation */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Dream Interpretation</h4>
                  <p className="text-gray-600 mb-4">{analysis.interpretation}</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Guidance</h5>
                    <p className="text-gray-600">{analysis.advice}</p>
                  </div>
                </div>

                {/* Keywords */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.map((keyword, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Share className="w-5 h-5 inline mr-2" />
                    Share Analysis
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-purple-400 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300"
                  >
                    <Download className="w-5 h-5 inline mr-2" />
                    Download Report
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Common Dream Symbols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Common Dream Symbols</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commonSymbols.map((symbol, index) => (
                <motion.div
                  key={symbol.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{symbol.symbol}</h3>
                  <p className="text-gray-600 mb-3">{symbol.meaning}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    symbol.frequency === 'Very Common' ? 'bg-green-100 text-green-700' :
                    symbol.frequency === 'Common' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {symbol.frequency}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dream History */}
          {dreamHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Your Dream Journal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dreamHistory.slice(0, 6).map((dream, index) => (
                  <motion.div
                    key={dream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/90 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{dream.title}</h3>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {dream.text.substring(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(dream.date).toLocaleDateString()}
                      </span>
                      <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                        View Analysis
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Premium Upgrade CTA */}
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl p-8 text-white text-center">
                <Brain className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Unlock Advanced Dream Analysis</h3>
                <p className="text-lg mb-6">
                  Get deeper insights, dream journaling, and personalized dream guidance
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpgrade}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Upgrade to Premium
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/zodiac">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <Star className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Astrology</h3>
                  <p className="text-gray-600">Discover your cosmic blueprint</p>
                </motion.div>
              </Link>
              <Link href="/numerology">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Numerology</h3>
                  <p className="text-gray-600">Unlock the power of numbers</p>
                </motion.div>
              </Link>
              <Link href="/compatibility">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
                >
                  <Heart className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Compatibility</h3>
                  <p className="text-gray-600">Find your cosmic match</p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  )
}