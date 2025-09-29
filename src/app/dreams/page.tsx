'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CosmicNavigation } from '@/components/cosmic-navigation'
import { Plus, Moon, BookOpen, Calendar, Star, Sparkles, Eye, Brain, Heart } from 'lucide-react'

const dreamCategories = [
  { id: 'flying', name: 'Flying', symbol: '🕊️', color: 'celestial-blue' },
  { id: 'water', name: 'Water', symbol: '🌊', color: 'stellar-teal' },
  { id: 'animals', name: 'Animals', symbol: '🐺', color: 'cosmic-orange' },
  { id: 'people', name: 'People', symbol: '👥', color: 'stellar-pink' },
  { id: 'places', name: 'Places', symbol: '🏰', color: 'supernova-gold' },
  { id: 'objects', name: 'Objects', symbol: '💎', color: 'electric-violet' },
  { id: 'nightmares', name: 'Nightmares', symbol: '👻', color: 'nebula-red' },
  { id: 'lucid', name: 'Lucid', symbol: '✨', color: 'aurora-green' }
]

const recentDreams = [
  {
    id: 1,
    title: 'Flying Over the Ocean',
    date: '2024-01-15',
    category: 'flying',
    symbols: ['ocean', 'flying', 'freedom'],
    interpretation: 'This dream suggests you are feeling liberated and free from constraints. The ocean represents your emotions, and flying over it indicates you have gained control over your feelings.',
    emotionalTone: 'positive',
    significance: 'high',
    tags: ['freedom', 'emotions', 'control']
  },
  {
    id: 2,
    title: 'Lost in a Forest',
    date: '2024-01-14',
    category: 'places',
    symbols: ['forest', 'lost', 'darkness'],
    interpretation: 'This dream may indicate feelings of being lost or uncertain about your path in life. The forest represents the unknown, and being lost suggests you need guidance.',
    emotionalTone: 'neutral',
    significance: 'medium',
    tags: ['uncertainty', 'guidance', 'path']
  },
  {
    id: 3,
    title: 'Talking to a Deceased Loved One',
    date: '2024-01-13',
    category: 'people',
    symbols: ['deceased', 'communication', 'love'],
    interpretation: 'This dream represents your need for closure or guidance from someone who has passed. It may also indicate that their spirit is trying to communicate with you.',
    emotionalTone: 'positive',
    significance: 'high',
    tags: ['closure', 'guidance', 'spirit']
  }
]

const dreamMeanings = [
  { symbol: 'Water', meaning: 'Emotions, cleansing, renewal', color: 'stellar-teal' },
  { symbol: 'Flying', meaning: 'Freedom, liberation, ambition', color: 'celestial-blue' },
  { symbol: 'Animals', meaning: 'Instincts, nature, wild side', color: 'cosmic-orange' },
  { symbol: 'Death', meaning: 'Endings, transformation, rebirth', color: 'nebula-red' },
  { symbol: 'Houses', meaning: 'Self, family, security', color: 'supernova-gold' },
  { symbol: 'Cars', meaning: 'Life journey, control, direction', color: 'electric-violet' }
]

