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
  Clock,
  Send,
  Loader2
} from 'lucide-react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
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
  timestamp: string
  emotions?: string[]
  practicalGuidance?: string
  lucidDreamingTips?: string[]
}

export default function DreamsPage() {
  const [dreamDescription, setDreamDescription] = useState('')
  const [dreamDate, setDreamDate] = useState('')
  const [dreamEmotions, setDreamEmotions] = useState<string[]>([])
  const [selectedSystem, setSelectedSystem] = useState('comprehensive')
  const [showResults, setShowResults] = useState(false)
  const [dreamAnalysis, setDreamAnalysis] = useState<DreamAnalysis | null>(null)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [infoContent, setInfoContent] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [vividness, setVividness] = useState(5)
  const [dreamHistory, setDreamHistory] = useState<DreamAnalysis[]>([])
  const [selectedMethod, setSelectedMethod] = useState('freudian')

  const analysisMethods = [
    { 
      id: 'freudian', 
      name: 'Freudian Analysis', 
      description: 'Focuses on repressed desires and unconscious conflicts.',
      icon: Brain,
      color: 'text-red-400'
    },
    { 
      id: 'jungian', 
      name: 'Jungian Analysis', 
      description: 'Explores archetypes, collective unconscious, and individuation.',
      icon: Eye,
      color: 'text-blue-400'
    },
    { 
      id: 'spiritual', 
      name: 'Spiritual Interpretation', 
      description: 'Connects dreams to spiritual messages and higher self guidance.',
      icon: Sparkles,
      color: 'text-purple-400'
    },
    { 
      id: 'symbolic', 
      name: 'Symbolic Interpretation', 
      description: 'Deciphers universal and personal symbols within the dream narrative.',
      icon: Gem,
      color: 'text-green-400'
    }
  ]

  const dreamSystems = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Dream Analysis',
      description: 'Combines psychological, spiritual, and symbolic interpretation for complete dream understanding.',
      accuracy: '96%',
      features: ['Symbol Analysis', 'Emotional Interpretation', 'Spiritual Meaning', 'Practical Guidance'],
      bestUse: 'Complete dream understanding, personal growth, spiritual development.',
      icon: '🌙'
    },
    {
      id: 'psychological',
      name: 'Psychological Dream Analysis',
      description: 'Based on Freudian and Jungian psychology, focusing on subconscious mind and personal growth.',
      accuracy: '92%',
      features: ['Subconscious Analysis', 'Personal Growth', 'Emotional Processing', 'Mental Health Insights'],
      bestUse: 'Understanding subconscious patterns, emotional healing, personal development.',
      icon: '🧠'
    },
    {
      id: 'spiritual',
      name: 'Spiritual Dream Analysis',
      description: 'Focuses on spiritual messages, divine guidance, and soul communication through dreams.',
      accuracy: '94%',
      features: ['Divine Messages', 'Soul Communication', 'Spiritual Guidance', 'Higher Self Connection'],
      bestUse: 'Spiritual development, divine guidance, soul connection.',
      icon: '✨'
    },
    {
      id: 'symbolic',
      name: 'Symbolic Dream Analysis',
      description: 'Analyzes dream symbols, archetypes, and universal meanings for deeper understanding.',
      accuracy: '90%',
      features: ['Symbol Dictionary', 'Archetype Analysis', 'Universal Meanings', 'Cultural Symbols'],
      bestUse: 'Understanding dream symbols, archetypal patterns, universal meanings.',
      icon: '🔮'
    }
  ]

  const emotionOptions = [
    'Joy', 'Fear', 'Anxiety', 'Love', 'Anger', 'Sadness', 'Excitement', 'Confusion',
    'Peace', 'Stress', 'Hope', 'Despair', 'Curiosity', 'Wonder', 'Nostalgia', 'Anticipation'
  ]

  const dreamTypes = [
    { name: 'Lucid Dream', description: 'Awareness that you are dreaming while in the dream', symbol: '👁️' },
    { name: 'Recurring Dream', description: 'Dreams that repeat with similar themes or symbols', symbol: '🔄' },
    { name: 'Nightmare', description: 'Disturbing dreams that cause fear or anxiety', symbol: '😰' },
    { name: 'Prophetic Dream', description: 'Dreams that seem to predict future events', symbol: '🔮' },
    { name: 'Healing Dream', description: 'Dreams that provide emotional or spiritual healing', symbol: '💚' },
    { name: 'Spiritual Dream', description: 'Dreams with divine or spiritual messages', symbol: '✨' },
    { name: 'Adventure Dream', description: 'Exciting or adventurous dream experiences', symbol: '🗺️' },
    { name: 'Flying Dream', description: 'Dreams where you can fly or have superpowers', symbol: '🦅' }
  ]

  const commonSymbols = [
    { symbol: 'Water', meaning: 'Emotions, cleansing, life force', category: 'Element' },
    { symbol: 'Fire', meaning: 'Passion, transformation, energy', category: 'Element' },
    { symbol: 'House', meaning: 'Self, family, security', category: 'Structure' },
    { symbol: 'Car', meaning: 'Life direction, control, journey', category: 'Vehicle' },
    { symbol: 'Snake', meaning: 'Transformation, healing, wisdom', category: 'Animal' },
    { symbol: 'Bird', meaning: 'Freedom, spirituality, messages', category: 'Animal' },
    { symbol: 'Death', meaning: 'Endings, transformation, rebirth', category: 'Life' },
    { symbol: 'Baby', meaning: 'New beginnings, innocence, potential', category: 'Life' }
  ]

  // LLM Integration for Dream Analysis
  const analyzeDreamWithLLM = async (dreamText: string, method: string, emotions: string[], vividness: number) => {
    try {
      const response = await fetch('/api/analyze-dream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dreamText,
          method,
          emotions,
          vividness,
          timestamp: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze dream')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('LLM Analysis Error:', error)
      // Fallback to local analysis
      return generateLocalAnalysis(dreamText, method, emotions, vividness)
    }
  }

  const generateLocalAnalysis = (dreamText: string, method: string, emotions: string[], vividness: number) => {
    const dreamType = dreamTypes[Math.floor(Math.random() * dreamTypes.length)]
    const symbols = commonSymbols.slice(0, Math.floor(Math.random() * 4) + 2)
    
    return {
      id: Date.now().toString(),
      method: method,
      description: dreamText,
      symbols: symbols.map(s => ({
        symbol: s.symbol,
        meaning: s.meaning,
        category: s.category,
        significance: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        color: ['text-red-400', 'text-blue-400', 'text-green-400', 'text-purple-400'][Math.floor(Math.random() * 4)]
      })),
      interpretation: generateDreamInterpretation(dreamText, dreamType.name, symbols, emotions),
      guidance: generatePracticalGuidance(dreamType.name, emotions),
      emotionalTone: emotions.join(', '),
      spiritualMessage: generateSpiritualMeaning(dreamType.name, symbols),
      practicalAdvice: generatePracticalGuidance(dreamType.name, emotions),
      confidence: Math.floor(Math.random() * 20) + 80,
      timestamp: new Date().toISOString()
    }
  }

  const analyzeDream = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dreamDescription) return

    setIsAnalyzing(true)
    
    try {
      // Use LLM for analysis
      const analysis = await analyzeDreamWithLLM(
        dreamDescription, 
        selectedMethod, 
        dreamEmotions, 
        vividness
      )
      
      setDreamAnalysis(analysis)
      setDreamHistory(prev => [analysis, ...prev.slice(0, 9)]) // Keep last 10 analyses
      setShowResults(true)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateDreamInterpretation = (description: string, type: string, symbols: any[], emotions: string[]): string => {
    return `Your ${type.toLowerCase()} reveals deep insights into your subconscious mind. The presence of ${symbols.map(s => s.symbol).join(', ')} suggests ${symbols[0]?.meaning.toLowerCase()}. Your emotions of ${emotions.join(', ')} indicate that this dream is processing important life experiences and helping you integrate new understanding.`
  }

  const generateSpiritualMeaning = (type: string, symbols: any[]): string => {
    return `Spiritually, this dream carries messages from your higher self. The ${symbols[0]?.symbol} represents ${symbols[0]?.meaning.toLowerCase()}, indicating a need for ${type === 'Spiritual Dream' ? 'divine connection' : 'inner reflection'}. This dream is guiding you toward spiritual growth and deeper understanding of your soul's purpose.`
  }

  const generatePracticalGuidance = (type: string, emotions: string[]): string => {
    return `Based on your dream, consider focusing on ${emotions[0]?.toLowerCase()} in your waking life. This dream suggests you need to ${type === 'Lucid Dream' ? 'develop greater awareness' : 'process recent experiences'}. Pay attention to recurring themes and symbols in your daily life.`
  }

  const generateRecurringThemes = (type: string): string[] => {
    return [
      'Transformation and change',
      'Emotional processing',
      'Spiritual development',
      'Personal growth',
      'Relationship dynamics'
    ]
  }

  const generateLucidDreamingTips = (): string[] => {
    return [
      'Keep a dream journal to improve dream recall',
      'Practice reality checks throughout the day',
      'Set intentions before sleeping',
      'Use meditation to enhance dream awareness',
      'Try the WILD technique (Wake-Induced Lucid Dream)'
    ]
  }

  const handleEmotionToggle = (emotion: string) => {
    setDreamEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    )
  }

  const showInfo = (content: string) => {
    setInfoContent(content)
    setShowInfoModal(true)
  }

  const currentSystem = dreamSystems.find(sys => sys.id === selectedSystem)

  return (
    <div className="min-h-screen relative main-content">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-cosmic animate-float">
              Dream Analysis
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Unlock the hidden messages in your dreams through advanced psychological and spiritual interpretation.
            </p>
          </div>
        </section>

        {/* Dream Systems */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Dream Analysis Systems</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dreamSystems.map((system) => (
                <Card key={system.id} className="p-6 hover:scale-105 cosmic-glow">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{system.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{system.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{system.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-purple-300 font-semibold">Accuracy: {system.accuracy}</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-300 text-xs mb-2">Key Features:</p>
                      <ul className="list-disc list-inside text-gray-400 text-xs">
                        {system.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant={selectedSystem === system.id ? 'cosmic' : 'secondary'}
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedSystem(system.id)}
                    >
                      {selectedSystem === system.id ? 'Selected' : 'Select System'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Dream Analysis Form */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">
                Advanced Dream Analysis
              </h2>
              
              {/* Analysis Methods */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-cosmic mb-4">Choose Analysis Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {analysisMethods.map((method) => {
                    const IconComponent = method.icon
                    return (
                      <div
                        key={method.id}
                        className={`p-4 cursor-pointer transition-all border rounded-lg ${
                          selectedMethod === method.id 
                            ? 'border-purple-500 border-2 cosmic-glow' 
                            : 'border-white/10 border hover:border-white/20'
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="text-center">
                          <IconComponent className={`mx-auto mb-2 ${method.color}`} size={24} />
                          <h4 className="font-semibold text-white mb-1">{method.name}</h4>
                          <p className="text-gray-400 text-xs">{method.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {currentSystem && (
                <div className="glass-card p-6 mb-8">
                  <h3 className="text-2xl font-bold text-cosmic mb-3 flex items-center justify-center md:justify-start">
                    <span className="text-4xl mr-3">{currentSystem.icon}</span> {currentSystem.name}
                  </h3>
                  <p className="text-gray-300 mb-4">{currentSystem.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-purple-300 font-semibold">Accuracy: <span className="text-white">{currentSystem.accuracy}</span></p>
                      <p className="text-purple-300 font-semibold mt-2">Best Use: <span className="text-white">{currentSystem.bestUse}</span></p>
                    </div>
                    <div>
                      <p className="text-purple-300 font-semibold">Key Features:</p>
                      <ul className="list-disc list-inside text-gray-300">
                        {currentSystem.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={analyzeDream} className="space-y-6">
                <div>
                  <label htmlFor="dreamDescription" className="block text-white text-sm font-medium mb-2">
                    Describe Your Dream
                  </label>
                  <textarea
                    id="dreamDescription"
                    rows={6}
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your dream in detail. Include what happened, who was there, how you felt, and any significant symbols or events..."
                    value={dreamDescription}
                    onChange={(e) => setDreamDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="dreamDate" className="block text-white text-sm font-medium mb-2">
                      Dream Date
                    </label>
                    <input
                      type="date"
                      id="dreamDate"
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={dreamDate}
                      onChange={(e) => setDreamDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="vividness" className="block text-white text-sm font-medium mb-2">
                      Dream Vividness (1-10)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        id="vividness"
                        min="1"
                        max="10"
                        value={vividness}
                        onChange={(e) => setVividness(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-purple-300 font-semibold">{vividness}</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="analysisMethod" className="block text-white text-sm font-medium mb-2">
                      Analysis Method
                    </label>
                    <select
                      id="analysisMethod"
                      value={selectedMethod}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {analysisMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Emotions in the Dream
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {emotionOptions.map((emotion) => (
                      <button
                        key={emotion}
                        type="button"
                        className={`p-2 rounded-lg text-sm transition-all ${
                          dreamEmotions.includes(emotion)
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                        onClick={() => handleEmotionToggle(emotion)}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    variant="cosmic" 
                    size="lg" 
                    className="btn-cosmic"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Dream...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Analyze My Dream
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>

        {/* Dream History */}
        {dreamHistory.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-cosmic">Recent Dream Analyses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dreamHistory.slice(0, 6).map((analysis) => (
                  <Card key={analysis.id} className="p-6 cosmic-glow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cosmic">{analysis.method}</h3>
                      <span className="text-sm text-gray-400">
                        {new Date(analysis.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {analysis.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 font-semibold">
                        Confidence: {analysis.confidence}%
                      </span>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => {
                          setDreamAnalysis(analysis)
                          setShowResults(true)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        {showResults && dreamAnalysis && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-cosmic">
                Your Dream Analysis
              </h2>
              
              {/* Analysis Method */}
              <Card className="p-8 cosmic-glow mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-cosmic">Analysis Method</h3>
                  <span className="text-purple-300 font-semibold">
                    Confidence: {dreamAnalysis.confidence}%
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {analysisMethods.find(m => m.id === dreamAnalysis.method)?.icon && 
                      React.createElement(analysisMethods.find(m => m.id === dreamAnalysis.method)!.icon, { 
                        className: "mx-auto text-purple-400", 
                        size: 48 
                      })
                    }
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{dreamAnalysis.method}</h4>
                  <p className="text-gray-300">
                    {analysisMethods.find(m => m.id === dreamAnalysis.method)?.description}
                  </p>
                </div>
              </Card>

              {/* Enhanced Analysis Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                    <Brain className="mr-2" size={20} />
                    Dream Interpretation
                  </h3>
                  <p className="text-gray-300 mb-4">{dreamAnalysis.interpretation}</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => showInfo('Dream interpretation combines psychological analysis with symbolic meaning to reveal insights about your subconscious mind and life experiences.')}
                  >
                    Learn More
                  </Button>
                </Card>

                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                    <Sparkles className="mr-2" size={20} />
                    Spiritual Message
                  </h3>
                  <p className="text-gray-300 mb-4">{dreamAnalysis.spiritualMessage}</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => showInfo('Spiritual dream analysis focuses on divine messages, soul communication, and higher self guidance through dream symbolism.')}
                  >
                    Learn More
                  </Button>
                </Card>
              </div>

              {/* Symbols Analysis */}
              {dreamAnalysis.symbols && dreamAnalysis.symbols.length > 0 && (
                <Card className="p-6 cosmic-glow mb-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                    <Gem className="mr-2" size={20} />
                    Dream Symbols
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dreamAnalysis.symbols.map((symbol: DreamSymbol, index: number) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{symbol.symbol}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            symbol.significance === 'high' ? 'bg-red-500/20 text-red-300' :
                            symbol.significance === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {symbol.significance}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-1">{symbol.meaning}</p>
                        <p className="text-gray-400 text-xs">Category: {symbol.category}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Guidance and Advice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                    <Compass className="mr-2" size={20} />
                    Practical Guidance
                  </h3>
                  <p className="text-gray-300">{dreamAnalysis.guidance}</p>
                </Card>

                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                    <Target className="mr-2" size={20} />
                    Practical Advice
                  </h3>
                  <p className="text-gray-300">{dreamAnalysis.practicalAdvice}</p>
                </Card>
              </div>

              {/* Symbols and Emotions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Dream Symbols</h3>
                  <div className="space-y-2">
                    {dreamAnalysis.symbols.map((symbol: DreamSymbol, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-2xl">{symbol.symbol}</span>
                        <span className="text-gray-300">
                          {symbol.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Emotions</h3>
                  <div className="flex flex-wrap gap-2">
                    {(dreamAnalysis.emotions || []).map((emotion: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        {emotion}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Practical Guidance */}
              <Card className="p-6 cosmic-glow mb-8">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Practical Guidance</h3>
                <p className="text-gray-300">{dreamAnalysis.practicalGuidance || dreamAnalysis.guidance}</p>
              </Card>

              {/* Lucid Dreaming Tips */}
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Lucid Dreaming Tips</h3>
                <ul className="space-y-2">
                  {(dreamAnalysis.lucidDreamingTips || []).map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-400 mr-2">💡</span>
                      <span className="text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>
        )}

        {/* Dream Types Guide */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">
              Dream Types Guide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dreamTypes.map((type, index) => (
                <Card key={index} className="p-6 cosmic-glow">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{type.symbol}</div>
                    <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
                    <p className="text-gray-300 text-sm">{type.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="p-8 max-w-md mx-auto cosmic-glow">
              <h2 className="text-2xl font-bold mb-4 text-cosmic">Information</h2>
              <p className="text-gray-300 mb-6">{infoContent}</p>
              <Button 
                variant="cosmic" 
                size="lg" 
                className="w-full"
                onClick={() => setShowInfoModal(false)}
              >
                Close
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}