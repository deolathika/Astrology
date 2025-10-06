'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Star, 
  Moon, 
  Sun, 
  Heart, 
  Brain, 
  Zap, 
  Target, 
  Compass,
  BookOpen,
  Calculator,
  Users,
  MessageCircle,
  TrendingUp,
  Shield,
  Sparkles,
  Globe,
  MapPin,
  User,
  Phone,
  Mail,
  Plus,
  CheckCircle,
  AlertCircle,
  Search,
  Map,
  Navigation as NavigationIcon,
  ArrowRight,
  Play,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import { globalLocations } from '@/data/locations'
import { getZodiacSign } from '@/lib/zodiacUtils'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'

export default function HomePage() {
  const { personalInfo: userPersonalInfo, zodiacInfo: userZodiacInfo } = usePersonalInfo()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showPersonalForm, setShowPersonalForm] = useState(false)
  const [showQuickStart, setShowQuickStart] = useState(true)
  const [dailyCosmicData, setDailyCosmicData] = useState({
    energy: 85,
    focusArea: 'Manifestation',
    cosmicMessage: 'Trust your intuition and take inspired action today.',
    luckyMoments: '2:30 PM - 4:00 PM',
    energyLevel: 'High & Vibrant'
  })
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    email: '',
    phone: ''
  })
  const [zodiacInfo, setZodiacInfo] = useState<any>(null)
  const [locationSearch, setLocationSearch] = useState('')
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [showMapPicker, setShowMapPicker] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)


  // Update time every second
  useEffect(() => {
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

  // Calculate zodiac sign when birth date changes
  useEffect(() => {
    if (personalInfo.birthDate) {
      try {
        const zodiacSign = getZodiacSign(personalInfo.birthDate)
        setZodiacInfo(zodiacSign)
      } catch (error) {
        console.error('Error calculating zodiac sign:', error)
        setZodiacInfo(null)
      }
    } else {
      setZodiacInfo(null)
    }
  }, [personalInfo.birthDate])

  // Location search functionality
  const handleLocationSearch = (query: string) => {
    setLocationSearch(query)
    if (query.length > 2) {
      const suggestions = globalLocations.filter(location =>
        location.city.toLowerCase().includes(query.toLowerCase()) ||
        location.country.toLowerCase().includes(query.toLowerCase()) ||
        location.region?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
      setLocationSuggestions(suggestions)
      setShowLocationSuggestions(true)
    } else {
      setLocationSuggestions([])
      setShowLocationSuggestions(false)
    }
  }

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location)
    setPersonalInfo({...personalInfo, birthLocation: `${location.city}, ${location.country}`})
    setLocationSearch(`${location.city}, ${location.country}`)
    setShowLocationSuggestions(false)
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const closestLocation = globalLocations.reduce((closest, location) => {
            const distance = Math.sqrt(
              Math.pow(location.latitude - latitude, 2) + 
              Math.pow(location.longitude - longitude, 2)
            )
            const closestDistance = Math.sqrt(
              Math.pow(closest.latitude - latitude, 2) + 
              Math.pow(closest.longitude - longitude, 2)
            )
            return distance < closestDistance ? location : closest
          })
          handleLocationSelect(closestLocation)
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const onboardingSteps = [
    {
      title: "Welcome to Your Spiritual Sanctuary",
      description: "A place where you can find peace, clarity, and hope",
      icon: <Sparkles className="w-12 h-12 text-purple-400" />,
      content: "Daily Secrets is your companion for spiritual growth, self-discovery, and manifesting your dreams. Take a moment to breathe and connect with your true self."
    },
    {
      title: "Share Your Journey",
      description: "Help us provide personalized guidance",
      icon: <Calendar className="w-12 h-12 text-blue-400" />,
      content: "Your birth details help us provide accurate cosmic guidance. This information is encrypted and never shared - your spiritual journey is private."
    },
    {
      title: "Begin Your Transformation",
      description: "Start your journey towards inner peace",
      icon: <Compass className="w-12 h-12 text-green-400" />,
      content: "Explore astrology, numerology, dreams, and compatibility insights. Most features are free because everyone deserves spiritual guidance."
    }
  ]

  const quickActions = [
    {
      title: "Complete Reading",
      description: "Get your full daily cosmic guidance",
      icon: <Sun className="w-8 h-8 text-yellow-400" />,
      href: "/astrology",
      color: "from-yellow-500/20 to-orange-500/20",
      priority: true
    },
    {
      title: "Dream Insights",
      description: "Understand your nightly messages",
      icon: <Moon className="w-8 h-8 text-purple-400" />,
      href: "/dreams",
      color: "from-purple-500/20 to-indigo-500/20"
    },
    {
      title: "Life Path Numbers",
      description: "Discover your numerological journey",
      icon: <Calculator className="w-8 h-8 text-blue-400" />,
      href: "/numerology",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Relationship Harmony",
      description: "Check cosmic compatibility",
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      href: "/compatibility",
      color: "from-pink-500/20 to-rose-500/20"
    }
  ]

  return (
    <div className="min-h-screen relative main-content">
      <StarfieldBackground />
      <Navigation />

      <main className="relative z-10 pt-16">
        {/* Hero Section - Simplified & More Engaging */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {userPersonalInfo ? `Welcome back, ${userPersonalInfo.name}!` : 'Your Spiritual Sanctuary'}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                {userPersonalInfo 
                  ? `A personalized space for your spiritual journey. Your ${userZodiacInfo?.name} energy is ready to guide you today.`
                  : 'A peaceful place where you can find clarity, hope, and inner strength. Connect with your true self, trust your intuition, and manifest your dreams.'
                }
              </p>
              
              {/* Quick Start CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  variant="cosmic"
                  size="lg"
                  onClick={() => setShowPersonalForm(!showPersonalForm)}
                  className="flex items-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setShowOnboarding(true)}
                  className="flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Take Tour</span>
                </Button>
              </div>

              {/* Live Time Display */}
              <div className="flex items-center justify-center text-gray-400 text-lg mb-8">
                <Clock className="mr-2" size={20} />
                <span>{currentTime.toLocaleTimeString()}</span>
                <Calendar className="ml-4 mr-2" size={20} />
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions Grid - Simplified */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-cosmic">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl bg-gradient-to-br ${action.color} border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer relative ${action.priority ? 'ring-2 ring-yellow-400/50' : ''}`}
                  >
                    {action.priority && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        Recommended
                      </div>
                    )}
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {action.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                      <p className="text-gray-300 text-sm">{action.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What's Happening in the Universe Today */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                What's Happening in the Universe Today?
              </h2>
              <p className="text-gray-300 text-lg">
                Current cosmic events and their influence on your spiritual journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Moon in Pisces */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 cosmic-glow h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                      <Moon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cosmic">Moon in Pisces</h3>
                      <p className="text-sm text-gray-400">Intuitive & Emotional</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    The Moon's presence in Pisces enhances your intuition and emotional sensitivity. 
                    This is a perfect time for meditation, dream work, and connecting with your inner wisdom.
                  </p>
                  <div className="flex items-center text-xs text-purple-300">
                    <Sparkles className="w-4 h-4 mr-1" />
                    <span>High Intuition Period</span>
                  </div>
                </Card>
              </motion.div>

              {/* Venus Trine Jupiter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 cosmic-glow h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cosmic">Venus Trine Jupiter</h3>
                      <p className="text-sm text-gray-400">Harmony & Expansion</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    This beautiful aspect brings love, abundance, and optimism into your life. 
                    Relationships flourish and creative projects receive cosmic support.
                  </p>
                  <div className="flex items-center text-xs text-pink-300">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>Love & Abundance</span>
                  </div>
                </Card>
              </motion.div>

              {/* Mercury Direct */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 cosmic-glow h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cosmic">Mercury Direct</h3>
                      <p className="text-sm text-gray-400">Clear Communication</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Mercury's direct motion brings clarity to communication and decision-making. 
                    Perfect time for important conversations and signing agreements.
                  </p>
                  <div className="flex items-center text-xs text-green-300">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>Clear Communication</span>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* How It Affects Your Energy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 cosmic-glow">
                <h3 className="text-2xl font-bold text-center mb-6 text-cosmic">How It Affects Your Energy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-cosmic">Emotional Clarity</h4>
                    <p className="text-gray-300 text-sm">
                      The Moon in Pisces heightens your emotional awareness, allowing you to process 
                      feelings with greater depth and understanding.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-cosmic">Creative Flow</h4>
                    <p className="text-gray-300 text-sm">
                      Venus trine Jupiter amplifies your creative energy, making this an ideal time 
                      for artistic expression and innovative thinking.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-cosmic">Relationship Harmony</h4>
                    <p className="text-gray-300 text-sm">
                      Mercury direct combined with Venus-Jupiter harmony creates perfect conditions 
                      for meaningful connections and heartfelt conversations.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Community of Peace */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Community of Peace
              </h2>
              <p className="text-gray-300 text-lg">
                Join our spiritual community and share your daily insights
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 cosmic-glow text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Moon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-cosmic">Luna Mystics</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    "The moon's energy has been guiding me through deep meditation. 
                    I've found such peace in the early morning hours."
                  </p>
                  <div className="flex items-center justify-center text-xs text-purple-300">
                    <Star className="w-4 h-4 mr-1" />
                    <span>Spiritual Guide</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 cosmic-glow text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-cosmic">Star Seeker</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    "Venus trine Jupiter brought such beautiful energy to my relationships. 
                    I feel more connected to my loved ones than ever."
                  </p>
                  <div className="flex items-center justify-center text-xs text-blue-300">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>Love & Relationships</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 cosmic-glow text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-cosmic">Peaceful Soul</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    "Mercury going direct has cleared so much confusion in my life. 
                    I feel more confident in my decisions now."
                  </p>
                  <div className="flex items-center justify-center text-xs text-green-300">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>Clear Communication</span>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Share Your Daily Secret */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 cosmic-glow text-center">
                <h3 className="text-2xl font-bold mb-4 text-cosmic">Share Your Daily Secret</h3>
                <p className="text-gray-300 mb-6">
                  Join our community of spiritual seekers and share how the universe is guiding you today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="cosmic" size="lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Share Your Experience
                  </Button>
                  <Button variant="secondary" size="lg">
                    <Users className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Daily Affirmation */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-6 cosmic-glow">
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
          </div>
        </section>

        {/* Daily Cosmic Snapshot */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-cosmic">Your Daily Cosmic Snapshot</h2>
            <Card className="p-8 cosmic-glow mb-8">
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
          </div>
        </section>

        {/* Quick Daily Tools */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-cosmic">Quick Daily Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 cosmic-glow text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cosmic">Today's Horoscope</h3>
                <p className="text-gray-300 text-sm mb-4">Get your personalized daily guidance based on your zodiac sign</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Read Now
                </Button>
              </Card>

              <Card className="p-6 cosmic-glow text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cosmic">Dream Journal</h3>
                <p className="text-gray-300 text-sm mb-4">Record and analyze your dreams for spiritual insights</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Start Journaling
                </Button>
              </Card>

              <Card className="p-6 cosmic-glow text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cosmic">Compatibility Check</h3>
                <p className="text-gray-300 text-sm mb-4">Discover cosmic harmony in your relationships</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Check Compatibility
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust & Transparency Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-cosmic">Your Trust Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Data Privacy</h3>
                <p className="text-gray-300">Your personal information is encrypted and never shared</p>
              </Card>
              <Card className="p-6 text-center">
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Sources</h3>
                <p className="text-gray-300">Astrological data from NASA, Swiss Ephemeris, and traditional sources</p>
              </Card>
              <Card className="p-6 text-center">
                <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free & Accessible</h3>
                <p className="text-gray-300">Most features are free because everyone deserves spiritual guidance</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Personal Information Form - Collapsible */}
        <AnimatePresence>
          {showPersonalForm && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-12 px-4"
            >
              <div className="max-w-4xl mx-auto">
                <Card className="p-8 cosmic-glow">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-cosmic">Personal Information</h2>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowPersonalForm(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Birth Date
                      </label>
                      <input
                        type="date"
                        value={personalInfo.birthDate}
                        onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500"
                      />
                      {zodiacInfo && (
                        <div className="mt-3 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-purple-300">
                                Your Zodiac Sign: {zodiacInfo.name}
                              </p>
                              <p className="text-xs text-gray-300">
                                {zodiacInfo.element} • {zodiacInfo.modality}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Birth Time
                      </label>
                      <input
                        type="time"
                        value={personalInfo.birthTime}
                        onChange={(e) => setPersonalInfo({...personalInfo, birthTime: e.target.value})}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Birth Location
                      </label>
                      <div className="relative">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={locationSearch}
                              onChange={(e) => handleLocationSearch(e.target.value)}
                              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 pr-10"
                              placeholder="Search for your birth city..."
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          </div>
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={handleCurrentLocation}
                            className="flex items-center space-x-1"
                          >
                            <NavigationIcon size={16} />
                            <span>Current</span>
                          </Button>
                        </div>
                        
                        <AnimatePresence>
                          {showLocationSuggestions && locationSuggestions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-50 w-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                            >
                              {locationSuggestions.map((location: any, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => handleLocationSelect(location)}
                                  className="w-full p-3 text-left hover:bg-white/20 transition-colors flex items-center justify-between"
                                >
                                  <div>
                                    <div className="text-white font-medium">{location.city}</div>
                                    <div className="text-gray-300 text-sm">{location.country}</div>
                                    {location.region && (
                                      <div className="text-gray-400 text-xs">{location.region}</div>
                                    )}
                                  </div>
                                  <div className="text-gray-400 text-xs">
                                    {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
                                  </div>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      {selectedLocation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white font-medium flex items-center">
                                <MapPin size={16} className="mr-2" />
                                {selectedLocation.city}, {selectedLocation.country}
                              </div>
                              <div className="text-gray-300 text-sm">
                                Coordinates: {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
                              </div>
                              <div className="text-gray-400 text-xs">
                                Timezone: {selectedLocation.timezone}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setSelectedLocation(null)
                                setLocationSearch('')
                                setPersonalInfo({...personalInfo, birthLocation: ''})
                              }}
                            >
                              Clear
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button variant="cosmic" size="lg">
                      Save & Continue
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Features Overview - Simplified */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Explore Your Cosmic Journey</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/astrology">
                <Card className="p-8 hover:scale-105 cosmic-glow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🌟</div>
                    <h3 className="text-2xl font-bold mb-4 text-cosmic">Advanced Astrology</h3>
                    <p className="text-gray-300 mb-6">Multiple astrological systems, birth charts, transits, and real-time planetary positions.</p>
                    <Button variant="primary" className="w-full">
                      Explore Astrology
                    </Button>
                  </div>
                </Card>
              </Link>

              <Link href="/numerology">
                <Card className="p-8 hover:scale-105 cosmic-glow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🔢</div>
                    <h3 className="text-2xl font-bold mb-4 text-cosmic">Comprehensive Numerology</h3>
                    <p className="text-gray-300 mb-6">Life path, destiny, soul urge, and compatibility analysis across multiple systems.</p>
                    <Button variant="primary" className="w-full">
                      Calculate Numbers
                    </Button>
                  </div>
                </Card>
              </Link>

              <Link href="/dreams">
                <Card className="p-8 hover:scale-105 cosmic-glow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🌙</div>
                    <h3 className="text-2xl font-bold mb-4 text-cosmic">Dream Analysis</h3>
                    <p className="text-gray-300 mb-6">AI-powered dream interpretation with multiple analysis methods and symbol recognition.</p>
                    <Button variant="primary" className="w-full">
                      Analyze Dreams
                    </Button>
                  </div>
                </Card>
              </Link>

              <Link href="/compatibility">
                <Card className="p-8 hover:scale-105 cosmic-glow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4">💕</div>
                    <h3 className="text-2xl font-bold mb-4 text-cosmic">Compatibility</h3>
                    <p className="text-gray-300 mb-6">Relationship analysis with regional astrology systems and comprehensive matching.</p>
                    <Button variant="primary" className="w-full">
                      Check Compatibility
                    </Button>
                  </div>
                </Card>
              </Link>

              <Link href="/community">
                <Card className="p-8 hover:scale-105 cosmic-glow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4">👥</div>
                    <h3 className="text-2xl font-bold mb-4 text-cosmic">Community</h3>
                    <p className="text-gray-300 mb-6">Connect with like-minded individuals and share your cosmic journey.</p>
                    <Button variant="primary" className="w-full">
                      Join Community
                    </Button>
                  </div>
                </Card>
              </Link>

              <Link href="/insights">
                <Card className="p-8 hover:scale-105 cosmic-glow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🔮</div>
                    <h3 className="text-2xl font-bold mb-4 text-cosmic">Daily Insights</h3>
                    <p className="text-gray-300 mb-6">Personalized daily guidance based on your cosmic profile and current energies.</p>
                    <Button variant="primary" className="w-full">
                      Get Insights
                    </Button>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Onboarding Modal */}
        <AnimatePresence>
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {onboardingSteps[onboardingStep].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {onboardingSteps[onboardingStep].title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {onboardingSteps[onboardingStep].description}
                  </p>
                  <p className="text-gray-400 text-sm mb-8">
                    {onboardingSteps[onboardingStep].content}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Button
                      variant="secondary"
                      onClick={() => setShowOnboarding(false)}
                    >
                      Skip
                    </Button>
                    
                    <div className="flex space-x-2">
                      {onboardingSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === onboardingStep ? 'bg-purple-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <Button
                      variant="cosmic"
                      onClick={() => {
                        if (onboardingStep < onboardingSteps.length - 1) {
                          setOnboardingStep(onboardingStep + 1)
                        } else {
                          setShowOnboarding(false)
                          setOnboardingStep(0)
                        }
                      }}
                    >
                      {onboardingStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}