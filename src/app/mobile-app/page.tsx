'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Heart, Moon, Star, Users, Scale, Bell, Wallet, 
  User, Settings, ChevronRight, Info, Zap, Shield, Globe,
  TrendingUp, Calendar, Clock, Target, Gift, BookOpen,
  Calculator, Brain, Compass, Crown, Diamond, Eye, Sun,
  Menu, X, Home as HomeIcon, ArrowLeft, ArrowRight,
  ChevronDown, ChevronUp, ExternalLink, Plus, Minus, Share2,
  Smartphone, Tablet, Monitor, Wifi, Battery, Volume2,
  Search, Filter, Grid, List, RefreshCw, Download,
  MessageCircle, Phone, Mail, MapPin, CreditCard,
  BarChart3, PieChart, TrendingDown, Activity,
  Lock, Unlock, Key, Database, Server, Cloud,
  CheckCircle, Play, Pause, SkipBack, SkipForward,
  Volume1, VolumeX, Mic, MicOff, Video, VideoOff,
  Camera, Image, File, FileText, FileImage, FileVideo,
  FileAudio, FileArchive, FileCode, FileJson, FileX
} from 'lucide-react'

interface MobileAppFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  route: string
  status: 'active' | 'beta' | 'coming-soon'
  category: string
  capabilities: {
    free: string[]
    premium: string[]
    admin: string[]
  }
  mobileOptimized: boolean
}

interface MobileAppCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  features: MobileAppFeature[]
}

