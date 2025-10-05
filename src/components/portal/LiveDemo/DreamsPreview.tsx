/**
 * Dreams Preview Component
 * Interactive dream interpretation demo
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sparkles, Brain, AlertCircle } from 'lucide-react'

const dreamSymbols = {
  water: "Water represents emotions, intuition, and the subconscious mind. It suggests you're processing deep feelings.",
  flying: "Flying in dreams often represents freedom, ambition, and the desire to rise above limitations.",
  falling: "Falling dreams may indicate feelings of insecurity or loss of control in your waking life.",
  house: "Houses in dreams represent the self and different aspects of your personality or life.",
  animals: "Animals in dreams often represent instinctual behaviors or aspects of your personality.",
  death: "Death in dreams typically represents transformation, endings, and new beginnings rather than literal death.",
  chase: "Being chased suggests you're avoiding something in your waking life that needs attention.",
  teeth: "Teeth dreams often relate to communication, confidence, or concerns about appearance.",
  car: "Cars represent your life's direction, control, and how you're navigating your path forward.",
  money: "Money in dreams often relates to self-worth, value, and your relationship with abundance."
}

const getDreamInsight = (dreamText: string): string => {
  const text = dreamText.toLowerCase()
  
  // Simple keyword matching for demo
  const insights = []
  
  if (text.includes('water') || text.includes('ocean') || text.includes('river')) {
    insights.push(dreamSymbols.water)
  }
  if (text.includes('flying') || text.includes('fly') || text.includes('soar')) {
    insights.push(dreamSymbols.flying)
  }
  if (text.includes('falling') || text.includes('fall')) {
    insights.push(dreamSymbols.falling)
  }
  if (text.includes('house') || text.includes('home') || text.includes('building')) {
    insights.push(dreamSymbols.house)
  }
  if (text.includes('animal') || text.includes('dog') || text.includes('cat') || text.includes('bird')) {
    insights.push(dreamSymbols.animals)
  }
  if (text.includes('death') || text.includes('die') || text.includes('dead')) {
    insights.push(dreamSymbols.death)
  }
  if (text.includes('chase') || text.includes('running') || text.includes('escape')) {
    insights.push(dreamSymbols.chase)
  }
  if (text.includes('teeth') || text.includes('tooth')) {
    insights.push(dreamSymbols.teeth)
  }
  if (text.includes('car') || text.includes('driving') || text.includes('vehicle')) {
    insights.push(dreamSymbols.car)
  }
  if (text.includes('money') || text.includes('cash') || text.includes('dollar')) {
    insights.push(dreamSymbols.money)
  }
  
  if (insights.length === 0) {
    return "Your dream contains rich symbolic content. Dreams are personal messages from your subconscious, offering insights into your emotions, desires, and life path. Consider the feelings and themes in your dream for deeper understanding."
  }
  
  return insights.join(' ')
}

export function DreamsPreview() {
  const [dreamText, setDreamText] = useState('')
  const [interpretation, setInterpretation] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!dreamText.trim()) return

    setIsAnalyzing(true)
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      const insight = getDreamInsight(dreamText)
      setInterpretation(insight)
    } catch (error) {
      console.error('Error analyzing dream:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleClear = () => {
    setDreamText('')
    setInterpretation('')
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Moon className="w-4 h-4" />
          <span>Describe your dream</span>
        </div>
        
        <div className="space-y-3">
          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="Share your dream here... What did you see, feel, or experience? Include any symbols, people, or situations that stood out to you."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors resize-none"
            rows={4}
          />
          
          <div className="flex space-x-3">
            <button
              onClick={handleAnalyze}
              disabled={!dreamText.trim() || isAnalyzing}
              className="flex-1 portal-btn portal-btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Analyze Dream'
              )}
            </button>
            
            {dreamText && (
              <button
                onClick={handleClear}
                className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Section */}
      {interpretation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="portal-card p-6"
        >
          <div className="space-y-4">
            {/* Interpretation Header */}
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-violet-600" />
              <span className="text-lg font-semibold text-gray-900">Dream Interpretation</span>
            </div>

            {/* Interpretation Text */}
            <div className="bg-gradient-to-r from-violet-50 to-sky-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {interpretation}
              </p>
            </div>

            {/* Additional Insights */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm font-medium text-violet-700">
                <Sparkles className="w-4 h-4" />
                <span>Key Insights</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2" />
                  <span>Dreams reflect your subconscious thoughts and emotions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2" />
                  <span>Symbols have personal meanings unique to you</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2" />
                  <span>Pay attention to recurring themes and patterns</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2" />
                  <span>Dreams can offer guidance and clarity</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <div className="font-medium mb-1">Inspiration, Not Advice</div>
                  <p>
                    This interpretation is for inspiration and self-reflection. Dreams are personal 
                    and symbolic. Use your own intuition and judgment when interpreting your dreams.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Moon className="w-3 h-3 text-blue-600" />
                <span className="font-medium text-blue-800">Demo Mode</span>
              </div>
              <p className="mt-1 text-blue-700">
                This is a preview. Get AI-powered dream analysis, dream journaling, 
                and personalized dream insights in the full app.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!interpretation && (
        <div className="text-center text-sm text-gray-500">
          <p>Describe your dream above to get a symbolic interpretation and insights.</p>
        </div>
      )}
    </div>
  )
}
