'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, BookOpen, Star, Heart, Target, Zap, Shield, 
  ChevronDown, ChevronUp, Info, Sparkles, TrendingUp, Globe, Calendar,
  Users, Smartphone, Lock
} from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CosmicNavigation } from '@/components/cosmic-navigation'

interface NumerologyData {
  lifePath: number
  expression: number
  soulUrge: number
  personality: number
  birthday: number
  maturity: number
  currentName: number
  masterNumbers: number[]
  chaldean: {
    lifePath: number
    expression: number
    soulUrge: number
    personality: number
  }
  dailyNumber: number
  luckyNumbers: number[]
  compatibility: {
    romantic: number
    friendship: number
    business: number
  }
}

interface NumberMeaning {
  number: number
  title: string
  description: string
  strengths: string[]
  challenges: string[]
  advice: string[]
  colors: string[]
  gemstones: string[]
  career: string[]
  relationships: string[]
}

export default function NumerologyPage() {
  const [numerologyData, setNumerologyData] = useState<NumerologyData | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadNumerologyData()
  }, [])

  const loadNumerologyData = async () => {
    try {
      const response = await fetch('/api/numerology/enhanced?profileId=test123')
      if (response.ok) {
        const data = await response.json()
        setNumerologyData(data.numerology)
      }
    } catch (error) {
      // Mock data for development
      setNumerologyData({
        lifePath: 7,
        expression: 3,
        soulUrge: 9,
        personality: 6,
        birthday: 15,
        maturity: 1,
        currentName: 8,
        masterNumbers: [11],
        chaldean: {
          lifePath: 5,
          expression: 8,
          soulUrge: 4,
          personality: 7
        },
        dailyNumber: 4,
        luckyNumbers: [3, 7, 11, 15, 22],
        compatibility: {
          romantic: 85,
          friendship: 92,
          business: 78
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const numberMeanings: NumberMeaning[] = [
    {
      number: 1,
      title: 'The Leader',
      description: 'Natural born leaders with strong independence and originality',
      strengths: ['Leadership', 'Independence', 'Originality', 'Courage', 'Determination'],
      challenges: ['Impatience', 'Arrogance', 'Dominance', 'Selfishness'],
      advice: ['Lead by example', 'Be patient with others', 'Share credit', 'Listen to feedback'],
      colors: ['Red', 'Orange', 'Gold'],
      gemstones: ['Ruby', 'Carnelian', 'Citrine'],
      career: ['CEO', 'Entrepreneur', 'Manager', 'Politician', 'Inventor'],
      relationships: ['Needs independence', 'Direct communication', 'Values honesty', 'Loyal partner']
    },
    {
      number: 2,
      title: 'The Diplomat',
      description: 'Cooperative, diplomatic, and sensitive to others\' needs',
      strengths: ['Cooperation', 'Diplomacy', 'Sensitivity', 'Patience', 'Intuition'],
      challenges: ['Indecisiveness', 'Over-sensitivity', 'Dependency', 'Passivity'],
      advice: ['Trust your intuition', 'Make decisions confidently', 'Set boundaries', 'Express your needs'],
      colors: ['Silver', 'White', 'Light Blue'],
      gemstones: ['Moonstone', 'Pearl', 'Opal'],
      career: ['Mediator', 'Counselor', 'Artist', 'Teacher', 'Healer'],
      relationships: ['Great listener', 'Supportive partner', 'Needs harmony', 'Avoids conflict']
    },
    {
      number: 3,
      title: 'The Creative',
      description: 'Expressive, optimistic, and naturally creative individuals',
      strengths: ['Creativity', 'Optimism', 'Self-expression', 'Humor', 'Communication'],
      challenges: ['Scattered energy', 'Superficiality', 'Gossip', 'Lack of focus'],
      advice: ['Focus your energy', 'Develop depth', 'Use creativity wisely', 'Stay positive'],
      colors: ['Yellow', 'Orange', 'Bright Green'],
      gemstones: ['Citrine', 'Amber', 'Topaz'],
      career: ['Artist', 'Writer', 'Performer', 'Designer', 'Communicator'],
      relationships: ['Fun-loving', 'Expressive', 'Needs variety', 'Inspiring partner']
    },
    {
      number: 4,
      title: 'The Builder',
      description: 'Practical, hardworking, and focused on building solid foundations',
      strengths: ['Practicality', 'Hard work', 'Stability', 'Organization', 'Reliability'],
      challenges: ['Rigidity', 'Stubbornness', 'Workaholic', 'Lack of flexibility'],
      advice: ['Be more flexible', 'Take breaks', 'Embrace change', 'Balance work and play'],
      colors: ['Green', 'Brown', 'Earth tones'],
      gemstones: ['Emerald', 'Jade', 'Malachite'],
      career: ['Engineer', 'Architect', 'Accountant', 'Manager', 'Builder'],
      relationships: ['Loyal and stable', 'Needs security', 'Practical approach', 'Long-term commitment']
    },
    {
      number: 5,
      title: 'The Adventurer',
      description: 'Freedom-loving, adventurous, and always seeking new experiences',
      strengths: ['Freedom', 'Adventure', 'Versatility', 'Curiosity', 'Adaptability'],
      challenges: ['Restlessness', 'Irresponsibility', 'Commitment issues', 'Impulsiveness'],
      advice: ['Channel restlessness', 'Commit to goals', 'Balance freedom and responsibility'],
      colors: ['Blue', 'Turquoise', 'Silver'],
      gemstones: ['Aquamarine', 'Turquoise', 'Sapphire'],
      career: ['Traveler', 'Journalist', 'Sales', 'Pilot', 'Explorer'],
      relationships: ['Needs freedom', 'Spontaneous', 'Avoids routine', 'Adventurous partner']
    },
    {
      number: 6,
      title: 'The Nurturer',
      description: 'Caring, responsible, and focused on family and community',
      strengths: ['Nurturing', 'Responsibility', 'Harmony', 'Service', 'Love'],
      challenges: ['Over-responsibility', 'Interference', 'Perfectionism', 'Self-sacrifice'],
      advice: ['Set healthy boundaries', 'Practice self-care', 'Accept imperfection', 'Ask for help'],
      colors: ['Pink', 'Rose', 'Coral'],
      gemstones: ['Rose Quartz', 'Pink Tourmaline', 'Rhodonite'],
      career: ['Teacher', 'Nurse', 'Counselor', 'Parent', 'Healer'],
      relationships: ['Caring partner', 'Family-oriented', 'Nurturing', 'Needs appreciation']
    },
    {
      number: 7,
      title: 'The Seeker',
      description: 'Spiritual, analytical, and always seeking deeper meaning',
      strengths: ['Spirituality', 'Analysis', 'Intuition', 'Wisdom', 'Introspection'],
      challenges: ['Isolation', 'Perfectionism', 'Skepticism', 'Over-analysis'],
      advice: ['Trust your intuition', 'Share your wisdom', 'Balance solitude and social', 'Accept imperfection'],
      colors: ['Purple', 'Violet', 'Deep Blue'],
      gemstones: ['Amethyst', 'Lepidolite', 'Sugilite'],
      career: ['Researcher', 'Philosopher', 'Scientist', 'Mystic', 'Analyst'],
      relationships: ['Needs space', 'Deep connections', 'Spiritual partner', 'Values privacy']
    },
    {
      number: 8,
      title: 'The Achiever',
      description: 'Ambitious, material success-oriented, and natural leaders',
      strengths: ['Ambition', 'Material success', 'Authority', 'Organization', 'Power'],
      challenges: ['Workaholic', 'Materialism', 'Power struggles', 'Impatience'],
      advice: ['Balance work and life', 'Share success', 'Use power wisely', 'Practice patience'],
      colors: ['Black', 'Dark Blue', 'Gold'],
      gemstones: ['Black Onyx', 'Hematite', 'Garnet'],
      career: ['CEO', 'Executive', 'Banker', 'Manager', 'Entrepreneur'],
      relationships: ['Needs respect', 'Power dynamics', 'Material security', 'Ambitious partner']
    },
    {
      number: 9,
      title: 'The Humanitarian',
      description: 'Compassionate, wise, and focused on serving humanity',
      strengths: ['Compassion', 'Wisdom', 'Humanitarianism', 'Generosity', 'Universal love'],
      challenges: ['Self-sacrifice', 'Perfectionism', 'Bitter endings', 'Over-giving'],
      advice: ['Practice self-care', 'Accept endings', 'Balance giving and receiving', 'Trust the process'],
      colors: ['Gold', 'White', 'Rainbow'],
      gemstones: ['Citrine', 'Clear Quartz', 'Rainbow Fluorite'],
      career: ['Healer', 'Teacher', 'Philosopher', 'Artist', 'Humanitarian'],
      relationships: ['Universal love', 'Compassionate', 'Needs space', 'Spiritual connection']
    },
    {
      number: 11,
      title: 'The Intuitive',
      description: 'Master number with heightened intuition and spiritual awareness',
      strengths: ['Intuition', 'Inspiration', 'Spiritual awareness', 'Idealism', 'Vision'],
      challenges: ['Nervous energy', 'Perfectionism', 'Over-sensitivity', 'Unrealistic expectations'],
      advice: ['Trust your intuition', 'Ground your energy', 'Accept imperfection', 'Share your vision'],
      colors: ['Silver', 'White', 'Light Purple'],
      gemstones: ['Moonstone', 'Selenite', 'Amethyst'],
      career: ['Mystic', 'Intuitive', 'Artist', 'Visionary', 'Spiritual teacher'],
      relationships: ['Spiritual connection', 'Intuitive bond', 'Needs understanding', 'Soul mate potential']
    },
    {
      number: 22,
      title: 'The Master Builder',
      description: 'Master number with ability to manifest large-scale projects',
      strengths: ['Master building', 'Practical vision', 'Large-scale projects', 'Manifestation', 'Leadership'],
      challenges: ['Overwhelm', 'Perfectionism', 'Pressure', 'Unrealistic expectations'],
      advice: ['Break down projects', 'Trust the process', 'Delegate when needed', 'Stay grounded'],
      colors: ['Deep Blue', 'Purple', 'Gold'],
      gemstones: ['Lapis Lazuli', 'Amethyst', 'Citrine'],
      career: ['Architect', 'CEO', 'Visionary', 'Master builder', 'Large-scale planner'],
      relationships: ['Power couple', 'Shared vision', 'Building together', 'Master partnership']
    },
    {
      number: 33,
      title: 'The Master Teacher',
      description: 'Master number with ability to teach and heal through compassion',
      strengths: ['Master teaching', 'Healing', 'Compassion', 'Spiritual guidance', 'Universal love'],
      challenges: ['Overwhelm', 'Self-sacrifice', 'Perfectionism', 'Unrealistic expectations'],
      advice: ['Practice self-care', 'Accept limitations', 'Share wisdom', 'Trust the process'],
      colors: ['White', 'Gold', 'Rainbow'],
      gemstones: ['Clear Quartz', 'Citrine', 'Rainbow Fluorite'],
      career: ['Spiritual teacher', 'Healer', 'Master counselor', 'Guru', 'Universal servant'],
      relationships: ['Spiritual partnership', 'Universal love', 'Teaching together', 'Soul connection']
    }
  ]

  const numerologySections = [
    {
      id: 'core-numbers',
      title: 'Core Numbers',
      icon: Calculator,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50'
    },
    {
      id: 'master-numbers',
      title: 'Master Numbers',
      icon: Star,
      color: 'text-gold-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'chaldean',
      title: 'Chaldean System',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'daily',
      title: 'Daily Numerology',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'compatibility',
      title: 'Numerology Compatibility',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'meanings',
      title: 'Number Meanings',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const getMasterNumberColor = (number: number) => {
    switch (number) {
      case 11: return 'text-violet-600'
      case 22: return 'text-blue-600'
      case 33: return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading your numerology profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Breadcrumbs />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
            Numerology Analysis
          </h1>
          <p className="text-gray-600">
            Discover the hidden meanings in your numbers
          </p>
        </motion.div>

        {/* Quick Overview */}
        {numerologyData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="card p-4 text-center">
              <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.lifePath)}`}>
                {numerologyData.lifePath}
              </div>
              <div className="text-sm text-gray-600">Life Path</div>
            </div>
            <div className="card p-4 text-center">
              <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.expression)}`}>
                {numerologyData.expression}
              </div>
              <div className="text-sm text-gray-600">Expression</div>
            </div>
            <div className="card p-4 text-center">
              <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.soulUrge)}`}>
                {numerologyData.soulUrge}
              </div>
              <div className="text-sm text-gray-600">Soul Urge</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-3xl font-bold text-violet-600">
                {numerologyData.dailyNumber}
              </div>
              <div className="text-sm text-gray-600">Today's Number</div>
            </div>
          </motion.div>
        )}

        {/* Numerology Sections */}
        <div className="space-y-6">
          {numerologySections.map((section, index) => {
            const Icon = section.icon
            const isExpanded = expandedSection === section.id
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${section.color}`} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-gray-600">
                        {section.id === 'core-numbers' && 'Your fundamental life numbers'}
                        {section.id === 'master-numbers' && 'Special numbers with enhanced power'}
                        {section.id === 'chaldean' && 'Ancient Babylonian numerology system'}
                        {section.id === 'daily' && 'Today\'s numerological influences'}
                        {section.id === 'compatibility' && 'Relationship compatibility through numbers'}
                        {section.id === 'meanings' && 'Detailed meanings of each number'}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 border-t pt-6"
                    >
                      {section.id === 'core-numbers' && numerologyData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="text-center p-4 bg-violet-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Life Path</h4>
                            <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.lifePath)}`}>
                              {numerologyData.lifePath}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Your life's purpose and journey</p>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Expression</h4>
                            <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.expression)}`}>
                              {numerologyData.expression}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Your talents and abilities</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Soul Urge</h4>
                            <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.soulUrge)}`}>
                              {numerologyData.soulUrge}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Your heart's deepest desire</p>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Personality</h4>
                            <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.personality)}`}>
                              {numerologyData.personality}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">How others see you</p>
                          </div>
                          <div className="text-center p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Birthday</h4>
                            <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.birthday)}`}>
                              {numerologyData.birthday}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Your special gift</p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Maturity</h4>
                            <div className={`text-3xl font-bold ${getMasterNumberColor(numerologyData.maturity)}`}>
                              {numerologyData.maturity}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Your potential</p>
                          </div>
                        </div>
                      )}

                      {section.id === 'master-numbers' && numerologyData && (
                        <div className="space-y-6">
                          {numerologyData.masterNumbers.length > 0 ? (
                            <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Master Numbers</h4>
                              <div className="flex flex-wrap gap-4">
                                {numerologyData.masterNumbers.map((number) => (
                                  <div key={number} className="text-center p-4 bg-white rounded-lg shadow-sm">
                                    <div className={`text-4xl font-bold ${getMasterNumberColor(number)}`}>
                                      {number}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-2">
                                      {number === 11 && 'The Intuitive'}
                                      {number === 22 && 'The Master Builder'}
                                      {number === 33 && 'The Master Teacher'}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Master Numbers</h4>
                              <p className="text-gray-600">Your numbers are single digits, which is perfectly normal and powerful in its own way.</p>
                            </div>
                          )}
                        </div>
                      )}

                      {section.id === 'chaldean' && numerologyData && (
                        <div className="space-y-6">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-4">Chaldean System Comparison</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="font-medium text-gray-800 mb-3">Pythagorean (Standard)</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Life Path:</span>
                                    <span className="font-semibold">{numerologyData.lifePath}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Expression:</span>
                                    <span className="font-semibold">{numerologyData.expression}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Soul Urge:</span>
                                    <span className="font-semibold">{numerologyData.soulUrge}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-800 mb-3">Chaldean (Ancient)</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Life Path:</span>
                                    <span className="font-semibold">{numerologyData.chaldean.lifePath}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Expression:</span>
                                    <span className="font-semibold">{numerologyData.chaldean.expression}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Soul Urge:</span>
                                    <span className="font-semibold">{numerologyData.chaldean.soulUrge}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.id === 'daily' && numerologyData && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="text-center p-6 bg-green-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Today's Number</h4>
                              <div className="text-4xl font-bold text-green-600 mb-2">
                                {numerologyData.dailyNumber}
                              </div>
                              <p className="text-sm text-gray-600">Your numerological influence for today</p>
                            </div>
                            <div className="p-6 bg-violet-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-4">Lucky Numbers</h4>
                              <div className="flex flex-wrap gap-2">
                                {numerologyData.luckyNumbers.map((number, index) => (
                                  <span key={index} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
                                    {number}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.id === 'compatibility' && numerologyData && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-pink-50 rounded-lg">
                              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                              <div className="text-2xl font-bold text-pink-600">
                                {numerologyData.compatibility.romantic}%
                              </div>
                              <div className="text-sm text-gray-600">Romantic</div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                              <div className="text-2xl font-bold text-blue-600">
                                {numerologyData.compatibility.friendship}%
                              </div>
                              <div className="text-sm text-gray-600">Friendship</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                              <div className="text-2xl font-bold text-green-600">
                                {numerologyData.compatibility.business}%
                              </div>
                              <div className="text-sm text-gray-600">Business</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.id === 'meanings' && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {numberMeanings.map((meaning) => (
                              <motion.div
                                key={meaning.number}
                                className="card p-4 cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => setSelectedNumber(selectedNumber === meaning.number ? null : meaning.number)}
                              >
                                <div className="text-center">
                                  <div className="text-3xl font-bold text-violet-600 mb-2">
                                    {meaning.number}
                                  </div>
                                  <h4 className="font-semibold text-gray-900 mb-1">{meaning.title}</h4>
                                  <p className="text-sm text-gray-600">{meaning.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <AnimatePresence>
                            {selectedNumber && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="card p-6 bg-gradient-to-r from-violet-50 to-purple-50"
                              >
                                {numberMeanings
                                  .filter(meaning => meaning.number === selectedNumber)
                                  .map((meaning) => (
                                    <div key={meaning.number}>
                                      <div className="text-center mb-6">
                                        <div className="text-4xl font-bold text-violet-600 mb-2">
                                          {meaning.number}
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                          {meaning.title}
                                        </h3>
                                        <p className="text-gray-600">{meaning.description}</p>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                            <Zap className="w-4 h-4 mr-2 text-green-500" />
                                            Strengths
                                          </h4>
                                          <ul className="space-y-1">
                                            {meaning.strengths.map((strength, index) => (
                                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                                                {strength}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                            <Shield className="w-4 h-4 mr-2 text-orange-500" />
                                            Challenges
                                          </h4>
                                          <ul className="space-y-1">
                                            {meaning.challenges.map((challenge, index) => (
                                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                                                {challenge}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-3">Advice</h4>
                                          <ul className="space-y-1">
                                            {meaning.advice.map((advice, index) => (
                                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                                <div className="w-2 h-2 bg-violet-500 rounded-full mr-2" />
                                                {advice}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-3">Colors & Gemstones</h4>
                                          <div className="space-y-2">
                                            <div>
                                              <span className="text-sm font-medium text-gray-700">Colors: </span>
                                              <span className="text-sm text-gray-600">{meaning.colors.join(', ')}</span>
                                            </div>
                                            <div>
                                              <span className="text-sm font-medium text-gray-700">Gemstones: </span>
                                              <span className="text-sm text-gray-600">{meaning.gemstones.join(', ')}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      <CosmicNavigation />
    </div>
  )
}
