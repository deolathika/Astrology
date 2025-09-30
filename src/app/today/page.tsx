'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Heart, Star, Share2, Bookmark, RefreshCw, 
  Calendar, Clock, MapPin, ChevronDown, ChevronUp,
  Smartphone, Wifi, Battery, Volume2, ArrowLeft,
  Target, Zap, Crown, Compass, Gift, Eye, Sun, Moon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TodayPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [reactions, setReactions] = useState({
    sparkles: 0,
    heart: 0,
    star: 0
  })
  const [userReaction, setUserReaction] = useState<string | null>(null)
  const [todayData, setTodayData] = useState<any>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Simulate fetching today's data
    setTimeout(() => {
      setTodayData({
        title: "Today's Cosmic Whisper",
        summary: "The stars align to bring you a day of profound introspection and gentle growth. Embrace the quiet moments to connect with your inner self and find clarity amidst the cosmic flow.",
        luckyNumbers: [7, 14, 21],
        luckyColors: ["Deep Blue", "Silver", "Emerald Green"],
        mood: "Reflective & Calm",
        focus: "Inner Harmony",
        advice: "Listen to your intuition. A subtle shift in perspective can unlock new opportunities. Trust the journey.",
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        location: "New York, USA",
        shareCaption: "Discover your daily cosmic guidance with Daily Secrets! ✨ #DailySecrets #Astrology #Numerology",
        cosmicInsights: [
          {
            title: "Planetary Alignment",
            description: "Venus and Jupiter form a harmonious aspect today",
            icon: Star,
            color: "text-yellow-500"
          },
          {
            title: "Lunar Phase",
            description: "Waxing Crescent - perfect for new beginnings",
            icon: Moon,
            color: "text-slate-500"
          },
          {
            title: "Numerological Focus",
            description: "Your personal number 7 brings wisdom and introspection",
            icon: Target,
            color: "text-purple-500"
          }
        ]
      })
      setIsLoading(false)
    }, 1500)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: todayData.title,
        text: todayData.shareCaption,
        url: window.location.href,
      }).catch((error) => {
        // Handle sharing error silently
        alert('Unable to share. Please try again.')
      })
    } else {
      alert('Web Share API is not supported in your browser. You can copy the text manually.')
      const shareText = `${todayData.title}\n\n${todayData.summary}\n\n${todayData.shareCaption}\n\nRead more at: ${typeof window !== 'undefined' ? window.location.href : ''}`
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Copied to clipboard!'))
        .catch((error) => {
          // Handle clipboard error silently
          alert('Unable to copy to clipboard. Please try again.')
        })
    }
  }

  const handleReaction = (reactionType: 'sparkles' | 'heart' | 'star') => {
    setReactions(prev => ({
      ...prev,
      [reactionType]: prev[reactionType] + (userReaction === reactionType ? -1 : 1)
    }))
    setUserReaction(userReaction === reactionType ? null : reactionType)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your cosmic guidance...</p>
        </div>
      </div>
    )
  }

  if (!todayData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-600">Failed to load today's secrets. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-Optimized Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h1 className="text-lg md:text-xl font-semibold text-slate-900">Today's Secret</h1>
            </div>
            
            <div className="flex items-center space-x-1 md:space-x-2">
              <button
                onClick={handleShare}
                className="p-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                <Bookmark className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Mobile Status Bar */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4"
          >
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-3 h-3" />
                <span>Mobile Optimized</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Wifi className="w-3 h-3" />
                  <span>Connected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Battery className="w-3 h-3" />
                  <span>85%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Volume2 className="w-3 h-3" />
                  <span>70%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">{todayData.title}</h2>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center text-slate-500 text-xs md:text-sm mb-4 md:mb-6 space-y-2 md:space-y-0 md:space-x-4">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1.5" /> {todayData.date}
            </span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1.5" /> {todayData.time}
            </span>
            <span className="flex items-center">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1.5" /> {todayData.location}
            </span>
          </div>

          <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{todayData.summary}</p>

          {/* Cosmic Insights - Mobile Optimized */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {todayData.cosmicInsights.map((insight: any, index: number) => {
              const Icon = insight.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center"
                >
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 ${insight.color}`} />
                  <h3 className="text-xs md:text-sm font-semibold text-slate-800 mb-1">{insight.title}</h3>
                  <p className="text-xs text-slate-600">{insight.description}</p>
                </motion.div>
              )
            })}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-slate-100 pt-4 md:pt-6 mt-4 md:mt-6 space-y-4 md:space-y-6"
              >
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3 flex items-center">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-violet-500 mr-2" /> Lucky Trio
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-violet-800 mb-2">Lucky Numbers</h4>
                      <div className="flex space-x-2">
                        {todayData.luckyNumbers.map((num: any, index: number) => (
                          <span key={index} className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-violet-800 mb-2">Lucky Colors</h4>
                      <div className="flex space-x-2">
                        {todayData.luckyColors.map((color: any, index: number) => (
                          <div key={index} className="w-8 h-8 rounded-full border-2 border-violet-300 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-green-400"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 mr-2" /> Cosmic Focus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <p className="text-sm text-slate-700"><span className="font-semibold">Mood:</span> {todayData.mood}</p>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <p className="text-sm text-slate-700"><span className="font-semibold">Focus:</span> {todayData.focus}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3 flex items-center">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mr-2" /> Daily Advice
                  </h3>
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <p className="text-sm md:text-base text-slate-700">{todayData.advice}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile-Optimized Reactions */}
          <div className="flex justify-center space-x-2 md:space-x-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-100">
            <button
              onClick={() => handleReaction('sparkles')}
              className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-full transition-colors text-xs md:text-sm ${
                userReaction === 'sparkles' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{reactions.sparkles}</span>
            </button>
            <button
              onClick={() => handleReaction('heart')}
              className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-full transition-colors text-xs md:text-sm ${
                userReaction === 'heart' ? 'bg-red-100 text-red-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>{reactions.heart}</span>
            </button>
            <button
              onClick={() => handleReaction('star')}
              className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-full transition-colors text-xs md:text-sm ${
                userReaction === 'star' ? 'bg-blue-100 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>{reactions.star}</span>
            </button>
          </div>
        </motion.div>

        {/* Mobile Quick Actions */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center space-x-2 p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-xs font-medium">Share</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors">
                <Bookmark className="w-4 h-4" />
                <span className="text-xs font-medium">Save</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span className="text-xs font-medium">Refresh</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">Insights</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}