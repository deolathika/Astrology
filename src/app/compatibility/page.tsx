'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  Star, 
  Moon, 
  Sun, 
  Sparkles, 
  Crown,
  ArrowRight,
  User,
  Users,
  Target,
  TrendingUp,
  BarChart3,
  Download,
  Share2,
  RefreshCw,
  Info,
  Zap,
  Shield,
  CheckCircle,
  X,
  Plus
} from 'lucide-react'
import { CosmicCard, CosmicButton, CosmicInput } from '@/components/cosmic'
import { UserFlowRouter } from '@/components/user-flow/UserFlowRouter'
import { FeatureGate } from '@/components/user-flow/FeatureGate'

interface PersonData {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
}

interface CompatibilityResult {
  overallScore: number
  emotionalCompatibility: number
  intellectualCompatibility: number
  physicalCompatibility: number
  spiritualCompatibility: number
  strengths: string[]
  challenges: string[]
  advice: string
  astrologicalFactors: {
    sunSignCompatibility: number
    moonSignCompatibility: number
    risingSignCompatibility: number
  }
  numerologicalFactors: {
    lifePathCompatibility: number
    destinyCompatibility: number
    soulUrgeCompatibility: number
  }
}

export default function CompatibilityPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [person1, setPerson1] = useState<PersonData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  })
  const [person2, setPerson2] = useState<PersonData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  })
  const [results, setResults] = useState<CompatibilityResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = async () => {
    if (!person1.name || !person1.birthDate || !person2.name || !person2.birthDate) {
      setError('Please fill in all required fields for both people')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/compatibility/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person1,
          person2
        })
      })

      if (!response.ok) {
        throw new Error('Failed to calculate compatibility')
      }

      const data = await response.json()
      setResults(data)
      setShowResults(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    console.log('Exporting compatibility report...')
  }

  const handleShare = () => {
    console.log('Sharing compatibility report...')
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please sign in to access compatibility features</h1>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <UserFlowRouter>
      <div className="min-h-screen cosmic-bg">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold cosmic-text-gradient">Compatibility</h1>
              <p className="text-violet-300">Discover relationship insights and partner matching</p>
            </div>
            <div className="flex items-center space-x-4">
              <CosmicButton
                variant="ghost"
                onClick={handleExport}
                icon={<Download className="w-4 h-4" />}
              >
                Export
              </CosmicButton>
              <CosmicButton
                variant="ghost"
                onClick={handleShare}
                icon={<Share2 className="w-4 h-4" />}
              >
                Share
              </CosmicButton>
            </div>
          </div>
        </motion.header>

        <div className="container mx-auto px-4 pb-16">
          {/* Input Forms */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Person 1 */}
              <CosmicCard variant="glass" className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Person 1</h2>
                </div>
                
                <div className="space-y-4">
                  <CosmicInput
                    label="Full Name"
                    value={person1.name}
                    onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                    placeholder="Enter full name"
                    icon={<User className="w-4 h-4" />}
                  />
                  
                  <CosmicInput
                    label="Birth Date"
                    type="date"
                    value={person1.birthDate}
                    onChange={(e) => setPerson1({ ...person1, birthDate: e.target.value })}
                    icon={<Star className="w-4 h-4" />}
                  />
                  
                  <CosmicInput
                    label="Birth Time"
                    type="time"
                    value={person1.birthTime}
                    onChange={(e) => setPerson1({ ...person1, birthTime: e.target.value })}
                    icon={<Sun className="w-4 h-4" />}
                  />
                  
                  <CosmicInput
                    label="Birth Place"
                    value={person1.birthPlace}
                    onChange={(e) => setPerson1({ ...person1, birthPlace: e.target.value })}
                    placeholder="City, Country"
                    icon={<Target className="w-4 h-4" />}
                  />
                </div>
              </CosmicCard>

              {/* Person 2 */}
              <CosmicCard variant="glass" className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Person 2</h2>
                </div>
                
                <div className="space-y-4">
                  <CosmicInput
                    label="Full Name"
                    value={person2.name}
                    onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                    placeholder="Enter full name"
                    icon={<User className="w-4 h-4" />}
                  />
                  
                  <CosmicInput
                    label="Birth Date"
                    type="date"
                    value={person2.birthDate}
                    onChange={(e) => setPerson2({ ...person2, birthDate: e.target.value })}
                    icon={<Star className="w-4 h-4" />}
                  />
                  
                  <CosmicInput
                    label="Birth Time"
                    type="time"
                    value={person2.birthTime}
                    onChange={(e) => setPerson2({ ...person2, birthTime: e.target.value })}
                    icon={<Moon className="w-4 h-4" />}
                  />
                  
                  <CosmicInput
                    label="Birth Place"
                    value={person2.birthPlace}
                    onChange={(e) => setPerson2({ ...person2, birthPlace: e.target.value })}
                    placeholder="City, Country"
                    icon={<Target className="w-4 h-4" />}
                  />
                </div>
              </CosmicCard>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300"
              >
                {error}
              </motion.div>
            )}

            <div className="mt-6 flex justify-center">
              <CosmicButton
                onClick={handleCalculate}
                loading={loading}
                disabled={loading}
                icon={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                size="lg"
              >
                {loading ? 'Calculating Compatibility...' : 'Calculate Compatibility'}
              </CosmicButton>
            </div>
          </motion.section>

          {/* Results */}
          <AnimatePresence>
            {results && showResults && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Overall Score */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <CosmicCard variant="glass" className="p-8 text-center">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-white mb-2">Compatibility Score</h2>
                      <div className="text-6xl font-bold cosmic-text-gradient mb-4">
                        {results.overallScore}%
                      </div>
                      <div className="w-full bg-violet-800/30 rounded-full h-4 mb-4">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${results.overallScore}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-4 rounded-full ${getScoreBarColor(results.overallScore)}`}
                        />
                      </div>
                      <p className="text-violet-300">
                        {results.overallScore >= 80 ? 'Excellent Match!' : 
                         results.overallScore >= 60 ? 'Good Compatibility' : 
                         results.overallScore >= 40 ? 'Moderate Compatibility' : 
                         'Challenging Match'}
                      </p>
                    </div>
                  </CosmicCard>
                </motion.div>

                {/* Detailed Scores */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <CosmicCard variant="glass" className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Detailed Compatibility Analysis</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          label: 'Emotional',
                          score: results.emotionalCompatibility,
                          icon: Heart,
                          color: 'from-pink-500 to-rose-500'
                        },
                        {
                          label: 'Intellectual',
                          score: results.intellectualCompatibility,
                          icon: Star,
                          color: 'from-blue-500 to-cyan-500'
                        },
                        {
                          label: 'Physical',
                          score: results.physicalCompatibility,
                          icon: Sun,
                          color: 'from-orange-500 to-red-500'
                        },
                        {
                          label: 'Spiritual',
                          score: results.spiritualCompatibility,
                          icon: Moon,
                          color: 'from-purple-500 to-indigo-500'
                        }
                      ].map((category, index) => (
                        <motion.div
                          key={category.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                          className="bg-violet-800/20 p-4 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                                <category.icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-semibold text-white">{category.label}</span>
                            </div>
                            <span className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                              {category.score}%
                            </span>
                          </div>
                          <div className="w-full bg-violet-800/30 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${category.score}%` }}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                              className={`h-2 rounded-full ${getScoreBarColor(category.score)}`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CosmicCard>
                </motion.div>

                {/* Strengths and Challenges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <CosmicCard variant="glass" className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {results.strengths.map((strength, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                          className="flex items-start space-x-2 text-violet-300"
                        >
                          <span className="text-green-400 mt-1">•</span>
                          <span>{strength}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CosmicCard>

                  <CosmicCard variant="glass" className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <X className="w-5 h-5 text-red-400 mr-2" />
                      Challenges
                    </h3>
                    <ul className="space-y-2">
                      {results.challenges.map((challenge, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                          className="flex items-start space-x-2 text-violet-300"
                        >
                          <span className="text-red-400 mt-1">•</span>
                          <span>{challenge}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CosmicCard>
                </motion.div>

                {/* Advice */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <CosmicCard variant="glass" className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 text-gold-400 mr-2" />
                      Relationship Advice
                    </h3>
                    <p className="text-violet-300 leading-relaxed">{results.advice}</p>
                  </CosmicCard>
                </motion.div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Premium Features Gate */}
          <FeatureGate feature="compatibilityReports">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <CosmicCard variant="glass" className="p-6 text-center">
                <Crown className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Unlock Advanced Compatibility</h3>
                <p className="text-violet-300 mb-4">
                  Get detailed relationship reports, karmic analysis, and personalized guidance for your relationship
                </p>
                <CosmicButton
                  variant="premium"
                  onClick={() => router.push('/premium')}
                  icon={<Crown className="w-4 h-4" />}
                >
                  Upgrade to Premium
                </CosmicButton>
              </CosmicCard>
            </motion.section>
          </FeatureGate>
        </div>
      </div>
    </UserFlowRouter>
  )
}