export default function DreamsPage() {
  const [activeTab, setActiveTab] = useState('journal')
  const [newDream, setNewDream] = useState({
    title: '',
    description: '',
    category: '',
    symbols: [],
    emotionalTone: 'neutral'
  })
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddDream = () => {
    // Add dream logic here
    setNewDream({
      title: '',
      description: '',
      category: '',
      symbols: [],
      emotionalTone: 'neutral'
    })
  }

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-cosmic-gradient-text mb-4"
            >
              Dream Interpretation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light"
            >
              Unlock the secrets of your subconscious mind
            </motion.p>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <div className="cosmic-card p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('journal')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'journal'
                      ? 'bg-electric-violet text-white'
                      : 'text-stellar-gray-light hover:text-electric-violet'
                  }`}
                >
                  Dream Journal
                </button>
                <button
                  onClick={() => setActiveTab('meanings')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'meanings'
                      ? 'bg-electric-violet text-white'
                      : 'text-stellar-gray-light hover:text-electric-violet'
                  }`}
                >
                  Dream Meanings
                </button>
                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'analysis'
                      ? 'bg-electric-violet text-white'
                      : 'text-stellar-gray-light hover:text-electric-violet'
                  }`}
                >
                  Analysis
                </button>
              </div>
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'journal' && (
                <div className="space-y-8">
                  {/* Add New Dream */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="cosmic-card"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-stellar-pink/20 rounded-2xl">
                        <Plus className="w-6 h-6 text-stellar-pink" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-starlight-white">
                          Record Your Dream
                        </h2>
                        <p className="text-stellar-gray-light">
                          Capture the details of your dream for interpretation
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                          Dream Title
                        </label>
                        <input
                          type="text"
                          value={newDream.title}
                          onChange={(e) => setNewDream({...newDream, title: e.target.value})}
                          className="cosmic-input w-full"
                          placeholder="Give your dream a title..."
                        />
                      </div>

                      <div>
                        <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                          Dream Description
                        </label>
                        <textarea
                          value={newDream.description}
                          onChange={(e) => setNewDream({...newDream, description: e.target.value})}
                          className="cosmic-input w-full h-32 resize-none"
                          placeholder="Describe your dream in detail..."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                            Category
                          </label>
                          <select
                            value={newDream.category}
                            onChange={(e) => setNewDream({...newDream, category: e.target.value})}
                            className="cosmic-input w-full"
                          >
                            <option value="">Select category...</option>
                            {dreamCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.symbol} {category.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                            Emotional Tone
                          </label>
                          <select
                            value={newDream.emotionalTone}
                            onChange={(e) => setNewDream({...newDream, emotionalTone: e.target.value})}
                            className="cosmic-input w-full"
                          >
                            <option value="positive">😊 Positive</option>
                            <option value="neutral">😐 Neutral</option>
                            <option value="negative">😟 Negative</option>
                            <option value="mixed">😕 Mixed</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={handleAddDream}
                        className="w-full cosmic-button"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Moon className="w-5 h-5" />
                          <span>Add Dream</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>

                  {/* Recent Dreams */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="cosmic-card"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-electric-violet/20 rounded-2xl">
                        <BookOpen className="w-6 h-6 text-electric-violet" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-starlight-white">
                          Recent Dreams
                        </h2>
                        <p className="text-stellar-gray-light">
                          Your dream journal entries
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {recentDreams.map((dream, index) => (
                        <motion.div
                          key={dream.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-6 bg-cosmic-navy/50 rounded-xl border border-electric-violet/20"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-starlight-white mb-2">
                                {dream.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-stellar-gray-light">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{dream.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4" />
                                  <span className="capitalize">{dream.emotionalTone}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Sparkles className="w-4 h-4" />
                                  <span className="capitalize">{dream.significance} significance</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl mb-1">
                                {dreamCategories.find(c => c.id === dream.category)?.symbol}
                              </div>
                              <div className="text-xs text-stellar-gray-light">
                                {dreamCategories.find(c => c.id === dream.category)?.name}
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-electric-violet mb-2">
                              Symbols:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {dream.symbols.map((symbol) => (
                                <span
                                  key={symbol}
                                  className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-1 rounded-full"
                                >
                                  {symbol}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-supernova-gold mb-2">
                              Interpretation:
                            </h4>
                            <p className="text-starlight-white text-sm leading-relaxed">
                              {dream.interpretation}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {dream.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-supernova-gold/20 text-supernova-gold px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'meanings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="cosmic-card"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-supernova-gold/20 rounded-2xl">
                      <Eye className="w-6 h-6 text-supernova-gold" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-starlight-white">
                        Dream Symbol Meanings
                      </h2>
                      <p className="text-stellar-gray-light">
                        Common symbols and their interpretations
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {dreamMeanings.map((meaning, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="p-4 bg-cosmic-navy/50 rounded-xl border border-electric-violet/20"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="text-2xl">{meaning.symbol}</div>
                          <h3 className="text-lg font-bold text-starlight-white">
                            {meaning.symbol}
                          </h3>
                        </div>
                        <p className="text-stellar-gray-light text-sm">
                          {meaning.meaning}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'analysis' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-8"
                >
                  <div className="cosmic-card">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-aurora-green/20 rounded-2xl">
                        <Brain className="w-6 h-6 text-aurora-green" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-starlight-white">
                          Dream Analysis
                        </h2>
                        <p className="text-stellar-gray-light">
                          Insights from your dream patterns
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-cosmic-navy/50 rounded-xl">
                        <div className="text-3xl font-bold text-electric-violet mb-2">12</div>
                        <div className="text-stellar-gray-light text-sm">Dreams Recorded</div>
                      </div>
                      <div className="text-center p-6 bg-cosmic-navy/50 rounded-xl">
                        <div className="text-3xl font-bold text-supernova-gold mb-2">8</div>
                        <div className="text-stellar-gray-light text-sm">Flying Dreams</div>
                      </div>
                      <div className="text-center p-6 bg-cosmic-navy/50 rounded-xl">
                        <div className="text-3xl font-bold text-aurora-green mb-2">75%</div>
                        <div className="text-stellar-gray-light text-sm">Positive Tone</div>
                      </div>
                    </div>
                  </div>

                  <div className="cosmic-card">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-stellar-pink/20 rounded-2xl">
                        <Heart className="w-6 h-6 text-stellar-pink" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-starlight-white">
                          Emotional Patterns
                        </h2>
                        <p className="text-stellar-gray-light">
                          Your subconscious emotional state
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-starlight-white">Happiness</span>
                          <span className="text-aurora-green">85%</span>
                        </div>
                        <div className="cosmic-progress">
                          <div className="cosmic-progress-bar" style={{ width: '85%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-starlight-white">Anxiety</span>
                          <span className="text-nebula-red">25%</span>
                        </div>
                        <div className="cosmic-progress">
                          <div className="cosmic-progress-bar bg-nebula-red" style={{ width: '25%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-starlight-white">Creativity</span>
                          <span className="text-electric-violet">92%</span>
                        </div>
                        <div className="cosmic-progress">
                          <div className="cosmic-progress-bar bg-electric-violet" style={{ width: '92%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Dream Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="cosmic-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Moon className="w-6 h-6 text-electric-violet" />
                  <h3 className="text-lg font-bold text-starlight-white">
                    Dream Categories
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {dreamCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-cosmic-navy/50 hover:bg-cosmic-navy/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.symbol}</span>
                        <span className="text-starlight-white font-semibold text-sm">
                          {category.name}
                        </span>
                      </div>
                      <div className="text-stellar-gray-light text-xs">
                        {Math.floor(Math.random() * 20) + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Dream Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="cosmic-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="w-6 h-6 text-supernova-gold" />
                  <h3 className="text-lg font-bold text-starlight-white">
                    Dream Tips
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-electric-violet/10 rounded-lg">
                    <div className="text-electric-violet font-semibold mb-1">
                      Keep a Journal
                    </div>
                    <div className="text-stellar-gray-light">
                      Write down your dreams immediately upon waking.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-supernova-gold/10 rounded-lg">
                    <div className="text-supernova-gold font-semibold mb-1">
                      Look for Patterns
                    </div>
                    <div className="text-stellar-gray-light">
                      Notice recurring symbols and themes in your dreams.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-aurora-green/10 rounded-lg">
                    <div className="text-aurora-green font-semibold mb-1">
                      Trust Your Intuition
                    </div>
                    <div className="text-stellar-gray-light">
                      Your subconscious knows what these dreams mean.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
