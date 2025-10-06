'use client'

import React, { useState } from 'react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

interface DreamAnalysis {
  dreamType: string
  symbols: string[]
  emotions: string[]
  interpretation: string
  spiritualMeaning: string
  practicalGuidance: string
  recurringThemes: string[]
  lucidDreamingTips: string[]
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

  const analyzeDream = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dreamDescription) return

    // Simulate dream analysis
    const dreamType = dreamTypes[Math.floor(Math.random() * dreamTypes.length)]
    const symbols = commonSymbols.slice(0, Math.floor(Math.random() * 4) + 2)
    const emotions = dreamEmotions.length > 0 ? dreamEmotions : emotionOptions.slice(0, Math.floor(Math.random() * 3) + 1)

    const analysis: DreamAnalysis = {
      dreamType: dreamType.name,
      symbols: symbols.map(s => s.symbol),
      emotions,
      interpretation: generateDreamInterpretation(dreamDescription, dreamType.name, symbols, emotions),
      spiritualMeaning: generateSpiritualMeaning(dreamType.name, symbols),
      practicalGuidance: generatePracticalGuidance(dreamType.name, emotions),
      recurringThemes: generateRecurringThemes(dreamType.name),
      lucidDreamingTips: generateLucidDreamingTips()
    }

    setDreamAnalysis(analysis)
    setShowResults(true)
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
    <div className="min-h-screen relative">
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

        {/* Dream Analysis Form */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">
                Analyze Your Dream
              </h2>
              
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
                  <Button type="submit" variant="cosmic" size="lg" className="btn-cosmic">
                    Analyze My Dream
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>

        {/* Results */}
        {showResults && dreamAnalysis && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-cosmic">
                Your Dream Analysis
              </h2>
              
              {/* Dream Type */}
              <Card className="p-8 cosmic-glow mb-8">
                <h3 className="text-2xl font-bold mb-4 text-center text-cosmic">Dream Type</h3>
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {dreamTypes.find(t => t.name === dreamAnalysis.dreamType)?.symbol}
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{dreamAnalysis.dreamType}</h4>
                  <p className="text-gray-300">
                    {dreamTypes.find(t => t.name === dreamAnalysis.dreamType)?.description}
                  </p>
                </div>
              </Card>

              {/* Interpretation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Dream Interpretation</h3>
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
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Spiritual Meaning</h3>
                  <p className="text-gray-300 mb-4">{dreamAnalysis.spiritualMeaning}</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => showInfo('Spiritual dream analysis focuses on divine messages, soul communication, and higher self guidance through dream symbolism.')}
                  >
                    Learn More
                  </Button>
                </Card>
              </div>

              {/* Symbols and Emotions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Dream Symbols</h3>
                  <div className="space-y-2">
                    {dreamAnalysis.symbols.map((symbol, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-2xl">{symbol}</span>
                        <span className="text-gray-300">
                          {commonSymbols.find(s => s.symbol === symbol)?.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 cosmic-glow">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Emotions</h3>
                  <div className="flex flex-wrap gap-2">
                    {dreamAnalysis.emotions.map((emotion, index) => (
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
                <p className="text-gray-300">{dreamAnalysis.practicalGuidance}</p>
              </Card>

              {/* Lucid Dreaming Tips */}
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Lucid Dreaming Tips</h3>
                <ul className="space-y-2">
                  {dreamAnalysis.lucidDreamingTips.map((tip, index) => (
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