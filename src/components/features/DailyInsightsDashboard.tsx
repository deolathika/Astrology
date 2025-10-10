'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Star, 
  Moon, 
  Sun, 
  Heart, 
  Brain, 
  Zap, 
  Shield, 
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Globe,
  Users,
  MessageCircle,
  BookOpen,
  Compass,
  Gem,
  Flame,
  Waves,
  Mountain,
  Wind
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'

interface DailyInsight {
  id: string
  category: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  priority: 'high' | 'medium' | 'low'
  timestamp: Date
  personalized: boolean
}

interface CosmicEnergy {
  level: number
  type: string
  description: string
  color: string
}

export default function DailyInsightsDashboard() {
  const { personalInfo, zodiacInfo, isPersonalized } = usePersonalInfo()
  
  const [insights, setInsights] = useState<DailyInsight[]>([])
  const [cosmicEnergy, setCosmicEnergy] = useState<CosmicEnergy>({
    level: 85,
    type: 'Harmony',
    description: 'Your cosmic energy is in perfect balance today',
    color: 'from-purple-500 to-pink-500'
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [dailyCosmicData, setDailyCosmicData] = useState({
    energy: 85,
    focusArea: 'Manifestation',
    cosmicMessage: 'Trust your intuition and take inspired action today.',
    luckyMoments: '2:30 PM - 4:00 PM',
    energyLevel: 'High & Vibrant'
  })

  const categories = [
    { id: 'all', name: 'All Insights', icon: Sparkles },
    { id: 'love', name: 'Love & Relationships', icon: Heart },
    { id: 'career', name: 'Career & Success', icon: TrendingUp },
    { id: 'health', name: 'Health & Wellness', icon: Shield },
    { id: 'spiritual', name: 'Spiritual Growth', icon: Moon },
    { id: 'financial', name: 'Finance & Abundance', icon: Gem }
  ]

  const generateDailyInsights = () => {
    const baseInsights: DailyInsight[] = [
      {
        id: '1',
        category: 'love',
        title: 'Venus in Harmony',
        description: 'Your romantic relationships are blessed with harmony today. Express your feelings openly and connect deeply with loved ones.',
        icon: <Heart className="w-6 h-6" />,
        color: 'from-pink-500 to-rose-500',
        priority: 'high',
        timestamp: new Date(),
        personalized: true
      },
      {
        id: '2',
        category: 'career',
        title: 'Mercury Boosts Communication',
        description: 'Your communication skills are enhanced. Perfect time for presentations, negotiations, or important conversations.',
        icon: <MessageCircle className="w-6 h-6" />,
        color: 'from-blue-500 to-cyan-500',
        priority: 'high',
        timestamp: new Date(),
        personalized: true
      },
      {
        id: '3',
        category: 'health',
        title: 'Energy Alignment',
        description: 'Your physical and mental energy are perfectly aligned. Engage in activities that nourish both body and soul.',
        icon: <Zap className="w-6 h-6" />,
        color: 'from-green-500 to-emerald-500',
        priority: 'medium',
        timestamp: new Date(),
        personalized: true
      },
      {
        id: '4',
        category: 'spiritual',
        title: 'Lunar Wisdom',
        description: 'The moon\'s energy enhances your intuition. Trust your inner voice and pay attention to dreams.',
        icon: <Moon className="w-6 h-6" />,
        color: 'from-indigo-500 to-purple-500',
        priority: 'medium',
        timestamp: new Date(),
        personalized: true
      },
      {
        id: '5',
        category: 'financial',
        title: 'Jupiter\'s Blessing',
        description: 'Opportunities for growth and expansion are present. Be open to new possibilities and investments.',
        icon: <Gem className="w-6 h-6" />,
        color: 'from-yellow-500 to-amber-500',
        priority: 'low',
        timestamp: new Date(),
        personalized: true
      },
      {
        id: '6',
        category: 'spiritual',
        title: 'Cosmic Connection',
        description: 'Your connection to the universe is strong today. Meditate or spend time in nature to enhance this bond.',
        icon: <Star className="w-6 h-6" />,
        color: 'from-purple-500 to-violet-500',
        priority: 'medium',
        timestamp: new Date(),
        personalized: true
      }
    ]

    setInsights(baseInsights)
  }

  useEffect(() => {
    generateDailyInsights()
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Update cosmic data based on time of day
  useEffect(() => {
    const hour = currentTime.getHours()
    const messages = [
      'Trust your intuition and take inspired action today.',
      'The universe is aligning in your favor - stay open to opportunities.',
      'Your energy is magnetic today - use it to manifest your desires.',
      'Focus on gratitude and watch abundance flow into your life.',
      'The stars are whispering secrets of your destiny - listen closely.',
      'You are exactly where you need to be in this moment.',
      'Your dreams are the universe\'s way of speaking to your soul.',
      'Every challenge is an opportunity for spiritual growth.',
      'The cosmos is conspiring to bring you exactly what you need.',
      'Your inner light is shining brighter than you know.',
      'Today holds infinite possibilities for your highest good.',
      'You are a co-creator with the universe - use this power wisely.'
    ]
    
    const focusAreas = ['Manifestation', 'Relationships', 'Career', 'Health', 'Spirituality']
    const energyLevels = ['High & Vibrant', 'Balanced & Centered', 'Calm & Reflective', 'Dynamic & Active', 'Peaceful & Grounded']
    
    const timeBasedData = {
      energy: hour < 6 ? 60 : hour < 12 ? 90 : hour < 18 ? 85 : hour < 22 ? 70 : 50,
      focusArea: focusAreas[Math.floor(hour / 5) % focusAreas.length],
      cosmicMessage: messages[Math.floor(hour / 5) % messages.length],
      luckyMoments: hour < 12 ? '9:00 AM - 11:00 AM' : hour < 18 ? '2:30 PM - 4:00 PM' : '7:00 PM - 9:00 PM',
      energyLevel: energyLevels[Math.floor(hour / 5) % energyLevels.length]
    }
    
    setDailyCosmicData(timeBasedData)
  }, [currentTime])

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Daily Cosmic Insights
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Your personalized guidance for today
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <Clock className="w-5 h-5" />
            <span className="text-lg font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
            <Calendar className="w-5 h-5 ml-4" />
            <span className="text-lg">
              {currentTime.toLocaleDateString()}
            </span>
          </div>
          
          {/* Personalized Welcome Message */}
          {isPersonalized && personalInfo && zodiacInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30 backdrop-blur-sm max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">
                  Welcome back, {personalInfo.name}!
                </h2>
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-lg text-purple-200">
                Your personalized {zodiacInfo.name} insights are ready for today
              </p>
              <div className="mt-3 text-sm text-gray-300">
                Born: {personalInfo.birthDate} • {personalInfo.birthLocation}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Daily Affirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-6 cosmic-glow text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-cosmic">Today's Affirmation</h3>
            </div>
            <p className="text-xl text-gray-300 italic mb-4">
              "I am aligned with the universe's infinite wisdom and flow with cosmic energy."
            </p>
            <p className="text-sm text-gray-400">
              Repeat this affirmation throughout your day to stay connected to your spiritual essence.
            </p>
          </Card>
        </motion.div>

        {/* Daily Cosmic Snapshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card className="p-8 cosmic-glow">
            <h2 className="text-3xl font-bold text-center mb-8 text-cosmic">Your Daily Cosmic Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Your Energy */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cosmic">Your Energy</h3>
                <p className="text-sm text-gray-300 mb-2">{dailyCosmicData.energyLevel}</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{width: `${dailyCosmicData.energy}%`}}></div>
                </div>
              </div>

              {/* Focus Area */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cosmic">Focus Area</h3>
                <p className="text-sm text-gray-300 mb-2">{dailyCosmicData.focusArea}</p>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Today's Priority</span>
              </div>

              {/* Cosmic Message */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cosmic">Cosmic Message</h3>
                <p className="text-sm text-gray-300 mb-2">"{dailyCosmicData.cosmicMessage}"</p>
                <Button variant="secondary" size="sm">Read More</Button>
              </div>

              {/* Lucky Moments */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cosmic">Lucky Moments</h3>
                <p className="text-sm text-gray-300 mb-2">{dailyCosmicData.luckyMoments}</p>
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Best Time</span>
              </div>
            </div>
            
            {/* Complete Reading CTA */}
            <div className="mt-8 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="cosmic" size="lg" className="w-full sm:w-auto">
                  <Star className="w-5 h-5 mr-2" />
                  View Complete Reading
                </Button>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Heart className="w-5 h-5 mr-2" />
                  Get Personalized Insights
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Get your full astrological profile, numerology analysis, and personalized guidance
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'cosmic' : 'secondary'}
                  size="md"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </motion.div>

        {/* Insights Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${insight.color} flex items-center justify-center text-white`}>
                      {insight.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getPriorityIcon(insight.priority)}</span>
                      <span className={`text-sm font-medium ${getPriorityColor(insight.priority)}`}>
                        {insight.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {insight.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {insight.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{insight.timestamp.toLocaleTimeString()}</span>
                    </div>
                    {insight.personalized && (
                      <div className="flex items-center gap-1 text-purple-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">Personalized</span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="cosmic" size="lg" className="btn-cosmic">
              <Sparkles className="w-5 h-5 mr-2" />
              Get Detailed Reading
            </Button>
            <Button variant="secondary" size="lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Learn More
            </Button>
            <Button variant="secondary" size="lg">
              <Users className="w-5 h-5 mr-2" />
              Share Insights
            </Button>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
