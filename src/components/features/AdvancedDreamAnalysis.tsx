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
  Shield, 
  Flame, 
  Waves, 
  Mountain, 
  Wind,
  Sparkles,
  BookOpen,
  Compass,
  Target,
  Gem,
  Crown,
  Globe,
  MessageCircle,
  Users,
  Calendar,
  Clock
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

interface DreamSymbol {
  symbol: string
  meaning: string
  category: string
  significance: 'high' | 'medium' | 'low'
  color: string
}

interface DreamAnalysis {
  id: string
  method: string
  description: string
  symbols: DreamSymbol[]
  interpretation: string
  guidance: string
  emotionalTone: string
  spiritualMessage: string
  practicalAdvice: string
  confidence: number
}

interface DreamEntry {
  title: string
  description: string
  date: string
  emotions: string[]
  symbols: string[]
  lucidity: number
  vividness: number
}

export default function AdvancedDreamAnalysis() {
  const [dreamEntry, setDreamEntry] = useState<DreamEntry>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    emotions: [],
    symbols: [],
    lucidity: 5,
    vividness: 5
  })
  
  const [analyses, setAnalyses] = useState<DreamAnalysis[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string>('all')

  const analysisMethods = [
    { id: 'all', name: 'All Methods', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'freudian', name: 'Freudian Analysis', icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { id: 'jungian', name: 'Jungian Archetypes', icon: Star, color: 'from-indigo-500 to-purple-500' },
    { id: 'spiritual', name: 'Spiritual Guidance', icon: Moon, color: 'from-purple-500 to-violet-500' },
    { id: 'symbolic', name: 'Symbolic Interpretation', icon: Compass, color: 'from-green-500 to-emerald-500' }
  ]

  const commonSymbols = [
    { symbol: 'Water', meaning: 'Emotions, cleansing, life force', category: 'Elements', significance: 'high' as const, color: 'from-blue-500 to-cyan-500' },
    { symbol: 'Fire', meaning: 'Passion, transformation, energy', category: 'Elements', significance: 'high' as const, color: 'from-red-500 to-orange-500' },
    { symbol: 'Flying', meaning: 'Freedom, ambition, spiritual elevation', category: 'Actions', significance: 'high' as const, color: 'from-sky-500 to-blue-500' },
    { symbol: 'Falling', meaning: 'Loss of control, anxiety, insecurity', category: 'Actions', significance: 'high' as const, color: 'from-red-500 to-pink-500' },
    { symbol: 'House', meaning: 'Self, family, security', category: 'Places', significance: 'medium' as const, color: 'from-gray-500 to-slate-500' },
    { symbol: 'Snake', meaning: 'Transformation, wisdom, healing', category: 'Animals', significance: 'high' as const, color: 'from-green-500 to-lime-500' },
    { symbol: 'Death', meaning: 'Endings, transformation, rebirth', category: 'Concepts', significance: 'high' as const, color: 'from-gray-600 to-slate-600' },
    { symbol: 'Baby', meaning: 'New beginnings, innocence, potential', category: 'People', significance: 'medium' as const, color: 'from-pink-500 to-rose-500' },
    { symbol: 'Car', meaning: 'Life journey, control, direction', category: 'Objects', significance: 'medium' as const, color: 'from-blue-600 to-indigo-600' },
    { symbol: 'Money', meaning: 'Value, self-worth, abundance', category: 'Objects', significance: 'medium' as const, color: 'from-yellow-500 to-amber-500' }
  ]

  const emotions = [
    'Joy', 'Fear', 'Anger', 'Sadness', 'Excitement', 'Anxiety', 'Peace', 'Confusion',
    'Love', 'Hate', 'Hope', 'Despair', 'Curiosity', 'Surprise', 'Contentment', 'Restlessness'
  ]

  const analyzeDream = async () => {
    setIsAnalyzing(true)
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const newAnalyses: DreamAnalysis[] = [
      {
        id: '1',
        method: 'Freudian Analysis',
        description: 'Unconscious desires and repressed thoughts',
        symbols: commonSymbols.slice(0, 3),
        interpretation: 'Your dream reveals deep-seated desires for freedom and transformation. The symbols suggest you are processing significant life changes and seeking emotional release.',
        guidance: 'Pay attention to your emotional responses and consider what changes you might be resisting in your waking life.',
        emotionalTone: 'Transformative',
        spiritualMessage: 'Your subconscious is preparing you for a new phase of growth.',
        practicalAdvice: 'Journal your feelings and consider what aspects of your life need change.',
        confidence: 85
      },
      {
        id: '2',
        method: 'Jungian Archetypes',
        description: 'Universal symbols and collective unconscious',
        symbols: commonSymbols.slice(1, 4),
        interpretation: 'Your dream connects you to universal archetypes of transformation and renewal. The symbols represent your journey through life\'s major transitions.',
        guidance: 'Embrace the transformative energy and trust in your inner wisdom.',
        emotionalTone: 'Archetypal',
        spiritualMessage: 'You are aligned with universal patterns of growth and renewal.',
        practicalAdvice: 'Study mythology and symbolism to deepen your understanding.',
        confidence: 78
      },
      {
        id: '3',
        method: 'Spiritual Guidance',
        description: 'Messages from higher consciousness',
        symbols: commonSymbols.slice(2, 5),
        interpretation: 'Your dream carries messages from your higher self about your spiritual path. The symbols indicate you are being guided toward your true purpose.',
        guidance: 'Trust your intuition and follow the signs that appear in your daily life.',
        emotionalTone: 'Spiritual',
        spiritualMessage: 'The universe is communicating with you through your dreams.',
        practicalAdvice: 'Practice meditation and mindfulness to enhance your spiritual connection.',
        confidence: 92
      },
      {
        id: '4',
        method: 'Symbolic Interpretation',
        description: 'Personal and cultural symbol meanings',
        symbols: commonSymbols.slice(0, 4),
        interpretation: 'Each symbol in your dream has specific meaning related to your personal experiences and cultural background.',
        guidance: 'Consider how these symbols relate to your current life situation and relationships.',
        emotionalTone: 'Personal',
        spiritualMessage: 'Your dreams are uniquely tailored to your life journey.',
        practicalAdvice: 'Keep a dream journal to track recurring symbols and themes.',
        confidence: 88
      }
    ]
    
    setAnalyses(newAnalyses)
    setIsAnalyzing(false)
  }

  const filteredAnalyses = selectedMethod === 'all' 
    ? analyses 
    : analyses.filter(analysis => analysis.method.toLowerCase().includes(selectedMethod))

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Advanced Dream Analysis
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Unlock the hidden messages in your dreams
          </p>
        </motion.div>

        {/* Dream Entry Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Record Your Dream</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Dream Title</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Give your dream a title"
                    value={dreamEntry.title}
                    onChange={(e) => setDreamEntry(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Dream Date</label>
                  <input
                    type="date"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={dreamEntry.date}
                    onChange={(e) => setDreamEntry(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Lucidity Level (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    className="w-full"
                    value={dreamEntry.lucidity}
                    onChange={(e) => setDreamEntry(prev => ({ ...prev, lucidity: parseInt(e.target.value) }))}
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Unconscious</span>
                    <span>{dreamEntry.lucidity}</span>
                    <span>Fully Lucid</span>
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Vividness Level (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    className="w-full"
                    value={dreamEntry.vividness}
                    onChange={(e) => setDreamEntry(prev => ({ ...prev, vividness: parseInt(e.target.value) }))}
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Fuzzy</span>
                    <span>{dreamEntry.vividness}</span>
                    <span>Very Clear</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Dream Description</label>
                  <textarea
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                    placeholder="Describe your dream in detail..."
                    value={dreamEntry.description}
                    onChange={(e) => setDreamEntry(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Emotions Felt</label>
                  <div className="flex flex-wrap gap-2">
                    {emotions.map((emotion) => (
                      <button
                        key={emotion}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          dreamEntry.emotions.includes(emotion)
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                        onClick={() => {
                          setDreamEntry(prev => ({
                            ...prev,
                            emotions: prev.emotions.includes(emotion)
                              ? prev.emotions.filter(e => e !== emotion)
                              : [...prev.emotions, emotion]
                          }))
                        }}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button
                variant="cosmic"
                size="lg"
                onClick={analyzeDream}
                disabled={!dreamEntry.title || !dreamEntry.description || isAnalyzing}
                className="btn-cosmic"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Dream...
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-2" />
                    Analyze My Dream
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Analysis Methods */}
        {analyses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {analysisMethods.map((method) => {
                const Icon = method.icon
                return (
                  <Button
                    key={method.id}
                    variant={selectedMethod === method.id ? 'cosmic' : 'secondary'}
                    size="md"
                    onClick={() => setSelectedMethod(method.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {method.name}
                  </Button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Analysis Results */}
        <AnimatePresence>
          {filteredAnalyses.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="mb-8"
            >
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-purple-400">{analysis.method}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Confidence:</span>
                    <span className="text-lg font-bold text-green-400">{analysis.confidence}%</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{analysis.description}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Dream Symbols</h4>
                    <div className="space-y-3">
                      {analysis.symbols.map((symbol, symbolIndex) => (
                        <div key={symbolIndex} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${symbol.color} flex items-center justify-center text-white text-sm font-bold`}>
                            {symbol.symbol.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">{symbol.symbol}</span>
                              <span className="text-2xl">{getSignificanceIcon(symbol.significance)}</span>
                              <span className={`text-sm font-medium ${getSignificanceColor(symbol.significance)}`}>
                                {symbol.significance.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{symbol.meaning}</p>
                            <p className="text-xs text-gray-400">{symbol.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Interpretation</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Main Interpretation</h5>
                        <p className="text-gray-300 text-sm">{analysis.interpretation}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Guidance</h5>
                        <p className="text-gray-300 text-sm">{analysis.guidance}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Emotional Tone</h5>
                        <p className="text-gray-300 text-sm">{analysis.emotionalTone}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Spiritual Message</h5>
                        <p className="text-gray-300 text-sm">{analysis.spiritualMessage}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Practical Advice</h5>
                        <p className="text-gray-300 text-sm">{analysis.practicalAdvice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Action Buttons */}
        {analyses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="cosmic" size="lg" className="btn-cosmic">
                <BookOpen className="w-5 h-5 mr-2" />
                Save Analysis
              </Button>
              <Button variant="secondary" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Share Results
              </Button>
              <Button variant="secondary" size="lg">
                <Users className="w-5 h-5 mr-2" />
                Discuss with Community
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
