'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Brain, Sparkles, Save, Share2, ChevronRight, X, Check, Star } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface DreamEntry {
  id: string
  date: string
  text: string
  emotions: string[]
  interpretation?: {
    symbols: string[]
    emotionalTone: string
    significance: string
    advice: string
  }
  isOffline: boolean
}

const emotionOptions = [
  'Joyful', 'Peaceful', 'Anxious', 'Excited', 'Confused', 'Nostalgic',
  'Hopeful', 'Fearful', 'Curious', 'Melancholic', 'Energetic', 'Calm'
]

export default function DreamsPage() {
  const [dreams, setDreams] = useState<DreamEntry[]>([])
  const [newDream, setNewDream] = useState('')
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [isInterpreting, setIsInterpreting] = useState(false)
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    // Load saved dreams from localStorage
    const savedDreams = localStorage.getItem('dreams')
    if (savedDreams) {
      setDreams(JSON.parse(savedDreams))
    }
  }, [])

  const handleSaveDream = async () => {
    if (!newDream.trim()) {
      toast.error('Please enter your dream')
      return
    }

    const dreamEntry: DreamEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      text: newDream,
      emotions: selectedEmotions,
      isOffline: isOffline
    }

    setIsInterpreting(true)

    try {
      // Try online AI first
      const response = await fetch('/api/ai/offline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'dream_interpretation',
          data: {
            dreamText: newDream,
            emotions: selectedEmotions
          }
        })
      })

      if (response.ok) {
        const result = await response.json()
        dreamEntry.interpretation = JSON.parse(result.result.content)
        dreamEntry.isOffline = result.result.source === 'offline_llm'
      }
    } catch (error) {
      // Fallback to offline interpretation
      dreamEntry.interpretation = {
        symbols: ['Water', 'Light', 'Door'],
        emotionalTone: 'Contemplative',
        significance: "This dream reflects your subconscious processing of recent experiences.",
        advice: "Take time to reflect on what this dream is telling you about your inner state."
      }
      dreamEntry.isOffline = true
    }

    const updatedDreams = [dreamEntry, ...dreams]
    setDreams(updatedDreams)
    localStorage.setItem('dreams', JSON.stringify(updatedDreams))

    setNewDream('')
    setSelectedEmotions([])
    setIsInterpreting(false)
    toast.success('Dream saved and interpreted!')
  }

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary flex items-center">
              <Moon className="w-8 h-8 mr-3" />
              Dream Journal
            </h1>
            <p className="text-gray-600 mt-2">Record and interpret your dreams with AI insights</p>
          </div>
          <div className="flex items-center space-x-2">
            {isOffline && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                Offline Mode
              </span>
            )}
            <span className="text-sm text-gray-500">{dreams.length} dreams</span>
          </div>
        </div>

        {/* New Dream Entry */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Record Your Dream
          </h2>
          
          <textarea
            value={newDream}
            onChange={(e) => setNewDream(e.target.value)}
            placeholder="Describe your dream in detail..."
            className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How did you feel in the dream?
            </label>
            <div className="flex flex-wrap gap-2">
              {emotionOptions.map(emotion => (
                <button
                  key={emotion}
                  onClick={() => toggleEmotion(emotion)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedEmotions.includes(emotion)
                      ? 'bg-violet-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              {selectedEmotions.length} emotions selected
            </div>
            <button
              onClick={handleSaveDream}
              disabled={isInterpreting}
              className="btn btn-primary flex items-center"
            >
              {isInterpreting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Interpreting...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save & Interpret
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dreams List */}
        <div className="space-y-6">
          {dreams.length === 0 ? (
            <div className="text-center py-12">
              <Moon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No dreams recorded yet</h3>
              <p className="text-gray-500">Start by recording your first dream above</p>
            </div>
          ) : (
            dreams.map((dream) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Dream from {new Date(dream.date).toLocaleDateString()}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {dream.emotions.map(emotion => (
                        <span key={emotion} className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full text-xs">
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {dream.isOffline && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                        Offline
                      </span>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{dream.text}</p>

                {dream.interpretation && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Interpretation
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Symbols</h5>
                        <div className="flex flex-wrap gap-2">
                          {dream.interpretation.symbols.map(symbol => (
                            <span key={symbol} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {symbol}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Emotional Tone</h5>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          {dream.interpretation.emotionalTone}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="font-medium text-gray-800 mb-2">Significance</h5>
                      <p className="text-gray-700 text-sm">{dream.interpretation.significance}</p>
                    </div>

                    <div className="mt-4">
                      <h5 className="font-medium text-gray-800 mb-2">Advice</h5>
                      <p className="text-gray-700 text-sm">{dream.interpretation.advice}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}