export default function MobileAppPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentFeature, setCurrentFeature] = useState<MobileAppFeature | null>(null)
  const [showFeatureDetails, setShowFeatureDetails] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const mobileAppCategories: MobileAppCategory[] = [
    {
      id: 'daily-guidance',
      title: 'Daily Guidance',
      description: 'Your personalized daily cosmic insights',
      icon: Sparkles,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      features: [
        {
          id: 'todays-secret',
          title: "Today's Secret",
          description: 'Personalized daily cosmic guidance with lucky trio, day rules, and mood fix',
          icon: Sparkles,
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          route: '/today',
          status: 'active',
          category: 'daily-guidance',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic daily guidance (3/day)', 'Simple lucky numbers', 'Basic color suggestions'],
            premium: ['Unlimited guidance', 'Advanced lucky elements', 'Detailed day rules', 'Mood optimization', 'Share functionality'],
            admin: ['All premium features', 'Custom guidance algorithms', 'Bulk user management', 'Analytics dashboard', 'Content moderation tools']
          }
        },
        {
          id: 'lucky-trio',
          title: 'Lucky Trio',
          description: 'Your cosmic lucky elements for today - color, number, and object',
          icon: Star,
          color: 'text-violet-600',
          bgColor: 'bg-violet-50',
          route: '/today',
          status: 'active',
          category: 'daily-guidance',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic lucky number (1/day)', 'Simple color suggestion', 'Basic lucky object'],
            premium: ['Advanced lucky calculations', 'Multiple color options', 'Detailed lucky objects', 'Historical lucky data', 'Custom lucky elements'],
            admin: ['All premium features', 'Lucky algorithm customization', 'Bulk lucky element generation', 'User lucky analytics', 'Custom lucky object database']
          }
        },
        {
          id: 'moon-phases',
          title: 'Moon Phases',
          description: 'Lunar cycle guidance and rituals for optimal timing',
          icon: Moon,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          route: '/moon-phases',
          status: 'beta',
          category: 'daily-guidance',
          mobileOptimized: true,
          capabilities: {
            free: ['Current moon phase', 'Basic lunar info'],
            premium: ['Detailed lunar calendar', 'Moon rituals', 'Lunar meditations', 'Lunar timing', 'Moon phase notifications'],
            admin: ['Custom moon data', 'Ritual templates', 'Lunar analytics', 'Moon phase customization', 'Lunar event management']
          }
        }
      ]
    },
    {
      id: 'astrology',
      title: 'Astrology',
      description: 'Complete astrological analysis and charts',
      icon: Globe,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      features: [
        {
          id: 'cosmic-profile',
          title: 'Cosmic Profile',
          description: 'Complete astrological and numerological analysis of your birth chart',
          icon: User,
          color: 'text-slate-600',
          bgColor: 'bg-slate-50',
          route: '/profile',
          status: 'active',
          category: 'astrology',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic birth chart', 'Simple zodiac sign info', 'Basic numerology (Life Path)', 'Limited chart details'],
            premium: ['Complete birth chart analysis', 'Advanced numerology readings', 'Vedic astrology features', 'Detailed personality analysis', 'Chart interpretations', 'Historical data access'],
            admin: ['All premium features', 'Advanced chart customization', 'Bulk chart generation', 'Expert consultation tools', 'Chart analytics dashboard', 'Custom chart templates']
          }
        },
        {
          id: 'zodiac-systems',
          title: 'Zodiac Systems',
          description: 'Western, Vedic, Chinese, and Hybrid astrological systems',
          icon: Globe,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          route: '/zodiac-systems',
          status: 'active',
          category: 'astrology',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic zodiac info', 'Simple comparisons'],
            premium: ['Multiple systems', 'Detailed comparisons', 'Cultural insights', 'System explanations', 'Cross-system analysis'],
            admin: ['System customization', 'Cultural data', 'Advanced analytics', 'Custom systems', 'System management']
          }
        },
        {
          id: 'compatibility',
          title: 'Compatibility',
          description: 'Relationship analysis and synastry charts',
          icon: Heart,
          color: 'text-pink-600',
          bgColor: 'bg-pink-50',
          route: '/compatibility',
          status: 'active',
          category: 'astrology',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic compatibility', 'Simple synastry'],
            premium: ['Advanced synastry', 'Composite charts', 'Timing analysis', 'Relationship guidance', 'Compatibility reports'],
            admin: ['Custom compatibility', 'Bulk analysis', 'Relationship analytics', 'Compatibility algorithms', 'Relationship management']
          }
        }
      ]
    },
    {
      id: 'numerology',
      title: 'Numerology',
      description: 'Numerical analysis and life path guidance',
      icon: Calculator,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      features: [
        {
          id: 'life-path',
          title: 'Life Path Analysis',
          description: 'Your numerological life path and purpose',
          icon: Target,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          route: '/numerology',
          status: 'active',
          category: 'numerology',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic life path', 'Simple numerology'],
            premium: ['Detailed analysis', 'Multiple systems', 'Life guidance', 'Path predictions', 'Life purpose insights'],
            admin: ['Custom calculations', 'Bulk analysis', 'Numerology analytics', 'Life path algorithms', 'Purpose management']
          }
        },
        {
          id: 'expression-number',
          title: 'Expression Number',
          description: 'Your talents and abilities revealed through numbers',
          icon: Brain,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          route: '/numerology',
          status: 'active',
          category: 'numerology',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic expression', 'Simple analysis'],
            premium: ['Detailed expression', 'Talent analysis', 'Career guidance', 'Skill development', 'Expression reports'],
            admin: ['Custom expressions', 'Bulk calculations', 'Talent analytics', 'Expression algorithms', 'Talent management']
          }
        }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with like-minded cosmic souls',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      features: [
        {
          id: 'cosmic-chat',
          title: 'Cosmic Chat',
          description: 'Emoji-based cosmic conversations with consent management',
          icon: MessageCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          route: '/community',
          status: 'active',
          category: 'community',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic chat', 'Limited messages'],
            premium: ['Unlimited chat', 'Advanced features', 'Priority support', 'Chat history', 'Group chats'],
            admin: ['Moderation tools', 'Analytics', 'Community management', 'Chat moderation', 'User management']
          }
        },
        {
          id: 'cosmic-groups',
          title: 'Cosmic Groups',
          description: 'Join groups based on your cosmic profile',
          icon: Users,
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          route: '/groups',
          status: 'beta',
          category: 'community',
          mobileOptimized: true,
          capabilities: {
            free: ['Join groups', 'Basic participation'],
            premium: ['Create groups', 'Advanced features', 'Group management', 'Group events', 'Group analytics'],
            admin: ['Group moderation', 'Analytics', 'Group administration', 'Group management', 'Group analytics']
          }
        }
      ]
    },
    {
      id: 'premium',
      title: 'Premium Services',
      description: 'Advanced features and expert consultations',
      icon: Crown,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      features: [
        {
          id: 'expert-consultations',
          title: 'Expert Consultations',
          description: 'One-on-one sessions with certified astrologers and numerologists',
          icon: Users,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          route: '/consultations',
          status: 'active',
          category: 'premium',
          mobileOptimized: true,
          capabilities: {
            free: ['No consultations'],
            premium: ['2 consultations/month', 'Expert sessions', 'Follow-up support', 'Session recordings', 'Expert profiles'],
            admin: ['Unlimited consultations', 'Expert management', 'Consultation analytics', 'Expert scheduling', 'Consultation management']
          }
        },
        {
          id: 'premium-features',
          title: 'Premium Features',
          description: 'Unlock all advanced cosmic features',
          icon: Diamond,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          route: '/premium-services',
          status: 'active',
          category: 'premium',
          mobileOptimized: true,
          capabilities: {
            free: ['Basic features only'],
            premium: ['All premium features', 'Unlimited access', 'Priority support', 'Advanced analytics', 'Custom features'],
            admin: ['All features', 'Admin tools', 'System management', 'User management', 'System analytics']
          }
        }
      ]
    }
  ]

  const filteredCategories = mobileAppCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.features.some(feature =>
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'beta': return 'text-yellow-600 bg-yellow-100'
      case 'coming-soon': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'beta': return Zap
      case 'coming-soon': return Clock
      default: return Info
    }
  }

  const handleFeatureClick = (feature: MobileAppFeature) => {
    setCurrentFeature(feature)
    setShowFeatureDetails(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile App Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Daily Secrets</h1>
                <p className="text-sm text-slate-600">Mobile App Interface</p>
              </div>
            </div>
            
            {/* Mobile Status Indicators */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-xs text-slate-600">
                <Wifi className="w-3 h-3" />
                <span>Connected</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-600">
                <Battery className="w-3 h-3" />
                <span>85%</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-600">
                <Volume2 className="w-3 h-3" />
                <span>70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Controls */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-violet-100 text-violet-600' : 'text-slate-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-violet-100 text-violet-600' : 'text-slate-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Categories */}
        <div className="space-y-6">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Category Header */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{category.title}</h2>
                      <p className="text-sm text-slate-600">{category.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {selectedCategory === category.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Category Features */}
              <AnimatePresence>
                {selectedCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}`}>
                      {category.features.map((feature, featureIndex) => {
                        const StatusIcon = getStatusIcon(feature.status)
                        return (
                          <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                            className={`bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors cursor-pointer group ${
                              viewMode === 'list' ? 'flex items-center space-x-4' : ''
                            }`}
                            onClick={() => handleFeatureClick(feature)}
                          >
                            <div className={`w-8 h-8 ${feature.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <feature.icon className={`w-4 h-4 ${feature.color}`} />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                                  <StatusIcon className="w-3 h-3 inline mr-1" />
                                  {feature.status}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 mb-2">{feature.description}</p>
                              
                              {/* Capabilities Summary */}
                              <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-3 h-3 text-slate-400" />
                                  <span>Free: {feature.capabilities.free.length}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Crown className="w-3 h-3 text-violet-500" />
                                  <span>Premium: {feature.capabilities.premium.length}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Shield className="w-3 h-3 text-amber-500" />
                                  <span>Admin: {feature.capabilities.admin.length}</span>
                                </div>
                              </div>
                            </div>
                            
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {mobileAppCategories.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'active').length, 0)}
                </div>
                <div className="text-xs text-slate-600">Active</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {mobileAppCategories.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'beta').length, 0)}
                </div>
                <div className="text-xs text-slate-600">Beta</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {mobileAppCategories.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'coming-soon').length, 0)}
                </div>
                <div className="text-xs text-slate-600">Coming</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <Grid className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {mobileAppCategories.length}
                </div>
                <div className="text-xs text-slate-600">Categories</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Details Modal */}
      <AnimatePresence>
        {showFeatureDetails && currentFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowFeatureDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${currentFeature.bgColor} rounded-xl flex items-center justify-center`}>
                      <currentFeature.icon className={`w-6 h-6 ${currentFeature.color}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{currentFeature.title}</h2>
                      <p className="text-slate-600">{currentFeature.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFeatureDetails(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Capabilities by Account Type */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Capabilities</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Heart className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-slate-700">Free User</span>
                        </div>
                        <ul className="space-y-1 text-sm text-slate-600 ml-6">
                          {currentFeature.capabilities.free.map((capability, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Crown className="w-4 h-4 text-violet-500" />
                          <span className="font-medium text-slate-700">Premium User</span>
                        </div>
                        <ul className="space-y-1 text-sm text-slate-600 ml-6">
                          {currentFeature.capabilities.premium.map((capability, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4 text-amber-500" />
                          <span className="font-medium text-slate-700">Admin Account</span>
                        </div>
                        <ul className="space-y-1 text-sm text-slate-600 ml-6">
                          {currentFeature.capabilities.admin.map((capability, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-violet-600 hover:to-purple-700 transition-colors">
                      Explore Feature
                    </button>
                    <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
